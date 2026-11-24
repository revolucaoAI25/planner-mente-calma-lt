'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { imagens } from '@/config/oferta';
import { PaginaLazy as PaginaMock } from './PaginaLazy';

/**
 * "Veja por dentro": as páginas passam sozinhas, rolando sem parar (como uma esteira).
 * Só pausa enquanto a pessoa arrasta para o lado de propósito (e volta em 1,5 s).
 * Rolar a página por cima do carrossel ou passar o mouse não para.
 * Anda só quando está visível na tela e respeita "reduzir movimento" do aparelho.
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
    const VEL = 0.05; // px por ms (~50 px/s)

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

    const pausar = (ms: number) => (pausa = performance.now() + ms);
    let x0 = 0;
    let y0 = 0;
    const inicio = (e: TouchEvent) => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    };
    const move = (e: TouchEvent) => {
      const dx = Math.abs(e.touches[0].clientX - x0);
      const dy = Math.abs(e.touches[0].clientY - y0);
      if (dx > 12 && dx > dy) pausar(1500);
    };
    const roda = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) pausar(1500);
    };

    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    el.addEventListener('touchstart', inicio, { passive: true });
    el.addEventListener('touchmove', move, { passive: true });
    el.addEventListener('wheel', roda, { passive: true });
    raf = requestAnimationFrame(passo);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener('touchstart', inicio);
      el.removeEventListener('touchmove', move);
      el.removeEventListener('wheel', roda);
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
