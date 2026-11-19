import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createAdminServiceClient } from '@/lib/supabase/admin';

// Edita o valor do negócio de um lead (opportunities.estimated_value) direto do funil.
export async function POST(request: NextRequest) {
  try {
    const userSupabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await userSupabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado. Faça login novamente.' }, { status: 401 });
    }

    const adminSupabase = createAdminServiceClient();
    const { data: adminProfile } = await adminSupabase
      .from('admin_profiles')
      .select('id, full_name')
      .eq('id', user.id)
      .eq('active', true)
      .single();
    if (!adminProfile) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }

    const { leadId, value } = (await request.json()) as { leadId?: string; value?: number | null };
    const parsed = value == null ? null : Number(value);
    if (!leadId || (parsed !== null && (!Number.isFinite(parsed) || parsed < 0))) {
      return NextResponse.json({ error: 'Informe o lead e um valor válido.' }, { status: 400 });
    }
    const newValue = parsed && parsed > 0 ? parsed : null;

    const { data: lead } = await adminSupabase
      .from('leads')
      .select('id, name, company, stage_id, stage_slug, recommended_service')
      .eq('id', leadId)
      .single();
    if (!lead) {
      return NextResponse.json({ error: 'Lead não encontrado.' }, { status: 404 });
    }

    const { data: opps } = await adminSupabase
      .from('opportunities')
      .select('id')
      .eq('lead_id', leadId)
      .neq('status', 'lost');

    if (opps && opps.length > 0) {
      const { error } = await adminSupabase
        .from('opportunities')
        .update({ estimated_value: newValue })
        .in('id', opps.map((o) => o.id));
      if (error) throw new Error(error.message);
    } else {
      const serviceName = lead.recommended_service || 'Serviço';
      const { error } = await adminSupabase.from('opportunities').insert({
        lead_id: lead.id,
        stage_id: lead.stage_id,
        stage_slug: lead.stage_slug,
        title: `${lead.company || lead.name} — ${serviceName}`,
        service_slug: 'personalizado',
        service_name: serviceName,
        estimated_value: newValue,
        probability: 30,
        status: lead.stage_slug === 'fechado' ? 'won' : 'open',
      });
      if (error) throw new Error(error.message);
    }

    await adminSupabase.from('lead_activities').insert({
      lead_id: leadId,
      actor_name: adminProfile.full_name,
      activity_type: 'opportunity_updated',
      title: 'Valor do negócio alterado',
      description: newValue
        ? `Valor alterado para R$ ${newValue.toLocaleString('pt-BR')} por ${adminProfile.full_name}.`
        : `Valor removido por ${adminProfile.full_name}.`,
    });

    return NextResponse.json({ success: true, value: newValue });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro ao salvar o valor.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
