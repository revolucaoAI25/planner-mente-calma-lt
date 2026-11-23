'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

export function Faq({ itens }: { itens: [string, React.ReactNode][] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  return (
    <div className="divide-y divide-grafite/10 border-y border-grafite/10">
      {itens.map(([p, r], i) => (
        <div key={p}>
          <button type="button" onClick={() => setAberto(aberto === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={aberto === i}>
            <span className="font-display text-[16px] font-semibold leading-snug text-grafite">{p}</span>
            <Plus size={20} className={`shrink-0 text-terracota-escuro transition-transform ${aberto === i ? 'rotate-45' : ''}`} />
          </button>
          <div className={`grid transition-all duration-300 ${aberto === i ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden text-[16px] leading-relaxed text-grafite/75">{r}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
