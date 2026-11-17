import Link from 'next/link';
import { BlogPost } from '@/config/blog';
import { GenericInteractiveChecklist } from '@/components/blog/GenericInteractiveChecklist';
import { ArrowRight, Sparkles } from 'lucide-react';

function CitationRef({ ids }: { ids: number[] }) {
  return (
    <sup className="ml-0.5 inline-flex items-center gap-0.5 font-sans text-[11px] font-semibold">
      {ids.map((id) => (
        <a
          key={id}
          href={`#fonte-${id}`}
          className="text-[#C97F38] hover:text-[#27594F] hover:underline px-0.5"
          title={`Ver fonte oficial [${id}]`}
        >
          [{id}]
        </a>
      ))}
    </sup>
  );
}

/* ============================================================================
 * ARTIGO 1: Google Ads mais caro em 2027: como preparar o orçamento da sua empresa
 * ============================================================================ */
export function GoogleAdsReajuste2027Content({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Se sua empresa anuncia pelo Google Brasil e paga em reais, o planejamento de 2027 precisa considerar uma mudança: a partir de 1º de janeiro, haverá um <strong className="font-semibold text-[#1e4840]">reajuste de 2,9% sobre os custos de publicidade</strong>.
        </p>

        <p>
          A cobrança depende do faturamento da conta, independentemente do país onde os anúncios aparecem. O comunicado também abrange Display &amp; Video 360 e reservas do YouTube.
          <CitationRef ids={[1]} />
        </p>

        <p>
          Para o empresário, a decisão começa por uma pergunta: o orçamento definido representa a verba de veiculação ou o limite total que a empresa pode pagar?
        </p>
      </div>

      {/* Quanto isso representa na prática? */}
      <section id="quanto-isso-representa-na-pratica" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Quanto isso representa na prática?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            A tabela considera somente mídia e reajuste, sem impostos ou serviços de gestão:
          </p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Simulação de Reajuste (2,9%) Sobre o Investimento em Mídia
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Investimento em mídia</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Reajuste (2,9%)</th>
                  <th className="p-3.5 font-semibold text-[#1c1c10]">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">R$ 1.000,00</td>
                  <td className="p-3.5">R$ 29,00</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">R$ 1.029,00</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">R$ 3.000,00</td>
                  <td className="p-3.5">R$ 87,00</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">R$ 3.087,00</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">R$ 5.000,00</td>
                  <td className="p-3.5">R$ 145,00</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">R$ 5.145,00</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">R$ 10.000,00</td>
                  <td className="p-3.5">R$ 290,00</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">R$ 10.290,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>Existe outra maneira de olhar para essa conta.</p>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <p className="text-sm sm:text-base leading-relaxed text-[#1c1c10]">
              Se o teto disponível for <strong className="font-semibold text-[#1e4840]">R$ 1.000</strong> para mídia e reajuste, a parcela destinada à veiculação será aproximadamente <strong className="font-semibold text-[#b06b29]">R$ 971,82</strong>. O cálculo é <code className="rounded bg-[#E8E7DF] px-1.5 py-0.5 text-xs text-[#1e4840]">R$ 1.000 ÷ 1,029</code>.
            </p>
          </div>

          <p>
            Essa simulação ainda não inclui tributos. Ela serve para mostrar por que manter o mesmo desembolso pode exigir uma redução da verba de mídia.
          </p>
        </div>
      </section>

      {/* Como o ajuste será cobrado? */}
      <section id="como-o-ajuste-sera-cobrado" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Como o ajuste será cobrado?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Nas contas pós-pagas, o ajuste aparecerá separado no extrato de faturamento. Nas pré-pagas, será descontado do saldo. Na nota fiscal, integrará o valor do serviço.
          </p>
          <p>
            O Google apresenta esse aumento como parte do preço da publicidade. CBS e IBS são tributos independentes, e a documentação não estabelece uma alíquota definitiva para usar como regra geral nos cálculos.
            <CitationRef ids={[1]} />
          </p>
        </div>
      </section>

      {/* O que revisar antes de aumentar ou reduzir a verba */}
      <section id="o-que-revisar-antes-de-alterar-verba" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que revisar antes de aumentar ou reduzir a verba
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Nossa recomendação é aproveitar a mudança para revisar quatro pontos da operação.
        </p>

        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              1. Separe o custo da plataforma do custo da operação
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Uma planilha útil precisa mostrar quanto vai para veiculação, quanto corresponde a cobranças adicionais e quanto custa executar a estratégia.
            </p>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Gestão, produção de peças, ferramentas e atendimento comercial também consomem recursos. Essa separação permite entender o custo de conquistar clientes sem misturar despesas diferentes.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              2. Identifique quais campanhas geram negócios
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Uma campanha com muitos cliques pode produzir poucos pedidos de orçamento. Outra, com menor volume, pode trazer contratos mais interessantes.
            </p>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Antes de redistribuir verba, confira quais campanhas geraram contatos qualificados, propostas e vendas. Considere também o tempo que cada oportunidade leva para fechar. O investimento deve conversar com o resultado comercial que sua empresa consegue observar.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              3. Revise o caminho depois do clique
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Imagine uma empresa de persianas anunciando instalação sob medida. O visitante clica e encontra uma página que não explica a região atendida, o processo de medição ou como pedir orçamento.
            </p>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Nesse caso, existe uma oportunidade de melhoria antes de ampliar o investimento: tornar a decisão mais clara. Revise a oferta, a página de destino, os formulários e a chegada do contato ao atendimento. Cada etapa precisa dar continuidade à anterior.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              4. Ajuste a meta junto com o orçamento
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Se a verba de veiculação mudar, a projeção de oportunidades também precisa ser reavaliada. Registre as hipóteses utilizadas: custo por contato, proporção de contatos qualificados, taxa de fechamento e valor médio vendido. Depois, compare essas hipóteses com o resultado observado.
            </p>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Assim, a revisão deixa de ser apenas uma alteração de valor no painel.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist-planejamento-2027" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist para o planejamento de 2027"
          items={[
            {
              id: 'distingue-custos',
              title: 'O orçamento distingue mídia, cobranças adicionais e gestão.',
            },
            {
              id: 'limite-desembolso',
              title: 'A equipe conhece o limite total de desembolso.',
            },
            {
              id: 'contatos-acompanhados',
              title: 'Os contatos são acompanhados até a proposta e a venda.',
            },
            {
              id: 'paginas-revisadas',
              title: 'As páginas dos serviços prioritários foram revisadas.',
            },
            {
              id: 'metas-recalculadas',
              title: 'As metas comerciais foram recalculadas com cenários diferentes.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="prepare-o-orcamento"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Prepare o orçamento com uma visão completa
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA conecta{' '}
          <Link href="/solucoes/gestao-de-trafego-pago" className="font-semibold text-[#e59a54] underline hover:text-white">
            gestão de tráfego
          </Link>
          ,{' '}
          <Link href="/solucoes/sites-e-landing-pages" className="font-semibold text-[#e59a54] underline hover:text-white">
            páginas de conversão
          </Link>{' '}
          e informações comerciais para ajudar sua empresa a decidir onde investir.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Converse com a nossa equipe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
 * ARTIGO 2: Seu site recebe visitas, mas não gera clientes? Veja o que revisar
 * ============================================================================ */
export function SiteVisitasSemClientesContent({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          O anúncio recebe cliques. O relatório mostra visitantes. Mas o WhatsApp continua parado e os pedidos de orçamento não aparecem.
        </p>
        <p>
          Nesse momento, aumentar a verba parece uma solução rápida. Antes disso, vale entender o que acontece entre a chegada ao site e o início de uma conversa.
        </p>
        <p>
          O visitante precisa <strong className="font-semibold text-[#1e4840]">reconhecer a oferta, confiar na empresa e encontrar um próximo passo simples</strong>. Quando uma dessas etapas falha, a visita pode terminar sem contato.
        </p>
      </div>

      {/* 1. A página continua a conversa iniciada pelo anúncio? */}
      <section id="a-pagina-continua-a-conversa" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          1. A página continua a conversa iniciada pelo anúncio?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Imagine alguém pesquisando persianas sob medida para uma sala com muito sol.
          </p>
          <p>
            O anúncio promete orientação na escolha e instalação. Depois do clique, a pessoa chega a uma página genérica, com uma apresentação longa da empresa e poucas informações sobre o serviço. O visitante precisa reconstruir sozinho o caminho até a solução.
          </p>
          <p>
            O Google recomenda que a página de destino corresponda ao anúncio, às palavras-chave e à ação proposta.
            <CitationRef ids={[1]} /> Na prática, isso significa apresentar rapidamente aquilo que motivou o clique.
          </p>
          <p>Uma página desse serviço poderia começar com:</p>

          <blockquote className="rounded-2xl border-l-4 border-[#C97F38] bg-white/85 p-5 sm:p-6 text-sm sm:text-base italic leading-relaxed text-[#1e4840] shadow-sm">
            “Persianas sob medida para controlar a luz e trazer mais conforto ao ambiente. Conheça as opções e solicite uma avaliação para o seu projeto.”
          </blockquote>

          <p>
            O texto deve refletir o que a empresa realmente oferece, incluindo região atendida e condições relevantes.
          </p>
        </div>
      </section>

      {/* 2. O visitante entende por que escolher sua empresa? */}
      <section id="o-visitante-entende-por-que-escolher" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          2. O visitante entende por que escolher sua empresa?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Expressões como “qualidade”, “excelência” e “compromisso” são difíceis de avaliar sem evidências. Troque afirmações genéricas por informações que ajudem na decisão:
          </p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Substituindo Afirmações Genéricas por Evidências de Decisão
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#b06b29]">Informação vaga</th>
                  <th className="p-3.5 font-semibold text-[#1e4840]">Informação que ajuda a avaliar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Atendimento diferenciado</td>
                  <td className="p-3.5">Como funciona a orientação antes da compra</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Serviço de qualidade</td>
                  <td className="p-3.5">Materiais, etapas e cuidados adotados</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Empresa de confiança</td>
                  <td className="p-3.5">Identificação, trabalhos reais e depoimentos autorizados</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Solução completa</td>
                  <td className="p-3.5">O que está incluído e o que precisa ser contratado à parte</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Uma empresa de serviços pode mostrar um projeto, explicar o problema inicial e apresentar como o trabalho foi executado. Esse conteúdo aproxima o visitante da experiência real de contratação.
          </p>
        </div>
      </section>

      {/* 3. Pedir orçamento exige esforço demais? */}
      <section id="pedir-orcamento-exige-esforco-demais" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          3. Pedir orçamento exige esforço demais?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Abra sua página no celular e tente realizar a ação principal. Observe se o botão aparece com clareza, se o formulário funciona e se o visitante entende o que acontecerá depois do envio.
          </p>
          <p>
            Nossa recomendação é pedir, no primeiro contato, as informações necessárias para encaminhar a conversa. Um orçamento técnico pode exigir detalhes, mas nem todos precisam ser coletados na primeira tela.
          </p>
          <p>
            Também vale testar situações menos favoráveis: conexão móvel, teclado aberto, tela pequena e navegação pelo navegador interno de aplicativos. Uma página bonita precisa funcionar nessas condições.
          </p>
        </div>
      </section>

      {/* 4. O botão explica o próximo passo? */}
      <section id="o-botao-explica-o-proximo-passo" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          4. O botão explica o próximo passo?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            “Saiba mais” pode funcionar em alguns contextos. Em outros, o visitante precisa de uma orientação mais concreta. Compare:
          </p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>“Solicitar orçamento para meu projeto.”</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>“Conversar sobre o serviço.”</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>“Agendar uma avaliação.”</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>“Consultar disponibilidade.”</span>
            </li>
          </ul>

          <p>
            Escolha uma ação compatível com o atendimento que sua empresa realmente consegue oferecer. Se o botão promete orçamento, a conversa seguinte precisa ajudar a construir esse orçamento.
          </p>
        </div>
      </section>

      {/* 5. Você está medindo contato ou apenas intenção? */}
      <section id="medindo-contato-ou-intencao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          5. Você está medindo contato ou apenas intenção?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Um clique no botão do WhatsApp mostra que alguém tentou avançar. Ele não comprova que a pessoa enviou uma mensagem. Da mesma forma, um formulário enviado não significa automaticamente uma oportunidade qualificada.
          </p>
          <p>Organize a leitura em etapas:</p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Leitura do Funil: Da Visita à Venda
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Etapa</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Pergunta que ela responde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Visita à página</td>
                  <td className="p-3.5">As pessoas estão chegando?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Clique no botão</td>
                  <td className="p-3.5">A página desperta intenção de contato?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Formulário recebido ou conversa iniciada</td>
                  <td className="p-3.5">O contato aconteceu?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Lead qualificado</td>
                  <td className="p-3.5">Existe uma demanda compatível?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Proposta e venda</td>
                  <td className="p-3.5">A oportunidade avançou comercialmente?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Essa separação ajuda a localizar o problema. Se há muitos cliques no botão e poucas conversas identificadas, investigue a passagem para o atendimento e a mensuração antes de concluir que faltam visitantes.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist-revisar-pagina" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist para revisar sua página"
          items={[
            {
              id: 'primeira-tela-servico',
              title: 'A primeira tela apresenta o serviço anunciado.',
            },
            {
              id: 'regiao-condicoes',
              title: 'A região atendida e as condições relevantes estão claras.',
            },
            {
              id: 'evidencias-reais',
              title: 'Existem evidências reais do trabalho.',
            },
            {
              id: 'contato-celular',
              title: 'O caminho de contato funciona no celular.',
            },
            {
              id: 'distingue-intencao-venda',
              title: 'A empresa distingue intenção, contato e venda.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="descubra-onde-perde-oportunidades"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Descubra onde sua empresa perde oportunidades
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA desenvolve{' '}
          <Link href="/solucoes/sites-e-landing-pages" className="font-semibold text-[#e59a54] underline hover:text-white">
            sites e landing pages
          </Link>{' '}
          conectados à estratégia de aquisição e ao atendimento comercial.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Falar com a equipe RUNA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
 * ARTIGO 3: Lead barato ou lead qualificado: o que sua empresa deve acompanhar
 * ============================================================================ */
export function LeadBaratoOuQualificadoContent({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Sua campanha conseguiu reduzir o custo por contato. O relatório parece melhor, mas a equipe comercial continua dizendo que as conversas não avançam.
        </p>
        <p>
          Para entender essa situação, é preciso acompanhar o que acontece depois que alguém deixa o telefone ou chama no WhatsApp.
        </p>
        <p>
          O custo por lead mostra quanto foi necessário investir para gerar um contato. O valor desse contato para a empresa depende das etapas seguintes.
        </p>
      </div>

      {/* Exemplo comparativo */}
      <section id="campanha-menos-contatos-mais-vendas" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Um exemplo: a campanha com menos contatos pode gerar mais vendas
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Considere duas campanhas fictícias, com o mesmo investimento e tempo suficiente para acompanhar os fechamentos:
          </p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Simulação Comparativa: Custo por Contato vs. Custo por Venda
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1c1c10]">Indicador</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Campanha A</th>
                  <th className="p-3.5 font-semibold text-[#1e4840]">Campanha B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Investimento em mídia</td>
                  <td className="p-3.5">R$ 1.000</td>
                  <td className="p-3.5">R$ 1.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Contatos recebidos</td>
                  <td className="p-3.5">100</td>
                  <td className="p-3.5">50</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Contatos qualificados</td>
                  <td className="p-3.5">10</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">20</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Vendas</td>
                  <td className="p-3.5">2</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">5</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Custo por contato</td>
                  <td className="p-3.5">R$ 10</td>
                  <td className="p-3.5">R$ 20</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Custo por contato qualificado</td>
                  <td className="p-3.5">R$ 100</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">R$ 50</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Custo de mídia por venda</td>
                  <td className="p-3.5 font-semibold text-[#b06b29]">R$ 500</td>
                  <td className="p-3.5 font-bold text-[#1e4840]">R$ 200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Na simulação, a campanha B custa mais por contato e menos por venda. Para comparar o resultado econômico completo, ainda seria necessário considerar valor vendido, margem, cancelamentos e outros custos de aquisição.
          </p>
          <p>
            Os números são ilustrativos. Eles mostram como uma decisão baseada apenas no custo por lead pode ignorar o resultado comercial.
          </p>
        </div>
      </section>

      {/* O que significa lead qualificado */}
      <section id="o-que-significa-lead-qualificado" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que significa “lead qualificado” na sua empresa?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            A definição precisa ser simples o suficiente para orientar o atendimento. Para uma empresa de instalação de persianas, uma oportunidade qualificada poderia ser alguém que:
          </p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Está na região atendida.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Procura um serviço que a empresa oferece.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Tem um projeto ou necessidade identificável.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Aceita avançar para a próxima etapa de avaliação.</span>
            </li>
          </ul>

          <p>
            Uma pergunta sobre preço, sozinha, não torna um contato ruim. Muitas pessoas precisam compreender a faixa de investimento antes de avançar.
          </p>
          <p>
            Também evite classificar automaticamente como desqualificado quem não respondeu à primeira tentativa. Registre separadamente ausência de resposta e incompatibilidade com a oferta.
          </p>
        </div>
      </section>

      {/* Organize etapas que representem acontecimentos reais */}
      <section id="organize-etapas-reais" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Organize etapas que representem acontecimentos reais
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Um CRM pode começar com uma estrutura enxuta:
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Estrutura Enxuta de Funil Comercial no CRM
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Etapa</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Critério para avançar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Novo contato</td>
                  <td className="p-3.5">O pedido foi recebido</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Em atendimento</td>
                  <td className="p-3.5">Houve uma interação útil</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Qualificado</td>
                  <td className="p-3.5">A necessidade corresponde aos critérios definidos</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Proposta enviada</td>
                  <td className="p-3.5">Uma proposta foi apresentada</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1e4840]">Fechado</td>
                  <td className="p-3.5">A venda foi confirmada</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#b06b29]">Perdido</td>
                  <td className="p-3.5">O encerramento tem um motivo registrado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Cada oportunidade também precisa de um responsável e uma próxima ação. Sem isso, o quadro pode ficar visualmente organizado enquanto os contatos permanecem esquecidos.
        </p>
      </section>

      {/* O CRM também pode ajudar as plataformas de anúncios */}
      <section id="crm-ajuda-plataformas-anuncios" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O CRM também pode ajudar as plataformas de anúncios
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O Google permite importar resultados que acontecem depois do contato inicial, incluindo etapas como lead qualificado ou convertido.
            <CitationRef ids={[1]} />
          </p>
          <p>
            A Meta também documenta integrações que enviam informações do CRM para apoiar a otimização de qualidade em anúncios de leads.
            <CitationRef ids={[2]} />
          </p>
          <p>
            Essas conexões exigem configuração e validação. Mover um cartão de coluna não informa automaticamente as plataformas. A equipe precisa verificar quais eventos serão enviados, como serão associados ao contato e se estão chegando corretamente. A coleta e o compartilhamento devem respeitar as permissões aplicáveis.
          </p>
          <p>
            O objetivo é fazer a mensuração representar melhor o processo comercial. A integração, por si só, não garante mais vendas.
          </p>
        </div>
      </section>

      {/* Reunião de resultado */}
      <section id="reuniao-de-resultado-em-decisao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Faça uma reunião de resultado que termine em decisão
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Nossa recomendação é revisar periodicamente três perguntas:
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              Quais campanhas trouxeram oportunidades compatíveis?
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Observe a origem dos contatos qualificados, considerando volume e custo.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              Onde essas oportunidades pararam?
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Uma concentração de perdas antes da proposta pede uma investigação diferente de perdas depois da apresentação do preço.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              O que será ajustado?
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              A decisão pode envolver anúncio, oferta, página, atendimento ou acompanhamento comercial. Registre a mudança e o resultado esperado. Também considere o ciclo de venda: comparar uma campanha antiga com contatos recém-chegados pode favorecer artificialmente a primeira.
            </p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist-melhorar-analise" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist para melhorar a análise"
          items={[
            {
              id: 'definicao-compartilhada',
              title: 'Existe uma definição compartilhada de lead qualificado.',
            },
            {
              id: 'origem-registrada',
              title: 'A origem dos contatos é registrada quando identificável.',
            },
            {
              id: 'responsavel-proxima-acao',
              title: 'Oportunidades têm responsável e próxima ação.',
            },
            {
              id: 'motivos-perda',
              title: 'Motivos de perda são separados.',
            },
            {
              id: 'mesmos-criterios',
              title: 'Marketing e comercial analisam os mesmos critérios.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="conecte-anuncios-ao-comercial"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Conecte os anúncios ao que acontece no comercial
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA ajuda a estruturar campanhas,{' '}
          <Link href="/solucoes/dados-e-analytics" className="font-semibold text-[#e59a54] underline hover:text-white">
            mensuração
          </Link>{' '}
          e{' '}
          <Link href="/solucoes/sistemas-sob-medida" className="font-semibold text-[#e59a54] underline hover:text-white">
            CRMs sob medida
          </Link>{' '}
          para acompanhar oportunidades até o fechamento.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Converse com nossa equipe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
 * ARTIGO 4: Google Ads ou Meta Ads: onde faz sentido investir primeiro?
 * ============================================================================ */
export function GoogleAdsOuMetaAdsContent({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Uma empresa recebe uma proposta para anunciar no Google. Outra agência recomenda Instagram e Facebook. As duas opções parecem fazer sentido, mas o orçamento não permite testar tudo ao mesmo tempo.
        </p>
        <p>Como escolher?</p>
        <p>
          Nossa recomendação é começar pelo <strong className="font-semibold text-[#1e4840]">comportamento de compra</strong>: como o cliente percebe a necessidade, procura uma solução e decide contratar? Essa leitura ajuda a definir o papel de cada canal.
        </p>
      </div>

      {/* Quando a pesquisa do Google merece atenção */}
      <section id="quando-pesquisa-google-merece-atencao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Quando a pesquisa do Google merece atenção
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            As campanhas de pesquisa permitem alcançar pessoas enquanto elas procuram produtos e serviços no Google.
            <CitationRef ids={[1]} />
          </p>
          <p>Pense em buscas como:</p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Instalação de persianas em uma determinada cidade.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Empresa de transporte para uma rota.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Contabilidade para abertura de empresa.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Manutenção de um equipamento específico.</span>
            </li>
          </ul>

          <p>
            Essas pesquisas ajudam a formular uma hipótese: existe uma demanda que a empresa pode atender no momento em que alguém procura por ela. A oportunidade depende de fatores como volume de buscas, concorrência, região e capacidade de transformar a visita em contato.
          </p>
          <p>
            Antes de investir, vale examinar quais termos representam uma necessidade comercial compatível com a oferta.
          </p>
        </div>
      </section>

      {/* Quando a descoberta nas redes sociais pode fazer sentido */}
      <section id="quando-descoberta-redes-sociais-faz-sentido" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Quando a descoberta nas redes sociais pode fazer sentido
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            No Instagram e no Facebook, uma empresa pode apresentar sua oferta durante o consumo de conteúdo. As tecnologias de publicidade da Meta permitem campanhas para esses ambientes.
            <CitationRef ids={[2]} />
          </p>
          <p>
            Nossa leitura estratégica é que esse contexto favorece testes de demonstração, apresentação de problemas e explicação de benefícios.
          </p>
          <p>
            Uma empresa de persianas, por exemplo, pode mostrar como diferentes materiais alteram a iluminação de um ambiente. Uma transportadora pode apresentar sua operação e explicar situações em que determinado serviço faz sentido.
          </p>
          <p>
            A pessoa pode se interessar antes de formular uma pesquisa específica. Isso exige uma comunicação capaz de apresentar contexto rapidamente e conduzir ao próximo passo.
          </p>
        </div>
      </section>

      {/* Compare situações concretas */}
      <section id="compare-situacoes-concretas" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Compare situações concretas
        </h2>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Critérios de Planejamento: Escolha Inicial de Canal
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Situação da empresa</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Hipótese inicial de investimento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Existe procura clara por um serviço específico</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">Testar pesquisa no Google</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">A oferta ganha força quando demonstrada visualmente</td>
                  <td className="p-3.5 font-semibold text-[#b06b29]">Testar criativos na Meta</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">O cliente precisa compreender uma solução pouco conhecida</td>
                  <td className="p-3.5">Priorizar comunicação explicativa</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Há demanda e estrutura comercial nos dois caminhos</td>
                  <td className="p-3.5">Planejar canais complementares</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">O orçamento comporta poucas oportunidades de aprendizado</td>
                  <td className="p-3.5">Concentrar o primeiro teste</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Essa tabela é um critério de planejamento, não uma regra de desempenho. O Google também oferece formatos visuais e de vídeo. A Meta também pode alcançar pessoas próximas da decisão de compra. A comparação aqui considera principalmente pesquisa no Google e descoberta nos feeds das redes sociais.
          </p>
        </div>
      </section>

      {/* A mesma empresa pode usar os dois canais */}
      <section id="mesma-empresa-dois-canais" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          A mesma empresa pode usar os dois canais
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Considere uma loja de móveis planejados. Nas redes sociais, ela apresenta ambientes, materiais e etapas do projeto. Na pesquisa, pode alcançar pessoas buscando fornecedores na região.
          </p>
          <p>
            Os canais participam de momentos diferentes de uma jornada que nem sempre é linear. O cuidado está na análise: uma pessoa pode conhecer a empresa por um anúncio e depois pesquisar seu nome. Por isso, atribuir todo o mérito a uma única interação pode simplificar demais o processo.
          </p>
        </div>
      </section>

      {/* O que preparar antes do primeiro teste */}
      <section id="o-que-preparar-antes-primeiro-teste" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que preparar antes do primeiro teste
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Escolha um serviço prioritário e uma região compatível com a operação. Depois, defina a ação desejada: pedir orçamento, conversar, agendar ou comprar. Prepare a página ou o atendimento para receber essa demanda.
          </p>
          <p>
            Por fim, determine o que será avaliado. Além de cliques e contatos, registre quantas oportunidades avançam comercialmente.
          </p>
          <p>
            O Planejador de Palavras-chave pode apoiar a análise de demanda e as projeções de pesquisa, mas suas estimativas não representam garantia de resultado.
            <CitationRef ids={[3]} />
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist-escolher-com-clareza" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist para escolher com mais clareza"
          items={[
            {
              id: 'comportamento-procura',
              title: 'Sei como o cliente costuma procurar ou descobrir minha solução.',
            },
            {
              id: 'oferta-prioritaria',
              title: 'Tenho uma oferta prioritária para testar.',
            },
            {
              id: 'materiais-canal',
              title: 'Consigo produzir os materiais necessários para o canal.',
            },
            {
              id: 'atendimento-preparado',
              title: 'O atendimento está preparado para receber os contatos.',
            },
            {
              id: 'analise-oportunidades-vendas',
              title: 'A análise vai acompanhar oportunidades e vendas.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="escolha-o-canal-a-partir-do-negocio"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Escolha o canal a partir do seu negócio
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA estrutura{' '}
          <Link href="/solucoes/gestao-de-trafego-pago" className="font-semibold text-[#e59a54] underline hover:text-white">
            estratégias de tráfego pago
          </Link>{' '}
          considerando oferta, jornada de compra e operação comercial.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Falar com a equipe RUNA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
 * ARTIGO 5: Perfil da Empresa no Google: como melhorar sua presença nas buscas locais
 * ============================================================================ */
export function PerfilEmpresaGoogleContent({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Uma pessoa recebe a indicação da sua empresa e pesquisa o nome no Google.
        </p>
        <p>
          Antes de conversar com você, ela pode olhar fotos, horário de funcionamento, avaliações, endereço e site. Essas informações ajudam a formar uma primeira impressão sobre o atendimento.
        </p>
        <p>
          O <strong className="font-semibold text-[#1e4840]">Perfil da Empresa</strong> precisa acompanhar a realidade da operação. Um telefone antigo, uma informação incompleta ou fotos que já não representam o negócio podem dificultar o próximo passo.
        </p>
      </div>

      {/* Como o Google organiza os resultados locais? */}
      <section id="como-google-organiza-resultados-locais" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Como o Google organiza os resultados locais?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O Google informa que a classificação local considera principalmente relevância, distância e destaque ou popularidade.
            <CitationRef ids={[1]} /> Em linguagem simples:
          </p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Pilares de Classificação nas Buscas Locais do Google
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Fator</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">O que representa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Relevância</td>
                  <td className="p-3.5">Correspondência entre o negócio e a pesquisa</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Distância</td>
                  <td className="p-3.5">Proximidade em relação à localização considerada</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Destaque</td>
                  <td className="p-3.5">Reconhecimento da empresa, incluindo sinais como avaliações e referências na web</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Preencher o perfil ajuda a apresentar o negócio, mas não elimina a influência dos demais fatores. O Google também esclarece que não é possível pagar por uma posição orgânica local melhor.
          <CitationRef ids={[1]} />
        </p>
      </section>

      {/* 1. Revise as informações como um cliente faria */}
      <section id="revise-informacoes-como-cliente" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          1. Revise as informações como um cliente faria
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Comece conferindo nome, telefone, site, horário e localização ou área de atendimento, conforme a operação. Verifique também se a categoria escolhida descreve adequadamente a atividade principal.
          </p>
          <p>
            O Google recomenda informações completas e atualizadas para ajudar a compreender a empresa e conectá-la a pesquisas relevantes.
            <CitationRef ids={[1]} />
          </p>
          <p>
            Nossa sugestão é transformar essa revisão em uma tarefa com responsável definido. Mudanças na operação precisam chegar aos canais onde os clientes procuram informações. Se o horário de um feriado muda, por exemplo, alguém deve atualizar essa informação antes que o cliente organize uma visita.
          </p>
        </div>
      </section>

      {/* 2. Use fotos para responder dúvidas */}
      <section id="use-fotos-para-responder-duvidas" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          2. Use fotos para responder dúvidas
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Uma boa fotografia pode ajudar o cliente a entender o que encontrará. Em uma loja, mostre fachada, acesso, ambiente e produtos. Em uma empresa de instalação, apresente trabalhos reais e detalhes de acabamento. Em um escritório, mostre o espaço e a equipe quando isso fizer sentido para o atendimento.
          </p>
          <p>
            A seleção deve refletir a experiência atual. Para uma empresa de persianas, fotografar ambientes com diferentes soluções pode ser mais útil do que publicar várias imagens semelhantes sem contexto. O objetivo editorial é ajudar o cliente a avaliar o serviço.
          </p>
        </div>
      </section>

      {/* 3. Crie uma rotina para receber avaliações autênticas */}
      <section id="rotina-avaliacoes-autenticas" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          3. Crie uma rotina para receber avaliações autênticas
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Depois de concluir um atendimento, a empresa pode convidar o cliente a relatar a experiência. Um pedido simples é suficiente:
          </p>

          <blockquote className="rounded-2xl border-l-4 border-[#C97F38] bg-white/85 p-5 sm:p-6 text-sm sm:text-base italic leading-relaxed text-[#1e4840] shadow-sm">
            “Obrigado por escolher nossa empresa. Se puder, conte no Google como foi seu atendimento. Seu relato ajuda outras pessoas a conhecerem nosso trabalho.”
          </blockquote>

          <p>
            O Google permite compartilhar links ou QR codes para solicitar avaliações e proíbe incentivos como descontos ou brindes em troca delas.
            <CitationRef ids={[2]} />
          </p>
          <p>
            Na rotina da empresa, designe também quem acompanha as respostas. Um comentário pode revelar uma dúvida recorrente ou uma etapa do atendimento que merece atenção.
          </p>
        </div>
      </section>

      {/* 4. Conecte o perfil à página adequada */}
      <section id="conecte-perfil-pagina-adequada" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          4. Conecte o perfil à página adequada
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Imagine uma pessoa interessada em um serviço específico. Ela acessa o site pelo perfil e encontra apenas uma apresentação institucional genérica.
          </p>
          <p>
            A recomendação da RUNA é facilitar a continuidade: explicar os serviços, a região atendida e como solicitar contato. Para empresas que atuam em várias localidades, o conteúdo deve representar a cobertura real. Uma página útil pode apresentar trabalhos, condições de atendimento e dúvidas próprias daquela operação.
          </p>
          <p>
            Esse cuidado também fortalece a clareza do site para quem chega por indicação ou anúncio.
          </p>
        </div>
      </section>

      {/* 5. Acompanhe o resultado além da visualização */}
      <section id="acompanhe-resultado-alem-visualizacao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          5. Acompanhe o resultado além da visualização
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Ter o perfil visto é uma etapa da descoberta. Para a gestão comercial, interessa saber o que aconteceu depois.
          </p>
          <p>
            Pergunte aos novos clientes como conheceram a empresa e registre a informação quando disponível. Cruze essa leitura com os contatos e pedidos recebidos. Uma análise simples pode mostrar quais serviços geram interesse e quais dúvidas aparecem antes da contratação.
          </p>
          <p>
            Evite transformar toda interação com o perfil em uma venda presumida.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist-presenca-local" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist de presença local"
          items={[
            {
              id: 'telefone-site-horarios',
              title: 'Telefone, site e horários estão atualizados.',
            },
            {
              id: 'categoria-servicos',
              title: 'A categoria e os serviços representam a operação.',
            },
            {
              id: 'fotos-atuais',
              title: 'As fotos mostram o trabalho atual.',
            },
            {
              id: 'rotina-avaliacoes',
              title: 'Existe uma rotina de solicitação e acompanhamento de avaliações.',
            },
            {
              id: 'site-facilita-orcamento',
              title: 'O site facilita o pedido de orçamento.',
            },
            {
              id: 'origem-contatos-registrada',
              title: 'A origem dos contatos é registrada quando possível.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="facilite-caminho-quem-procura"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Facilite o caminho de quem procura sua empresa
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA ajuda a conectar presença local,{' '}
          <Link href="/solucoes/sites-e-landing-pages" className="font-semibold text-[#e59a54] underline hover:text-white">
            site
          </Link>{' '}
          e{' '}
          <Link href="/solucoes/gestao-de-trafego-pago" className="font-semibold text-[#e59a54] underline hover:text-white">
            aquisição de clientes
          </Link>
          .
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Falar com a equipe RUNA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
 * ARTIGO 6: WhatsApp com IA: o que automatizar para melhorar o atendimento comercial
 * ============================================================================ */
export function WhatsappComIaContent({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Enquanto você está em uma reunião, chegam mensagens perguntando preço, prazo e disponibilidade. Algumas exigem uma resposta rápida. Outras precisam de uma avaliação mais cuidadosa.
        </p>
        <p>
          Quando o atendimento depende de uma pessoa lembrar de tudo, oportunidades podem ficar sem encaminhamento.
        </p>
        <p>
          A inteligência artificial pode ajudar a organizar essa entrada. Para funcionar bem, precisa <strong className="font-semibold text-[#1e4840]">conhecer as informações da empresa e ter limites claros</strong> sobre o que pode responder ou executar.
        </p>
      </div>

      {/* O que pode ser automatizado? */}
      <section id="o-que-pode-ser-automatizado" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que pode ser automatizado?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            A WhatsApp Business Platform oferece recursos para fluxos automatizados, integrações e encaminhamento de conversas para atendentes.
            <CitationRef ids={[1]} /> A aplicação concreta depende da solução implementada. Adicionar IA, consultar um CRM ou acessar uma agenda exige configuração e integração compatíveis.
          </p>
          <p>Nossa recomendação é começar com um escopo pequeno:</p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Escopo Inicial de Automação Comercial no WhatsApp
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Tarefa</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Como a automação pode ajudar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Recepção</td>
                  <td className="p-3.5">Identificar o motivo do contato</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Dúvidas frequentes</td>
                  <td className="p-3.5">Responder com informações aprovadas</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Triagem</td>
                  <td className="p-3.5">Coletar os dados necessários para encaminhar a demanda</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Organização</td>
                  <td className="p-3.5">Registrar informações no sistema integrado</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Encaminhamento</td>
                  <td className="p-3.5">Direcionar a conversa para o responsável</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Acompanhamento</td>
                  <td className="p-3.5">Criar tarefas internas para oportunidades pendentes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          O primeiro projeto deve resolver uma dificuldade que a equipe consegue identificar e medir.
        </p>
      </section>

      {/* Um exemplo: organizar pedidos de orçamento */}
      <section id="exemplo-organizar-pedidos-orcamento" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Um exemplo: organizar pedidos de orçamento
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Considere uma empresa que instala persianas sob medida. O atendimento inicial costuma precisar de algumas informações: cidade, tipo de ambiente e o que o cliente procura resolver. A automação pode perguntar:
          </p>

          <blockquote className="rounded-2xl border-l-4 border-[#C97F38] bg-white/85 p-5 sm:p-6 text-sm sm:text-base italic leading-relaxed text-[#1e4840] shadow-sm">
            “Em qual cidade será a instalação e para qual ambiente você procura persianas?”
          </blockquote>

          <p>
            Depois, pode explicar as opções gerais e encaminhar a conversa com um resumo para o responsável. Quando o orçamento depende de medição, material ou condições de instalação, a resposta deve reconhecer essa necessidade. Uma estimativa só pode ser apresentada se houver uma regra aprovada para isso.
          </p>
          <p>
            Esse desenho reduz perguntas repetidas e permite que o atendimento humano comece com contexto.
          </p>
        </div>
      </section>

      {/* Prepare uma base de informação confiável */}
      <section id="prepare-base-informacao-confiavel" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Prepare uma base de informação confiável
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Antes de escolher a ferramenta, reúna o conhecimento que já existe na operação:
          </p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Serviços oferecidos e região atendida.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Horários e canais disponíveis.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Etapas para solicitar orçamento.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Condições comerciais autorizadas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Dúvidas frequentes e respostas revisadas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Situações que exigem avaliação de um responsável.</span>
            </li>
          </ul>

          <p>
            Defina quem mantém esse material atualizado. Se a política de atendimento muda e a base continua antiga, a automação pode apresentar informações que a empresa já não pratica.
          </p>
        </div>
      </section>

      {/* Estabeleça os limites de decisão */}
      <section id="estabeleca-limites-decisao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Estabeleça os limites de decisão
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Uma conversa útil precisa avançar dentro das condições reais do negócio. Nossa recomendação é encaminhar para uma pessoa quando houver negociação fora do padrão, reclamação, informação ausente ou solicitação explícita de atendimento humano.
          </p>
          <p>
            Também é necessário distinguir <strong className="font-semibold text-[#1e4840]">informação</strong> de <strong className="font-semibold text-[#b06b29]">ação</strong>. Consultar um horário disponível é diferente de confirmar um agendamento. Informar uma condição comercial é diferente de autorizar uma exceção. A automação só deve confirmar uma ação depois que o sistema responsável registrar sua execução.
          </p>
          <p>
            Essa distinção evita promessas que a operação não consegue cumprir.
          </p>
        </div>
      </section>

      {/* Teste conversas difíceis antes de ampliar */}
      <section id="teste-conversas-dificeis" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Teste conversas difíceis antes de ampliar
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O teste precisa ir além de perguntas perfeitamente escritas. Simule mensagens incompletas, mudanças de assunto, dúvidas não previstas e pedidos incompatíveis com o serviço. Verifique:
          </p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>A resposta continua correta?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>O sistema reconhece quando falta informação?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>A conversa chega ao responsável certo?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>O cliente precisa repetir tudo?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>A equipe consegue retomar o atendimento?</span>
            </li>
          </ul>

          <p>
            Esses testes ajudam a definir quais tarefas já estão prontas para automação e quais precisam de revisão.
          </p>
        </div>
      </section>

      {/* O que acompanhar depois da implantação */}
      <section id="o-que-acompanhar-depois-implantacao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que acompanhar depois da implantação
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Uma resposta instantânea pode ser apenas uma saudação. Para avaliar utilidade, observe o que aconteceu na conversa.
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Indicadores de Qualidade da Automação no Atendimento
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Indicador</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Pergunta de gestão</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Tempo até uma resposta útil</td>
                  <td className="p-3.5">O cliente recebeu uma orientação que permitiu avançar?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Conclusão da triagem</td>
                  <td className="p-3.5">As informações necessárias foram obtidas?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Encaminhamento correto</td>
                  <td className="p-3.5">A demanda chegou ao responsável adequado?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Erros e correções</td>
                  <td className="p-3.5">Quais respostas precisam ser revistas?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Avanço comercial</td>
                  <td className="p-3.5">O contato gerou proposta, agendamento ou venda?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Comece com um tipo de atendimento, acompanhe as conversas e amplie conforme a operação ganhar consistência.
        </p>
      </section>

      {/* Checklist */}
      <section id="checklist-para-comecar" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist para começar"
          items={[
            {
              id: 'problema-definido',
              title: 'O problema de atendimento está definido.',
            },
            {
              id: 'base-revisada',
              title: 'Existe uma base revisada de informações.',
            },
            {
              id: 'acoes-permitidas',
              title: 'As ações permitidas estão documentadas.',
            },
            {
              id: 'encaminhamento-humano',
              title: 'O encaminhamento humano funciona.',
            },
            {
              id: 'integracoes-testadas',
              title: 'As integrações foram testadas.',
            },
            {
              id: 'responsavel-revisao',
              title: 'Há alguém responsável por revisar as conversas.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="organize-o-atendimento"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Organize o atendimento para aproveitar melhor os contatos
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA desenvolve{' '}
          <Link href="/solucoes/automacoes-e-ia" className="font-semibold text-[#e59a54] underline hover:text-white">
            automações e soluções com IA
          </Link>{' '}
          conectadas aos processos da empresa.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Converse com nossa equipe
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================================
 * ARTIGO 7: Quanto investir em tráfego pago? Comece pela margem do seu negócio
 * ============================================================================ */
export function QuantoInvestirTrafegoPagoContent({ post: _post }: { post: BlogPost }) {
  return (
    <>
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p className="font-serif text-xl sm:text-2xl italic text-[#1e4840]">
          “Quanto preciso investir para conseguir clientes?”
        </p>
        <p>
          A pergunta aparece antes de quase toda campanha. Para respondê-la com algum critério, precisamos conhecer o valor vendido, a margem, a capacidade de atendimento e como os contatos se transformam em contratos.
        </p>
        <p>
          Um orçamento útil precisa <strong className="font-semibold text-[#1e4840]">caber no caixa e produzir informação suficiente</strong> para orientar a próxima decisão.
        </p>
      </div>

      {/* 1. Entenda quanto sobra de cada venda */}
      <section id="entenda-quanto-sobra-cada-venda" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          1. Entenda quanto sobra de cada venda
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Imagine um serviço vendido por <strong className="font-semibold text-[#1c1c10]">R$ 1.000</strong>. Se os custos variáveis para realizar essa venda e entregar o serviço somam <strong className="font-semibold text-[#1c1c10]">R$ 600</strong>, restam <strong className="font-semibold text-[#1e4840]">R$ 400 de margem de contribuição</strong>.
          </p>
          <p>
            Essa parcela ainda precisa ajudar a pagar aquisição de clientes, estrutura fixa e resultado da empresa.
          </p>
          <p>
            O faturamento, sozinho, não mostra quanto é possível investir em marketing. Duas empresas que vendem pelo mesmo preço podem ter custos e capacidade de investimento muito diferentes. Antes de definir a campanha, revise essa conta com os dados reais da operação.
          </p>
        </div>
      </section>

      {/* 2. Defina um custo de aquisição planejado */}
      <section id="defina-custo-aquisicao-planejado" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          2. Defina um custo de aquisição planejado
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O custo de aquisição de clientes, ou <strong className="font-semibold text-[#1e4840]">CAC</strong>, considera os gastos de aquisição incluídos no cálculo e os novos clientes conquistados no período analisado.
          </p>
          <p>
            Para evitar confusão, documente quais despesas entram na sua conta: mídia, gestão, criação, ferramentas e custos comerciais, conforme o critério adotado.
          </p>
          <p>
            No exemplo, suponha que a empresa planeje gastar até R$ 150 para conquistar cada cliente. Dos R$ 400 de contribuição inicial, restariam R$ 250 para contribuir com custos fixos e resultado. Esse teto é uma decisão de planejamento. Ele precisa ser validado conforme os números reais.
          </p>
        </div>
      </section>

      {/* 3. Separe a parcela disponível para mídia */}
      <section id="separe-parcela-disponivel-midia" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          3. Separe a parcela disponível para mídia
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Vamos supor que R$ 50 por cliente sejam reservados para outros custos de aquisição. Nesse cenário, restariam R$ 100 de mídia por novo cliente.
          </p>
          <p>
            Se a empresa fecha uma venda a cada dez contatos, a taxa de fechamento é de 10%. Para manter a parcela planejada de mídia, o custo médio por contato precisaria ficar em até R$ 10.
          </p>
        </div>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Simulação de Orçamento a Partir da Margem de Contribuição
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">Item da simulação</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Receita por venda</td>
                  <td className="p-3.5 font-semibold">R$ 1.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Custos variáveis</td>
                  <td className="p-3.5">R$ 600</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1e4840]">Margem de contribuição inicial</td>
                  <td className="p-3.5 font-semibold text-[#1e4840]">R$ 400</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Aquisição total planejada por cliente</td>
                  <td className="p-3.5">R$ 150</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Outros custos de aquisição por cliente</td>
                  <td className="p-3.5">R$ 50</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Parcela de mídia por cliente</td>
                  <td className="p-3.5 font-semibold">R$ 100</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-[#1c1c10]">Taxa de fechamento considerada</td>
                  <td className="p-3.5">10%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#b06b29]">Custo por contato compatível com a simulação</td>
                  <td className="p-3.5 font-bold text-[#b06b29]">R$ 10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Todos os valores são fictícios. O exemplo demonstra a relação entre as variáveis, sem representar uma referência de mercado.
        </p>
      </section>

      {/* 4. Transforme a meta em um cenário de orçamento */}
      <section id="transforme-meta-cenario-orcamento" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          4. Transforme a meta em um cenário de orçamento
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Mantendo as hipóteses anteriores, conquistar 20 clientes exigiria aproximadamente 200 contatos. Com custo médio de R$ 10 por contato, o cenário corresponderia a R$ 2.000 em mídia. Os outros custos de aquisição previstos somariam R$ 1.000.
          </p>
          <p>
            Essa projeção não garante 20 vendas. Se o custo por contato subir ou a taxa de fechamento cair, a conta muda. Por isso, construa cenários diferentes e acompanhe quais premissas se aproximam da realidade.
          </p>
          <p>
            Para campanhas de pesquisa, o Planejador de Palavras-chave do Google pode ajudar a estimar volume e desempenho considerando fatores como orçamento, lances e histórico.
            <CitationRef ids={[1]} /> A projeção da ferramenta deve ser combinada com os dados comerciais da empresa.
          </p>
        </div>
      </section>

      {/* 5. Considere capacidade e tempo de retorno */}
      <section id="considere-capacidade-tempo-retorno" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          5. Considere capacidade e tempo de retorno
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O orçamento também precisa respeitar a operação. Se a equipe consegue atender poucas solicitações por dia, uma entrada desorganizada de contatos pode aumentar atrasos. Se a entrega depende de uma agenda limitada, a meta de novos clientes precisa considerar essa disponibilidade.
          </p>
          <p>
            Observe ainda o tempo entre investir e receber. Uma venda fechada hoje pode ser paga em parcelas. Um serviço pode exigir despesas antes da entrega. Planejar apenas pelo faturamento contratado pode esconder uma pressão de caixa.
          </p>
          <p>
            Em negócios recorrentes, use dados de permanência e margem para projetar receitas futuras. Evite tratar uma expectativa de recorrência como dinheiro já disponível.
          </p>
        </div>
      </section>

      {/* 6. Defina quando reavaliar */}
      <section id="defina-quando-reavaliar" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          6. Defina quando reavaliar
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>Antes de começar, registre:</p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>A oferta e a região do teste.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>O limite de desembolso.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>As hipóteses de custo e fechamento.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>O tempo necessário para observar o ciclo comercial.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Os critérios para ajustar, ampliar ou interromper o investimento.</span>
            </li>
          </ul>

          <p>
            Essa rotina ajuda a transformar o orçamento em uma decisão acompanhada por evidências.
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section id="checklist-do-orcamento" className="mt-12 scroll-mt-28">
        <GenericInteractiveChecklist
          title="Checklist do orçamento"
          items={[
            {
              id: 'contribuicao-media',
              title: 'Conheço a contribuição média de cada venda.',
            },
            {
              id: 'custos-aquisicao',
              title: 'Defini quais custos entram na aquisição.',
            },
            {
              id: 'hipotese-fechamento',
              title: 'Tenho uma hipótese de taxa de fechamento.',
            },
            {
              id: 'capacidade-operacao',
              title: 'A operação consegue atender à demanda planejada.',
            },
            {
              id: 'caixa-tempo-recebimento',
              title: 'O caixa comporta o tempo até o recebimento.',
            },
            {
              id: 'data-criterio-revisao',
              title: 'Existe uma data e um critério para revisão.',
            },
          ]}
        />
      </section>

      {/* CTA Final */}
      <section
        id="planeje-a-aquisicao"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Planeje a aquisição a partir da realidade da empresa
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          A RUNA ajuda a conectar orçamento,{' '}
          <Link href="/solucoes/gestao-de-trafego-pago" className="font-semibold text-[#e59a54] underline hover:text-white">
            campanhas
          </Link>{' '}
          e{' '}
          <Link href="/solucoes/dados-e-analytics" className="font-semibold text-[#e59a54] underline hover:text-white">
            informações comerciais
          </Link>{' '}
          para orientar o investimento.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            <Sparkles className="h-4 w-4" />
            Faça o Diagnóstico Digital Gratuito
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            Falar com a equipe RUNA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
