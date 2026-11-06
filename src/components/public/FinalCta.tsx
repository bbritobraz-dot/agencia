'use client';

 
import Link from 'next/link';
import { useRef } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCheck, Clock, Gift, LineChart, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { RuneMark, useTicker } from '@/components/public/HeroScene';
import { buildRunaWhatsAppUrl, trackRunaEvent } from '@/lib/analytics/tracker';

const EASE = [0.22, 1, 0.36, 1] as const;

const VISITOR_MSG = 'Olá! Vim pela página inicial do site da RUNA e gostaria de conversar sobre a minha empresa.';
const RUNA_MSG = 'Olá! Que bom ter você aqui. Conta pra gente: qual é hoje o maior desafio da sua empresa para vender mais?';

/* ---------------- Prévia animada da conversa ---------------- */
// Etapas: 0 vazio · 1 mensagem do visitante · 2 digitando · 3 resposta · 4 pausa
function ChatPreview({ run, reduce }: { run: boolean; reduce: boolean }) {
  const tick = useTicker(5, 1500, run && !reduce);
  const stage = reduce ? 3 : tick;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#27594F]/15 bg-[#efeae0] shadow-inner">
      {/* Cabeçalho estilo app de mensagens */}
      <div className="flex items-center gap-3 bg-[#1e4840] px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#27594F] ring-2 ring-[#C97F38]/50">
          <RuneMark n={20} className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">RUNA</p>
          <p className="text-[11px] text-emerald-300">{stage === 2 ? 'digitando…' : 'online'}</p>
        </div>
        <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-[#C1C0AC]">Exemplo de conversa</span>
      </div>

      <div className="relative flex min-h-[330px] flex-col justify-end gap-2 px-4 py-4 sm:min-h-[220px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
          style={{ backgroundImage: "url('/patterns/Patterns_Runa%20(3).webp')", backgroundSize: '260px' }}
        />
        <AnimatePresence initial={false}>
          {stage >= 1 && (
            <motion.div
              key="visitor"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#d9f2d0] px-3.5 py-2 text-sm text-[#1c1c10] shadow-sm"
            >
              {VISITOR_MSG}
              <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#4c524b]">
                agora <CheckCheck className="h-3.5 w-3.5 text-sky-500" />
              </span>
            </motion.div>
          )}
          {stage === 2 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#4c524b]/60"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </motion.div>
          )}
          {stage >= 3 && (
            <motion.div
              key="runa"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-sm text-[#1c1c10] shadow-sm"
            >
              {RUNA_MSG}
              <span className="mt-0.5 block text-right text-[10px] text-[#4c524b]">agora</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Seção ---------------- */
export function FinalCta() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  const enter = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-runa-pattern-dark py-20 text-white lg:py-24">
      {/* Selo RUNA girando: fecha a página como o hero abre */}
      <motion.img
        aria-hidden
        src="/LOGOS/Logotipo_Runa%20Oficial%20(19).webp"
        alt=""
        className="pointer-events-none absolute -left-56 -top-40 -z-10 h-[44rem] w-[44rem] opacity-[0.12]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...enter()} className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Vamos começar</span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-5xl">
            Vamos conversar sobre a sua empresa?
          </h2>
          <p className="mt-4 text-base text-[#E8E7DF]/85 sm:text-lg">
            Conte o seu desafio e a gente mostra por onde começar. Ou, se preferir, comece sozinho pelo diagnóstico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Caminho 1: WhatsApp */}
          <motion.div {...enter(0.05)} className="rounded-3xl bg-[#fcfae5] p-5 text-[#1c1c10] shadow-2xl sm:p-7 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#27594F]">Falar com a RUNA</span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                WhatsApp
              </span>
            </div>

            <ChatPreview run={inView} reduce={reduce} />

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-[#4c524b]">
                <li className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#27594F]" /> Sem compromisso</li>
                <li className="flex items-center gap-1.5"><Send className="h-4 w-4 text-[#27594F]" /> Mensagem já escrita</li>
              </ul>
              <a
                href={buildRunaWhatsAppUrl(VISITOR_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRunaEvent('whatsapp_click', { placement: 'home_final_cta' })}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C97F38]/30 transition-all hover:-translate-y-0.5 hover:bg-[#b06b29]"
              >
                <MessageCircle className="h-5 w-5" />
                Conversar no WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Caminho 2: diagnóstico */}
          <motion.div
            {...enter(0.15)}
            className="flex flex-col justify-between rounded-3xl border border-white/15 bg-[#13302a]/70 p-6 backdrop-blur-sm sm:p-8 lg:col-span-5"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">Prefere começar sozinho?</span>
              <h3 className="mt-3 font-display text-2xl leading-snug text-white sm:text-3xl">
                Faça o diagnóstico gratuito e veja sua nota na hora.
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm text-[#e9e8dc]">
                <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-[#C97F38]" /> 8 perguntas, 2 minutos</li>
                <li className="flex items-center gap-2.5"><LineChart className="h-4 w-4 text-[#C97F38]" /> Nota de 0 a 100 e principais gargalos</li>
                <li className="flex items-center gap-2.5"><Gift className="h-4 w-4 text-[#C97F38]" /> 100% gratuito</li>
              </ul>
            </div>
            <div className="mt-7 space-y-3">
              <Link
                href="/diagnostico"
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
              >
                Fazer diagnóstico gratuito
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-center text-xs text-[#C1C0AC]">
                Prefere e-mail?{' '}
                <Link href="/contato" className="font-semibold text-white underline-offset-4 hover:underline">
                  Use o formulário de contato
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
