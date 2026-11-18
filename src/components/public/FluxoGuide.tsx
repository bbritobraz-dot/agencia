'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import { AlertTriangle, Check, Copy, ShieldCheck, QrCode } from 'lucide-react';
import { FLUXO_CAMINHOS, FLUXO_CLAUDE_CODE, FLUXO_PASSOS, type FluxoCaminho } from '@/config/fluxo';

const CHAVE = 'runa-fluxo-v1';

interface Estado {
  caminho: FluxoCaminho;
  feitos: string[];
}

const PADRAO: Estado = { caminho: 'oficial', feitos: [] };
const EVENTO = 'runa-fluxo';
let memoria = ''; // usado quando o navegador não deixa gravar

function lerBruto(): string {
  try {
    return window.localStorage.getItem(CHAVE) ?? memoria;
  } catch {
    return memoria;
  }
}

function gravar(e: Estado) {
  memoria = JSON.stringify(e);
  try {
    window.localStorage.setItem(CHAVE, memoria);
  } catch {
    /* sem armazenamento: fica só nesta visita */
  }
  window.dispatchEvent(new Event(EVENTO));
}

function assinar(cb: () => void) {
  window.addEventListener(EVENTO, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENTO, cb);
    window.removeEventListener('storage', cb);
  };
}

function interpretar(bruto: string): Estado {
  try {
    const e = JSON.parse(bruto) as Estado;
    if (e.caminho === 'oficial' || e.caminho === 'qrcode') return { caminho: e.caminho, feitos: e.feitos || [] };
  } catch {
    /* vazio ou inválido */
  }
  return PADRAO;
}

function BlocoCodigo({ rotulo, texto }: { rotulo: string; texto: string }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* navegador sem permissão de copiar */
    }
  };
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#27594F]/40 bg-[#0f2420]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="text-xs font-semibold text-[#C1C0AC]">{rotulo}</span>
        <button
          type="button"
          onClick={copiar}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1 text-xs text-white transition hover:border-[#C97F38] hover:text-[#E9C08E]"
        >
          {copiado ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="max-h-[28rem] overflow-auto p-4 text-[12.5px] leading-relaxed text-[#E8E7DF]">
        <code>{texto}</code>
      </pre>
    </div>
  );
}

