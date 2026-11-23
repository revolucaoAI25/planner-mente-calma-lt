import Image from 'next/image';
import Link from 'next/link';
import {
  BatteryLow,
  BedDouble,
  Brain,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  HeartPulse,
  ListChecks,
  MessageCircleQuestion,
  Moon,
  NotebookPen,
  Printer,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Tablet,
  Wind,
  Zap,
} from 'lucide-react';
import { CapaBonus } from '@/components/CapaBonus';
import { Cta } from '@/components/Cta';
import { Faq } from '@/components/Faq';
import { Logo, LogoMark } from '@/components/Logo';
import { MetodoDemo } from '@/components/MetodoDemo';
import { PorDentro } from '@/components/PorDentro';
import { Reveal } from '@/components/Reveal';
import { StickyBar } from '@/components/StickyBar';
import { garantiaDias, imagens, marca, mostrarPlaceholders, preco } from '@/config/oferta';

const PRA_VOCE = [
  'deita para dormir e a cabeça começa a repassar tudo o que fez, o que não fez e o que pode dar errado',
  'começa três coisas ao mesmo tempo, se perde no meio e termina o dia com a sensação de que não fez nada',
  'já comprou agenda, baixou aplicativo, fez lista… e largou tudo na segunda semana',
];

const SINAIS = [
  { icon: Moon, t: 'A cabeça não desliga nem na hora de dormir', d: 'Você deita cansada(o) e o pensamento acelera: a conta, a conversa de amanhã, o “e se…”.' },
  { icon: Zap, t: 'Tudo parece urgente ao mesmo tempo', d: 'A lista é tão grande que você nem sabe por onde começar, e acaba não começando.' },
  { icon: Brain, t: 'Você ensaia conversas que nem aconteceram', d: 'Passa horas antecipando problemas que, na maioria das vezes, nem chegam.' },
  { icon: BatteryLow, t: 'Cansaço sem ter feito nada', d: 'Gastou a energia do dia inteiro só pensando, e as tarefas continuam lá.' },
];

const POR_QUE_NAO = [
  ['Ela só organiza tarefas.', 'Mas a sua cabeça não está cheia só de tarefas: está cheia de preocupações, lembretes e “e se…”. E nenhuma agenda tem lugar para isso.'],
  ['Ela transforma o dia numa lista interminável.', 'Para quem tem a mente acelerada, uma lista de 20 itens não organiza. Ela paralisa.'],
  ['Ela cobra todos os dias.', 'Agenda com data transforma uma semana difícil em páginas em branco, e página em branco vira culpa e motivo para largar.'],
];

const DENTRO: { icon: typeof Brain; t: string; d: string; destaque?: boolean }[] = [
  { icon: Sparkles, t: 'Método Mente em 3 Lugares', d: 'Páginas guiadas para tirar da cabeça pensamentos, preocupações e pendências e separar cada um no lugar certo.', destaque: true },
  { icon: Sun, t: 'Planejamento diário adaptado', d: 'Prioridades sem transformar o dia numa lista interminável: 3 coisas que importam e um primeiro passo.' },
  { icon: CalendarDays, t: 'Planejamento semanal e mensal', d: 'Compromissos, contas, tarefas e objetivos à vista, sem datas fixas: comece em qualquer dia do ano.' },
  { icon: Wind, t: 'Modo Mente Acelerada', d: 'Páginas simplificadas para os momentos de maior sobrecarga, quando planejar o dia inteiro parece impossível.' },
  { icon: MessageCircleQuestion, t: 'Organizador de preocupações', d: 'Separe problemas reais, situações futuras e pensamentos repetitivos, e veja o que dá para fazer hoje.' },
  { icon: HeartPulse, t: 'Hábitos e autocuidado', d: 'Acompanhamento simples de sono, pausas e hábitos, sem cobrança e sem perfeição.' },
  { icon: CircleDollarSign, t: 'Organização financeira', d: 'Contas, vencimentos e gastos num só lugar, para tirar mais esse peso da cabeça.' },
  { icon: RefreshCcw, t: 'Páginas de recomeço', d: 'Para voltar depois de dias difíceis sem precisar preencher tudo o que ficou para trás.' },
];

