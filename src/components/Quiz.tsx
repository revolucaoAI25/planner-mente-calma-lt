'use client';

import { useState } from 'react';
import { ArrowLeft, Brain, CalendarDays, Check, RotateCcw, Wind } from 'lucide-react';
import { Cta } from './Cta';

type Lugar = 'resolver' | 'programar' | 'desocupar';

/** Cada resposta vale 0, 1 ou 2. Nada é salvo nem enviado: o resultado é calculado só no navegador. */
const PERGUNTAS: { q: string; ops: [string, string, string]; lugar: Lugar; sinal: string }[] = [
  {
    q: 'Quando você deita para dormir, a sua cabeça…',
    ops: ['Começa a repassar tudo o que fez, não fez e pode dar errado', 'Às vezes demora para desligar', 'Desliga rápido, sem esforço'],
    lugar: 'desocupar',
    sinal: 'Sua cabeça usa a hora de descansar para revisar o dia',
  },
  {
    q: 'Com que frequência parece que tudo é urgente ao mesmo tempo?',
    ops: ['Quase todo dia', 'Algumas vezes por semana', 'Raramente'],
    lugar: 'programar',
    sinal: 'Tudo parece urgente, então nada sai do lugar',
  },
  {
    q: 'Você se pega pensando “e se…” sobre coisas que ainda nem aconteceram?',
    ops: ['O tempo todo', 'De vez em quando', 'Quase nunca'],
    lugar: 'desocupar',
    sinal: 'Você antecipa problemas que talvez nunca cheguem',
  },
  {
    q: 'Quantas coisas você começa e larga no meio porque a cabeça puxou para outra?',
    ops: ['Muitas, termino o dia com tudo pela metade', 'Algumas', 'Poucas, costumo terminar o que começo'],
    lugar: 'resolver',
    sinal: 'A mente pula de tarefa em tarefa e você se perde no meio',
  },
  {
    q: 'No fim do dia, como você se sente?',
    ops: ['Exausta(o), mesmo sem ter feito o que importava', 'Cansada(o), mas com algumas coisas feitas', 'Tranquila(o) com o que fiz'],
    lugar: 'resolver',
    sinal: 'Sua energia vai embora pensando, e não fazendo',
  },
];

const LUGAR_INFO: Record<Lugar, { nome: string; icon: typeof Brain; dica: string }> = {
  resolver: { nome: 'Resolver', icon: Check, dica: 'separar o que depende de você e definir um primeiro passo' },
  programar: { nome: 'Programar', icon: CalendarDays, dica: 'tirar da frente o que não precisa ser agora' },
  desocupar: { nome: 'Desocupar', icon: Wind, dica: 'registrar o que é só antecipação e soltar' },
};

