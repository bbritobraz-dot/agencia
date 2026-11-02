import {
  DIAGNOSTIC_CATEGORY_LABELS,
  DIAGNOSTIC_QUESTIONS,
  DiagnosticCategoryKey,
} from '@/config/diagnosticQuestions';
import { RUNA_SERVICES } from '@/config/services';

export interface SelectedAnswerInput {
  questionId: string;
  optionId: string;
}

export interface CategoryScoreDetail {
  category: DiagnosticCategoryKey;
  label: string;
  score: number;
  status: 'Crítico' | 'Atenção' | 'Bom' | 'Excelente';
}

export interface DiagnosticBottleneck {
  category: DiagnosticCategoryKey;
  categoryLabel: string;
  description: string;
  severity: 'Alta' | 'Média';
}

export interface RecommendedServiceItem {
  slug: DiagnosticCategoryKey;
  title: string;
  tagline: string;
  reason: string;
  priority: 'Prioridade 1' | 'Prioridade 2' | 'Complementar';
}

export interface DetailedAnswerRecord {
  questionId: string;
  questionNumber: number;
  category: DiagnosticCategoryKey;
  questionText: string;
  selectedOptionId: string;
  answerText: string;
  score: number;
  bottleneckTag: string | null;
}

export interface DiagnosticCalculationResult {
  overallScore: number;
  maturityLevel: 'Inicial' | 'Em Estruturação' | 'Em Crescimento' | 'Alta Performance';
  maturityDescription: string;
  categoryScores: Record<DiagnosticCategoryKey, number>;
  categoryDetails: CategoryScoreDetail[];
  bottlenecks: DiagnosticBottleneck[];
  recommendedServices: RecommendedServiceItem[];
  primaryRecommendation: string;
  summaryDiagnosis: string;
  detailedAnswers: DetailedAnswerRecord[];
}

const ALL_CATEGORIES: DiagnosticCategoryKey[] = [
  'gestao-de-trafego-pago',
  'sites-e-landing-pages',
  'ecommerce',
  'automacoes-e-ia',
  'sistemas-sob-medida',
  'dados-e-analytics',
];

function getScoreStatus(score: number): 'Crítico' | 'Atenção' | 'Bom' | 'Excelente' {
  if (score < 40) return 'Crítico';
  if (score < 65) return 'Atenção';
  if (score < 85) return 'Bom';
  return 'Excelente';
}

