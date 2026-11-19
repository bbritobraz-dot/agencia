import { createServerSupabaseClient } from '@/lib/supabase/server';
import { LeadRecord } from '@/lib/types/crm';
import { KanbanPipelineClient } from '@/components/admin/KanbanPipelineClient';

export const dynamic = 'force-dynamic';

export default async function AdminPipelinePage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: leadsData }, { data: adminProfile }, { data: oppsData }] = await Promise.all([
    supabase
      .from('leads')
      .select('*')
      .order('lead_score', { ascending: false }),
    supabase
      .from('admin_profiles')
      .select('full_name')
      .eq('id', user?.id || '')
      .maybeSingle(),
    supabase
      .from('opportunities')
      .select('lead_id, estimated_value, status, updated_at')
      .order('updated_at', { ascending: false }),
  ]);

  // Valor do negócio por lead: oportunidade mais recente que não foi perdida
  const leadValues: Record<string, number> = {};
  for (const opp of oppsData || []) {
    if (opp.status === 'lost' || opp.lead_id in leadValues) continue;
    const value = Number(opp.estimated_value);
    if (value > 0) leadValues[opp.lead_id] = value;
  }

  return (
    <KanbanPipelineClient
      initialLeads={(leadsData || []) as LeadRecord[]}
      leadValues={leadValues}
      adminName={adminProfile?.full_name || 'Administrador RUNA'}
    />
  );
}
