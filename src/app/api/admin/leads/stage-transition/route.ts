import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminServiceClient } from '@/lib/supabase/admin';
import { getStageLabel, PipelineStageSlug } from '@/lib/types/crm';
import { sendMetaCapiEvent } from '@/lib/meta/capiClient';

interface StageTransitionBody {
  leadId: string;
  targetStage: PipelineStageSlug;
  contractId?: string;
  contractValue?: number;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Autenticação estrita do Administrador
    const userSupabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await userSupabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Faça login novamente.' },
        { status: 401 }
      );
    }

    const adminSupabase = createAdminServiceClient();

    const { data: adminProfile, error: profileError } = await adminSupabase
      .from('admin_profiles')
      .select('id, full_name, active')
      .eq('id', user.id)
      .eq('active', true)
      .single();

    if (profileError || !adminProfile) {
      return NextResponse.json(
        { error: 'Acesso negado: perfil administrativo não encontrado ou inativo.' },
        { status: 403 }
      );
    }

    const body = (await request.json()) as StageTransitionBody;
    const { leadId, targetStage, contractId, contractValue } = body;

    if (!leadId || !targetStage) {
      return NextResponse.json(
        { error: 'Parâmetros leadId e targetStage são obrigatórios.' },
        { status: 400 }
      );
    }

    // 2. Buscar dados completos do Lead original (com identificadores de atribuição)
    const { data: lead, error: leadFetchError } = await adminSupabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (leadFetchError || !lead) {
      return NextResponse.json(
        { error: 'Lead não encontrado no banco de dados.' },
        { status: 404 }
      );
    }

    const previousStage = lead.stage_slug as PipelineStageSlug;
    if (previousStage === targetStage) {
      return NextResponse.json({ success: true, message: 'Lead já está nesta etapa.' });
    }

    const targetStageLabel = getStageLabel(targetStage);
    const previousStageLabel = getStageLabel(previousStage);

    // 3. Atualizar o lead
    const leadUpdates: Record<string, unknown> = {
      stage_slug: targetStage,
      commercial_status: targetStageLabel,
    };

    if (targetStage === 'fechado') {
      if (contractId && contractId.trim().length > 0) {
        leadUpdates.contract_id = contractId.trim();
      }
      if (contractValue && contractValue > 0) {
        leadUpdates.contract_value = contractValue;
      }
      leadUpdates.contract_closed_at = new Date().toISOString();
    }

    const { error: updateErr } = await adminSupabase
      .from('leads')
      .update(leadUpdates)
      .eq('id', leadId);

    if (updateErr) {
      return NextResponse.json(
        { error: `Erro ao atualizar lead: ${updateErr.message}` },
        { status: 500 }
      );
    }

    // 4. Atualizar oportunidades vinculadas
    const oppStatus =
      targetStage === 'fechado'
        ? 'won'
        : targetStage === 'perdido'
        ? 'lost'
        : targetStage === 'negociacao' || targetStage === 'proposta_enviada'
        ? 'negotiation'
        : 'open';

    const oppUpdates: Record<string, unknown> = {
      stage_slug: targetStage,
      status: oppStatus,
    };

    if (targetStage === 'fechado' && contractValue && contractValue > 0) {
      oppUpdates.value = contractValue;
    }

    await adminSupabase.from('opportunities').update(oppUpdates).eq('lead_id', leadId);

    // 5. Registrar no histórico de atividades do lead
    const activityDesc =
      targetStage === 'fechado' && contractValue
        ? `Lead movido para "Fechado" por ${adminProfile.full_name}. Contrato: ${contractId || 'N/A'} — Valor: R$ ${contractValue.toLocaleString('pt-BR')}.`
        : `Lead movido no funil Kanban de "${previousStageLabel}" para "${targetStageLabel}" por ${adminProfile.full_name}.`;

    await adminSupabase.from('lead_activities').insert({
      lead_id: leadId,
      actor_name: adminProfile.full_name,
      activity_type: 'stage_changed',
      from_stage: previousStage,
      to_stage: targetStage,
      title: `Etapa alterada: ${previousStageLabel} → ${targetStageLabel}`,
      description: activityDesc,
    });

    // 6. Mapeamento de Eventos da Meta Conversions API (CAPI)
    // - qualificado -> QualifiedLead
    // - proposta_enviada -> PropostaEnviada
    // - fechado -> Purchase
    let metaEventName: string | null = null;
    if (targetStage === 'qualificado') {
      metaEventName = 'QualifiedLead';
    } else if (targetStage === 'proposta_enviada') {
      metaEventName = 'PropostaEnviada';
    } else if (targetStage === 'fechado') {
      metaEventName = 'Purchase';
    }

    if (metaEventName) {
      const normalizedContractId = contractId ? contractId.trim() : null;
      const eventTimeSec = Math.floor(Date.now() / 1000);
      const nowIso = new Date().toISOString();

      // Construção do event_id para idempotência e deduplicação
      const eventId =
        metaEventName === 'Purchase' && normalizedContractId
          ? `purchase_${leadId}_${normalizedContractId}`
          : `crm_${metaEventName.toLowerCase()}_${leadId}`;

      // Verificar idempotência: já foi enviado com sucesso?
      const { data: existingEvent } = await adminSupabase
        .from('conversion_events')
        .select('id, status')
        .eq('lead_id', leadId)
        .eq('event_name', metaEventName)
        .eq('status', 'sent')
        .maybeSingle();

      if (existingEvent && metaEventName !== 'Purchase') {
        // Evento de qualificação/proposta já enviado anteriormente para este lead
        return NextResponse.json({
          success: true,
          message: `Etapa atualizada. Evento ${metaEventName} já havia sido enviado anteriormente.`,
        });
      }

      // Preparar Custom Data para a Meta
      const customData: Record<string, unknown> = {
        lead_id: lead.id,
        stage: targetStage,
        company: lead.company,
      };

      if (metaEventName === 'Purchase') {
        customData.currency = 'BRL';
        if (contractValue && contractValue > 0) {
          customData.value = contractValue;
        }
        if (normalizedContractId) {
          customData.order_id = normalizedContractId;
        }
      }

      // Enviar evento utilizando os dados do LEAD ORIGINAL (não do admin)
      try {
        const capiResult = await sendMetaCapiEvent({
          eventName: metaEventName,
          eventId,
          eventTime: eventTimeSec,
          actionSource: 'system_generated',
          userData: {
            email: lead.email,
            phone: lead.whatsapp || lead.phone,
            firstName: lead.name,
            clientIpAddress: lead.client_ip_address,
            clientUserAgent: lead.client_user_agent,
            fbp: lead.fbp,
            fbc: lead.fbc,
          },
          customData,
        });

        // Registrar em conversion_events
        await adminSupabase.from('conversion_events').upsert(
          {
            lead_id: lead.id,
            event_name: metaEventName,
            event_id: eventId,
            stage_slug: targetStage,
            action_source: 'system_generated',
            contract_id: normalizedContractId,
            value: contractValue || null,
            currency: 'BRL',
            status: capiResult.success ? 'sent' : 'failed',
            attempts: 1,
            last_error: capiResult.error || null,
            meta_response: capiResult.rawResponse || null,
            event_time: nowIso,
            sent_at: capiResult.success ? nowIso : null,
          },
          { onConflict: 'event_id' }
        );
      } catch (capiErr) {
        console.error('[CAPI Pipeline Error]', capiErr);
        await adminSupabase.from('conversion_events').upsert(
          {
            lead_id: lead.id,
            event_name: metaEventName,
            event_id: eventId,
            stage_slug: targetStage,
            action_source: 'system_generated',
            contract_id: normalizedContractId,
            value: contractValue || null,
            currency: 'BRL',
            status: 'failed',
            attempts: 1,
            last_error: capiErr instanceof Error ? capiErr.message : 'Erro ao despachar CAPI',
            event_time: nowIso,
          },
          { onConflict: 'event_id' }
        );
      }
    }

    return NextResponse.json({
      success: true,
      stage: targetStage,
      commercialStatus: targetStageLabel,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno na transição de estágio.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
