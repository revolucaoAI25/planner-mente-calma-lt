'use client';

import { ArrowRight } from 'lucide-react';
import { checkout, preco } from '@/config/oferta';
import { checkoutUrl, track } from '@/lib/tracking';

/** Botão de compra: abre o checkout da Kiwify com as UTMs (ou rola até o preço, se o link ainda não existe). */
export function Cta({ children, className = '', verde = false }: { children: React.ReactNode; className?: string; verde?: boolean }) {
  return (
    <a
      href={checkout || '#oferta'}
      className={`${verde ? 'btn-verde' : 'btn-principal animate-pulso'} ${className}`}
      onClick={(e) => {
        if (!checkout) return;
        e.preventDefault();
        track('InitiateCheckout', { value: preco, currency: 'BRL', content_name: 'Planner Mente Calma' });
        window.location.href = checkoutUrl(checkout);
      }}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight size={19} strokeWidth={2.6} className="relative z-10 shrink-0" />
    </a>
  );
}
