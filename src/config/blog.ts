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
