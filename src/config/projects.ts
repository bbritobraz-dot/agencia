/**
 * CONFIGURAÇÃO DE PROJETOS E CASES DA RUNA
 *
 * Diretriz de Governança e Transparência:
 * - NUNCA exibir números de resultado, depoimentos, nomes de clientes ou métricas não verificadas.
 * - Cases reais de clientes só devem ter `isAuthorizedCase: true` após validação e autorização expressa.
 * - Enquanto novos cases autorizados não forem adicionados, a vitrine apresenta a arquitetura
 *   das soluções proprietárias e entregáveis técnicos da RUNA sem atribuir marcas ou métricas fictícias.
 */

export interface ConfigurableProject {
  id: string;
  title: string;
  category: string;
  serviceSlug: string;
  summary: string;
  architectureHighlights: string[];
  imageUrl: string;
  /** Define se é um case real autorizado com evidências verificadas */
  isAuthorizedCase: boolean;
  /** Preencher apenas quando houver autorização formal do cliente */
  authorizedClientName?: string;
  /** Preencher apenas com indicador auditável e autorizado */
  verifiedResultText?: string;
  liveUrl?: string;
}

export const RUNA_PROJECTS_CONFIG: ConfigurableProject[] = [
  {
    id: 'arquitetura-institucional-conversao',
    title: 'Ecossistema Web Institucional + Diagnóstico de Qualificação',
    category: 'Sites e Landing Pages · Sistemas Sob Medida',
    serviceSlug: 'sites-e-landing-pages',
    summary:
      'Estrutura web de alta velocidade integrada a quiz de diagnóstico digital, pontuação automática de maturidade e envio direto ao CRM comercial.',
    architectureHighlights: [
      'Arquitetura Next.js com otimização de Core Web Vitals e SEO técnico',
      'Motor de qualificação interativo com cálculo de score por categoria',
      'Persistência segura em banco PostgreSQL com proteção RLS',
    ],
    imageUrl: '/site_portifolio/1.webp',
    isAuthorizedCase: false,
  },
  {
    id: 'arquitetura-ecommerce-performance',
    title: 'Infraestrutura para E-commerce e Catálogos Digitais',
    category: 'E-commerce · Dados e Analytics',
    serviceSlug: 'ecommerce',
    summary:
      'Modelagem de loja virtual focada em navegação mobile-first, checkout de baixa fricção e rastreamento de eventos de funil ponta a ponta.',
    architectureHighlights: [
      'Catálogo estruturado com filtros rápidos e páginas de produto persuasivas',
      'Integração nativa com meios de pagamento, cálculo logístico e ERP',
      'Camada de dados configurada para GA4, GTM e API de Conversões',
    ],
    imageUrl: '/site_portifolio/2.webp',
    isAuthorizedCase: false,
  },
  {
    id: 'arquitetura-b2b-captacao',
    title: 'Plataforma de Aquisição B2B e Gestão de Oportunidades',
    category: 'Gestão de Tráfego Pago · Automações e IA',
    serviceSlug: 'gestao-de-trafego-pago',
    summary:
      'Integração entre campanhas de pesquisa de alta intenção, landing pages setoriais, triagem automatizada e funil Kanban para equipes comerciais.',
    architectureHighlights: [
      'Captura automática de parâmetros UTM e origem de mídia',
      'Roteamento imediato para atendimento via WhatsApp com contexto do lead',
      'Painel de controle comercial com histórico de contatos e follow-ups',
    ],
    imageUrl: '/site_portifolio/4.webp',
    isAuthorizedCase: false,
  },
];

export interface AuthorizedCasePlaceholder {
  slotId: string;
  segmentLabel: string;
  statusNote: string;
}

export const AUTHORIZED_CASE_SLOTS: AuthorizedCasePlaceholder[] = [
  {
    slotId: 'case-slot-01',
    segmentLabel: 'Serviços & Consultoria B2B',
    statusNote: 'Espaço configurável reservado para publicação mediante autorização formal do cliente.',
  },
  {
    slotId: 'case-slot-02',
    segmentLabel: 'E-commerce & Varejo Digital',
    statusNote: 'Espaço configurável reservado para publicação mediante autorização formal do cliente.',
  },
  {
    slotId: 'case-slot-03',
    segmentLabel: 'Saúde, Clínicas & Negócios Locais',
    statusNote: 'Espaço configurável reservado para publicação mediante autorização formal do cliente.',
  },
];

/**
 * PORTFÓLIO AUTORIZADO
 *
 * Clientes cujo nome, logo e site podem ser exibidos publicamente.
 * Autorização confirmada pela RUNA em 05/11/2026.
 * Não adicionar números de resultado aqui sem indicador auditável e autorizado.
 * `liveUrl`: preencher com o endereço real do site para exibir o link "Ver site no ar".
 */
export type PortfolioType = 'site' | 'ecommerce' | 'landing' | 'sistema';

export interface AuthorizedPortfolioItem {
  id: string;
  client: string;
  segment: string;
  type: PortfolioType;
  /** Imagem do projeto em /public */
  imageUrl: string;
  /**
   * 'mockup' = print dentro de um notebook (1600x1200, só a tela é recortada);
   * 'screen' = print direto da tela (1440x900). Padrão: 'mockup'.
   */
  frame?: 'mockup' | 'screen';
  liveUrl?: string;
  /** Print feito com dados fictícios (sistemas internos, sem expor clientes reais) */
  demo?: boolean;
}

