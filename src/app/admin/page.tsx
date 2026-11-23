import type { Metadata } from 'next';
import { Painel } from './Painel';

export const metadata: Metadata = { title: 'Painel · Planner Mente Calma', robots: { index: false, follow: false } };

export const dynamic = 'force-dynamic';

export default function Admin() {
  return (
    <Painel
      status={{
        checkout: !!process.env.NEXT_PUBLIC_CHECKOUT,
        pixel: !!(process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID),
        utmify: !!process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID,
        suporte: !!process.env.NEXT_PUBLIC_SUPORTE_EMAIL,
        exemplo: process.env.NEXT_PUBLIC_MODO_TESTE !== '0',
        resend: !!process.env.RESEND_API_KEY,
        from: !!process.env.EMAIL_FROM,
        kiwify: !!process.env.KIWIFY_WEBHOOK_TOKEN,
        segredo: !!(process.env.ENTREGA_SECRET || process.env.ADMIN_PASSWORD),
        site: (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, ''),
      }}
    />
  );
}
