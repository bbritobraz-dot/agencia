'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Kanban,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AdminProfileRecord } from '@/lib/types/crm';

export function AdminShell({
  adminProfile,
  children,
}: {
  adminProfile: AdminProfileRecord;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard Executivo',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: '/admin/leads',
      label: 'Gestão de Leads',
      icon: Users,
      exact: false,
    },
    {
      href: '/admin/pipeline',
      label: 'Funil Kanban',
      icon: Kanban,
      exact: false,
    },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#E8E7DF] text-[#1c1c10]">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 bg-[#13302a] text-[#fcfae5] border-b lg:border-b-0 lg:border-r border-[#27594F] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#27594F]/60">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/logo-white.webp"
                alt="RUNA CRM"
                width={105}
                height={34}
                className="h-7 w-auto object-contain"
              />
              <span className="rounded bg-[#C97F38] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                CRM
              </span>
            </Link>
          </div>

          <nav className="p-4 space-y-1.5 flex lg:flex-col overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#C97F38] text-white shadow-sm'
                      : 'text-[#E8E7DF]/80 hover:bg-[#1e4840] hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:block p-4 border-t border-[#27594F]/60 space-y-3">
          <div className="rounded-xl bg-[#1e4840] p-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#C97F38] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{adminProfile.full_name}</span>
            </div>
            <div className="text-[11px] text-[#C1C0AC] truncate mt-0.5">
              {adminProfile.email}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs text-[#E8E7DF] hover:bg-white/10"
            >
              Site Público
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-500/20 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/30"
              title="Encerrar sessão"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
