// Lote 4: mais temas de alta busca. Idempotente (upsert por slug).
// Rodar: node scripts/seed-blog-4.mjs   (a partir da pasta rubi-control)

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
    title: "Escoliose: como o Pilates e o RPG podem ajudar",
    excerpt: "A escoliose é um desvio da coluna que preocupa muita gente. Entenda como o Pilates e o RPG ajudam a melhorar postura, dor e consciência corporal.",
    body: `A escoliose é um desvio lateral da coluna, que pode surgir na infância/adolescência ou aparecer com o tempo. Ela varia muito de intensidade — e o tratamento depende do caso.

## O que o exercício orientado faz
Em muitos casos (leves e moderados), o trabalho corporal ajuda a:
- Fortalecer a musculatura que sustenta a coluna
- Melhorar a postura e a simetria
- Aliviar dores associadas
- Aumentar a consciência corporal e a mobilidade

## Pilates e RPG na escoliose
- **Pilates terapêutico:** fortalece o core e reequilibra a musculatura de forma controlada.
- **RPG:** trabalha as cadeias musculares e a postura de forma global.
Os dois costumam ser usados de forma complementar, sempre a partir de avaliação.

## Importante
O exercício não "endireita" uma curva estrutural, mas ajuda muito na dor, na postura e na qualidade de vida. Casos mais graves precisam de acompanhamento médico (ortopedista) e, às vezes, colete ou cirurgia. Uma avaliação define o melhor caminho.

${D}`,
  },
  {
    title: "Ombro congelado (capsulite adesiva): o que é e como tratar",
    excerpt: "Ombro rígido e dolorido que 'trava'? Pode ser capsulite adesiva. Entenda as fases do ombro congelado e como a fisioterapia ajuda a recuperar o movimento.",
    body: `O ombro congelado (capsulite adesiva) é uma condição em que o ombro fica rígido e doloroso, com perda progressiva de movimento — como se "travasse". É mais comum após os 40 anos e pode surgir sem causa aparente.

## As fases
1. **Dor:** o ombro dói cada vez mais, principalmente à noite.
2. **Rigidez:** a dor diminui, mas o movimento fica bem limitado.
3. **Recuperação:** o movimento volta aos poucos.

## Como a fisioterapia ajuda
- Alívio da dor nas fases iniciais
- Recuperação gradual da amplitude de movimento
- Fortalecimento e reequilíbrio da musculatura
- Orientações para o dia a dia (não forçar, não parar de mover)

## O que esperar
A capsulite tende a melhorar com o tempo, mas a fisioterapia acelera a recuperação, reduz a dor e evita perdas de movimento a longo prazo. Quanto antes começar, melhor. Uma avaliação define a conduta certa para a sua fase.

${D}`,
  },
  {
    title: "Ciática: por que o nervo dói e como tratar",
    excerpt: "A dor que desce da lombar pela perna tem nome popular: ciática. Entenda as causas mais comuns e como a fisioterapia ajuda a aliviar sem depender só de remédio.",
    body: `A "ciática" é uma dor que segue o trajeto do nervo ciático — geralmente parte da lombar ou glúteo e desce pela perna. Não é uma doença em si, mas um sintoma de que algo está comprimindo ou irritando esse nervo.

## Causas comuns
- Hérnia de disco pressionando o nervo
- Tensão de músculos do glúteo (como o piriforme)
- Alterações posturais e sobrecarga da coluna

## Como a fisioterapia ajuda
- Alívio da dor com técnicas manuais e exercícios
- Alongamento e liberação das regiões tensas
- Fortalecimento do core para estabilizar a coluna
- Correção postural para tirar a pressão do nervo

## Quando procurar ajuda
Dor forte, dormência ou perda de força na perna merecem avaliação. Sinais como dificuldade para controlar xixi/fezes exigem atenção médica imediata. Na maioria dos casos, porém, a ciática melhora bastante com tratamento conservador bem conduzido.

${D}`,
  },
  {
    title: "LER/DORT: as dores de quem trabalha no computador",
    excerpt: "Dor no punho, ombro ou pescoço de tanto usar o computador? Pode ser LER/DORT. Entenda o que é e como prevenir e tratar com fisioterapia.",
    body: `LER (Lesão por Esforço Repetitivo) e DORT (Distúrbios Osteomusculares Relacionados ao Trabalho) são dores e lesões causadas por movimentos repetitivos, postura inadequada e sobrecarga — muito comuns em quem trabalha no computador.

## Sinais de alerta
- Dor ou formigamento em punho, mão, cotovelo, ombro ou pescoço
- Cansaço e peso nos braços no fim do dia
- Perda de força ou dificuldade em tarefas simples

## Como prevenir
- Ajustar a ergonomia (altura da tela, apoio para os braços, cadeira)
- Fazer pausas e alongar ao longo do dia
- Fortalecer e mobilizar as regiões exigidas
- Cuidar da postura ao sentar

## Como a fisioterapia trata
Com técnicas manuais, exercícios, alongamento das cadeias musculares e correção postural, a fisioterapia alivia a dor e trata a causa. Quanto antes cuidar, menor o risco de a lesão se tornar crônica.

${D}`,
  },
  {
    title: "Lesão de LCA no joelho: como é a reabilitação",
    excerpt: "Romper o ligamento cruzado anterior (LCA) é comum no esporte. Entenda o papel da fisioterapia antes e depois da cirurgia e a volta segura à atividade.",
    body: `A lesão do ligamento cruzado anterior (LCA) é uma das mais comuns no joelho, frequente em esportes com giros e mudanças de direção. A reabilitação é decisiva para o resultado — com ou sem cirurgia.

## Antes da cirurgia (pré-operatório)
Fortalecer e recuperar movimento antes da cirurgia melhora muito a recuperação depois. Essa fase, chamada de pré-habilitação, faz diferença.

## Depois da cirurgia
A fisioterapia conduz a recuperação em etapas:
- Reduzir dor e inchaço, recuperar o movimento
- Fortalecer coxa (quadríceps) e glúteos
- Treinar equilíbrio e controle do joelho
- Progredir até o retorno ao esporte, com segurança

## Volta ao esporte
O retorno não depende só do tempo, mas de critérios de força, controle e confiança. Voltar cedo demais aumenta o risco de nova lesão. A reabilitação bem feita é o que garante um joelho firme e confiável.

${D}`,
  },
  {
    title: "Fibromialgia: como o exercício orientado ajuda a viver melhor",
    excerpt: "Dor no corpo todo, cansaço e sono ruim marcam a fibromialgia. Entenda por que o exercício orientado é um dos pilares do tratamento.",
    body: `A fibromialgia é uma condição de dor crônica generalizada, geralmente acompanhada de cansaço, sono não reparador e sensibilidade aumentada. Não tem cura, mas tem tratamento — e o exercício orientado é um dos pilares mais recomendados.

## Por que o exercício ajuda
Pode parecer contraditório se mexer quando dói, mas o movimento adequado:
- Reduz a dor e a rigidez ao longo do tempo
- Melhora a disposição, o sono e o humor
- Aumenta o condicionamento e a tolerância às atividades

## Como deve ser
- **De baixo impacto e progressivo** (nada de exagero)
- Respeitando os dias bons e ruins
- Com foco em constância, não em intensidade
O Pilates terapêutico costuma encaixar bem, por ser suave, controlado e individualizado.

## Cuidado em conjunto
A fibromialgia se beneficia de um cuidado amplo (médico, exercício, sono, saúde mental). A fisioterapia é uma peça importante para reduzir a dor e recuperar a qualidade de vida.

${D}`,
  },
  {
    title: "Pilates emagrece? O que esperar de verdade",
    excerpt: "Uma dúvida muito comum de quem quer começar. Veja a resposta honesta sobre Pilates e emagrecimento — e o que a prática realmente entrega.",
    body: `Muita gente pergunta se o Pilates emagrece. A resposta honesta: o Pilates **ajuda**, mas emagrecer depende principalmente de um conjunto — alimentação e gasto calórico. Vamos ao que ele realmente entrega.

## O que o Pilates faz muito bem
- **Tonifica e fortalece** o corpo (você fica mais "durinho" e definido)
- Melhora a **postura**, a **flexibilidade** e o **core**
- Aumenta a consciência corporal e a disposição

## E o emagrecimento?
O Pilates gasta calorias e fortalece a musculatura (que ajuda no metabolismo), mas, para perder peso de forma consistente, ele funciona melhor **combinado** com alimentação equilibrada e, muitas vezes, atividade aeróbica.

## O resultado real
Quem faz Pilates costuma notar o corpo mais firme, a roupa vestindo melhor e mais disposição — mesmo quando a balança muda pouco. É saúde e qualidade de vida, não só número na balança.

Numa avaliação, definimos o melhor caminho para o seu objetivo.

${D}`,
  },
  {
    title: "Bursite e tendinite no ombro: o que fazer",
    excerpt: "Dor no ombro ao levantar o braço ou dormir de lado pode ser bursite ou tendinite. Entenda as causas e como a fisioterapia resolve sem depender só de remédio.",
    body: `Bursite e tendinite no ombro são inflamações comuns, geralmente ligadas a esforço repetitivo, sobrecarga ou má postura. Causam dor ao levantar o braço, ao dormir de lado e em movimentos do dia a dia.

## Por que acontece
- Movimentos repetitivos acima da cabeça
- Sobrecarga e má postura dos ombros
- Fraqueza da musculatura que estabiliza o ombro

## Como a fisioterapia trata
- Alívio da dor e da inflamação
- Recuperação do movimento sem compensações
- **Fortalecimento** do manguito rotador e da postura (a parte que evita a recaída)
- Correção dos hábitos que geraram o problema

## Tratar a causa, não só o sintoma
Remédio e repouso aliviam, mas se a musculatura continua fraca e a postura ruim, a dor volta. Por isso o fortalecimento é central. Uma avaliação identifica a origem e o melhor tratamento.

${D}`,
  },
  {
    title: "Artrose no quadril: movimento como tratamento",
    excerpt: "Dor na virilha, na lateral do quadril ou dificuldade para caminhar? Pode ser artrose de quadril. Entenda como o exercício orientado ajuda a controlar a dor.",
    body: `A artrose de quadril é o desgaste da articulação do quadril, comum com o envelhecimento. Causa dor (muitas vezes na virilha ou lateral do quadril), rigidez e dificuldade para caminhar longas distâncias.

## Movimento é remédio
Assim como no joelho, o exercício orientado é um dos melhores tratamentos:
- Fortalece a musculatura que protege a articulação
- Mantém a mobilidade e reduz a rigidez
- Alivia a dor e melhora a caminhada

## Como a fisioterapia ajuda
- Exercícios de baixo impacto e fortalecimento específico
- Ganho de mobilidade do quadril
- Orientações para o dia a dia (peso, calçado, atividades)

## Dá para viver bem
A artrose não tem cura, mas é possível controlar a dor e manter a autonomia por muitos anos. Ficar parado piora; o movimento certo protege. Casos avançados podem precisar de avaliação para cirurgia (prótese), e a fisioterapia é útil antes e depois.

${D}`,
  },
  {
    title: "Postura no home office: como evitar dores trabalhando de casa",
    excerpt: "Trabalhar de casa é prático, mas o sofá e a mesa improvisada cobram o preço em dores. Veja como organizar o home office e proteger sua coluna.",
    body: `O home office trouxe comodidade, mas também muitas dores nas costas, no pescoço e nos ombros — fruto de mesas improvisadas, sofá e horas na mesma posição. Alguns ajustes simples fazem grande diferença.

## Monte um posto melhor
- **Tela na altura dos olhos** (use suporte ou livros sob o notebook)
- **Cadeira com apoio** para a lombar; pés apoiados no chão
- **Cotovelos a ~90°** ao digitar; teclado e mouse na altura certa
- Evite trabalhar no sofá ou na cama por longos períodos

## Movimente-se
- Faça pausas curtas a cada 30–50 minutos
- Levante, alongue pescoço, ombros e coluna
- Beba água (é uma desculpa boa para levantar)

## Quando procurar ajuda
Dores que persistem, pescoço travado ou dor de cabeça frequente merecem avaliação. A fisioterapia e o Pilates ajudam a fortalecer, reequilibrar a postura e acabar com o ciclo de dor de quem trabalha sentado.

${D}`,
  },
];

const rows = POSTS.map((p) => ({
  title: p.title, slug: slugify(p.title), excerpt: p.excerpt, body: p.body,
  audience: "public", source: "internal", published: true,
}));

const { data, error } = await supabase.from("content_posts").upsert(rows, { onConflict: "slug" }).select("slug");
if (error) { console.error("Erro:", error.message); process.exit(1); }
console.log(`✅ ${data.length} posts publicados (lote 4).`);