const BONUS: { t: string; d: string; tema: 'petroleo' | 'salvia' | 'terracota' | 'grafite'; icon: typeof Brain }[] = [
  { t: 'SOS Mente Acelerada', d: 'Páginas rápidas para organizar os pensamentos e escolher um próximo passo quando a cabeça estiver a mil.', tema: 'terracota', icon: Zap },
  { t: 'Desligando a Cabeça Antes de Dormir', d: 'Uma rotina de encerramento do dia: descarregue as preocupações, prepare o amanhã e vá para a cama mais leve.', tema: 'petroleo', icon: BedDouble },
  { t: 'Diário da Ansiedade', d: 'Registre as preocupações que se repetem, as situações que aumentam a ansiedade e o que ajuda no seu dia a dia.', tema: 'salvia', icon: NotebookPen },
  { t: 'Kit Rotina Sem Sobrecarga', d: 'Modelos simples de rotina para manhã, tarde e noite, que se adaptam à sua realidade (e não o contrário).', tema: 'grafite', icon: ListChecks },
];

const INCLUSO = [
  'Planner Mente Calma completo (PDF, sem datas)',
  'Método Mente em 3 Lugares, com páginas guiadas',
  'Bônus 1 · SOS Mente Acelerada',
  'Bônus 2 · Desligando a Cabeça Antes de Dormir',
  'Bônus 3 · Diário da Ansiedade',
  'Bônus 4 · Kit Rotina Sem Sobrecarga',
  'Imprima quantas vezes quiser, ou preencha no tablet',
];

