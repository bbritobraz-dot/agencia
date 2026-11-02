import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Administrativo exclusivo para uso em Server Route Handlers (/api/*).
 * Utiliza SUPABASE_SERVICE_ROLE_KEY apenas no servidor para gravar submissões
 * públicas sem abrir leitura ou escrita anônima via RLS.
 */
export function createAdminServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    supabaseUrl.includes('placeholder.supabase.co') ||
    supabaseUrl.includes('seu-projeto.supabase.co')
  ) {
    throw new Error(
      'As variáveis NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar configuradas com um projeto Supabase válido em .env.local.'
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
