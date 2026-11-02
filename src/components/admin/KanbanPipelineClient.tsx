'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GripVertical,
  MessageCircle,
  ExternalLink,
  Building2,
} from 'lucide-react';
import {
  getStageLabel,
  LeadRecord,
  PIPELINE_STAGES_CATALOG,
  PipelineStageSlug,
} from '@/lib/types/crm';
import { createClient } from '@/lib/supabase/client';
import { buildLeadWhatsAppUrl } from '@/lib/utils/phone';

export function KanbanPipelineClient({
  initialLeads,
  adminName,
}: {
  initialLeads: LeadRecord[];
  adminName: string;
}) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<PipelineStageSlug | null>(
    null
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleMoveStage = async (
    leadId: string,
    targetStage: PipelineStageSlug
  ) => {
    const currentLead = leads.find((l) => l.id === leadId);
    if (!currentLead || currentLead.stage_slug === targetStage) return;

    const previousStage = currentLead.stage_slug;
    const targetStageLabel = getStageLabel(targetStage);
    const previousStageLabel = getStageLabel(previousStage);

    // Atualização otimista da UI
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              stage_slug: targetStage,
              commercial_status: targetStageLabel,
            }
          : l
      )
    );
    setUpdatingId(leadId);

    try {
      const supabase = createClient();

      const { error: updateErr } = await supabase
        .from('leads')
        .update({
          stage_slug: targetStage,
          commercial_status: targetStageLabel,
        })
        .eq('id', leadId);

      if (updateErr) {
        // Reverter em caso de falha
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId
              ? {
                  ...l,
                  stage_slug: previousStage,
                  commercial_status: previousStageLabel,
                }
              : l
          )
        );
        return;
      }

      // Atualizar oportunidade vinculada
      const oppStatus =
        targetStage === 'fechado'
          ? 'won'
          : targetStage === 'perdido'
          ? 'lost'
          : targetStage === 'negociacao' || targetStage === 'proposta_enviada'
          ? 'negotiation'
          : 'open';

      await supabase
        .from('opportunities')
        .update({
          stage_slug: targetStage,
          status: oppStatus,
        })
        .eq('lead_id', leadId);

      // Registrar no histórico de atividades
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        actor_name: adminName,
        activity_type: 'stage_changed',
        from_stage: previousStage,
        to_stage: targetStage,
        title: `Etapa alterada: ${previousStageLabel} → ${targetStageLabel}`,
        description: `Lead movido no funil Kanban de "${previousStageLabel}" para "${targetStageLabel}" por ${adminName}.`,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#C97F38]">
            Pipeline Comercial
          </span>
          <h1 className="font-display text-3xl text-[#1c1c10]">
            Funil Kanban (7 Etapas)
          </h1>
          <p className="text-xs text-[#4c524b] mt-0.5">
            Arraste os cards entre as colunas ou altere a etapa para registrar automaticamente no histórico do lead.
          </p>
        </div>
      </div>

      {/* Colunas do Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-6">
        {PIPELINE_STAGES_CATALOG.map((stage) => {
          const columnLeads = leads.filter((l) => l.stage_slug === stage.slug);
          const isOver = dragOverStage === stage.slug;

          return (
            <div
              key={stage.slug}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragOverStage !== stage.slug) {
                  setDragOverStage(stage.slug);
                }
              }}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={async (e) => {
                e.preventDefault();
                setDragOverStage(null);
                const leadId =
                  e.dataTransfer.getData('text/plain') || draggedLeadId;
                setDraggedLeadId(null);
                if (leadId) {
                  await handleMoveStage(leadId, stage.slug);
                }
              }}
              className={`flex w-72 shrink-0 flex-col rounded-2xl border p-3.5 transition-colors ${
                isOver
                  ? 'border-[#C97F38] bg-[#fcfae5]'
                  : 'border-[#d8d7cf] bg-[#fcfae5]/80'
              }`}
            >
              {/* Cabeçalho da Coluna */}
              <div className="mb-3 flex items-center justify-between border-b border-[#d8d7cf] pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1c1c10]">
                    {stage.name}
                  </h2>
                </div>
                <span className="rounded-full bg-[#E8E7DF] px-2.5 py-0.5 font-mono text-xs font-bold text-[#1c1c10]">
                  {columnLeads.length}
                </span>
              </div>

              {/* Cards da Coluna */}
              <div className="flex-1 space-y-3 min-h-[420px]">
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => {
                      setDraggedLeadId(lead.id);
                      e.dataTransfer.setData('text/plain', lead.id);
                    }}
                    className={`rounded-xl border border-[#d8d7cf] bg-white p-3.5 shadow-sm transition-all cursor-grab active:cursor-grabbing hover:border-[#27594F] ${
                      updatingId === lead.id ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-xs font-bold text-[#1c1c10] hover:text-[#27594F] flex items-center gap-1 truncate"
                        >
                          <Building2 className="h-3.5 w-3.5 shrink-0 text-[#27594F]" />
                          <span className="truncate">{lead.company}</span>
                        </Link>
                        <div className="text-[11px] text-[#4c524b] truncate mt-0.5">
                          {lead.name}
                        </div>
                      </div>
                      <GripVertical className="h-4 w-4 text-[#C1C0AC] shrink-0" />
                    </div>

                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="rounded bg-[#1e4840] px-2 py-0.5 font-mono text-[10px] font-bold text-[#C97F38]">
                        Score {lead.lead_score}/100
                      </span>
                      <span className="text-[10px] font-medium text-[#4c524b] truncate">
                        {lead.segment || lead.source}
                      </span>
                    </div>

                    {lead.recommended_service && (
                      <div className="mt-2 rounded-lg bg-[#E8E7DF]/60 px-2.5 py-1.5 text-[11px] font-semibold text-[#27594F] truncate">
                        {lead.recommended_service}
                      </div>
                    )}

                    {/* Seletor rápido de etapa + ações */}
                    <div className="mt-3 pt-2.5 border-t border-[#d8d7cf]/70 flex items-center justify-between gap-2">
                      <select
                        value={lead.stage_slug}
                        onChange={(e) =>
                          handleMoveStage(
                            lead.id,
                            e.target.value as PipelineStageSlug
                          )
                        }
                        aria-label="Mover etapa"
                        className="rounded-lg border border-[#d8d7cf] bg-[#fcfae5] px-2 py-1 text-[10px] font-semibold text-[#1c1c10]"
                      >
                        {PIPELINE_STAGES_CATALOG.map((st) => (
                          <option key={st.slug} value={st.slug}>
                            {st.name}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1.5">
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
                          className="rounded-lg bg-[#25D366] p-1.5 text-white hover:bg-[#1ebe5a]"
                          title="Falar no WhatsApp"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="rounded-lg border border-[#27594F] p-1.5 text-[#27594F] hover:bg-[#27594F] hover:text-white"
                          title="Abrir Ficha do Lead"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
