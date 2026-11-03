-- =============================================================================
-- MIGRATION: 20261103000000_meta_capi_and_tracking.sql
-- Projeto: RUNA — Meta Pixel + Conversions API + CRM Tracking
-- =============================================================================

-- 1. Enriquecer tabela 'leads' com identificadores Meta e atributos de contrato
ALTER TABLE public.leads
    ADD COLUMN IF NOT EXISTS fbp TEXT,
    ADD COLUMN IF NOT EXISTS fbc TEXT,
    ADD COLUMN IF NOT EXISTS fbclid TEXT,
    ADD COLUMN IF NOT EXISTS client_ip_address TEXT,
    ADD COLUMN IF NOT EXISTS client_user_agent TEXT,
    ADD COLUMN IF NOT EXISTS contract_id TEXT,
    ADD COLUMN IF NOT EXISTS contract_value NUMERIC(12, 2),
    ADD COLUMN IF NOT EXISTS contract_closed_at TIMESTAMPTZ;

-- Índices para busca rápida por identificadores de clique e contrato
CREATE INDEX IF NOT EXISTS idx_leads_fbclid ON public.leads(fbclid) WHERE fbclid IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_fbp ON public.leads(fbp) WHERE fbp IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_contract_id ON public.leads(contract_id) WHERE contract_id IS NOT NULL;

-- 2. Criar tabela 'conversion_events' para log, auditoria e idempotência de CAPI
CREATE TABLE IF NOT EXISTS public.conversion_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    event_id TEXT NOT NULL UNIQUE,
    stage_slug TEXT,
    action_source TEXT NOT NULL DEFAULT 'system_generated',
    contract_id TEXT,
    value NUMERIC(12, 2),
    currency TEXT DEFAULT 'BRL',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'skipped')),
    attempts INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    meta_response JSONB,
    event_time TIMESTAMPTZ NOT NULL,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TRIGGER set_conversion_events_updated_at
    BEFORE UPDATE ON public.conversion_events
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Índices para controle de concorrência e filtros
CREATE INDEX IF NOT EXISTS idx_conversion_events_lead_id ON public.conversion_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_status ON public.conversion_events(status);
CREATE INDEX IF NOT EXISTS idx_conversion_events_event_name ON public.conversion_events(event_name);

-- Restrição de unicidade para garantir que o mesmo lead não receba eventos duplicados da mesma etapa
-- (ex: qualificação duplicada), permitindo novos purchases somente se o contract_id for diferente
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_lead_stage_event 
    ON public.conversion_events (lead_id, event_name, COALESCE(contract_id, ''));

-- 3. Habilitar RLS na tabela conversion_events
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

-- Apenas administradores autenticados podem ler eventos de conversão
CREATE POLICY "Admins can view conversion events"
    ON public.conversion_events
    FOR SELECT
    USING (public.is_active_admin());

-- Apenas o service role (backend) ou admins autorizados podem criar ou atualizar
CREATE POLICY "Admins or service role can manage conversion events"
    ON public.conversion_events
    FOR ALL
    USING (public.is_active_admin());
