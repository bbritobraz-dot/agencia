import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { getServiceBySlug, RUNA_SERVICES } from '@/config/services';
import { ServiceIcon } from '@/components/public/ServiceIcon';

export async function generateStaticParams() {
  return RUNA_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Solução não encontrada',
    };
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: `${service.seo.title} | RUNA`,
      description: service.seo.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = RUNA_SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <div>
      {/* Hero da Solução */}
      <section className="bg-runa-pattern-dark py-20 text-white border-b border-[#27594F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/solucoes"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C1C0AC] hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para todas as soluções
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-4 py-1.5 text-xs font-semibold text-[#C97F38]">
                <ServiceIcon name={service.iconName} className="h-4 w-4" />
                <span>Solução {service.number} · RUNA</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">
                {service.title}
              </h1>

              <p className="text-lg font-medium text-[#C97F38]">
                {service.tagline}
              </p>

              <p className="text-base sm:text-lg text-[#E8E7DF]/85 leading-relaxed max-w-3xl">
                {service.fullDescription}
              </p>

              <div className="pt-3 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-7 py-4 text-sm font-semibold text-white shadow-lg hover:bg-[#b06b29]"
                >
                  <Sparkles className="h-4 w-4" />
                  {service.ctaLabel}
                </Link>
                <Link
                  href={`/contato?servico=${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-semibold text-white hover:bg-white/20"
                >
                  Solicitar proposta comercial
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/15 bg-[#13302a]/90 p-6 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#C97F38]">
                  Destaques da Entrega
                </h2>
                <ul className="space-y-3 text-sm text-[#E8E7DF]">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#C97F38] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicações e Entregáveis */}
      <section className="py-20 bg-[#E8E7DF] border-b border-[#d8d7cf]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Aplicações */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
                  — Casos de Uso e Aplicações
                </span>
                <h2 className="font-display text-3xl text-[#1c1c10] mt-1">
                  Como aplicamos {service.title} na prática
                </h2>
              </div>

              <div className="space-y-4">
                {service.applications.map((app, index) => (
                  <div
                    key={app.title}
                    className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#27594F] text-xs font-bold text-white">
                        0{index + 1}
                      </span>
                      <h3 className="text-lg font-bold text-[#1c1c10]">
                        {app.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#4c524b] leading-relaxed">
                      {app.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Escopo Técnico e Perfil Ideal */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 sm:p-8 shadow-sm">
                <h3 className="font-display text-2xl text-[#1c1c10] mb-4">
                  O que está contemplado no escopo
                </h3>
                <ul className="space-y-3 text-sm text-[#1c1c10]/90">
                  {service.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#27594F] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#27594F]/30 bg-[#1e4840] p-6 sm:p-8 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C97F38] mb-3">
                  <Layers className="h-4 w-4" />
                  Para quem é indicado
                </div>
                <ul className="space-y-2.5 text-sm text-[#E8E7DF]">
                  {service.idealFor.map((ideal) => (
                    <li key={ideal} className="flex items-start gap-2">
                      <span className="text-[#C97F38] font-bold">•</span>
                      <span>{ideal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outras soluções do ecossistema */}
      <section className="py-20 bg-[#fcfae5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl text-[#1c1c10] mb-8">
            Soluções complementares do ecossistema RUNA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                href={`/solucoes/${other.slug}`}
                className="group rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-5 transition-all hover:border-[#27594F] hover:bg-[#E8E7DF]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#27594F] text-white group-hover:bg-[#C97F38] transition-colors">
                    <ServiceIcon name={other.iconName} className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono text-[#4c524b]">
                    {other.number}
                  </span>
                </div>
                <h3 className="font-bold text-[#1c1c10] group-hover:text-[#27594F]">
                  {other.title}
                </h3>
                <p className="mt-1 text-xs text-[#4c524b] line-clamp-2">
                  {other.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
