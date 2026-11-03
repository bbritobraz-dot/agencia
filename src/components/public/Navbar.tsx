'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { RUNA_SERVICES } from '@/config/services';
import { ServiceIcon } from './ServiceIcon';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d8d7cf] bg-[#E8E7DF]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-green.webp"
            alt="RUNA — Marketing, Tecnologia e Automação"
            width={126}
            height={42}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-7">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive('/')
                ? 'text-[#C97F38] font-semibold'
                : 'text-[#1c1c10]/85 hover:text-[#27594F]'
            }`}
          >
            Home
          </Link>

          {/* Soluções Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <Link
              href="/solucoes"
              className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                isActive('/solucoes')
                  ? 'text-[#C97F38] font-semibold'
                  : 'text-[#1c1c10]/85 hover:text-[#27594F]'
              }`}
            >
              Soluções
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  solutionsOpen ? 'rotate-180' : ''
                }`}
              />
            </Link>

            {solutionsOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2">
                <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 shadow-2xl">
                  <div className="mb-3 flex items-center justify-between border-b border-[#d8d7cf]/70 pb-2.5 px-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#27594F]">
                      Ecossistema de Soluções RUNA
                    </span>
                    <Link
                      href="/solucoes"
                      className="text-xs font-semibold text-[#C97F38] hover:underline flex items-center gap-1"
                    >
                      Ver todas as soluções
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {RUNA_SERVICES.map((service) => (
                      <Link
                        key={service.id}
                        href={`/solucoes/${service.slug}`}
                        onClick={() => setSolutionsOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#E8E7DF]"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1e4840] text-[#fcfae5] group-hover:bg-[#C97F38] transition-colors">
                          <ServiceIcon name={service.iconName} className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#1c1c10] group-hover:text-[#27594F]">
                            {service.title}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-[#4c524b]">
                            {service.tagline}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/projetos"
            className={`text-sm font-medium transition-colors ${
              isActive('/projetos')
                ? 'text-[#C97F38] font-semibold'
                : 'text-[#1c1c10]/85 hover:text-[#27594F]'
            }`}
          >
            Projetos
          </Link>

          <Link
            href="/sobre"
            className={`text-sm font-medium transition-colors ${
              isActive('/sobre')
                ? 'text-[#C97F38] font-semibold'
                : 'text-[#1c1c10]/85 hover:text-[#27594F]'
            }`}
          >
            Sobre a RUNA
          </Link>

          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${
              isActive('/blog')
                ? 'text-[#C97F38] font-semibold'
                : 'text-[#1c1c10]/85 hover:text-[#27594F]'
            }`}
          >
            Blog
          </Link>

          <Link
            href="/contato"
            className={`text-sm font-medium transition-colors ${
              isActive('/contato')
                ? 'text-[#C97F38] font-semibold'
                : 'text-[#1c1c10]/85 hover:text-[#27594F]'
            }`}
          >
            Contato
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C97F38] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#b06b29] hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Diagnóstico gratuito
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#d8d7cf] bg-[#fcfae5] text-[#1c1c10] lg:hidden"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#d8d7cf] bg-[#fcfae5] px-4 pt-4 pb-6 lg:hidden">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[#1c1c10] hover:bg-[#E8E7DF]"
            >
              Home
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-[#1c1c10] hover:bg-[#E8E7DF]"
              >
                <span>Soluções</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    solutionsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {solutionsOpen && (
                <div className="mt-1 ml-3 flex flex-col space-y-1 border-l-2 border-[#C97F38]/40 pl-3">
                  <Link
                    href="/solucoes"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm font-semibold text-[#C97F38]"
                  >
                    Ver todas as 6 soluções →
                  </Link>
                  {RUNA_SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/solucoes/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="py-2 text-sm text-[#1c1c10]/85 hover:text-[#27594F]"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/projetos"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[#1c1c10] hover:bg-[#E8E7DF]"
            >
              Projetos
            </Link>
            <Link
              href="/sobre"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[#1c1c10] hover:bg-[#E8E7DF]"
            >
              Sobre a RUNA
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[#1c1c10] hover:bg-[#E8E7DF]"
            >
              Blog
            </Link>
            <Link
              href="/contato"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base font-medium text-[#1c1c10] hover:bg-[#E8E7DF]"
            >
              Contato
            </Link>

            <div className="pt-3">
              <Link
                href="/diagnostico"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C97F38] px-5 py-3.5 text-sm font-semibold text-white shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                Fazer Diagnóstico Gratuito
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
