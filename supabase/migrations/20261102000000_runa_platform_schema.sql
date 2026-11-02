-- =============================================================================
-- MIGRATION: 20261102000000_runa_platform_schema.sql
-- Projeto: Plataforma RUNA (Site Institucional + Diagnóstico Gamificado + CRM)
-- Tabelas:
--   1. admin_profiles
--   2. pipeline_stages
--   3. leads
--   4. diagnostic_submissions
--   5. diagnostic_answers
--   6. opportunities
--   7. lead_activities
--   8. follow_up_tasks
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- Função utilitária de atualização automática de updated_at
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------------
-- 1. TABELA: admin_profiles
-- Controle estrito de administradores autorizados (provisionamento seguro).
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'consultant')),
    active BOOLEAN NOT NULL DEFAULT true,
    invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER set_admin_profiles_updated_at
    BEFORE UPDATE ON public.admin_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Função auxiliar SECURITY DEFINER para verificação de admin ativo em RLS
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE id = auth.uid()
          AND active = true
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE id = auth.uid()
          AND active = true
          AND role = 'super_admin'
    );
END;
$$;

-- -----------------------------------------------------------------------------
-- 2. TABELA: pipeline_stages
-- Etapas oficiais do Funil Kanban comercial da RUNA.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE CHECK (slug IN (
        'novo_lead',
        'em_contato',
        'qualificado',
        'proposta_enviada',
        'negociacao',
        'fechado',
        'perdido'
    )),
    name TEXT NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#27594F',
    is_won BOOLEAN NOT NULL DEFAULT false,
    is_lost BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER set_pipeline_stages_updated_at
    BEFORE UPDATE ON public.pipeline_stages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

INSERT INTO public.pipeline_stages (slug, name, description, display_order, color, is_won, is_lost)
VALUES
    ('novo_lead', 'Novo lead', 'Lead recém-captado pelo diagnóstico ou formulário comercial', 1, '#00616D', false, false),
    ('em_contato', 'Em contato', 'Primeiro contato iniciado via WhatsApp, telefone ou e-mail', 2, '#27594F', false, false),
    ('qualificado', 'Qualificado', 'Fit técnico, dor e orçamento validados', 3, '#D97706', false, false),
    ('proposta_enviada', 'Proposta enviada', 'Escopo técnico e proposta comercial apresentados', 4, '#C97F38', false, false),
    ('negociacao', 'Negociação', 'Ajustes finais de escopo, condições e contrato', 5, '#7C3AED', false, false),
    ('fechado', 'Fechado', 'Negócio ganho e projeto iniciado', 6, '#16A34A', true, false),
    ('perdido', 'Perdido', 'Oportunidade encerrada sem fechamento', 7, '#DC2626', false, true)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    color = EXCLUDED.color,
    is_won = EXCLUDED.is_won,
    is_lost = EXCLUDED.is_lost;

-- -----------------------------------------------------------------------------
-- 3. TABELA: leads
-- Cadastro central de leads do site e do diagnóstico gamificado.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2),
    email TEXT NOT NULL CHECK (position('@' in email) > 1),
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    company TEXT NOT NULL CHECK (char_length(trim(company)) >= 1),
    segment TEXT,
    revenue_range TEXT,
    website TEXT,
    stage_id UUID REFERENCES public.pipeline_stages(id) ON DELETE RESTRICT,
    stage_slug TEXT NOT NULL DEFAULT 'novo_lead' CHECK (stage_slug IN (
        'novo_lead',
        'em_contato',
        'qualificado',
        'proposta_enviada',
        'negociacao',
        'fechado',
        'perdido'
    )),
    commercial_status TEXT NOT NULL DEFAULT 'Novo lead',
    lead_score INTEGER NOT NULL DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
    maturity_level TEXT NOT NULL DEFAULT 'Em Estruturação',
    main_opportunities TEXT[] NOT NULL DEFAULT '{}',
    recommended_service TEXT,
    recommended_services TEXT[] NOT NULL DEFAULT '{}',
    source TEXT NOT NULL DEFAULT 'Diagnóstico Digital',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    referrer TEXT,
    landing_page TEXT,
    privacy_consent BOOLEAN NOT NULL DEFAULT true,
    marketing_consent BOOLEAN NOT NULL DEFAULT false,
    consented_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    internal_notes TEXT,
    next_follow_up_at TIMESTAMPTZ,
    last_contacted_at TIMESTAMPTZ,
    assigned_to UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER set_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger para sincronizar stage_id e commercial_status automaticamente a partir de stage_slug
