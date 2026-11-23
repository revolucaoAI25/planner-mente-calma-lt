'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { imagens } from '@/config/oferta';
import { PaginaLazy as PaginaMock } from './PaginaLazy';

/** Carrossel "Veja por dentro": prints reais quando houver (campo img), senão a ilustração da página. */
export function PorDentro() {
  const ref = useRef<HTMLDivElement>(null);
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const itens = imagens.porDentro;
  const ir = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const n = (i + itens.length) % itens.length;
    const card = el.children[n] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: 'smooth' });
  };
  // Passa sozinho enquanto está na tela; para de vez quando a pessoa mexe no carrossel.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (pausado || !visivel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => ir(atual + 1), 3200);
    return () => clearInterval(t);
  });
  const parar = () => setPausado(true);

  return (
    <div className="relative" onPointerDown={parar} onWheel={parar} onKeyDown={parar}>
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          const w = (el.children[0] as HTMLElement)?.offsetWidth || 1;
          setAtual(Math.round(el.scrollLeft / (w + 16)));
        }}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {itens.map((p) => (
          <figure key={p.id} className="w-[72%] shrink-0 snap-center sm:w-[300px]">
            {p.img ? (
              <div className="relative aspect-[148/210] overflow-hidden rounded-[10px] bg-white shadow-papel ring-1 ring-grafite/10">
                <Image src={p.img} alt={p.legenda} fill sizes="(max-width:640px) 72vw, 300px" className="object-cover" />
              </div>
            ) : (
              <PaginaMock id={p.id} />
            )}
            <figcaption className="mt-3 text-center text-[14px] leading-snug text-grafite/70">{p.legenda}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button type="button" aria-label="Anterior" onClick={() => ir(atual - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-suave ring-1 ring-grafite/10">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {itens.map((p, i) => (
            <span key={p.id} className={`h-1.5 rounded-full transition-all ${i === atual ? 'w-6 bg-petroleo' : 'w-1.5 bg-grafite/20'}`} />
          ))}
        </div>
        <button type="button" aria-label="Próxima" onClick={() => ir(atual + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-suave ring-1 ring-grafite/10">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
