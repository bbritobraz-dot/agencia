'use client';

import { MessageCircle } from 'lucide-react';
import { buildRunaWhatsAppUrl, trackRunaEvent } from '@/lib/analytics/tracker';

export function WhatsAppFloat() {
  const handleClick = () => {
    trackRunaEvent('whatsapp_click', { placement: 'floating_button' });
  };

  return (
    <a
      href={buildRunaWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Conversar com a RUNA no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
    </a>
  );
}
