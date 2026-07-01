// Cria/atualiza posts do blog (públicos) no Supabase, já publicados.
// Rodar: node scripts/seed-blog.mjs   (a partir da pasta rubi-control)
// Idempotente: usa o slug como chave (não duplica se rodar de novo).

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// --- carrega .env.local manualmente ---
const env = {};
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2];
}
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Falta NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY no .env.local");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

function slugify(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

const DISCLAIMER =
  "Este conteúdo é informativo e não substitui a avaliação de um profissional. Cada corpo é único — o ideal é uma avaliação individual para um plano sob medida.";

const POSTS = [
  {
    title: "Fisioterapia para idoso: quando é hora de procurar?",
    excerpt:
      "Dores frequentes, quedas, perda de força ou recuperação de cirurgia: veja os sinais de que o idoso precisa de fisioterapia e como ela ajuda a manter a independência.",
    body: `Com o passar dos anos, é natural que a força, o equilíbrio e a mobilidade mudem. Mas dor e perda de autonomia não precisam ser aceitas como "coisa da idade". A fisioterapia ajuda o idoso a se manter ativo, seguro e independente por mais tempo.

## Sinais de que é hora de procurar
- Dores frequentes em joelhos, quadril, coluna ou ombros
- Quedas ou sensação de desequilíbrio e insegurança para andar
- Dificuldade para levantar da cadeira, subir escadas ou caminhar distâncias
- Perda de força ou de disposição para as atividades do dia a dia
- Recuperação após cirurgia, fratura, AVC ou internação

## Como a fisioterapia ajuda
O tratamento é individual e costuma incluir exercícios de fortalecimento, treino de equilíbrio e mobilidade, alívio da dor e reeducação do movimento. O objetivo é devolver funcionalidade — ou seja, a capacidade de fazer as coisas com segurança e sem dor.

## Por que prevenir é tão importante
Grande parte das quedas em idosos pode ser evitada com fortalecimento e treino de equilíbrio. Manter a musculatura ativa protege as articulações, os ossos e a autonomia. Começar cedo, antes de perder força, faz toda a diferença.

## Atendimento em casa (home care)
Quando a locomoção é difícil, a fisioterapia domiciliar leva o cuidado até o idoso, no conforto e na segurança da casa dele.

${DISCLAIMER}`,
  },
  {
    title: "Dor no joelho em idosos: causas e como a fisioterapia ajuda",
    excerpt:
      "A dor no joelho é uma das queixas mais comuns na terceira idade. Entenda as causas mais frequentes, como a artrose, e o que a fisioterapia pode fazer para aliviar.",
    body: `A dor no joelho afeta muitos idosos e pode limitar caminhar, subir escadas e até dormir bem. A boa notícia: na maioria dos casos, dá para reduzir a dor e recuperar a função com o tratamento certo.

## Causas mais comuns
- **Artrose (osteoartrite):** desgaste da cartilagem, a causa mais frequente
- Enfraquecimento da musculatura da coxa (quadríceps)
- Sobrepeso, que aumenta a carga sobre a articulação
- Lesões antigas ou má postura ao caminhar

## O que a fisioterapia faz
O foco é aliviar a dor e proteger a articulação, com:
- Fortalecimento dos músculos que estabilizam o joelho
- Exercícios de baixo impacto, que trabalham sem sobrecarregar
- Ganho de mobilidade e melhora do padrão de caminhada
- Orientações para o dia a dia (calçado, escadas, peso)

## Dá para viver sem dor?
A artrose não tem "cura", mas é totalmente possível controlar a dor e voltar a se movimentar bem. Músculo forte funciona como um amortecedor natural do joelho — por isso o fortalecimento é peça central do tratamento.

${DISCLAIMER}`,
  },
  {
    title: "Fisioterapia pélvica: o que é e para que serve",
    excerpt:
      "Incontinência urinária, dores, questões no pós-parto e na menopausa: a fisioterapia pélvica cuida de uma região importante e pouco falada. Entenda como funciona.",
    body: `A fisioterapia pélvica cuida dos músculos do assoalho pélvico — a "rede" de músculos que sustenta a bexiga, o útero e o intestino. Quando esses músculos ficam fracos ou tensos demais, surgem problemas que afetam muito a qualidade de vida.

## Para que serve
- **Incontinência urinária** (perder urina ao tossir, rir, espirrar ou se exercitar)
- Preparação para o parto e recuperação no pós-parto
- **Diástase abdominal** e reabilitação do core
- Prolapsos (sensação de "peso" ou órgãos "caídos")
- Dores na relação sexual e desconfortos íntimos
- Alterações da menopausa

## Como é o tratamento
A avaliação identifica se os músculos estão fracos, tensos ou descoordenados. A partir daí, o tratamento pode incluir exercícios específicos do assoalho pélvico, treino de percepção e controle, técnicas manuais e orientações. É individual e respeita o conforto da paciente.

## Não é só "fazer Kegel"
Muita gente faz os exercícios de forma errada e não vê resultado. A fisioterapia pélvica ensina a ativar a musculatura certa, na hora certa — por isso a orientação profissional faz tanta diferença.

${DISCLAIMER}`,
  },
  {
    title: "Incontinência urinária feminina: a fisioterapia resolve?",
    excerpt:
      "Perder urina ao rir, tossir ou se exercitar é comum, mas não é normal — e tem tratamento. Veja como a fisioterapia pélvica ajuda a recuperar o controle.",
    body: `Perder urina sem querer é mais comum do que se imagina e afeta mulheres de várias idades. É comum, mas não deveria ser aceito como "normal": existe tratamento eficaz, e a fisioterapia pélvica é uma das primeiras opções recomendadas.

## Por que acontece
Na maioria das vezes, a causa é a fraqueza ou a falta de coordenação dos músculos do assoalho pélvico — que podem se enfraquecer com a gestação, o parto, a menopausa, o esforço repetido ou o próprio tempo.

## Como a fisioterapia ajuda
O treinamento dos músculos do assoalho pélvico é reconhecido como tratamento de primeira linha para a incontinência de esforço. Ele inclui:
- Exercícios específicos para fortalecer e coordenar a musculatura
- Treino para "segurar" nos momentos de esforço (tossir, levantar peso)
- Mudanças de hábitos que reduzem os episódios

## Resultados
Muitas mulheres melhoram de forma importante — algumas resolvem por completo — com semanas de tratamento consistente. Quanto antes começa, melhor tende a ser a resposta. Em casos específicos, a fisioterapia é combinada com outras condutas médicas.

${DISCLAIMER}`,
  },
  {
    title: "Diástase abdominal: o que é e como tratar",
    excerpt:
      "O afastamento dos músculos da barriga é comum após a gestação. Saiba o que é a diástase, quando se preocupar e como a fisioterapia ajuda a recuperar o core.",
    body: `Diástase abdominal é o afastamento dos músculos retos do abdômen (o famoso "tanquinho"), que se separam na linha do meio da barriga. É muito comum no fim da gravidez e no pós-parto, quando a barriga cresce e estica a musculatura.

## Como saber se tenho
Um sinal comum é uma "saliência" ou afundamento no meio da barriga ao levantar da cama ou fazer força. A confirmação e a medida do afastamento são feitas na avaliação com o fisioterapeuta.

## Por que tratar
Além da questão estética, a diástase pode se associar a:
- Dor lombar e má postura
- Fraqueza do core e sensação de barriga "solta"
- Desconfortos abdominais

## Como a fisioterapia ajuda
O tratamento foca em reativar e fortalecer a musculatura profunda do abdômen e do assoalho pélvico, de forma progressiva e segura. Também ensina quais movimentos evitar no início (alguns abdominais tradicionais podem piorar). A maioria dos casos melhora bastante com exercício orientado; situações mais severas podem precisar de avaliação cirúrgica.

${DISCLAIMER}`,
  },
  {
    title: "Pilates na gravidez: é seguro? Benefícios por trimestre",
    excerpt:
      "Feito com orientação profissional, o Pilates é um dos exercícios mais indicados na gestação. Veja os benefícios e os cuidados em cada fase.",
    body: `Sim, o Pilates é considerado seguro na gravidez quando feito com liberação médica e acompanhamento de um profissional que adapta os exercícios para cada fase. Ele é um dos métodos mais recomendados para gestantes.

## Benefícios
- Alívio das dores nas costas e na lombar
- Fortalecimento do core e do assoalho pélvico (ajuda no parto e no pós)
- Melhora da postura, da respiração e da consciência corporal
- Mais disposição e menos desconfortos do dia a dia

## Cuidados por trimestre
- **1º trimestre:** foco em respiração, postura e ativação suave. Sempre com liberação médica.
- **2º trimestre:** fase geralmente mais confortável; trabalha-se força e estabilidade, evitando exercícios deitada de barriga para cima por muito tempo.
- **3º trimestre:** ênfase em mobilidade, alívio de desconfortos e preparação para o parto, respeitando o corpo.

## Importante
Cada gestação é única. Algumas condições exigem cuidados especiais ou contraindicam certos exercícios — por isso o acompanhamento profissional e a liberação do obstetra são essenciais.

${DISCLAIMER}`,
  },
  {
    title: "Dor lombar na gravidez: como aliviar com segurança",
    excerpt:
      "A dor nas costas é uma das queixas mais comuns da gestação. Entenda por que acontece e o que realmente ajuda a aliviar, sem risco para você e o bebê.",
    body: `A dor lombar atinge boa parte das gestantes, principalmente a partir do segundo trimestre. Ela acontece por uma combinação de fatores naturais da gravidez — e, na maioria dos casos, pode ser bastante aliviada.

## Por que acontece
- O peso da barriga muda o centro de gravidade e sobrecarrega a lombar
- Hormônios (como a relaxina) deixam as articulações mais frouxas
- A musculatura do core fica mais exigida e menos eficiente

## O que ajuda a aliviar
- Exercícios orientados (Pilates e fisioterapia) para fortalecer e estabilizar
- Correção de postura ao sentar, levantar e dormir
- Alongamentos suaves e mobilidade
- Calor local e cuidado com o peso do dia a dia

## Quando procurar ajuda
Dor intensa, que irradia para a perna, ou acompanhada de outros sintomas merece avaliação. Um fisioterapeuta monta um programa seguro para o seu momento da gestação, aliviando a dor sem risco para você e o bebê.

${DISCLAIMER}`,
  },
  {
    title: "Pilates para dor lombar: por que funciona",
    excerpt:
      "A dor lombar é uma das que mais afastam as pessoas do movimento. Entenda por que o Pilates é uma das melhores ferramentas para tratar e prevenir.",
    body: `A dor lombar é uma das queixas mais comuns do mundo — e o Pilates é uma das abordagens mais indicadas para tratá-la e evitar que volte. Não por acaso: ele trabalha exatamente o que costuma faltar.

## Por que o Pilates ajuda
- **Fortalece o core:** os músculos profundos do abdômen e das costas funcionam como uma cinta natural que estabiliza a coluna
- **Melhora a postura:** reduz sobrecargas que geram dor
- **Trabalha com controle:** movimentos precisos e de baixo impacto, seguros mesmo para quem tem dor
- **Aumenta a mobilidade:** solta regiões travadas e melhora o movimento

## O que a ciência diz
Programas de exercício com foco em estabilização e fortalecimento estão entre as condutas mais recomendadas para a dor lombar crônica. O Pilates terapêutico se encaixa bem nessa lógica.

## Feito para o seu caso
No Pilates terapêutico, os exercícios são escolhidos a partir de uma avaliação — respeitando a sua dor e evoluindo na medida certa. Não é "puxar exercício": é tratar a causa.

${DISCLAIMER}`,
  },
  {
    title: "RPG para dor lombar: como funciona",
    excerpt:
      "A Reeducação Postural Global trata a dor olhando para o corpo todo, não só para o local que dói. Veja como o RPG atua na dor lombar e na postura.",
    body: `A RPG (Reeducação Postural Global) é um método de fisioterapia criado na França que trata a dor a partir da postura e das cadeias musculares — ou seja, olhando para o corpo como um todo, e não só para o ponto que dói.

## A ideia central
Muitas dores lombares são consequência de desequilíbrios e encurtamentos musculares que puxam a coluna para posições ruins. A RPG identifica esses músculos e, com posturas de alongamento ativo mantidas por alguns minutos, promove o reequilíbrio.

## O que esperar
- Alívio da dor lombar ao reduzir tensões e compressões
- Melhora da postura e da consciência corporal
- Ganho de mobilidade e flexibilidade
- Sessões individuais e personalizadas

## Quantas sessões
Varia conforme o caso — em geral, um número de sessões ao longo de algumas semanas, reavaliando a evolução. O ritmo é definido na avaliação.

## RPG combina com outras abordagens
A RPG pode ser usada junto com o Pilates e a fisioterapia, dependendo do objetivo. Na avaliação, define-se o melhor caminho para você.

${DISCLAIMER}`,
  },
  {
    title: "Pilates ou RPG: qual escolher para a coluna?",
    excerpt:
      "Os dois ajudam postura e dor nas costas, mas de formas diferentes. Entenda a diferença entre Pilates e RPG e como saber qual é o ideal para o seu caso.",
    body: `Pilates e RPG são dois grandes aliados contra a dor nas costas e os problemas de postura. Eles não competem — atuam de formas diferentes, e às vezes se complementam. A escolha depende do seu objetivo e do que a avaliação encontrar.

## Como o Pilates trabalha
O Pilates é mais **dinâmico**: fortalece o core, melhora a estabilidade, a força e o controle do movimento. É ótimo para quem quer condicionar o corpo, prevenir dores e ganhar funcionalidade.

## Como a RPG trabalha
A RPG é mais **postural e específica**: usa posturas de alongamento mantido para corrigir desequilíbrios e encurtamentos musculares que geram a dor. É indicada quando o foco é a correção postural e o alívio de dores ligadas à postura.

## Qual é o ideal para você?
- Quer **fortalecer, condicionar e prevenir**? O Pilates costuma encaixar bem.
- Tem uma **alteração postural marcante** ou dor ligada a encurtamentos? A RPG pode ser o caminho.
- Muitos casos se beneficiam dos **dois**, em momentos diferentes do tratamento.

A melhor forma de decidir é uma avaliação individual, que analisa a sua postura, a sua dor e os seus objetivos.

${DISCLAIMER}`,
  },
];

const rows = POSTS.map((p) => ({
  title: p.title,
  slug: slugify(p.title),
  excerpt: p.excerpt,
  body: p.body,
  audience: "public",
  source: "internal",
  published: true,
}));

const { data, error } = await supabase
  .from("content_posts")
  .upsert(rows, { onConflict: "slug" })
  .select("slug");

if (error) {
  console.error("Erro ao publicar:", error.message);
  process.exit(1);
}
console.log(`✅ ${data.length} posts publicados:`);
data.forEach((r) => console.log("  - /blog/" + r.slug));
