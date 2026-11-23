import { LogoMark } from './Logo';

/**
 * Ilustração provisória de uma página do planner (até chegarem os prints reais).
 * Desenhada em HTML para ficar nítida em qualquer tela.
 */
export function PaginaMock({ id }: { id: string }) {
  return (
    <div className="relative aspect-[3/4.1] w-full overflow-hidden rounded-[14px] bg-[#FFFDF8] shadow-papel ring-1 ring-grafite/10">
      {/* furos do fichário */}
      <div className="absolute inset-y-4 left-2 flex flex-col justify-between">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="block h-2 w-2 rounded-full bg-creme-escuro ring-1 ring-grafite/10" />
        ))}
      </div>
      <div className="flex h-full flex-col py-4 pl-7 pr-4 text-grafite">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-bold tracking-[.3em] text-petroleo/70">PLANNER MENTE CALMA</span>
          <LogoMark size={18} />
        </div>
        {CONTEUDO[id] ?? CONTEUDO.metodo}
      </div>
    </div>
  );
}

const Linhas = ({ n = 3, cor = 'border-grafite/10' }: { n?: number; cor?: string }) => (
  <div className="space-y-[9px] pt-1">
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className={`border-b ${cor}`} />
    ))}
  </div>
);

const Titulo = ({ t, s }: { t: string; s?: string }) => (
  <div className="mb-2 mt-2">
    <p className="font-display text-[15px] font-bold leading-tight text-petroleo">{t}</p>
    {s && <p className="text-[9px] italic text-grafite/55">{s}</p>}
  </div>
);

const Caixa = ({ t, cor, children }: { t: string; cor: string; children?: React.ReactNode }) => (
  <div className={`rounded-lg p-2 ${cor}`}>
    <p className="font-display text-[9px] font-bold tracking-wider">{t}</p>
    {children}
  </div>
);

const Escrito = ({ children }: { children: React.ReactNode }) => <p className="mt-1 text-[9.5px] italic leading-tight text-petroleo-escuro/80">{children}</p>;

