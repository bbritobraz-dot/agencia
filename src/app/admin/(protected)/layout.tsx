import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminProfileRecord } from '@/lib/types/crm';

export const dynamic = 'force-dynamic';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect('/admin/login?setup=missing_env');
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: adminProfile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .eq('active', true)
    .maybeSingle();

  if (!adminProfile) {
    redirect('/admin/login?error=unauthorized_admin');
  }

  return (
    <AdminShell adminProfile={adminProfile as AdminProfileRecord}>
      {children}
    </AdminShell>
  );
}
