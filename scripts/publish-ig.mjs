#!/usr/bin/env node
/**
 * publish-ig.mjs — Publicação automática de carrossel no Instagram
 *
 * Uso:
 *   node scripts/publish-ig.mjs <slug>            → publica de verdade
 *   node scripts/publish-ig.mjs <slug> --dry-run  → simula, não publica
 *   node scripts/publish-ig.mjs --next            → publica próximo da fila (não postado)
 *
 * Variáveis de ambiente necessárias (.env.local):
 *   INSTAGRAM_BUSINESS_ID
 *   INSTAGRAM_ACCESS_TOKEN
 *   NEXT_PUBLIC_SITE_URL     (URL pública onde os slides PNG estão acessíveis)
 *   META_API_VERSION         (opcional, default v19.0)
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, "..")

// --- Carrega .env.local manualmente (sem dependência externa) ---
function loadEnv() {
  const envFiles = [".env.local", ".env"]
  for (const file of envFiles) {
    const path = resolve(ROOT, file)
    if (!existsSync(path)) continue
    const content = readFileSync(path, "utf-8")
    for (const line of content.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i)
      if (!m) continue
      const [, k, rawV] = m
      if (process.env[k]) continue
      let v = rawV.trim()
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1)
      }
      process.env[k] = v
    }
  }
}
loadEnv()

const IG_ID = process.env.INSTAGRAM_BUSINESS_ID
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubistudiopilates.com.br"
const API_V = process.env.META_API_VERSION ?? "v19.0"
const BASE = `https://graph.facebook.com/${API_V}`
const HISTORY_FILE = resolve(ROOT, ".ig-published.json")

// --- Args ---
const args = process.argv.slice(2)
const DRY = args.includes("--dry-run")
const NEXT = args.includes("--next")
const slug = args.find((a) => !a.startsWith("--"))

if (!slug && !NEXT) {
  console.error("Uso: node scripts/publish-ig.mjs <slug> [--dry-run]")
  console.error("     node scripts/publish-ig.mjs --next")
  process.exit(1)
}

// --- Carrega lista de posts (via build do Next ou fallback ao registry TS) ---
async function loadPosts() {
  // Estratégia: importar dinâmico do TS registry compilado pelo Next.
  // Em dev, basta apontar pra src TS via tsx. Aqui usamos abordagem simples:
  // lemos os arquivos .ts e extraímos slug/title/category/excerpt/readingTime.
  const { ALL_BLOG_POSTS } = await import(resolve(ROOT, "data/blog/index.ts")).catch(() => ({}))
  if (ALL_BLOG_POSTS) return ALL_BLOG_POSTS

  // Fallback: parse simples dos arquivos .ts
  const POST_FILES = [
    "data/blog/posts/dor-e-lesoes.ts",
    "data/blog/posts/gestantes-puerperio.ts",
    "data/blog/posts/metodos-e-tratamentos.ts",
    "data/blog/posts/idosos-reabilitacao.ts",
    "data/blog/posts/esportes-performance.ts",
    "data/blog/posts/lifestyle-prevencao.ts",
  ]
  const posts = []
  for (const file of POST_FILES) {
    const path = resolve(ROOT, file)
    if (!existsSync(path)) continue
    const content = readFileSync(path, "utf-8")
    const slugMatches = [...content.matchAll(/slug:\s*"([^"]+)"/g)]
    const titleMatches = [...content.matchAll(/title:\s*"([^"]+)"/g)]
    const categoryMatches = [...content.matchAll(/category:\s*"([^"]+)"/g)]
    for (let i = 0; i < slugMatches.length; i++) {
      posts.push({
        slug: slugMatches[i][1],
        title: titleMatches[i]?.[1] ?? "",
        category: categoryMatches[i]?.[1] ?? "",
      })
    }
  }
  return posts
}

function loadHistory() {
  if (!existsSync(HISTORY_FILE)) return { published: [] }
  try {
    return JSON.parse(readFileSync(HISTORY_FILE, "utf-8"))
  } catch {
    return { published: [] }
  }
}

function saveHistory(history) {
  writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2))
}

async function fetchCaption(targetSlug) {
  // Importa a função de caption via Next runtime — ou gera via API local.
  const url = `${SITE}/api/ig/caption/${targetSlug}`
  try {
    const r = await fetch(url)
    if (r.ok) return await r.text()
  } catch {
    /* ignore */
  }
  // Fallback genérico
  return `✨ ${targetSlug}\n\n💬 Agende sua avaliação no WhatsApp: (92) 99285-5658\n📍 Studio Rubi · Parque Dez · Manaus\n\n#pilatesmanaus #fisioterapiamanaus #studiorubi`
}

