import { DiagnosticCategoryKey } from '@/config/diagnosticQuestions';
import { DiagnosticBottleneck, RecommendedServiceItem } from '@/lib/diagnostic/scoringEngine';

export type PipelineStageSlug =
  | 'novo_lead'
  | 'em_contato'
  | 'qualificado'
  | 'proposta_enviada'
  | 'negociacao'
  | 'fechado'
  | 'perdido';

export interface PipelineStageRecord {
  id: string;
  slug: PipelineStageSlug;
  name: string;
  description: string | null;
  display_order: number;
  color: string;
  is_won: boolean;
  is_lost: boolean;
}

export const PIPELINE_STAGES_CATALOG: {
  slug: PipelineStageSlug;
  name: string;
  color: string;
  badgeClass: string;
  order: number;
}[] = [
  {
    slug: 'novo_lead',
    name: 'Novo lead',
    color: '#00616D',
    badgeClass: 'bg-[#00616D]/15 text-[#00616D] border-[#00616D]/30',
    order: 1,
  },
  {
    slug: 'em_contato',
    name: 'Em contato',
    color: '#27594F',
    badgeClass: 'bg-[#27594F]/15 text-[#27594F] border-[#27594F]/30',
    order: 2,
  },
  {
    slug: 'qualificado',
    name: 'Qualificado',
    color: '#D97706',
    badgeClass: 'bg-amber-500/15 text-amber-800 border-amber-500/30',
    order: 3,
  },
  {
    slug: 'proposta_enviada',
    name: 'Proposta enviada',
    color: '#C97F38',
    badgeClass: 'bg-[#C97F38]/15 text-[#9a5c20] border-[#C97F38]/30',
    order: 4,
  },
  {
    slug: 'negociacao',
    name: 'Negociação',
    color: '#7C3AED',
    badgeClass: 'bg-purple-500/15 text-purple-800 border-purple-500/30',
    order: 5,
  },
  {
    slug: 'fechado',
    name: 'Fechado',
    color: '#16A34A',
    badgeClass: 'bg-emerald-500/15 text-emerald-800 border-emerald-500/30',
    order: 6,
  },
  {
    slug: 'perdido',
    name: 'Perdido',
    color: '#DC2626',
    badgeClass: 'bg-red-500/15 text-red-800 border-red-500/30',
    order: 7,
  },
];

export function getStageLabel(slug: PipelineStageSlug | string): string {
  return PIPELINE_STAGES_CATALOG.find((s) => s.slug === slug)?.name || 'Novo lead';
}

export function getStageBadgeClass(slug: PipelineStageSlug | string): string {
  return (
    PIPELINE_STAGES_CATALOG.find((s) => s.slug === slug)?.badgeClass ||
    'bg-[#00616D]/15 text-[#00616D] border-[#00616D]/30'
  );
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  company: string;
  segment: string | null;
  revenue_range: string | null;
  website: string | null;
  stage_id: string | null;
  stage_slug: PipelineStageSlug;
  commercial_status: string;
  lead_score: number;
  maturity_level: string;
  main_opportunities: string[];
  recommended_service: string | null;
  recommended_services: string[];
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_page: string | null;
  privacy_consent: boolean;
  marketing_consent: boolean;
  consented_at: string;
  internal_notes: string | null;
  next_follow_up_at: string | null;
  last_contacted_at: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface DiagnosticSubmissionRecord {
  id: string;
  lead_id: string;
  overall_score: number;
  maturity_level: string;
  category_scores: Record<DiagnosticCategoryKey, number>;
  bottlenecks: DiagnosticBottleneck[];
  recommended_services: RecommendedServiceItem[];
  primary_recommendation: string;
  summary_diagnosis: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  completed_at: string;
  created_at: string;
}

export interface DiagnosticAnswerRecord {
  id: string;
  submission_id: string;
  lead_id: string;
  question_id: string;
  question_number: number;
  category: string;
  question_text: string;
  selected_option_id: string;
  answer_text: string;
  score: number;
  max_score: number;
  bottleneck_tag: string | null;
  created_at: string;
}

export interface OpportunityRecord {
  id: string;
  lead_id: string;
  stage_id: string | null;
  stage_slug: PipelineStageSlug;
  title: string;
  service_slug: string;
  service_name: string;
  estimated_value: number | null;
  monthly_recurring_value: number | null;
  probability: number;
  status: 'open' | 'negotiation' | 'won' | 'lost';
  expected_close_date: string | null;
  closed_at: string | null;
  loss_reason: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadActivityRecord {
  id: string;
  lead_id: string;
  actor_id: string | null;
  actor_name: string;
  activity_type:
    | 'lead_created'
    | 'diagnostic_completed'
    | 'stage_changed'
    | 'note_added'
    | 'contact_logged'
    | 'whatsapp_opened'
    | 'followup_scheduled'
    | 'followup_completed'
    | 'lead_updated'
    | 'opportunity_updated';
  from_stage: string | null;
  to_stage: string | null;
  channel: string | null;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface FollowUpTaskRecord {
  id: string;
  lead_id: string;
  assigned_to: string | null;
  title: string;
  notes: string | null;
  channel: 'whatsapp' | 'call' | 'email' | 'meeting';
  due_at: string;
  completed_at: string | null;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface AdminProfileRecord {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'consultant';
  active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}
