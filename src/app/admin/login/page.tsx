'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Lock,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Database,
  ArrowLeft,
} from 'lucide-react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const setupParam = searchParams.get('setup');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    errorParam === 'unauthorized_admin'
      ? 'Sua conta não possui perfil de administrador ativo na tabela admin_profiles.'
      : null
  );

  const configured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        setErrorMsg('Credenciais inválidas ou acesso não autorizado.');
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('admin_profiles')
        .select('id, active, role')
        .eq('id', data.user.id)
        .eq('active', true)
        .maybeSingle();

      if (!profile) {
        await supabase.auth.signOut();
        setErrorMsg(
          'Acesso negado: este usuário não está provisionado em public.admin_profiles.'
        );
        setLoading(false);
        return;
      }

      await supabase
        .from('admin_profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id);

      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMsg('Erro ao autenticar com o Supabase Auth.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-runa-pattern-darkest flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#fcfae5]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Image
              src="/logo-white.webp"
              alt="RUNA"
              width={140}
              height={46}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-3 py-1 text-xs font-semibold text-[#C97F38]">
            <Lock className="h-3.5 w-3.5" />
            CRM Interno & Gestão de Diagnósticos
          </span>
          <h1 className="mt-3 font-display text-3xl text-white">
            Acesso Restrito — Equipe RUNA
          </h1>
          <p className="mt-1 text-xs text-[#C1C0AC]">
            O acesso administrativo é exclusivo para usuários provisionados por convite.
          </p>
        </div>

        {(!configured || setupParam === 'missing_env') && (
          <div className="rounded-2xl border border-amber-400/40 bg-amber-950/60 p-4 text-xs text-amber-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <Database className="h-4 w-4 shrink-0" />
              Configuração do Supabase Necessária
            </div>
            <p className="leading-relaxed">
              Para operar o CRM interno com dados reais, configure as variáveis{' '}
              <code className="font-mono text-white">NEXT_PUBLIC_SUPABASE_URL</code>,{' '}
              <code className="font-mono text-white">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> e{' '}
              <code className="font-mono text-white">SUPABASE_SERVICE_ROLE_KEY</code> no arquivo{' '}
              <code className="font-mono text-white">.env.local</code> e execute a migration{' '}
              <code className="font-mono text-white">
                supabase/migrations/20261102000000_runa_platform_schema.sql
              </code>
              .
            </p>
          </div>
        )}

        <div className="rounded-3xl border border-[#27594F] bg-[#1e4840]/90 p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E8E7DF] mb-1.5">
                E-mail do Administrador
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@runamkt.com.br"
                className="w-full rounded-xl border border-[#27594F] bg-[#13302a] px-4 py-3 text-sm text-white placeholder-[#C1C0AC]/50 focus:border-[#C97F38] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E8E7DF] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#27594F] bg-[#13302a] px-4 py-3 text-sm text-white placeholder-[#C1C0AC]/50 focus:border-[#C97F38] focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-950/60 p-3.5 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !configured}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#b06b29] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verificando credenciais...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Entrar no Painel Administrativo
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-[#C1C0AC]">
            <span>Protegido por Supabase Auth + RLS</span>
            <Link href="/" className="inline-flex items-center gap-1 text-[#C97F38] hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar ao site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#13302a]" />}>
      <AdminLoginContent />
    </Suspense>
  );
}
