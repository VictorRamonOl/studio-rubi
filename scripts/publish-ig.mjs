#!/usr/bin/env node
/**
 * publish-ig.mjs — Publicação automática de carrossel no Instagram
 *
 * 3 modos de publicação, em ordem de preferência:
 *   1. Instagram Login API (graph.instagram.com) — DIRETO, sem PPA, sem Make.com [RECOMENDADO]
 *   2. Make.com webhook — fallback se Instagram API não funcionar
 *   3. Meta Graph API (Page Access Token) — legado, requer PPA aprovado
 *
 * Uso:
 *   node scripts/publish-ig.mjs <slug>            → publica de verdade
 *   node scripts/publish-ig.mjs <slug> --dry-run  → simula, não publica
 *   node scripts/publish-ig.mjs --next            → publica próximo da fila
 *
 * Variáveis de ambiente (.env.local):
 *
 *   # MODO 1 — Instagram Login API (preferido)
 *   INSTAGRAM_USER_ID=27628...
 *   INSTAGRAM_USER_TOKEN=IGAA...
 *
 *   # MODO 2 — Make.com webhook (fallback)
 *   MAKE_WEBHOOK_URL=https://hook.us2.make.com/...
 *
 *   # MODO 3 — Meta Graph API (legado)
 *   INSTAGRAM_BUSINESS_ID=17841...
 *   INSTAGRAM_ACCESS_TOKEN=EAA...
 *
 *   NEXT_PUBLIC_SITE_URL=https://rubistudiopilates.com.br
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

const IG_USER_ID = process.env.INSTAGRAM_USER_ID
const IG_USER_TOKEN = process.env.INSTAGRAM_USER_TOKEN
const IG_API_V = process.env.INSTAGRAM_API_VERSION ?? "v23.0"
const IG_BASE = `https://graph.instagram.com/${IG_API_V}`

const MAKE_WEBHOOK = process.env.MAKE_WEBHOOK_URL

const META_IG_ID = process.env.INSTAGRAM_BUSINESS_ID
const META_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const META_API_V = process.env.META_API_VERSION ?? "v19.0"
const META_BASE = `https://graph.facebook.com/${META_API_V}`

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubistudiopilates.com.br"
const HISTORY_FILE = resolve(ROOT, ".ig-published.json")

const args = process.argv.slice(2)
const DRY = args.includes("--dry-run")
const NEXT = args.includes("--next")
const FORCE_MAKE = args.includes("--make")
const FORCE_META = args.includes("--meta")
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
  return `✨ ${targetSlug}\n\n💬 WhatsApp: (92) 99285-5658\n📍 Studio Rubi · Parque Dez · Manaus\n\n#pilatesmanaus #fisioterapiamanaus #studiorubi`
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
// MODO 1: Instagram Login API direto (graph.instagram.com)
// ─────────────────────────────────────────────────────────
async function igFetch(method, path, body) {
  const url = `${IG_BASE}${path}`
  const init = { method }
  if (body) {
    init.body = new URLSearchParams(body).toString()
    init.headers = { "Content-Type": "application/x-www-form-urlencoded" }
  }
  const r = await fetch(url, init)
  const json = await r.json()
  if (!r.ok || json.error) {
    throw new Error(`Instagram API [${path}]: ${JSON.stringify(json.error ?? json)}`)
  }
  return json
}

async function publishViaInstagramAPI(targetSlug, urls, caption) {
  console.log("📡 Modo: Instagram Login API direto (graph.instagram.com)")

  console.log("   Criando containers dos slides...")
  const childIds = []
  for (let i = 0; i < urls.length; i++) {
    const res = await igFetch("POST", `/${IG_USER_ID}/media`, {
      image_url: urls[i],
      is_carousel_item: "true",
      access_token: IG_USER_TOKEN,
    })
    childIds.push(res.id)
    console.log(`   ✓ Slide ${i + 1}/${urls.length} (container ${res.id})`)
  }

  console.log("   Criando container do carrossel...")
  const carouselRes = await igFetch("POST", `/${IG_USER_ID}/media`, {
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    access_token: IG_USER_TOKEN,
  })
  const carouselId = carouselRes.id
  console.log(`   ✓ Carrossel container: ${carouselId}`)

  console.log("   Aguardando processamento...")
  for (let i = 0; i < 24; i++) {
    const res = await igFetch(
      "GET",
      `/${carouselId}?fields=status_code&access_token=${IG_USER_TOKEN}`
    )
    if (res.status_code === "FINISHED") {
      console.log("\n   ✓ Pronto pra publicar")
      break
    }
    if (res.status_code === "ERROR") {
      throw new Error("Container com erro de processamento")
    }
    process.stdout.write(
      `\r   ${res.status_code || "IN_PROGRESS"}... ${(i + 1) * 5}s`
    )
    await new Promise((r) => setTimeout(r, 5000))
  }

  console.log("   Publicando...")
  const publishRes = await igFetch("POST", `/${IG_USER_ID}/media_publish`, {
    creation_id: carouselId,
    access_token: IG_USER_TOKEN,
  })

  return { method: "instagram-api", post_id: publishRes.id }
}

// ─────────────────────────────────────────────────────────
// MODO 2: Make.com webhook (fallback)
// ─────────────────────────────────────────────────────────
async function publishViaMake(targetSlug, urls, caption) {
  console.log("📡 Modo: Make.com webhook")
  const payload = {
    slug: targetSlug,
    caption,
    image_urls: urls,
    files: urls.map((url) => ({ media_type: "IMAGE", image_url: url })),
    site: SITE,
    published_at: new Date().toISOString().split("T")[0],
  }
  const r = await fetch(MAKE_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const text = await r.text()
  if (!r.ok) throw new Error(`Make.com [${r.status}]: ${text}`)
  console.log(`   ✓ Webhook respondeu: ${text.slice(0, 200)}`)
  return { method: "make.com", response: text }
}

// ─────────────────────────────────────────────────────────
// MODO 3: Meta Graph API (legado — requer PPA)
// ─────────────────────────────────────────────────────────
async function metaFetch(method, path, body) {
  const url = `${META_BASE}${path}`
  const init = { method }
  if (body) {
    init.body = new URLSearchParams(body).toString()
    init.headers = { "Content-Type": "application/x-www-form-urlencoded" }
  }
  const r = await fetch(url, init)
  const json = await r.json()
  if (!r.ok || json.error) {
    throw new Error(`Meta API [${path}]: ${JSON.stringify(json.error ?? json)}`)
  }
  return json
}

async function publishViaMetaAPI(targetSlug, urls, caption) {
  console.log("📡 Modo: Meta Graph API (Page Access Token)")

  const childIds = []
  for (let i = 0; i < urls.length; i++) {
    const res = await metaFetch("POST", `/${META_IG_ID}/media`, {
      image_url: urls[i],
      is_carousel_item: "true",
      access_token: META_TOKEN,
    })
    childIds.push(res.id)
    console.log(`   ✓ Slide ${i + 1}/${urls.length}`)
  }

  const carouselRes = await metaFetch("POST", `/${META_IG_ID}/media`, {
    media_type: "CAROUSEL",
    children: childIds.join(","),
    caption,
    access_token: META_TOKEN,
  })
  const carouselId = carouselRes.id

  for (let i = 0; i < 24; i++) {
    const res = await metaFetch(
      "GET",
      `/${carouselId}?fields=status_code&access_token=${META_TOKEN}`
    )
    if (res.status_code === "FINISHED") break
    if (res.status_code === "ERROR") throw new Error("Container com erro")
    await new Promise((r) => setTimeout(r, 5000))
  }

  const publishRes = await metaFetch("POST", `/${META_IG_ID}/media_publish`, {
    creation_id: carouselId,
    access_token: META_TOKEN,
  })

  return { method: "meta-api", post_id: publishRes.id }
}

// ─────────────────────────────────────────────────────────
// EXECUÇÃO
// ─────────────────────────────────────────────────────────
function pickMode() {
  if (FORCE_MAKE) return "make"
  if (FORCE_META) return "meta"
  if (IG_USER_ID && IG_USER_TOKEN) return "instagram"
  if (MAKE_WEBHOOK) return "make"
  if (META_IG_ID && META_TOKEN) return "meta"
  return null
}

async function run(targetSlug) {
  console.log(`\n📸 Publicando carrossel: ${targetSlug}\n`)

  const mode = pickMode()
  if (!mode) {
    console.error("❌ Nenhuma credencial configurada em .env.local.")
    console.error("   Configure UMA das opções:")
    console.error("     1. INSTAGRAM_USER_ID + INSTAGRAM_USER_TOKEN (recomendado)")
    console.error("     2. MAKE_WEBHOOK_URL")
    console.error("     3. INSTAGRAM_BUSINESS_ID + INSTAGRAM_ACCESS_TOKEN")
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
    console.log(`\nModo selecionado: ${mode}`)
    return
  }

  console.log("3️⃣  Publicando...")
  let result
  if (mode === "instagram") {
    result = await publishViaInstagramAPI(targetSlug, urls, caption)
  } else if (mode === "make") {
    result = await publishViaMake(targetSlug, urls, caption)
  } else {
    result = await publishViaMetaAPI(targetSlug, urls, caption)
  }

  console.log(`\n✅ Publicado! ${JSON.stringify(result)}`)
  console.log(`   Ver: https://www.instagram.com/rubistudiopilates/`)

  const history = loadHistory()
  history.published.push({
    slug: targetSlug,
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
