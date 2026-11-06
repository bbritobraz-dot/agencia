import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Building2,
  FlaskConical,
  Factory,
  KeyRound,
  LineChart,
  MessagesSquare,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { AUTHORIZED_PORTFOLIO } from '@/config/projects';
import { RUNA_SERVICES } from '@/config/services';
import { ServiceCtas } from '@/components/public/ServicePageParts';

export const metadata: Metadata = {
  title: 'Sobre a RUNA — Marketing, Tecnologia e Automação',
  description:
    'Conheça a RUNA e o Bruno, fundador: da engenharia e da gestão de um restaurante ao marketing orientado a dados para empresas que querem crescer.',
};

const LOGO = (n: number) => `/LOGOS/Logotipo_Runa%20Oficial%20(${n}).webp`;

const TRAJETORIA = [
  {
    icon: Building2,
    when: 'IFPR',
    title: 'Técnico em Edificações',
    text: 'A primeira formação: projeto, planejamento e execução com método.',
    brings: 'Pensar antes de construir',
  },
  {
    icon: FlaskConical,
    when: 'Unicamp · 2016',
    title: 'Engenharia Química',
    text: 'Entrou na Unicamp para estudar processos, dados e otimização.',
    brings: 'Raciocínio analítico',
  },
  {
    icon: UtensilsCrossed,
    when: '6 anos',
    title: 'Gerente de restaurante',
    text: 'Durante a graduação, comandou a operação de um restaurante: equipe, atendimento, caixa e vendas todos os dias.',
    brings: 'Visão de quem toca um negócio',
  },
  {
    icon: Factory,
    when: 'Ypê',
    title: 'Estágio em engenharia de processos',
    text: 'Na indústria, viu de perto como processos bem desenhados escalam com eficiência.',
    brings: 'Processos que escalam',
  },
  {
    icon: LineChart,
    when: 'Hoje',
    title: 'RUNA',
    text: 'Deixou a engenharia para se dedicar ao marketing orientado a dados e a soluções que geram resultado.',
    brings: 'Marketing com método',
    current: true,
  },
];

const COMPROMISSOS = [
  {
    icon: MessagesSquare,
    title: 'Você fala com quem faz',
    text: 'Comunicação direta com quem está executando o projeto, sem intermediários.',
  },
  {
    icon: KeyRound,
    title: 'Tudo é seu',
    text: 'Contas de anúncio, código, dados e automações pertencem à sua empresa. Sem fidelidade forçada.',
  },
  {
    icon: LineChart,
    title: 'Decisão com dados',
    text: 'Cada ação parte de um diagnóstico e é acompanhada por números que você entende.',
  },
];

