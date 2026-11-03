import Link from 'next/link';
import { BlogPost } from '@/config/blog';
import {
  SiteBuscasIaChecklist,
} from '@/components/blog/SiteBuscasIaChecklist';
import {
  ArrowRight,
  ExternalLink,
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

export function SiteBuscasIaArticleContent({ post }: { post: BlogPost }) {
  return (
    <>
      {/* Intro Paragraphs */}
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
        <p>
          Imagine um cliente perguntando ao Google: <em>“Quero contratar uma empresa para reformar meu escritório. O que preciso avaliar antes de pedir um orçamento?”</em>
        </p>

        <p>
          Ele pode continuar a conversa, explicar o tamanho do espaço e perguntar sobre prazo, etapas e materiais. Nesse caminho, uma página da sua empresa pode ajudar a responder uma dúvida e aparecer como um link para aprofundar o assunto.
        </p>

        <p>
          As respostas com IA do Google apresentam links para páginas que dão suporte às informações. Isso abre uma oportunidade de descoberta para empresas que explicam bem o que fazem.
          <CitationRef ids={[1]} />
        </p>

        <p>
          O trabalho começa pelo site que você já tem: <strong className="font-semibold text-[#1e4840]">conteúdo útil, estrutura acessível e uma boa experiência para quem chega</strong>.
        </p>
      </div>

      {/* Section: O SEO continua sendo a base */}
      <section id="o-seo-continua-sendo-a-base" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O SEO continua sendo a base
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            SEO é o conjunto de práticas que ajuda os mecanismos de busca a encontrar e compreender as páginas do seu site. Segundo o Google, essa base continua relevante nas experiências com IA, que utilizam seus sistemas de busca e qualidade.
            <CitationRef ids={[2]} />
          </p>

          <p>
            Para participar como link de apoio, a página precisa estar indexada — registrada na base de pesquisa — e apta a exibir um trecho de conteúdo nos resultados.
            <CitationRef ids={[1]} />
          </p>

          <p className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base leading-relaxed text-[#1c1c10]">
            <strong className="font-semibold text-[#1e4840]">Pergunta para a equipe:</strong> quais páginas dos nossos principais serviços estão de fato indexadas na busca hoje? Quais delas ajudam alguém a entender, comparar e tomar uma decisão de contratação com segurança?
          </p>
        </div>
      </section>

      {/* Section 1: Transforme as dúvidas do comercial em conteúdo */}
      <section id="duvidas-do-comercial-em-conteudo" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          1. Transforme as dúvidas do comercial em conteúdo
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Nossa sugestão é começar pelas conversas reais da empresa. Reúna as perguntas que aparecem com frequência no WhatsApp, nas reuniões de venda e no momento de envio de propostas.
          </p>

          <p>
            No exemplo da reforma corporativa ou de escritórios, elas poderiam ser:
          </p>

          <ul className="space-y-2.5 rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6 text-sm sm:text-base text-[#1c1c10]">
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>É possível fazer a obra mantendo parte da equipe no local de trabalho?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>O que precisa estar definido pela diretoria para receber um orçamento assertivo?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Quais decisões de acabamento e projeto mais influenciam o prazo final?</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="font-bold text-[#C97F38]">›</span>
              <span>Como funciona o cronograma e o acompanhamento das etapas na prática?</span>
            </li>
          </ul>

          <p>
            Essas perguntas revelam o que o cliente precisa entender antes de comprar. Algumas cabem na própria página do serviço; outras merecem um artigo com explicações, fotos e exemplos da própria operação.
          </p>

          <p>
            O Google orienta a criação de conteúdo com experiência própria, valor genuíno para o leitor e organização clara.
            <CitationRef ids={[2]} /> Para uma empresa, isso significa demonstrar como uma etapa funciona na prática e responder com transparência às dificuldades recorrentes do cliente.
          </p>
        </div>

        {/* Internal Image 1 */}
        <figure className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#0D342C] shadow-md">
          <picture className="block w-full">
            <source
              srcSet="/blog/preparar-site-buscas-ia/duvidas-viram-conteudo.avif"
              type="image/avif"
            />
            <source
              srcSet="/blog/preparar-site-buscas-ia/duvidas-viram-conteudo.webp"
              type="image/webp"
            />
            <img
              src="/blog/preparar-site-buscas-ia/duvidas-viram-conteudo.png"
              alt="Empresária e consultor organizando dúvidas dos clientes para transformá-las em conteúdo para o site."
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </picture>
          <figcaption className="border-t border-[#d8d7cf] bg-[#E8E7DF]/60 px-4 py-3 text-center text-xs sm:text-sm italic text-[#4c524b]">
            Imagem ilustrativa: as conversas do comercial ajudam a identificar assuntos relevantes para o site.
          </figcaption>
        </figure>
      </section>

      {/* Section 2: Use o FAQ para facilitar a decisão */}
      <section id="use-o-faq-para-facilitar-a-decisao" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          2. Use o FAQ para facilitar a decisão
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            FAQ é uma seção de perguntas frequentes. Ela reúne respostas diretas que o visitante encontraria ao conversar pessoalmente com um consultor da sua equipe.
          </p>

          <p>
            Uma boa resposta explica a situação e apresenta o próximo passo. Em vez de escrever apenas “O prazo varia”, a empresa pode detalhar quais critérios utiliza para estimá-lo e o que precisa receber do cliente para fechar um cronograma firme.
          </p>

          <p>
            Quando esse texto está disponível em uma página acessível à busca, ele pode fazer parte do conteúdo considerado para respostas com IA.
            <CitationRef ids={[1]} /> O benefício também aparece de imediato na navegação do visitante: ele encontra respostas e chega ao atendimento comercial muito mais consciente.
          </p>

          <div className="rounded-xl border border-[#27594F]/30 bg-[#1e4840]/5 p-4 text-xs sm:text-sm text-[#323630]">
            <strong className="font-semibold text-[#1e4840]">Nota importante sobre dados estruturados:</strong> O FAQ aqui é um recurso de conteúdo editorial para os leitores. O Google retirou formalmente os antigos resultados enriquecidos visuais de FAQ da Pesquisa em 2026.
            <CitationRef ids={[3]} />
          </div>
        </div>
      </section>

      {/* Section 3: Prepare a parte técnica para o conteúdo ser encontrado */}
      <section id="prepare-a-parte-tecnica" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          3. Prepare a parte técnica para o conteúdo ser encontrado
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Você pode delegar essa etapa técnica para sua equipe de TI ou agência, acompanhando os objetivos de cada item:
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-white">
          <div className="border-b border-[#d8d7cf] bg-[#1e4840] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#fcfae5]">
            Checklist de Fundamentos Técnicos Recomendados pelo Google
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#d8d7cf] bg-[#E8E7DF]/60 text-[#1c1c10]">
                  <th className="p-3.5 font-semibold text-[#1e4840]">O que revisar</th>
                  <th className="p-3.5 font-semibold text-[#b06b29]">Em linguagem simples</th>
                  <th className="p-3.5 font-semibold text-[#1c1c10]">O que pedir à equipe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8d7cf] text-[#323630]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Acesso às páginas</td>
                  <td className="p-3.5">A busca do Google consegue visitar seu conteúdo?</td>
                  <td className="p-3.5">Conferir bloqueios acidentais de rastreamento e estabilidade da hospedagem.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Indexação</td>
                  <td className="p-3.5">A página está devidamente registrada na busca?</td>
                  <td className="p-3.5">Inspecionar as URLs prioritárias no Google Search Console e validar o sitemap.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Links internos</td>
                  <td className="p-3.5">O visitante encontra o caminho natural até os serviços?</td>
                  <td className="p-3.5">Conectar artigos e páginas de blog às soluções comerciais relacionadas.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1c1c10]">Conteúdo em texto</td>
                  <td className="p-3.5">As explicações e diferenciais podem ser lidos por robôs?</td>
                  <td className="p-3.5">Publicar informações essenciais em texto HTML semântico, além de imagens.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10] mt-8">
          E o robots.txt e o llms.txt?
        </h3>
        <div className="mt-3 space-y-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O <strong className="font-semibold text-[#1c1c10]">robots.txt</strong> orienta quais pastas os rastreadores podem ou não acessar.
            <CitationRef ids={[4]} /> A revisão serve para manter acessível todo o conteúdo público que a empresa deseja indexar.
          </p>

          <p>
            Já o arquivo <code className="rounded bg-[#E8E7DF] px-1.5 py-0.5 text-xs text-[#1e4840]">llms.txt</code> não é utilizado pelo Google Search para visibilidade ou classificação orgânica.
            <CitationRef ids={[2]} /> Para esse fim, o foco deve continuar 100% nas páginas, na qualidade do conteúdo e na configuração de acesso padrão.
          </p>

          <p>
            Vale lembrar que existe um controle específico para participação nas experiências de IA no Google Search Console (disponível mundialmente desde 31 de agosto de 2026, com inclusão ativa por padrão).
            <CitationRef ids={[5]} />
          </p>
        </div>
      </section>

      {/* Section 4: Faça o site carregar bem e responder aos comandos */}
      <section id="faca-o-site-carregar-bem" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          4. Faça o site carregar bem e responder aos comandos
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            O visitante precisa conseguir ler, tocar em um botão e preencher um formulário com agilidade, especialmente na tela do celular.
          </p>

          <p>
            As métricas <strong className="font-semibold text-[#1e4840]">Core Web Vitals</strong> avaliam três dimensões centrais da experiência: carregamento rápido do conteúdo principal (LCP), tempo de resposta às interações (INP) e estabilidade visual sem elementos pulando na tela (CLS). O Google recomenda atingir boas notas para oferecer uma experiência de qualidade.
            <CitationRef ids={[6]} />
          </p>

          <p>
            Na prática, priorize as páginas mais acessadas: certifique-se de que as imagens usam formatos modernos como WebP e AVIF com dimensões reservadas, garanta que os botões não se movam durante o carregamento e simplifique formulários no celular.
          </p>
        </div>
      </section>

      {/* Section 5: Prepare a navegação para pessoas e agentes de IA */}
      <section id="prepare-a-navegacao-para-pessoas-e-agentes" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          5. Prepare a navegação para pessoas e agentes de IA
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Um agente de inteligência artificial pode executar tarefas em nome de uma pessoa, como pesquisar informações e interagir com formulários na página. Essa é uma frente diferente da seleção de fontes para uma resposta da Busca tradicional.
            <CitationRef ids={[2]} />
          </p>

          <p>
            Nesse horizonte, o padrão <strong className="font-semibold text-[#1c1c10]">WebMCP</strong> permite expor funcionalidades do site como ferramentas estruturadas para agentes autônomos. A documentação do Google Chrome apresenta a iniciativa como um <em>origin trial</em> (programa experimental com acesso antecipado).
            <CitationRef ids={[7]} />
          </p>

          <p>
            Para a sua empresa hoje, o ponto de partida fundamental é a clareza da interface: campos bem identificados, botões com rótulos compreensíveis e confirmação visual de envio.
          </p>
        </div>

        {/* Internal Image 2 */}
        <figure className="my-8 overflow-hidden rounded-2xl border border-[#d8d7cf] bg-[#0D342C] shadow-md">
          <picture className="block w-full">
            <source
              srcSet="/blog/preparar-site-buscas-ia/site-facil-de-usar.avif"
              type="image/avif"
            />
            <source
              srcSet="/blog/preparar-site-buscas-ia/site-facil-de-usar.webp"
              type="image/webp"
            />
            <img
              src="/blog/preparar-site-buscas-ia/site-facil-de-usar.png"
              alt="Conceito de site no celular com campos identificados e botão de solicitar contato."
              width={1672}
              height={941}
              loading="lazy"
              decoding="async"
              className="w-full h-auto block"
            />
          </picture>
          <figcaption className="border-t border-[#d8d7cf] bg-[#E8E7DF]/60 px-4 py-3 text-center text-xs sm:text-sm italic text-[#4c524b]">
            Ilustração conceitual: uma interface clara facilita o caminho até a ação desejada.
          </figcaption>
        </figure>
      </section>

      {/* Section: Como isso se conecta aos anúncios? */}
      <section id="como-isso-se-conecta-aos-anuncios" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Como isso se conecta aos anúncios?
        </h2>
        <div className="mt-4 space-y-5 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Organizar o site beneficia tanto quem chega pelo conteúdo quanto quem clica em uma campanha paga. A pessoa encontra exatamente a promessa anunciada e um próximo passo acessível.
          </p>

          <p>
            No Google Ads, a experiência da página de destino e sua relevância influenciam diretamente a classificação dos anúncios e o custo por clique.
            <CitationRef ids={[8]} /> A conexão prática está em alinhar campanha, conteúdo e experiência de conversão.
          </p>
          <p className="text-sm text-[#4c524b]">
            Você também pode entender como a IA está transformando os formatos pagos em nossos artigos sobre os{' '}
            <Link href="/blog/anuncios-modo-ia-google-brasil" className="font-semibold text-[#1e4840] hover:text-[#C97F38] underline">
              Anúncios no Modo IA do Google
            </Link>{' '}
            e o sistema{' '}
            <Link href="/blog/meta-andromeda-ia-anuncios" className="font-semibold text-[#1e4840] hover:text-[#C97F38] underline">
              Meta Andromeda
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Section: O que acompanhar depois das melhorias */}
      <section id="o-que-acompanhar-depois" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          O que acompanhar depois das melhorias
        </h2>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          Nossa proposta de acompanhamento combina três perguntas essenciais:
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              1. As páginas estão sendo descobertas?
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Acompanhe o status de indexação e as impressões nos relatórios do Google Search Console, observando o comportamento de páginas de serviços e artigos estratégicos.
              <CitationRef ids={[2]} />
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              2. As pessoas estão chegando ao site?
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Analise sessões, páginas de destino e canais de aquisição nas ferramentas de análise para entender de onde surgem os visitantes mais qualificados.
            </p>
          </div>

          <div className="rounded-2xl border border-[#d8d7cf] bg-white/80 p-5 sm:p-6">
            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1c1c10]">
              3. Essas visitas geram oportunidades comerciais?
            </h3>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#323630]">
              Conecte envios de formulário e cliques no WhatsApp ao CRM interno. O valor real do tráfego surge quando a empresa identifica quais conteúdos aproximam o cliente da proposta e do contrato.
            </p>
          </div>
        </div>

        {/* Interactive Checklist */}
        <SiteBuscasIaChecklist />
      </section>

      {/* Section: Por onde começar */}
      <section id="por-onde-comecar" className="mt-12 scroll-mt-28">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1c1c10]">
          Por onde começar na sua empresa
        </h2>
        <div className="mt-4 space-y-4 text-base sm:text-lg leading-relaxed text-[#1c1c10]/90">
          <p>
            Escolha um serviço prioritário, reúna as principais dúvidas que o cliente tem antes de fechar e revise a página correspondente. Depois, verifique a indexação na busca, a experiência no celular e a mensuração dos contatos recebidos.
          </p>
          <p>
            Esse trabalho transforma o conhecimento que já existe na sua operação comercial em um ativo perene para quem pesquisa uma solução no mercado.
          </p>
        </div>
      </section>

      {/* Section: Final CTA */}
      <section
        id="cta-final-site-ia"
        className="mt-12 scroll-mt-28 rounded-3xl bg-runa-pattern-dark p-7 sm:p-10 text-[#fcfae5] shadow-lg"
      >
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#fcfae5]">
          Quer preparar o site da sua empresa para esse cenário?
        </h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#E8E7DF]/90">
          Podemos ajudar com estruturação de conteúdo, revisão técnica de SEO, velocidade, integração com campanhas e automação comercial no CRM.
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
            Fazer Diagnóstico Gratuito da RUNA
          </Link>
        </div>
      </section>
    </>
  );
}