const CONTEUDO: Record<string, React.ReactNode> = {
  metodo: (
    <>
      <Titulo t="Mente em 3 Lugares" s="10 minutos · tire tudo da cabeça" />
      <Caixa t="O QUE ESTÁ NA MINHA CABEÇA" cor="bg-creme-escuro/70">
        <Escrito>conta de luz · consulta · e se der errado amanhã? · responder a Ana · roupa pra lavar</Escrito>
      </Caixa>
      <div className="mt-2 grid flex-1 grid-cols-3 gap-1.5">
        <Caixa t="RESOLVER" cor="bg-salvia-bg">
          <Escrito>Pagar a conta → hoje 18h</Escrito>
          <Linhas n={4} />
        </Caixa>
        <Caixa t="PROGRAMAR" cor="bg-salvia-claro/70">
          <Escrito>Marcar consulta → amanhã</Escrito>
          <Linhas n={4} />
        </Caixa>
        <Caixa t="DESOCUPAR" cor="bg-terracota-claro">
          <Escrito>“E se der errado?” → registrei</Escrito>
          <Linhas n={4} />
        </Caixa>
      </div>
      <div className="mt-2 rounded-lg border border-dashed border-terracota-escuro/50 p-2">
        <p className="font-display text-[9px] font-bold tracking-wider text-terracota-escuro">MINHA PRIMEIRA AÇÃO</p>
        <Escrito>Pagar a conta de luz pelo app</Escrito>
      </div>
    </>
  ),
  dia: (
    <>
      <Titulo t="Meu dia sem sobrecarga" s="o dia não precisa caber numa lista interminável" />
      <div className="flex gap-1.5">
        {['🙂', '😐', '😟'].map((e) => (
          <span key={e} className="rounded-full bg-creme-escuro px-2 py-0.5 text-[10px]">{e}</span>
        ))}
        <span className="text-[9px] text-grafite/50">como estou hoje</span>
      </div>
      <Caixa t="3 PRIORIDADES (SÓ 3)" cor="mt-2 bg-salvia-bg">
        {['Entregar relatório', 'Ligar pro banco', 'Caminhar 15 min'].map((t, i) => (
          <div key={t} className="mt-1 flex items-center gap-1.5 text-[9.5px]">
            <span className={`h-2.5 w-2.5 rounded-sm border border-petroleo ${i === 0 ? 'bg-petroleo' : ''}`} />
            <span className="italic text-petroleo-escuro/80">{t}</span>
          </div>
        ))}
      </Caixa>
      <div className="mt-2 grid flex-1 grid-cols-2 gap-1.5">
        <Caixa t="SE SOBRAR TEMPO" cor="bg-creme-escuro/60">
          <Linhas n={5} />
        </Caixa>
        <Caixa t="PAUSAS" cor="bg-terracota-claro">
          <Escrito>água · respirar · 5 min fora da tela</Escrito>
          <Linhas n={3} />
        </Caixa>
      </div>
      <p className="mt-2 text-center text-[9px] italic text-grafite/55">Fiz o possível hoje. O resto vai para amanhã.</p>
    </>
  ),
  acelerada: (
    <>
      <Titulo t="Modo Mente Acelerada" s="para quando a cabeça está a mil" />
      <div className="mt-1 space-y-2">
        <Caixa t="1. O QUE ESTÁ ME PESANDO AGORA?" cor="bg-terracota-claro">
          <Escrito>Muita coisa ao mesmo tempo no trabalho</Escrito>
        </Caixa>
        <Caixa t="2. ISSO É PARA AGORA?" cor="bg-creme-escuro/70">
          <div className="mt-1 flex gap-3 text-[9.5px]">
            <span>☐ sim</span>
            <span>☑ não, pode esperar</span>
          </div>
        </Caixa>
        <Caixa t="3. UM PRÓXIMO PASSO PEQUENO" cor="bg-salvia-bg">
          <Escrito>Abrir o e-mail e responder só 1</Escrito>
        </Caixa>
        <Caixa t="4. RESPIRA" cor="bg-salvia-claro/60">
          <div className="mt-1 flex items-center justify-around text-[9px] text-petroleo">
            <span>inspira 4</span>
            <span>segura 4</span>
            <span>solta 6</span>
          </div>
        </Caixa>
      </div>
    </>
  ),
  preocupacoes: (
    <>
      <Titulo t="Organizador de preocupações" s="separe o que é real do que é antecipação" />
      <div className="space-y-1.5">
        {[
          ['PROBLEMA REAL', 'bg-salvia-bg', 'Conta atrasada → negociar sexta'],
          ['SITUAÇÃO FUTURA', 'bg-salvia-claro/70', 'Viagem do mês que vem → ver em 2 semanas'],
          ['PENSAMENTO REPETITIVO', 'bg-terracota-claro', '“Todo mundo vai me achar incapaz”'],
        ].map(([t, c, e]) => (
          <Caixa key={t} t={t} cor={c}>
            <Escrito>{e}</Escrito>
            <Linhas n={2} />
          </Caixa>
        ))}
      </div>
      <div className="mt-2 rounded-lg border border-dashed border-petroleo/40 p-2">
        <p className="font-display text-[9px] font-bold tracking-wider text-petroleo">O QUE EU POSSO FAZER HOJE?</p>
        <Linhas n={2} />
      </div>
    </>
  ),
  semana: (
    <>
      <Titulo t="Semana leve" s="sem datas · comece quando quiser" />
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'FIM DE SEMANA'].map((d, i) => (
          <Caixa key={d} t={d} cor={i % 3 === 2 ? 'bg-terracota-claro/70' : i % 2 ? 'bg-salvia-claro/60' : 'bg-salvia-bg'}>
            {i === 0 && <Escrito>dentista 9h</Escrito>}
            {i === 2 && <Escrito>pagar internet</Escrito>}
            <Linhas n={2} />
          </Caixa>
        ))}
      </div>
      <Caixa t="PODE ESPERAR" cor="mt-1.5 bg-creme-escuro/70">
        <Escrito>arrumar o armário · trocar o celular</Escrito>
      </Caixa>
    </>
  ),
  recomeco: (
    <>
      <Titulo t="Página de recomeço" s="pulou dias? tudo bem. recomece daqui." />
      <Caixa t="O QUE FICOU PARA TRÁS (SEM CULPA)" cor="bg-creme-escuro/70">
        <Linhas n={3} />
      </Caixa>
      <Caixa t="O QUE AINDA IMPORTA" cor="mt-2 bg-salvia-bg">
        <Escrito>Retomar a rotina de sono</Escrito>
        <Linhas n={2} />
      </Caixa>
      <Caixa t="O QUE EU POSSO SOLTAR" cor="mt-2 bg-terracota-claro">
        <Escrito>Arrumar tudo de uma vez</Escrito>
        <Linhas n={2} />
      </Caixa>
      <div className="mt-2 rounded-lg border border-dashed border-terracota-escuro/50 p-2">
        <p className="font-display text-[9px] font-bold tracking-wider text-terracota-escuro">RECOMEÇO POR AQUI:</p>
        <Escrito>Uma página do Mente em 3 Lugares hoje à noite</Escrito>
      </div>
    </>
  ),
};
