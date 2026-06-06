import type { BlogPost } from "../types"

export const METODOS_TRATAMENTOS_POSTS: BlogPost[] = [
  {
    slug: "pilates-ou-musculacao-para-dor-cronica",
    title: "Pilates ou musculação para dor crônica: qual escolher?",
    excerpt:
      "Pilates e musculação têm propósitos diferentes. Veja como escolher de acordo com o seu objetivo e o seu corpo.",
    metaTitle:
      "Pilates ou musculação para dor crônica: qual escolher? | Studio Rubi",
    metaDescription:
      "Pilates ou musculação para tratar dor crônica? Entenda as diferenças, indicações e quando cada um é mais eficaz.",
    keywords: [
      "pilates ou musculação",
      "pilates vs musculação dor",
      "tratamento dor crônica",
      "exercício para dor",
    ],
    category: "Métodos e Tratamentos",
    publishedAt: "2026-06-18",
    readingTime: 5,
    coverImage: "/images/blog/cover-metodos-e-tratamentos.svg",
    ctaServiceSlug: "pilates-terapeutico-manaus",
    relatedSlugs: [
      "pilates-solo-vs-aparelhos-diferencas",
      "o-que-e-rpg-quando-faz-efeito",
    ],
    content: [
      {
        type: "p",
        text: "Quem está com dor crônica e quer voltar a se mover sempre faz a mesma pergunta: 'Faço Pilates ou musculação?'. A resposta não é uma ou outra — é a sequência certa.",
      },
      { type: "h2", text: "O que cada método faz melhor" },
      { type: "h3", text: "Pilates Terapêutico" },
      {
        type: "p",
        text: "É melhor para: corrigir padrão de movimento, ativar musculatura profunda, reeducar postura, tratar dor sem agravar lesão. Foco em qualidade de movimento e controle motor.",
      },
      { type: "h3", text: "Musculação" },
      {
        type: "p",
        text: "É melhor para: ganho de força máxima, hipertrofia, manutenção de massa muscular, prevenção de osteoporose, performance esportiva. Foco em carga e resposta tecidual.",
      },
      { type: "h2", text: "A sequência ideal pra quem tem dor" },
      { type: "ordered", items: [
        "Fase 1 — Pilates Terapêutico para controlar a dor, reativar musculatura inibida, melhorar mobilidade e padrão de movimento (8 a 12 semanas).",
        "Fase 2 — Combinação Pilates + musculação leve, ainda com correção próxima (mais 4 a 8 semanas).",
        "Fase 3 — Musculação com carga progressiva, com Pilates 1x por semana como manutenção.",
      ]},
      { type: "h2", text: "O erro mais comum" },
      {
        type: "p",
        text: "Ir direto para a musculação com dor. O corpo compensa, fortalece o que já era forte, deixa o que era fraco ainda mais inibido. Resultado: dor persiste, pessoa para, recidiva.",
      },
      { type: "h2", text: "Quando NÃO substituir Pilates por musculação" },
      { type: "list", items: [
        "Dor lombar crônica recidivante",
        "Hérnia de disco em fase ativa",
        "Pós-cirurgia recente",
        "Disfunções posturais marcadas (escoliose, hipercifose)",
        "Diástase abdominal pós-parto",
      ]},
      {
        type: "cta",
        text: "Quer saber qual sequência é melhor pro seu caso? Agende avaliação no Studio Rubi.",
      },
    ],
  },
  {
    slug: "o-que-e-rpg-quando-faz-efeito",
    title: "O que é RPG e quando faz mais efeito que fisioterapia comum",
    excerpt:
      "RPG é diferente de fisioterapia comum. Entenda quando o método é a melhor escolha e como funciona uma sessão.",
    metaTitle:
      "O que é RPG e quando indicar | Studio Rubi Manaus",
    metaDescription:
      "RPG é o mesmo que fisioterapia? Não. Entenda quando o método é mais eficaz, como funciona uma sessão e quais são as indicações principais.",
    keywords: [
      "o que é RPG",
      "RPG fisioterapia",
      "reeducação postural global",
      "RPG manaus",
    ],
    category: "Métodos e Tratamentos",
    publishedAt: "2026-06-19",
    readingTime: 5,
    coverImage: "/images/blog/cover-metodos-e-tratamentos.svg",
    ctaServiceSlug: "rpg-manaus",
    relatedSlugs: [
      "pilates-ou-musculacao-para-dor-cronica",
      "fisioterapia-ou-quiropraxia",
    ],
    content: [
      {
        type: "p",
        text: "RPG é a sigla de Reeducação Postural Global, método criado pelo fisioterapeuta francês Philippe Souchard nos anos 1980. É uma técnica fisioterapêutica específica que trabalha o corpo como uma unidade integrada de cadeias musculares.",
      },
      { type: "h2", text: "Em que se diferencia da fisioterapia comum" },
      {
        type: "p",
        text: "Fisioterapia tradicional muitas vezes trata o sintoma onde dói. RPG enxerga compensações em cadeia: se o seu pescoço dói, talvez a origem esteja num diafragma travado, num arco do pé desalinhado ou numa cadeia anterior toda encurtada.",
      },
      { type: "h2", text: "Como é uma sessão de RPG" },
      { type: "list", items: [
        "Duração: 50 minutos a 1 hora",
        "Posturas ativas mantidas por 5 a 15 minutos",
        "Respiração guiada constante",
        "Correções manuais sutis do fisioterapeuta",
        "Trabalho de cadeia inteira em uma única postura",
        "Sem dor aguda, mas com desconforto típico de alongamento ativo prolongado",
      ]},
      { type: "h2", text: "Quando RPG é indicado" },
      { type: "list", items: [
        "Escoliose, hipercifose, hiperlordose",
        "Dor crônica de origem postural",
        "Tensão cervical, enxaqueca tensional, bruxismo",
        "Encurtamentos musculares importantes",
        "Disfunção respiratória / postural cruzada",
        "Atletas com desequilíbrios crônicos",
      ]},
      { type: "h2", text: "Quando RPG não é a primeira escolha" },
      { type: "list", items: [
        "Dor aguda intensa (primeiro controla a dor com fisioterapia, depois RPG)",
        "Pós-cirurgia recente (esperar fase de cicatrização)",
        "Quem precisa de ganho de força (RPG não é o foco)",
        "Pacientes com baixa tolerância postural (idosos frágeis, gestantes avançadas)",
      ]},
      { type: "h2", text: "Quantas sessões?" },
      {
        type: "p",
        text: "Geralmente ciclos de 10 a 20 sessões semanais, com reavaliação fotográfica ao final. Casos crônicos podem precisar de 2 ou 3 ciclos.",
      },
      {
        type: "cta",
        text: "Quer saber se RPG é indicado pro seu caso? Agende avaliação no Studio Rubi.",
      },
    ],
  },
  {
    slug: "pilates-solo-vs-aparelhos-diferencas",
    title: "Pilates Solo vs Pilates Aparelhos: as diferenças",
    excerpt:
      "Pilates Solo e Pilates de Aparelhos são complementares — mas têm propósitos diferentes. Veja qual encaixa melhor pra você.",
    metaTitle:
      "Pilates Solo vs Pilates Aparelhos: diferenças | Studio Rubi Manaus",
    metaDescription:
      "Pilates Solo (Mat) ou Aparelhos (Reformer, Cadillac)? Entenda as diferenças, vantagens e qual é mais indicado pro seu objetivo.",
    keywords: [
      "pilates solo ou aparelhos",
      "pilates mat reformer",
      "diferença pilates",
      "pilates equipamento",
    ],
    category: "Métodos e Tratamentos",
    publishedAt: "2026-06-20",
    readingTime: 4,
    coverImage: "/images/blog/cover-metodos-e-tratamentos.svg",
    ctaServiceSlug: "pilates-terapeutico-manaus",
    relatedSlugs: [
      "pilates-ou-musculacao-para-dor-cronica",
      "pilates-para-iniciantes-primeira-aula",
    ],
    content: [
      {
        type: "p",
        text: "Você ouve falar em Pilates Solo, Pilates Mat, Reformer, Cadillac, Cadeira e fica perdida. O que cada um faz? Qual é melhor pra você? Vamos clarificar.",
      },
      { type: "h2", text: "Pilates Solo (Mat Pilates)" },
      {
        type: "p",
        text: "Feito no chão, apenas com o peso do próprio corpo e acessórios simples (bolas, faixas elásticas, magic circle). Requer maior consciência corporal e controle motor — porque sem o aparelho não há resistência externa pra te ajudar.",
      },
      {
        type: "p",
        text: "Indicado para: quem já tem boa noção corporal, treino em grupo, manutenção e quem busca rotina em casa.",
      },
      { type: "h2", text: "Pilates de Aparelhos" },
      {
        type: "p",
        text: "Inclui Reformer, Cadillac, Cadeira (Wunda Chair), Barrel e outros. As molas oferecem resistência ou assistência, permitindo trabalhar movimentos específicos com mais segurança e precisão.",
      },
      {
        type: "p",
        text: "Indicado para: tratamento terapêutico, reabilitação, quem tem dor, gestantes, idosos, atletas em reabilitação. Permite muito mais variações e adaptação ao corpo.",
      },
      { type: "h2", text: "Por que no Studio Rubi usamos os dois" },
      {
        type: "p",
        text: "Aparelhos fornecem precisão e adaptação ao protocolo terapêutico. Solo treina a transferência do controle pra vida real (já que no chão a gente vive). Quase todo paciente passa pelos dois nas etapas do tratamento.",
      },
      { type: "h2", text: "Qual eu devo escolher?" },
      {
        type: "p",
        text: "Pra tratar dor ou reabilitação: comece com Aparelhos. Pra manutenção: combine os dois. Quer treino em grupo? Solo. Quer atendimento individualizado profundo? Aparelhos.",
      },
      {
        type: "cta",
        text: "Quer experimentar Pilates de Aparelhos com fisioterapeuta? Agende no Studio Rubi.",
      },
    ],
  },
  {
    slug: "fisioterapia-ou-quiropraxia",
    title: "Fisioterapia ou quiropraxia: qual é melhor pra coluna?",
    excerpt:
      "Quiropraxia e fisioterapia têm propostas diferentes. Entenda o que cada uma faz e quando faz sentido escolher cada uma.",
    metaTitle:
      "Fisioterapia ou quiropraxia: qual é melhor pra coluna? | Studio Rubi",
    metaDescription:
      "Quiropraxia ou fisioterapia para dor na coluna? Entenda as diferenças, vantagens e qual abordagem é mais indicada para cada caso.",
    keywords: [
      "fisioterapia ou quiropraxia",
      "quiropraxia vs fisioterapia",
      "tratamento coluna",
      "fisioterapia coluna manaus",
    ],
    category: "Métodos e Tratamentos",
    publishedAt: "2026-06-21",
    readingTime: 5,
    coverImage: "/images/blog/cover-metodos-e-tratamentos.svg",
    ctaServiceSlug: "fisioterapia-manaus",
    relatedSlugs: [
      "o-que-e-rpg-quando-faz-efeito",
      "lombalgia-cronica-por-que-voltou",
    ],
    content: [
      {
        type: "p",
        text: "Quando a coluna dói, você vai do médico para uma encruzilhada: fisioterapia, quiropraxia, RPG, osteopatia, acupuntura. Cada um diz que é a melhor opção. Vamos esclarecer fisioterapia versus quiropraxia.",
      },
      { type: "h2", text: "O que faz a quiropraxia" },
      {
        type: "p",
        text: "Foca em ajustes (manipulações) articulares da coluna, com objetivo de restaurar mobilidade segmentar e aliviar dor. Sessões geralmente curtas (15 a 30 minutos), centradas no ajuste manual.",
      },
      { type: "h2", text: "O que faz a fisioterapia" },
      {
        type: "p",
        text: "Inclui terapia manual (que pode incluir manipulações), cinesioterapia (exercícios terapêuticos), reeducação postural, eletroterapia e educação em dor. Sessões mais longas (45 a 60 minutos), com plano de tratamento estruturado.",
      },
      { type: "h2", text: "A diferença mais importante" },
      {
        type: "p",
        text: "Fisioterapia trata causa + sintoma. Quiropraxia tradicional foca mais no sintoma e na mobilidade articular pontual. Se você quer alívio rápido, quiropraxia pode ajudar; se quer resolver de vez, fisioterapia (com técnicas que incluem manipulações quando indicadas).",
      },
      { type: "h2", text: "Pode combinar?" },
      {
        type: "p",
        text: "Pode, mas raramente é necessário. A fisioterapia moderna inclui as mesmas técnicas manipulativas usadas em quiropraxia, somadas a tudo o que falta na quiropraxia: fortalecimento, reeducação de movimento, treinamento neuromotor.",
      },
      { type: "h2", text: "O risco que precisa estar no radar" },
      {
        type: "p",
        text: "Manipulações cervicais (no pescoço) feitas sem avaliação detalhada têm risco — embora raro — de eventos vasculares. Sempre verifique formação e CREFITO/registro do profissional que vai te atender.",
      },
      {
        type: "cta",
        text: "Quer um plano de tratamento estruturado pra coluna? Agende no Studio Rubi.",
      },
    ],
  },
  {
    slug: "quanto-tempo-tratamento-fisioterapia",
    title: "Quanto tempo dura um tratamento de fisioterapia",
    excerpt:
      "Fisioterapia é 10 sessões? 30? Depende do quê? Entenda o que define a duração do tratamento e quando é hora da alta.",
    metaTitle:
      "Quanto tempo dura um tratamento de fisioterapia | Studio Rubi",
    metaDescription:
      "Quantas sessões de fisioterapia eu vou precisar? Entenda o que define a duração e como saber se está no caminho certo.",
    keywords: [
      "quantas sessões fisioterapia",
      "duração tratamento fisioterapia",
      "fisioterapia tempo",
      "fisioterapia manaus",
    ],
    category: "Métodos e Tratamentos",
    publishedAt: "2026-06-22",
    readingTime: 4,
    coverImage: "/images/blog/cover-metodos-e-tratamentos.svg",
    ctaServiceSlug: "fisioterapia-manaus",
    relatedSlugs: [
      "lombalgia-cronica-por-que-voltou",
      "plano-saude-cobre-pilates-manaus",
    ],
    content: [
      {
        type: "p",
        text: "Toda primeira consulta de fisioterapia termina com a mesma pergunta: 'Doutora, quantas sessões vou precisar?'. A resposta honesta depende de 5 variáveis.",
      },
      { type: "h2", text: "As 5 variáveis que definem o tempo" },
      { type: "ordered", items: [
        "Tipo de quadro — agudo (entorse, lumbago) tende a 6-12 sessões. Crônico (lombalgia de 5 anos) tende a 20-40.",
        "Tempo de evolução — quadros mais antigos demandam mais tempo de tratamento.",
        "Idade — recuperação de tecido em pessoas mais jovens é mais rápida.",
        "Adesão — fazer 1x por semana versus 3x por semana muda muito o tempo total.",
        "Comorbidades — diabetes, sedentarismo, sobrepeso desaceleram a resposta.",
      ]},
      { type: "h2", text: "Padrões médios em casos comuns" },
      { type: "list", items: [
        "Lombalgia aguda: 8 a 12 sessões",
        "Lombalgia crônica: 20 a 40 sessões",
        "Pós-operatório de LCA: 60 a 80 sessões em 6-9 meses",
        "Tendinite leve: 8 a 12 sessões",
        "Reabilitação pós-AVC: tratamento contínuo de longa duração",
        "Bursite, capsulite: 12 a 20 sessões",
      ]},
      { type: "h2", text: "Como saber se está funcionando" },
      {
        type: "p",
        text: "Reavaliações a cada 6 a 10 sessões são padrão de qualidade. Você deve ver melhora objetiva: menos dor, mais amplitude, mais força. Se não vê em 4 a 6 sessões, é hora de revisar a estratégia.",
      },
      { type: "h2", text: "Quando é alta?" },
      {
        type: "p",
        text: "Alta acontece quando: sintomas resolvidos ou em nível tolerável e estável, função recuperada, paciente sabe se autocuidar. Idealmente, alta com plano de manutenção (Pilates, musculação, atividade física orientada).",
      },
      {
        type: "cta",
        text: "Quer um plano realista pra resolver sua dor? Agende avaliação no Studio Rubi.",
      },
    ],
  },
  {
    slug: "plano-saude-cobre-pilates-manaus",
    title: "Plano de saúde cobre pilates terapêutico em Manaus?",
    excerpt:
      "Plano cobre pilates? Em quais casos? Veja como funciona o reembolso e o que pedir ao seu plano em Manaus.",
    metaTitle:
      "Plano de saúde cobre pilates terapêutico em Manaus? | Studio Rubi",
    metaDescription:
      "Quero saber se meu plano de saúde cobre pilates ou fisioterapia em Manaus. Veja como funciona o reembolso e o que pedir.",
    keywords: [
      "plano de saúde cobre pilates",
      "reembolso pilates manaus",
      "plano cobre fisioterapia",
      "pilates por plano de saúde",
    ],
    category: "Métodos e Tratamentos",
    publishedAt: "2026-06-23",
    readingTime: 4,
    coverImage: "/images/blog/cover-metodos-e-tratamentos.svg",
    ctaServiceSlug: "pilates-terapeutico-manaus",
    relatedSlugs: [
      "quanto-tempo-tratamento-fisioterapia",
      "fisioterapia-ou-quiropraxia",
    ],
    content: [
      {
        type: "p",
        text: "Esta é uma das dúvidas mais frequentes de quem quer começar Pilates Terapêutico ou fisioterapia em Manaus. Vamos esclarecer ponto por ponto.",
      },
      { type: "h2", text: "Pilates pelo plano de saúde — pode?" },
      {
        type: "p",
        text: "Tecnicamente, Pilates não é uma especialidade coberta diretamente pela ANS. O que o plano cobre é fisioterapia (e nela podem ser usados os equipamentos de Pilates como recursos terapêuticos). Cabe ao profissional codificar corretamente como fisioterapia.",
      },
      { type: "h2", text: "Como funciona na prática" },
      { type: "ordered", items: [
        "Studio Rubi trabalha em modelo particular (não credenciado a planos).",
        "Você paga a sessão e recebe recibo com dados do CREFITO da fisioterapeuta.",
        "Solicita o reembolso direto ao seu plano via app, site ou central.",
        "Plano reembolsa parcial ou totalmente, conforme seu contrato.",
      ]},
      { type: "h2", text: "Quem costuma reembolsar mais" },
      { type: "list", items: [
        "Bradesco Saúde (top de linha)",
        "Sul América (planos Executivo e Prestige)",
        "Amil (planos Blue, premium)",
        "Unimed (depende muito da regional)",
        "Care Plus, Allianz",
      ]},
      { type: "h2", text: "O que pedir ao seu plano antes de começar" },
      { type: "list", items: [
        "Valor de reembolso por sessão de fisioterapia",
        "Quantas sessões reembolsadas por ano",
        "Se exige pedido médico ou só recibo",
        "Prazo de reembolso",
      ]},
      { type: "h2", text: "Vale a pena particular se o plano cobre pouco?" },
      {
        type: "p",
        text: "Depende. No Studio Rubi, sessão é individual com fisioterapeuta especializada e 50-60 minutos. Comparado a clínicas com 4 pacientes simultâneos por hora, o resultado por sessão é muito superior — então o custo-benefício costuma compensar mesmo sem reembolso integral.",
      },
      {
        type: "cta",
        text: "Quer saber valores e como solicitar reembolso? Fale conosco pelo WhatsApp.",
      },
    ],
  },
]
