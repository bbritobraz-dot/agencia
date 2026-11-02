export type DiagnosticCategoryKey =
  | 'gestao-de-trafego-pago'
  | 'sites-e-landing-pages'
  | 'ecommerce'
  | 'automacoes-e-ia'
  | 'sistemas-sob-medida'
  | 'dados-e-analytics';

export interface DiagnosticOption {
  id: string;
  label: string;
  description: string;
  score: number; // 0 a 100
  bottleneckIfLow?: string;
  serviceBoost?: DiagnosticCategoryKey;
}

export interface DiagnosticQuestion {
  id: string;
  number: number;
  category: DiagnosticCategoryKey;
  categoryLabel: string;
  title: string;
  subtitle: string;
  options: DiagnosticOption[];
}

export const DIAGNOSTIC_CATEGORY_LABELS: Record<DiagnosticCategoryKey, string> = {
  'gestao-de-trafego-pago': 'Gestão de Tráfego Pago',
  'sites-e-landing-pages': 'Sites e Landing Pages',
  ecommerce: 'E-commerce e Vendas Online',
  'automacoes-e-ia': 'Automações e IA',
  'sistemas-sob-medida': 'Sistemas Sob Medida e CRM',
  'dados-e-analytics': 'Dados e Analytics',
};

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1_aquisicao_trafego',
    number: 1,
    category: 'gestao-de-trafego-pago',
    categoryLabel: 'Aquisição de Clientes',
    title: 'Como sua empresa atrai novos clientes e oportunidades comerciais hoje?',
    subtitle: 'Avalie a previsibilidade da sua geração de demanda mensal.',
    options: [
      {
        id: 'q1_opt1',
        label: 'Dependemos quase exclusivamente de indicações ou prospecção manual',
        description: 'Não temos campanhas ativas ou previsibilidade de novos contatos toda semana.',
        score: 20,
        bottleneckIfLow: 'Dependência de indicações e ausência de canal previsível de aquisição paga (Google/Meta Ads).',
        serviceBoost: 'gestao-de-trafego-pago',
      },
      {
        id: 'q1_opt2',
        label: 'Impulsionamos publicações ou rodamos campanhas pontuais sem rotina técnica',
        description: 'Investimos em anúncios, mas sem estrutura de funil, remarketing ou otimização contínua.',
        score: 45,
        bottleneckIfLow: 'Campanhas de tráfego pago sem arquitetura de funil e remarketing estruturado.',
        serviceBoost: 'gestao-de-trafego-pago',
      },
      {
        id: 'q1_opt3',
        label: 'Temos campanhas ativas em Google Ads ou Meta Ads com resultados regulares',
        description: 'Geramos leads/vendas, mas sentimos que o custo por oportunidade pode melhorar e escalar.',
        score: 75,
        serviceBoost: 'gestao-de-trafego-pago',
      },
      {
        id: 'q1_opt4',
        label: 'Operação multicanal madura com funil de aquisição, remarketing e metas claras',
        description: 'Google Ads e Meta Ads operam de forma integrada com controle rigoroso de CAC e ROAS.',
        score: 100,
      },
    ],
  },
  {
    id: 'q2_presenca_web',
    number: 2,
    category: 'sites-e-landing-pages',
    categoryLabel: 'Presença Web e Conversão',
    title: 'Qual é a situação atual do site e das páginas de conversão da sua empresa?',
    subtitle: 'Analise se a sua estrutura web ajuda ou atrapalha o fechamento de negócios.',
    options: [
      {
        id: 'q2_opt1',
        label: 'Não temos site próprio ou utilizamos apenas redes sociais / link na bio',
        description: 'Nossos clientes não encontram uma página institucional sólida ao pesquisar no Google.',
        score: 15,
        bottleneckIfLow: 'Ausência de site institucional e landing pages próprias para converter a demanda.',
        serviceBoost: 'sites-e-landing-pages',
      },
      {
        id: 'q2_opt2',
        label: 'Temos um site antigo, lento ou que não gera contatos qualificados',
        description: 'O site existe, mas não reflete o nível atual da empresa nem possui páginas focadas em campanha.',
        score: 40,
        bottleneckIfLow: 'Baixa conversão web: site defasado, sem velocidade otimizada ou sem landing pages dedicadas.',
        serviceBoost: 'sites-e-landing-pages',
      },
      {
        id: 'q2_opt3',
        label: 'Temos um bom site institucional, mas faltam landing pages específicas por oferta',
        description: 'A presença principal é boa, porém direcionamos todo o tráfego para uma única página genérica.',
        score: 75,
        serviceBoost: 'sites-e-landing-pages',
      },
      {
        id: 'q2_opt4',
        label: 'Site rápido, SEO técnico em dia e landing pages de alta conversão integradas',
        description: 'Nossas páginas carregam rápido no mobile e convertem visitantes em oportunidades constantemente.',
        score: 100,
      },
    ],
  },
  {
    id: 'q3_ecommerce_catalogo',
    number: 3,
    category: 'ecommerce',
    categoryLabel: 'Vendas Online e Catálogo Digital',
    title: 'Como seus produtos ou soluções são apresentados e comercializados no ambiente digital?',
    subtitle: 'Considere tanto vendas diretas (e-commerce) quanto catálogos digitais consultivos.',
    options: [
      {
        id: 'q3_opt1',
        label: 'O cliente precisa pedir PDF ou perguntar item por item no WhatsApp',
        description: 'Não temos catálogo estruturado nem loja virtual para consulta ou compra direta.',
        score: 25,
        bottleneckIfLow: 'Fricção comercial na apresentação de produtos/soluções por falta de e-commerce ou catálogo digital.',
        serviceBoost: 'ecommerce',
      },
      {
        id: 'q3_opt2',
        label: 'Temos loja virtual ou catálogo, mas com baixa taxa de conversão e abandono',
        description: 'A experiência no celular, meios de pagamento ou organização dos produtos deixa a desejar.',
        score: 50,
        bottleneckIfLow: 'Gargalo de conversão e experiência mobile na loja virtual / catálogo digital.',
        serviceBoost: 'ecommerce',
      },
      {
        id: 'q3_opt3',
        label: 'Vendemos apenas serviços consultivos e apresentamos escopo no site',
        description: 'Nosso modelo não exige carrinho de compras, mas pode se beneficiar de páginas por solução.',
        score: 80,
        serviceBoost: 'sites-e-landing-pages',
      },
      {
        id: 'q3_opt4',
        label: 'Operação de e-commerce ou catálogo digital rápida, integrada e otimizada',
        description: 'Pagamentos, frete, estoque/portfólio e eventos de conversão funcionam perfeitamente.',
        score: 100,
      },
    ],
  },
  {
    id: 'q4_automacoes_atendimento',
    number: 4,
    category: 'automacoes-e-ia',
    categoryLabel: 'Atendimento e Automações com IA',
    title: 'O que acontece quando um novo lead entra em contato pelo site, anúncio ou WhatsApp?',
    subtitle: 'O tempo de resposta e a triagem inicial impactam diretamente a taxa de fechamento.',
    options: [
      {
        id: 'q4_opt1',
        label: 'Atendimento 100% manual; às vezes o lead espera horas para receber resposta',
        description: 'Fora do horário comercial ou em picos de demanda, perdemos o timing do cliente.',
        score: 20,
        bottleneckIfLow: 'Tempo de resposta elevado e falta de triagem automatizada / agentes de IA no atendimento.',
        serviceBoost: 'automacoes-e-ia',
      },
      {
        id: 'q4_opt2',
        label: 'Temos apenas uma mensagem automática simples de saudação no WhatsApp',
        description: 'Não há qualificação inteligente nem integração automática com a fila comercial.',
        score: 45,
        bottleneckIfLow: 'Ausência de automações (n8n/IA) para qualificar leads e conectar canais ao comercial.',
        serviceBoost: 'automacoes-e-ia',
      },
      {
        id: 'q4_opt3',
        label: 'Utilizamos algumas automações básicas de captura e notificação da equipe',
        description: 'O lead chega rápido para o time, mas ainda fazemos muita triagem e follow-up manual.',
        score: 75,
        serviceBoost: 'automacoes-e-ia',
      },
      {
        id: 'q4_opt4',
        label: 'Triagem automatizada com IA/fluxos integrados 24/7 e roteamento imediato',
        description: 'O lead é atendido em segundos, qualificado automaticamente e registrado no sistema.',
        score: 100,
      },
    ],
  },
  {
    id: 'q5_sistemas_crm',
    number: 5,
    category: 'sistemas-sob-medida',
    categoryLabel: 'Gestão Comercial e Sistemas',
    title: 'Como sua empresa gerencia o funil de vendas, follow-ups e ferramentas operacionais?',
    subtitle: 'Avalie a organização dos processos internos e o controle sobre as oportunidades.',
    options: [
      {
        id: 'q5_opt1',
        label: 'Tudo fica espalhado nas conversas de WhatsApp dos vendedores ou na memória',
        description: 'Não sabemos quantos leads entraram, quantos estão em negociação ou por que perdemos vendas.',
        score: 15,
        bottleneckIfLow: 'Descontrole de pipeline comercial: leads perdidos no WhatsApp sem CRM ou gestão de follow-up.',
        serviceBoost: 'sistemas-sob-medida',
      },
      {
        id: 'q5_opt2',
        label: 'Controlamos em planilhas ou ferramentas genéricas que a equipe pouco atualiza',
        description: 'Falta um sistema aderente à nossa rotina com lembretes, histórico e indicadores claros.',
        score: 45,
        bottleneckIfLow: 'Operação dependente de planilhas manuais sem sistema centralizado de gestão e follow-up.',
        serviceBoost: 'sistemas-sob-medida',
      },
      {
        id: 'q5_opt3',
        label: 'Usamos um CRM padrão de mercado, mas temos processos internos que exigem sistemas próprios',
        description: 'Sentimos falta de dashboards customizados, portais, simuladores ou integrações sob medida.',
        score: 75,
        serviceBoost: 'sistemas-sob-medida',
      },
      {
        id: 'q5_opt4',
        label: 'Temos CRM e sistemas totalmente integrados com funil Kanban e histórico completo',
        description: 'Toda oportunidade tem etapa clara, responsável, histórico de contato e próximo follow-up agendado.',
        score: 100,
      },
    ],
  },
  {
    id: 'q6_dados_analytics',
    number: 6,
    category: 'dados-e-analytics',
    categoryLabel: 'Mensuração e Inteligência de Dados',
    title: 'Qual é o nível de visibilidade sobre as métricas de marketing e vendas da sua empresa?',
    subtitle: 'Você sabe exatamente qual campanha, página ou canal gera o maior retorno financeiro?',
    options: [
      {
        id: 'q6_opt1',
        label: 'Não temos GA4, Tag Manager ou Pixels configurados corretamente',
        description: 'Tomamos decisões por intuição, sem saber de onde vêm os melhores clientes.',
        score: 15,
        bottleneckIfLow: 'Cegueira de dados: ausência de rastreamento estruturado (GA4, GTM, Pixel e UTMs).',
        serviceBoost: 'dados-e-analytics',
      },
      {
        id: 'q6_opt2',
        label: 'Olhamos apenas métricas básicas (cliques e curtidas) nos relatórios das plataformas',
        description: 'Não rastreamos conversões reais de ponta a ponta nem capturamos UTMs até o fechamento.',
        score: 40,
        bottleneckIfLow: 'Mensuração superficial sem atribuição de UTMs, eventos de funil ou API de Conversões.',
        serviceBoost: 'dados-e-analytics',
      },
      {
        id: 'q6_opt3',
        label: 'Rastreamos leads gerados, mas falta consolidar dados em dashboards executivos',
        description: 'Sabemos quantos leads chegam, porém o cruzamento com vendas fechadas ainda é manual.',
        score: 75,
        serviceBoost: 'dados-e-analytics',
      },
      {
        id: 'q6_opt4',
        label: 'Mensuração avançada (GA4, GTM, API de Conversões, UTMs) e dashboards em tempo real',
        description: 'Acompanhamos taxas de conversão de cada etapa do funil com total confiabilidade.',
        score: 100,
      },
    ],
  },
  {
    id: 'q7_gargalo_prioritario',
    number: 7,
    category: 'gestao-de-trafego-pago',
    categoryLabel: 'Prioridade Estratégica',
    title: 'Se pudesse resolver um único gargalo nos próximos 60 dias, qual traria maior impacto?',
    subtitle: 'Isso nos ajuda a priorizar a recomendação com maior retorno imediato para o seu cenário.',
    options: [
      {
        id: 'q7_opt1',
        label: 'Aumentar o volume de leads qualificados e oportunidades chegando toda semana',
        description: 'Precisamos de tráfego pago estratégico e páginas que convertam visitantes em clientes.',
        score: 60,
        serviceBoost: 'gestao-de-trafego-pago',
      },
      {
        id: 'q7_opt2',
        label: 'Modernizar nosso site / e-commerce para transmitir autoridade e vender mais',
        description: 'Nossa vitrine digital precisa refletir a qualidade real da empresa e converter melhor.',
        score: 65,
        serviceBoost: 'sites-e-landing-pages',
      },
      {
        id: 'q7_opt3',
        label: 'Automatizar o atendimento com IA e integrar marketing ao processo comercial',
        description: 'Precisamos parar de perder leads por demora no WhatsApp ou falta de processos.',
        score: 70,
        serviceBoost: 'automacoes-e-ia',
      },
      {
        id: 'q7_opt4',
        label: 'Criar um sistema/CRM sob medida e ter controle total dos dados e indicadores',
        description: 'Queremos organizar a operação comercial com tecnologia própria e inteligência de dados.',
        score: 75,
        serviceBoost: 'sistemas-sob-medida',
      },
    ],
  },
  {
    id: 'q8_maturidade_operacao',
    number: 8,
    category: 'dados-e-analytics',
    categoryLabel: 'Capacidade de Execução e Escala',
    title: 'Como está estruturada a operação da sua empresa para absorver novas demandas?',
    subtitle: 'Entender seu momento operacional garante um plano de ação realista e sustentável.',
    options: [
      {
        id: 'q8_opt1',
        label: 'Operação enxuta: o próprio fundador centraliza marketing, atendimento e vendas',
        description: 'Precisamos de soluções práticas que economizem tempo e tragam retorno rápido.',
        score: 50,
        serviceBoost: 'automacoes-e-ia',
      },
      {
        id: 'q8_opt2',
        label: 'Temos atendimento comercial dedicado, mas faltam demanda constante e processos',
        description: 'A equipe tem capacidade ociosa e precisa receber mais oportunidades qualificadas.',
        score: 70,
        serviceBoost: 'gestao-de-trafego-pago',
      },
      {
        id: 'q8_opt3',
        label: 'Empresa em crescimento acelerado buscando profissionalizar tecnologia e dados',
        description: 'Já validamos o mercado e agora precisamos de infraestrutura digital para escalar.',
        score: 85,
        serviceBoost: 'sistemas-sob-medida',
      },
      {
        id: 'q8_opt4',
        label: 'Operação consolidada procurando parceiro estratégico de marketing, engenharia e IA',
        description: 'Buscamos atuação consultiva integrada entre aquisição, sistemas e inteligência.',
        score: 100,
        serviceBoost: 'dados-e-analytics',
      },
    ],
  },
];

export const REVENUE_RANGES = [
  'Até R$ 30 mil / mês',
  'De R$ 30 mil a R$ 100 mil / mês',
  'De R$ 100 mil a R$ 300 mil / mês',
  'De R$ 300 mil a R$ 1 milhão / mês',
  'Acima de R$ 1 milhão / mês',
  'Prefiro não informar',
];

export const BUSINESS_SEGMENTS = [
  'Serviços B2B / Consultoria',
  'Saúde, Clínicas e Estética',
  'E-commerce e Varejo',
  'Indústria e Distribuição',
  'Tecnologia e SaaS',
  'Construção Civil, Arquitetura e Imobiliário',
  'Educação e Treinamentos',
  'Profissional Liberal / Escritório',
  'Outro Segmento',
];
