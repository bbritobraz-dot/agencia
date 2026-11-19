import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createAdminServiceClient } from '@/lib/supabase/admin';
import { getStageLabel, PipelineStageSlug } from '@/lib/types/crm';
import { normalizePhoneBR } from '@/lib/utils/phone';

/**
 * Entrada dos leads atendidos pelo WhatsApp (agente de atendimento da RUNA).
 *
 * Autenticação: header `Authorization: Bearer <WHATSAPP_SYNC_TOKEN>`.
 * O lead é identificado pelo número de WhatsApp: se já existir, é atualizado;
 * se não, é criado com oportunidade e atividade inicial.
 * Atividades e tarefas trazem um `external_id` para não duplicar em reenvios.
 */

const STAGES: PipelineStageSlug[] = [
  'novo_lead',
  'em_contato',
  'qualificado',
  'proposta_enviada',
  'negociacao',
  'fechado',
  'perdido',
];

const SERVICES: Record<string, { slug: string; name: string }> = {
  trafego: { slug: 'gestao-de-trafego-pago', name: 'Gestão de Tráfego Pago' },
  site: { slug: 'sites-e-landing-pages', name: 'Sites e Landing Pages' },
};

type SyncActivity = { external_id: string; title: string; description: string; at?: string };
type SyncTask = { external_id: string; title: string; due_at: string; notes?: string; done?: boolean };

interface SyncBody {
  whatsapp: string;
  name?: string;
  company?: string;
  email?: string;
  segment?: string;
  website?: string;
  service?: 'trafego' | 'site';
  stage?: PipelineStageSlug;
  notes?: string;
  monthly_value?: number;
  /** Valor total do negócio (projeto fechado), em reais. */
  deal_value?: number;
  activities?: SyncActivity[];
  tasks?: SyncTask[];
}

