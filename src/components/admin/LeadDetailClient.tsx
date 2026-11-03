'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MessageCircle,
  Save,
  CalendarClock,
  CheckCircle2,
  Plus,
  History,
  FileText,
  PhoneCall,
  BarChart3,
  Globe,
  Loader2,
} from 'lucide-react';
import {
  DiagnosticAnswerRecord,
  DiagnosticSubmissionRecord,
  FollowUpTaskRecord,
  getStageBadgeClass,
  getStageLabel,
  LeadActivityRecord,
  LeadRecord,
  PIPELINE_STAGES_CATALOG,
  PipelineStageSlug,
} from '@/lib/types/crm';
import { DIAGNOSTIC_CATEGORY_LABELS } from '@/config/diagnosticQuestions';
import { RUNA_SERVICES } from '@/config/services';
import { createClient } from '@/lib/supabase/client';
import { buildLeadWhatsAppUrl, normalizePhoneBR } from '@/lib/utils/phone';

export function LeadDetailClient({
  initialLead,
  submission,
  answers,
  initialActivities,
  initialFollowUps,
  adminName,
}: {
  initialLead: LeadRecord;
  submission: DiagnosticSubmissionRecord | null;
  answers: DiagnosticAnswerRecord[];
  initialActivities: LeadActivityRecord[];
  initialFollowUps: FollowUpTaskRecord[];
  adminName: string;
}) {
  const router = useRouter();
  const [lead, setLead] = useState<LeadRecord>(initialLead);
  const [activities, setActivities] =
    useState<LeadActivityRecord[]>(initialActivities);
  const [followUps, setFollowUps] =
    useState<FollowUpTaskRecord[]>(initialFollowUps);

  // Estado de edição dos dados cadastrais e notas internas
  const [editName, setEditName] = useState(lead.name);
  const [editEmail, setEditEmail] = useState(lead.email);
  const [editWhatsapp, setEditWhatsapp] = useState(lead.whatsapp);
  const [editCompany, setEditCompany] = useState(lead.company);
  const [editSegment, setEditSegment] = useState(lead.segment || '');
  const [editRevenue, setEditRevenue] = useState(lead.revenue_range || '');
  const [editService, setEditService] = useState(
    lead.recommended_service || RUNA_SERVICES[0].title
  );
  const [editNotes, setEditNotes] = useState(lead.internal_notes || '');
  const [savingInfo, setSavingInfo] = useState(false);

  // Estado de Registro de Contato / Nota rápida
  const [contactChannel, setContactChannel] = useState<
    'whatsapp' | 'call' | 'email' | 'meeting' | 'note'
  >('whatsapp');
  const [contactSummary, setContactSummary] = useState('');
  const [loggingContact, setLoggingContact] = useState(false);

  // Estado de Novo Follow-up
  const [followTitle, setFollowTitle] = useState('');
  const [followChannel, setFollowChannel] = useState<
    'whatsapp' | 'call' | 'email' | 'meeting'
  >('whatsapp');
  const [followDueDate, setFollowDueDate] = useState('');
  const [followNotes, setFollowNotes] = useState('');
  const [schedulingFollow, setSchedulingFollow] = useState(false);

  const handleStageChange = async (newStage: PipelineStageSlug) => {
    if (newStage === lead.stage_slug) return;
    const prevStage = lead.stage_slug;
    const nextLabel = getStageLabel(newStage);

    try {
      const response = await fetch('/api/admin/leads/stage-transition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          targetStage: newStage,
        }),
      });

      const resJson = await response.json();
      if (!response.ok || !resJson.success) {
        alert(resJson.error || 'Erro ao atualizar estágio do lead.');
        return;
      }

      setLead((prev) => ({
        ...prev,
        stage_slug: newStage,
        commercial_status: nextLabel,
      }));

      router.refresh();
    } catch {
      alert('Falha na comunicação ao atualizar etapa.');
    }
  };

  const handleSaveLeadInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingInfo(true);
    try {
      const supabase = createClient();
      const normalizedWa = normalizePhoneBR(editWhatsapp);

      const { data: updated } = await supabase
        .from('leads')
        .update({
          name: editName.trim(),
          email: editEmail.trim().toLowerCase(),
          whatsapp: normalizedWa,
          phone: normalizedWa,
          company: editCompany.trim(),
          segment: editSegment.trim() || null,
          revenue_range: editRevenue.trim() || null,
          recommended_service: editService,
          internal_notes: editNotes.trim() || null,
        })
        .eq('id', lead.id)
        .select('*')
        .single();

      if (updated) {
        setLead(updated as LeadRecord);
      }

      const { data: act } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          actor_name: adminName,
          activity_type: 'lead_updated',
          title: 'Informações e notas internas atualizadas',
          description: `Dados cadastrais e notas revisados por ${adminName}.`,
        })
        .select('*')
        .single();

      if (act) {
        setActivities((prev) => [act as LeadActivityRecord, ...prev]);
      }
      router.refresh();
    } finally {
      setSavingInfo(false);
    }
  };

  const handleLogContactOrNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactSummary.trim()) return;
    setLoggingContact(true);

    try {
      const supabase = createClient();
      const isNote = contactChannel === 'note';
      const nowIso = new Date().toISOString();

      const { data: act } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          actor_name: adminName,
          activity_type: isNote ? 'note_added' : 'contact_logged',
          channel: isNote ? null : contactChannel,
          title: isNote
            ? 'Nota interna adicionada'
            : `Contato registrado (${contactChannel.toUpperCase()})`,
          description: contactSummary.trim(),
        })
        .select('*')
        .single();

      if (!isNote) {
        await supabase
          .from('leads')
          .update({ last_contacted_at: nowIso })
          .eq('id', lead.id);
      }

      if (act) {
        setActivities((prev) => [act as LeadActivityRecord, ...prev]);
      }
      setContactSummary('');
      router.refresh();
    } finally {
      setLoggingContact(false);
    }
  };

  const handleScheduleFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followTitle.trim() || !followDueDate) return;
    setSchedulingFollow(true);

    try {
      const supabase = createClient();
      const dueIso = new Date(followDueDate).toISOString();

      const { data: createdTask } = await supabase
        .from('follow_up_tasks')
        .insert({
          lead_id: lead.id,
          title: followTitle.trim(),
          notes: followNotes.trim() || null,
          channel: followChannel,
          due_at: dueIso,
          status: 'pending',
        })
        .select('*')
        .single();

      await supabase
        .from('leads')
        .update({ next_follow_up_at: dueIso })
        .eq('id', lead.id);

      const { data: act } = await supabase
        .from('lead_activities')
        .insert({
          lead_id: lead.id,
          actor_name: adminName,
          activity_type: 'followup_scheduled',
          channel: followChannel,
          title: `Follow-up agendado: ${followTitle.trim()}`,
          description: `Data programada: ${new Date(dueIso).toLocaleString(
            'pt-BR'
          )} via ${followChannel.toUpperCase()}.`,
        })
        .select('*')
        .single();

      if (createdTask) {
        setFollowUps((prev) => [createdTask as FollowUpTaskRecord, ...prev]);
      }
      if (act) {
        setActivities((prev) => [act as LeadActivityRecord, ...prev]);
      }
      setLead((prev) => ({ ...prev, next_follow_up_at: dueIso }));
      setFollowTitle('');
      setFollowDueDate('');
      setFollowNotes('');
      router.refresh();
    } finally {
      setSchedulingFollow(false);
    }
  };

  const handleCompleteFollowUp = async (task: FollowUpTaskRecord) => {
    const supabase = createClient();
    const nowIso = new Date().toISOString();

    await supabase
      .from('follow_up_tasks')
      .update({ status: 'completed', completed_at: nowIso })
      .eq('id', task.id);

    const { data: act } = await supabase
      .from('lead_activities')
      .insert({
        lead_id: lead.id,
        actor_name: adminName,
        activity_type: 'followup_completed',
        channel: task.channel,
        title: `Follow-up concluído: ${task.title}`,
        description: `Tarefa de follow-up marcada como concluída por ${adminName}.`,
      })
      .select('*')
      .single();

    setFollowUps((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, status: 'completed', completed_at: nowIso }
          : t
      )
    );
    if (act) {
      setActivities((prev) => [act as LeadActivityRecord, ...prev]);
    }
  };

  const handleOpenWhatsApp = async () => {
    const supabase = createClient();
    const { data: act } = await supabase
      .from('lead_activities')
      .insert({
        lead_id: lead.id,
        actor_name: adminName,
        activity_type: 'whatsapp_opened',
        channel: 'whatsapp',
        title: 'Conversa aberta no WhatsApp',
        description: `Atendimento via WhatsApp iniciado na ficha do lead por ${adminName}.`,
      })
      .select('*')
      .single();

    if (act) {
      setActivities((prev) => [act as LeadActivityRecord, ...prev]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Barra Superior */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4c524b] hover:text-[#1c1c10]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar para Gestão de Leads
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl text-[#1c1c10]">
              {lead.company}
            </h1>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${getStageBadgeClass(
                lead.stage_slug
              )}`}
            >
              {getStageLabel(lead.stage_slug)}
            </span>
          </div>
          <p className="text-xs text-[#4c524b]">
            Cadastrado em {new Date(lead.created_at).toLocaleString('pt-BR')} ·
            Origem: <strong>{lead.source}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={lead.stage_slug}
            onChange={(e) =>
              handleStageChange(e.target.value as PipelineStageSlug)
            }
            className="rounded-xl border border-[#27594F] bg-[#fcfae5] px-4 py-2.5 text-xs font-bold text-[#1c1c10]"
          >
            {PIPELINE_STAGES_CATALOG.map((st) => (
              <option key={st.slug} value={st.slug}>
                Etapa: {st.name}
              </option>
            ))}
          </select>

          <a
            href={buildLeadWhatsAppUrl({
              whatsapp: lead.whatsapp,
              leadName: lead.name,
              companyName: lead.company,
              recommendedService: lead.recommended_service,
              overallScore: lead.lead_score,
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenWhatsApp}
            className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1ebe5a]"
          >
            <MessageCircle className="h-4 w-4" />
            Abrir Conversa no WhatsApp
          </a>
        </div>
      </div>

      {/* Resumo de Score, Serviço Recomendado, Oportunidades e UTMs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-3xl bg-[#13302a] p-6 text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C97F38]">
              Pontuação e Classificação
            </span>
            <BarChart3 className="h-4 w-4 text-[#C97F38]" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl text-[#C97F38]">
              {lead.lead_score}
            </span>
            <span className="text-sm text-[#C1C0AC]">/ 100 pontos</span>
          </div>
          <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold">
            Classificação: {lead.maturity_level}
          </div>
          <div className="border-t border-white/15 pt-3">
            <div className="text-[11px] uppercase tracking-wider text-[#C1C0AC]">
              Serviço Recomendado Principal
            </div>
            <div className="text-base font-bold text-white mt-0.5">
              {lead.recommended_service || 'Gestão de Tráfego Pago'}
            </div>
          </div>
          {lead.next_follow_up_at && (
            <div className="rounded-xl bg-[#C97F38]/20 border border-[#C97F38]/40 p-3 text-xs">
              <strong className="text-[#C97F38] block">
                Próximo Follow-up:
              </strong>
              <span>
                {new Date(lead.next_follow_up_at).toLocaleString('pt-BR')}
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-3">
          <h2 className="font-display text-xl text-[#1c1c10]">
            Principais Oportunidades e Gargalos
          </h2>
          {lead.main_opportunities && lead.main_opportunities.length > 0 ? (
            <ul className="space-y-2 text-xs text-[#1c1c10]">
              {lead.main_opportunities.map((opp, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-[#d8d7cf] bg-white p-3 leading-relaxed"
                >
                  • {opp}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#4c524b]">
              Nenhuma oportunidade específica listada.
            </p>
          )}
        </div>

        <div className="lg:col-span-4 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#00616D]" />
            <h2 className="font-display text-xl text-[#1c1c10]">
              Origem, UTMs e Consentimento
            </h2>
          </div>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-white p-2.5 border border-[#d8d7cf]">
              <dt className="text-[10px] uppercase text-[#4c524b]">Origem</dt>
              <dd className="font-semibold text-[#1c1c10] truncate">
                {lead.source}
              </dd>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-[#d8d7cf]">
              <dt className="text-[10px] uppercase text-[#4c524b]">
                utm_source
              </dt>
              <dd className="font-semibold text-[#1c1c10] truncate">
                {lead.utm_source || '—'}
              </dd>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-[#d8d7cf]">
              <dt className="text-[10px] uppercase text-[#4c524b]">
                utm_medium
              </dt>
              <dd className="font-semibold text-[#1c1c10] truncate">
                {lead.utm_medium || '—'}
              </dd>
            </div>
            <div className="rounded-lg bg-white p-2.5 border border-[#d8d7cf]">
              <dt className="text-[10px] uppercase text-[#4c524b]">
                utm_campaign
              </dt>
              <dd className="font-semibold text-[#1c1c10] truncate">
                {lead.utm_campaign || '—'}
              </dd>
            </div>
          </dl>
          <div className="text-[11px] text-[#4c524b] pt-1">
            Página de entrada: <code>{lead.landing_page || '/'}</code> ·
            Marketing Opt-in:{' '}
            <strong>{lead.marketing_consent ? 'Sim' : 'Não'}</strong>
          </div>
        </div>
      </div>

      {/* Edição de Informações + Respostas do Diagnóstico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formulário de Edição de Dados e Notas Internas */}
        <form
          onSubmit={handleSaveLeadInfo}
          className="lg:col-span-5 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-[#1c1c10]">
              Dados de Contato e Empresa
            </h2>
            <FileText className="h-4 w-4 text-[#27594F]" />
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold uppercase text-[#4c524b] mb-1">
                Nome do Contato
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  WhatsApp
                </label>
                <input
                  type="text"
                  value={editWhatsapp}
                  onChange={(e) => setEditWhatsapp(e.target.value)}
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  value={editCompany}
                  onChange={(e) => setEditCompany(e.target.value)}
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Segmento
                </label>
                <input
                  type="text"
                  value={editSegment}
                  onChange={(e) => setEditSegment(e.target.value)}
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Faixa de Faturamento
                </label>
                <input
                  type="text"
                  value={editRevenue}
                  onChange={(e) => setEditRevenue(e.target.value)}
                  placeholder="Não informada"
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Serviço Recomendado
                </label>
                <select
                  value={editService}
                  onChange={(e) => setEditService(e.target.value)}
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                >
                  {RUNA_SERVICES.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#4c524b] mb-1">
                Notas Internas Fixas
              </label>
              <textarea
                rows={4}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Anotações estratégicas sobre este lead..."
                className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
              />
            </div>

            <button
              type="submit"
              disabled={savingInfo}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#27594F] px-4 py-3 text-xs font-semibold text-white hover:bg-[#1e4840]"
            >
              {savingInfo ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando alterações...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Dados e Notas Internas
                </>
              )}
            </button>
          </div>
        </form>

        {/* Respostas do Diagnóstico */}
        <div className="lg:col-span-7 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-[#1c1c10]">
              Respostas do Diagnóstico Digital
            </h2>
            {submission && (
              <span className="rounded-lg bg-[#27594F]/15 px-3 py-1 text-xs font-bold text-[#27594F]">
                Score Geral: {submission.overall_score}/100
              </span>
            )}
          </div>

          {submission && submission.category_scores && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Object.entries(submission.category_scores).map(([cat, val]) => (
                <div
                  key={cat}
                  className="rounded-xl border border-[#d8d7cf] bg-white p-3 text-xs"
                >
                  <div className="text-[11px] text-[#4c524b] truncate">
                    {DIAGNOSTIC_CATEGORY_LABELS[
                      cat as keyof typeof DIAGNOSTIC_CATEGORY_LABELS
                    ] || cat}
                  </div>
                  <div className="font-mono text-sm font-bold text-[#27594F] mt-0.5">
                    {val}/100
                  </div>
                </div>
              ))}
            </div>
          )}

          {answers.length === 0 ? (
            <p className="text-xs text-[#4c524b] py-8 text-center">
              Este lead foi originado via formulário comercial ou cadastro manual e não possui submissão de quiz vinculada.
            </p>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {answers.map((ans) => (
                <div
                  key={ans.id}
                  className="rounded-2xl border border-[#d8d7cf] bg-white p-4 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#27594F]">
                    <span>Pergunta 0{ans.question_number}</span>
                    <span className="font-mono text-[#C97F38]">
                      {ans.score}/100 pts
                    </span>
                  </div>
                  <div className="font-bold text-[#1c1c10]">
                    {ans.question_text}
                  </div>
                  <div className="text-[#4c524b] pt-1">
                    Resposta selecionada:{' '}
                    <strong className="text-[#1c1c10]">{ans.answer_text}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agendamento de Follow-ups + Registro de Contatos + Histórico de Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agendamento de Follow-up e Registro de Contato */}
        <div className="lg:col-span-5 space-y-6">
          {/* Agendar Follow-up */}
          <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-[#C97F38]" />
              <h2 className="font-display text-xl text-[#1c1c10]">
                Agendar Próximo Follow-up
              </h2>
            </div>

            <form onSubmit={handleScheduleFollowUp} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Objetivo do Follow-up *
                </label>
                <input
                  type="text"
                  required
                  value={followTitle}
                  onChange={(e) => setFollowTitle(e.target.value)}
                  placeholder="Ex.: Apresentar diagnóstico e proposta"
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-[#4c524b] mb-1">
                    Canal
                  </label>
                  <select
                    value={followChannel}
                    onChange={(e) =>
                      setFollowChannel(
                        e.target.value as 'whatsapp' | 'call' | 'email' | 'meeting'
                      )
                    }
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call">Ligação</option>
                    <option value="meeting">Reunião</option>
                    <option value="email">E-mail</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#4c524b] mb-1">
                    Data e Hora *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={followDueDate}
                    onChange={(e) => setFollowDueDate(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Observações
                </label>
                <input
                  type="text"
                  value={followNotes}
                  onChange={(e) => setFollowNotes(e.target.value)}
                  placeholder="Pauta ou lembrete rápido..."
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>

              <button
                type="submit"
                disabled={schedulingFollow}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#b06b29]"
              >
                <Plus className="h-4 w-4" />
                Agendar Follow-up
              </button>
            </form>

            {/* Lista de tarefas de follow-up */}
            {followUps.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-[#d8d7cf]">
                {followUps.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-[#d8d7cf] bg-white p-3 text-xs"
                  >
                    <div>
                      <div
                        className={`font-bold ${
                          task.status === 'completed'
                            ? 'line-through text-[#4c524b]'
                            : 'text-[#1c1c10]'
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[11px] text-[#4c524b]">
                        {new Date(task.due_at).toLocaleString('pt-BR')} ·{' '}
                        {task.channel.toUpperCase()}
                      </div>
                    </div>

                    {task.status === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => handleCompleteFollowUp(task)}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Concluir
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700">
                        Concluído
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Registrar Contato ou Nota Rápida */}
          <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-[#27594F]" />
              <h2 className="font-display text-xl text-[#1c1c10]">
                Registrar Contato ou Nota
              </h2>
            </div>

            <form onSubmit={handleLogContactOrNote} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Tipo de Registro
                </label>
                <select
                  value={contactChannel}
                  onChange={(e) =>
                    setContactChannel(
                      e.target.value as
                        | 'whatsapp'
                        | 'call'
                        | 'email'
                        | 'meeting'
                        | 'note'
                    )
                  }
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                >
                  <option value="whatsapp">Contato via WhatsApp</option>
                  <option value="call">Ligação Telefônica</option>
                  <option value="meeting">Reunião Realizada</option>
                  <option value="email">E-mail Enviado</option>
                  <option value="note">Nota Interna no Histórico</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#4c524b] mb-1">
                  Resumo da Interação *
                </label>
                <textarea
                  rows={3}
                  required
                  value={contactSummary}
                  onChange={(e) => setContactSummary(e.target.value)}
                  placeholder="Descreva o que foi conversado com o cliente..."
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5"
                />
              </div>

              <button
                type="submit"
                disabled={loggingContact}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#27594F] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1e4840]"
              >
                Registrar no Histórico
              </button>
            </form>
          </div>
        </div>

        {/* Histórico Cronológico de Atividades */}
        <div className="lg:col-span-7 rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-5">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-[#27594F]" />
            <h2 className="font-display text-xl text-[#1c1c10]">
              Histórico Completo de Atividades ({activities.length})
            </h2>
          </div>

          {activities.length === 0 ? (
            <p className="text-xs text-[#4c524b] py-8 text-center">
              Nenhuma atividade registrada para este lead.
            </p>
          ) : (
            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="rounded-2xl border border-[#d8d7cf] bg-white p-4 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#4c524b]">
                    <span className="font-bold text-[#27594F]">
                      {act.actor_name}
                    </span>
                    <span>
                      {new Date(act.created_at).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="font-bold text-[#1c1c10] text-sm">
                    {act.title}
                  </div>
                  <p className="text-[#4c524b] leading-relaxed">
                    {act.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
