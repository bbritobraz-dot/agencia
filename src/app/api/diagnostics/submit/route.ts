import { NextRequest, NextResponse } from 'next/server';
import { DIAGNOSTIC_QUESTIONS } from '@/config/diagnosticQuestions';
import { calculateDiagnosticResult } from '@/lib/diagnostic/scoringEngine';
import {
  checkRateLimit,
  isValidEmail,
  sanitizeText,
} from '@/lib/security/rateLimiter';
import { createAdminServiceClient } from '@/lib/supabase/admin';
import { normalizePhoneBR } from '@/lib/utils/phone';
import { sendMetaCapiEvent } from '@/lib/meta/capiClient';

const GENERIC_SAVE_ERROR = 'Não conseguimos salvar seu diagnóstico agora. Tente novamente em instantes.';

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateCheck = checkRateLimit(`diag_submit:${ip}`, 6, 60_000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Muitas tentativas em sequência. Aguarde alguns segundos e tente novamente.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfterSeconds) },
        }
      );
    }

    const body = await request.json();

    // Proteção Honeypot contra bots automatizados
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      return NextResponse.json({ error: 'Submissão inválida.' }, { status: 400 });
    }

    const name = sanitizeText(body.name, 120);
    const email = sanitizeText(body.email, 160).toLowerCase();
    const rawWhatsapp = sanitizeText(body.whatsapp || body.phone, 40);
    const whatsapp = normalizePhoneBR(rawWhatsapp);
    const company = sanitizeText(body.company, 140);
    const segment = sanitizeText(body.segment, 100) || null;
    const revenueRange = sanitizeText(body.revenue_range, 100) || null;
    const website = sanitizeText(body.website, 200) || null;
    const privacyConsent = Boolean(body.privacy_consent);
    const marketingConsent = Boolean(body.marketing_consent);

    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Informe seu nome completo.' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Informe um endereço de e-mail corporativo válido.' },
        { status: 400 }
      );
    }
    if (whatsapp.length < 12) {
      return NextResponse.json(
        { error: 'Informe um número de WhatsApp válido com DDD.' },
        { status: 400 }
      );
    }
    if (company.length < 2) {
      return NextResponse.json(
        { error: 'Informe o nome da sua empresa.' },
        { status: 400 }
      );
    }
    if (!privacyConsent) {
      return NextResponse.json(
        {
          error:
            'É necessário concordar com a Política de Privacidade (LGPD) para processar o diagnóstico.',
        },
        { status: 400 }
      );
    }

    // Validação das 8 respostas do diagnóstico no servidor
    const rawAnswers = (body.answers || {}) as Record<string, string>;
    for (const q of DIAGNOSTIC_QUESTIONS) {
      const selectedOptionId = rawAnswers[q.id];
      const isValidOption = q.options.some((opt) => opt.id === selectedOptionId);
      if (!selectedOptionId || !isValidOption) {
        return NextResponse.json(
          {
            error: `A pergunta ${q.number} ("${q.categoryLabel}") precisa ser respondida.`,
          },
          { status: 400 }
        );
      }
    }

    // Cálculo oficial de pontuação, gargalos e recomendações no servidor
    const calculation = calculateDiagnosticResult(rawAnswers);

    const utms = body.utms || {};
    const meta = body.meta || {};
    const userAgent = request.headers.get('user-agent') || '';

    const utmSource = sanitizeText(utms.utm_source, 100) || null;
    const utmMedium = sanitizeText(utms.utm_medium, 100) || null;
    const utmCampaign = sanitizeText(utms.utm_campaign, 120) || null;
    const utmTerm = sanitizeText(utms.utm_term, 120) || null;
    const utmContent = sanitizeText(utms.utm_content, 120) || null;
    const referrer = sanitizeText(utms.referrer, 250) || null;
    const landingPage = sanitizeText(utms.landing_page, 180) || '/diagnostico';

    const fbp = sanitizeText(meta.fbp, 120) || null;
    const fbc = sanitizeText(meta.fbc, 160) || null;
    const fbclid = sanitizeText(meta.fbclid, 250) || null;

    const supabase = createAdminServiceClient();

    // 1. Criar Lead no CRM interno
    const { data: leadRecord, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: whatsapp,
        whatsapp,
        company,
        segment,
        revenue_range: revenueRange,
        website,
        stage_slug: 'novo_lead',
        commercial_status: 'Novo lead',
        lead_score: calculation.overallScore,
        maturity_level: calculation.maturityLevel,
        main_opportunities: calculation.bottlenecks.map((b) => b.description),
        recommended_service: calculation.primaryRecommendation,
        recommended_services: calculation.recommendedServices.map((s) => s.title),
        source: 'Diagnóstico Digital',
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        referrer,
        landing_page: landingPage,
        fbp,
        fbc,
        fbclid,
        client_ip_address: ip !== 'unknown' ? ip : null,
        client_user_agent: userAgent || null,
        privacy_consent: privacyConsent,
        marketing_consent: marketingConsent,
        consented_at: new Date().toISOString(),
      })
      .select('id, stage_id')
      .single();

    if (leadError || !leadRecord) {
      // Detalhe técnico só nos logs do servidor; o visitante recebe mensagem genérica
      console.error('[diagnostic] falha ao inserir lead:', leadError?.message || 'sem registro retornado');
      return NextResponse.json({ error: GENERIC_SAVE_ERROR }, { status: 500 });
    }

    // 2. Salvar submissão do diagnóstico
    const { data: submissionRecord, error: submissionError } = await supabase
      .from('diagnostic_submissions')
      .insert({
        lead_id: leadRecord.id,
        overall_score: calculation.overallScore,
        maturity_level: calculation.maturityLevel,
        category_scores: calculation.categoryScores,
        bottlenecks: calculation.bottlenecks,
        recommended_services: calculation.recommendedServices,
        primary_recommendation: calculation.primaryRecommendation,
        summary_diagnosis: calculation.summaryDiagnosis,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
      })
      .select('id')
      .single();

    if (submissionError || !submissionRecord) {
      console.error('[diagnostic] falha ao inserir submissão:', submissionError?.message || 'sem registro retornado');
      return NextResponse.json({ error: GENERIC_SAVE_ERROR }, { status: 500 });
    }

    // 3. Salvar as 8 respostas detalhadas
    const answerRows = calculation.detailedAnswers.map((ans) => ({
      submission_id: submissionRecord.id,
      lead_id: leadRecord.id,
      question_id: ans.questionId,
      question_number: ans.questionNumber,
      category: ans.category,
      question_text: ans.questionText,
      selected_option_id: ans.selectedOptionId,
      answer_text: ans.answerText,
      score: ans.score,
      max_score: 100,
      bottleneck_tag: ans.bottleneckTag,
    }));

    const { error: answersError } = await supabase
      .from('diagnostic_answers')
      .insert(answerRows);

    if (answersError) {
      console.error('[diagnostic] falha ao inserir respostas:', answersError.message);
      return NextResponse.json({ error: GENERIC_SAVE_ERROR }, { status: 500 });
    }

    // 4. Criar oportunidade comercial vinculada ao serviço primário recomendado
    const primaryService = calculation.recommendedServices[0];
    await supabase.from('opportunities').insert({
      lead_id: leadRecord.id,
      stage_id: leadRecord.stage_id,
      stage_slug: 'novo_lead',
      title: `${company} — ${primaryService?.title || calculation.primaryRecommendation}`,
      service_slug: primaryService?.slug || 'gestao-de-trafego-pago',
      service_name: primaryService?.title || calculation.primaryRecommendation,
      probability: 25,
      status: 'open',
    });

    // 5. Registrar atividades iniciais no histórico do lead
    await supabase.from('lead_activities').insert([
      {
        lead_id: leadRecord.id,
        actor_name: 'Sistema RUNA',
        activity_type: 'lead_created',
        to_stage: 'novo_lead',
        title: 'Lead captado via Diagnóstico Digital',
        description: `Lead cadastrado para a empresa ${company} (${segment || 'Segmento não informado'}).`,
      },
      {
        lead_id: leadRecord.id,
        actor_name: 'Motor de Diagnóstico RUNA',
        activity_type: 'diagnostic_completed',
        title: `Diagnóstico concluído — Score ${calculation.overallScore}/100 (${calculation.maturityLevel})`,
        description: calculation.summaryDiagnosis,
        metadata: {
          submission_id: submissionRecord.id,
          overall_score: calculation.overallScore,
          primary_recommendation: calculation.primaryRecommendation,
        },
      },
    ]);

    // 6. Disparo Server-Side da Meta Conversions API (CAPI) para evento 'Lead'
    const leadEventId = `lead_${leadRecord.id}`;
    const nowIso = new Date().toISOString();

    try {
      const capiResult = await sendMetaCapiEvent({
        eventName: 'Lead',
        eventId: leadEventId,
        eventTime: Math.floor(Date.now() / 1000),
        eventSourceUrl: `https://airuna.com.br${landingPage}`,
        actionSource: 'website',
        userData: {
          email,
          phone: whatsapp,
          firstName: name,
          clientIpAddress: ip !== 'unknown' ? ip : null,
          clientUserAgent: userAgent || null,
          fbp,
          fbc,
        },
        customData: {
          lead_id: leadRecord.id,
          content_name: 'Diagnóstico Digital RUNA',
          overall_score: calculation.overallScore,
          maturity_level: calculation.maturityLevel,
          primary_recommendation: calculation.primaryRecommendation,
        },
      });

      // Registrar auditoria em conversion_events
      await supabase.from('conversion_events').insert({
        lead_id: leadRecord.id,
        event_name: 'Lead',
        event_id: leadEventId,
        stage_slug: 'novo_lead',
        action_source: 'website',
        status: capiResult.success ? 'sent' : 'failed',
        attempts: 1,
        last_error: capiResult.error || null,
        meta_response: capiResult.rawResponse || null,
        event_time: nowIso,
        sent_at: capiResult.success ? nowIso : null,
      });
    } catch (capiErr) {
      console.error('[CAPI Lead Error]', capiErr);
      await supabase.from('conversion_events').insert({
        lead_id: leadRecord.id,
        event_name: 'Lead',
        event_id: leadEventId,
        stage_slug: 'novo_lead',
        action_source: 'website',
        status: 'failed',
        attempts: 1,
        last_error: capiErr instanceof Error ? capiErr.message : 'Erro ao despachar CAPI',
        event_time: nowIso,
      });
    }

    return NextResponse.json({
      success: true,
      leadId: leadRecord.id,
      leadEventId,
      submissionId: submissionRecord.id,
      result: calculation,
    });
  } catch (err: unknown) {
    console.error('[diagnostic] erro inesperado:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: GENERIC_SAVE_ERROR }, { status: 500 });
  }
}