export default function SobrePage() {
  const stats = [
    { n: AUTHORIZED_PORTFOLIO.length, label: 'projetos no ar' },
    { n: RUNA_SERVICES.length, label: 'soluções integradas' },
    { n: 5, label: 'parcerias oficiais' },
  ];

  return (
    <div>
      {/* 1. Topo */}
      <section className="relative isolate overflow-hidden border-b border-[#27594F] bg-runa-pattern-dark py-16 text-white lg:py-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO(19)}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-[44rem] w-[44rem] -translate-y-1/2 animate-[spin_90s_linear_infinite] opacity-[0.14] motion-reduce:animate-none"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Sobre a RUNA</span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
              Marketing com cabeça de engenheiro e experiência de quem já tocou um negócio.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[#E8E7DF]/85 sm:text-lg">
              A RUNA une aquisição de clientes, sites, automações e dados em um único sistema. Porque crescimento previsível não vem de ações soltas: vem de processos que funcionam juntos.
            </p>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dd className="font-display text-3xl text-white sm:text-4xl">{s.n}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-widest text-[#C1C0AC]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2. Fundador */}
      <section className="overflow-hidden border-b border-[#d8d7cf] bg-[#fcfae5] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="px-3 sm:px-0 lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div aria-hidden className="absolute -inset-3 rotate-3 rounded-[2rem] bg-[#C97F38]/25" />
              <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-[#fcfae5] shadow-2xl shadow-[#13302a]/25">
                <Image
                  src="/equipe/bruno.webp"
                  alt="Bruno, fundador da RUNA"
                  width={1122}
                  height={1402}
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="h-auto w-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl bg-[#1e4840] px-4 py-3 text-white shadow-xl sm:-right-6">
                <span className="relative inline-block h-6 w-6 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO(20)} alt="" className="absolute inset-0 h-full w-full scale-[4.2] object-contain" />
                </span>
                <span className="text-xs font-semibold leading-tight">
                  Fundador &<br />Estrategista Digital
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Quem está por trás</span>
            <h2 className="font-display text-3xl leading-tight text-[#1c1c10] sm:text-5xl">Prazer, Bruno.</h2>
            <p className="text-lg leading-relaxed text-[#1c1c10]">
              Antes de cuidar do marketing de outras empresas, o Bruno passou seis anos gerenciando um restaurante: equipe, atendimento, caixa e vendas, todos os dias.
            </p>
            <p className="text-base leading-relaxed text-[#4c524b]">
              Ao mesmo tempo, estudava Engenharia Química na Unicamp, depois de se formar técnico em Edificações pelo IFPR, e estagiou em engenharia de processos na Ypê. Da engenharia, trouxe o método: medir, testar e melhorar processos. Do restaurante, trouxe o olhar de dono: cada real investido precisa voltar.
            </p>
            <p className="text-base leading-relaxed text-[#4c524b]">
              É essa combinação que guia a RUNA: marketing orientado a dados, com soluções que resolvem o problema real da operação.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Trajetória */}
      <section className="border-b border-[#d8d7cf] bg-[#E8E7DF] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Trajetória</span>
            <h2 className="mt-2 font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">
              Cada etapa deixou algo na forma como a RUNA trabalha.
            </h2>
          </div>

          <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-4">
            <span aria-hidden className="absolute left-7 top-7 bottom-7 w-0.5 bg-gradient-to-b from-[#27594F]/20 to-[#C97F38] lg:hidden" />
            <span aria-hidden className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-gradient-to-r from-[#27594F]/20 to-[#C97F38] lg:block" />
            {TRAJETORIA.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <span
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 ${
                      step.current ? 'border-[#C97F38] bg-[#1e4840] text-[#C97F38]' : 'border-[#27594F]/25 bg-[#fcfae5] text-[#27594F]'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex-1 lg:mt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C97F38]">{step.when}</p>
                    <h3 className="mt-1 font-display text-xl text-[#1c1c10]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4c524b]">{step.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#C97F38]/30 bg-[#fcfae5] px-3 py-1 text-[11px] font-semibold text-[#1c1c10]">
                      <Sparkles className="h-3 w-3 text-[#C97F38]" />
                      {step.brings}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 4. Compromissos */}
      <section className="border-b border-[#d8d7cf] bg-[#fcfae5] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Como trabalhamos</span>
            <h2 className="mt-2 font-display text-3xl leading-tight text-[#1c1c10] sm:text-4xl">Três compromissos com cada cliente</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {COMPROMISSOS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-[#d8d7cf] bg-[#E8E7DF]/60 p-6 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27594F] text-[#C97F38]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-2xl text-[#1c1c10]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4c524b]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Próximo passo */}
      <section className="bg-runa-pattern-dark py-16 text-white lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">Vamos conversar sobre a sua empresa?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[#E8E7DF]/85">
            Conte seu desafio no WhatsApp, sem compromisso. Ou faça o diagnóstico e veja sua nota em 2 minutos.
          </p>
          <div className="mt-8">
            <ServiceCtas slug="sobre" shortTitle="Sobre a RUNA" tone="dark" align="center" />
          </div>
        </div>
      </section>
    </div>
  );
}
