import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { DiagnosticWizard } from '@/components/diagnostic/DiagnosticWizard';

export const metadata: Metadata = pageMetadata({
  title: 'Diagnóstico digital gratuito em 2 minutos',
  description:
    'Responda 8 perguntas e receba na hora a nota de maturidade digital da sua empresa, os principais gargalos e o que priorizar primeiro.',
  path: '/diagnostico',
  image: '/og/diagnostico.jpg',
});

export default async function DiagnosticoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q1 } = await searchParams;
  return (
    <section className="py-12 sm:py-20 bg-[#E8E7DF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DiagnosticWizard initialQ1={typeof q1 === 'string' ? q1 : undefined} />
      </div>
    </section>
  );
}
