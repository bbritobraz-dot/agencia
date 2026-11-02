import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isSupabaseConfigured } from './client';

export async function updateAdminSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';

  if (!isAdminRoute) {
    return supabaseResponse;
  }

  // Se o Supabase ainda não estiver configurado nas variáveis de ambiente,
  // redireciona para /admin/login exceto se já estiver nela (onde exibirá aviso de configuração).
  if (!isSupabaseConfigured()) {
    if (!isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('setup', 'missing_env');
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    // Verifica se o usuário autenticado consta na tabela admin_profiles como ativo
    const { data: adminProfile } = await supabase
      .from('admin_profiles')
      .select('id, active, role')
      .eq('id', user.id)
      .eq('active', true)
      .maybeSingle();

    if (!adminProfile && !isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('error', 'unauthorized_admin');
      return NextResponse.redirect(url);
    }

    if (adminProfile && isLoginRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