CREATE OR REPLACE FUNCTION public.sync_lead_pipeline_stage()
RETURNS TRIGGER AS $$
DECLARE
    v_stage_id UUID;
    v_stage_name TEXT;
BEGIN
    IF NEW.stage_slug IS NOT NULL THEN
        SELECT id, name INTO v_stage_id, v_stage_name
        FROM public.pipeline_stages
        WHERE slug = NEW.stage_slug
        LIMIT 1;

        IF v_stage_id IS NOT NULL THEN
            NEW.stage_id := v_stage_id;
            NEW.commercial_status := v_stage_name;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_lead_pipeline_stage
    BEFORE INSERT OR UPDATE OF stage_slug ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.sync_lead_pipeline_stage();

-- -----------------------------------------------------------------------------
-- 4. TABELA: diagnostic_submissions
-- Submissões consolidadas do Diagnóstico Digital Gamificado.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diagnostic_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    maturity_level TEXT NOT NULL,
    category_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    bottlenecks JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommended_services JSONB NOT NULL DEFAULT '[]'::jsonb,
    primary_recommendation TEXT NOT NULL,
    summary_diagnosis TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 5. TABELA: diagnostic_answers
-- Respostas individuais das 8 perguntas do Diagnóstico Digital.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diagnostic_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES public.diagnostic_submissions(id) ON DELETE CASCADE,
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    question_number INTEGER NOT NULL CHECK (question_number >= 1 AND question_number <= 8),
    category TEXT NOT NULL,
    question_text TEXT NOT NULL,
    selected_option_id TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    max_score INTEGER NOT NULL DEFAULT 100,
    bottleneck_tag TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 6. TABELA: opportunities
-- Oportunidades comerciais vinculadas ao lead e ao funil.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    stage_id UUID REFERENCES public.pipeline_stages(id) ON DELETE SET NULL,
    stage_slug TEXT NOT NULL DEFAULT 'novo_lead' CHECK (stage_slug IN (
        'novo_lead',
        'em_contato',
        'qualificado',
        'proposta_enviada',
        'negociacao',
        'fechado',
        'perdido'
    )),
    title TEXT NOT NULL,
    service_slug TEXT NOT NULL,
    service_name TEXT NOT NULL,
    estimated_value NUMERIC(12, 2) CHECK (estimated_value IS NULL OR estimated_value >= 0),
    monthly_recurring_value NUMERIC(12, 2) CHECK (monthly_recurring_value IS NULL OR monthly_recurring_value >= 0),
    probability INTEGER NOT NULL DEFAULT 20 CHECK (probability >= 0 AND probability <= 100),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'negotiation', 'won', 'lost')),
    expected_close_date DATE,
    closed_at TIMESTAMPTZ,
    loss_reason TEXT,
    assigned_to UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER set_opportunities_updated_at
    BEFORE UPDATE ON public.opportunities
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 7. TABELA: lead_activities
-- Histórico completo de eventos, contatos, notas e mudanças de etapa.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL DEFAULT 'Sistema RUNA',
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'lead_created',
        'diagnostic_completed',
        'stage_changed',
        'note_added',
        'contact_logged',
        'whatsapp_opened',
        'followup_scheduled',
        'followup_completed',
        'lead_updated',
        'opportunity_updated'
    )),
    from_stage TEXT,
    to_stage TEXT,
    channel TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 8. TABELA: follow_up_tasks
