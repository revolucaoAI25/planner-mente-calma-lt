'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { imagens } from '@/config/oferta';
import { PaginaLazy as PaginaMock } from './PaginaLazy';

/**
 * "Veja por dentro": as páginas passam sozinhas, rolando sem parar (como uma esteira).
 * Pausa enquanto a pessoa toca/arrasta ou passa o mouse; dá para arrastar com o dedo.
 * Só anda quando está visível na tela, e respeita "reduzir movimento" do aparelho.
 */
export function PorDentro() {
  const ref = useRef<HTMLDivElement>(null);
  const itens = imagens.porDentro;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visivel = false;
    let pausa = 0; // até quando fica parado (ms)
    let ultimo = 0;
    let raf = 0;
    let pos = el.scrollLeft;
    const VEL = 0.045; // px por ms (~45 px/s)

    const passo = (t: number) => {
      raf = requestAnimationFrame(passo);
      const dt = ultimo ? Math.min(t - ultimo, 50) : 0;
      ultimo = t;
      if (!visivel || t < pausa) {
        pos = el.scrollLeft;
        return;
      }
      const meio = el.scrollWidth / 2; // a lista está duplicada: ao chegar na metade, volta ao início sem salto visível
      pos += VEL * dt;
      if (pos >= meio) pos -= meio;
      el.scrollLeft = pos;
    };
    const parar = (ms = 2500) => () => (pausa = performance.now() + ms);
    const tocar = parar(3000);
    const mouse = parar(600000);
    const sair = () => (pausa = performance.now() + 400);

    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    el.addEventListener('pointerdown', tocar, { passive: true });
    el.addEventListener('touchmove', tocar, { passive: true });
    el.addEventListener('wheel', tocar, { passive: true });
    el.addEventListener('mouseenter', mouse);
    el.addEventListener('mouseleave', sair);
    raf = requestAnimationFrame(passo);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener('pointerdown', tocar);
      el.removeEventListener('touchmove', tocar);
      el.removeEventListener('wheel', tocar);
      el.removeEventListener('mouseenter', mouse);
      el.removeEventListener('mouseleave', sair);
    };
  }, []);

  const lista = [...itens, ...itens];
  return (
    <div className="relative -mx-5 sm:-mx-8">
      <div ref={ref} className="flex gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:gap-6 sm:px-8 [&::-webkit-scrollbar]:hidden">
        {lista.map((p, i) => (
          <figure key={`${p.id}-${i}`} className="w-[64%] max-w-[280px] shrink-0 sm:w-[280px]" aria-hidden={i >= itens.length || undefined}>
            {p.img ? (
              <div className="relative aspect-[148/210] overflow-hidden rounded-[10px] bg-white shadow-papel ring-1 ring-grafite/10">
                <Image src={p.img} alt={i < itens.length ? p.legenda : ''} fill sizes="(max-width:640px) 64vw, 280px" className="object-cover" loading={i < 3 ? 'eager' : 'lazy'} />
              </div>
            ) : (
              <PaginaMock id={p.id} />
            )}
            <figcaption className="mt-3 text-center text-[14px] leading-snug text-grafite/70">{p.legenda}</figcaption>
          </figure>
        ))}
      </div>
      {/* bordas suaves para a esteira entrar e sair da tela */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#FCFBF8] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#FCFBF8] to-transparent sm:w-16" />
    </div>
  );
}
