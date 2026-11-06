'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import {
  CheckCircle2,
  CreditCard,
  Heart,
  MousePointerClick,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UserPlus,
} from 'lucide-react';
import { AutomationFlow, PageBuilder, RuneMark, useTicker } from '@/components/public/HeroScene';

/*
 * Demonstrações animadas de cada solução (valores ilustrativos).
 * Paleta RUNA: #27594F · #00616D · #C97F38 · #C1C0AC
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function useCount(to: number, duration = 1.2, decimals = 0) {
  const [v, setV] = useState(to);
  useEffect(() => {
    const c = animate(v, to, {
      duration,
      ease: EASE,
      onUpdate: (x) => setV(Number(x.toFixed(decimals))),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);
  return v;
}

const card = 'rounded-2xl border border-[#27594F]/20 bg-[#fcfae5] shadow-2xl shadow-[#13302a]/30';

/* ---------------- 01 · Tráfego pago ---------------- */
const ADS_STEPS = [
  { clicks: 182, cpl: 38.4, leads: 9 },
  { clicks: 486, cpl: 29.9, leads: 21 },
  { clicks: 812, cpl: 24.7, leads: 37 },
  { clicks: 1240, cpl: 19.8, leads: 58 },
];

export function AdsDemo({ reduce }: { reduce: boolean }) {
  const step = useTicker(ADS_STEPS.length, 1600, !reduce);
  const s = ADS_STEPS[reduce ? ADS_STEPS.length - 1 : step];
  const clicks = useCount(s.clicks);
  const cpl = useCount(s.cpl, 1.2, 1);
  const leads = useCount(s.leads);

  return (
    <div className={`${card} w-[300px] p-3`}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#27594F]">
          <RuneMark n={20} className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold text-[#1c1c10]">Sua empresa</p>
          <p className="text-[9px] text-[#4c524b]">Patrocinado · Meta Ads</p>
        </div>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ativa
        </span>
      </div>
      <div className="relative mt-2.5 h-24 overflow-hidden rounded-xl bg-gradient-to-br from-[#27594F] to-[#00616D]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/patterns/Patterns_Runa%20(2).webp')", backgroundSize: '180px' }} />
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="h-2 w-3/4 rounded bg-white/90" />
          <div className="mt-1.5 h-2 w-1/2 rounded bg-white/60" />
        </div>
        <span className="absolute right-2.5 top-2.5 rounded-md bg-[#C97F38] px-2 py-1 text-[9px] font-bold text-white">Saiba mais</span>
        {!reduce && (
          <motion.span
            key={step}
            className="absolute right-6 top-6 h-6 w-6 rounded-full border-2 border-white"
            initial={{ scale: 0.3, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {[
          { icon: MousePointerClick, label: 'Cliques', value: clicks.toLocaleString('pt-BR'), tone: 'text-[#27594F]' },
          { icon: TrendingDown, label: 'Custo/lead', value: `R$ ${cpl.toFixed(1).replace('.', ',')}`, tone: 'text-emerald-700' },
          { icon: UserPlus, label: 'Leads', value: leads, tone: 'text-[#C97F38]' },
        ].map((m) => (
          <div key={m.label} className="rounded-lg bg-[#E8E7DF] px-2 py-1.5">
            <p className="flex items-center gap-1 text-[8px] uppercase tracking-wide text-[#4c524b]">
              <m.icon className="h-2.5 w-2.5" /> {m.label}
            </p>
            <p className={`font-mono text-[13px] font-bold ${m.tone}`}>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex h-12 items-end gap-1">
        {[30, 42, 38, 55, 61, 58, 72, 80, 76, 92].map((h, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-t ${i >= 7 ? 'bg-[#C97F38]' : 'bg-[#27594F]/40'}`}
            initial={reduce ? false : { height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- 02 · Sites e landing pages ---------------- */
export function SiteDemo({ reduce }: { reduce: boolean }) {
  return (
    <div className="w-[260px]">
      <PageBuilder reduce={reduce} />
    </div>
  );
}

/* ---------------- 03 · E-commerce ---------------- */
const CHECKOUT = ['Carrinho', 'Pagamento', 'Aprovado'];

export function CheckoutDemo({ reduce }: { reduce: boolean }) {
  const stage = useTicker(4, 1500, !reduce); // 0..3 (3 = aprovado em destaque)
  const s = reduce ? 2 : Math.min(stage, 2);

  return (
    <div className={`${card} relative w-[290px] p-3`}>
      <div className="mb-3 flex items-center justify-between">
        {CHECKOUT.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-300 ${
                i <= s ? 'bg-[#C97F38] text-white' : 'bg-[#E8E7DF] text-[#4c524b]'
              }`}
            >
              {i < s ? '✓' : i + 1}
            </span>
            <span className={`ml-1 text-[9px] font-semibold ${i <= s ? 'text-[#1c1c10]' : 'text-[#4c524b]/60'}`}>{label}</span>
            {i < 2 && (
              <span className="mx-1.5 h-px flex-1 bg-[#E8E7DF]">
                <motion.span
                  className="block h-px bg-[#C97F38]"
                  animate={{ width: i < s ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        {[
          { name: 'Produto premium', price: 'R$ 189,90', tone: 'bg-[#27594F]' },
          { name: 'Kit complementar', price: 'R$ 74,90', tone: 'bg-[#00616D]' },
        ].map((p) => (
          <div key={p.name} className="flex items-center gap-2 rounded-lg bg-[#E8E7DF] p-1.5">
            <span className={`h-8 w-8 rounded-md ${p.tone}`} />
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#1c1c10]">{p.name}</p>
              <p className="text-[9px] text-[#4c524b]">Qtd. 1</p>
            </div>
            <span className="font-mono text-[10px] font-bold text-[#1c1c10]">{p.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-[#27594F]/10 pt-2 text-[10px]">
        <span className="text-[#4c524b]">Total</span>
        <span className="font-mono font-bold text-[#1c1c10]">R$ 264,80</span>
      </div>

      <div className="mt-2 flex h-8 items-center justify-center rounded-lg bg-[#27594F] text-[10px] font-semibold text-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-1.5"
          >
            {s === 0 && (<><ShoppingCart className="h-3.5 w-3.5" /> Finalizar compra</>)}
            {s === 1 && (<><CreditCard className="h-3.5 w-3.5" /> Pix · Cartão · Boleto</>)}
            {s === 2 && (<><CheckCircle2 className="h-3.5 w-3.5" /> Pagamento confirmado</>)}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {(reduce || stage === 3) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute -right-6 -top-5 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#C97F38] text-white">
              <Heart className="h-3.5 w-3.5" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-semibold text-[#1c1c10]">Novo pedido #1042</p>
              <p className="text-[9px] text-[#4c524b]">R$ 264,80 · aprovado</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- 04 · Automações e IA ---------------- */
export function AutomationDemo({ reduce }: { reduce: boolean }) {
  return (
    <div className="w-[230px]">
      <AutomationFlow reduce={reduce} />
    </div>
  );
}

/* ---------------- 05 · Sistemas sob medida ---------------- */
const COLUMNS = ['Novo lead', 'Proposta', 'Fechado'];
const STATIC_CARDS = [
  { id: 'a', col: 0, name: 'Clínica Vita', value: 'R$ 4,2 mil' },
  { id: 'b', col: 1, name: 'Studio Lume', value: 'R$ 7,8 mil' },
  { id: 'c', col: 2, name: 'Grupo Norte', value: 'R$ 12 mil' },
];

export function KanbanDemo({ reduce }: { reduce: boolean }) {
  const pos = useTicker(3, 1500, !reduce);
  const movingCol = reduce ? 2 : pos;

  return (
    <div className={`${card} w-[320px] p-3`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#27594F]">Pipeline comercial</span>
        <span className="text-[9px] text-[#4c524b]">Sistema RUNA</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {COLUMNS.map((col, ci) => (
          <div key={col} className="min-h-[150px] rounded-lg bg-[#E8E7DF] p-1.5">
            <p className="mb-1.5 flex items-center justify-between text-[9px] font-semibold text-[#4c524b]">
              {col}
              <span className="rounded bg-white/70 px-1">{STATIC_CARDS.filter((c) => c.col === ci).length + (movingCol === ci ? 1 : 0)}</span>
            </p>
            <div className="space-y-1.5">
              {movingCol === ci && (
                <motion.div
                  layoutId="kanban-moving"
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className={`rounded-md border p-1.5 shadow-md ${ci === 2 ? 'border-emerald-500/50 bg-emerald-50' : 'border-[#C97F38] bg-white'}`}
                >
                  <p className="text-[9px] font-bold text-[#1c1c10]">Loja Aurora</p>
                  <p className="font-mono text-[9px] text-[#C97F38]">R$ 9,5 mil</p>
                  {ci === 2 && <CheckCircle2 className="mt-0.5 h-3 w-3 text-emerald-600" />}
                </motion.div>
              )}
              {STATIC_CARDS.filter((c) => c.col === ci).map((c) => (
                <div key={c.id} className="rounded-md bg-white/80 p-1.5">
                  <p className="text-[9px] font-semibold text-[#1c1c10]">{c.name}</p>
                  <p className="font-mono text-[9px] text-[#4c524b]">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 06 · Dados e analytics ---------------- */
export function DashboardDemo({ reduce }: { reduce: boolean }) {
  const cycle = useTicker(1000, 4500, !reduce);
  const roas = useCount(reduce ? 4.6 : cycle % 2 === 0 ? 4.6 : 4.9, 1.2, 1);

  return (
    <div className={`${card} w-[310px] p-3`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#27594F]">Painel executivo</span>
        <span className="text-[9px] text-[#4c524b]">Últimos 30 dias</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: 'Investido', value: 'R$ 8,4 mil', tone: 'text-[#1c1c10]' },
          { label: 'Leads', value: '312', tone: 'text-[#27594F]' },
          { label: 'ROAS', value: `${roas.toFixed(1).replace('.', ',')}x`, tone: 'text-[#C97F38]' },
        ].map((k) => (
          <div key={k.label} className="rounded-lg bg-[#E8E7DF] px-2 py-1.5">
            <p className="text-[8px] uppercase tracking-wide text-[#4c524b]">{k.label}</p>
            <p className={`whitespace-nowrap font-mono text-[12px] font-bold ${k.tone}`}>{k.value}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-2 rounded-lg bg-[#E8E7DF] p-2">
        <svg key={cycle} viewBox="0 0 280 90" className="h-24 w-full">
          {[22, 45, 68].map((y) => (
            <line key={y} x1="0" x2="280" y1={y} y2={y} stroke="#27594F" strokeOpacity="0.1" />
          ))}
          <motion.path
            d="M0 78 C 30 70, 50 72, 70 60 S 120 50, 140 46 S 190 30, 210 32 S 255 14, 280 10"
            fill="none"
            stroke="#C97F38"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <motion.path
            d="M0 84 C 40 80, 60 78, 90 72 S 150 66, 180 60 S 240 52, 280 48"
            fill="none"
            stroke="#27594F"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
          />
          <motion.circle
            cx="280"
            cy="10"
            r="4"
            fill="#C97F38"
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
        </svg>
        <div className="mt-1 flex items-center gap-3 text-[8px] text-[#4c524b]">
          <span className="flex items-center gap-1"><span className="h-0.5 w-3 bg-[#C97F38]" /> Receita atribuída</span>
          <span className="flex items-center gap-1"><span className="h-0.5 w-3 border-t border-dashed border-[#27594F]" /> Investimento</span>
          <span className="ml-auto flex items-center gap-0.5 font-semibold text-emerald-700"><TrendingUp className="h-3 w-3" /> +32%</span>
        </div>
      </div>
    </div>
  );
}
