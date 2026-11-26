'use client';

import Image from 'next/image';
import { Check, Clock3, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkout, imagens, preco, precoDe, valorBR } from '@/config/oferta';
import { destinoCheckout, track } from '@/lib/tracking';
import { LogoMark } from './Logo';

const KEY = 'pmc:saida';

/**
 * Pop-up de saída: relembra a oferta (mesmo preço) com o aviso de condição por tempo limitado.
 * Computador: mouse saindo pelo topo da janela. Celular: gesto/botão de voltar.
 * Aparece uma vez por visita e não aparece para quem já clicou em comprar.
 */
export function ExitPopup() {
  const [open, setOpen] = useState(false);
  const [seg, setSeg] = useState(600);
  const armed = useRef(false);

  const jaViu = () => {
    try {
      return sessionStorage.getItem(KEY) === '1' || sessionStorage.getItem('pmc:checkout') === '1';
    } catch {
      return false;
    }
  };
  const mostrar = useCallback(() => {
    if (jaViu()) return false;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setOpen(true);
    return true;
  }, []);

  // Links internos (#oferta…) rolam a página sem criar entrada no histórico (senão o "voltar" abriria o pop-up).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      const id = a?.getAttribute('href')?.slice(1);
      const alvo = id ? document.getElementById(id) : null;
      if (!alvo) return;
      e.preventDefault();
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (jaViu()) return;
    const t0 = Date.now();
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0 && Date.now() - t0 > 6000) mostrar();
    };
    document.addEventListener('mouseout', onOut);
    const onPop = () => {
      if (!armed.current) return;
      armed.current = false;
      if (!mostrar()) history.back();
    };
    const arm = () => {
      if (armed.current || window.scrollY < 600 || jaViu()) return;
      armed.current = true;
      try {
        history.pushState({ pmcSaida: true }, '');
      } catch {
        /* ignore */
      }
      window.removeEventListener('scroll', arm);
    };
    window.addEventListener('scroll', arm, { passive: true });
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('scroll', arm);
      window.removeEventListener('popstate', onPop);
    };
  }, [mostrar]);

  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setSeg((s) => Math.max(0, s - 1)), 1000);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearInterval(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  const comprar = () => {
    try {
      sessionStorage.setItem('pmc:checkout', '1');
    } catch {
      /* ignore */
    }
    if (checkout) {
      track('InitiateCheckout', { value: preco, currency: 'BRL', content_name: 'Planner Mente Calma (pop-up de saída)' });
      window.location.href = destinoCheckout(checkout);
    } else {
      setOpen(false);
      document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const mm = String(Math.floor(seg / 60)).padStart(2, '0');
  const ss = String(seg % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-grafite/60 p-3 backdrop-blur-[2px] sm:items-center" onClick={() => setOpen(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="saida-titulo" className="animate-entra relative max-h-[92dvh] w-full max-w-[430px] overflow-y-auto rounded-[28px] bg-creme shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setOpen(false)} aria-label="Fechar" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-creme">
          <X size={18} />
        </button>
        <div className="rounded-t-[28px] bg-petroleo px-6 pb-5 pt-6 text-center text-creme">
          <LogoMark size={40} light className="mx-auto" />
          <p className="mt-3 font-display text-[12px] font-bold uppercase tracking-[.2em] text-terracota">Espera! Antes de sair…</p>
          <h2 id="saida-titulo" className="mt-2 font-display text-[23px] font-bold leading-tight">
            Sua mente merece 10 minutos de calma por dia.
          </h2>
          <p className="mt-2 text-[14.5px] text-creme/80">A condição de lançamento é por tempo limitado e pode sair do ar a qualquer momento.</p>
        </div>
        <div className="px-6 pb-6 pt-5">
          <div className="flex items-center gap-4">
            <Image src={imagens.capa} alt="" width={700} height={847} sizes="96px" className="h-auto w-[96px] shrink-0 -rotate-3 drop-shadow-[0_10px_14px_rgba(38,52,49,.3)]" />
            <div>
              <p className="text-[14px] text-grafite/60">
                de <s>R$ {precoDe}</s> por
              </p>
              <p className="font-display text-[44px] font-bold leading-none text-grafite">R$ {valorBR(preco)}</p>
              <p className="mt-1 text-[13px] text-grafite/60">planner completo + 4 bônus</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-terracota-claro py-2.5 text-[14px] text-grafite">
            <Clock3 size={16} className="text-terracota-escuro" /> Condição garantida por mais <b className="font-display tabular-nums">{mm}:{ss}</b>
          </div>
          <ul className="mt-4 space-y-1.5 text-[14.5px] text-grafite/85">
            {['Método Mente em 3 Lugares, em 10 minutos por dia', '4 bônus para os momentos mais pesados', `Garantia de 7 dias: se não for para você, devolvemos tudo`].map((t) => (
              <li key={t} className="flex gap-2">
                <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-petroleo" /> {t}
              </li>
            ))}
          </ul>
          <button type="button" onClick={comprar} className="btn-principal mt-5 !w-full !min-w-0">
            <span className="relative z-10">Quero garantir por R$ {valorBR(preco)}</span>
          </button>
          <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full py-2 text-center text-[13px] text-grafite/50 underline">
            Não, prefiro continuar com a cabeça cheia
          </button>
        </div>
      </div>
    </div>
  );
}
