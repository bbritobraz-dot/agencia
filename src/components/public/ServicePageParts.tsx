'use client';

/*
 * Peças interativas das páginas de solução (/solucoes e /solucoes/[slug]).
 * Ficam aqui porque as páginas são Server Components e estas partes
 * precisam de animação, preferência de movimento reduzido ou cliques rastreados.
 */
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getServiceBySlug } from '@/config/services';
import { getPortfolioForService } from '@/config/projects';
import { DemoStage } from '@/components/public/SolutionsExplorer';
import { ProjectCard } from '@/components/public/ProjectShowcase';
import { buildRunaWhatsAppUrl, trackRunaEvent } from '@/lib/analytics/tracker';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- Demonstração animada da solução ---------------- */
export function ServiceDemo({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const reduce = !!useReducedMotion();
  const service = getServiceBySlug(slug);
  if (!service) return null;
  return <DemoStage service={service} reduce={reduce} compact={compact} />;
}

/* ---------------- Projetos que comprovam a solução ---------------- */
export function ServiceProjects({ slug, limit = 3 }: { slug: string; limit?: number }) {
  const reduce = !!useReducedMotion();
  const list = getPortfolioForService(slug).slice(0, limit);
  if (list.length === 0) return null;

  return (
    <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
      {list.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.08, ease: EASE }}
          className="w-[82%] shrink-0 snap-start sm:w-auto"
        >
          <ProjectCard p={p} reduce={reduce} />
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- Botões: WhatsApp com contexto + diagnóstico ---------------- */
export function ServiceCtas({
  slug,
  shortTitle,
  tone = 'dark',
  align = 'start',
}: {
  slug: string;
  shortTitle: string;
  tone?: 'dark' | 'light';
  align?: 'start' | 'center';
}) {
  const message = `Olá! Vim pela página de ${shortTitle} do site da RUNA e gostaria de conversar sobre a minha empresa.`;
  const secondary =
    tone === 'dark'
      ? 'border-white/25 bg-white/10 text-white hover:bg-white/20'
      : 'border-[#27594F] bg-transparent text-[#27594F] hover:bg-[#27594F] hover:text-white';

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${align === 'center' ? 'sm:justify-center' : ''}`}>
      <a
        href={buildRunaWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackRunaEvent('whatsapp_click', { placement: `service_${slug}` })}
        className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/15 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
      >
        <MessageCircle className="h-5 w-5" />
        Conversar no WhatsApp
      </a>
      <Link
        href="/diagnostico"
        className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors ${secondary}`}
      >
        Fazer diagnóstico gratuito
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
