'use client';

import { useEffect, useState } from 'react';
import { preco, precoDe, valorBR } from '@/config/oferta';
import { Cta } from './Cta';

/** Barra fixa no celular: aparece depois do topo e some na seção de preço. */
export function StickyBar() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const oferta = document.getElementById('oferta')?.getBoundingClientRect();
      const naOferta = oferta ? oferta.top < innerHeight && oferta.bottom > 0 : false;
      setVer(scrollY > 900 && !naOferta);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    addEventListener('scroll', on, { passive: true });
    return () => {
      removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-grafite/10 bg-creme px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(38,52,49,.25)] transition-transform will-change-transform duration-300 sm:hidden ${ver ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex items-center gap-3">
        <div className="shrink-0 leading-tight">
          <p className="text-[11px] text-grafite/60">
            de <s>R$ {precoDe}</s> por
          </p>
          <p className="font-display text-[20px] font-bold text-grafite">R$ {valorBR(preco)}</p>
        </div>
        <Cta className="!min-h-[50px] !px-4 !text-[13px]">Quero o meu</Cta>
      </div>
    </div>
  );
}
