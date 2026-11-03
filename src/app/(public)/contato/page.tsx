import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { ContactForm } from '@/components/public/ContactForm';
import { getServiceBySlug } from '@/config/services';
import { buildRunaWhatsAppUrl } from '@/lib/analytics/tracker';

export const metadata: Metadata = {
  title: 'Contato Comercial — Fale com a RUNA',
  description:
    'Entre em contato com a equipe consultiva da RUNA para projetos de tráfego pago, sites, e-commerce, automações com IA, sistemas sob medida e analytics.',
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
      <section className="bg-runa-pattern-dark py-16 text-white border-b border-[#27594F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              — Atendimento Consultivo
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-white">
              Converse com a equipe da RUNA.
            </h1>
            <p className="text-base text-[#E8E7DF]/85">
              Preencha o formulário abaixo para registrar sua demanda diretamente em nosso CRM interno ou realize nosso Diagnóstico Digital de 8 perguntas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#E8E7DF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-6 space-y-4">
                <h2 className="font-display text-2xl text-[#1c1c10]">
                  Canais Diretos
                </h2>
                <div className="space-y-3 text-sm text-[#4c524b]">
                  <a
                    href={buildRunaWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#d8d7cf] bg-white p-3.5 font-medium text-[#1c1c10] hover:border-[#27594F]"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    <div>
                      <div className="text-xs text-[#4c524b]">WhatsApp Comercial</div>
                      <div className="font-semibold">+55 (45) 98431-7910</div>
                    </div>
                  </a>

                  <a
                    href="mailto:contato@airuna.com.br"
                    className="flex items-center gap-3 rounded-xl border border-[#d8d7cf] bg-white p-3.5 font-medium text-[#1c1c10] hover:border-[#27594F]"
                  >
                    <Mail className="h-5 w-5 text-[#C97F38]" />
                    <div>
                      <div className="text-xs text-[#4c524b]">E-mail Corporativo</div>
                      <div className="font-semibold">contato@airuna.com.br</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-xl border border-[#d8d7cf] bg-white p-3.5 text-[#1c1c10]">
                    <MapPin className="h-5 w-5 text-[#27594F]" />
                    <div>
                      <div className="text-xs text-[#4c524b]">Base Operacional</div>
                      <div className="font-semibold">Foz do Iguaçu, PR · Brasil</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[#1e4840] p-6 text-white space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C97F38]">
                  Recomendado antes da reunião
                </span>
                <h3 className="font-display text-xl">
                  Prefere receber um diagnóstico automático agora?
                </h3>
                <p className="text-xs text-[#E8E7DF]/85 leading-relaxed">
                  Em 8 perguntas rápidas, nosso sistema calcula a pontuação da sua empresa e aponta as oportunidades prioritárias.
                </p>
                <Link
                  href="/diagnostico"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C97F38] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#b06b29]"
                >
                  <Sparkles className="h-4 w-4" />
                  Ir para o Diagnóstico Digital
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ContactForm initialService={matchedService?.title} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
