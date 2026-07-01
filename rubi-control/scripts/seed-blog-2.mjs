// Lote 2: publica os 40 posts restantes (fecha os 50). Idempotente (upsert por slug).
// Rodar: node scripts/seed-blog-2.mjs   (a partir da pasta rubi-control)

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
  // ---------- IDOSO ----------
  { title: "Como prevenir quedas em idosos: exercícios de equilíbrio",
    excerpt: "As quedas são uma das maiores causas de perda de autonomia na terceira idade — e boa parte pode ser evitada. Veja como fortalecer e treinar o equilíbrio.",
    body: `As quedas são um dos principais riscos à saúde do idoso, podendo levar a fraturas e à perda de independência. A boa notícia: grande parte delas pode ser prevenida com fortalecimento, treino de equilíbrio e alguns cuidados em casa.

## O que aumenta o risco
- Fraqueza muscular nas pernas
- Equilíbrio e reflexos reduzidos
- Tonturas, alguns remédios e problemas de visão
- Tapetes soltos, pouca luz e pisos escorregadios

## Como a fisioterapia ajuda
O tratamento trabalha força, equilíbrio e a forma de caminhar, com exercícios seguros e progressivos. Também orienta adaptações na casa para reduzir riscos.

## Em casa
- Retire tapetes soltos e fios no caminho
- Boa iluminação, principalmente à noite
- Barras de apoio no banheiro e corrimão nas escadas

Treinar equilíbrio e força é a forma mais eficaz de manter o idoso em pé, com segurança e confiança.

${D}` },

  { title: "Artrose no idoso: dá para viver sem dor?",
    excerpt: "A artrose é o desgaste natural das articulações, muito comum na terceira idade. Entenda por que exercício é o principal tratamento e como controlar a dor.",
    body: `A artrose (ou osteoartrite) é o desgaste da cartilagem das articulações — comum em joelhos, quadril e mãos, principalmente com o envelhecimento. Ela não tem "cura", mas dá, sim, para controlar a dor e viver bem.

## Por que o exercício é o principal tratamento
Pode parecer contraintuitivo, mas o movimento orientado é um dos melhores remédios para a artrose:
- Músculo forte protege e "amortece" a articulação
- Movimento nutre a cartilagem e reduz a rigidez
- Menos sobrecarga = menos dor

## O que a fisioterapia oferece
- Fortalecimento específico e de baixo impacto
- Alívio da dor e ganho de mobilidade
- Orientações para o dia a dia e controle de peso

Ficar parado piora a artrose. Um programa bem conduzido devolve movimento e qualidade de vida.

${D}` },

  { title: "Recuperação após fratura de fêmur no idoso: como funciona",
    excerpt: "A fratura de fêmur é séria, mas a reabilitação bem feita é decisiva para o idoso voltar a andar. Veja como funciona a fisioterapia nesse processo.",
    body: `A fratura de fêmur (quadril) é uma das lesões mais sérias na terceira idade, geralmente após uma queda. A reabilitação é parte essencial da recuperação — e começar cedo faz muita diferença para o idoso voltar a andar.

## Por que a fisioterapia é tão importante
Depois da cirurgia, ficar muito tempo parado leva à perda rápida de força e à rigidez. A fisioterapia atua para:
- Recuperar movimento e reduzir a dor
- Fortalecer a musculatura de forma progressiva
- Treinar a caminhada com segurança, até a volta da independência

## O processo, em etapas
Começa com movimentos suaves e sai da cama o quanto antes (com liberação médica), evolui para ficar em pé e dar os primeiros passos com apoio, e avança até caminhar sozinho. Cada etapa respeita o ritmo e a dor do paciente.

Paciência e constância são chave: a recuperação é gradual, mas o objetivo é sempre devolver autonomia.

${D}` },

  { title: "Reabilitação pós-AVC: o papel da fisioterapia",
    excerpt: "Após um AVC, a fisioterapia é fundamental para recuperar movimento e independência. Entenda como funciona e por que começar cedo importa tanto.",
    body: `O AVC (derrame) pode deixar sequelas no movimento, na força e no equilíbrio. A fisioterapia é peça central da reabilitação, ajudando o cérebro e o corpo a reaprenderem movimentos e a recuperarem o máximo de independência possível.

## Como a fisioterapia atua
- Estimula o movimento do lado afetado
- Trabalha força, equilíbrio e coordenação
- Treina atividades do dia a dia (sentar, levantar, andar)
- Previne complicações da imobilidade

## Por que começar cedo
O período inicial após o AVC é muito importante, mas há ganhos possíveis também mais tarde. Cada caso é único: o programa é individual e evolui conforme a resposta do paciente.

## Constância é tudo
A reabilitação é um processo. Com acompanhamento e treino regular, muitos pacientes recuperam funções importantes e ganham qualidade de vida.

${D}` },

  { title: "Fortalecimento muscular para idosos: por que é essencial",
    excerpt: "A perda de massa muscular com a idade tem nome — sarcopenia — e consequências sérias. Veja por que fortalecer é um dos melhores cuidados na terceira idade.",
    body: `A partir de certa idade, é comum perder massa e força muscular — um processo chamado sarcopenia. Ela está ligada a mais quedas, mais fraqueza e menos independência. A ótima notícia: dá para reverter boa parte disso com exercício.

## Por que músculo importa tanto
- Protege as articulações e os ossos
- Melhora o equilíbrio e reduz quedas
- Mantém a autonomia (levantar, andar, carregar)
- Ajuda no controle de doenças como diabetes

## Nunca é tarde para começar
Estudos mostram que idosos ganham força em qualquer idade quando treinam de forma orientada. O segredo é a progressão segura, respeitando o corpo.

## Com acompanhamento
A fisioterapia monta um programa individual, seguro e eficaz — especialmente importante para quem tem dores, doenças crônicas ou já perdeu força.

${D}` },

  { title: "Fisioterapia domiciliar (home care) para idosos em Manaus",
    excerpt: "Quando sair de casa é difícil, a fisioterapia vai até o idoso. Entenda como funciona o atendimento domiciliar e para quem ele é indicado.",
    body: `Nem todo idoso consegue se deslocar até um studio — seja por dificuldade de locomoção, pós-operatório ou fragilidade. A fisioterapia domiciliar (home care) leva o tratamento até a casa do paciente, com segurança e conforto.

## Para quem é indicada
- Idosos com mobilidade reduzida
- Recuperação pós-cirurgia, fratura ou internação
- Reabilitação pós-AVC
- Quem precisa de acompanhamento e não pode se deslocar

## Vantagens do atendimento em casa
- Conforto e menos risco de deslocamento
- Exercícios adaptados ao ambiente real do paciente
- Mais proximidade com a família e a rotina

## Como funciona no Studio Rubi
Em Manaus, o atendimento domiciliar é feito com avaliação individual e um plano personalizado. Fale com a gente para saber a disponibilidade na sua região.

${D}` },

  // ---------- CRIANÇA ----------
  { title: "Fisioterapia infantil: para que serve e quando procurar",
    excerpt: "A fisioterapia pediátrica ajuda no desenvolvimento e na saúde da criança em várias fases. Saiba para que serve e quais sinais merecem atenção.",
    body: `A fisioterapia infantil cuida do movimento, do desenvolvimento e da saúde da criança — do bebê ao adolescente. Ela pode atuar em situações do desenvolvimento motor, respiratórias, posturais e ortopédicas.

## Quando procurar
- Atraso para sustentar a cabeça, sentar, engatinhar ou andar
- Torcicolo no bebê (cabeça sempre virada para o mesmo lado)
- Alterações de postura, pés ou forma de andar
- Condições respiratórias frequentes
- Após lesões ou cirurgias

## Como funciona
O trabalho é lúdico e adaptado à idade — para a criança, é quase uma brincadeira. A avaliação define o que precisa ser estimulado, e os pais recebem orientações para o dia a dia.

## Quanto antes, melhor
No desenvolvimento infantil, a intervenção precoce costuma trazer os melhores resultados. Na dúvida, vale procurar avaliação: identificar cedo é sempre mais fácil de resolver.

${D}` },

  { title: "Meu filho anda na ponta do pé: é normal?",
    excerpt: "Andar na ponta do pé é comum em quem está aprendendo a andar, mas quando persiste merece atenção. Entenda quando avaliar.",
    body: `Muitas crianças andam na ponta do pé quando estão aprendendo a caminhar — e, na maioria das vezes, isso desaparece sozinho. Mas quando o hábito persiste, vale uma avaliação para entender o motivo.

## Quando costuma ser normal
- Fase inicial da caminhada (por volta dos primeiros passos)
- De forma ocasional, alternando com o pé todo no chão

## Quando vale avaliar
- Persiste após os 2–3 anos ou é a forma predominante de andar
- A criança não consegue apoiar o calcanhar
- Vem junto com rigidez, quedas frequentes ou atraso motor

## O que a fisioterapia faz
A avaliação verifica flexibilidade, força e o desenvolvimento. Quando necessário, o tratamento inclui alongamentos, fortalecimento e estímulos para o padrão correto de caminhada.

Na dúvida, o melhor caminho é conversar com um profissional — observar cedo evita que o hábito se firme.

${D}` },

  { title: "Torcicolo congênito no bebê: como a fisioterapia trata",
    excerpt: "Quando o bebê mantém a cabecinha sempre virada para o mesmo lado, pode ser torcicolo congênito. Veja como a fisioterapia ajuda — e por que começar cedo.",
    body: `O torcicolo muscular congênito é uma condição comum em bebês, em que um músculo do pescoço fica mais encurtado, deixando a cabeça inclinada ou virada para um lado. Percebido cedo, responde muito bem à fisioterapia.

## Sinais para observar
- O bebê mantém a cabeça sempre virada para o mesmo lado
- Dificuldade para virar o pescoço para os dois lados
- Preferência para mamar ou olhar sempre para um lado

## Como a fisioterapia trata
O tratamento é suave e inclui alongamentos, estímulos para o bebê virar para os dois lados e orientações de posicionamento no colo, no berço e nas brincadeiras. Os pais participam ativamente no dia a dia.

## Por que começar cedo
Quanto mais cedo se inicia, mais rápida e completa costuma ser a recuperação, ajudando também no desenvolvimento simétrico do bebê. Na suspeita, procure avaliação.

${D}` },

  { title: "Pé chato na criança: precisa tratar?",
    excerpt: "O pé chato assusta muitos pais, mas na maioria das crianças faz parte do desenvolvimento. Entenda quando é só uma fase e quando avaliar.",
    body: `O "pé chato" (sem o arco plantar visível) é muito comum em crianças pequenas — e, na maior parte dos casos, faz parte do desenvolvimento normal. O arco costuma se formar com o crescimento.

## Quando geralmente é só uma fase
- Crianças pequenas, sem dor e sem queixas
- O arco aparece quando a criança fica na ponta dos pés
- Não atrapalha correr e brincar

## Quando vale avaliar
- Dor nos pés, pernas ou cansaço para caminhar
- Pé chato rígido (que não muda de forma)
- Desgaste desigual do calçado ou quedas frequentes

## O que pode ser feito
Quando necessário, a fisioterapia trabalha fortalecimento, equilíbrio e estímulos ao arco, além de orientar sobre calçado e atividades. Na maioria, é acompanhamento — não "conserto" às pressas.

Na dúvida, uma avaliação tranquiliza e define se é preciso agir.

${D}` },

  { title: "Atraso no desenvolvimento motor do bebê: sinais de alerta",
    excerpt: "Cada bebê tem seu ritmo, mas alguns marcos ajudam a acompanhar o desenvolvimento. Veja sinais que merecem avaliação — sem alarmismo.",
    body: `Cada bebê se desenvolve no seu tempo, mas existem marcos que ajudam a acompanhar se está tudo caminhando bem. Perceber cedo um possível atraso permite estimular na hora certa.

## Marcos que orientam (referência, não regra rígida)
- Sustentar a cabeça nos primeiros meses
- Sentar sem apoio por volta da metade do primeiro ano
- Engatinhar e ficar em pé com apoio ao longo do primeiro ano
- Primeiros passos por volta de um ano a um ano e pouco

## Sinais de alerta
- Muita "molece" ou muita rigidez no corpo
- Não usar igualmente os dois lados
- Atraso importante em vários marcos ao mesmo tempo

## Como a fisioterapia ajuda
Com estímulos adequados à fase, a fisioterapia favorece o desenvolvimento motor e orienta os pais. Intervir cedo costuma trazer os melhores resultados.

Sem alarmismo: na dúvida, procure avaliação — é a forma mais tranquila de cuidar.

${D}` },

  { title: "Postura da criança e a mochila escolar: como proteger a coluna",
    excerpt: "Mochila pesada e má postura preocupam muitos pais. Veja dicas simples para proteger a coluna da criança no dia a dia escolar.",
    body: `A fase escolar exige muito da postura das crianças: horas sentadas, mochilas pesadas e muito tempo em telas. Cuidar disso agora ajuda a evitar dores e vícios posturais no futuro.

## A mochila certa
- Peso ideal: quanto mais leve, melhor (evite exageros)
- Use as **duas alças**, ajustadas e rentes às costas
- Prefira mochilas de rodinha quando o peso for grande

## No dia a dia
- Cadeira e mesa na altura adequada para estudar
- Pausas para levantar e se movimentar
- Reduzir o tempo curvado sobre o celular ("text neck")
- Estimular brincadeiras ativas e esporte

## Quando procurar ajuda
Queixas de dor nas costas, ombros desalinhados ou cansaço postural merecem avaliação. A fisioterapia (e o Pilates) ajudam a fortalecer e reequilibrar a postura da criança de forma leve e divertida.

${D}` },

  { title: "Fisioterapia respiratória em crianças: quando é indicada",
    excerpt: "A fisioterapia respiratória ajuda crianças em quadros como bronquiolite e acúmulo de secreção. Entenda quando ela é indicada e como funciona.",
    body: `A fisioterapia respiratória ajuda a criança a respirar melhor e a eliminar secreções, sendo bastante usada em quadros respiratórios comuns na infância. É feita de forma suave e sempre com indicação profissional.

## Quando costuma ser indicada
- Acúmulo de secreção ("catarro") difícil de eliminar
- Quadros como bronquiolite e bronquite (conforme orientação)
- Algumas condições respiratórias crônicas
- Recuperação de infecções respiratórias

## Como funciona
Com técnicas manuais e exercícios adaptados à idade, ajuda a soltar e eliminar a secreção e a melhorar a ventilação. Em bebês e crianças, é feita com cuidado e leveza.

## Importante
A indicação e o momento certo dependem de avaliação — nem todo quadro precisa de fisioterapia respiratória. Sempre siga a orientação do pediatra e do fisioterapeuta.

${D}` },

  { title: "Pilates para crianças e adolescentes: benefícios para a postura",
    excerpt: "O Pilates não é só para adultos. Veja como ele ajuda crianças e adolescentes a ganharem postura, força e consciência corporal.",
    body: `O Pilates pode ser um ótimo aliado na infância e adolescência — fase de muito crescimento, telas e mochilas pesadas. Adaptado à idade, ele vira quase uma brincadeira com benefícios reais.

## Benefícios
- Melhora da postura e da consciência corporal
- Fortalecimento do core e do corpo todo
- Mais equilíbrio, coordenação e flexibilidade
- Ajuda a compensar o excesso de tempo sentado e em telas

## Para quem é interessante
- Crianças e adolescentes com queixas posturais
- Quem sente dores nas costas ligadas à rotina escolar
- Complemento para quem pratica esportes

## Com segurança
Os exercícios são leves, lúdicos e adaptados à fase de crescimento. Uma avaliação inicial garante que tudo seja feito do jeito certo para cada idade.

${D}` },

  // ---------- SAÚDE DA MULHER ----------
  { title: "Incontinência de esforço ou de urgência: qual a diferença?",
    excerpt: "Perder urina ao tossir é diferente de sentir uma vontade súbita e incontrolável. Entenda os tipos de incontinência e como o tratamento muda em cada um.",
    body: `Nem toda perda de urina é igual. Entender o tipo ajuda a tratar melhor — e a fisioterapia pélvica atua nos principais deles.

## Incontinência de esforço
É a perda ao **fazer força**: tossir, rir, espirrar, levantar peso ou se exercitar. Costuma estar ligada à fraqueza do assoalho pélvico. Responde muito bem ao fortalecimento orientado.

## Incontinência de urgência
É a **vontade súbita e forte** de urinar, difícil de segurar, às vezes com perda antes de chegar ao banheiro. Envolve o controle da bexiga, e o tratamento inclui treino vesical e da musculatura.

## Incontinência mista
Junta as duas — bastante comum.

## Por que avaliar
O tratamento certo depende do tipo. A fisioterapia pélvica avalia e monta um plano específico, muitas vezes com ótimos resultados sem cirurgia. Em alguns casos, é combinada com conduta médica.

${D}` },

  { title: "Exercícios de Kegel: como fazer do jeito certo",
    excerpt: "Os exercícios de Kegel fortalecem o assoalho pélvico, mas muita gente faz errado e não vê resultado. Veja como acertar a técnica.",
    body: `Os exercícios de Kegel fortalecem os músculos do assoalho pélvico e ajudam em questões como incontinência urinária. O problema: muita gente contrai o músculo errado — e não vê resultado.

## Como identificar o músculo certo
É a musculatura que você usaria para "segurar o xixi" ou prender um gás. A contração é interna, para dentro e para cima — **sem** apertar barriga, glúteos ou coxas, e sem prender a respiração.

## Erros comuns
- Fazer força com a barriga em vez do assoalho pélvico
- Prender a respiração
- Contrair o tempo todo (o músculo também precisa relaxar)

## Por que a orientação ajuda tanto
Na fisioterapia pélvica, o profissional confirma se você está ativando a musculatura certa e ajusta a intensidade e a frequência para o seu caso. Isso faz toda a diferença nos resultados.

${D}` },

  { title: "Dor na relação sexual: como a fisioterapia pélvica ajuda",
    excerpt: "Dor durante a relação é mais comum do que se fala e tem tratamento. Entenda as causas e como a fisioterapia pélvica pode ajudar, com acolhimento.",
    body: `Sentir dor na relação sexual (dispareunia) é mais comum do que se imagina — e não deve ser encarado como "normal" ou motivo de vergonha. Em muitos casos, a fisioterapia pélvica ajuda de forma importante.

## Possíveis causas
- Tensão excessiva dos músculos do assoalho pélvico
- Alterações do pós-parto ou da menopausa
- Cicatrizes, secura ou outras condições de saúde

## Como a fisioterapia pélvica atua
- Relaxamento e alongamento da musculatura tensa
- Melhora da consciência e do controle da região
- Técnicas para reduzir a dor e recuperar o conforto

## Com acolhimento
O atendimento é individual, respeitoso e no seu tempo. Quando necessário, o cuidado é feito em conjunto com o médico (ginecologista). Procurar ajuda é o primeiro passo — tem solução.

${D}` },

  { title: "Prolapso genital: quando os órgãos pélvicos 'caem'",
    excerpt: "A sensação de peso ou de algo 'descendo' na vagina pode ser um prolapso. Entenda o que é e como a fisioterapia pélvica ajuda nos casos leves e moderados.",
    body: `O prolapso dos órgãos pélvicos acontece quando a bexiga, o útero ou o intestino "descem" por enfraquecimento das estruturas de suporte. É comum e costuma causar sensação de peso ou de "bola" na vagina.

## Sinais comuns
- Sensação de peso ou de algo descendo na região íntima
- Desconforto que piora ao ficar muito tempo em pé
- Às vezes junto com escapes de urina

## Como a fisioterapia pélvica ajuda
Nos casos **leves e moderados**, o fortalecimento e a coordenação do assoalho pélvico podem reduzir os sintomas e melhorar o suporte, evitando a progressão. Também há orientações para o dia a dia (evitar esforços que pioram).

## Quando é cirúrgico
Casos mais avançados podem precisar de avaliação médica e, às vezes, cirurgia. A fisioterapia é útil antes e depois. Uma avaliação define o melhor caminho.

${D}` },

  { title: "Saúde íntima na menopausa: o que a fisioterapia pélvica oferece",
    excerpt: "A menopausa traz mudanças na saúde íntima, como secura e mais escapes de urina. Veja como a fisioterapia pélvica ajuda nessa fase.",
    body: `A queda dos hormônios na menopausa afeta também a região íntima: é comum surgirem secura, desconforto e mais episódios de escape de urina. A fisioterapia pélvica ajuda a manter conforto e qualidade de vida nessa fase.

## O que muda
- Ressecamento e sensibilidade da região íntima
- Enfraquecimento do assoalho pélvico
- Mais chances de incontinência urinária

## Como a fisioterapia pélvica ajuda
- Fortalecimento e melhora da circulação local
- Alívio de desconfortos e melhora do controle urinário
- Orientações para o dia a dia e para a vida sexual

## Cuidado em conjunto
Muitas vezes o melhor resultado vem do cuidado combinado com o ginecologista. A fisioterapia é uma aliada importante para viver essa fase com mais bem-estar.

${D}` },

  // ---------- GESTANTE ----------
  { title: "Fisioterapia pélvica na gestação: preparação para o parto",
    excerpt: "Preparar o assoalho pélvico durante a gravidez pode ajudar no parto e na recuperação. Entenda como a fisioterapia pélvica atua na gestação.",
    body: `A fisioterapia pélvica na gravidez cuida da musculatura que participa diretamente da gestação e do parto. Feita com orientação, ajuda a chegar mais preparada ao grande dia e a se recuperar melhor depois.

## O que ela trabalha
- Percepção, força e **relaxamento** do assoalho pélvico
- Preparação do períneo para o parto
- Alívio de desconfortos como dor lombar e pélvica

## Por que importa
Um assoalho pélvico consciente e com bom controle pode contribuir para o parto e ajuda na recuperação do pós-parto, reduzindo o risco de escapes de urina.

## Segurança em primeiro lugar
Tudo é feito de forma individual, respeitando o momento da gestação e com liberação do obstetra. Cada gravidez é única — por isso a avaliação é essencial.

${D}` },

  { title: "Preparação para o parto normal: exercícios que ajudam",
    excerpt: "Movimento, respiração e posições podem ajudar no trabalho de parto. Veja como a preparação física contribui para um parto normal mais tranquilo.",
    body: `Chegar ao parto com o corpo preparado faz diferença. Exercícios de mobilidade, respiração e consciência corporal ajudam a lidar melhor com o trabalho de parto — sempre com liberação médica.

## O que costuma ajudar
- **Mobilidade do quadril e da pelve** (facilita a passagem do bebê)
- **Respiração** e relaxamento para lidar com as contrações
- **Fortalecimento e percepção do assoalho pélvico**
- Posições e movimentos para o trabalho de parto

## Benefícios
- Mais conforto e controle durante o parto
- Melhor recuperação no pós-parto
- Menos desconfortos ao longo da gestação

## Com acompanhamento
Um programa individual, adaptado ao seu trimestre e à sua saúde, é o caminho mais seguro. Converse com o obstetra e procure avaliação com um fisioterapeuta.

${D}` },

  { title: "Ciática na gravidez: o que fazer para aliviar",
    excerpt: "Dor que desce da lombar para a perna é comum na gestação. Entenda a 'ciática' na gravidez e o que ajuda a aliviar com segurança.",
    body: `Muitas gestantes sentem uma dor que parte da lombar/glúteo e desce pela perna — muitas vezes chamada de "ciática". Ela costuma estar ligada às mudanças da gravidez e, na maioria dos casos, melhora com cuidados adequados.

## Por que acontece
- Peso da barriga e mudança do centro de gravidade
- Articulações mais frouxas pelos hormônios
- Tensão em músculos do glúteo e da pelve

## O que ajuda a aliviar
- Exercícios e alongamentos orientados
- Correção de postura ao sentar, deitar e dormir (travesseiro entre as pernas ajuda)
- Calor local e mobilidade suave
- Evitar ficar muito tempo na mesma posição

## Quando procurar ajuda
Dor intensa, perda de força ou dormência importante merecem avaliação. Um fisioterapeuta monta um plano seguro para aliviar a dor sem risco para você e o bebê.

${D}` },

  { title: "Recuperação pós-parto: quando voltar a se exercitar",
    excerpt: "Depois do parto, o corpo precisa de tempo e cuidado para voltar aos exercícios. Veja por onde começar, com segurança, seja parto normal ou cesárea.",
    body: `Voltar a se exercitar depois do parto é ótimo — mas com calma e na ordem certa. O corpo passou por grandes mudanças e precisa de uma reintrodução gradual e segura.

## Respeite o tempo
- Aguarde a **liberação médica** (geralmente na consulta de revisão do pós-parto)
- Cesárea e parto normal têm ritmos diferentes
- Não compare seu tempo com o de outras mães

## Por onde começar
- **Assoalho pélvico e core profundo** primeiro (base de tudo)
- Avaliar **diástase abdominal** antes de abdominais tradicionais
- Caminhadas leves e evoluir aos poucos

## Como a fisioterapia ajuda
A fisioterapia (e o Pilates pós-parto) guiam esse retorno com segurança, recuperando força, postura e o controle do assoalho pélvico — reduzindo dores e escapes de urina.

${D}` },

  { title: "Pilates para gestantes em Manaus: como funciona",
    excerpt: "Pilates na gravidez com acompanhamento profissional é seguro e traz muitos benefícios. Veja como funciona no Studio Rubi, em Manaus.",
    body: `O Pilates para gestantes é uma das formas mais indicadas de se manter ativa na gravidez — sempre com liberação médica e acompanhamento profissional que adapta tudo para cada fase.

## Benefícios
- Alívio das dores lombar e pélvica
- Fortalecimento do core e do assoalho pélvico
- Melhora da postura, da respiração e da disposição
- Preparação do corpo para o parto e o pós-parto

## Como é no Studio Rubi
- Avaliação individual antes de começar
- Exercícios adaptados ao seu trimestre e à sua saúde
- Acompanhamento de perto, com segurança

## Para começar
Traga a liberação do obstetra e agende uma avaliação. A partir dela, montamos um plano sob medida para você viver uma gestação mais confortável e ativa, aqui em Manaus.

${D}` },

  { title: "Inchaço e dores nas pernas na gravidez: como aliviar",
    excerpt: "Pernas inchadas e pesadas são comuns na gestação. Entenda por que acontece e o que ajuda a aliviar com segurança.",
    body: `O inchaço (edema) e a sensação de pernas pesadas são queixas frequentes na gravidez, principalmente no fim do dia e nos últimos meses. Costumam estar ligados às mudanças normais da gestação na circulação.

## Por que acontece
- Aumento do volume de líquidos no corpo
- O útero maior dificulta o retorno do sangue das pernas
- Ficar muito tempo em pé ou sentada piora

## O que ajuda a aliviar
- Movimento e exercícios orientados (ativam a circulação)
- Elevar as pernas ao descansar
- Evitar longos períodos parada; hidratar-se bem
- Meias de compressão, se indicadas

## Quando procurar ajuda
Inchaço súbito e intenso, em um lado só, ou com dor forte, merece avaliação médica. Para o desconforto do dia a dia, a fisioterapia e o Pilates ajudam bastante.

${D}` },

  // ---------- PILATES ----------
  { title: "Pilates terapêutico x Pilates comum: qual a diferença?",
    excerpt: "Nem todo Pilates é igual. Entenda a diferença entre o Pilates terapêutico (conduzido por fisioterapeuta) e o Pilates de condicionamento.",
    body: `Você já deve ter ouvido falar em "Pilates clínico" ou "terapêutico". A diferença para o Pilates comum está no objetivo e na condução — e isso importa, principalmente para quem tem dor ou alguma condição de saúde.

## Pilates comum (condicionamento)
Foco em condicionamento físico, força e bem-estar geral, em geral em turmas. Ótimo para quem quer se manter ativo e saudável.

## Pilates terapêutico (clínico)
Conduzido por **fisioterapeuta**, parte de uma **avaliação individual** e trata questões específicas: dor lombar, hérnia, pós-operatório, postura, gestação, entre outras. Os exercícios são escolhidos para o seu caso e evoluem conforme a resposta.

## Qual escolher?
- Sem queixas, quer se condicionar? Pilates de condicionamento resolve.
- Tem dor, lesão ou uma condição específica? O Pilates terapêutico é o indicado.

Na dúvida, uma avaliação define o melhor caminho para você.

${D}` },

  { title: "Pilates para hérnia de disco: pode fazer?",
    excerpt: "Ter hérnia de disco não significa parar de se mexer — pelo contrário. Entenda como o Pilates, com orientação, ajuda no controle da dor.",
    body: `Receber o diagnóstico de hérnia de disco assusta, mas ficar parado costuma piorar. Com orientação profissional, o Pilates pode ser um grande aliado no controle da dor e na volta ao movimento.

## Por que o Pilates ajuda
- Fortalece o core, que estabiliza e protege a coluna
- Melhora a postura e reduz sobrecargas
- Trabalha com controle e baixo impacto, respeitando a dor
- Devolve confiança para se movimentar

## Com segurança
O ponto-chave é a individualização: alguns movimentos precisam ser adaptados ou evitados na fase aguda. Por isso o **Pilates terapêutico**, conduzido por fisioterapeuta e a partir de avaliação, é o mais indicado nesses casos.

## Importante
Nem toda dor nas costas é hérnia, e nem toda hérnia dói. O tratamento é sempre pela pessoa, não pelo exame. Uma boa avaliação define o caminho seguro.

${D}` },

  { title: "Pilates para iniciantes: como é a primeira aula?",
    excerpt: "Nunca fez Pilates e está curiosa? Veja como funciona a primeira aula, o que levar e por que a avaliação inicial faz diferença.",
    body: `Se você nunca fez Pilates, relaxe: o método é para todos os níveis, idades e condições físicas. A primeira aula costuma ser tranquila e começa por entender o seu corpo.

## Começa pela avaliação
Antes de "puxar exercício", o profissional avalia sua postura, sua história e seus objetivos (dor, condicionamento, gravidez...). Assim os exercícios são escolhidos para você.

## O que esperar
- Exercícios de baixo impacto, com foco em controle e respiração
- Aparelhos e/ou solo, adaptados ao seu nível
- Ritmo respeitoso — nada de dor ou exagero

## Dicas
- Use roupa confortável que permita movimento
- Meia antiderrapante ajuda
- Avise sobre dores, cirurgias ou gestação

Você não precisa ter flexibilidade nem preparo para começar — o Pilates é justamente o caminho para conquistar isso.

${D}` },

  { title: "Quantas vezes por semana fazer Pilates para ter resultado?",
    excerpt: "Uma das dúvidas mais comuns de quem começa. Veja a frequência ideal de Pilates para sentir resultados de verdade.",
    body: `A frequência ideal de Pilates depende do seu objetivo, mas existe uma boa referência para a maioria das pessoas.

## A referência
- **2 a 3 vezes por semana** costuma ser o ideal para bons resultados
- **1 vez por semana** ajuda a manter, mas evolui mais devagar
- A constância importa mais do que a intensidade

## Por que a regularidade importa
O corpo aprende e se fortalece com repetição. Praticar de forma regular consolida força, postura e controle — e ajuda a manter as dores longe.

## E se eu tiver pouco tempo?
Melhor pouco e constante do que muito e esporádico. Mesmo 2 vezes por semana, com regularidade, trazem mudanças percebidas em algumas semanas.

Na avaliação, definimos a frequência ideal para o seu objetivo e a sua rotina.

${D}` },

  { title: "Pilates para melhorar a postura: o que esperar",
    excerpt: "Ombros curvados e dores ligadas à postura têm solução. Entenda como o Pilates trabalha a postura e em quanto tempo dá para sentir diferença.",
    body: `Passamos horas sentados e curvados sobre telas — e a postura sente o impacto. O Pilates é uma das melhores ferramentas para reeducar a postura, porque trabalha força, consciência e alinhamento juntos.

## Como o Pilates atua na postura
- Fortalece o core e os músculos que sustentam a coluna
- Melhora a consciência corporal (você percebe quando "desaba")
- Solta regiões tensas e alinha ombros e coluna

## O que esperar
- Nas primeiras semanas: mais consciência e menos desconforto
- Com constância: postura mais ereta, menos dores e mais disposição
- Resultado depende de regularidade — postura se constrói com hábito

## Some com o dia a dia
Além das aulas, pequenas mudanças (altura da tela, pausas, apoio ao sentar) potencializam os resultados. Uma avaliação identifica seus pontos a corrigir.

${D}` },

  { title: "Pilates no pós-operatório: quando começar?",
    excerpt: "Depois de uma cirurgia, o movimento certo acelera a recuperação. Veja como o Pilates entra no pós-operatório — sempre com liberação.",
    body: `Depois de cirurgias (coluna, joelho, ombro, abdominais, entre outras), a reabilitação é essencial — e o Pilates terapêutico pode fazer parte dela, ajudando a recuperar força, mobilidade e confiança.

## Quando começar
Não há um número único: o momento depende do tipo de cirurgia, da sua recuperação e, principalmente, da **liberação médica**. Começar cedo demais ou tarde demais atrapalha.

## Como o Pilates ajuda
- Recupera força e mobilidade de forma progressiva
- Trabalha com controle e baixo impacto (seguro na recuperação)
- Reeduca a postura e o movimento
- Devolve confiança para voltar à rotina

## Com acompanhamento
No pós-operatório, a individualização é tudo. Por isso o ideal é o Pilates terapêutico, conduzido por fisioterapeuta e integrado ao seu processo de reabilitação, respeitando cada etapa.

${D}` },

  { title: "Pilates para ansiedade e qualidade de vida",
    excerpt: "Além do corpo, o Pilates cuida da mente. Entenda como a prática ajuda a reduzir a ansiedade e melhorar o bem-estar.",
    body: `O Pilates não trabalha só o corpo. A combinação de movimento consciente, respiração e concentração faz dele um bom aliado para reduzir a ansiedade e melhorar a qualidade de vida.

## Por que ajuda a mente
- A **respiração** guiada acalma e reduz a tensão
- A concentração no movimento tira o foco das preocupações (efeito parecido com atenção plena)
- O exercício libera substâncias ligadas ao bem-estar
- Dormir e disposição tendem a melhorar

## Corpo e mente juntos
Aliviar dores e ganhar postura também melhora o humor — corpo e mente andam juntos. Muita gente relata sair das aulas mais leve e tranquila.

## Um complemento
O Pilates ajuda no bem-estar, mas não substitui acompanhamento de saúde mental quando necessário. É um cuidado a mais, que soma com qualidade de vida.

${D}` },

  // ---------- RPG ----------
  { title: "RPG: para que serve e como funciona",
    excerpt: "A Reeducação Postural Global trata dores e desequilíbrios olhando o corpo como um todo. Entenda o que é o RPG e para quem é indicado.",
    body: `A RPG (Reeducação Postural Global) é um método de fisioterapia criado na França por Philippe Souchard. A ideia central é tratar a causa da dor a partir da postura e das cadeias musculares — não apenas o local que dói.

## Como funciona
Em vez de olhar só o ponto da dor, o RPG analisa o corpo todo e identifica músculos encurtados e tensionados que geram desequilíbrios. Com posturas de alongamento ativo, mantidas por alguns minutos, promove o reequilíbrio.

## Para que serve
- Dores na coluna (lombar, torácica e cervical)
- Hérnia de disco e alterações posturais
- Tensões musculares e dores ligadas à postura

## O que esperar
- Sessões individuais e personalizadas
- Alívio da dor, melhora da postura e da mobilidade
- Mais consciência corporal

Uma avaliação define se o RPG é o melhor caminho — sozinho ou combinado com outras abordagens.

${D}` },

  { title: "RPG para hérnia de disco: funciona?",
    excerpt: "O RPG é bastante usado no tratamento da hérnia de disco. Entenda como ele atua para aliviar a dor e melhorar a postura.",
    body: `A hérnia de disco pode gerar dor e desconforto importantes, e o RPG é uma das abordagens usadas para ajudar no controle desses sintomas, trabalhando postura e alívio de tensões.

## Como o RPG atua
O método usa posturas de alongamento das cadeias musculares para reduzir tensões e aliviar a sobrecarga sobre a coluna. Com isso, busca diminuir a dor e melhorar a mobilidade, além de corrigir posturas que agravam o quadro.

## O que esperar
- Sessões individuais e progressivas
- Alívio gradual da dor e melhora da postura
- Trabalho de consciência corporal para o dia a dia

## Importante
Cada hérnia e cada pessoa são diferentes — nem toda hérnia dói, e o tratamento é guiado pelos sintomas, não só pelo exame. O RPG pode ser combinado com Pilates e fisioterapia. A avaliação define o melhor caminho.

${D}` },

  { title: "RPG para má postura e 'corcunda': resultados",
    excerpt: "Ombros caídos e as costas arredondadas têm tratamento. Veja como o RPG ajuda a corrigir a postura e o que esperar.",
    body: `Aquela postura de ombros caídos e costas arredondadas (às vezes chamada de "corcunda") é cada vez mais comum, com tanto tempo em telas. O RPG é um dos métodos indicados para reeducar essa postura.

## Por que a postura "desaba"
- Músculos da frente do corpo encurtados
- Musculatura das costas enfraquecida
- Hábitos do dia a dia (celular, computador, forma de sentar)

## Como o RPG ajuda
Com posturas de alongamento ativo, o RPG reequilibra as cadeias musculares — alongando o que está encurtado e ativando o que está fraco. O resultado é uma postura mais alinhada e menos dores associadas.

## O que esperar
- Melhora gradual do alinhamento
- Mais consciência corporal (você percebe e corrige a postura)
- Alívio de tensões no pescoço e nas costas

Constância e exercícios para casa potencializam os resultados. A avaliação mostra seus pontos a trabalhar.

${D}` },

  { title: "Quantas sessões de RPG são necessárias?",
    excerpt: "Uma dúvida comum de quem vai começar o RPG. Entenda o que define a quantidade de sessões e por que varia de pessoa para pessoa.",
    body: `Uma das perguntas mais comuns sobre o RPG é "quantas sessões vou precisar?". A resposta honesta: depende — mas dá para entender o que influencia.

## O que define a quantidade
- O tipo e o tempo do problema (dor recente x crônica)
- A gravidade das alterações posturais
- A resposta do seu corpo ao tratamento
- A constância e os cuidados no dia a dia

## Uma referência
Em geral, o tratamento acontece ao longo de algumas semanas, com reavaliações para acompanhar a evolução e ajustar o plano. Alguns sentem alívio já nas primeiras sessões; a correção postural, porém, é um processo.

## O mais importante
Mais do que um número fixo, o que conta é a evolução. Na avaliação inicial, traçamos um plano com metas claras e reavaliamos ao longo do caminho.

${D}` },

  { title: "RPG para dor no pescoço e cervical",
    excerpt: "Dor no pescoço e na cervical costuma ter fundo postural. Veja como o RPG ajuda a aliviar e a evitar que a dor volte.",
    body: `A dor no pescoço (região cervical) é queixa comum de quem passa horas no computador e no celular. Muitas vezes tem fundo postural — e é aí que o RPG pode ajudar.

## Por que a cervical dói
- Cabeça projetada para frente ("text neck")
- Tensão acumulada nos músculos do pescoço e ombros
- Encurtamentos e desequilíbrios das cadeias musculares

## Como o RPG atua
Com posturas de alongamento ativo, o RPG relaxa a musculatura tensionada e reequilibra as cadeias que puxam a cabeça para frente. Isso alivia a dor e trabalha a causa, não só o sintoma.

## Para durar
Além das sessões, ajustes no dia a dia fazem diferença: altura da tela, pausas e consciência postural. A avaliação identifica o que está gerando a sua dor e o melhor caminho para resolver.

${D}` },

  // ---------- DOR COMUM + LOCAL ----------
  { title: "Dor nas costas: quando procurar um fisioterapeuta?",
    excerpt: "Quase todo mundo sente dor nas costas em algum momento. Saiba quando é hora de procurar ajuda profissional — e quais sinais não ignorar.",
    body: `A dor nas costas é uma das queixas mais comuns do mundo. A maioria dos episódios melhora, mas saber a hora de procurar ajuda evita que a dor vire um problema crônico.

## Quando procurar um fisioterapeuta
- A dor dura mais de alguns dias ou volta com frequência
- Atrapalha dormir, trabalhar ou as atividades do dia a dia
- Vem acompanhada de tensão e má postura
- Você quer tratar a causa e evitar que volte

## Sinais que pedem avaliação médica
- Dor que desce forte pela perna, com dormência ou fraqueza
- Dor após trauma/queda
- Febre, perda de peso ou alterações de xixi/fezes junto com a dor

## Como a fisioterapia ajuda
Com avaliação, exercícios (como Pilates terapêutico e RPG) e orientações, a fisioterapia alivia a dor e trata a causa — reduzindo as chances de a dor voltar.

${D}` },

  { title: "Fisioterapeuta ou ortopedista: qual procurar primeiro?",
    excerpt: "Com uma dor no corpo, bate a dúvida: médico ou fisioterapeuta? Entenda o papel de cada um e como eles se complementam.",
    body: `Quando surge uma dor musculoesquelética, é comum a dúvida: procurar o ortopedista ou o fisioterapeuta? Os dois têm papéis diferentes e, muitas vezes, complementares.

## O papel do ortopedista (médico)
Diagnostica, pede exames, prescreve medicamentos e indica cirurgia quando necessário. É a escolha quando há trauma importante, suspeita de fratura ou sinais de alerta.

## O papel do fisioterapeuta
Avalia o movimento e a função, trata a dor com exercícios e técnicas, reabilita e previne recaídas. É quem cuida do dia a dia da recuperação e do fortalecimento.

## Como decidir
- Trauma forte, suspeita de fratura ou sinais graves → comece pelo médico
- Dores posturais, tensões, recuperação e prevenção → a fisioterapia atua muito bem
- Em muitos casos, o ideal é o cuidado **em conjunto**

Na dúvida, uma avaliação orienta o melhor caminho — e nós indicamos quando é hora de envolver o médico.

${D}` },

  { title: "Melhor Pilates e Fisioterapia em Manaus: como escolher",
    excerpt: "Na hora de escolher um studio de Pilates e Fisioterapia em Manaus, alguns pontos fazem diferença. Veja o que observar para cuidar bem do seu corpo.",
    body: `Escolher onde cuidar do seu corpo é uma decisão importante. Em Manaus, há várias opções de Pilates e Fisioterapia — e alguns critérios ajudam a decidir com segurança.

## O que observar
- **Profissional qualificado:** fisioterapeuta com experiência para conduzir e adaptar os exercícios
- **Avaliação individual:** o atendimento deve começar entendendo o seu caso, não "puxando exercício" genérico
- **Atendimento personalizado:** turmas pequenas ou individuais permitem cuidado de perto
- **Ambiente acolhedor e seguro**
- **Acompanhamento da evolução** ao longo do tratamento

## Por que a avaliação importa tanto
Cada corpo é diferente. Um bom lugar entende a sua dor, seus objetivos e sua rotina antes de montar o plano — é isso que traz resultado de verdade.

## Studio Rubi
Em Manaus, unimos Pilates e Fisioterapia com avaliação individual e plano sob medida — inclusive atendimento domiciliar. Agende uma avaliação e venha conhecer.

${D}` },
];

const rows = POSTS.map((p) => ({
  title: p.title, slug: slugify(p.title), excerpt: p.excerpt, body: p.body,
  audience: "public", source: "internal", published: true,
}));

const { data, error } = await supabase.from("content_posts").upsert(rows, { onConflict: "slug" }).select("slug");
if (error) { console.error("Erro:", error.message); process.exit(1); }
console.log(`✅ ${data.length} posts publicados (lote 2).`);
