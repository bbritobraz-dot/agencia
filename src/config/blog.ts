export interface BlogImageAsset {
  png: string;
  webp: string;
  avif: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface BlogSource {
  id: number;
  label: string;
  url: string;
}

export interface BlogFaqItem {
  question: string;
  answer: string;
  citations?: number[];
}

export interface BlogTocItem {
  id: string;
  title: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  date: string;
  updated: string;
  readingTime: string;
  status: 'published' | 'draft';
  cover: BlogImageAsset;
  toc: BlogTocItem[];
  executiveSummary: string[];
  faqs: BlogFaqItem[];
  sources: BlogSource[];
  sourceNote?: string;
  relatedServiceSlugs: string[];
}

export interface ContentIdeaItem {
  id: string;
  title: string;
  pillar: string;
  targetQuestion: string;
  angle: string;
  relatedServiceSlug: string;
}

/**
 * Radar Editorial & Ideias de Conteúdo RUNA
 * Pautas estratégicas orientadas a dúvidas reais de decisores, organizadas pelos 6 pilares da agência.
 */
export const RUNA_CONTENT_IDEAS: ContentIdeaItem[] = [
  {
    id: 'api-conversoes-server-side',
    title: 'Pixel ou API de Conversões: por que seus anúncios perdem dados sem rastreamento server-side',
    pillar: 'Dados e Analytics',
    targetQuestion: 'Por que o número de leads no gerenciador não bate com o WhatsApp e o CRM?',
    angle: 'Explicar em linguagem de negócio como bloqueadores e restrições de navegador afetam a atribuição e quando implementar Server-Side Tracking.',
    relatedServiceSlug: 'dados-e-analytics',
  },
  {
    id: 'planilha-ou-crm-proprio',
    title: 'Da planilha ao CRM sob medida: sinais de que o controle manual está custando vendas',
    pillar: 'Sistemas Sob Medida',
    targetQuestion: 'Quando vale sair das planilhas ou de um CRM genérico para um sistema adaptado à operação?',
    angle: 'Critérios práticos de volume de orçamentos, follow-ups esquecidos, cálculo técnico de margem e integração com produção.',
    relatedServiceSlug: 'sistemas-sob-medida',
  },
  {
    id: 'simulador-orcamento-site',
    title: 'Simulador de orçamento no site: como pré-qualificar clientes antes do WhatsApp',
    pillar: 'Sites e Conversão',
    targetQuestion: 'Como filtrar curiosos sem criar barreiras para quem realmente quer comprar?',
    angle: 'Estudo de arquitetura de páginas interativas que coletam medidas, preferências ou escopo antes de abrir a conversa comercial.',
    relatedServiceSlug: 'sites-e-landing-pages',
  },
  {
    id: 'ecommerce-abandono-checkout',
    title: 'Loja virtual com visitas e poucos pedidos: 6 pontos de atrito entre o produto e o pagamento',
    pillar: 'E-commerce',
    targetQuestion: 'Por que as pessoas adicionam ao carrinho no celular e abandonam antes de pagar?',
    angle: 'Revisão prática de frete, velocidade mobile, clareza de troca/garantia, meios de pagamento e recuperação automatizada.',
    relatedServiceSlug: 'ecommerce',
  },
  {
    id: 'n8n-integracao-comercial',
    title: 'Marketing e comercial integrados: o que conectar para nenhum lead esfriar na fila',
    pillar: 'Automações e IA',
    targetQuestion: 'Como garantir que cada formulário ou conversa vire tarefa com responsável em segundos?',
    angle: 'Fluxos práticos com n8n, Webhooks e alertas imediatos para distribuição de oportunidades e registro automático de origem (UTMs).',
    relatedServiceSlug: 'automacoes-e-ia',
  },
  {
    id: 'remarketing-ciclo-longo',
    title: 'Vendas de ciclo longo: como usar anúncios de apoio quando o cliente não decide no primeiro dia',
    pillar: 'Tráfego Pago',
    targetQuestion: 'O que mostrar para o cliente que pediu proposta, mas ainda está comparando fornecedores?',
    angle: 'Estratégia de conteúdo e provas reais em múltiplos estágios para apoiar o fechamento em serviços consultivos e B2B.',
    relatedServiceSlug: 'gestao-de-trafego-pago',
  },
];

export const RUNA_BLOG_POSTS: BlogPost[] = [
  {
    title: 'Google Ads mais caro em 2027: como preparar o orçamento da sua empresa',
    slug: 'google-ads-reajuste-2027',
    seoTitle: 'Google Ads mais caro em 2027: reajuste e orçamento',
    metaDescription:
      'Entenda o reajuste de 2,9% anunciado pelo Google para 2027 e veja como revisar seu orçamento de mídia e suas metas comerciais.',
    excerpt:
      'A partir de 1º de janeiro de 2027, contas faturadas no Brasil terão reajuste de 2,9%. Veja quanto isso representa na prática e o que revisar antes de alterar sua verba.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Google Ads',
    tags: ['Google Ads', 'tráfego pago', 'orçamento', 'planejamento'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '5 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/google-ads-reajuste-2027/capa-google-ads-reajuste-2027.png',
      webp: '/blog/google-ads-reajuste-2027/capa-google-ads-reajuste-2027.webp',
      avif: '/blog/google-ads-reajuste-2027/capa-google-ads-reajuste-2027.avif',
      width: 1672,
      height: 941,
      alt: 'Fatura e cartão de anúncio em vidro, com moedas de cobre, ilustrando o reajuste do Google Ads em 2027.',
    },
    toc: [
      { id: 'quanto-isso-representa-na-pratica', title: 'Quanto isso representa na prática?' },
      { id: 'como-o-ajuste-sera-cobrado', title: 'Como o ajuste será cobrado?' },
      { id: 'o-que-revisar-antes-de-alterar-verba', title: 'O que revisar antes de aumentar ou reduzir a verba' },
      { id: 'checklist-planejamento-2027', title: 'Checklist para o planejamento de 2027' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'prepare-o-orcamento', title: 'Prepare o orçamento com uma visão completa' },
      { id: 'fontes', title: 'Fonte oficial' },
    ],
    executiveSummary: [
      'Diferencie investimento em mídia, encargos de faturamento e custos de gestão.',
      'Recalcule o planejamento antes de definir as metas comerciais.',
      'Use a revisão para identificar desperdícios entre o anúncio e o fechamento.',
    ],
    faqs: [
      {
        question: 'Meu custo por clique vai subir exatamente nessa proporção?',
        answer:
          'Não é possível concluir isso a partir do reajuste. O custo por clique observado na campanha também depende das condições do leilão e do desempenho da operação. Na análise, acompanhe separadamente a veiculação e o faturamento.',
      },
      {
        question: 'Devo cortar campanhas para compensar o aumento?',
        answer:
          'A decisão depende da contribuição de cada campanha para o negócio. Comece pelas oportunidades comerciais geradas e pelos desperdícios identificados. Um corte proporcional em todas as campanhas pode reduzir investimento justamente onde existe melhor retorno.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google Ads — Ajuste Local de Preços de Anúncios no Brasil',
        url: 'https://support.google.com/google-ads/answer/18857390?hl=pt-BR',
      },
    ],
    sourceNote:
      'Fonte consultada em 16 de novembro de 2026. Os cálculos e as recomendações de planejamento são análise editorial da RUNA.',
    relatedServiceSlugs: [
      'gestao-de-trafego-pago',
      'dados-e-analytics',
      'sites-e-landing-pages',
    ],
  },
  {
    title: 'Seu site recebe visitas, mas não gera clientes? Veja o que revisar',
    slug: 'site-visitas-sem-clientes',
    seoTitle: 'Site com visitas sem gerar clientes: o que revisar',
    metaDescription:
      'Entenda onde uma visita pode se perder antes do contato e veja como revisar oferta, página, formulário e mensuração.',
    excerpt:
      'O anúncio recebe cliques e o relatório mostra visitantes, mas os pedidos de orçamento não aparecem? Entenda o que revisar entre a chegada ao site e o início da conversa.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Sites e Conversão',
    tags: ['landing page', 'sites', 'conversão', 'tráfego pago'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/site-visitas-sem-clientes/capa-site-visitas-sem-clientes.png',
      webp: '/blog/site-visitas-sem-clientes/capa-site-visitas-sem-clientes.webp',
      avif: '/blog/site-visitas-sem-clientes/capa-site-visitas-sem-clientes.avif',
      width: 1672,
      height: 941,
      alt: 'Notebook com página de persianas e botão de orçamento, representando o caminho do clique ao contato.',
    },
    toc: [
      { id: 'a-pagina-continua-a-conversa', title: '1. A página continua a conversa iniciada pelo anúncio?' },
      { id: 'o-visitante-entende-por-que-escolher', title: '2. O visitante entende por que escolher sua empresa?' },
      { id: 'pedir-orcamento-exige-esforco-demais', title: '3. Pedir orçamento exige esforço demais?' },
      { id: 'o-botao-explica-o-proximo-passo', title: '4. O botão explica o próximo passo?' },
      { id: 'medindo-contato-ou-intencao', title: '5. Você está medindo contato ou apenas intenção?' },
      { id: 'checklist-revisar-pagina', title: 'Checklist para revisar sua página' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'descubra-onde-perde-oportunidades', title: 'Descubra onde sua empresa perde oportunidades' },
      { id: 'fontes', title: 'Fonte oficial' },
    ],
    executiveSummary: [
      'Confira se a página entrega a promessa feita no anúncio.',
      'Avalie clareza, confiança e facilidade de uso no celular.',
      'Diferencie clique no WhatsApp, conversa iniciada e oportunidade comercial.',
    ],
    faqs: [
      {
        question: 'Preciso refazer o site inteiro?',
        answer:
          'Nem sempre. Comece pela página que recebe o investimento principal. Uma revisão de oferta, conteúdo, formulário e navegação pode ser um primeiro projeto mais objetivo.',
      },
      {
        question: 'Existe uma taxa de conversão ideal para qualquer empresa?',
        answer:
          'Não existe um número universal útil para todas as operações. O resultado depende da origem do tráfego, da oferta e da definição de conversão. Compare períodos e públicos equivalentes, observando também a qualidade dos contatos.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google Ads — Otimizar seus anúncios e páginas de destino',
        url: 'https://support.google.com/google-ads/answer/6238826?hl=pt-BR',
      },
    ],
    sourceNote:
      'Fonte consultada em 16 de novembro de 2026. Exemplos e checklist são recomendações editoriais da RUNA.',
    relatedServiceSlugs: [
      'sites-e-landing-pages',
      'gestao-de-trafego-pago',
      'dados-e-analytics',
    ],
  },
  {
    title: 'Lead barato ou lead qualificado: o que sua empresa deve acompanhar',
    slug: 'lead-barato-ou-qualificado',
    seoTitle: 'Lead barato ou lead qualificado: o que acompanhar',
    metaDescription:
      'Veja por que o custo por contato precisa ser analisado junto com qualificação, propostas e vendas — e como o CRM ajuda nessa leitura.',
    excerpt:
      'Reduzir o custo por contato nem sempre significa vender mais. Veja como definir critérios de qualificação e conectar o CRM às decisões de mídia.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Inteligência Comercial',
    tags: ['leads', 'CRM', 'Meta Ads', 'Google Ads', 'conversões'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/lead-barato-ou-qualificado/capa-lead-barato-ou-qualificado.png',
      webp: '/blog/lead-barato-ou-qualificado/capa-lead-barato-ou-qualificado.webp',
      avif: '/blog/lead-barato-ou-qualificado/capa-lead-barato-ou-qualificado.avif',
      width: 1672,
      height: 941,
      alt: 'Painel de CRM em vidro com um contato destacado em cobre, representando a evolução até a venda.',
    },
    toc: [
      { id: 'campanha-menos-contatos-mais-vendas', title: 'A campanha com menos contatos pode gerar mais vendas' },
      { id: 'o-que-significa-lead-qualificado', title: 'O que significa “lead qualificado” na sua empresa?' },
      { id: 'organize-etapas-reais', title: 'Organize etapas que representem acontecimentos reais' },
      { id: 'crm-ajuda-plataformas-anuncios', title: 'O CRM também pode ajudar as plataformas de anúncios' },
      { id: 'reuniao-de-resultado-em-decisao', title: 'Faça uma reunião de resultado que termine em decisão' },
      { id: 'checklist-melhorar-analise', title: 'Checklist para melhorar a análise' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'conecte-anuncios-ao-comercial', title: 'Conecte os anúncios ao que acontece no comercial' },
      { id: 'fontes', title: 'Fontes oficiais' },
    ],
    executiveSummary: [
      'Defina critérios objetivos para identificar uma oportunidade qualificada.',
      'Compare campanhas pelo avanço comercial dos contatos.',
      'Use o CRM para registrar resultados e orientar decisões de mídia.',
    ],
    faqs: [
      {
        question: 'Preciso de um CRM complexo?',
        answer:
          'O ponto de partida é ter registros consistentes. Uma operação pequena pode começar com poucos campos e etapas. A ferramenta precisa acompanhar a rotina, sem criar tarefas que a equipe abandona.',
      },
      {
        question: 'Devo ignorar o custo por lead?',
        answer:
          'Não. Ele continua útil para entender a aquisição. A análise fica mais completa quando também mostra qualificação, fechamento e contribuição econômica das vendas.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google Ads — Perguntas frequentes sobre importações de conversões off-line',
        url: 'https://support.google.com/google-ads/answer/10029210?hl=pt-BR',
      },
      {
        id: 2,
        label: 'Meta for Developers — Anúncios de lead e integração com CRM',
        url: 'https://developers.facebook.com/docs/marketing-api/guides/lead-ads/v2.8/?locale=pt_BR',
      },
    ],
    sourceNote:
      'Fontes consultadas em 16 de novembro de 2026. A tabela é uma simulação; os critérios comerciais são propostas editoriais da RUNA.',
    relatedServiceSlugs: [
      'sistemas-sob-medida',
      'dados-e-analytics',
      'gestao-de-trafego-pago',
    ],
  },
  {
    title: 'Google Ads ou Meta Ads: onde faz sentido investir primeiro?',
    slug: 'google-ads-ou-meta-ads',
    seoTitle: 'Google Ads ou Meta Ads: onde investir primeiro?',
    metaDescription:
      'Compare intenção de busca, descoberta, oferta e capacidade comercial para decidir onde começar a investir em anúncios.',
    excerpt:
      'Quando o orçamento não permite testar tudo ao mesmo tempo, o comportamento de compra do seu cliente ajuda a definir por qual canal começar.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Tráfego Pago',
    tags: ['Google Ads', 'Meta Ads', 'estratégia', 'captação de clientes'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/google-ads-ou-meta-ads/capa-google-ads-ou-meta-ads.png',
      webp: '/blog/google-ads-ou-meta-ads/capa-google-ads-ou-meta-ads.webp',
      avif: '/blog/google-ads-ou-meta-ads/capa-google-ads-ou-meta-ads.avif',
      width: 1672,
      height: 941,
      alt: 'Cartões de vidro com uma lupa e um anúncio no celular, representando busca e descoberta.',
    },
    toc: [
      { id: 'quando-pesquisa-google-merece-atencao', title: 'Quando a pesquisa do Google merece atenção' },
      { id: 'quando-descoberta-redes-sociais-faz-sentido', title: 'Quando a descoberta nas redes sociais pode fazer sentido' },
      { id: 'compare-situacoes-concretas', title: 'Compare situações concretas' },
      { id: 'mesma-empresa-dois-canais', title: 'A mesma empresa pode usar os dois canais' },
      { id: 'o-que-preparar-antes-primeiro-teste', title: 'O que preparar antes do primeiro teste' },
      { id: 'checklist-escolher-com-clareza', title: 'Checklist para escolher com mais clareza' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'escolha-o-canal-a-partir-do-negocio', title: 'Escolha o canal a partir do seu negócio' },
      { id: 'fontes', title: 'Fontes oficiais' },
    ],
    executiveSummary: [
      'Avalie se existe procura ativa pelo seu serviço.',
      'Considere o quanto sua oferta precisa ser demonstrada ou explicada.',
      'Escolha um primeiro teste que caiba na verba e na capacidade de atendimento.',
    ],
    faqs: [
      {
        question: 'Qual plataforma é mais barata?',
        answer:
          'O valor por clique ou contato, isoladamente, não resolve a comparação. O que interessa é quanto custa conquistar clientes compatíveis com a margem e os objetivos da empresa.',
      },
      {
        question: 'Preciso dividir a verba igualmente?',
        answer:
          'Não existe obrigação de divisão. A distribuição pode começar concentrada em uma hipótese e mudar conforme os resultados e a capacidade de ampliar os testes.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google Ads — Escolher o tipo certo de campanha',
        url: 'https://support.google.com/google-ads/answer/2567043?hl=pt-BR',
      },
      {
        id: 2,
        label: 'Meta for Developers — Marketing API',
        url: 'https://developers.facebook.com/documentation/ads-commerce/marketing-api',
      },
      {
        id: 3,
        label: 'Google Ads — Sobre as previsões do Planejador de palavras-chave',
        url: 'https://support.google.com/google-ads/answer/3022575?hl=pt-BR',
      },
    ],
    sourceNote:
      'Fontes consultadas em 16 de novembro de 2026. A comparação entre situações de negócio é análise editorial da RUNA.',
    relatedServiceSlugs: [
      'gestao-de-trafego-pago',
      'sites-e-landing-pages',
      'dados-e-analytics',
    ],
  },
  {
    title: 'Perfil da Empresa no Google: como melhorar sua presença nas buscas locais',
    slug: 'perfil-empresa-google-buscas-locais',
    seoTitle: 'Perfil da Empresa no Google: presença nas buscas locais',
    metaDescription:
      'Veja como revisar informações, avaliações, fotos e o caminho de contato para fortalecer a presença local da sua empresa.',
    excerpt:
      'Antes de falar com sua equipe, o cliente confere horário, fotos, avaliações e site no Google. Veja como organizar o Perfil da Empresa para facilitar o contato.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'SEO Local',
    tags: ['Perfil da Empresa', 'Google Maps', 'SEO local', 'negócios locais'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/perfil-empresa-google-buscas-locais/capa-perfil-empresa-google.png',
      webp: '/blog/perfil-empresa-google-buscas-locais/capa-perfil-empresa-google.webp',
      avif: '/blog/perfil-empresa-google-buscas-locais/capa-perfil-empresa-google.avif',
      width: 1672,
      height: 941,
      alt: 'Loja iluminada em uma maquete de bairro, com marcador de localização em vidro e cobre.',
    },
    toc: [
      { id: 'como-google-organiza-resultados-locais', title: 'Como o Google organiza os resultados locais?' },
      { id: 'revise-informacoes-como-cliente', title: '1. Revise as informações como um cliente faria' },
      { id: 'use-fotos-para-responder-duvidas', title: '2. Use fotos para responder dúvidas' },
      { id: 'rotina-avaliacoes-autenticas', title: '3. Crie uma rotina para receber avaliações autênticas' },
      { id: 'conecte-perfil-pagina-adequada', title: '4. Conecte o perfil à página adequada' },
      { id: 'acompanhe-resultado-alem-visualizacao', title: '5. Acompanhe o resultado além da visualização' },
      { id: 'checklist-presenca-local', title: 'Checklist de presença local' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'facilite-caminho-quem-procura', title: 'Facilite o caminho de quem procura sua empresa' },
      { id: 'fontes', title: 'Fontes oficiais' },
    ],
    executiveSummary: [
      'Mantenha o perfil coerente com os serviços e o atendimento reais.',
      'Apresente evidências úteis para quem está escolhendo um fornecedor.',
      'Acompanhe contatos e pedidos de orçamento originados dessa presença.',
    ],
    faqs: [
      {
        question: 'Ter um perfil substitui o site?',
        answer:
          'Os dois podem se complementar. O perfil reúne informações rápidas; o site permite explicar serviços, mostrar projetos e organizar conteúdos com mais profundidade.',
      },
      {
        question: 'Atualizar o perfil garante a primeira posição?',
        answer:
          'Não. A classificação depende de diversos fatores e do contexto da pesquisa. A prioridade é manter uma presença correta, útil e coerente com o negócio.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google — Dicas para melhorar sua classificação local',
        url: 'https://support.google.com/business/answer/7091?hl=pt-br',
      },
      {
        id: 2,
        label: 'Google — Dicas para receber mais avaliações',
        url: 'https://support.google.com/business/answer/3474122?hl=pt-BR',
      },
    ],
    sourceNote:
      'Fontes consultadas em 16 de novembro de 2026. Exemplos e rotina de acompanhamento são recomendações editoriais da RUNA.',
    relatedServiceSlugs: [
      'sites-e-landing-pages',
      'gestao-de-trafego-pago',
      'dados-e-analytics',
    ],
  },
  {
    title: 'WhatsApp com IA: o que automatizar para melhorar o atendimento comercial',
    slug: 'whatsapp-com-ia-atendimento-comercial',
    seoTitle: 'WhatsApp com IA: o que automatizar no comercial',
    metaDescription:
      'Entenda como usar IA para organizar contatos, responder dúvidas e encaminhar oportunidades, com critérios claros para o atendimento humano.',
    excerpt:
      'A inteligência artificial pode organizar a recepção de leads, responder dúvidas aprovadas e adiantar a triagem — desde que tenha base confiável e limites claros.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Automação e IA',
    tags: ['WhatsApp', 'inteligência artificial', 'automação', 'atendimento', 'CRM'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/whatsapp-com-ia-atendimento-comercial/capa-whatsapp-com-ia.png',
      webp: '/blog/whatsapp-com-ia-atendimento-comercial/capa-whatsapp-com-ia.webp',
      avif: '/blog/whatsapp-com-ia-atendimento-comercial/capa-whatsapp-com-ia.avif',
      width: 1672,
      height: 941,
      alt: 'Smartphone com bolhas de conversa, símbolo de IA e avatar humano, acompanhado por um calendário.',
    },
    toc: [
      { id: 'o-que-pode-ser-automatizado', title: 'O que pode ser automatizado?' },
      { id: 'exemplo-organizar-pedidos-orcamento', title: 'Um exemplo: organizar pedidos de orçamento' },
      { id: 'prepare-base-informacao-confiavel', title: 'Prepare uma base de informação confiável' },
      { id: 'estabeleca-limites-decisao', title: 'Estabeleça os limites de decisão' },
      { id: 'teste-conversas-dificeis', title: 'Teste conversas difíceis antes de ampliar' },
      { id: 'o-que-acompanhar-depois-implantacao', title: 'O que acompanhar depois da implantação' },
      { id: 'checklist-para-comecar', title: 'Checklist para começar' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'organize-o-atendimento', title: 'Organize o atendimento para aproveitar melhor os contatos' },
      { id: 'fontes', title: 'Fonte oficial' },
    ],
    executiveSummary: [
      'Comece por tarefas repetitivas com informações bem definidas.',
      'Estabeleça quando a conversa deve chegar a uma pessoa.',
      'Avalie o avanço do atendimento, além da velocidade da primeira resposta.',
    ],
    faqs: [
      {
        question: 'Toda empresa precisa de um agente de IA?',
        answer:
          'Não. Algumas necessidades podem ser resolvidas com respostas rápidas, organização de tarefas ou fluxos simples. A escolha deve acompanhar a complexidade do atendimento.',
      },
      {
        question: 'A IA pode fechar vendas sozinha?',
        answer:
          'Isso depende do produto, das regras comerciais e das integrações. Para começar, costuma ser mais fácil avaliar tarefas delimitadas, como triagem e encaminhamento, antes de ampliar a autonomia.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'WhatsApp Business — Business Platform',
        url: 'https://business.whatsapp.com/products/platform',
      },
    ],
    sourceNote:
      'Fonte consultada em 16 de novembro de 2026. Os fluxos, critérios e indicadores apresentados são recomendações editoriais da RUNA.',
    relatedServiceSlugs: [
      'automacoes-e-ia',
      'sistemas-sob-medida',
      'dados-e-analytics',
    ],
  },
  {
    title: 'Quanto investir em tráfego pago? Comece pela margem do seu negócio',
    slug: 'quanto-investir-trafego-pago',
    seoTitle: 'Quanto investir em tráfego pago pela margem do negócio',
    metaDescription:
      'Aprenda a relacionar margem, custo de aquisição e taxa de fechamento para construir um orçamento de anúncios com critérios.',
    excerpt:
      'Antes de definir o valor da campanha, calcule quanto cada venda deixa de margem, qual o custo de aquisição suportável e quantos contatos sua equipe consegue converter.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Planejamento de Marketing',
    tags: ['tráfego pago', 'orçamento', 'CAC', 'margem', 'planejamento'],
    date: '2026-11-16',
    updated: '2026-11-16',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/quanto-investir-trafego-pago/capa-quanto-investir-trafego-pago.png',
      webp: '/blog/quanto-investir-trafego-pago/capa-quanto-investir-trafego-pago.webp',
      avif: '/blog/quanto-investir-trafego-pago/capa-quanto-investir-trafego-pago.avif',
      width: 1672,
      height: 941,
      alt: 'Calculadora, moedas e caderno de planejamento em uma composição verde-escura com detalhes em cobre.',
    },
    toc: [
      { id: 'entenda-quanto-sobra-cada-venda', title: '1. Entenda quanto sobra de cada venda' },
      { id: 'defina-custo-aquisicao-planejado', title: '2. Defina um custo de aquisição planejado' },
      { id: 'separe-parcela-disponivel-midia', title: '3. Separe a parcela disponível para mídia' },
      { id: 'transforme-meta-cenario-orcamento', title: '4. Transforme a meta em um cenário de orçamento' },
      { id: 'considere-capacidade-tempo-retorno', title: '5. Considere capacidade e tempo de retorno' },
      { id: 'defina-quando-reavaliar', title: '6. Defina quando reavaliar' },
      { id: 'checklist-do-orcamento', title: 'Checklist do orçamento' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'planeje-a-aquisicao', title: 'Planeje a aquisição a partir da realidade da empresa' },
      { id: 'fontes', title: 'Fonte oficial' },
    ],
    executiveSummary: [
      'Calcule quanto cada venda deixa depois dos custos variáveis.',
      'Defina um limite planejado de aquisição considerando todos os custos envolvidos.',
      'Use a taxa de fechamento para relacionar verba, contatos e meta de clientes.',
    ],
    faqs: [
      {
        question: 'Posso começar com uma verba pequena?',
        answer:
          'Sim, desde que a proposta de teste seja compatível com ela. Concentrar serviço, região e objetivo pode facilitar a leitura. Verbas menores também podem exigir mais tempo para reunir informações.',
      },
      {
        question: 'Quando faz sentido aumentar?',
        answer:
          'Quando os resultados comerciais, a capacidade de entrega e o caixa sustentarem a decisão. Mesmo assim, acompanhe o custo dos clientes adicionais: o desempenho pode mudar conforme o investimento cresce.',
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google Ads — Sobre as previsões do Planejador de palavras-chave',
        url: 'https://support.google.com/google-ads/answer/3022575?hl=pt-BR',
      },
    ],
    sourceNote:
      'Fonte consultada em 16 de novembro de 2026. Os cálculos são simulações editoriais da RUNA e devem ser adaptados aos custos, ao caixa e ao ciclo comercial de cada empresa.',
    relatedServiceSlugs: [
      'gestao-de-trafego-pago',
      'dados-e-analytics',
      'sistemas-sob-medida',
    ],
  },
  {
    title: 'Como preparar o site da sua empresa para aparecer nas buscas com IA',
    slug: 'preparar-site-buscas-ia',
    seoTitle: 'Como preparar seu site para as buscas com IA',
    metaDescription:
      'Veja como conteúdo útil, FAQ, SEO, velocidade e navegação clara ajudam a preparar o site da sua empresa para as buscas com inteligência artificial.',
    excerpt:
      'Seu site pode participar das respostas com IA e receber visitas pelos links apresentados. Entenda o que preparar no conteúdo, na estrutura e na experiência.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Sites e SEO',
    tags: ['SEO', 'buscas com IA', 'Modo IA', 'sites', 'Core Web Vitals', 'WebMCP'],
    date: '2026-11-03',
    updated: '2026-11-03',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/preparar-site-buscas-ia/capa-site-buscas-ia.png',
      webp: '/blog/preparar-site-buscas-ia/capa-site-buscas-ia.webp',
      avif: '/blog/preparar-site-buscas-ia/capa-site-buscas-ia.avif',
      width: 1672,
      height: 941,
      alt: 'Ilustração de site empresarial em um notebook, cercado por cartões de conversa e links que representam a busca com inteligência artificial.',
    },
    toc: [
      { id: 'o-seo-continua-sendo-a-base', title: 'O SEO continua sendo a base' },
      { id: 'duvidas-do-comercial-em-conteudo', title: '1. Transforme dúvidas do comercial em conteúdo' },
      { id: 'use-o-faq-para-facilitar-a-decisao', title: '2. Use o FAQ para facilitar a decisão' },
      { id: 'prepare-a-parte-tecnica', title: '3. Prepare a parte técnica para o conteúdo ser encontrado' },
      { id: 'faca-o-site-carregar-bem', title: '4. Faça o site carregar bem e responder rápido' },
      { id: 'prepare-a-navegacao-para-pessoas-e-agentes', title: '5. Prepare a navegação para pessoas e agentes de IA' },
      { id: 'como-isso-se-conecta-aos-anuncios', title: 'Como isso se conecta aos anúncios?' },
      { id: 'o-que-acompanhar-depois', title: 'O que acompanhar depois das melhorias' },
      { id: 'por-onde-comecar', title: 'Por onde começar na sua empresa' },
      { id: 'fontes', title: 'Fontes oficiais' },
    ],
    executiveSummary: [
      'As respostas geradas por IA no Google trazem links de apoio para páginas indexadas que fundamentam a resposta — o SEO técnico e de conteúdo continua sendo o pilar central.',
      'Transformar dúvidas reais de pré-venda e FAQs claras em conteúdo textual acessível gera tanto autoridade orgânica para robôs quanto facilidade de decisão para humanos.',
      'Experiência do usuário (Core Web Vitals) e mensuração conectada ao CRM garantem que o tráfego conquistado se transforme em oportunidades comerciais qualificadas.',
    ],
    faqs: [
      {
        question: 'Preciso criar um arquivo llms.txt para ser citado pelo Google?',
        answer:
          'Não. O Google Search Central esclarece que o arquivo llms.txt não é utilizado pela Pesquisa Google para ranking ou visibilidade em IA. O foco deve ser conteúdo útil em páginas indexadas.',
        citations: [2],
      },
      {
        question: 'O recurso de resultados enriquecidos de FAQ continua funcionando?',
        answer:
          'O Google retirou os resultados visuais especiais de FAQ da Pesquisa em 2026. A seção de perguntas frequentes continua sendo muito recomendada, mas como recurso editorial para leitura e indexação de respostas.',
        citations: [3],
      },
      {
        question: 'O que é o WebMCP para agentes de IA?',
        answer:
          'O WebMCP é um padrão em fase experimental (origin trial do Chrome) para expor ações do site a agentes autônomos. Não é um fator de ranking nem requisito de SEO obrigatório.',
        citations: [7],
      },
    ],
    sources: [
      {
        id: 1,
        label: 'Google Search Central — AI features and your website',
        url: 'https://developers.google.com/search/docs/appearance/ai-features',
      },
      {
        id: 2,
        label: 'Google Search Central — Optimizing your website for generative AI features on Google Search',
        url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',
      },
      {
        id: 3,
        label: 'Google Search Central — Histórico de atualizações da documentação',
        url: 'https://developers.google.com/search/updates',
      },
      {
        id: 4,
        label: 'Google Search Central — Introdução ao robots.txt',
        url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro',
      },
      {
        id: 5,
        label: 'Search Console — Search generative AI control',
        url: 'https://support.google.com/webmasters/answer/16908024',
      },
      {
        id: 6,
        label: 'Google Search Central — Core Web Vitals e resultados de pesquisa',
        url: 'https://developers.google.com/search/docs/appearance/core-web-vitals',
      },
      {
        id: 7,
        label: 'Chrome for Developers — Join the WebMCP origin trial (09/06/2026)',
        url: 'https://developer.chrome.com/blog/ai-webmcp-origin-trial',
      },
      {
        id: 8,
        label: 'Google Ads — Sobre a classificação do anúncio',
        url: 'https://support.google.com/google-ads/answer/1722122?hl=pt-BR',
      },
    ],
    sourceNote: 'Fontes oficiais consultadas em 3 de novembro de 2026.',
    relatedServiceSlugs: [
      'sites-e-landing-pages',
      'dados-e-analytics',
      'automacoes-e-ia',
    ],
  },
  {
    title: 'Meta Andromeda: como a IA seleciona anúncios e o que muda para sua empresa',
    slug: 'meta-andromeda-ia-anuncios',
    seoTitle: 'Meta Andromeda: o que muda nos anúncios da sua empresa',
    metaDescription:
      'Entenda o Meta Andromeda e como organizar criativos, dados e testes para melhorar as decisões de investimento em anúncios no Facebook e Instagram.',
    excerpt:
      'A Meta está aprimorando a seleção de anúncios com IA. Veja como transformar essa evolução em um processo melhor de criação, análise e investimento.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Meta Ads',
    tags: ['Meta Andromeda', 'tráfego pago', 'inteligência artificial', 'criativos', 'Meta Ads'],
    date: '2026-11-03',
    updated: '2026-11-03',
    readingTime: '5 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/meta-andromeda-ia-anuncios/capa-meta-andromeda.png',
      webp: '/blog/meta-andromeda-ia-anuncios/capa-meta-andromeda.webp',
      avif: '/blog/meta-andromeda-ia-anuncios/capa-meta-andromeda.avif',
      width: 1672,
      height: 941,
      alt: 'Ilustração editorial de cartões publicitários com um anúncio em destaque, representando a seleção de anúncios pelo Meta Andromeda.',
    },
    toc: [
      { id: 'o-que-e-o-meta-andromeda', title: 'O que é o Meta Andromeda?' },
      { id: 'preciso-ativar-na-minha-campanha', title: 'Preciso ativar isso na minha campanha no Brasil?' },
      { id: 'o-que-sua-empresa-pode-fazer', title: 'O que sua empresa pode fazer com essa informação?' },
      { id: 'exemplo-motivos-de-compra', title: 'Um exemplo simples: três motivos para a mesma cafeteria' },
      { id: 'como-organizar-os-testes', title: 'Como organizar os testes de anúncios' },
      { id: 'e-onde-entra-o-gem', title: 'E onde entra o GEM, outra IA da Meta?' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'transforme-producao-em-aprendizado', title: 'Transforme produção de anúncios em aprendizado para o negócio' },
      { id: 'fontes', title: 'Fontes oficiais' },
    ],
    executiveSummary: [
      'O Andromeda é o sistema de IA da Meta que atua na primeira etapa (retrieval) da recomendação de anúncios, filtrando bilhões de candidatos para um grupo menor e altamente relevante.',
      'O recurso opera na infraestrutura interna da Meta — não é um botão a ser ativado no Gerenciador de Anúncios.',
      'Para a empresa, o maior diferencial competitivo passa a ser trabalhar hipóteses reais de comunicação (motivos de compra distintos), conectar o clique ao CRM e acompanhar o resultado até a venda.',
    ],
    faqs: [
      {
        question: 'Quantos anúncios devo produzir?',
        answer:
          'Planeje a quantidade conforme as hipóteses prioritárias, o orçamento e a capacidade de análise. Um bom ponto de partida é listar o que a empresa precisa descobrir sobre o cliente e transformar essas perguntas em peças.',
      },
      {
        question: 'Posso usar IA para criar os anúncios?',
        answer:
          'Sim. Ela pode apoiar roteiros, variações de texto e conceitos visuais. Na nossa recomendação de trabalho, a equipe revisa a precisão das informações, a identidade da marca e a coerência da oferta antes da publicação.',
      },
      {
        question: 'O que devo cobrar de quem cuida do tráfego?',
        answer:
          'Peça clareza sobre quatro pontos: o objetivo do investimento, as hipóteses em teste, os resultados comerciais observados e a próxima decisão sugerida pelos dados.',
      },
    ],
    sources: [
      {
        id: 1,
        label:
          'Engineering at Meta — Meta Andromeda: Powering the Next Generation of Ads Retrieval Through Model-System Co-Design (28/10/2026)',
        url: 'https://engineering.fb.com/2026/10/28/ml-applications/meta-andromeda-next-gen-ads-retrieval-gpu-co-design/',
      },
      {
        id: 2,
        label:
          'Engineering at Meta — Meta’s Generative Ads Model (GEM): Scaling the Central Model and Compute Engine for Frontier Ads AI (13/10/2026)',
        url: 'https://engineering.fb.com/2026/10/13/ml-applications/generative-ads-model-gem-scaling-frontier-ads-ai/',
      },
    ],
    sourceNote:
      'Fontes técnicas oficiais consultadas. As orientações de criação, testes e gestão apresentadas neste artigo são análise editorial aplicada ao contexto empresarial.',
    relatedServiceSlugs: [
      'gestao-de-trafego-pago',
      'dados-e-analytics',
      'sistemas-sob-medida',
    ],
  },
  {
    title: 'Anúncios no Modo IA do Google: o que muda para as empresas brasileiras',
    slug: 'anuncios-modo-ia-google-brasil',
    seoTitle: 'Anúncios no Modo IA do Google: o que muda no Brasil',
    metaDescription:
      'Entenda os anúncios no Modo IA do Google, a previsão para o Brasil e como preparar campanhas e site para novas oportunidades de busca.',
    excerpt:
      'A pesquisa pode começar com uma dúvida e evoluir até uma decisão de compra. Veja como anúncios e conteúdo do site entram nessa conversa.',
    author: 'Bruno',
    authorRole: 'Fundador & Estrategista Digital na RUNA',
    category: 'Google Ads',
    tags: ['Google Ads', 'Inteligência artificial', 'SEO', 'Sites'],
    date: '2026-11-03',
    updated: '2026-11-03',
    readingTime: '6 min de leitura',
    status: 'published',
    cover: {
      png: '/blog/anuncios-modo-ia-google-brasil/capa-modo-ia-google.png',
      webp: '/blog/anuncios-modo-ia-google-brasil/capa-modo-ia-google.webp',
      avif: '/blog/anuncios-modo-ia-google-brasil/capa-modo-ia-google.avif',
      width: 1672,
      height: 941,
      alt: 'Ilustração conceitual de uma busca com inteligência artificial, com espaços distintos para anúncio e fonte.',
    },
    toc: [
      { id: 'o-que-e-o-modo-ia', title: 'O que é o Modo IA do Google?' },
      { id: 'como-entram-os-anuncios', title: 'Como entram os anúncios nessa conversa?' },
      { id: 'precisa-criar-campanha-nova', title: 'Minha empresa precisa criar uma campanha nova?' },
      { id: 'oportunidade-no-organico', title: 'Também existe oportunidade no orgânico?' },
      { id: 'o-que-observar-sobre-cliques', title: 'O que observar sobre os cliques?' },
      { id: 'como-preparar-sua-empresa', title: 'Como preparar sua empresa agora' },
      { id: 'perguntas-frequentes', title: 'Perguntas frequentes' },
      { id: 'sua-empresa-esta-preparada', title: 'Sua empresa está preparada para receber esse interesse?' },
      { id: 'fontes', title: 'Fontes oficiais' },
    ],
    executiveSummary: [
      'No Modo IA do Google, a busca deixa de ser apenas uma palavra-chave isolada e pode evoluir em uma conversa com múltiplas perguntas de aprofundamento.',
      'Campanhas elegíveis de Pesquisa, Shopping e Performance Max podem participar conforme a disponibilidade do recurso por mercado e idioma, sem exigir uma campanha exclusiva.',
      'Presença paga (anúncios identificados) e presença orgânica (páginas citadas como fontes) funcionam de maneira independente — e ambas exigem páginas de destino claras, rápidas e orientadas à decisão.',
    ],
    faqs: [
      {
        question: 'Os anúncios no Modo IA já chegaram ao Brasil?',
        answer:
          'O anúncio de 28/10 prevê expansão ainda em 2026. Na consulta de 03/11/2026, não encontramos confirmação de uma data exata ou de liberação geral no Brasil.',
        citations: [1, 2],
      },
      {
        question: 'Preciso de um arquivo especial para aparecer organicamente?',
        answer:
          'O Google não exige arquivos especiais de IA para a presença nas experiências generativas da Busca. A base continua sendo conteúdo útil e boas práticas de SEO.',
        citations: [3],
      },
      {
        question: 'Meu site pode ser citado mesmo sem comprar anúncios?',
        answer:
          'Sim. A seleção de fontes orgânicas é independente da compra de publicidade.',
        citations: [2, 3],
      },
    ],
    sources: [
      {
        id: 1,
        label:
          'Google Brasil — Estamos expandindo os Anúncios no Modo IA para novos mercados (28/10/2026)',
        url: 'https://blog.google/intl/pt-br/produtos/estamos-expandindo-os-anuncios-no-modo-ia-para-novos-mercados/',
      },
      {
        id: 2,
        label: 'Google Ads — About ads in AI-powered experiences in Google Search',
        url: 'https://support.google.com/google-ads/answer/18826097?hl=en',
      },
      {
        id: 3,
        label:
          'Google Search Central — Optimizing your website for generative AI features on Google Search',
        url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',
      },
      {
        id: 4,
        label: 'Google Ads — Classificação do anúncio: definição',
        url: 'https://support.google.com/google-ads/answer/1752122?hl=pt-BR',
      },
    ],
    sourceNote: 'Fontes oficiais consultadas em 3 de novembro de 2026.',
    relatedServiceSlugs: [
      'gestao-de-trafego-pago',
      'sites-e-landing-pages',
      'dados-e-analytics',
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return RUNA_BLOG_POSTS.find((post) => post.slug === slug);
}

export function formatBlogDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(year, (month || 1) - 1, day || 1));
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
