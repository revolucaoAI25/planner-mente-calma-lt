import Image from 'next/image';
import { LogoMark } from './Logo';

/** Capa do bônus: imagem real quando houver; senão, uma capa desenhada no estilo da marca. */
export function CapaBonus({ img, titulo, n, tema }: { img?: string; titulo: string; n: number; tema: 'petroleo' | 'salvia' | 'terracota' | 'grafite' }) {
  if (img) {
    return (
      <div className="relative mx-auto aspect-[3/4] w-[62%] overflow-hidden rounded-xl shadow-papel">
        <Image src={img} alt={titulo} fill sizes="240px" className="object-cover" />
      </div>
    );
  }
  const bg = { petroleo: 'bg-petroleo text-creme', salvia: 'bg-salvia text-grafite', terracota: 'bg-terracota text-grafite', grafite: 'bg-grafite text-creme' }[tema];
  const claro = tema === 'petroleo' || tema === 'grafite';
  return (
    <div className={`relative mx-auto flex aspect-[3/4] w-[62%] -rotate-2 flex-col justify-between overflow-hidden rounded-xl p-4 shadow-papel ${bg}`}>
      <svg className="absolute -bottom-2 left-0 w-full opacity-60" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden>
        <path d="M0 30 C50 5 90 55 140 28 S200 20 200 20 V60 H0Z" fill={claro ? '#A8BDB0' : '#F7F4ED'} opacity=".55" />
        <path d="M0 45 C60 25 110 62 200 38 V60 H0Z" fill={claro ? '#D7A58D' : '#315F5A'} opacity=".6" />
      </svg>
      <div className="relative flex items-center justify-between">
        <span className="font-display text-[10px] font-bold tracking-[.25em] opacity-80">BÔNUS {String(n).padStart(2, '0')}</span>
        <LogoMark size={22} light={claro} />
      </div>
      <p className="relative pb-6 font-display text-[19px] font-bold leading-[1.1]">{titulo}</p>
    </div>
  );
}
