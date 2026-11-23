'use client';

import { useEffect, useRef, useState } from 'react';
import { PaginaMock } from './PaginaMock';

/** Desenha a página ilustrada só quando ela chega perto da tela (deixa o primeiro carregamento mais leve). */
export function PaginaLazy({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setVer(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setVer(true), io.disconnect()), { rootMargin: '600px 600px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ver ? <PaginaMock id={id} /> : <div ref={ref} className="aspect-[3/4.1] w-full rounded-[14px] bg-[#FFFDF8] shadow-papel ring-1 ring-grafite/10" />;
}
