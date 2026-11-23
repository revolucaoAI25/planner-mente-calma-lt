'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarClock, CheckSquare, Layers, Sparkles, RotateCcw } from 'lucide-react';

type Lugar = 'resolver' | 'programar' | 'desocupar';

const PENSAMENTOS: { t: string; l: Lugar }[] = [
  { t: 'Pagar a conta de luz', l: 'resolver' },
  { t: 'E se der tudo errado amanhã?', l: 'desocupar' },
  { t: 'Marcar consulta', l: 'programar' },
  { t: 'Responder a mensagem da Ana', l: 'resolver' },
  { t: 'Será que falei besteira na reunião?', l: 'desocupar' },
  { t: 'Renovar a CNH no mês que vem', l: 'programar' },
  { t: 'Comprar o remédio', l: 'resolver' },
  { t: 'E se eu não der conta de tudo?', l: 'desocupar' },
  { t: 'Organizar o armário', l: 'programar' },
];

const LUGARES: { id: Lugar; nome: string; sub: string; icon: typeof CheckSquare; cor: string; tag: string }[] = [
  { id: 'resolver', nome: 'Resolver', sub: 'O que depende de mim', icon: CheckSquare, cor: 'bg-salvia-bg ring-salvia', tag: 'bg-petroleo text-creme' },
  { id: 'programar', nome: 'Programar', sub: 'O que não precisa ser agora', icon: CalendarClock, cor: 'bg-salvia-claro/70 ring-salvia', tag: 'bg-salvia text-grafite' },
  { id: 'desocupar', nome: 'Desocupar', sub: 'O que estou só antecipando', icon: Layers, cor: 'bg-terracota-claro ring-terracota/60', tag: 'bg-terracota text-grafite' },
];

/** Demonstração animada do Método Mente em 3 Lugares: os pensamentos saem da "cabeça" e vão para o lugar certo. */
export function MetodoDemo() {
  const [feitos, setFeitos] = useState(0);
  const [rodando, setRodando] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const iniciou = useRef(false);

  const comecar = () => {
    iniciou.current = true;
    setFeitos(0);
    setRodando(true);
  };

  useEffect(() => {
    if (!rodando) return;
    if (feitos >= PENSAMENTOS.length) {
      setRodando(false);
      return;
    }
    const t = setTimeout(() => setFeitos((f) => f + 1), feitos === 0 ? 350 : 520);
    return () => clearTimeout(t);
  }, [rodando, feitos]);

  // Começa sozinho quando a pessoa chega na seção (se ainda não tocou no botão).
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !iniciou.current) {
          setTimeout(() => !iniciou.current && comecar(), 1400);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const naCabeca = PENSAMENTOS.slice(feitos);
  const fim = feitos >= PENSAMENTOS.length;

  return (
    <div ref={ref} className="card overflow-hidden p-4 sm:p-6">
      {/* A cabeça */}
      <div className="relative rounded-2xl bg-grafite px-4 pb-5 pt-4 text-creme">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-[12px] font-bold uppercase tracking-[.2em] text-creme/70">Sua cabeça agora</p>
          <p className="font-display text-[12px] font-bold text-terracota">{naCabeca.length} pensamentos</p>
        </div>
        <div className="flex min-h-[214px] flex-wrap content-start gap-2 sm:min-h-[132px]">
          {naCabeca.map((p, i) => (
            <span
              key={p.t}
              className="animate-balao rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-creme ring-1 ring-white/15"
              style={{ animationDelay: `${(i % 5) * 0.4}s` }}
            >
              {p.t}
            </span>
          ))}
          {fim && (
            <p className="animate-entra flex items-center gap-2 text-[15px] text-salvia">
              <Sparkles size={16} /> Espaço livre. Agora dá para pensar com calma.
            </p>
          )}
        </div>
      </div>

      {/* Os 3 lugares */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {LUGARES.map((L) => {
          const itens = PENSAMENTOS.slice(0, feitos).filter((p) => p.l === L.id);
          return (
            <div key={L.id} className={`rounded-2xl p-3.5 ring-1 ${L.cor}`}>
              <div className="flex items-center gap-2">
                <L.icon size={18} className="text-petroleo" strokeWidth={2.2} />
                <p className="font-display text-[15px] font-bold uppercase tracking-wide text-grafite">{L.nome}</p>
              </div>
              <p className="text-[13px] italic text-grafite/60">{L.sub}</p>
              <div className="mt-2.5 flex min-h-[44px] flex-col gap-1.5">
                {itens.map((p) => (
                  <span key={p.t} className={`animate-entra rounded-lg px-2.5 py-1.5 text-[13px] font-bold ${L.tag}`}>
                    {p.t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        {fim ? (
          <p className="animate-entra rounded-xl bg-terracota-claro px-4 py-2.5 text-center text-[15px] text-grafite sm:text-left">
            <b>Primeira ação definida:</b> pagar a conta de luz. O resto já tem lugar.
          </p>
        ) : (
          <p className="text-center text-[14px] text-grafite/60 sm:text-left">Veja o método separando os pensamentos em 10 minutos (aqui, em 5 segundos).</p>
        )}
        <button
          type="button"
          onClick={comecar}
          disabled={rodando}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-petroleo px-5 py-2.5 font-display text-[13px] font-bold uppercase tracking-wide text-creme transition hover:bg-petroleo-escuro disabled:opacity-60"
        >
          {fim ? <RotateCcw size={15} /> : <Sparkles size={15} />}
          {fim ? 'Ver de novo' : rodando ? 'Organizando…' : 'Organizar minha cabeça'}
        </button>
      </div>
    </div>
  );
}
