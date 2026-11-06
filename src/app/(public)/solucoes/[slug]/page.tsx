import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Wrench } from 'lucide-react';
import { getServiceBySlug, RUNA_SERVICES, SERVICE_HOOKS } from '@/config/services';
import { getPortfolioForService } from '@/config/projects';
import { RUNA_BLOG_POSTS } from '@/config/blog';
import { ServiceIcon } from '@/components/public/ServiceIcon';
import { PostCard } from '@/components/public/BlogHighlights';
import { ServiceCtas, ServiceDemo, ServiceProjects } from '@/components/public/ServicePageParts';

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
  const hasProjects = getPortfolioForService(service.slug).length > 0;
  const relatedPosts = RUNA_BLOG_POSTS.filter(
    (p) => p.status === 'published' && p.relatedServiceSlugs.includes(service.slug),
  ).slice(0, 3);

  return (
    <div>
      {/* 1. Topo: dor + nome da solução + demonstração animada */}
      <section className="overflow-hidden border-b border-[#27594F] bg-runa-pattern-dark py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/solucoes"
            className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C1C0AC] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Todas as soluções
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C97F38]/40 bg-[#C97F38]/15 px-4 py-1.5 text-xs font-semibold text-[#C97F38]">
                <ServiceIcon name={service.iconName} className="h-4 w-4" />
                {SERVICE_HOOKS[service.id] ?? `Solução ${service.number}`}
              </div>

              <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">{service.title}</h1>

              <p className="text-xl leading-snug text-[#C97F38]">{service.tagline}</p>

              <p className="max-w-xl text-base leading-relaxed text-[#E8E7DF]/85">{service.summary}</p>

              <div className="pt-2">
                <ServiceCtas slug={service.slug} shortTitle={service.shortTitle} tone="dark" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-[#13302a]/60 p-4 shadow-2xl sm:p-5">
                <ServiceDemo slug={service.slug} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Isso é para você se… */}
      <section className="border-b border-[#d8d7cf] bg-[#fcfae5] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Para quem é</span>
              <h2 className="mt-2 font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
                Isso é para você se…
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4c524b]">{service.fullDescription}</p>
            </div>
            <ul className="grid gap-4 lg:col-span-7">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#27594F] text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-base text-[#1c1c10]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Como aplicamos + o que entregamos */}
      <section className="border-b border-[#d8d7cf] bg-[#E8E7DF] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Na prática</span>
            <h2 className="mt-2 font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
              Como aplicamos na sua empresa
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="grid gap-4 lg:col-span-7">
              {service.applications.map((app, index) => (
                <div key={app.title} className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#27594F] font-display text-sm text-[#C97F38]">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-[#1c1c10]">{app.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4c524b]">{app.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-[#27594F]/30 bg-[#1e4840] p-6 text-white sm:p-8">
                <h3 className="font-display text-2xl">O que entregamos</h3>
                <ul className="mt-5 space-y-3 text-sm text-[#E8E7DF]">
                  {service.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C97F38]" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#27594F]">
                  <Wrench className="h-4 w-4" /> Ferramentas e canais
                </p>
                <ul className="space-y-2 text-sm text-[#4c524b]">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="text-[#C97F38]">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Projetos desta solução (só quando há portfólio autorizado) */}
      {hasProjects && (
        <section className="border-b border-[#d8d7cf] bg-[#fcfae5] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Projetos</span>
                <h2 className="mt-2 font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
                  {service.shortTitle} que já estão no ar
                </h2>
              </div>
              <Link href="/projetos" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#27594F] hover:text-[#C97F38]">
                Ver todos os projetos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ServiceProjects slug={service.slug} />
          </div>
        </section>
      )}

      {/* 5. Artigos relacionados */}
      {relatedPosts.length > 0 && (
        <section className="border-b border-[#d8d7cf] bg-[#E8E7DF] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Para aprofundar</span>
            <h2 className="mb-10 mt-2 font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
              Artigos sobre {service.shortTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Próximo passo */}
      <section className="bg-runa-pattern-dark py-16 text-white lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Vamos ver como {service.shortTitle.toLowerCase()} funciona na sua empresa?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#E8E7DF]/85">
            Conte seu desafio no WhatsApp, sem compromisso. Ou faça o diagnóstico e veja sua nota em 2 minutos.
          </p>
          <div className="mt-8">
            <ServiceCtas slug={service.slug} shortTitle={service.shortTitle} tone="dark" align="center" />
          </div>
          <p className="mt-5 text-xs text-[#C1C0AC]">
            Prefere receber uma proposta por e-mail?{' '}
            <Link href={`/contato?servico=${service.slug}`} className="font-semibold text-white underline-offset-4 hover:underline">
              Solicitar proposta
            </Link>
          </p>
        </div>
      </section>

      {/* 7. Outras soluções */}
      <section className="bg-[#fcfae5] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 font-display text-2xl text-[#1c1c10] sm:text-3xl">Outras soluções que funcionam junto</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                href={`/solucoes/${other.slug}`}
                className="group flex items-start gap-3 rounded-2xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-4 transition-all hover:border-[#27594F] hover:bg-[#E8E7DF]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#27594F] text-white transition-colors group-hover:bg-[#C97F38]">
                  <ServiceIcon name={other.iconName} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#1c1c10] group-hover:text-[#27594F]">{other.shortTitle}</span>
                  <span className="mt-0.5 block text-xs text-[#4c524b]">{SERVICE_HOOKS[other.id]}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