export function calculateDiagnosticResult(
  answers: Record<string, string>
): DiagnosticCalculationResult {
  const categoryBuckets: Record<DiagnosticCategoryKey, number[]> = {
    'gestao-de-trafego-pago': [],
    'sites-e-landing-pages': [],
    ecommerce: [],
    'automacoes-e-ia': [],
    'sistemas-sob-medida': [],
    'dados-e-analytics': [],
  };

  const servicePriorityBoost: Record<DiagnosticCategoryKey, number> = {
    'gestao-de-trafego-pago': 0,
    'sites-e-landing-pages': 0,
    ecommerce: 0,
    'automacoes-e-ia': 0,
    'sistemas-sob-medida': 0,
    'dados-e-analytics': 0,
  };

  const bottlenecks: DiagnosticBottleneck[] = [];
  const detailedAnswers: DetailedAnswerRecord[] = [];
  let totalRawScore = 0;
  let answeredCount = 0;

  for (const question of DIAGNOSTIC_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    const option =
      question.options.find((opt) => opt.id === selectedOptionId) || question.options[0];

    totalRawScore += option.score;
    answeredCount += 1;

    // Q1..Q6 map directly to the 6 pillars; Q7 & Q8 refine priority boosts and overall readiness
    if (question.number <= 6) {
      categoryBuckets[question.category].push(option.score);
    } else {
      // Distribute strategic readiness gently into the boosted category
      categoryBuckets[question.category].push(option.score);
    }

    if (option.bottleneckIfLow) {
      bottlenecks.push({
        category: question.category,
        categoryLabel: DIAGNOSTIC_CATEGORY_LABELS[question.category],
        description: option.bottleneckIfLow,
        severity: option.score <= 25 ? 'Alta' : 'Média',
      });
    }

    if (option.serviceBoost) {
      // Lower scores on core pillars or explicit Q7 selection boost the recommendation weight
      const urgencyWeight = question.number === 7 ? 35 : Math.max(10, 100 - option.score);
      servicePriorityBoost[option.serviceBoost] += urgencyWeight;
    }

    detailedAnswers.push({
      questionId: question.id,
      questionNumber: question.number,
      category: question.category,
      questionText: question.title,
      selectedOptionId: option.id,
      answerText: option.label,
      score: option.score,
      bottleneckTag: option.bottleneckIfLow || null,
    });
  }

  const overallScore = answeredCount > 0 ? Math.round(totalRawScore / answeredCount) : 0;

  const categoryScores: Record<DiagnosticCategoryKey, number> = {
    'gestao-de-trafego-pago': 0,
    'sites-e-landing-pages': 0,
    ecommerce: 0,
    'automacoes-e-ia': 0,
    'sistemas-sob-medida': 0,
    'dados-e-analytics': 0,
  };

  for (const cat of ALL_CATEGORIES) {
    const bucket = categoryBuckets[cat];
    categoryScores[cat] =
      bucket.length > 0
        ? Math.round(bucket.reduce((acc, v) => acc + v, 0) / bucket.length)
        : overallScore;
  }

  const categoryDetails: CategoryScoreDetail[] = ALL_CATEGORIES.map((cat) => ({
    category: cat,
    label: DIAGNOSTIC_CATEGORY_LABELS[cat],
    score: categoryScores[cat],
    status: getScoreStatus(categoryScores[cat]),
  }));

  // Ensure at least 2 bottlenecks are highlighted based on lowest scoring categories if user had intermediate answers
  if (bottlenecks.length < 2) {
    const sortedLowest = [...categoryDetails].sort((a, b) => a.score - b.score);
    for (const item of sortedLowest.slice(0, 2)) {
      if (!bottlenecks.some((b) => b.category === item.category) && item.score < 85) {
        bottlenecks.push({
          category: item.category,
          categoryLabel: item.label,
          description: `Oportunidade de evolução técnica em ${item.label} (pontuação atual: ${item.score}/100) para destravar maior eficiência e escala.`,
          severity: item.score < 50 ? 'Alta' : 'Média',
        });
      }
    }
  }

  // Rank services by combination of low pillar score + explicit priority boost
  const rankedCategories = [...ALL_CATEGORIES].sort((a, b) => {
    const needA = (100 - categoryScores[a]) + servicePriorityBoost[a];
    const needB = (100 - categoryScores[b]) + servicePriorityBoost[b];
    return needB - needA;
  });

  const recommendedServices: RecommendedServiceItem[] = rankedCategories
    .slice(0, 3)
    .map((slug, index) => {
      const serviceInfo = RUNA_SERVICES.find((s) => s.slug === slug)!;
      const catScore = categoryScores[slug];

      let reason = `Recomendado para elevar o pilar de ${DIAGNOSTIC_CATEGORY_LABELS[slug]} (atualmente em ${catScore}/100) e gerar impacto direto no crescimento.`;
      if (catScore <= 35) {
        reason = `Gargalo prioritário identificado (${catScore}/100): estruturar ${serviceInfo.title} eliminará perdas imediatas de oportunidades comerciais.`;
      } else if (catScore >= 75) {
        reason = `Pilar com boa base (${catScore}/100) e alto potencial para aceleração e escala com acompanhamento especializado.`;
      }

      return {
        slug,
        title: serviceInfo.title,
        tagline: serviceInfo.tagline,
        reason,
        priority: index === 0 ? 'Prioridade 1' : index === 1 ? 'Prioridade 2' : 'Complementar',
      };
    });

  let maturityLevel: DiagnosticCalculationResult['maturityLevel'] = 'Em Estruturação';
  let maturityDescription = '';

  if (overallScore < 40) {
    maturityLevel = 'Inicial';
    maturityDescription =
      'Sua empresa possui alto potencial reprimido, mas ainda opera sem infraestrutura digital previsível de aquisição, conversão e controle comercial.';
  } else if (overallScore < 65) {
    maturityLevel = 'Em Estruturação';
    maturityDescription =
      'Sua operação já deu passos importantes no digital, porém apresenta gargalos técnicos entre tráfego, páginas, atendimento e controle de dados que limitam o retorno.';
  } else if (overallScore < 85) {
    maturityLevel = 'Em Crescimento';
    maturityDescription =
      'Você conta com uma estrutura comercial e digital funcional. O foco agora é integrar automações, refinar a inteligência de dados e escalar a captação com previsibilidade.';
  } else {
    maturityLevel = 'Alta Performance';
    maturityDescription =
      'Sua empresa apresenta maturidade digital avançada. O próximo nível envolve otimização fina de funil, sistemas sob medida e agentes de IA para ganho de margem.';
  }

  const primaryRecommendation =
    recommendedServices[0]?.title || 'Gestão de Tráfego Pago';

  const summaryDiagnosis = `Índice Geral de Maturidade Digital: ${overallScore}/100 (${maturityLevel}). Principais frentes recomendadas: ${recommendedServices
    .map((s) => s.title)
    .join(', ')}.`;

  return {
    overallScore,
    maturityLevel,
    maturityDescription,
    categoryScores,
    categoryDetails,
    bottlenecks: bottlenecks.slice(0, 4),
    recommendedServices,
    primaryRecommendation,
    summaryDiagnosis,
    detailedAnswers,
  };
}
