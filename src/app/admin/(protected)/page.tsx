import Link from 'next/link';
import {
  Users,
  Sparkles,
  CheckCircle2,
  Handshake,
  Trophy,
  ArrowRight,
  CalendarClock,
  BarChart3,
  Globe,
  Layers,
} from 'lucide-react';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  FollowUpTaskRecord,
  LeadRecord,
  PIPELINE_STAGES_CATALOG,
} from '@/lib/types/crm';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient();

  const [{ data: leadsData }, { data: followUpsData }] = await Promise.all([
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('follow_up_tasks')
      .select('*, leads(name, company)')
      .eq('status', 'pending')
      .order('due_at', { ascending: true })
      .limit(6),
  ]);

  const leads = (leadsData || []) as LeadRecord[];
  const pendingFollowUps = (followUpsData || []) as (FollowUpTaskRecord & {
    leads?: { name: string; company: string } | null;
  })[];

  // 1. Indicadores Principais
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.stage_slug === 'novo_lead').length;
  const qualifiedLeads = leads.filter(
    (l) =>
      l.stage_slug === 'qualificado' ||
      l.stage_slug === 'proposta_enviada' ||
      l.stage_slug === 'negociacao' ||
      l.stage_slug === 'fechado'
  ).length;
  const negotiatingLeads = leads.filter(
    (l) => l.stage_slug === 'proposta_enviada' || l.stage_slug === 'negociacao'
  ).length;
  const convertedLeads = leads.filter((l) => l.stage_slug === 'fechado').length;

  // 2. Taxa de Conversão por Etapa
  const stageCounts = PIPELINE_STAGES_CATALOG.map((stage) => {
    const count = leads.filter((l) => l.stage_slug === stage.slug).length;
    const rate = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
    return {
      ...stage,
      count,
      rate,
    };
  });

  // 3. Origem dos Leads (source + utm_source)
  const sourceMap = new Map<string, number>();
  for (const lead of leads) {
    const label = lead.utm_source
      ? `${lead.source} (${lead.utm_source})`
      : lead.source || 'Direto';
    sourceMap.set(label, (sourceMap.get(label) || 0) + 1);
  }
  const leadSources = Array.from(sourceMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      share: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // 4. Serviços Mais Procurados / Recomendados
  const serviceMap = new Map<string, number>();
  for (const lead of leads) {
    const svc = lead.recommended_service || 'Não especificado';
    serviceMap.set(svc, (serviceMap.get(svc) || 0) + 1);
  }
  const topServices = Array.from(serviceMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      share: totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C97F38]">
            Visão Geral Operacional
          </span>
          <h1 className="font-display text-3xl text-[#1c1c10]">
            Dashboard Comercial RUNA
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 rounded-xl bg-[#27594F] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1e4840]"
          >
            Gerenciar Leads
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/admin/pipeline"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#b06b29]"
          >
            Abrir Funil Kanban
          </Link>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4c524b]">
            <span>Total de Leads</span>
            <Users className="h-4 w-4 text-[#27594F]" />
          </div>
          <div className="mt-2 font-display text-3xl text-[#1c1c10]">
            {totalLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#4c524b]">
            Base ativa no Supabase
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4c524b]">
            <span>Novos Leads</span>
            <Sparkles className="h-4 w-4 text-[#00616D]" />
          </div>
          <div className="mt-2 font-display text-3xl text-[#00616D]">
            {newLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#4c524b]">
            Aguardando primeiro contato
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4c524b]">
            <span>Leads Qualificados</span>
            <CheckCircle2 className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2 font-display text-3xl text-amber-700">
            {qualifiedLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#4c524b]">
            Qualificados ou avançados
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4c524b]">
            <span>Em Negociação</span>
            <Handshake className="h-4 w-4 text-[#C97F38]" />
          </div>
          <div className="mt-2 font-display text-3xl text-[#C97F38]">
            {negotiatingLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#4c524b]">
            Proposta enviada ou negociação
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4c524b]">
            <span>Leads Convertidos</span>
            <Trophy className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2 font-display text-3xl text-emerald-700">
            {convertedLeads}
          </div>
          <div className="mt-1 text-[11px] text-[#4c524b]">
            Taxa global:{' '}
            {totalLeads > 0 ? `${Math.round((convertedLeads / totalLeads) * 100)}%` : '0%'}
          </div>
        </div>
      </div>

      {/* Taxa de Conversão por Etapa + Serviços Mais Procurados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#27594F]" />
              <h2 className="font-display text-xl text-[#1c1c10]">
                Distribuição e Taxa por Etapa do Funil
              </h2>
            </div>
            <Link
              href="/admin/pipeline"
              className="text-xs font-semibold text-[#C97F38] hover:underline"
            >
              Ver Kanban →
            </Link>
          </div>

          <div className="space-y-3">
            {stageCounts.map((stage) => (
              <div key={stage.slug} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1c1c10]">
                    {stage.name}
                  </span>
                  <span className="font-mono text-[#4c524b]">
                    {stage.count} lead(s) · {stage.rate}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E8E7DF]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.max(stage.rate, stage.count > 0 ? 6 : 0)}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Serviços mais procurados */}
        <div className="lg:col-span-5 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-[#C97F38]" />
            <h2 className="font-display text-xl text-[#1c1c10]">
              Serviços Mais Procurados
            </h2>
          </div>

          {topServices.length === 0 ? (
            <p className="text-xs text-[#4c524b] py-6 text-center">
              Nenhum lead registrado ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {topServices.map((svc) => (
                <div
                  key={svc.name}
                  className="rounded-xl border border-[#d8d7cf] bg-white p-3.5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-[#1c1c10]">
                      {svc.name}
                    </div>
                    <div className="text-[11px] text-[#4c524b]">
                      {svc.share}% das demandas
                    </div>
                  </div>
                  <span className="rounded-lg bg-[#27594F]/15 px-2.5 py-1 font-mono text-xs font-bold text-[#27594F]">
                    {svc.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Origem dos Leads + Follow-ups Pendentes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#00616D]" />
            <h2 className="font-display text-xl text-[#1c1c10]">
              Origem dos Leads e Atribuição
            </h2>
          </div>

          {leadSources.length === 0 ? (
            <p className="text-xs text-[#4c524b] py-6 text-center">
              Nenhuma origem capturada até o momento.
            </p>
          ) : (
            <div className="space-y-2.5">
              {leadSources.map((src) => (
                <div
                  key={src.name}
                  className="flex items-center justify-between rounded-xl border border-[#d8d7cf] bg-white px-4 py-3 text-xs"
                >
                  <span className="font-semibold text-[#1c1c10]">{src.name}</span>
                  <span className="font-mono text-[#4c524b]">
                    {src.count} ({src.share}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-[#C97F38]" />
              <h2 className="font-display text-xl text-[#1c1c10]">
                Próximos Follow-ups Agendados
              </h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#27594F] hover:underline"
            >
              Ver todos os leads →
            </Link>
          </div>

          {pendingFollowUps.length === 0 ? (
            <p className="text-xs text-[#4c524b] py-6 text-center">
              Nenhum follow-up pendente agendado.
            </p>
          ) : (
            <div className="space-y-2.5">
              {pendingFollowUps.map((task) => (
                <Link
                  key={task.id}
                  href={`/admin/leads/${task.lead_id}`}
                  className="block rounded-xl border border-[#d8d7cf] bg-white p-3.5 hover:border-[#C97F38] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1c1c10]">{task.title}</span>
                    <span className="rounded bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                      {new Date(task.due_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-[#4c524b]">
                    {task.leads?.company} · {task.leads?.name} · Canal:{' '}
                    <span className="uppercase">{task.channel}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
