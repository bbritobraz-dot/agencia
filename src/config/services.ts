export interface ServiceCategory {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  fullDescription: string;
  iconName: 'target' | 'layout' | 'shopping-bag' | 'bot' | 'cpu' | 'bar-chart-3';
  highlights: string[];
  applications: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  idealFor: string[];
  ctaLabel: string;
  seo: {
    title: string;
    description: string;
  };
}

export const RUNA_SERVICES: ServiceCategory[] = [
  {
    id: 'trafego-pago',
    number: '01',
    slug: 'gestao-de-trafego-pago',
    title: 'Gestão de Tráfego Pago',
    shortTitle: 'Tráfego Pago',
    tagline: 'Aquisição previsível de demanda qualificada em múltiplos canais.',
    summary:
      'Estruturação e otimização contínua de campanhas em Google Ads e Meta Ads voltadas à geração de demanda, captação de leads qualificados e vendas.',
    fullDescription:
      'Planejamos, implementamos e otimizamos operações de mídia paga orientadas por dados. Em vez de buscar cliques superficiais, estruturamos campanhas alinhadas à jornada de compra do seu cliente — da intenção ativa na rede de pesquisa do Google à descoberta, qualificação e remarketing no ecossistema Meta.',
    iconName: 'target',
    highlights: [
      'Google Ads (Pesquisa, Performance Max, YouTube e Display)',
      'Meta Ads (Instagram, Facebook e WhatsApp Direto)',
      'Estratégias avançadas de Remarketing de múltiplos estágios',
      'Geração de leads B2B/B2C e otimização de custo por oportunidade',
    ],
    applications: [
      {
        title: 'Captação de Demanda de Alta Intenção',
        description:
          'Campanhas no Google Search para posicionar sua empresa exatamente quando decisores buscam pelos seus serviços ou produtos.',
      },
      {
        title: 'Geração de Leads para Times Comerciais',
        description:
          'Funis de anúncios integrados a páginas de captura ou atendimento no WhatsApp com filtros de qualificação para o time de vendas.',
      },
      {
        title: 'Remarketing Estratégico e Recuperação',
        description:
          'Reimpacto inteligente de visitantes que demonstraram interesse, reduzindo o ciclo comercial e elevando a taxa de conversão.',
      },
    ],
    deliverables: [
      'Auditoria inicial de contas, histórico e estrutura de rastreamento',
      'Planejamento de mídia por canal, público, estágio de funil e orçamento',
      'Criação técnica, segmentação e configuração de campanhas e criativos',
      'Rotina semanal de otimização de termos, lances, públicos e anúncios',
      'Relatórios executivos claros com acompanhamento direto de indicadores',
    ],
    idealFor: [
      'Empresas de serviços B2B e B2C que precisam gerar oportunidades comerciais constantes',
      'Negócios locais, clínicas e escritórios que buscam previsibilidade de agenda',
      'Operações digitais que desejam escalar investimento com controle de CAC e ROI',
    ],
    ctaLabel: 'Solicitar diagnóstico de mídia paga',
    seo: {
      title: 'Gestão de Tráfego Pago (Google Ads e Meta Ads)',
      description:
        'Gestão estratégica de Google Ads, Meta Ads, remarketing e geração de leads com foco em eficiência comercial e dados.',
    },
  },
  {
    id: 'sites-landing-pages',
    number: '02',
    slug: 'sites-e-landing-pages',
    title: 'Sites e Landing Pages',
    shortTitle: 'Sites e Landing Pages',
    tagline: 'Arquitetura web de alta performance projetada para autoridade e conversão.',
    summary:
      'Desenvolvimento de sites institucionais, páginas de vendas e landing pages com engenharia moderna, SEO técnico, carregamento ultrarrápido e integrações.',
    fullDescription:
      'O site da sua empresa é o centro da sua operação digital. Desenvolvemos plataformas institucionais e landing pages sob medida que combinam design autoral, arquitetura de informação persuasiva, velocidade de carregamento superior e integração nativa com seu CRM e ferramentas de mensuração.',
    iconName: 'layout',
    highlights: [
      'Sites institucionais premium e portais corporativos',
      'Landing pages e páginas de vendas de alta conversão',
      'SEO técnico estruturado, Core Web Vitals e alta velocidade',
      'Integrações nativas com CRM, WhatsApp, APIs e plataformas de automação',
    ],
    applications: [
      {
        title: 'Reposicionamento Institucional Corporativo',
        description:
          'Sites completos para empresas que precisam transmitir solidez, apresentar seu portfólio de soluções e gerar confiança imediata em decisores.',
      },
      {
        title: 'Landing Pages Dedicadas para Campanhas',
        description:
          'Páginas enxutas, rápidas e orientadas a uma única chamada para ação, maximizando o aproveitamento do orçamento de tráfego pago.',
      },
      {
        title: 'Hubs de Captação com Diagnóstico ou Simulador',
        description:
          'Páginas interativas que qualificam o visitante antes mesmo do contato comercial, entregando leads prontos para a equipe de vendas.',
      },
    ],
    deliverables: [
      'Arquitetura de informação, wireframes e direção de copywriting consultivo',
      'Design UI/UX exclusivo e responsivo (mobile-first)',
      'Desenvolvimento moderno com otimização de imagens, fontes e Core Web Vitals',
      'Configuração completa de SEO técnico (metadados, sitemap, dados estruturados Schema.org)',
      'Integração de formulários, eventos de conversão e CRM',
    ],
    idealFor: [
      'Empresas cujo site atual está defasado, lento ou não reflete a maturidade do negócio',
      'Operações que investem em tráfego pago e precisam elevar a taxa de conversão das páginas',
      'Negócios que desejam construir presença orgânica sólida no Google (SEO)',
    ],
    ctaLabel: 'Avaliar estrutura do meu site',
    seo: {
      title: 'Criação de Sites Institucionais e Landing Pages de Alta Conversão',
      description:
        'Desenvolvimento de sites institucionais, páginas de vendas e landing pages com SEO técnico, alta velocidade e integrações.',
    },
  },
  {
    id: 'ecommerce',
    number: '03',
    slug: 'ecommerce',
    title: 'E-commerce',
    shortTitle: 'E-commerce',
    tagline: 'Lojas virtuais estruturadas para performance, operação fluida e escala.',
    summary:
      'Implantação, evolução e otimização de lojas virtuais em Shopify, WooCommerce ou arquiteturas dedicadas, com catálogos, meios de pagamento, logística e mensuração.',
    fullDescription:
      'Construímos e otimizamos operações de comércio eletrônico preparadas para vender com estabilidade e margem. Cuidamos desde a experiência de navegação, categorização de catálogo e redução de fricção no checkout até a integração com gateways de pagamento, ERPs, frete e rastreamento avançado de eventos de e-commerce.',
    iconName: 'shopping-bag',
    highlights: [
      'Implementação e customização em Shopify e WooCommerce',
      'Estruturação de catálogo, vitrines inteligentes e filtros de busca',
      'Integração de gateways de pagamento, antifraude, frete e ERP',
      'Mensuração completa de funil de compras (GA4 Enhanced Ecommerce & API de Conversões)',
    ],
    applications: [
      {
        title: 'Lançamento de Operação D2C ou B2B',
        description:
          'Estruturação ponta a ponta da loja virtual para marcas próprias, indústrias ou varejistas que desejam abrir um canal direto de vendas online.',
      },
      {
        title: 'Otimização de Taxa de Conversão (CRO para E-commerce)',
        description:
          'Redesign de páginas de produto, carrinho e checkout para diminuir o abandono e elevar o ticket médio da operação.',
      },
      {
        title: 'Catálogos Digitais com Orçamento Integrado',
        description:
          'Soluções híbridas para empresas com vendas consultivas que precisam exibir linha completa de produtos e receber cotações estruturadas.',
      },
    ],
    deliverables: [
      'Setup técnico e customização visual da plataforma (Shopify / WooCommerce)',
      'Organização de árvore de categorias, atributos, variações e páginas de produto',
      'Configuração de meios de pagamento, regras de frete e notificações transacionais',
      'Rastreamento de eventos (view_item, add_to_cart, begin_checkout, purchase)',
      'Treinamento operacional para gestão de pedidos e catálogo',
    ],
    idealFor: [
      'Varejistas e marcas que buscam estruturar ou profissionalizar seu canal de vendas online',
      'Lojas virtuais que enfrentam lentidão, baixa conversão no mobile ou falhas de integração',
      'Distribuidores e indústrias que precisam digitalizar seu catálogo de produtos',
    ],
    ctaLabel: 'Diagnosticar minha operação de e-commerce',
    seo: {
      title: 'Desenvolvimento e Otimização de E-commerce (Shopify e WooCommerce)',
      description:
        'Criação e evolução de lojas virtuais em Shopify e WooCommerce com foco em conversão, integrações de pagamento e mensuração.',
    },
  },
  {
    id: 'automacoes-ia',
    number: '04',
    slug: 'automacoes-e-ia',
    title: 'Automações e IA',
    shortTitle: 'Automações e IA',
    tagline: 'Eficiência operacional, atendimento inteligente e processos integrados 24/7.',
    summary:
      'Desenvolvimento de fluxos automatizados com n8n, agentes de Inteligência Artificial, qualificação de atendimento, integração entre sistemas e eliminação de tarefas manuais.',
    fullDescription:
      'Conectamos as ferramentas da sua empresa e implementamos agentes inteligentes para eliminar gargalos operacionais e comerciais. Com automações sob medida (n8n, Webhooks, APIs) e IA aplicada, sua empresa responde leads instantaneamente, qualifica demandas, sincroniza dados com o CRM e executa rotinas repetitivas sem intervenção humana.',
    iconName: 'bot',
    highlights: [
      'Orquestração de fluxos e integrações avançadas com n8n e APIs REST',
      'Agentes inteligentes de IA para triagem, atendimento e qualificação comercial',
      'Automação de follow-up, distribuição de leads e notificações para equipes',
      'Sincronização automática entre formulários, WhatsApp, CRM, planilhas e ERP',
    ],
    applications: [
      {
        title: 'Qualificação e Atendimento Imediato no WhatsApp',
        description:
          'Agentes conversacionais que recepcionam o lead em segundos, coletam informações essenciais, respondem dúvidas técnicas e encaminham ao vendedor responsável.',
      },
      {
        title: 'Integração Entre Marketing e Comercial',
        description:
          'Fluxos automatizados que capturam leads de múltiplas origens, enriquecem dados, criam negócios no CRM e disparam alertas imediatos para a equipe.',
      },
      {
        title: 'Automação de Processos Internos e Backoffice',
        description:
          'Geração automática de propostas, contratos, relatórios operacionais, cobranças e sincronização entre plataformas que antes não se comunicavam.',
      },
    ],
    deliverables: [
      'Mapeamento de processos atuais e identificação de pontos de automação',
      'Arquitetura e implementação de workflows em n8n / APIs dedicadas',
      'Configuração e treinamento de agentes de IA com base de conhecimento da empresa',
      'Testes de carga, tratamento de erros (fallbacks) e monitoramento de execução',
      'Documentação técnica dos fluxos e treinamento da equipe',
    ],
    idealFor: [
      'Empresas que perdem vendas pela demora no primeiro atendimento aos leads',
      'Equipes comerciais e operacionais sobrecarregadas com tarefas manuais repetitivas',
      'Negócios que utilizam múltiplos softwares desconectados no dia a dia',
    ],
    ctaLabel: 'Mapear automações para minha empresa',
    seo: {
      title: 'Automações de Processos, n8n e Agentes de Inteligência Artificial',
      description:
        'Automatize o atendimento, integre sistemas com n8n e implemente agentes inteligentes de IA para escalar a operação da sua empresa.',
    },
  },
  {
    id: 'sistemas-sob-medida',
    number: '05',
    slug: 'sistemas-sob-medida',
    title: 'Sistemas Sob Medida',
    shortTitle: 'Sistemas Sob Medida',
    tagline: 'Software proprietário desenhado exatamente para a regra de negócio da sua empresa.',
    summary:
      'Engenharia de sistemas web exclusivos: CRMs próprios, dashboards gerenciais, portais de clientes, simuladores comerciais, ferramentas internas e painéis administrativos.',
    fullDescription:
      'Quando ferramentas de prateleira limitam o crescimento ou não atendem às particularidades da sua operação, desenvolvemos sistemas web sob medida. Utilizamos arquitetura moderna (Next.js, TypeScript, PostgreSQL/Supabase) com segurança rigorosa, controle de permissões e interfaces intuitivas para transformar processos complexos em vantagem competitiva.',
    iconName: 'cpu',
    highlights: [
      'CRMs internos e pipelines comerciais customizados para o seu processo de vendas',
      'Portais do cliente, áreas de membros e plataformas de autoatendimento',
      'Simuladores de orçamento, calculadoras técnicas e diagnósticos interativos',
      'Sistemas administrativos internos, painéis operacionais e gestão de fluxos',
    ],
    applications: [
      {
        title: 'CRM e Funil Comercial Proprietário',
        description:
          'Plataformas internas de gestão de leads, propostas e follow-ups 100% adaptadas às etapas reais da sua equipe comercial, sem mensalidades por usuário.',
      },
      {
        title: 'Portais para Clientes, Parceiros ou Franqueados',
        description:
          'Ambientes autenticados para acompanhamento de pedidos, solicitações, documentos, treinamentos ou relatórios personalizados.',
      },
      {
        title: 'Simuladores e Configuradores de Propostas',
        description:
          'Ferramentas web que calculam orçamentos complexos ou realizam diagnósticos técnicos automatizados para acelerar o fechamento comercial.',
      },
    ],
    deliverables: [
      'Levantamento de requisitos funcionais, regras de negócio e modelagem de dados',
      'Prototipação de interface focada em usabilidade e produtividade operacional',
      'Desenvolvimento Full-Stack (Frontend React/Next.js + Backend e Banco PostgreSQL)',
      'Controle de acesso por perfil (Auth + Row Level Security) e auditoria de ações',
      'Deploy em infraestrutura escalável, documentação e evolução assistida',
    ],
    idealFor: [
      'Empresas que controlam operações críticas em planilhas complexas e descentralizadas',
      'Negócios cujos processos comerciais ou operacionais não se adaptam a softwares genéricos',
      'Organizações que buscam construir ativos tecnológicos próprios',
    ],
    ctaLabel: 'Projetar sistema sob medida',
    seo: {
      title: 'Desenvolvimento de Sistemas Web Sob Medida, CRM e Portais',
      description:
        'Criamos sistemas sob medida, CRMs próprios, dashboards, portais de clientes e ferramentas internas com arquitetura moderna e segura.',
    },
  },
  {
    id: 'dados-analytics',
    number: '06',
    slug: 'dados-e-analytics',
    title: 'Dados e Analytics',
    shortTitle: 'Dados e Analytics',
    tagline: 'Visibilidade ponta a ponta do funil para decisões baseadas em evidências.',
    summary:
      'Implementação avançada de GA4, Google Tag Manager, Meta Pixel, API de Conversões server-side, dashboards executivos e otimização contínua de funis.',
    fullDescription:
      'Sem dados confiáveis, qualquer investimento em marketing ou tecnologia opera no escuro. Estruturamos toda a camada de coleta, atribuição e visualização de dados do seu negócio — garantindo que cada clique, formulário, conversa no WhatsApp e venda fechada seja corretamente rastreado e transformado em inteligência acionável.',
    iconName: 'bar-chart-3',
    highlights: [
      'Configuração profissional de Google Analytics 4 (GA4) e Google Tag Manager (GTM)',
      'Implementação de Meta Pixel e API de Conversões (Server-Side Tracking)',
      'Dashboards executivos consolidando investimentos, leads e oportunidades',
      'Análise de atribuição (UTMs), diagnóstico de gargalos e otimização de funil (CRO)',
    ],
    applications: [
      {
        title: 'Rastreamento Server-Side e Precisão de Atribuição',
        description:
          'Recuperação da qualidade dos sinais enviados às plataformas de anúncio, reduzindo perdas por bloqueadores e alimentando os algoritmos com conversões reais.',
      },
      {
        title: 'Mapeamento Completo da Jornada de Conversão',
        description:
          'Monitoramento de micro e macroconversões (início de diagnóstico, avanço de etapas, cliques comerciais e submissões) para identificar exatamente onde os visitantes abandonam o funil.',
      },
      {
        title: 'Dashboards Executivos para Tomada de Decisão',
        description:
          'Painéis claros que conectam os dados de aquisição (mídia) aos resultados comerciais (CRM), permitindo alocar orçamento onde há maior retorno.',
      },
    ],
    deliverables: [
      'Auditoria e plano de mensuração alinhado aos objetivos de negócio (KPIs)',
      'Configuração de contêineres GTM, eventos customizados GA4 e parâmetros de UTM',
      'Implementação de Pixel e API de Conversões em conformidade com a LGPD',
      'Validação de integridade de dados e eliminação de duplicidade de eventos',
      'Construção de painel de indicadores e rotina de análise de funil',
    ],
    idealFor: [
      'Empresas que investem em anúncios mas não sabem exatamente qual campanha gera clientes reais',
      'Operações com discrepância entre números das plataformas de mídia e vendas no CRM',
      'Gestores que precisam de indicadores confiáveis para planejar metas de crescimento',
    ],
    ctaLabel: 'Auditar minha estrutura de dados',
    seo: {
      title: 'Dados, Web Analytics, GA4, GTM e API de Conversões',
      description:
        'Estruturação completa de GA4, Google Tag Manager, Pixel, API de Conversões, dashboards executivos e inteligência de funil.',
    },
  },
];

export function getServiceBySlug(slug: string): ServiceCategory | undefined {
  return RUNA_SERVICES.find((service) => service.slug === slug);
}

/** Frase de "dor" de cada solução: o problema que o cliente reconhece (por id) */
export const SERVICE_HOOKS: Record<string, string> = {
  'trafego-pago': 'Depende de indicação para vender?',
  'sites-landing-pages': 'Seu site não gera contatos?',
  ecommerce: 'Visitas que não viram pedidos?',
  'automacoes-ia': 'Leads esperando horas por resposta?',
  'sistemas-sob-medida': 'Vendas controladas em planilhas?',
  'dados-analytics': 'Não sabe qual anúncio dá retorno?',
};
