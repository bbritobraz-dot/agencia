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
  relatedServiceSlugs: string[];
}

export const RUNA_BLOG_POSTS: BlogPost[] = [
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
      { id: 'fontes-oficiais', title: 'Fontes oficiais' },
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
