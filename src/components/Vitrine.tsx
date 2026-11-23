import Image from 'next/image';
import { imagens } from '@/config/oferta';
import { PaginaLazy as PaginaMock } from './PaginaLazy';

/**
 * Mockup "por dentro": o planner aberto no tablet e uma página impressa ao lado.
 * Se houver imagem real (imagens.mockupPorDentro), ela substitui a composição.
 */
export function Vitrine() {
  if (imagens.mockupPorDentro) {
    return (
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[820px] overflow-hidden rounded-[26px] shadow-papel">
        <Image src={imagens.mockupPorDentro} alt="O Planner Mente Calma por dentro" fill sizes="(max-width:820px) 100vw, 820px" className="object-cover" />
      </div>
    );
  }
  return (
    <div className="relative -mx-2 w-[calc(100%+16px)] max-w-[820px] pb-6 pt-2 sm:mx-auto sm:w-full sm:px-6">
      <div className="absolute inset-x-6 bottom-0 top-10 rounded-[40px] bg-gradient-to-br from-salvia/50 via-salvia-claro/40 to-terracota/40 blur-2xl" />
      <div className="relative grid grid-cols-[1.3fr_.85fr] items-end gap-0 sm:grid-cols-[1fr_.7fr]">
        {/* tablet */}
        <div className="relative z-10 rotate-[-2deg]">
          <div className="rounded-[26px] bg-grafite p-[10px] shadow-papel ring-1 ring-black/40 sm:rounded-[34px] sm:p-[14px]">
            <div className="overflow-hidden rounded-[16px] sm:rounded-[22px]">
              <PaginaMock id="metodo" />
            </div>
          </div>
          <span className="absolute -bottom-3 left-4 rounded-full bg-white px-3 py-1.5 font-display text-[11.5px] font-bold text-petroleo shadow-suave sm:text-[12.5px]">📱 No tablet</span>
        </div>
        {/* folha impressa */}
        <div className="relative -ml-6 mb-6 rotate-[5deg] sm:-ml-10">
          <PaginaMock id="dia" />
          <span className="absolute -bottom-3 right-3 rounded-full bg-terracota-escuro px-3 py-1.5 font-display text-[11.5px] font-bold text-white shadow-suave sm:text-[12.5px]">🖨️ Ou impresso</span>
        </div>
      </div>
    </div>
  );
}
