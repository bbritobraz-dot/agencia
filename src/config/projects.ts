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
