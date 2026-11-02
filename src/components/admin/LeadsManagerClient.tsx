'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';
import {
  Search,
  Plus,
  Download,
  MessageCircle,
  Eye,
  X,
  Loader2,
  Filter,
} from 'lucide-react';
import {
  getStageBadgeClass,
  getStageLabel,
  LeadRecord,
  PIPELINE_STAGES_CATALOG,
  PipelineStageSlug,
} from '@/lib/types/crm';
import { RUNA_SERVICES } from '@/config/services';
import { BUSINESS_SEGMENTS, REVENUE_RANGES } from '@/config/diagnosticQuestions';
import { createClient } from '@/lib/supabase/client';
import {
  buildLeadWhatsAppUrl,
  formatPhoneDisplay,
  normalizePhoneBR,
} from '@/lib/utils/phone';

export function LeadsManagerClient({
  initialLeads,
  adminName,
}: {
  initialLeads: LeadRecord[];
  adminName: string;
}) {
  const router = useRouter();
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);

  // Filtros
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');

  // Modal de Cadastro Manual
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSegment, setNewSegment] = useState('');
  const [newRevenueRange, setNewRevenueRange] = useState('');
  const [newService, setNewService] = useState(RUNA_SERVICES[0].title);
  const [newStage, setNewStage] = useState<PipelineStageSlug>('novo_lead');
  const [newSource, setNewSource] = useState('Cadastro Manual CRM');
  const [newNotes, setNewNotes] = useState('');

  const uniqueSources = useMemo(() => {
    const s = new Set<string>();
    leads.forEach((l) => {
      if (l.source) s.add(l.source);
    });
    return Array.from(s);
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (stageFilter !== 'ALL' && lead.stage_slug !== stageFilter) return false;
      if (
        serviceFilter !== 'ALL' &&
        lead.recommended_service !== serviceFilter
      ) {
        return false;
      }
      if (sourceFilter !== 'ALL' && lead.source !== sourceFilter) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          lead.name.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.whatsapp.toLowerCase().includes(q) ||
          (lead.segment || '').toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [leads, search, stageFilter, serviceFilter, sourceFilter]);

  const handleExportCSV = () => {
    const rows = filteredLeads.map((l) => ({
      ID: l.id,
      Nome: l.name,
      Empresa: l.company,
      Email: l.email,
      WhatsApp: l.whatsapp,
      Segmento: l.segment || '',
      Faixa_Faturamento: l.revenue_range || '',
      Etapa_Funil: getStageLabel(l.stage_slug),
      Pontuacao: l.lead_score,
      Classificacao: l.maturity_level,
      Servico_Recomendado: l.recommended_service || '',
      Origem: l.source,
      UTM_Source: l.utm_source || '',
      UTM_Medium: l.utm_medium || '',
      UTM_Campaign: l.utm_campaign || '',
      Proximo_FollowUp: l.next_follow_up_at || '',
      Data_Cadastro: new Date(l.created_at).toLocaleString('pt-BR'),
    }));

    const csv = Papa.unparse(rows, { delimiter: ';' });
    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_runa_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenWhatsApp = async (lead: LeadRecord) => {
    const supabase = createClient();
    await supabase.from('lead_activities').insert({
      lead_id: lead.id,
      actor_name: adminName,
      activity_type: 'whatsapp_opened',
      channel: 'whatsapp',
      title: 'Conversa iniciada no WhatsApp',
      description: `Botão de WhatsApp acionado na lista de leads por ${adminName}.`,
    });
    await supabase
      .from('leads')
      .update({ last_contacted_at: new Date().toISOString() })
      .eq('id', lead.id);
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);

    try {
      const supabase = createClient();
      const normalizedWa = normalizePhoneBR(newWhatsapp);

      const { data: insertedLead, error } = await supabase
        .from('leads')
        .insert({
          name: newName.trim(),
          email: newEmail.trim().toLowerCase(),
          phone: normalizedWa,
          whatsapp: normalizedWa,
          company: newCompany.trim(),
          segment: newSegment || null,
          revenue_range: newRevenueRange || null,
          stage_slug: newStage,
          commercial_status: getStageLabel(newStage),
          lead_score: 70,
          maturity_level: 'Cadastro Comercial',
          recommended_service: newService,
          recommended_services: [newService],
          main_opportunities: newNotes ? [newNotes] : [],
          source: newSource.trim() || 'Cadastro Manual CRM',
          internal_notes: newNotes || null,
          privacy_consent: true,
        })
        .select('*')
        .single();

      if (error || !insertedLead) {
        setCreateError(error?.message || 'Erro ao cadastrar lead.');
        setCreating(false);
        return;
      }

      const matchedSvc =
        RUNA_SERVICES.find((s) => s.title === newService) || RUNA_SERVICES[0];

      await supabase.from('opportunities').insert({
        lead_id: insertedLead.id,
        stage_id: insertedLead.stage_id,
        stage_slug: newStage,
        title: `${newCompany.trim()} — ${matchedSvc.title}`,
        service_slug: matchedSvc.slug,
        service_name: matchedSvc.title,
        probability: 30,
        status: 'open',
      });

      await supabase.from('lead_activities').insert({
        lead_id: insertedLead.id,
        actor_name: adminName,
        activity_type: 'lead_created',
        to_stage: newStage,
        title: 'Lead cadastrado manualmente no CRM',
        description: `Lead registrado por ${adminName} com foco em ${newService}.`,
      });

      setLeads((prev) => [insertedLead as LeadRecord, ...prev]);
      setCreateOpen(false);
      setNewName('');
      setNewEmail('');
      setNewWhatsapp('');
      setNewCompany('');
      setNewSegment('');
      setNewRevenueRange('');
      setNewNotes('');
      router.refresh();
    } catch {
      setCreateError('Falha ao salvar lead no Supabase.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C97F38]">
            Base Comercial
          </span>
          <h1 className="font-display text-3xl text-[#1c1c10]">
            Gestão de Leads ({filteredLeads.length})
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-[#27594F] bg-[#fcfae5] px-4 py-2.5 text-xs font-semibold text-[#27594F] hover:bg-[#27594F] hover:text-white transition-colors"
          >
            <Download className="h-4 w-4" />
            Exportar CSV
          </button>

          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#b06b29] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Cadastrar Lead Manual
          </button>
        </div>
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#27594F]">
          <Filter className="h-3.5 w-3.5" />
          Pesquisa e Filtros Combinados
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-[#4c524b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar nome, empresa, e-mail, tel..."
              className="w-full rounded-xl border border-[#d8d7cf] bg-white pl-9 pr-3 py-2.5 text-xs text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
            />
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3 py-2.5 text-xs text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
          >
            <option value="ALL">Todas as etapas do funil</option>
            {PIPELINE_STAGES_CATALOG.map((st) => (
              <option key={st.slug} value={st.slug}>
                {st.name}
              </option>
            ))}
          </select>

          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3 py-2.5 text-xs text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
          >
            <option value="ALL">Todos os serviços recomendados</option>
            {RUNA_SERVICES.map((svc) => (
              <option key={svc.id} value={svc.title}>
                {svc.title}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3 py-2.5 text-xs text-[#1c1c10] focus:border-[#27594F] focus:outline-none"
          >
            <option value="ALL">Todas as origens</option>
            {uniqueSources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="overflow-hidden rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/70 text-[11px] font-bold uppercase tracking-wider text-[#4c524b]">
                <th className="py-3.5 px-4">Empresa & Contato</th>
                <th className="py-3.5 px-4">Segmento / Faturamento</th>
                <th className="py-3.5 px-4">Score & Serviço Recomendado</th>
                <th className="py-3.5 px-4">Etapa Comercial</th>
                <th className="py-3.5 px-4">Origem / Data</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8d7cf] text-xs">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#4c524b]">
                    Nenhum lead encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-[#E8E7DF]/40 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="font-bold text-sm text-[#1c1c10] hover:text-[#27594F]"
                      >
                        {lead.company}
                      </Link>
                      <div className="text-[#4c524b] mt-0.5">
                        {lead.name} · {formatPhoneDisplay(lead.whatsapp)}
                      </div>
                      <div className="text-[11px] text-[#4c524b]/80">
                        {lead.email}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-[#1c1c10]">
                        {lead.segment || 'Não informado'}
                      </div>
                      {lead.revenue_range && (
                        <div className="text-[11px] text-[#4c524b] mt-0.5">
                          {lead.revenue_range}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-[#1e4840] px-2 py-0.5 font-mono text-[11px] font-bold text-[#C97F38]">
                          {lead.lead_score}/100
                        </span>
                        <span className="text-[11px] font-semibold text-[#27594F]">
                          {lead.maturity_level}
                        </span>
                      </div>
                      <div className="mt-1 font-medium text-[#1c1c10]">
                        {lead.recommended_service || 'Diagnóstico Geral'}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold ${getStageBadgeClass(
                          lead.stage_slug
                        )}`}
                      >
                        {getStageLabel(lead.stage_slug)}
                      </span>
                      {lead.next_follow_up_at && (
                        <div className="mt-1 text-[11px] text-amber-800">
                          Follow-up:{' '}
                          {new Date(lead.next_follow_up_at).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-[#1c1c10]">
                        {lead.source}
                      </div>
                      {lead.utm_source && (
                        <div className="text-[11px] text-[#4c524b]">
                          UTM: {lead.utm_source} / {lead.utm_medium || '-'}
                        </div>
                      )}
                      <div className="text-[11px] text-[#4c524b]">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
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
                          onClick={() => handleOpenWhatsApp(lead)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#1ebe5a]"
                          title="Abrir conversa no WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp
                        </a>

                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#27594F] px-2.5 py-1.5 text-[11px] font-semibold text-[#27594F] hover:bg-[#27594F] hover:text-white"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Ficha
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro Manual */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#d8d7cf] pb-4 mb-5">
              <h2 className="font-display text-2xl text-[#1c1c10]">
                Cadastrar Lead Manualmente
              </h2>
              <button
                type="button"
                onClick={() => setCreateOpen(false)}
                className="rounded-lg p-1 text-[#4c524b] hover:bg-[#E8E7DF]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Nome do Contato *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newWhatsapp}
                    onChange={(e) => setNewWhatsapp(e.target.value)}
                    placeholder="(45) 99999-9999"
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Segmento
                  </label>
                  <select
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  >
                    <option value="">Selecione...</option>
                    {BUSINESS_SEGMENTS.map((seg) => (
                      <option key={seg} value={seg}>
                        {seg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Faixa de Faturamento
                  </label>
                  <select
                    value={newRevenueRange}
                    onChange={(e) => setNewRevenueRange(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  >
                    <option value="">Não informado</option>
                    {REVENUE_RANGES.map((rev) => (
                      <option key={rev} value={rev}>
                        {rev}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Serviço Principal
                  </label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  >
                    {RUNA_SERVICES.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Etapa Inicial
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) =>
                      setNewStage(e.target.value as PipelineStageSlug)
                    }
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  >
                    {PIPELINE_STAGES_CATALOG.map((st) => (
                      <option key={st.slug} value={st.slug}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                    Origem
                  </label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#1c1c10] mb-1">
                  Notas Internas / Oportunidade
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#d8d7cf] bg-white px-3.5 py-2.5 text-xs"
                />
              </div>

              {createError && (
                <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-800">
                  {createError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  className="rounded-xl border border-[#d8d7cf] px-4 py-2.5 text-xs font-semibold text-[#4c524b]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#b06b29]"
                >
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    'Salvar Lead no Supabase'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
