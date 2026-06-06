import type { BlogPost, BlogCategory } from "@/data/blog"

const HASHTAGS_BASE = [
  "#pilatesmanaus",
  "#fisioterapiamanaus",
  "#parquedez",
  "#manaus",
  "#pilatesterapeutico",
  "#fisioterapeutamanaus",
  "#studiorubi",
  "#movimentocura",
]

const HASHTAGS_BY_CATEGORY: Record<BlogCategory, string[]> = {
  "Dor e Lesões": [
    "#dorlombar",
    "#dornascostas",
    "#dorcronica",
    "#tratamentodedor",
    "#pilatesparador",
    "#colunasaudavel",
  ],
  "Gestantes e Puerpério": [
    "#pilatesgestante",
    "#gravidez",
    "#gestantemanaus",
    "#pilatesgravidez",
    "#preparoparoparto",
    "#diastaseabdominal",
    "#puerperio",
  ],
  "Métodos e Tratamentos": [
    "#rpgmanaus",
    "#reeducacaopostural",
    "#fisioterapia",
    "#pilates",
    "#metodopilates",
  ],
  "Idosos e Reabilitação": [
    "#fisioterapiaidoso",
    "#homecaremanaus",
    "#reabilitacao",
    "#fisioterapiadomiciliar",
    "#cuidadosaoidoso",
    "#prevencaodequedas",
  ],
  "Esportes e Performance": [
    "#fisioterapiaesportiva",
    "#corredor",
    "#corridademrua",
    "#performance",
    "#lesaoesportiva",
    "#prevencaodelesao",
  ],
  "Lifestyle e Prevenção": [
    "#posturacorreta",
    "#homeoffice",
    "#qualidadedevida",
    "#bemestar",
    "#pilatesiniciantes",
    "#saudeebemestar",
  ],
}

const WHATSAPP_LINE = "💬 Agende sua avaliação pelo WhatsApp: (92) 99285-5658"

function getOpeningHook(post: BlogPost): string {
  return post.excerpt
}

function getMidCTA(post: BlogPost): string {
  const titleShort = post.title.split(":")[0].split("?")[0]
  return `Salva esse post pra ler depois e marca aquela amiga que precisa entender de ${titleShort.toLowerCase()}. 💛`
}

function getHashtags(category: BlogCategory): string {
  const specific = HASHTAGS_BY_CATEGORY[category] ?? []
  const all = Array.from(new Set([...HASHTAGS_BASE, ...specific]))
  return all.slice(0, 18).join(" ")
}

export function generateCaption(post: BlogPost): string {
  const lines: string[] = []

  lines.push(`✨ ${post.title}`)
  lines.push("")
  lines.push(getOpeningHook(post))
  lines.push("")
  lines.push("👉 Arrasta pra entender ponto a ponto.")
  lines.push("")
  lines.push(getMidCTA(post))
  lines.push("")
  lines.push(WHATSAPP_LINE)
  lines.push("📍 Studio Rubi · Parque Dez · Manaus / AM")
  lines.push(`🔗 Leia o artigo completo no nosso site (link na bio): rubistudiopilates.com.br/blog/${post.slug}`)
  lines.push("")
  lines.push("—")
  lines.push("")
  lines.push(getHashtags(post.category))

  return lines.join("\n")
}
