'use client';

import { HomeHero } from '@/components/public/HomeHero';
import { DiagnosticTeaser } from '@/components/public/DiagnosticTeaser';
import { SolutionsExplorer } from '@/components/public/SolutionsExplorer';
import { WhyRuna } from '@/components/public/WhyRuna';
import { ProjectShowcase } from '@/components/public/ProjectShowcase';
import { MethodTimeline } from '@/components/public/MethodTimeline';
import { BlogHighlights } from '@/components/public/BlogHighlights';
import { FinalCta } from '@/components/public/FinalCta';

export default function HomePage() {

  return (
    <div className="overflow-hidden">
      {/* 1. HERO PREMIUM (animado) */}
      <HomeHero />

      {/* 2. DIAGNÓSTICO: pergunta interativa + prévia do relatório */}
      <DiagnosticTeaser />

      {/* 3. SOLUÇÕES: explorador com demonstrações animadas */}
      <SolutionsExplorer />

      {/* 4. POR QUE A RUNA: fragmentado × integrado + provas */}
      <WhyRuna />

      {/* 5. PROJETOS: vitrine do portfólio autorizado */}
      <ProjectShowcase />

      {/* 6. METODOLOGIA: linha do tempo animada */}
      <MethodTimeline />

      {/* 6.5. BLOG: os 3 artigos mais recentes */}
      <BlogHighlights />

      {/* 7. CTA FINAL: conversa no WhatsApp + diagnóstico */}
      <FinalCta />
    </div>
  );
}
