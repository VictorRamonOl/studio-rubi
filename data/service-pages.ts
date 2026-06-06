export type ServiceFAQ = { question: string; answer: string }

export type ServicePage = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroHeadline: string
  heroSubheadline: string
  heroEyebrow: string
  serviceType: string
  forWho: string[]
  benefits: { title: string; description: string }[]
  process: { step: string; title: string; description: string }[]
  faqs: ServiceFAQ[]
  relatedSlugs: string[]
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "pilates-terapeutico-manaus",
    title: "Pilates Terapêutico em Manaus",
    metaTitle:
      "Pilates Terapêutico em Manaus | Studio Rubi — Parque Dez",
    metaDescription:
      "Pilates terapêutico em Manaus com fisioterapeuta. Tratamento individualizado para dor lombar, hérnia, postura e reabilitação no Parque Dez. Avaliação pelo WhatsApp.",
    keywords: [
      "pilates terapêutico manaus",
      "pilates terapêutico parque dez",
      "pilates clínico manaus",
      "pilates para dor lombar manaus",
      "pilates fisioterapia manaus",
    ],
    heroEyebrow: "Pilates clínico no Parque Dez",
    heroHeadline: "Pilates Terapêutico em Manaus para tratar a causa da sua dor",
    heroSubheadline:
      "Aulas conduzidas por fisioterapeuta, com no máximo 3 alunos por horário. Protocolo desenhado para o seu corpo — não uma sequência genérica.",
    serviceType: "Pilates Terapêutico",
    forWho: [
      "Quem convive com dor lombar, cervical ou no quadril",
      "Pessoas com hérnia de disco, protrusão ou escoliose",
      "Quem fez musculação e nunca corrigiu a postura",
      "Profissionais que passam o dia sentados",
      "Quem busca prevenção e qualidade de movimento",
    ],
    benefits: [
      {
        title: "Avaliação fisioterapêutica antes de começar",
        description:
          "Antes da primeira aula, a Dra. Rúbia faz um mapeamento completo: histórico clínico, exames, postura e objetivos. Tudo isso vira um protocolo só seu.",
      },
      {
        title: "Máximo 3 alunos por horário",
        description:
          "Você não fica perdido numa turma de 10. Tem correção em tempo real, ajuste de carga e atenção em cada repetição.",
      },
      {
        title: "Aparelhos completos e regulados para o seu corpo",
        description:
          "Reformer, Cadillac, Cadeira e Barrel. Cada exercício é adaptado para a sua fase de tratamento — nada de repetir o mesmo treino por meses.",
      },
      {
        title: "Resultados mensuráveis em 8 a 12 semanas",
        description:
          "Trabalhamos com reavaliações periódicas. Você sabe exatamente o que melhorou em dor, mobilidade, força e postura.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Avaliação inicial (50 min)",
        description:
          "Anamnese completa, testes físicos, análise postural e definição de objetivos. Você sai já entendendo o que está acontecendo no seu corpo.",
      },
      {
        step: "02",
        title: "Protocolo individualizado",
        description:
          "Montamos um plano de tratamento com frequência, exercícios prioritários e marcos claros de evolução.",
      },
      {
        step: "03",
        title: "Sessões guiadas com correção em tempo real",
        description:
          "Cada sessão é supervisionada de perto. Ajustamos a carga, a amplitude e a respiração conforme você evolui.",
      },
      {
        step: "04",
        title: "Reavaliação a cada ciclo",
        description:
          "A cada 8 a 10 semanas, refazemos os testes para mostrar o que mudou — e atualizamos o protocolo.",
      },
    ],
    faqs: [
      {
        question: "Qual a diferença entre Pilates comum e Pilates Terapêutico?",
        answer:
          "Pilates Terapêutico é conduzido por fisioterapeuta e tem foco em tratamento de patologias, dor e reabilitação. A escolha dos exercícios parte de um diagnóstico clínico, não de uma sequência fixa. É indicado quando você tem dor, lesão, hérnia, escoliose, pós-cirurgia ou qualquer condição que exija individualização.",
      },
      {
        question: "Preciso de pedido médico para fazer Pilates Terapêutico?",
        answer:
          "Não é obrigatório, mas se você tem laudos, exames de imagem ou indicação médica, traga na avaliação. Por ser fisioterapeuta, a Dra. Rúbia pode avaliar e prescrever o tratamento com segurança.",
      },
      {
        question: "Em quanto tempo a dor lombar começa a melhorar?",
        answer:
          "A maioria dos pacientes relata melhora significativa entre a 4ª e a 8ª semana, com 2 sessões por semana. Mas isso varia conforme a causa da dor, o tempo de evolução e a adesão ao tratamento.",
      },
      {
        question: "Posso fazer Pilates Terapêutico com hérnia de disco?",
        answer:
          "Sim, e o Pilates Terapêutico é uma das melhores indicações para hérnia de disco. O foco é fortalecer a musculatura estabilizadora da coluna, descomprimir, melhorar mobilidade segmentar e devolver função sem agravar a lesão.",
      },
      {
        question: "Qual a frequência ideal de sessões?",
        answer:
          "Para tratamento ativo, indicamos 2 a 3 sessões por semana. Para manutenção (após resolução do quadro), 1 a 2 sessões por semana já são suficientes para preservar os ganhos.",
      },
    ],
    relatedSlugs: ["fisioterapia-manaus", "rpg-manaus", "pilates-gestantes-manaus"],
  },
  {
    slug: "fisioterapia-manaus",
    title: "Fisioterapia em Manaus",
    metaTitle:
      "Fisioterapia em Manaus | Tratamento de Dor e Reabilitação — Studio Rubi",
    metaDescription:
      "Fisioterapia em Manaus no Parque Dez com atendimento individual. Tratamento de dor, lesões esportivas, pós-cirúrgico e reabilitação. Agende pelo WhatsApp.",
    keywords: [
      "fisioterapia manaus",
      "fisioterapia parque dez",
      "fisioterapeuta manaus",
      "fisioterapia ortopédica manaus",
      "fisioterapia coluna manaus",
    ],
    heroEyebrow: "Fisioterapia individual no Parque Dez",
    heroHeadline:
      "Fisioterapia em Manaus para você voltar a se mover sem dor",
    heroSubheadline:
      "Atendimento 100% individual, sessões de 1 hora e protocolo construído a partir de uma avaliação clínica detalhada. Não é academia, é tratamento.",
    serviceType: "Fisioterapia",
    forWho: [
      "Dores agudas ou crônicas em coluna, joelho, ombro ou quadril",
      "Pós-operatório de cirurgias ortopédicas",
      "Lesões esportivas (tendinopatias, entorses, distensões)",
      "Acidentes de trabalho ou traumas",
      "Reabilitação neurológica leve a moderada",
    ],
    benefits: [
      {
        title: "Sessões 100% individuais de 1 hora",
        description:
          "Você tem a fisioterapeuta só para você do início ao fim. Sem revezar atenção, sem ficar esperando o aparelho desocupar.",
      },
      {
        title: "Terapia manual + cinesioterapia integradas",
        description:
          "Combinamos liberação miofascial, mobilização articular, exercícios terapêuticos e reeducação do movimento numa mesma sessão.",
      },
      {
        title: "Foco em causa, não em sintoma",
        description:
          "Se a dor no joelho vem de uma disfunção no quadril, tratamos o quadril. Esse é o diferencial de quem entende biomecânica.",
      },
      {
        title: "Integração com Pilates para potencializar resultados",
        description:
          "Sempre que indicado, combinamos sessões de fisioterapia com Pilates Terapêutico para acelerar o ganho funcional.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Avaliação clínica completa",
        description:
          "Histórico, exame físico, testes específicos e análise de exames de imagem. Você entende a causa da sua dor.",
      },
      {
        step: "02",
        title: "Plano de tratamento estruturado",
        description:
          "Definimos número estimado de sessões, frequência e marcos de evolução. Tudo combinado e claro desde o início.",
      },
      {
        step: "03",
        title: "Sessões terapêuticas individuais",
        description:
          "Cada sessão tem objetivo definido: alívio da dor, ganho de mobilidade, fortalecimento, retorno funcional.",
      },
      {
        step: "04",
        title: "Alta com plano de manutenção",
        description:
          "Você recebe orientações de autocuidado e, se quiser, segue em Pilates para preservar e ampliar os ganhos.",
      },
    ],
    faqs: [
      {
        question: "Quantas sessões de fisioterapia eu vou precisar?",
        answer:
          "Depende muito do quadro. Lesões agudas podem resolver em 8 a 12 sessões. Quadros crônicos ou pós-cirúrgicos podem demandar 20 a 40 sessões. Na avaliação inicial você sai com uma estimativa realista.",
      },
      {
        question: "Plano de saúde cobre fisioterapia no Studio Rubi?",
        answer:
          "Trabalhamos no modelo particular, com emissão de recibo para reembolso. Muitos planos reembolsam parte ou totalidade da sessão — vale consultar o seu.",
      },
      {
        question: "Vocês atendem pós-cirúrgico ortopédico?",
        answer:
          "Sim. Atendemos reabilitação de cirurgias de joelho (LCA, menisco, prótese), ombro (manguito rotador), coluna, quadril e pé. Trabalhamos em conjunto com o protocolo do seu cirurgião.",
      },
      {
        question: "Qual a diferença entre fisioterapia e RPG?",
        answer:
          "RPG é uma técnica específica dentro da fisioterapia, focada em cadeias musculares e postura global. Usamos RPG dentro do tratamento fisioterapêutico sempre que o quadro indica disfunção postural ou compensações cruzadas.",
      },
      {
        question: "Posso fazer fisioterapia mesmo sem ter feito exame de imagem?",
        answer:
          "Sim. Em muitos casos, o exame físico já permite diagnosticar a disfunção e iniciar o tratamento. Se durante a avaliação a Dra. Rúbia identificar necessidade de imagem, ela vai te orientar a buscar com um médico.",
      },
    ],
    relatedSlugs: [
      "pilates-terapeutico-manaus",
      "rpg-manaus",
      "reabilitacao-funcional-manaus",
    ],
  },
  {
    slug: "pilates-gestantes-manaus",
    title: "Pilates para Gestantes em Manaus",
    metaTitle:
      "Pilates para Gestantes em Manaus | Studio Rubi — Parque Dez",
    metaDescription:
      "Pilates para gestantes em Manaus com fisioterapeuta especializada. Alivie dores da gravidez, prepare-se para o parto e mantenha o bem-estar materno. Parque Dez.",
    keywords: [
      "pilates para gestantes manaus",
      "pilates gravidez manaus",
      "pilates gestacional manaus",
      "exercício na gestação manaus",
      "preparação para o parto manaus",
    ],
    heroEyebrow: "Cuidado para mãe e bebê",
    heroHeadline:
      "Pilates para Gestantes em Manaus: força, alívio e preparo para o parto",
    heroSubheadline:
      "Método adaptado a cada trimestre da gestação, com supervisão de fisioterapeuta. Você se sente forte, em segurança e preparada para receber o bebê.",
    serviceType: "Pilates para Gestantes",
    forWho: [
      "Gestantes a partir do 2º trimestre com liberação médica",
      "Gestantes com dor lombar ou ciática",
      "Quem teve diástase ou incontinência em gestação anterior",
      "Mulheres que querem chegar ativas no parto",
      "Quem busca recuperação no puerpério (pós-parto)",
    ],
    benefits: [
      {
        title: "Adaptado a cada trimestre",
        description:
          "Exercícios mudam conforme o bebê cresce. No 2º trimestre focamos em mobilidade e core funcional; no 3º, em preparo para o trabalho de parto.",
      },
      {
        title: "Alívio das dores típicas da gestação",
        description:
          "Dor lombar, ciática, dor no quadril, edema nas pernas — tudo isso melhora com mobilidade certa e respiração consciente.",
      },
      {
        title: "Preparação para o parto",
        description:
          "Trabalhamos respiração, posições de parto, mobilidade pélvica e consciência corporal para um trabalho de parto mais eficiente.",
      },
      {
        title: "Recuperação no puerpério",
        description:
          "Após o parto, continuamos com protocolo de reativação de assoalho pélvico, tratamento de diástase e retomada gradual ao movimento.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Avaliação obstétrica adaptada",
        description:
          "Conversamos sobre histórico gestacional, queixas atuais, plano de parto e liberação médica.",
      },
      {
        step: "02",
        title: "Protocolo por trimestre",
        description:
          "Cada fase tem objetivo e exercícios próprios. Nada de fórmula pronta — tudo respeita o seu momento.",
      },
      {
        step: "03",
        title: "Sessões de 50 minutos",
        description:
          "Aquecimento, exercícios principais e relaxamento. Sempre em postura segura para você e o bebê.",
      },
      {
        step: "04",
        title: "Acompanhamento puerperal",
        description:
          "Após a quarentena, você volta com um protocolo de retorno seguro ao movimento e fortalecimento do assoalho pélvico.",
      },
    ],
    faqs: [
      {
        question: "Em qual trimestre posso começar Pilates na gestação?",
        answer:
          "Em geral, a partir do 2º trimestre (com liberação médica), pois o 1º trimestre tem risco maior de eventos espontâneos e a recomendação clínica é cautela. Mas isso depende do seu histórico — converse com seu obstetra.",
      },
      {
        question: "Pilates ajuda na dor lombar da gestação?",
        answer:
          "Sim, é uma das principais indicações. O Pilates fortalece a musculatura estabilizadora, melhora a mobilidade do quadril e ensina padrões de respiração que reduzem a sobrecarga lombar.",
      },
      {
        question: "Posso continuar Pilates depois do parto?",
        answer:
          "Sim, e é altamente recomendado. Após a liberação médica (geralmente 40 a 60 dias pós-parto, parto normal; 90 dias, cesárea), retomamos com protocolo específico de puerpério.",
      },
      {
        question: "Pilates ajuda a tratar diástase abdominal?",
        answer:
          "Sim. Existe um protocolo específico para diástase com exercícios de ativação profunda do transverso abdominal e respiração diafragmática. É exatamente o que fazemos no Studio Rubi.",
      },
      {
        question: "Preciso de autorização do obstetra?",
        answer:
          "Sim, sempre pedimos a liberação por escrito ou via WhatsApp do seu obstetra antes de iniciar. É um cuidado obrigatório para sua segurança e do bebê.",
      },
    ],
    relatedSlugs: [
      "pilates-terapeutico-manaus",
      "rpg-manaus",
      "fisioterapia-manaus",
    ],
  },
  {
    slug: "rpg-manaus",
    title: "RPG em Manaus",
    metaTitle: "RPG em Manaus | Reeducação Postural Global — Studio Rubi",
    metaDescription:
      "RPG em Manaus (Reeducação Postural Global) com fisioterapeuta no Parque Dez. Tratamento para escoliose, hipercifose, dor crônica e desvios posturais.",
    keywords: [
      "RPG manaus",
      "reeducação postural global manaus",
      "RPG fisioterapia manaus",
      "rpg parque dez",
      "rpg escoliose manaus",
    ],
    heroEyebrow: "Reeducação Postural Global",
    heroHeadline:
      "RPG em Manaus: tratamento de postura, escoliose e dor crônica de origem postural",
    heroSubheadline:
      "Sessões individuais de 1 hora trabalhando cadeias musculares e postura global. Indicado quando alongamento comum e exercício isolado não resolvem.",
    serviceType: "RPG",
    forWho: [
      "Quem tem escoliose, hipercifose ou hiperlordose",
      "Dor crônica que não cede com fisioterapia comum",
      "Compensações posturais por encurtamento muscular",
      "Atletas com desequilíbrios de cadeia",
      "Pacientes com bruxismo, tensão cervical e enxaqueca tensional",
    ],
    benefits: [
      {
        title: "Tratamento de cadeias musculares completas",
        description:
          "Diferente do alongamento isolado, o RPG trabalha cadeias inteiras (posterior, anterior, cruzadas) numa única postura terapêutica de longa duração.",
      },
      {
        title: "Resultado em quem já tentou de tudo",
        description:
          "RPG costuma ser a virada para pacientes com dor crônica de 10, 15 anos que já passaram por várias fisioterapias e medicamentos.",
      },
      {
        title: "Correção global, não pontual",
        description:
          "Não trata o sintoma onde dói — corrige o desequilíbrio em toda a cadeia, evitando que a dor migre.",
      },
      {
        title: "Resultados visíveis em fotos posturais",
        description:
          "Fazemos fotos antes e depois. Você vê a evolução acontecendo no espelho e nas imagens, não só sente.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Avaliação postural fotográfica",
        description:
          "Documentamos sua postura nas vistas anterior, posterior, lateral D e E. Mapeamos cadeias encurtadas e desvios.",
      },
      {
        step: "02",
        title: "Definição de posturas terapêuticas",
        description:
          "Escolhemos as posturas de RPG mais adequadas para a sua cadeia disfuncional principal.",
      },
      {
        step: "03",
        title: "Sessões de 1 hora",
        description:
          "Cada sessão mantém posturas ativas por longos períodos com respiração guiada e correções manuais.",
      },
      {
        step: "04",
        title: "Reavaliação fotográfica",
        description:
          "A cada 8 a 12 sessões, refazemos as fotos. A evolução é mensurável e visual.",
      },
    ],
    faqs: [
      {
        question: "RPG é o mesmo que pilates ou fisioterapia comum?",
        answer:
          "Não. RPG é uma técnica fisioterapêutica específica criada por Philippe Souchard, que trabalha cadeias musculares em posturas globais de longa duração. Pilates e fisioterapia trabalham de outras formas. As três se complementam quando bem indicadas.",
      },
      {
        question: "Quem pode fazer RPG?",
        answer:
          "Praticamente qualquer pessoa: de crianças com escoliose a idosos com dor crônica. RPG é especialmente indicado quando há desvios posturais, encurtamentos importantes ou dor crônica resistente a outros tratamentos.",
      },
      {
        question: "Quantas sessões de RPG eu vou precisar?",
        answer:
          "Geralmente trabalhamos com ciclos de 10 a 20 sessões, semanais, com reavaliação ao final de cada ciclo. Casos crônicos podem demandar 2 ou 3 ciclos.",
      },
      {
        question: "RPG dói?",
        answer:
          "Algumas posturas geram desconforto pelo tempo prolongado de manutenção, mas não devem causar dor aguda. A respiração guiada ajuda a relaxar progressivamente.",
      },
      {
        question: "RPG resolve escoliose?",
        answer:
          "RPG é uma das principais técnicas conservadoras para escoliose. Em curvas leves a moderadas, pode reduzir a curva e melhorar a postura. Em curvas severas, atua junto com colete ou cirurgia, prevenindo progressão.",
      },
    ],
    relatedSlugs: [
      "pilates-terapeutico-manaus",
      "fisioterapia-manaus",
      "reabilitacao-funcional-manaus",
    ],
  },
  {
    slug: "homecare-fisioterapia-manaus",
    title: "Fisioterapia Domiciliar (HomeCare) em Manaus",
    metaTitle:
      "Fisioterapia Domiciliar em Manaus | HomeCare — Studio Rubi",
    metaDescription:
      "Fisioterapia em domicílio em Manaus. Atendimento HomeCare para idosos, pós-cirúrgicos, acamados e quem tem dificuldade de locomoção. Agende pelo WhatsApp.",
    keywords: [
      "fisioterapia domiciliar manaus",
      "fisioterapia em casa manaus",
      "homecare manaus",
      "fisioterapia para idosos manaus",
      "fisioterapia acamado manaus",
    ],
    heroEyebrow: "Atendimento no conforto do seu lar",
    heroHeadline:
      "Fisioterapia Domiciliar em Manaus — o cuidado vai até você",
    heroSubheadline:
      "Para idosos, pós-cirúrgicos, pacientes acamados ou com dificuldade de locomoção. Mesma técnica do estúdio, agora em casa, com toda a privacidade.",
    serviceType: "Fisioterapia Domiciliar",
    forWho: [
      "Idosos com dificuldade de locomoção ou risco de queda",
      "Pacientes em pós-operatório recente",
      "Pessoas acamadas ou em cuidados paliativos",
      "Pacientes neurológicos (pós-AVC, Parkinson, Alzheimer)",
      "Quem prefere privacidade e comodidade do lar",
    ],
    benefits: [
      {
        title: "Sem deslocamento, sem estresse",
        description:
          "Você não precisa enfrentar trânsito, esperar Uber, expor um paciente fragilizado. A fisioterapeuta chega no horário combinado.",
      },
      {
        title: "Ambiente real de tratamento",
        description:
          "Treinamos atividades que o paciente faz no dia a dia, no próprio ambiente — levantar da cama, da poltrona, ir ao banheiro, subir a escada de casa.",
      },
      {
        title: "Família orientada e participativa",
        description:
          "Os cuidadores aprendem manejos seguros, posicionamento, exercícios de manutenção. Isso muda o cotidiano da família.",
      },
      {
        title: "Continuidade do cuidado do hospital pra casa",
        description:
          "Recebe alta? Iniciamos a fisioterapia em 24 a 48 horas para não perder o momento crítico de reabilitação.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Avaliação domiciliar",
        description:
          "Primeira visita para avaliação completa, análise do ambiente e definição de plano terapêutico.",
      },
      {
        step: "02",
        title: "Plano e cronograma",
        description:
          "Definimos quantas sessões por semana, duração estimada e marcos de evolução.",
      },
      {
        step: "03",
        title: "Sessões domiciliares regulares",
        description:
          "Atendimento individual em casa, com material adequado levado pela fisioterapeuta.",
      },
      {
        step: "04",
        title: "Relatório de evolução",
        description:
          "Fornecemos relatórios periódicos para você, para a família e para o médico responsável.",
      },
    ],
    faqs: [
      {
        question: "Quais regiões de Manaus vocês atendem em HomeCare?",
        answer:
          "Atendemos principalmente as zonas Centro-Oeste e Norte: Parque Dez, Adrianópolis, Aleixo, Flores, Dom Pedro, Conjunto Castelo Branco. Para outras regiões, consulte disponibilidade pelo WhatsApp.",
      },
      {
        question: "Quanto custa uma sessão de HomeCare?",
        answer:
          "O valor é diferente do estúdio e leva em conta o deslocamento e a duração da sessão. Envie sua localização e o quadro pelo WhatsApp para receber o orçamento personalizado.",
      },
      {
        question: "Preciso ter equipamentos em casa?",
        answer:
          "Não. A Dra. Rúbia leva tudo o que é necessário: faixas elásticas, bolas, halteres leves, materiais de mobilização. O treinamento funcional é feito com os recursos da própria casa.",
      },
      {
        question: "Vocês atendem pacientes acamados ou paliativos?",
        answer:
          "Sim. Temos experiência com fisioterapia respiratória, motora e manejo postural em pacientes acamados e em cuidados paliativos, com foco em conforto e prevenção de complicações.",
      },
      {
        question: "Como é a primeira visita?",
        answer:
          "Dura cerca de 1 hora. Avaliamos o paciente, conversamos com a família, observamos o ambiente e definimos um plano realista para o caso. Você sai da primeira visita com clareza dos próximos passos.",
      },
    ],
    relatedSlugs: [
      "fisioterapia-manaus",
      "reabilitacao-funcional-manaus",
      "pilates-terapeutico-manaus",
    ],
  },
  {
    slug: "reabilitacao-funcional-manaus",
    title: "Reabilitação Funcional em Manaus",
    metaTitle:
      "Reabilitação Funcional em Manaus | Pós-Cirúrgico e Lesões — Studio Rubi",
    metaDescription:
      "Reabilitação funcional em Manaus com fisioterapeuta no Parque Dez. Volte aos esportes, ao trabalho e à vida ativa com segurança após lesão ou cirurgia.",
    keywords: [
      "reabilitação funcional manaus",
      "reabilitação esportiva manaus",
      "reabilitação pós cirurgia manaus",
      "fisioterapia pós operatório manaus",
      "retorno ao esporte manaus",
    ],
    heroEyebrow: "De volta ao movimento que importa",
    heroHeadline:
      "Reabilitação Funcional em Manaus para você voltar 100% — não só sem dor",
    heroSubheadline:
      "Programa estruturado para retomar esporte, trabalho e atividades diárias com força, mobilidade e confiança após lesões, cirurgias ou inatividade prolongada.",
    serviceType: "Reabilitação Funcional",
    forWho: [
      "Atletas em retorno após lesão",
      "Pós-operatórios ortopédicos (joelho, ombro, quadril, coluna)",
      "Pessoas voltando ao movimento após período acamado",
      "Quem teve alta da fisioterapia mas ainda não se sente seguro",
      "Trabalhadores que precisam recuperar capacidade funcional",
    ],
    benefits: [
      {
        title: "Protocolo baseado em testes funcionais",
        description:
          "Usamos testes objetivos (Y-balance, Hop tests, dinamometria) para definir critérios claros de progressão.",
      },
      {
        title: "Progressão segura e mensurável",
        description:
          "Você sabe exatamente em qual fase está e o que precisa atingir para passar para a próxima — nada de chute.",
      },
      {
        title: "Foco em força, potência e controle motor",
        description:
          "Não é só voltar a se mover: é voltar com performance. Trabalhamos os três pilares neuromusculares.",
      },
      {
        title: "Liberação para esporte com critérios objetivos",
        description:
          "Você só recebe alta funcional quando os testes mostram que está pronto. Reduz drasticamente o risco de reincidência.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Avaliação funcional",
        description:
          "Testes específicos para entender em qual fase de reabilitação você está e quais os gaps.",
      },
      {
        step: "02",
        title: "Definição de fases",
        description:
          "Fase 1 (controle de dor e mobilidade), Fase 2 (força), Fase 3 (potência), Fase 4 (retorno ao gesto esportivo).",
      },
      {
        step: "03",
        title: "Treinos progressivos",
        description:
          "Cada sessão tem foco claro. Você só avança quando os critérios de progressão são atingidos.",
      },
      {
        step: "04",
        title: "Reteste e alta funcional",
        description:
          "Refazemos os testes ao fim do protocolo. Alta é dada com critérios objetivos, não por tempo decorrido.",
      },
    ],
    faqs: [
      {
        question:
          "Qual a diferença entre fisioterapia comum e reabilitação funcional?",
        answer:
          "Fisioterapia trata dor e disfunção. Reabilitação funcional é a etapa seguinte: pegar quem já tirou a dor e levar até a performance pré-lesão (ou melhor). Inclui ganho de força, potência, controle neuromuscular e tolerância de carga.",
      },
      {
        question: "Em quanto tempo eu volto a correr / treinar / jogar?",
        answer:
          "Depende da lesão e do esporte. Lesões ligamentares de joelho costumam levar 6 a 9 meses para retorno completo. Tendinopatias, 3 a 4 meses. O critério não é tempo: é atingir os marcos funcionais.",
      },
      {
        question: "Vocês trabalham com pós-cirurgia de LCA?",
        answer:
          "Sim. Conduzimos protocolo completo desde o pós-operatório imediato até o retorno ao esporte de impacto, em parceria com o cirurgião responsável.",
      },
      {
        question: "Preciso já ter feito fisioterapia antes?",
        answer:
          "Não necessariamente. Avaliamos seu caso e, se estiver na fase de tratamento de dor, começamos por aí. A reabilitação funcional é uma continuidade natural do processo.",
      },
      {
        question: "Posso combinar com Pilates Terapêutico?",
        answer:
          "Sim, e é muito comum. Pilates entra nas fases intermediárias e finais como complemento para mobilidade, controle motor e estabilização. Otimiza muito o resultado.",
      },
    ],
    relatedSlugs: [
      "fisioterapia-manaus",
      "pilates-terapeutico-manaus",
      "rpg-manaus",
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug)
}
