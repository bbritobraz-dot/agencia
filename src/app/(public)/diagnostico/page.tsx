import type { Metadata } from 'next';
import { DiagnosticWizard } from '@/components/diagnostic/DiagnosticWizard';

export const metadata: Metadata = {
  title: 'Diagnóstico Digital Gratuito — Avalie a Maturidade da Sua Empresa',
  description:
    'Responda 8 perguntas estratégicas e descubra gratuitamente o índice de maturidade digital da sua empresa, principais gargalos e soluções recomendadas.',
};

export default function DiagnosticoPage() {
  return (
    <section className="py-12 sm:py-20 bg-[#E8E7DF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DiagnosticWizard />
      </div>
    </section>
  );
}
