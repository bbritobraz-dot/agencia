import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade e Proteção de Dados (LGPD)',
  description:
    'Política de Privacidade e diretrizes de tratamento de dados pessoais da Agência RUNA em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="py-20 bg-[#E8E7DF]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#d8d7cf] bg-[#fcfae5] p-8 sm:p-12 shadow-sm space-y-6 text-sm text-[#1c1c10] leading-relaxed">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C97F38]">
              Governança e Conformidade LGPD
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-[#1c1c10] mt-1">
              Política de Privacidade e Tratamento de Dados
            </h1>
            <p className="text-xs text-[#4c524b] mt-2">
              Agência RUNA · CNPJ 53.486.863/0001-87 · Última atualização: Novembro de 2026
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#27594F]">
              1. Compromisso com a Privacidade (Lei nº 13.709/2018 — LGPD)
            </h2>
            <p className="text-[#4c524b]">
              A RUNA coleta e trata dados corporativos e pessoais estritamente necessários para a realização do Diagnóstico Digital, atendimento comercial consultivo e prestação de serviços de marketing, tecnologia e automação.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#27594F]">
              2. Dados Coletados e Finalidades
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#4c524b]">
              <li>
                <strong>Dados de Identificação e Contato:</strong> Nome, e-mail corporativo, telefone/WhatsApp, empresa, segmento e faixa de faturamento opcional, fornecidos voluntariamente nos formulários do site e do diagnóstico.
              </li>
              <li>
                <strong>Respostas do Diagnóstico Digital:</strong> Informações sobre maturidade operacional utilizadas para calcular a pontuação da empresa e recomendar soluções adequadas.
              </li>
              <li>
                <strong>Dados de Atribuição e Navegação:</strong> Parâmetros de campanha (UTMs), página de entrada e eventos agregados de interação.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#27594F]">
              3. Separação de Consentimento e Proteção em Analytics
            </h2>
            <p className="text-[#4c524b]">
              Solicitamos consentimento específico para o tratamento de atendimento comercial e consentimento separado e opcional para comunicações de marketing. Além disso, os eventos de web analytics (como início e avanço no diagnóstico) são sanitizados para <strong>jamais transmitir informações pessoais identificáveis (PII)</strong>, como nome, e-mail ou telefone, para ferramentas externas de análise.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#27594F]">
              4. Segurança e Controle de Acesso (Row Level Security)
            </h2>
            <p className="text-[#4c524b]">
              Os dados submetidos são armazenados em banco de dados PostgreSQL gerenciado com criptografia e políticas estritas de isolamento (Row Level Security — RLS). Visitantes públicos não possuem permissão de leitura sobre registros de leads ou diagnósticos, restritos exclusivamente a administradores autenticados.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#27594F]">
              5. Direitos do Titular dos Dados
            </h2>
            <p className="text-[#4c524b]">
              Você pode solicitar a confirmação de tratamento, acesso, correção, anonimização ou exclusão dos seus dados a qualquer momento enviando uma solicitação para{' '}
              <a href="mailto:contato@airuna.com.br" className="text-[#C97F38] font-semibold underline">
                contato@airuna.com.br
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