async function getSlideCount(targetSlug) {
  // Tenta carregar do extractSlides via posts
  const posts = await loadPosts()
  const post = posts.find((p) => p.slug === targetSlug)
  if (!post) throw new Error(`Post ${targetSlug} não encontrado`)
  // Por convenção atual: 1 cover + N tópicos (até 6) + 1 cta. Mínimo 3.
  // Pra ser preciso, batemos no endpoint do site:
  return 8 // chute conservador; o loop abaixo respeita 404
}

async function buildSlideUrls(targetSlug) {
  // Probe sequencial até 404 (slide inexistente).
  const urls = []
  for (let i = 0; i < 12; i++) {
    const url = `${SITE}/api/ig/${targetSlug}/${i}`
    const r = await fetch(url, { method: "HEAD" })
    if (r.ok) urls.push(url)
    else break
  }
  if (urls.length < 2) throw new Error(`Slides indisponíveis: ${urls.length}`)
  if (urls.length > 10) urls.length = 10
  return urls
}

async function api(method, path, body) {
  const url = `${BASE}${path}`
  const init = { method }
  if (body) {
    init.body = new URLSearchParams(body).toString()
    init.headers = { "Content-Type": "application/x-www-form-urlencoded" }
  }
  const r = await fetch(url, init)
  const json = await r.json()
  if (!r.ok || json.error) {
    throw new Error(`Meta API erro [${path}]: ${JSON.stringify(json.error ?? json)}`)
  }
  return json
}

async function createChildContainer(imageUrl) {
  const res = await api("POST", `/${IG_ID}/media`, {
    image_url: imageUrl,
    is_carousel_item: "true",
    access_token: TOKEN,
  })
  return res.id
}

async function createCarouselContainer(childIds, caption) {
  const res = await api("POST", `/${IG_ID}/media`, {
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    access_token: TOKEN,
  })
  return res.id
}

async function waitReady(containerId) {
  for (let i = 0; i < 18; i++) {
    const res = await api("GET", `/${containerId}?fields=status_code&access_token=${TOKEN}`)
    if (res.status_code === "FINISHED") return true
    if (res.status_code === "ERROR") throw new Error(`Container ${containerId} com erro`)
    process.stdout.write(`  Aguardando processamento... ${(i + 1) * 5}s\r`)
    await new Promise((r) => setTimeout(r, 5000))
  }
  throw new Error("Timeout esperando processamento")
}

async function publish(containerId) {
  const res = await api("POST", `/${IG_ID}/media_publish`, {
    creation_id: containerId,
    access_token: TOKEN,
  })
  return res.id
}

async function run(targetSlug) {
  console.log(`\n📸 Publicando carrossel: ${targetSlug}\n`)

  if (!IG_ID || !TOKEN) {
    console.error("❌ Credenciais ausentes. Configure .env.local com:")
    console.error("   INSTAGRAM_BUSINESS_ID=...")
    console.error("   INSTAGRAM_ACCESS_TOKEN=...")
    process.exit(1)
  }

  console.log("1️⃣  Mapeando slides...")
  const urls = await buildSlideUrls(targetSlug)
  console.log(`   ${urls.length} slides encontrados`)

  console.log("2️⃣  Gerando legenda...")
  const caption = await fetchCaption(targetSlug)
  console.log(`   Caption: ${caption.length} caracteres`)

  if (DRY) {
    console.log("\n🧪 DRY RUN — não publicarei. Veja:")
    urls.forEach((u, i) => console.log(`   Slide ${i + 1}: ${u}`))
    console.log("\nLegenda:")
    console.log(caption)
    return
  }

  console.log("3️⃣  Criando containers dos slides...")
  const childIds = []
  for (let i = 0; i < urls.length; i++) {
    const id = await createChildContainer(urls[i])
    childIds.push(id)
    console.log(`   Slide ${i + 1}/${urls.length} ✓`)
  }

  console.log("4️⃣  Criando container do carrossel...")
  const carouselId = await createCarouselContainer(childIds, caption)
  console.log(`   Container: ${carouselId}`)

  console.log("5️⃣  Aguardando processamento do Instagram...")
  await waitReady(carouselId)
  console.log("\n   ✓ Pronto")

  console.log("6️⃣  Publicando...")
  const postId = await publish(carouselId)
  console.log(`\n✅ Publicado com sucesso! Post ID: ${postId}`)

  const history = loadHistory()
  history.published.push({
    slug: targetSlug,
    postId,
    publishedAt: new Date().toISOString(),
  })
  saveHistory(history)
}

async function pickNext() {
  const posts = await loadPosts()
  const history = loadHistory()
  const publishedSlugs = new Set(history.published.map((p) => p.slug))
  const next = posts.find((p) => !publishedSlugs.has(p.slug))
  if (!next) {
    console.log("✅ Todos os posts já foram publicados!")
    process.exit(0)
  }
  return next.slug
}

const target = slug ?? (await pickNext())
run(target).catch((err) => {
  console.error(`\n❌ Falhou: ${err.message}`)
  process.exit(1)
})
