import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  DiagnosticAnswerRecord,
  DiagnosticSubmissionRecord,
  FollowUpTaskRecord,
  LeadActivityRecord,
  LeadRecord,
} from '@/lib/types/crm';
import { LeadDetailClient } from '@/components/admin/LeadDetailClient';

export const dynamic = 'force-dynamic';

export default async function AdminLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { data: leadData },
    { data: submissionData },
    { data: answersData },
    { data: activitiesData },
    { data: followUpsData },
    { data: adminProfile },
  ] = await Promise.all([
    supabase.from('leads').select('*').eq('id', id).maybeSingle(),
    supabase
      .from('diagnostic_submissions')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('diagnostic_answers')
      .select('*')
      .eq('lead_id', id)
      .order('question_number', { ascending: true }),
    supabase
      .from('lead_activities')
      .select('*')
      .eq('lead_id', id)
      .order('created_at', { ascending: false }),
    supabase
      .from('follow_up_tasks')
      .select('*')
      .eq('lead_id', id)
      .order('due_at', { ascending: true }),
    supabase
      .from('admin_profiles')
      .select('full_name')
      .eq('id', user?.id || '')
      .maybeSingle(),
  ]);

  if (!leadData) {
    notFound();
  }

  return (
    <LeadDetailClient
      initialLead={leadData as LeadRecord}
      submission={(submissionData as DiagnosticSubmissionRecord) || null}
      answers={(answersData || []) as DiagnosticAnswerRecord[]}
      initialActivities={(activitiesData || []) as LeadActivityRecord[]}
      initialFollowUps={(followUpsData || []) as FollowUpTaskRecord[]}
      adminName={adminProfile?.full_name || 'Administrador RUNA'}
    />
  );
}