export function Quiz() {
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<number[]>([]);
  const [saindo, setSaindo] = useState(false);
  const fim = resp.length === PERGUNTAS.length;
  const pontos = resp.reduce((a, v) => a + (2 - v), 0); // opção 0 = 2 pontos
  const max = PERGUNTAS.length * 2;
  const pct = Math.round((pontos / max) * 100);

  const escolher = (op: number) => {
    if (saindo) return;
    setSaindo(true);
    setTimeout(() => {
      setResp((r) => [...r.slice(0, i), op]);
      setI((n) => Math.min(PERGUNTAS.length, n + 1));
      setSaindo(false);
    }, 260);
  };
  const voltar = () => {
    setResp((r) => r.slice(0, Math.max(0, i - 1)));
    setI((n) => Math.max(0, n - 1));
  };
  const refazer = () => {
    setResp([]);
    setI(0);
  };

  const progresso = fim ? 100 : Math.round((i / PERGUNTAS.length) * 100);

  return (
    <div className="overflow-hidden rounded-[26px] bg-white shadow-papel ring-1 ring-grafite/5">
      <div className="bg-petroleo px-5 py-4 text-creme sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[.16em]">
            <Brain size={17} /> Teste rápido · 1 minuto
          </p>
          <p className="font-display text-[13px] font-bold text-salvia">{fim ? 'Resultado' : `${i + 1} de ${PERGUNTAS.length}`}</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-terracota transition-all duration-500" style={{ width: `${progresso}%` }} />
        </div>
      </div>

      {!fim ? (
        <div key={i} className={`px-5 pb-6 pt-6 sm:px-7 ${saindo ? 'opacity-0 transition-opacity duration-200' : 'animate-entra'}`}>
          <p className="font-display text-[20px] font-bold leading-snug text-grafite sm:text-[22px]">{PERGUNTAS[i].q}</p>
          <div className="mt-5 space-y-2.5">
            {PERGUNTAS[i].ops.map((o, k) => (
              <button
                key={o}
                type="button"
                onClick={() => escolher(k)}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-[15.5px] leading-snug transition active:scale-[.99] ${
                  resp[i] === k ? 'border-petroleo bg-salvia-bg' : 'border-grafite/10 bg-creme/60 hover:border-petroleo/40 hover:bg-salvia-bg/60'
                }`}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-petroleo/40 font-display text-[11px] font-bold text-petroleo">{'ABC'[k]}</span>
                {o}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-[13px] text-grafite/50">
            {i > 0 ? (
              <button type="button" onClick={voltar} className="inline-flex items-center gap-1 font-bold hover:text-grafite">
                <ArrowLeft size={14} /> Voltar
              </button>
            ) : (
              <span>Responda com sinceridade. Nada é salvo.</span>
            )}
          </div>
        </div>
      ) : (
        <Resultado resp={resp} pct={pct} refazer={refazer} />
      )}
    </div>
  );
}

function Resultado({ resp, pct, refazer }: { resp: number[]; pct: number; refazer: () => void }) {
  const nivel = pct >= 70 ? 'alto' : pct >= 40 ? 'medio' : 'baixo';
  const titulo = {
    alto: 'Sua mente está no modo sobrecarga.',
    medio: 'Sua mente fica acelerada mais vezes do que deveria.',
    baixo: 'Sua mente dá sinais de sobrecarga em alguns momentos.',
  }[nivel];
  const texto = {
    alto: 'Você está guardando tudo na cabeça ao mesmo tempo: o que precisa fazer, o que pode esperar e o que é só preocupação. É por isso que tudo parece urgente e o cansaço chega antes das tarefas.',
    medio: 'Em boa parte dos dias, a sua cabeça mistura tarefas com preocupações. Quando isso acontece, fica difícil saber por onde começar e a energia vai embora pensando.',
    baixo: 'Na maior parte do tempo você dá conta, mas nos dias mais cheios a cabeça acelera. Ter um lugar para descarregar tudo evita que esses dias virem semanas.',
  }[nivel];
  const sinais = resp.map((r, k) => ({ r, p: PERGUNTAS[k] })).filter((x) => x.r === 0);
  const lista = (sinais.length ? sinais : resp.map((r, k) => ({ r, p: PERGUNTAS[k] })).filter((x) => x.r === 1)).slice(0, 3);
  const lugares = Array.from(new Set(lista.map((x) => x.p.lugar)));

  return (
    <div className="animate-entra px-5 pb-6 pt-6 sm:px-7">
      <div className="flex items-center gap-4">
        <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#B5694A ${pct * 3.6}deg, #EAF1EC 0)` }}>
          <div className="grid h-[64px] w-[64px] place-items-center rounded-full bg-white">
            <span className="font-display text-[20px] font-bold text-grafite">{pct}%</span>
          </div>
        </div>
        <div>
          <p className="font-display text-[12px] font-bold uppercase tracking-[.16em] text-terracota-escuro">Nível de sobrecarga mental</p>
          <p className="mt-1 font-display text-[20px] font-bold leading-snug text-grafite">{titulo}</p>
        </div>
      </div>
      <p className="mt-4 text-[15.5px] leading-relaxed text-grafite/75">{texto}</p>

      {lista.length > 0 && (
        <div className="mt-4 rounded-2xl bg-creme p-4">
          <p className="font-display text-[12px] font-bold uppercase tracking-[.16em] text-grafite/50">O que mais pesa em você</p>
          <ul className="mt-2 space-y-1.5">
            {lista.map((x) => (
              <li key={x.p.q} className="flex gap-2 text-[15px] leading-snug text-grafite/85">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-terracota-escuro" />
                {x.p.sinal}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 rounded-2xl bg-salvia-bg p-4">
        <p className="font-display text-[12px] font-bold uppercase tracking-[.16em] text-petroleo">Recomendação para você</p>
        <p className="mt-1.5 text-[15.5px] leading-relaxed text-grafite/85">
          O <b>Método Mente em 3 Lugares</b>, 10 minutos por dia. Começando por:
        </p>
        <div className="mt-2.5 space-y-2">
          {(lugares.length ? lugares : (['resolver', 'programar', 'desocupar'] as Lugar[])).map((l) => {
            const L = LUGAR_INFO[l];
            return (
              <p key={l} className="flex items-start gap-2.5 rounded-xl bg-white px-3 py-2.5 text-[14.5px] leading-snug text-grafite/85 ring-1 ring-petroleo/10">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-petroleo text-creme">
                  <L.icon size={13} strokeWidth={2.6} />
                </span>
                <span>
                  <b className="text-grafite">{L.nome}</b>: {L.dica}
                </span>
              </p>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Cta>Quero organizar minha mente</Cta>
        <button type="button" onClick={refazer} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-grafite/50 hover:text-grafite">
          <RotateCcw size={13} /> Refazer o teste
        </button>
      </div>
      <p className="mt-4 text-center text-[12px] leading-snug text-grafite/45">Este teste é um exercício de autopercepção e não é um diagnóstico. Nenhuma resposta é salva.</p>
    </div>
  );
}
