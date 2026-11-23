'use client';

import { useEffect, useState } from 'react';
import { FlaskConical } from 'lucide-react';

/** Botão do modo teste: mostra/esconde o conteúdo fictício (criadora e depoimentos de exemplo) para validar a página. */
export function BotaoTeste() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    try {
      setOn(localStorage.getItem('pmc:teste') !== '0');
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('sem-teste', !on);
    try {
      localStorage.setItem('pmc:teste', on ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [on]);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      className="fixed bottom-[96px] left-3 z-50 sm:bottom-4 inline-flex items-center gap-1.5 rounded-full bg-[#3b2f7a] px-3 py-1.5 font-display text-[11px] font-bold text-white shadow-lg ring-2 ring-white/70"
      title="Conteúdo fictício só para validar o layout. Desligue com NEXT_PUBLIC_MODO_TESTE=0."
    >
      <FlaskConical size={13} /> Teste: {on ? "exemplos ligados" : "exemplos desligados"}
    </button>
  );
}