function authorized(request: NextRequest): boolean {
  const expected = process.env.WHATSAPP_SYNC_TOKEN;
  if (!expected || expected.length < 24) return false;
  const given = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const clip = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SyncBody;
    const whatsapp = normalizePhoneBR(clip(body.whatsapp, 40));
    if (whatsapp.length < 12) {
      return NextResponse.json({ error: 'WhatsApp inválido.' }, { status: 400 });
    }

    const stage = body.stage && STAGES.includes(body.stage) ? body.stage : undefined;
    const service = SERVICES[body.service || 'trafego'] || SERVICES.trafego;
    const name = clip(body.name, 120);
    const company = clip(body.company, 140);
    const email = clip(body.email, 160).toLowerCase();
    const notes = clip(body.notes, 4000);
    const supabase = createAdminServiceClient();

    const { data: existing, error: findError } = await supabase
      .from('leads')
      .select('id, stage_slug')
      .eq('whatsapp', whatsapp)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();
    if (findError) throw new Error(findError.message);

    let leadId: string;
    let created = false;

    if (!existing) {
      const { data: lead, error } = await supabase
        .from('leads')
        .insert({
          name: name.length >= 2 ? name : `Lead WhatsApp ${whatsapp.slice(-4)}`,
          // O CRM exige e-mail; sem e-mail informado, fica um marcador identificável.
          email: email.includes('@') ? email : `${whatsapp}@whatsapp.sem-email`,
          phone: whatsapp,
          whatsapp,
          company: company || 'A confirmar',
          segment: clip(body.segment, 100) || null,
          website: clip(body.website, 200) || null,
          stage_slug: stage || 'novo_lead',
          lead_score: 60,
          maturity_level: 'Atendimento WhatsApp',
          main_opportunities: [`Interesse em ${service.name}`],
          recommended_service: service.name,
          recommended_services: [service.name],
          source: 'WhatsApp (anúncio)',
          utm_source: 'meta',
          utm_medium: 'whatsapp',
          landing_page: 'whatsapp',
          privacy_consent: true,
          internal_notes: notes || null,
          last_contacted_at: new Date().toISOString(),
        })
        .select('id, stage_id')
        .single();
      if (error || !lead) throw new Error(error?.message || 'lead não criado');
      leadId = lead.id;
      created = true;

      await supabase.from('opportunities').insert({
        lead_id: lead.id,
        stage_id: lead.stage_id,
        stage_slug: stage || 'novo_lead',
        title: `${company || name || whatsapp} — ${service.name}`,
        service_slug: service.slug,
        service_name: service.name,
        monthly_recurring_value: body.monthly_value ?? null,
        estimated_value: body.deal_value ?? null,
        probability: 30,
        status: 'open',
      });

      await supabase.from('lead_activities').insert({
        lead_id: lead.id,
        actor_name: 'Atendimento WhatsApp',
        activity_type: 'lead_created',
        channel: 'whatsapp',
        to_stage: stage || 'novo_lead',
        title: 'Lead criado pelo atendimento no WhatsApp',
        description: `Chegou pelo anúncio de ${service.name}.`,
        metadata: { external_id: `created:${whatsapp}` },
      });
    } else {
      leadId = existing.id;
      const update: Record<string, unknown> = { last_contacted_at: new Date().toISOString() };
      if (name.length >= 2) update.name = name;
      if (company) update.company = company;
      if (email.includes('@')) update.email = email;
      if (body.segment) update.segment = clip(body.segment, 100);
      if (body.website) update.website = clip(body.website, 200);
      if (notes) update.internal_notes = notes;
      if (stage && stage !== existing.stage_slug) update.stage_slug = stage;

      // Valor do negócio pode mudar sem mudança de etapa
      if (body.deal_value != null || body.monthly_value != null) {
        await supabase
          .from('opportunities')
          .update({
            ...(body.deal_value != null ? { estimated_value: body.deal_value } : {}),
            ...(body.monthly_value != null ? { monthly_recurring_value: body.monthly_value } : {}),
          })
          .eq('lead_id', leadId);
      }

      const { error } = await supabase.from('leads').update(update).eq('id', leadId);
      if (error) throw new Error(error.message);

      if (update.stage_slug) {
        const won = stage === 'fechado';
        const lost = stage === 'perdido';
        await supabase
          .from('opportunities')
          .update({
            stage_slug: stage,
            status: won ? 'won' : lost ? 'lost' : stage === 'negociacao' ? 'negotiation' : 'open',
            closed_at: won || lost ? new Date().toISOString() : null,
            ...(body.monthly_value != null ? { monthly_recurring_value: body.monthly_value } : {}),
          })
          .eq('lead_id', leadId);

        await supabase.from('lead_activities').insert({
          lead_id: leadId,
          actor_name: 'Atendimento WhatsApp',
          activity_type: 'stage_changed',
          channel: 'whatsapp',
          from_stage: existing.stage_slug,
          to_stage: stage,
          title: `Etapa: ${getStageLabel(existing.stage_slug as PipelineStageSlug)} → ${getStageLabel(stage!)}`,
          description: 'Atualizado pelo atendimento no WhatsApp.',
          metadata: {},
        });
      }
    }

    // Atividades e tarefas, sem duplicar o que já foi enviado.
    const activities = (body.activities || []).slice(0, 50);
    if (activities.length) {
      const { data: seen } = await supabase
        .from('lead_activities')
        .select('metadata')
        .eq('lead_id', leadId);
      const known = new Set((seen || []).map((r) => (r.metadata as { external_id?: string })?.external_id));
      const rows = activities
        .filter((a) => a.external_id && !known.has(a.external_id))
        .map((a) => ({
          lead_id: leadId,
          actor_name: 'Atendimento WhatsApp',
          activity_type: 'contact_logged',
          channel: 'whatsapp',
          title: clip(a.title, 160) || 'Contato no WhatsApp',
          description: clip(a.description, 2000) || '-',
          metadata: { external_id: a.external_id },
          ...(a.at ? { created_at: a.at } : {}),
        }));
      if (rows.length) await supabase.from('lead_activities').insert(rows);
    }

    const tasks = (body.tasks || []).slice(0, 20);
    if (tasks.length) {
      const { data: seenTasks } = await supabase
        .from('follow_up_tasks')
        .select('id, notes')
        .eq('lead_id', leadId);
      for (const t of tasks) {
        if (!t.external_id || !t.due_at) continue;
        const tag = `[${t.external_id}]`;
        const match = (seenTasks || []).find((s) => (s.notes || '').includes(tag));
        const done = Boolean(t.done);
        if (match) {
          await supabase
            .from('follow_up_tasks')
            .update({
              status: done ? 'completed' : 'pending',
              completed_at: done ? new Date().toISOString() : null,
            })
            .eq('id', match.id);
        } else {
          await supabase.from('follow_up_tasks').insert({
            lead_id: leadId,
            title: clip(t.title, 160) || 'Follow-up no WhatsApp',
            notes: `${clip(t.notes, 1000)} ${tag}`.trim(),
            channel: 'whatsapp',
            due_at: t.due_at,
            status: done ? 'completed' : 'pending',
            completed_at: done ? new Date().toISOString() : null,
          });
        }
      }
    }

    return NextResponse.json({ success: true, leadId, created });
  } catch (err: unknown) {
    console.error('[whatsapp-leads] erro:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Falha ao sincronizar o lead.' }, { status: 500 });
  }
}
