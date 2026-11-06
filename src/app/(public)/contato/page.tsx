import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { ContactForm, ContactWhatsAppCard } from '@/components/public/ContactForm';
import { getServiceBySlug } from '@/config/services';

const CONTACT_EMAIL = 'contato@airuna.com.br';

export const metadata: Metadata = {
  title: 'Contato — Fale com a RUNA',
  description:
    'Fale com a RUNA pelo WhatsApp, e-mail ou formulário sobre tráfego pago, sites, e-commerce, automações com IA, sistemas sob medida e dados.',
};

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{ servico?: string }>;
}) {
  const { servico } = await searchParams;
  const matchedService = servico ? getServiceBySlug(servico) : undefined;

  return (
    <div>
      <section className="border-b border-[#27594F] bg-runa-pattern-dark py-14 text-white lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Contato</span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">Vamos conversar?</h1>
            <p className="text-base text-[#E8E7DF]/85 sm:text-lg">
              {matchedService
                ? `Conte como podemos ajudar com ${matchedService.title}. Respondemos pelo WhatsApp ou e-mail.`
                : 'Conte o que sua empresa precisa. Respondemos pelo WhatsApp ou e-mail.'}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#E8E7DF] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Formulário primeiro no celular */}
            <div className="order-2 space-y-4 lg:order-1 lg:col-span-4">
              <ContactWhatsAppCard />

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 text-[#1c1c10] transition-colors hover:border-[#27594F]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#27594F]/10 text-[#27594F]">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-[#4c524b]">E-mail</span>
                  <span className="block text-sm font-semibold">{CONTACT_EMAIL}</span>
                </span>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-[#d8d7cf] bg-[#fcfae5] p-4 text-[#1c1c10]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#27594F]/10 text-[#27594F]">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-[#4c524b]">Base</span>
                  <span className="block text-sm font-semibold">Foz do Iguaçu, PR · atendimento em todo o Brasil</span>
                </span>
              </div>

              <Link
                href="/diagnostico"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#C97F38]/40 bg-[#C97F38]/10 p-4 text-sm text-[#1c1c10] transition-colors hover:bg-[#C97F38]/15"
              >
                <span>
                  <span className="block font-semibold">Ainda não sabe o que precisa?</span>
                  <span className="block text-xs text-[#4c524b]">Faça o diagnóstico gratuito em 2 minutos.</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#C97F38] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-8">
              <ContactForm initialService={matchedService?.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
