'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RUNA_SERVICES } from '@/config/services';
import { buildRunaWhatsAppUrl, trackRunaEvent } from '@/lib/analytics/tracker';
import { Lock, Mail, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  const handleWhatsAppClick = () => {
    trackRunaEvent('whatsapp_click', { placement: 'footer' });
  };

  return (
    <footer className="bg-runa-pattern-darkest text-[#fcfae5] border-t border-[#27594F]/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Coluna 1: Marca */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-white.webp"
                alt="RUNA"
                width={130}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-[#E8E7DF]/80 max-w-sm">
              Agência de marketing, tecnologia e automação especializada em criar soluções digitais que ajudam empresas a atrair clientes, melhorar conversões e otimizar operações.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-[#C1C0AC]">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#C97F38]" />
                Foz do Iguaçu, PR — Atendimento Nacional
              </span>
              <a
                href="mailto:contato@runamkt.com.br"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 text-[#C97F38]" />
                contato@runamkt.com.br
              </a>
              <a
                href={buildRunaWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[#C97F38]" />
                +55 (45) 98431-7910
              </a>
            </div>
          </div>

          {/* Coluna 2: Soluções */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C97F38] mb-4">
              Soluções e Engenharia Digital
            </h3>
            <ul className="space-y-2.5 text-sm">
              {RUNA_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/solucoes/${service.slug}`}
                    className="text-[#E8E7DF]/80 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Navegação */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C97F38] mb-4">
              Institucional
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-[#E8E7DF]/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/solucoes" className="text-[#E8E7DF]/80 hover:text-white transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <Link href="/projetos" className="text-[#E8E7DF]/80 hover:text-white transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-[#E8E7DF]/80 hover:text-white transition-colors">
                  Sobre a RUNA
                </Link>
              </li>
              <li>
                <Link href="/diagnostico" className="text-[#E8E7DF]/80 hover:text-white transition-colors">
                  Diagnóstico Gratuito
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-[#E8E7DF]/80 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Governança & Admin */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C97F38] mb-4">
              Governança & LGPD
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-[#E8E7DF]/80 hover:text-white transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-[#C1C0AC] hover:text-white transition-colors"
                >
                  <Lock className="h-3.5 w-3.5 text-[#C97F38]" />
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#27594F]/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C1C0AC]">
          <p>© {new Date().getFullYear()} Agência RUNA · CNPJ 53.486.863/0001-87 · Todos os direitos reservados.</p>
          <p>Marketing, Tecnologia e Inteligência para Empresas.</p>
        </div>
      </div>
    </footer>
  );
}
