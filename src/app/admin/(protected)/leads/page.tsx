import { createServerSupabaseClient } from '@/lib/supabase/server';
import { LeadRecord } from '@/lib/types/crm';
import { LeadsManagerClient } from '@/components/admin/LeadsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: leadsData }, { data: adminProfile }] = await Promise.all([
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('admin_profiles')
      .select('full_name')
      .eq('id', user?.id || '')
      .maybeSingle(),
  ]);

  return (
    <LeadsManagerClient
      initialLeads={(leadsData || []) as LeadRecord[]}
      adminName={adminProfile?.full_name || 'Administrador RUNA'}
    />
  );
}