const FAQ: [string, React.ReactNode][] = [
  [
    'Como recebo e como uso o planner?',
    <>Logo após a confirmação do pagamento, você recebe por e-mail o acesso aos arquivos em PDF. Dá para <b>imprimir</b> em casa ou numa gráfica (só as páginas que for usar, quantas vezes quiser) ou <b>preencher no tablet</b>, em apps como GoodNotes, Notability, Xodo ou Samsung Notes.</>,
  ],
  ['Quanto tempo por dia eu preciso dedicar?', 'Cerca de 10 minutos. O Método Mente em 3 Lugares foi pensado para caber num intervalo do dia, ou na hora de dormir, quando a cabeça mais pesa.'],
  ['E se eu largar, como larguei as outras agendas?', 'O planner não tem datas e tem páginas de recomeço justamente para isso. Pulou dias? Você volta de onde está, sem precisar preencher o que ficou para trás e sem culpa.'],
  ['Preciso ter diagnóstico de ansiedade para usar?', 'Não. Ele foi pensado para quem se identifica com a mente acelerada, a preocupação constante e a sensação de sobrecarga, com ou sem diagnóstico.'],
  ['O planner substitui terapia ou tratamento?', 'Não. O Mente Calma é uma ferramenta de organização: ajuda a tirar as preocupações da cabeça, organizar a rotina e definir um próximo passo. Ele não é tratamento psicológico nem médico e não substitui o acompanhamento de um profissional. Ele pode, inclusive, ser um bom aliado de quem já faz terapia.'],
  ['Preciso usar todas as páginas?', 'Não. Comece só com o Método Mente em 3 Lugares e a página do dia. As outras ficam à mão para quando fizerem sentido.'],
  ['É pagamento único ou assinatura?', `Pagamento único de R$ ${preco}. Sem mensalidade e sem cobrança recorrente: você compra uma vez e usa para sempre.`],
  ['E se não for para mim?', `Você tem ${garantiaDias} dias de garantia. Se achar que não é para você, é só pedir o reembolso dentro desse prazo e devolvemos 100% do valor.`],
];

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <Reveal />

      {/* Faixa */}
      <div className="bg-petroleo py-2 text-center text-[12.5px] text-creme">
        <b className="font-display tracking-wide">Oferta de lançamento</b> · Planner + 4 bônus por <b>R$ {preco}</b> · acesso imediato
      </div>

      {/* ======= TOPO ======= */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-salvia/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-[420px] h-72 w-72 rounded-full bg-terracota/25 blur-3xl" />
        <div className="wrap relative pt-5">
          <Logo />
        </div>
        <div className="wrap relative grid items-center gap-8 pb-12 pt-8 md:grid-cols-[1.08fr_.92fr] md:pb-20 md:pt-12">
          <div className="animate-entra">
            <p className="eyebrow">Para quem pensa demais e se preocupa com tudo</p>
            <h1 className="mt-4 text-[34px] font-bold leading-[1.06] tracking-tight text-grafite sm:text-[50px]">
              Sua cabeça não desliga? Conheça o planner criado para quem vive com <span className="grifo">ansiedade</span>.
            </h1>
            <p className="sub mt-5">
              Em apenas <b className="text-grafite">10 minutos por dia</b>, organize os pensamentos que não param, tire as preocupações da cabeça e coloque sua rotina em ordem, mesmo quando tudo parece urgente.
            </p>
            <div className="mt-7 hidden md:block">
              <Cta>Quero minha mente mais calma</Cta>
              <Garantias />
            </div>
          </div>
          <div className="relative mx-auto w-[82%] max-w-[400px] md:w-full">
            <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-salvia/60 to-terracota/50 blur-2xl" />
            <div className="relative animate-flutua">
              <Image src={imagens.capa} alt="Planner Mente Calma" width={482} height={657} priority className="h-auto w-full rounded-[18px] shadow-papel" />
            </div>
            <span className="absolute -left-2 top-8 rotate-[-6deg] rounded-full bg-white px-3 py-1.5 font-display text-[12px] font-bold text-petroleo shadow-suave">10 min por dia</span>
            <span className="absolute -right-1 bottom-14 rotate-[5deg] rounded-full bg-terracota-escuro px-3 py-1.5 font-display text-[12px] font-bold text-white shadow-suave">+ 4 bônus</span>
          </div>
          <div className="md:hidden">
            <Cta>Quero minha mente mais calma</Cta>
            <Garantias />
          </div>
        </div>

        <div className="wrap relative pb-14">
          <div className="card mx-auto max-w-[760px] p-5 sm:p-7">
            <p className="text-center font-display text-[11px] font-bold uppercase tracking-[.25em] text-grafite/50">Esta página é para você se:</p>
            <ul className="mt-4 space-y-3">
              {PRA_VOCE.map((t) => (
                <li key={t} className="flex gap-3 text-[16px] leading-snug text-grafite/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-salvia-bg text-petroleo">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ======= VEJA POR DENTRO ======= */}
      <section className="bg-white/60 py-16">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <span className="inline-block rounded-full bg-grafite px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[.2em] text-creme">Veja por dentro</span>
            <h2 className="titulo mt-4">Páginas feitas para riscar, rabiscar e recomeçar.</h2>
            <p className="sub mt-3">Nada de páginas perfeitas que dão medo de estragar. Aqui é para usar de verdade, no seu ritmo.</p>
          </div>
          <div className="reveal mt-9">
            <PorDentro />
          </div>
        </div>
      </section>

      {/* ======= IDENTIFICAÇÃO ======= */}
      <section className="py-16 sm:py-20">
        <div className="estreito">
          <h2 className="titulo reveal text-center">Se a sua mente fosse um navegador, teria 47 abas abertas.</h2>
          <p className="sub reveal mt-4 text-center">E todas tocando música ao mesmo tempo.</p>
        </div>
        <div className="wrap mt-10 grid gap-4 sm:grid-cols-2">
          {SINAIS.map((s, i) => (
            <div key={s.t} className="reveal card flex gap-4 p-5" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-terracota-claro text-terracota-escuro">
                <s.icon size={21} />
              </span>
              <div>
                <p className="font-display text-[17px] font-bold leading-snug">{s.t}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-grafite/70">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="estreito reveal mt-12 space-y-5 text-[18px] leading-relaxed text-grafite/80">
          <p>Você já tentou se organizar. Já comprou agenda bonita, baixou aplicativo, escreveu listas enormes num domingo à noite cheia(o) de esperança.</p>
          <p>
            E na terça-feira estava tudo abandonado. Não por preguiça. É que <b className="text-grafite">uma cabeça sobrecarregada não consegue simplesmente sentar, planejar e seguir uma lista.</b>
          </p>
          <p className="rounded-2xl bg-salvia-bg p-5 font-display text-[19px] font-semibold leading-snug text-petroleo-escuro">
            Você não precisa de mais uma lista de tarefas. Precisa de uma forma de organizar tudo o que não sai da sua cabeça.
          </p>
        </div>
      </section>

      {/* ======= POR QUE A AGENDA COMUM NÃO FUNCIONA ======= */}
      <section className="bg-grafite py-16 text-creme sm:py-20">
        <div className="estreito">
          <h2 className="reveal text-center font-display text-[30px] font-bold leading-[1.12] sm:text-[40px]">
            Por que a agenda comum não funciona para quem tem a mente acelerada
          </h2>
          <div className="mt-10 space-y-4">
            {POR_QUE_NAO.map(([t, d], i) => (
              <div key={t} className="reveal flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracota font-display text-[16px] font-bold text-grafite">{i + 1}</span>
                <div>
                  <p className="font-display text-[18px] font-bold">{t}</p>
                  <p className="mt-1 text-[16px] leading-relaxed text-creme/70">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="reveal mt-10 text-center text-[19px] leading-relaxed text-creme/85">
            O Planner Mente Calma foi pensado ao contrário. <b className="text-creme">Antes de organizar o seu dia, ele ajuda você a organizar o que está ocupando a sua cabeça.</b>
          </p>
        </div>
      </section>

      {/* ======= MÉTODO ======= */}
      <section id="metodo" className="py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[680px] text-center">
            <p className="eyebrow">O coração do planner</p>
            <h2 className="titulo mt-3">Método Mente em 3 Lugares</h2>
            <p className="sub mt-4">
              Sua cabeça não precisa ser o lugar onde você guarda tudo o que tem para fazer, tudo o que não pode esquecer e tudo o que teme que aconteça. Em 10 minutos, você tira tudo de lá e distribui em três lugares.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: 'Resolver', s: 'O que depende de mim', d: 'Tarefas, problemas e pendências que pedem uma ação concreta.', ex: '“Preciso pagar aquela conta.”', fim: 'Definir quando pagar.', cor: 'bg-salvia-bg', icon: Check },
              { n: 'Programar', s: 'O que não precisa ser agora', d: 'Compromissos, tarefas futuras e assuntos que podem esperar.', ex: '“Preciso marcar uma consulta.”', fim: 'Colocar na lista de amanhã.', cor: 'bg-salvia-claro/70', icon: CalendarDays },
              { n: 'Desocupar', s: 'O que estou só antecipando', d: 'Preocupações repetitivas e medos sobre situações que ainda não aconteceram.', ex: '“E se der errado amanhã?”', fim: 'Registrar e voltar ao que dá para fazer hoje.', cor: 'bg-terracota-claro', icon: Wind },
            ].map((m, i) => (
              <div key={m.n} className={`reveal rounded-[22px] p-6 ${m.cor}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-petroleo">
                    <m.icon size={21} strokeWidth={2.3} />
                  </span>
                  <span className="font-display text-[13px] font-bold text-grafite/40">0{i + 1}</span>
                </div>
                <p className="mt-4 font-display text-[22px] font-bold uppercase tracking-wide">{m.n}</p>
                <p className="text-[15px] italic text-grafite/65">{m.s}</p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-grafite/80">{m.d}</p>
                <div className="mt-4 rounded-xl bg-white/70 p-3 text-[14.5px]">
                  <p className="italic text-grafite/75">{m.ex}</p>
                  <p className="mt-1 font-bold text-petroleo-escuro">→ {m.fim}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mx-auto mt-12 max-w-[860px]">
            <p className="mb-4 text-center font-display text-[13px] font-bold uppercase tracking-[.22em] text-grafite/50">Veja na prática</p>
            <MetodoDemo />
          </div>

          <div className="reveal mx-auto mt-10 max-w-[680px] text-center">
            <p className="text-[18px] leading-relaxed text-grafite/80">
              Ao terminar a página, você tem as <b className="text-grafite">preocupações separadas</b>, as <b className="text-grafite">pendências encaminhadas</b> e uma <b className="text-grafite">primeira ação definida</b>. É isso que muda tudo: aprender a diferenciar o que você precisa fazer daquilo com que está apenas se preocupando.
            </p>
          </div>
        </div>
      </section>

      {/* ======= O QUE VEM DENTRO ======= */}
      <section id="dentro" className="bg-white/60 py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <p className="eyebrow">O que vem no planner</p>
            <h2 className="titulo mt-3">Tudo o que pesa na sua cabeça, num lugar só.</h2>
            <p className="sub mt-3">Enquanto uma agenda comum organiza compromissos, o Mente Calma organiza também as preocupações que atrapalham o seu dia.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DENTRO.map((d, i) => (
              <div
                key={d.t}
                className={`reveal rounded-[22px] p-5 ${d.destaque ? 'bg-petroleo text-creme shadow-papel sm:col-span-2 lg:col-span-2' : 'card'}`}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${d.destaque ? 'bg-white/15 text-creme' : 'bg-salvia-bg text-petroleo'}`}>
                  <d.icon size={21} />
                </span>
                <p className={`mt-4 font-display text-[17px] font-bold leading-snug ${d.destaque ? 'text-[21px]' : ''}`}>{d.t}</p>
                <p className={`mt-1.5 text-[15px] leading-relaxed ${d.destaque ? 'text-creme/80' : 'text-grafite/70'}`}>{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= COMEÇAR É LEVE ======= */}
      <section className="py-16 sm:py-20">
        <div className="wrap grid items-start gap-10 md:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Começar é leve</p>
            <h2 className="titulo mt-3">10 minutos para dar lugar ao que importa.</h2>
            <div className="mt-8 space-y-5">
              {[
                ['Despeje', 'Escreva tudo o que está na sua cabeça, sem filtro e sem ordem.'],
                ['Separe', 'Distribua cada pensamento em Resolver, Programar ou Desocupar.'],
                ['Comece', 'Escolha uma primeira ação. Só uma. O resto já tem lugar.'],
              ].map(([t, d], i) => (
                <div key={t} className="flex gap-4">
                  <span className="font-display text-[34px] font-bold leading-none text-terracota">0{i + 1}</span>
                  <div>
                    <p className="font-display text-[19px] font-bold">{t}</p>
                    <p className="text-[16px] leading-relaxed text-grafite/70">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal space-y-3">
            {[
              [Clock3, 'Feito é melhor que perfeito.', 'Dez minutos imperfeitos valem mais do que uma página linda que nunca sai do lugar.'],
              [RefreshCcw, 'Pulou dias? Só recomece.', 'Sem datas e com páginas de recomeço: você volta de onde está, sem culpa.'],
              [Sparkles, 'O planner se adapta a você.', 'Use só as páginas que fazem sentido. Não existe ordem certa.'],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Clock3;
              return (
                <div key={t as string} className="card flex gap-4 p-5">
                  <Icon size={22} className="mt-0.5 shrink-0 text-petroleo" />
                  <div>
                    <p className="font-display text-[16.5px] font-bold">{t as string}</p>
                    <p className="text-[15px] leading-relaxed text-grafite/70">{d as string}</p>
                  </div>
                </div>
              );
            })}
            <div className="rounded-[22px] bg-salvia-bg p-5">
              <p className="font-display text-[13px] font-bold uppercase tracking-[.18em] text-petroleo">Como você usa</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[14.5px] leading-snug">
                <p className="flex gap-2">
                  <Printer size={18} className="shrink-0 text-petroleo" /> Imprima em A4, só as páginas que for usar, quantas vezes quiser.
                </p>
                <p className="flex gap-2">
                  <Tablet size={18} className="shrink-0 text-petroleo" /> Ou preencha no tablet: GoodNotes, Notability, Xodo, Samsung Notes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Antes e depois */}
        <div className="wrap mt-14 grid gap-4 sm:grid-cols-2">
          <div className="reveal rounded-[22px] bg-creme-escuro p-6">
            <p className="font-display text-[12px] font-bold uppercase tracking-[.22em] text-grafite/45">Antes</p>
            <p className="mt-2 text-[18px] leading-relaxed text-grafite/80">Acordar já cansada(o), com mil coisas na cabeça, e chegar à noite sem saber o que realmente fez.</p>
          </div>
          <div className="reveal rounded-[22px] bg-petroleo p-6 text-creme" style={{ transitionDelay: '90ms' }}>
            <p className="font-display text-[12px] font-bold uppercase tracking-[.22em] text-salvia">Depois</p>
            <p className="mt-2 text-[18px] leading-relaxed">Abrir uma página, tirar tudo da cabeça, saber o primeiro passo e ir dormir sabendo o que fica para amanhã.</p>
          </div>
        </div>
      </section>

      {/* ======= BÔNUS ======= */}
      <section id="bonus" className="bg-white/60 py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <p className="eyebrow">Inclusos no seu acesso</p>
            <h2 className="titulo mt-3">E você ainda leva 4 bônus para os momentos mais pesados.</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BONUS.map((b, i) => (
              <div key={b.t} className="reveal card overflow-hidden" style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
                <div className={`py-7 ${['bg-terracota-claro', 'bg-salvia-bg', 'bg-salvia-claro/50', 'bg-creme-escuro'][i]}`}>
                  <CapaBonus img={imagens.bonus[i]} titulo={b.t} n={i + 1} tema={b.tema} />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-[11px] font-bold uppercase tracking-[.2em] text-terracota-escuro">Bônus {String(i + 1).padStart(2, '0')}</p>
                    <span className="rounded-full bg-salvia-bg px-2.5 py-0.5 font-display text-[11px] font-bold text-petroleo">GRÁTIS</span>
                  </div>
                  <p className="mt-1.5 font-display text-[19px] font-bold leading-snug">{b.t}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-grafite/70">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= DEPOIMENTOS ======= */}
      {(imagens.depoimentos.length > 0 || mostrarPlaceholders) && (
        <section className="py-16 sm:py-20">
          <div className="wrap">
            <div className="reveal mx-auto max-w-[640px] text-center">
              <p className="eyebrow">Quem já usa</p>
              <h2 className="titulo mt-3">O que acontece quando a cabeça finalmente ganha um lugar para descansar</h2>
            </div>
            {imagens.depoimentos.length ? (
              <div className="mt-10 columns-2 gap-4 sm:columns-3">
                {imagens.depoimentos.map((d) => (
                  <Image key={d.img} src={d.img} alt="Depoimento de cliente" width={d.w} height={d.h} sizes="(max-width:640px) 50vw, 33vw" className="reveal mb-4 h-auto w-full rounded-2xl shadow-suave" />
                ))}
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="grid aspect-[9/14] place-items-center rounded-2xl border-2 border-dashed border-grafite/15 bg-white/50 p-4 text-center text-[13px] text-grafite/45">
                    Espaço para print de depoimento real {i + 1}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ======= OFERTA ======= */}
      <section id="oferta" className="bg-gradient-to-b from-salvia-bg to-creme py-16 sm:py-20">
        <div className="estreito">
          <h2 className="titulo reveal text-center">Sua cabeça não precisa carregar tudo sozinha.</h2>
          <p className="sub reveal mt-3 text-center">Comece hoje, com 10 minutos.</p>
          <div className="reveal mt-9 overflow-hidden rounded-[28px] bg-white shadow-papel ring-1 ring-grafite/5">
            <div className="flex items-center gap-4 bg-petroleo px-6 py-5 text-creme">
              <LogoMark size={46} light />
              <div>
                <p className="font-display text-[19px] font-bold leading-tight">Planner Mente Calma</p>
                <p className="text-[14px] text-creme/75">completo + 4 bônus</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="mx-auto w-[56%] max-w-[230px]">
                <Image src={imagens.capa} alt="" width={482} height={657} className="h-auto w-full -rotate-2 rounded-xl shadow-papel" />
              </div>
              <ul className="mt-7 space-y-2.5">
                {INCLUSO.map((t) => (
                  <li key={t} className="flex gap-3 text-[15.5px] text-grafite/85">
                    <Check size={19} strokeWidth={3} className="mt-0.5 shrink-0 text-petroleo" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7 text-center">
                <p className="text-[14px] text-grafite/60">Pagamento único</p>
                <p className="font-display text-[56px] font-bold leading-none tracking-tight text-grafite">
                  <span className="align-top text-[24px]">R$</span>
                  {preco}
                </p>
                <p className="mt-1 text-[14px] text-grafite/60">sem mensalidade · acesso imediato</p>
              </div>
              <div className="mt-6 flex justify-center">
                <Cta>Quero o Planner Mente Calma</Cta>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-grafite/55">
                <ShieldCheck size={15} /> Compra 100% segura
              </p>
            </div>
          </div>

          <div className="reveal mt-8 flex gap-4 rounded-[22px] bg-white/80 p-5 ring-1 ring-grafite/5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-terracota-claro font-display text-[18px] font-bold text-terracota-escuro">{garantiaDias}d</span>
            <div>
              <p className="font-display text-[17px] font-bold">Você não arrisca nada.</p>
              <p className="mt-1 text-[15px] leading-relaxed text-grafite/70">
                Use o Planner Mente Calma por {garantiaDias} dias. Se ele não ajudar você a organizar a cabeça e a rotina, é só pedir o reembolso dentro desse prazo e devolvemos 100% do valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FAQ ======= */}
      <section id="faq" className="py-16 sm:py-20">
        <div className="estreito">
          <h2 className="titulo reveal text-center">Ainda com dúvida?</h2>
          <div className="reveal mt-9">
            <Faq itens={FAQ} />
          </div>
        </div>
      </section>

      {/* ======= FECHAMENTO ======= */}
      <section className="relative overflow-hidden bg-petroleo py-16 text-creme sm:py-20">
        <svg className="absolute bottom-0 left-0 w-full opacity-40" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden>
          <path d="M0 90 C250 30 420 150 700 80 S1100 40 1200 70 V160 H0Z" fill="#A8BDB0" opacity=".45" />
          <path d="M0 130 C300 90 600 170 1200 110 V160 H0Z" fill="#D7A58D" opacity=".55" />
        </svg>
        <div className="estreito relative text-center">
          <LogoMark size={64} light className="mx-auto" />
          <h2 className="reveal mt-5 font-display text-[30px] font-bold leading-[1.12] sm:text-[40px]">Você não precisa guardar tudo na cabeça. Só precisa de um lugar para colocar.</h2>
          <p className="reveal mt-4 text-[18px] text-creme/80">Menos peso na mente. Mais clareza no dia.</p>
          <div className="reveal mt-8 flex justify-center">
            <Cta>Quero começar hoje</Cta>
          </div>
          <p className="mt-4 text-[13px] text-creme/65">pagamento único · acesso imediato · {garantiaDias} dias de garantia</p>
        </div>
      </section>

      <footer className="bg-grafite pb-28 pt-10 text-creme/70 sm:pb-10">
        <div className="wrap text-center text-[13px] leading-relaxed">
          <Logo light className="justify-center" />
          <p className="mx-auto mt-5 max-w-[620px]">
            O Planner Mente Calma é uma ferramenta de organização pessoal. Não é tratamento psicológico ou médico e não substitui o acompanhamento de um profissional de saúde. Se você está em sofrimento intenso, procure ajuda: CVV, ligue 188 (gratuito, 24h).
          </p>
          <p className="mt-4">
            <Link href="/termos" className="underline-offset-2 hover:underline">Termos de uso</Link> · <Link href="/privacidade" className="underline-offset-2 hover:underline">Privacidade</Link> · {marca.suporte}
          </p>
          <p className="mt-3 text-creme/45">© {new Date().getFullYear()} {marca.nome}. Este site não é afiliado ao Facebook ou à Meta.</p>
        </div>
      </footer>

      <StickyBar />
    </main>
  );
}

function Garantias() {
  return (
    <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[13px] text-grafite/60 md:justify-start">
      <span>PDF para imprimir ou usar no tablet</span>
      <span>·</span>
      <span>R$ {preco}, pagamento único</span>
      <span>·</span>
      <span>{garantiaDias} dias de garantia</span>
    </p>
  );
}
