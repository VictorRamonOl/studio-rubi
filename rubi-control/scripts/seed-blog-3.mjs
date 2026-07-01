// Lote 3: novos temas pedidos. Idempotente (upsert por slug).
// Rodar: node scripts/seed-blog-3.mjs   (a partir da pasta rubi-control)

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = {};
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2];
}
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("Falta env"); process.exit(1); }
const supabase = createClient(url, key, { auth: { persistSession: false } });

function slugify(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
const D = "Este conteúdo é informativo e não substitui a avaliação de um profissional. Cada corpo é único — o ideal é uma avaliação individual para um plano sob medida.";

const POSTS = [
  {
    title: "Fratura óssea: como funciona a recuperação com fisioterapia",
    excerpt: "Depois que o osso cola, o trabalho não acabou. Entenda o papel da fisioterapia na recuperação de fraturas para recuperar movimento, força e confiança.",
    body: `Quando um osso quebra, o tratamento inicial cuida da consolidação (com gesso, tala ou cirurgia). Mas recuperar o movimento, a força e a função depois disso é papel da fisioterapia — e faz toda a diferença no resultado final.

## Por que a fisioterapia é essencial
Ficar imobilizado por semanas gera efeitos colaterais: rigidez nas articulações, perda de força e insegurança para usar o membro. A fisioterapia atua para reverter isso.

## O que o tratamento trabalha
- Recuperar a amplitude de movimento da articulação
- Fortalecer a musculatura que enfraqueceu na imobilização
- Reduzir dor e inchaço
- Voltar a apoiar peso e usar o membro com segurança (de forma progressiva)
- Recuperar equilíbrio e confiança nos movimentos

## Fases da recuperação
Começa com movimentos suaves (respeitando a consolidação e a liberação médica), evolui para fortalecimento e, por fim, para atividades funcionais e o retorno à rotina. Cada etapa respeita o tempo do seu corpo.

## Paciência e constância
A recuperação de uma fratura é um processo gradual. Com acompanhamento, a maioria das pessoas retoma suas atividades com boa função. Começar a reabilitação no momento certo acelera e melhora o resultado.

${D}`,
  },
  {
    title: "Pilates e bem-estar: mais disposição, menos estresse",
    excerpt: "O Pilates cuida do corpo e da mente juntos. Entenda como a prática melhora a disposição, o sono, o humor e ajuda a lidar com o estresse do dia a dia.",
    body: `Quem pratica Pilates com regularidade costuma relatar algo além do corpo mais forte: mais disposição, melhor humor e uma sensação de equilíbrio. Isso não é coincidência — a prática integra movimento, respiração e concentração.

## Por que melhora o bem-estar
- **Respiração consciente:** acalma o sistema nervoso e reduz a tensão
- **Movimento com atenção plena:** tira o foco das preocupações (efeito parecido com meditação)
- **Liberação de endorfinas:** o exercício melhora o humor naturalmente
- **Menos dores:** corpo sem dor influencia diretamente o ânimo e o sono

## Disposição e energia
Ao contrário do que parece, gastar energia com exercício orientado devolve energia: melhora o condicionamento, a qualidade do sono e a disposição para o dia.

## Um cuidado com o corpo e a mente
O Pilates é um ótimo aliado do bem-estar, mas não substitui acompanhamento de saúde mental quando necessário. É um cuidado a mais, que soma qualidade de vida — muita gente sai das aulas mais leve e tranquila.

${D}`,
  },
  {
    title: "Pilates antes e depois do parto: normal ou cesárea",
    excerpt: "Preparar o corpo na gravidez e recuperá-lo no pós-parto faz diferença — seja parto normal ou cesárea. Veja como o Pilates ajuda em cada fase.",
    body: `O Pilates é um aliado da mulher antes e depois do parto. Ele não define o tipo de parto (essa é uma decisão médica e individual), mas ajuda o corpo a chegar mais preparado e a se recuperar melhor — tanto no parto normal quanto na cesárea.

## Antes do parto
- Fortalece o core e o assoalho pélvico
- Alivia dores lombar e pélvica da gestação
- Melhora respiração, postura e consciência corporal
- Trabalha mobilidade do quadril, útil no trabalho de parto

## Depois do parto
- **Parto normal:** foco em recuperar o assoalho pélvico e o core, reduzindo escapes de urina e dores.
- **Cesárea:** é uma cirurgia abdominal — a volta é mais gradual, respeitando a cicatrização, com foco em reativar o abdômen profundo com segurança.

## Sempre com liberação
Em ambos os casos, o retorno aos exercícios exige **liberação médica** (na revisão do pós-parto). Um profissional adapta o programa ao seu tipo de parto e à sua recuperação.

${D}`,
  },
  {
    title: "Fisioterapia para corredores: prevenção, recuperação e força",
    excerpt: "Correr faz bem, mas sobrecarrega o corpo. Veja como a fisioterapia previne lesões, acelera a recuperação e fortalece o corredor para render mais.",
    body: `A corrida traz muitos benefícios, mas é um esporte de impacto repetitivo — o que pode gerar lesões quando falta preparo ou há sobrecarga. A fisioterapia ajuda o corredor a correr mais, melhor e sem dor.

## Lesões comuns na corrida
- Dor no joelho (a famosa "joelho de corredor")
- Canelite (dor na canela)
- Fascite plantar (dor no calcanhar/sola do pé)
- Tendinites e dores no quadril

## Como a fisioterapia atua
- **Prevenção:** fortalece glúteos, core e pernas — a base que protege as articulações
- **Recuperação:** trata a lesão e trabalha a causa, não só o sintoma
- **Análise do movimento:** identifica desequilíbrios que sobrecarregam certas regiões
- **Retorno seguro:** progride a carga para você voltar a correr sem recaída

## Fortalecer para render mais
Corredor forte é corredor que se lesiona menos e rende mais. O Pilates e a fisioterapia entram como treino complementar que sustenta a corrida.

${D}`,
  },
  {
    title: "Musculação e encurtamento muscular: como equilibrar força e flexibilidade",
    excerpt: "Treinar pesado sem cuidar da mobilidade pode encurtar a musculatura e gerar dores. Entenda o equilíbrio entre força e flexibilidade.",
    body: `A musculação é excelente para a saúde, mas treinar só força, sem cuidar da mobilidade, pode levar ao encurtamento muscular — músculos fortes, porém "curtos" e tensos, que limitam o movimento e podem gerar dores.

## Por que acontece
- Treino intenso sem alongamento e mobilidade
- Sempre os mesmos padrões de movimento
- Postura e execução inadequadas
- Falta de trabalho das cadeias musculares como um todo

## Sinais de encurtamento
- Sensação de "travado" ou pouca amplitude
- Dores na lombar, ombros ou pescoço
- Dificuldade em posturas simples (agachar, alcançar os pés)

## Como equilibrar
Força e flexibilidade andam juntas. Trabalhar mobilidade, alongamento e as cadeias musculares (com Pilates e RPG, por exemplo) potencializa a musculação e protege o corpo. O ideal não é treinar menos, e sim treinar **equilibrado**.

Uma avaliação identifica onde estão os encurtamentos e como corrigir sem perder desempenho.

${D}`,
  },
  {
    title: "Dor de cabeça por má postura e tensão: a cervical pode ser a causa",
    excerpt: "Muitas dores de cabeça começam no pescoço. Entenda a relação entre má postura, tensão e encurtamento muscular com a dor de cabeça — e como tratar.",
    body: `Nem toda dor de cabeça vem "da cabeça". Uma parte importante tem origem no pescoço e nos ombros — a chamada dor de cabeça tensional ou cervicogênica, ligada à tensão, ao encurtamento muscular e à má postura.

## Como o pescoço causa dor de cabeça
- **Postura da cabeça para frente** ("text neck") de tanto olhar telas
- Tensão e encurtamento dos músculos do pescoço e da nuca
- Nós musculares que irradiam dor para a cabeça

## Sinais típicos
- Dor que começa na nuca e "sobe"
- Sensação de peso ou aperto (como uma faixa)
- Piora no fim do dia ou após muito tempo no computador
- Pescoço e ombros tensos

## Como a fisioterapia ajuda
Com técnicas manuais, alongamento das cadeias musculares (RPG), fortalecimento e correção postural, a fisioterapia trata a causa da tensão — reduzindo a frequência e a intensidade das crises.

## Atenção
Dor de cabeça súbita e muito intensa, ou diferente do habitual, precisa de avaliação médica. Para a dor tensional do dia a dia, cuidar da postura e do pescoço faz grande diferença.

${D}`,
  },
];

const rows = POSTS.map((p) => ({
  title: p.title, slug: slugify(p.title), excerpt: p.excerpt, body: p.body,
  audience: "public", source: "internal", published: true,
}));

const { data, error } = await supabase.from("content_posts").upsert(rows, { onConflict: "slug" }).select("slug");
if (error) { console.error("Erro:", error.message); process.exit(1); }
console.log(`✅ ${data.length} posts publicados (lote 3):`);
data.forEach((r) => console.log("  - /blog/" + r.slug));