export function FluxoGuide() {
  const bruto = useSyncExternalStore(assinar, lerBruto, () => '');
  const estado = useMemo(() => interpretar(bruto), [bruto]);
  const setEstado = (fn: (e: Estado) => Estado) => gravar(fn(estado));

  const passos = useMemo(
    () => FLUXO_PASSOS.filter((p) => p.caminhos.includes(estado.caminho)),
    [estado.caminho]
  );
  const prompts = useMemo(
    () => FLUXO_CLAUDE_CODE.filter((p) => p.caminhos.includes(estado.caminho)),
    [estado.caminho]
  );
  const feitos = passos.filter((p) => estado.feitos.includes(p.id)).length;
  const pct = Math.round((feitos / passos.length) * 100);

  const alternar = (id: string) =>
    setEstado((e) => ({
      ...e,
      feitos: e.feitos.includes(id) ? e.feitos.filter((f) => f !== id) : [...e.feitos, id],
    }));

  return (
    <div>
      {/* Escolha do caminho */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Passo 0</span>
        <h2 className="mt-2 font-display text-3xl text-[#1d3b35] sm:text-4xl">Escolha como conectar o WhatsApp</h2>
        <p className="mt-3 max-w-2xl text-[#4a5a55]">
          O agente é o mesmo nos dois caminhos. Muda só a forma de ligar o número. O passo a passo abaixo se ajusta à sua escolha.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2" role="radiogroup" aria-label="Caminho de conexão">
          {(Object.keys(FLUXO_CAMINHOS) as FluxoCaminho[]).map((c) => {
            const info = FLUXO_CAMINHOS[c];
            const ativo = estado.caminho === c;
            const Icone = c === 'oficial' ? ShieldCheck : QrCode;
            return (
              <button
                key={c}
                type="button"
                role="radio"
                aria-checked={ativo}
                onClick={() => setEstado((e) => ({ ...e, caminho: c }))}
                className={`rounded-2xl border p-6 text-left transition ${
                  ativo
                    ? 'border-[#27594F] bg-white shadow-lg ring-2 ring-[#27594F]'
                    : 'border-[#d9d4c7] bg-white/60 hover:border-[#27594F]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${ativo ? 'bg-[#27594F] text-white' : 'bg-[#e9e6dc] text-[#27594F]'}`}>
                    <Icone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-[#1d3b35]">{info.nome}</p>
                    <p className="text-xs text-[#5e6b66]">{info.subtitulo}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-[#2b3a36]">
                  {info.pros.map((p) => (
                    <li key={p} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#27594F]" />{p}</li>
                  ))}
                  {info.contras.map((p) => (
                    <li key={p} className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#C97F38]" />{p}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-[#27594F]">Indicado para: <span className="font-normal text-[#4a5a55]">{info.indicado}</span></p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Passo a passo */}
      <section className="border-t border-[#e4e0d6] bg-[#f3f1ea] py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="sticky top-16 z-10 -mx-4 mb-8 border-b border-[#e4e0d6] bg-[#f3f1ea]/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#1d3b35]">{FLUXO_CAMINHOS[estado.caminho].nome}</span>
              <span className="text-[#5e6b66]">{feitos} de {passos.length} passos</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e0dccf]">
              <div className="h-full rounded-full bg-[#27594F] transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <ol className="space-y-5">
            {passos.map((p, i) => {
              const feito = estado.feitos.includes(p.id);
              return (
                <li key={p.id} id={p.id} className={`rounded-2xl border bg-white p-6 transition ${feito ? 'border-[#27594F]/40 opacity-80' : 'border-[#e4e0d6]'}`}>
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={() => alternar(p.id)}
                      aria-pressed={feito}
                      aria-label={feito ? `Desmarcar passo ${i + 1}` : `Marcar passo ${i + 1} como feito`}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg transition ${
                        feito ? 'border-[#27594F] bg-[#27594F] text-white' : 'border-[#C97F38] text-[#C97F38] hover:bg-[#C97F38]/10'
                      }`}
                    >
                      {feito ? <Check className="h-5 w-5" /> : i + 1}
                    </button>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-[#1d3b35]">{p.titulo}</h3>
                      <p className="mt-1 text-[#4a5a55]">{p.resumo}</p>
                      <ul className="mt-4 space-y-2 text-sm text-[#2b3a36]">
                        {p.itens.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C97F38]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {p.alerta && (
                        <div className="mt-4 flex gap-3 rounded-xl border border-[#C97F38]/40 bg-[#C97F38]/10 p-4 text-sm text-[#6b4318]">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          <p>{p.alerta}</p>
                        </div>
                      )}
                      {p.codigo && <BlocoCodigo rotulo={p.codigo.rotulo} texto={p.codigo.texto} />}
                      <button
                        type="button"
                        onClick={() => alternar(p.id)}
                        className="mt-5 text-sm font-semibold text-[#27594F] underline-offset-4 hover:underline"
                      >
                        {feito ? 'Desmarcar' : 'Marcar como feito'}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Claude Code */}
      <section id="claude-code" className="scroll-mt-20 border-t border-[#e4e0d6] py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">— Atalho</span>
          <h2 className="mt-2 font-display text-3xl text-[#1d3b35] sm:text-4xl">Monte com o Claude Code</h2>
          <p className="mt-3 max-w-3xl text-[#4a5a55]">
            O Claude Code é o Claude trabalhando no seu computador: ele cria os arquivos, escreve o código, roda os comandos e corrige os erros junto com você. Em vez de seguir cada passo sozinho, você pede e acompanha. Ele monta e mantém o agente; quem atende 24 horas é o agente rodando no servidor.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#e4e0d6] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">1 · Conta</p>
              <p className="mt-2 text-sm text-[#2b3a36]">
                Precisa de um plano pago do Claude (Pro, Max, Team ou Enterprise) ou de uma conta no Claude Console com créditos. O plano gratuito não inclui o Claude Code.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e4e0d6] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">2 · Instalação</p>
              <p className="mt-2 text-sm text-[#2b3a36]">No Mac ou Linux, no Terminal:</p>
              <code className="mt-2 block break-all rounded-lg bg-[#0f2420] px-3 py-2 text-xs text-[#E8E7DF]">curl -fsSL https://claude.ai/install.sh | bash</code>
              <p className="mt-2 text-sm text-[#2b3a36]">No Windows, no PowerShell:</p>
              <code className="mt-2 block break-all rounded-lg bg-[#0f2420] px-3 py-2 text-xs text-[#E8E7DF]">irm https://claude.ai/install.ps1 | iex</code>
            </div>
            <div className="rounded-2xl border border-[#e4e0d6] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">3 · Começar</p>
              <p className="mt-2 text-sm text-[#2b3a36]">Crie uma pasta para o projeto, entre nela e abra o Claude Code:</p>
              <code className="mt-2 block rounded-lg bg-[#0f2420] px-3 py-2 text-xs text-[#E8E7DF]">mkdir agente-whatsapp && cd agente-whatsapp && claude</code>
              <p className="mt-2 text-sm text-[#2b3a36]">Na primeira vez, ele pede para você entrar com a sua conta.</p>
            </div>
          </div>

          <p className="mt-10 text-sm font-semibold text-[#1d3b35]">
            Agora é conversar. Copie os pedidos abaixo, na ordem, trocando o que está entre {'<'} e {'>'} ({FLUXO_CAMINHOS[estado.caminho].nome.toLowerCase()}):
          </p>
          <ol className="mt-5 space-y-5">
            {prompts.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-[#e4e0d6] bg-white p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-[#C97F38]">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1d3b35]">{p.titulo}</h3>
                    <p className="mt-1 text-sm text-[#4a5a55]">{p.explicacao}</p>
                  </div>
                </div>
                <BlocoCodigo rotulo="Pedido para o Claude Code" texto={p.prompt} />
              </li>
            ))}
          </ol>
          <div className="mt-6 flex gap-3 rounded-xl border border-[#27594F]/30 bg-[#27594F]/5 p-4 text-sm text-[#2b3a36]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#27594F]" />
            <p>
              Leia o que o Claude Code vai fazer antes de aprovar cada comando, e nunca cole senhas ou chaves no chat: guarde-as em variáveis de ambiente, como ele mesmo vai sugerir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
