import type { Metadata } from 'next';
import { Painel } from './Painel';

export const metadata: Metadata = { title: 'Painel · Planner Mente Calma', robots: { index: false, follow: false } };

export default function Admin() {
  return (
    <Painel
      status={{
        checkout: !!process.env.NEXT_PUBLIC_CHECKOUT,
        pixel: !!(process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID),
        utmify: !!process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID,
        suporte: !!process.env.NEXT_PUBLIC_SUPORTE_EMAIL,
        exemplo: process.env.NEXT_PUBLIC_MODO_TESTE !== '0',
      }}
    />
  );
}