-- Tarefas e agendamentos de follow-up comercial.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.follow_up_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    notes TEXT,
    channel TEXT NOT NULL DEFAULT 'whatsapp' CHECK (channel IN ('whatsapp', 'call', 'email', 'meeting')),
    due_at TIMESTAMPTZ NOT NULL,
    completed_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER set_follow_up_tasks_updated_at
    BEFORE UPDATE ON public.follow_up_tasks
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- ÍNDICES DE PERFORMANCE
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_leads_stage_slug ON public.leads(stage_slug);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON public.leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_whatsapp ON public.leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_leads_recommended_service ON public.leads(recommended_service);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up_at ON public.leads(next_follow_up_at);

CREATE INDEX IF NOT EXISTS idx_diagnostic_submissions_lead_id ON public.diagnostic_submissions(lead_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_submissions_created_at ON public.diagnostic_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_diagnostic_answers_submission_id ON public.diagnostic_answers(submission_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_answers_lead_id ON public.diagnostic_answers(lead_id);

CREATE INDEX IF NOT EXISTS idx_opportunities_lead_id ON public.opportunities(lead_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_stage_slug ON public.opportunities(stage_slug);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities(status);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON public.lead_activities(lead_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_follow_up_tasks_lead_id ON public.follow_up_tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_follow_up_tasks_due_at ON public.follow_up_tasks(due_at) WHERE status = 'pending';

-- -----------------------------------------------------------------------------
-- SEGURANÇA: ROW LEVEL SECURITY (RLS)
-- Visitantes públicos NÃO podem ler nem listar nenhum dado privado.
-- Apenas administradores ativos (public.is_active_admin()) acessam os dados.
-- Submissões públicas entram via Route Handler seguro no servidor.
-- -----------------------------------------------------------------------------
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_up_tasks ENABLE ROW LEVEL SECURITY;

-- Policies: admin_profiles
CREATE POLICY "Admins read own or all profiles"
    ON public.admin_profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid() OR public.is_active_admin());

CREATE POLICY "Admins update own profile"
    ON public.admin_profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid() OR public.is_super_admin())
    WITH CHECK (id = auth.uid() OR public.is_super_admin());

CREATE POLICY "Super admins insert profiles"
    ON public.admin_profiles FOR INSERT
    TO authenticated
    WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins delete profiles"
    ON public.admin_profiles FOR DELETE
    TO authenticated
    USING (public.is_super_admin());

-- Policies: pipeline_stages (somente admins autenticados leem/gerenciam)
CREATE POLICY "Active admins can read pipeline_stages"
    ON public.pipeline_stages FOR SELECT
    TO authenticated
    USING (public.is_active_admin());

CREATE POLICY "Active admins can manage pipeline_stages"
    ON public.pipeline_stages FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());

-- Policies: leads (bloqueado para visitantes anônimos; liberado apenas para admins ativos)
CREATE POLICY "Active admins full access to leads"
    ON public.leads FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());

-- Policies: diagnostic_submissions
CREATE POLICY "Active admins full access to diagnostic_submissions"
    ON public.diagnostic_submissions FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());

-- Policies: diagnostic_answers
CREATE POLICY "Active admins full access to diagnostic_answers"
    ON public.diagnostic_answers FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());

-- Policies: opportunities
CREATE POLICY "Active admins full access to opportunities"
    ON public.opportunities FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());

-- Policies: lead_activities
CREATE POLICY "Active admins full access to lead_activities"
    ON public.lead_activities FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());

-- Policies: follow_up_tasks
CREATE POLICY "Active admins full access to follow_up_tasks"
    ON public.follow_up_tasks FOR ALL
    TO authenticated
    USING (public.is_active_admin())
    WITH CHECK (public.is_active_admin());
