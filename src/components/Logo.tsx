/** Símbolo do Planner Mente Calma (C aberto com três fios que se cruzam e seguem paralelos). */
export function LogoMark({ size = 44, light = false, className = '' }: { size?: number; light?: boolean; className?: string }) {
  const ring = light ? '#F7F4ED' : '#315F5A';
  const a = light ? '#F7F4ED' : '#6E9488';
  const b = light ? 'rgba(247,244,237,.75)' : '#A8BDB0';
  const c = light ? '#F7F4ED' : '#D08A68';
  return (
    <svg width={size} height={size * 0.84} viewBox="0 0 120 100" fill="none" className={className} aria-hidden>
      <path d="M86 18.5 A44 44 0 1 0 86 81.5" stroke={ring} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M7 40 C26 40 34 58 50 58 C58 58 62 50 70 50 H112" stroke={b} strokeWidth="5" strokeLinecap="round" />
      <path d="M7 58 C26 58 34 40 50 40 C56 40 60 40 70 40 H112" stroke={a} strokeWidth="5" strokeLinecap="round" />
      <path d="M9 67 C28 67 36 52 50 54 C58 55 62 60 70 60 H112" stroke={c} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={40} light={light} />
      <span className="leading-none">
        <span className={`block text-[9px] font-semibold tracking-[.42em] ${light ? 'text-creme/80' : 'text-petroleo'}`}>PLANNER</span>
        <span className={`block font-display text-[21px] font-bold tracking-tight ${light ? 'text-creme' : 'text-grafite'}`}>mente calma</span>
      </span>
    </span>
  );
}
