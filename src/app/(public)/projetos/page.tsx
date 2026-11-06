import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { AUTHORIZED_PORTFOLIO, type PortfolioType } from '@/config/projects';
import { ProjectsGallery } from '@/components/public/ProjectsGallery';
import { ServiceCtas } from '@/components/public/ServicePageParts';

export const metadata: Metadata = {
  title: 'Projetos: Sites, Lojas Virtuais e Landing Pages',
  description:
    'Veja sites institucionais, lojas virtuais e landing pages desenvolvidos pela RUNA para empresas de diferentes segmentos.',
};

const TYPE_ORDER: PortfolioType[] = ['site', 'ecommerce', 'landing'];
const TYPE_PLURAL: Record<PortfolioType, string> = {
  site: 'Sites',
  ecommerce: 'Lojas virtuais',
  landing: 'Landing pages',
};

export default function ProjetosPage() {
  const total = AUTHORIZED_PORTFOLIO.length;
  const counts = TYPE_ORDER.map((t) => ({
    type: t,
    n: AUTHORIZED_PORTFOLIO.filter((p) => p.type === t).length,
  })).filter((c) => c.n > 0);

  return (
    <div>
      {/* Topo */}
      <section className="border-b border-[#27594F] bg-runa-pattern-dark py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Projetos</span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">Projetos que já estão no ar.</h1>
            <p className="text-base leading-relaxed text-[#E8E7DF]/85 sm:text-lg">
              Sites, lojas e páginas de venda criados para negócios de diferentes segmentos. Clique em um projeto para ver os detalhes.
            </p>
          </div>

          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#C97F38]/40 bg-[#C97F38]/15 p-4">
              <dt className="text-[11px] uppercase tracking-widest text-[#C97F38]">Projetos</dt>
              <dd className="mt-1 font-display text-3xl text-white">{total}</dd>
            </div>
            {counts.map((c) => (
              <div key={c.type} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-[11px] uppercase tracking-widest text-[#C1C0AC]">{TYPE_PLURAL[c.type]}</dt>
                <dd className="mt-1 font-display text-3xl text-white">{c.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Galeria */}
      <section className="bg-[#E8E7DF] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectsGallery />
          <p className="mt-12 flex items-center justify-center gap-2 border-t border-[#d8d7cf] pt-8 text-xs text-[#4c524b]">
            <ShieldCheck className="h-4 w-4 text-[#27594F]" />
            Projetos exibidos com autorização dos clientes.
          </p>
        </div>
      </section>

      {/* Próximo passo */}
      <section className="bg-runa-pattern-dark py-16 text-white lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">Quer um projeto assim para a sua empresa?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#E8E7DF]/85">
            Conte o que você precisa no WhatsApp, sem compromisso. Ou faça o diagnóstico e descubra por onde começar.
          </p>
          <div className="mt-8">
            <ServiceCtas slug="projetos" shortTitle="Projetos" tone="dark" align="center" />
          </div>
        </div>
      </section>
    </div>
  );
}
