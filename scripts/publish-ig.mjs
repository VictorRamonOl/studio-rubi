#!/usr/bin/env node
/**
 * publish-ig.mjs — Publicação automática de carrossel no Instagram
 *
 * Dois modos de publicação:
 *   1. Direto via Meta Graph API (precisa INSTAGRAM_BUSINESS_ID + INSTAGRAM_ACCESS_TOKEN)
 *   2. Via webhook do Make.com (precisa MAKE_WEBHOOK_URL) — recomendado
 *
 * Uso:
 *   node scripts/publish-ig.mjs <slug>            → publica de verdade
 *   node scripts/publish-ig.mjs <slug> --dry-run  → simula, não publica
 *   node scripts/publish-ig.mjs --next            → publica próximo da fila
 *
 * Variáveis de ambiente (.env.local):
 *
 *   # MODO MAKE.COM (recomendado — sem briga com Meta API)
 *   MAKE_WEBHOOK_URL=https://hook.us2.make.com/abc123...
 *
 *   # OU MODO DIRETO (se conseguir o token Meta)
 *   INSTAGRAM_BUSINESS_ID=...
 *   INSTAGRAM_ACCESS_TOKEN=...
 *
 *   NEXT_PUBLIC_SITE_URL=https://rubistudiopilates.com.br
 *   META_API_VERSION=v19.0
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, "..")

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

const MAKE_WEBHOOK = process.env.MAKE_WEBHOOK_URL
const IG_ID = process.env.INSTAGRAM_BUSINESS_ID
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubistudiopilates.com.br"
const API_V = process.env.META_API_VERSION ?? "v19.0"
const BASE = `https://graph.facebook.com/${API_V}`
const HISTORY_FILE = resolve(ROOT, ".ig-published.json")

const args = process.argv.slice(2)
const DRY = args.includes("--dry-run")
const NEXT = args.includes("--next")
const slug = args.find((a) => !a.startsWith("--"))

if (!slug && !NEXT) {
  console.error("Uso: node scripts/publish-ig.mjs <slug> [--dry-run]")
  console.error("     node scripts/publish-ig.mjs --next")
  process.exit(1)
}

async function loadPosts() {
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
  const url = `${SITE}/api/ig/caption/${targetSlug}`
  try {
    const r = await fetch(url)
    if (r.ok) return await r.text()
  } catch {}
  return `✨ ${targetSlug}\n\n💬 Agende sua avaliação no WhatsApp: (92) 99285-5658\n📍 Studio Rubi · Parque Dez · Manaus\n\n#pilatesmanaus #fisioterapiamanaus #studiorubi`
}

async function buildSlideUrls(targetSlug) {
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

// ─────────────────────────────────────────────────────────
// MODO MAKE.COM (recomendado)
// ─────────────────────────────────────────────────────────
async function publishViaMake(targetSlug, urls, caption) {
  console.log("📡 Disparando webhook do Make.com...")
  const payload = {
    slug: targetSlug,
    caption,
    image_urls: urls,
    site: SITE,
    published_at: new Date().toISOString().split("T")[0],
  }
  const r = await fetch(MAKE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const text = await r.text()
  if (!r.ok) throw new Error(`Make.com webhook erro [${r.status}]: ${text}`)
  console.log(`   ✓ Webhook respondeu: ${text.slice(0, 200)}`)
  return { method: "make.com", response: text }
}

// ─────────────────────────────────────────────────────────
// MODO META API (direto)
// ─────────────────────────────────────────────────────────
async function metaApi(method, path, body) {
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

async function publishViaMetaApi(targetSlug, urls, caption) {
  console.log("📡 Criando containers dos slides...")
  const childIds = []
  for (let i = 0; i < urls.length; i++) {
    const res = await metaApi("POST", `/${IG_ID}/media`, {
      image_url: urls[i],
      is_carousel_item: "true",
      access_token: TOKEN,
    })
    childIds.push(res.id)
    console.log(`   Slide ${i + 1}/${urls.length} ✓`)
  }

  console.log("📡 Criando container do carrossel...")
  const carouselRes = await metaApi("POST", `/${IG_ID}/media`, {
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    access_token: TOKEN,
  })
  const carouselId = carouselRes.id

  console.log("⏳ Aguardando processamento...")
  for (let i = 0; i < 18; i++) {
    const res = await metaApi("GET", `/${carouselId}?fields=status_code&access_token=${TOKEN}`)
    if (res.status_code === "FINISHED") break
    if (res.status_code === "ERROR") throw new Error("Container com erro")
    await new Promise((r) => setTimeout(r, 5000))
  }

  console.log("📡 Publicando...")
  const publishRes = await metaApi("POST", `/${IG_ID}/media_publish`, {
    creation_id: carouselId,
    access_token: TOKEN,
  })

  return { method: "meta-api", post_id: publishRes.id }
}

// ─────────────────────────────────────────────────────────
// EXECUÇÃO
// ─────────────────────────────────────────────────────────
async function run(targetSlug) {
  console.log(`\n📸 Publicando carrossel: ${targetSlug}\n`)

  if (!MAKE_WEBHOOK && (!IG_ID || !TOKEN)) {
    console.error("❌ Configure UMA das opções em .env.local:")
    console.error("")
    console.error("   Opção A — Make.com (recomendado):")
    console.error("     MAKE_WEBHOOK_URL=https://hook.make.com/...")
    console.error("")
    console.error("   Opção B — Meta API direto:")
    console.error("     INSTAGRAM_BUSINESS_ID=...")
    console.error("     INSTAGRAM_ACCESS_TOKEN=...")
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
    console.log(`\nModo: ${MAKE_WEBHOOK ? "Make.com webhook" : "Meta API direto"}`)
    return
  }

  let result
  if (MAKE_WEBHOOK) {
    result = await publishViaMake(targetSlug, urls, caption)
  } else {
    result = await publishViaMetaApi(targetSlug, urls, caption)
  }

  console.log(`\n✅ Publicado! Método: ${result.method}`)

  const history = loadHistory()
  history.published.push({
    slug: targetSlug,
    method: result.method,
    publishedAt: new Date().toISOString(),
    ...result,
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
