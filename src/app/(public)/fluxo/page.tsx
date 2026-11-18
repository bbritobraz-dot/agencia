import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, CalendarCheck, Database, MessageCircle, Server, UserRound } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { FluxoGuide } from '@/components/public/FluxoGuide';

export const metadata: Metadata = pageMetadata({
  title: 'Agente de WhatsApp com IA: o passo a passo',
  description:
    'Como montar um agente de WhatsApp com o Claude que atende seus leads de anúncio 24 horas: qualifica, agenda a reunião e registra no CRM.',
  path: '/fluxo',
});

// Mesmo número do botão flutuante (lib/analytics/tracker, que é módulo de cliente).
const WHATSAPP_URL = `https://wa.me/${(process.env.NEXT_PUBLIC_RUNA_WHATSAPP || '5545988229849').replace(/\D/g, '')}?text=${encodeURIComponent(
  'Olá! Vi o fluxo do agente de WhatsApp e quero que a RUNA monte o meu.'
)}`;

const FLUXO = [
  { icon: MessageCircle, titulo: 'Lead chama', texto: 'Clicou no anúncio e mandou mensagem, a qualquer hora.' },
  { icon: Server, titulo: 'Servidor 24h', texto: 'Recebe a mensagem e busca o histórico da conversa.' },
  { icon: Bot, titulo: 'Claude responde', texto: 'Segue o seu roteiro: qualifica, tira dúvidas, conduz.' },
  { icon: CalendarCheck, titulo: 'Agenda', texto: 'Oferece horários livres e marca com link do Meet.' },
  { icon: Database, titulo: 'CRM', texto: 'Registra o lead, a etapa e o que foi conversado.' },
  { icon: UserRound, titulo: 'Você', texto: 'É chamado só quando precisa: fechar, negociar, resolver.' },
];

export default function FluxoPage() {
  return (
    <div className="bg-[#FBFAF6]">
      {/* Topo */}
      <section className="relative isolate overflow-hidden border-b border-[#27594F] bg-runa-pattern-dark py-16 text-white lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Fluxo</span>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-6xl">
            Um agente de WhatsApp que atende seus leads 24 horas.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#E8E7DF]/85 sm:text-lg">
            Ele responde quem chega dos anúncios na hora, qualifica, marca a reunião na sua agenda e registra tudo no CRM. Você entra só para fechar. Este é o passo a passo para montar o seu com o Claude.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#passo-a-passo" className="inline-flex items-center gap-2 rounded-full bg-[#C97F38] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b56f2c]">
              Ver o passo a passo <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              Quero que a RUNA monte o meu
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Como funciona</span>
        <h2 className="mt-2 font-display text-3xl text-[#1d3b35] sm:text-4xl">Do anúncio à reunião, sem você no meio</h2>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLUXO.map((f, i) => (
            <li key={f.titulo} className="rounded-2xl border border-[#e4e0d6] bg-white p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#27594F] text-white">
                  <f.icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-[#C97F38]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-3 font-semibold text-[#1d3b35]">{f.titulo}</p>
              <p className="mt-1 text-sm text-[#4a5a55]">{f.texto}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-2xl border border-[#27594F]/30 bg-[#27594F]/5 p-5 text-sm text-[#2b3a36]">
          <p className="font-semibold text-[#1d3b35]">O que você vai precisar</p>
          <p className="mt-1">
            Uma conta no Claude com chave de API, um servidor ligado 24 horas (ou a Vercel, no caminho oficial), o seu número de WhatsApp e algumas horas para configurar e testar. Saber um pouco de programação ajuda: os exemplos estão prontos para adaptar.
          </p>
        </div>
      </section>

      <div id="passo-a-passo" className="scroll-mt-20">
        <FluxoGuide />
      </div>

      {/* Chamada final */}
      <section className="bg-runa-pattern-dark py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl">Prefere receber pronto?</h2>
          <p className="mt-4 text-[#E8E7DF]/85">
            A RUNA monta o agente com o seu roteiro, a sua agenda e o seu CRM, e acompanha os primeiros atendimentos com você. Serve para agências, prestadores de serviço e qualquer negócio que precise de atendimento 24 horas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" /> Falar com a RUNA
            </a>
            <Link href="/solucoes" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">
              Ver soluções
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