export const PORTFOLIO_TYPE_LABELS: Record<PortfolioType, string> = {
  site: 'Site institucional',
  ecommerce: 'Loja virtual',
  landing: 'Landing page',
  sistema: 'Sistema sob medida',
};

/** Estilo de fundo que recorta só a tela do print, conforme o tipo de imagem */
export function portfolioImageStyle(p: AuthorizedPortfolioItem): { backgroundImage: string; backgroundSize: string; backgroundPosition: string } {
  return p.frame === 'screen'
    ? { backgroundImage: `url(${p.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'top center' }
    : { backgroundImage: `url(${p.imageUrl})`, backgroundSize: '132.1% auto', backgroundPosition: '50.6% 38.9%' };
}

// Ordem = ordem de exibição (os 6 primeiros aparecem em "Todos" na home)
export const AUTHORIZED_PORTFOLIO: AuthorizedPortfolioItem[] = [
  { id: 'ozimme-loja', client: 'Ozimme', segment: 'Loja virtual de básicos premium', type: 'ecommerce', imageUrl: '/portfolio/ozimme-loja.webp', frame: 'screen', liveUrl: 'https://ozimme.com.br' },
  { id: 'bellatrix', client: 'Bellatrix Persianas', segment: 'Persianas sob medida, com simulador de orçamento', type: 'site', imageUrl: '/portfolio/bellatrix.webp', frame: 'screen', liveUrl: 'https://www.persianasfoz.com.br' },
  { id: 'olivertur', client: 'Olivertur Turismo', segment: 'Turismo receptivo, site em 3 idiomas', type: 'site', imageUrl: '/portfolio/olivertur.webp', frame: 'screen', liveUrl: 'https://www.oliverturfoz.com.br' },
  { id: 'tamara-rahall', client: 'Tâmara Rahall', segment: 'Nutricionista · consultas presenciais e online', type: 'site', imageUrl: '/portfolio/tamara.webp', frame: 'screen', liveUrl: 'https://tamara-rho.vercel.app' },
  { id: 'bellatrix-crm', client: 'Bellatrix · CRM e Orçamentos', segment: 'Clientes, orçamentos, produção e financeiro', type: 'sistema', imageUrl: '/portfolio/bellatrix-crm-painel.webp', frame: 'screen', demo: true },
  { id: 'samara-academy', client: 'Samara Academy', segment: 'Escola de estética · cursos presenciais', type: 'site', imageUrl: '/portfolio/samara-cursos.webp', frame: 'screen', liveUrl: 'https://cursos.samaraacademy.com.br' },
  { id: 'ozimme-uniformes', client: 'Ozimme Uniformes', segment: 'Uniformes empresariais direto da fábrica', type: 'landing', imageUrl: '/portfolio/ozimme-uniformes.webp', frame: 'screen', liveUrl: 'https://www.ozimmeuniformes.com.br' },
  { id: 'ozimme-terceirao', client: 'Ozimme Terceirão', segment: 'Camisas de terceirão, formandos e turmas', type: 'landing', imageUrl: '/portfolio/ozimme-terceirao.webp', frame: 'screen', liveUrl: 'https://www.ozimmeuniformes.com.br/terceirao' },
  { id: 'bellatrix-orcamentos', client: 'Bellatrix · Gerador de Orçamentos', segment: 'Cálculo automático de áreas, custos e margem', type: 'sistema', imageUrl: '/portfolio/bellatrix-crm-orcamento.webp', frame: 'screen', demo: true },
  { id: 'samara-esthetic', client: 'Samara Esthetic Center', segment: 'Clínica de estética · tratamentos e valores', type: 'site', imageUrl: '/portfolio/samara-servicos.webp', frame: 'screen', liveUrl: 'https://www.samaraacademy.com.br' },
  { id: 'maynds', client: 'Maynds', segment: 'Chocolates sem açúcar', type: 'ecommerce', imageUrl: '/site_portifolio/2.webp' },
  { id: 'dc-arquitetura', client: 'DC Arquitetura', segment: 'Arquitetura e construção', type: 'site', imageUrl: '/site_portifolio/6.webp' },
  { id: 'gabriella-cury', client: 'Gabriella Cury', segment: 'Curso de maquiagem · Recife', type: 'landing', imageUrl: '/site_portifolio/8.webp' },
  { id: 'museu-foz-cars', client: 'Museu Foz Cars', segment: 'Turismo · Foz do Iguaçu', type: 'site', imageUrl: '/site_portifolio/9.webp' },
  { id: 'slapple', client: 'Slapple', segment: 'Bens de consumo', type: 'ecommerce', imageUrl: '/site_portifolio/7.webp' },
];

/** Quais tipos de projeto do portfólio comprovam cada solução (por slug da solução) */
export const PORTFOLIO_BY_SERVICE: Record<string, PortfolioType[]> = {
  'sites-e-landing-pages': ['site', 'landing'],
  ecommerce: ['ecommerce'],
  'sistemas-sob-medida': ['sistema'],
};

export function getPortfolioForService(slug: string): AuthorizedPortfolioItem[] {
  const types = PORTFOLIO_BY_SERVICE[slug];
  return types ? AUTHORIZED_PORTFOLIO.filter((p) => types.includes(p.type)) : [];
}

/** Solução relacionada a um tipo de projeto (inverso de PORTFOLIO_BY_SERVICE) */
export function getServiceSlugForType(type: PortfolioType): string | undefined {
  return Object.keys(PORTFOLIO_BY_SERVICE).find((slug) => PORTFOLIO_BY_SERVICE[slug].includes(type));
}
