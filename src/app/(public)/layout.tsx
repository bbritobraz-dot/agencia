import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { WhatsAppFloat } from '@/components/public/WhatsAppFloat';
import { CookieConsentBanner } from '@/components/public/CookieConsentBanner';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CookieConsentBanner />
    </div>
  );
}
