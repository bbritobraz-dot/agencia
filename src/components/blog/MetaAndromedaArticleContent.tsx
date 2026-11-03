import Link from 'next/link';
import { BlogPost } from '@/config/blog';
import {
  AndromedaInteractiveChecklist,
} from '@/components/blog/AndromedaInteractiveChecklist';
import {
  ArrowRight,
  Sparkles,
} from 'lucide-react';

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

export function MetaAndromedaArticleContent({ post }: { post: BlogPost }) {
  return (
    <>
      {/* Intro Paragraphs */}
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Sua empresa produz anúncios, investe em mídia e acompanha os contatos que chegam. Mas o que acontece entre publicar uma campanha e alguém ver sua oferta no Instagram ou no Facebook?
        </p>

        <p>
          Existe uma seleção acontecendo nos bastidores. A Meta usa inteligência artificial para encontrar anúncios que façam sentido para cada pessoa. O <strong className="font-semibold text-[#1c1c10]">Andromeda</strong> participa desse processo.
        </p>

        <p>
          Para o empresário, entender essa tecnologia ajuda a fazer perguntas melhores para a equipe: quais motivos de compra estamos explorando? O que estamos aprendendo com os anúncios? Como esse investimento está chegando ao comercial?
        </p>
      </div>

      {/* Section 1: O que é o Meta Andromeda? */}
      <section id="o-que-e-o-meta-andromeda" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que é o Meta Andromeda?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O Andromeda é um sistema de IA usado na primeira etapa da recomendação de anúncios. Ele reduz um grande universo de anúncios elegíveis a um grupo menor de candidatos. Depois, outras etapas avaliam esses candidatos com mais detalhe.
            <CitationRef ids={[1]} />
          </p>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <p className="text-sm sm:text-base leading-relaxed text-[#1c1c10]">
              <strong className="font-semibold text-[#1e4840]">Analogia prática:</strong>{' '}
              Pense em uma seleção para uma vaga de emprego. Primeiro, uma triagem de currículos identifica os perfis mais aderentes. Depois, apenas os selecionados passam por uma avaliação mais aprofundada. É uma comparação simplificada para entender exatamente onde o Andromeda atua dentro dos sistemas de recomendação da Meta.
            </p>
          </div>

          <p>
            Em <strong className="font-semibold text-[#1c1c10]">28 de outubro de 2026</strong>, a Meta publicou uma evolução dessa infraestrutura, cuja base foi lançada em 2024. A empresa descreve o sistema em produção, com maior capacidade de avaliar anúncios e encontrar correspondências relevantes.
            <CitationRef ids={[1]} />
          </p>
        </div>
      </section>

      {/* Section 2: Preciso ativar isso na minha campanha no Brasil? */}
      <section id="preciso-ativar-na-minha-campanha" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Preciso ativar isso na minha campanha no Brasil?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O Andromeda funciona diretamente na infraestrutura da Meta. A publicação apresenta melhorias automáticas no sistema de seleção, e não uma ferramenta ou botão que o anunciante precise ativar no Gerenciador de Anúncios.
            <CitationRef ids={[1]} />
          </p>

          <p>
            O comunicado não detalha um calendário específico por país. Para empresas brasileiras, a ação prática é aprimorar o trabalho que alimenta as campanhas: oferta, peças publicitárias, mensuração e análise comercial.
          </p>
        </div>
      </section>

      {/* Section 3: O que sua empresa pode fazer com essa informação? */}
      <section id="o-que-sua-empresa-pode-fazer" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que sua empresa pode fazer com essa informação?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Nossa leitura é que essa evolução reforça a importância de trabalhar com <strong className="font-semibold text-[#1e4840]">boas hipóteses de comunicação</strong>.
          </p>

          <p>
            Um anúncio pode apresentar um produto pelo preço. Outro pode mostrar a experiência de uso. Um terceiro pode responder a uma dúvida ou objeção que costuma aparecer logo antes do fechamento.
          </p>

          <p>
            Cada abordagem explora uma razão diferente para o cliente se interessar. Isso dá à equipe uma pergunta concreta para investigar, além de simplesmente produzir mais peças no automático.
          </p>
        </div>
      </section>

      {/* Section 4: Um exemplo simples: três motivos para a mesma cafeteria */}
      <section id="exemplo-motivos-de-compra" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Um exemplo simples: três motivos para escolher a mesma cafeteria
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Imagine uma cafeteria que deseja atrair mais clientes recorrentes. Ela pode construir anúncios a partir de três situações e dores reais de consumo:
          </p>
        </div>

        {/* Comparison Table */}
        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Matriz de Hipóteses de Comunicação: Cafeteria
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#b06b29]">Motivo de compra</th>
                  <th className="p-3.5 font-semibold text-[#1e4840]">Ideia para o anúncio</th>
                  <th className="p-3.5 font-semibold text-[#1c1c10]">O que a empresa quer aprender</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1e4840]">Sabor</td>
                  <td className="p-3.5">Mostrar o preparo artesanal do café e a qualidade dos grãos e ingredientes.</td>
                  <td className="p-3.5">A qualidade técnica e o sabor artesanal despertam interesse imediato?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1e4840]">Conforto</td>
                  <td className="p-3.5">Apresentar o espaço tranquilo para uma pausa rápida ou para trabalhar com tomada e Wi-Fi.</td>
                  <td className="p-3.5">O ambiente e a infraestrutura de trabalho são motivos relevantes para a visita?</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1e4840]">Encontro</td>
                  <td className="p-3.5">Mostrar amigos e familiares conversando à mesa em um momento de lazer.</td>
                  <td className="p-3.5">A experiência social e o encontro atraem o perfil de público desejado?</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Internal Image 1 — Motivos de compra */}
        <figure className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#0D342C] shadow-md">
          <picture className="block w-full">
            <source
              srcSet="/blog/meta-andromeda-ia-anuncios/motivos-de-compra.avif"
              type="image/avif"
            />
            <source
              srcSet="/blog/meta-andromeda-ia-anuncios/motivos-de-compra.webp"
              type="image/webp"
            />
            <img
              src="/blog/meta-andromeda-ia-anuncios/motivos-de-compra.png"
              alt="Três exemplos visuais de anúncios para uma cafeteria: sabor, conforto e encontro."
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </picture>
          <figcaption className="border-t border-[#d8d7cf] bg-[#E8E7DF]/60 px-4 py-3 text-center text-xs sm:text-sm italic text-[#4c524b]">
            Exemplo ilustrativo: o mesmo negócio pode se conectar com diferentes motivos de compra.
          </figcaption>
        </figure>

        <p className="text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          O raciocínio também serve para empresas B2B ou serviços corporativos. Uma solução empresarial pode ser apresentada pela redução de erros operacionais, pelo controle de dados ou pela agilidade de implantação. As conversas da equipe comercial ajudam a selecionar quais argumentos merecem ser testados primeiro.
        </p>
      </section>

      {/* Section 5: Como organizar os testes de anúncios */}
      <section id="como-organizar-os-testes" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Como organizar os testes de anúncios
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          A proposta abaixo é um processo de gestão que recomendamos, adaptável ao orçamento e ao ciclo de venda de cada negócio:
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              1. Comece por uma pergunta
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Antes de pedir uma nova rodada de criativos, defina o aprendizado desejado. Por exemplo: <em>“Os clientes se interessam mais pela agilidade da entrega ou pelo suporte na escolha?”</em> Essa pergunta orienta o roteiro e dá sentido à análise posterior.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              2. Separe argumento de formato
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              <strong className="font-semibold text-[#1e4840]">Argumento</strong> é a razão para comprar. <strong className="font-semibold text-[#b06b29]">Formato</strong> é a maneira de apresentar essa razão: vídeo, estático, demonstração na tela ou depoimento. Trocar apenas a cor de fundo renova a atenção passageira; explorar outra necessidade do cliente amplia o que a empresa descobre sobre a própria oferta.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              3. Escolha um teste que caiba no investimento
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Priorize as hipóteses com maior impacto financeiro. Defina verba mínima, janela de tempo e meta esperada antes de ligar a campanha. Na distribuição diária, os algoritmos podem direcionar volumes desiguais entre anúncios; essa particularidade precisa entrar na leitura dos dados.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              4. Acompanhe o caminho até a venda
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Cliques e impressões mostram apenas interesse inicial. Para balizar investimentos sérios, acompanhe contatos qualificados, propostas apresentadas e faturamento gerado. Em operações comerciais, registrar a origem no CRM ajuda a conectar cada anúncio ao que ocorre no WhatsApp.
            </p>
          </div>
        </div>

        {/* Internal Image 2 — Análise de anúncios */}
        <figure className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#0D342C] shadow-md">
          <picture className="block w-full">
            <source
              srcSet="/blog/meta-andromeda-ia-anuncios/analise-de-anuncios.avif"
              type="image/avif"
            />
            <source
              srcSet="/blog/meta-andromeda-ia-anuncios/analise-de-anuncios.webp"
              type="image/webp"
            />
            <img
              src="/blog/meta-andromeda-ia-anuncios/analise-de-anuncios.png"
              alt="Profissionais analisando peças publicitárias e fazendo anotações durante uma reunião de marketing."
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </picture>
          <figcaption className="border-t border-[#d8d7cf] bg-[#E8E7DF]/60 px-4 py-3 text-center text-xs sm:text-sm italic text-[#4c524b]">
            Imagem ilustrativa: reunir criação, mídia e informações comerciais ajuda a planejar o próximo teste.
          </figcaption>
        </figure>

        {/* Interactive Self-Assessment Checklist */}
        <AndromedaInteractiveChecklist />
      </section>

      {/* Section 6: E onde entra o GEM, outra IA da Meta? */}
      <section id="e-onde-entra-o-gem" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          E onde entra o GEM, outra IA da Meta?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O Andromeda faz parte de um ecossistema mais amplo de modelos. Em <strong className="font-semibold text-[#1c1c10]">13 de outubro de 2026</strong>, a Meta descreveu a evolução do <strong className="font-semibold text-[#1c1c10]">GEM</strong> (<em>Generative Ads Model</em>), um modelo central que aprende com sinais de diferentes superfícies publicitárias e transfere esse conhecimento para outros subsistemas de recomendação.
            <CitationRef ids={[2]} />
          </p>

          <p>
            Os termos técnicos ajudam a entender para onde a tecnologia caminha. Na rotina prática da empresa, porém, o foco deve continuar objetivo e focado no negócio: apresentar uma oferta clara, planejar testes com método e acompanhar o retorno financeiro.
          </p>
        </div>
      </section>

      {/* Section 8: Final CTA Connected to Existing Site Routes */}
      <section
        id="transforme-producao-em-aprendizado"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Transforme produção de anúncios em aprendizado para o negócio
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          Sua próxima reunião de marketing pode começar com uma pergunta simples: <strong className="text-white">o que aprendemos com os anúncios anteriores e qual hipótese vale testar agora?</strong>
        </p>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          Com essa rotina, criação, mídia e comercial passam a trabalhar em torno de decisões concretas. Quer organizar esse processo na sua empresa? Podemos ajudar com gestão de tráfego, planejamento de criativos, mensuração e integração com CRM.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3.5">
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C97F38] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#b06b29]"
          >
            Converse com a nossa equipe
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/diagnostico"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#fcfae5]/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-[#fcfae5] transition-colors hover:bg-white/15"
          >
            <Sparkles className="h-4 w-4" />
            Fazer Diagnóstico Gratuito
          </Link>
        </div>
      </section>
    </>
  );
}
