import Image from 'next/image';
import Link from 'next/link';
import {
  BatteryLow,
  BedDouble,
  Brain,
  CalendarDays,
  Check,
  CircleDollarSign,
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
  Timer,
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
import { BotaoTeste } from '@/components/Teste';
import { criadora, depoimentosTeste, garantiaDias, imagens, marca, modoTeste, mostrarPlaceholders, preco, precoDe, valores } from '@/config/oferta';

const brl = (n: number) => `R$ ${n}`;

const PRA_VOCE = [
  'deita para dormir e a cabeça começa a repassar tudo o que fez, o que não fez e o que pode dar errado',
  'começa três coisas ao mesmo tempo, se perde no meio e termina o dia com a sensação de que não fez nada',
  'já comprou agenda, baixou aplicativo, fez lista… e largou tudo na segunda semana',
];

const SINAIS = [
  { icon: Moon, t: 'A cabeça não desliga nem na hora de dormir', d: 'A conta, a conversa de amanhã, o “e se…”. Tudo de uma vez.' },
  { icon: Zap, t: 'Tudo parece urgente ao mesmo tempo', d: 'A lista é tão grande que você trava e não começa nada.' },
  { icon: Brain, t: 'Você ensaia conversas que nem aconteceram', d: 'E gasta horas antecipando problemas que quase nunca chegam.' },
  { icon: BatteryLow, t: 'Cansaço sem ter feito nada', d: 'A energia do dia foi embora só pensando. As tarefas continuam lá.' },
];

const POR_QUE_NAO = [
  ['Ela só organiza tarefas.', 'Mas a sua cabeça está cheia de preocupações, lembretes e “e se…”. Nenhuma agenda tem lugar para isso.'],
  ['Ela transforma o dia numa lista sem fim.', 'Para a mente acelerada, uma lista de 20 itens não organiza: paralisa.'],
  ['Ela cobra todos os dias.', 'Uma semana difícil vira páginas em branco, e página em branco vira culpa.'],
];

const LUGARES = [
  { n: 'Resolver', s: 'O que depende de mim', d: 'Tarefas e pendências que pedem uma ação concreta.', ex: '“Preciso pagar aquela conta.”', fim: 'Definir quando pagar.', cor: 'bg-salvia-bg', icon: Check },
  { n: 'Programar', s: 'O que não precisa ser agora', d: 'Compromissos e assuntos que podem esperar o momento certo.', ex: '“Preciso marcar uma consulta.”', fim: 'Colocar na lista de amanhã.', cor: 'bg-salvia-claro/70', icon: CalendarDays },
  { n: 'Desocupar', s: 'O que estou só antecipando', d: 'Preocupações repetitivas e medos sobre o que ainda não aconteceu.', ex: '“E se der errado amanhã?”', fim: 'Registrar e voltar ao que dá para fazer hoje.', cor: 'bg-terracota-claro', icon: Wind },
];

const ETAPAS = [
  ['Despejar', '3 min', 'Tudo o que está na cabeça vai para a página, sem filtro e sem ordem.'],
  ['Distribuir', '5 min', 'Cada pensamento vai para o seu lugar: Resolver, Programar ou Desocupar.'],
  ['Definir', '2 min', 'Você escolhe uma única primeira ação. O resto já tem lugar.'],
];

const DENTRO: { icon: typeof Brain; t: string; d: string; destaque?: boolean }[] = [
  { icon: Sparkles, t: 'Páginas do Método Mente em 3 Lugares', d: 'O passo a passo guiado de 10 minutos para tirar tudo da cabeça e separar no lugar certo. Use todo dia ou sempre que a mente pesar.', destaque: true },
  { icon: Sun, t: 'Dia sem sobrecarga', d: '3 prioridades e um primeiro passo, em vez de uma lista interminável.' },
  { icon: CalendarDays, t: 'Semana e mês', d: 'Compromissos, contas e objetivos à vista. Sem datas: comece quando quiser.' },
  { icon: Wind, t: 'Modo Mente Acelerada', d: 'Páginas simplificadas para os dias de maior sobrecarga.' },
  { icon: MessageCircleQuestion, t: 'Organizador de preocupações', d: 'Problema real, situação futura ou pensamento repetitivo: cada um no seu lugar.' },
  { icon: HeartPulse, t: 'Hábitos e autocuidado', d: 'Sono, pausas e hábitos, sem cobrança.' },
  { icon: CircleDollarSign, t: 'Organização financeira', d: 'Contas e vencimentos num lugar só, fora da sua cabeça.' },
  { icon: RefreshCcw, t: 'Páginas de recomeço', d: 'Volte depois de dias difíceis sem preencher o que ficou para trás.' },
];

const BONUS: { t: string; d: string; tema: 'petroleo' | 'salvia' | 'terracota' | 'grafite' }[] = [
  { t: 'SOS Mente Acelerada', d: 'Páginas rápidas para organizar os pensamentos e escolher um próximo passo quando a cabeça estiver a mil.', tema: 'terracota' },
  { t: 'Desligando a Cabeça Antes de Dormir', d: 'Rotina de encerramento do dia: descarregue as preocupações, prepare o amanhã e deite mais leve.', tema: 'petroleo' },
  { t: 'Diário da Ansiedade', d: 'Registre as preocupações que se repetem, o que aumenta a ansiedade e o que ajuda no seu dia a dia.', tema: 'salvia' },
  { t: 'Kit Rotina Sem Sobrecarga', d: 'Modelos simples de rotina para manhã, tarde e noite, que se adaptam à sua realidade.', tema: 'grafite' },
];

const FAQ: [string, React.ReactNode][] = [
  [
    'Como recebo e como uso o planner?',
    <>Logo após a confirmação do pagamento, você recebe por e-mail o acesso aos arquivos em PDF. Dá para <b>imprimir</b> em casa ou numa gráfica (só as páginas que for usar, quantas vezes quiser) ou <b>preencher no tablet</b>, em apps como GoodNotes, Notability, Xodo ou Samsung Notes.</>,
  ],
  ['Quanto tempo por dia eu preciso?', 'Cerca de 10 minutos. O Método Mente em 3 Lugares foi desenvolvido para caber num intervalo do dia, ou na hora de dormir, quando a cabeça mais pesa.'],
  ['E se eu largar, como larguei as outras agendas?', 'O planner não tem datas e tem páginas de recomeço justamente para isso. Pulou dias? Você volta de onde está, sem culpa.'],
  ['Preciso ter diagnóstico de ansiedade?', 'Não. Ele foi criado para quem se identifica com a mente acelerada, a preocupação constante e a sobrecarga, com ou sem diagnóstico.'],
  ['O planner substitui terapia ou tratamento?', 'Não. O Mente Calma é uma ferramenta de organização: ajuda a tirar as preocupações da cabeça, organizar a rotina e definir um próximo passo. Não é tratamento psicológico nem médico. Inclusive, pode ser um ótimo aliado de quem já faz terapia.'],
  ['É pagamento único ou assinatura?', `Pagamento único de ${brl(preco)}. Sem mensalidade: você compra uma vez e usa para sempre.`],
  ['E se não for para mim?', `Você tem ${garantiaDias} dias de garantia. Se achar que não é para você, é só pedir o reembolso dentro do prazo e devolvemos 100% do valor.`],
];

const totalValor = valores.planner + valores.bonus.reduce((a, b) => a + b, 0);

export default function Page() {
  return (
    <main className="overflow-x-clip">
      <Reveal />
      {modoTeste && <BotaoTeste />}

      {/* Faixa */}
      <div className="bg-petroleo px-4 py-2 text-center text-[12.5px] leading-snug text-creme">
        <b className="font-display tracking-wide">Lançamento</b> · de <s className="opacity-70">{brl(precoDe)}</s> por <b>{brl(preco)}</b> + 4 bônus grátis
      </div>

      {/* ======= TOPO ======= */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-salvia/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-28 top-[460px] h-72 w-72 rounded-full bg-terracota/25 blur-3xl" />
        <div className="wrap relative pt-5">
          <Logo />
        </div>
        <div className="wrap relative grid items-center gap-8 pb-10 pt-7 md:grid-cols-[1.1fr_.9fr] md:gap-12 md:pb-16 md:pt-12">
          <div className="animate-entra">
            <p className="eyebrow">Desenvolvido especificamente para quem vive com ansiedade</p>
            <h1 className="mt-4 text-[31px] font-bold leading-[1.08] tracking-tight text-grafite min-[400px]:text-[34px] sm:text-[48px]">
              Sua cabeça não desliga? Conheça o planner criado para quem vive com <span className="grifo">ansiedade</span>.
            </h1>
            <p className="sub mt-5">
              Com o <b className="text-grafite">Método Mente em 3 Lugares</b>, em apenas 10 minutos por dia você tira as preocupações da cabeça, organiza a rotina e sabe exatamente por onde começar, mesmo quando tudo parece urgente.
            </p>
            <div className="mt-7 hidden md:block">
              <Cta>Quero minha mente mais calma</Cta>
              <Garantias />
            </div>
          </div>
          <div className="relative mx-auto w-[78%] max-w-[390px] md:w-full">
            <div className="absolute inset-6 rounded-[40px] bg-gradient-to-br from-salvia/60 to-terracota/50 blur-2xl" />
            <div className="relative animate-flutua">
              <Image src={imagens.capa} alt="Planner Mente Calma" width={482} height={657} priority sizes="(max-width:768px) 78vw, 390px" className="h-auto w-full rounded-[18px] shadow-papel" />
            </div>
            <span className="absolute -left-3 top-8 rotate-[-6deg] rounded-full bg-white px-3 py-1.5 font-display text-[12px] font-bold text-petroleo shadow-suave">⏱ 10 min por dia</span>
            <span className="absolute -right-2 bottom-12 rotate-[5deg] rounded-full bg-terracota-escuro px-3 py-1.5 font-display text-[12px] font-bold text-white shadow-suave">+ 4 bônus</span>
          </div>
          <div className="md:hidden">
            <Cta>Quero minha mente mais calma</Cta>
            <Garantias />
          </div>
        </div>

        <div className="wrap relative pb-14">
          <div className="card mx-auto max-w-[760px] p-5 sm:p-7">
            <p className="text-center font-display text-[11px] font-bold uppercase tracking-[.25em] text-grafite/50">Este planner é para você se:</p>
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

      {/* ======= IDENTIFICAÇÃO ======= */}
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="estreito text-center">
          <h2 className="titulo reveal">Se a sua mente fosse um navegador, teria 47 abas abertas.</h2>
          <p className="sub reveal mt-3">E todas tocando música ao mesmo tempo.</p>
        </div>
        <div className="wrap mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
          {SINAIS.map((s, i) => (
            <div key={s.t} className="reveal card flex gap-4 p-5" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-terracota-claro text-terracota-escuro">
                <s.icon size={21} />
              </span>
              <div>
                <p className="font-display text-[16.5px] font-bold leading-snug">{s.t}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-grafite/70">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="estreito reveal mt-10 text-center">
          <p className="text-[18px] leading-relaxed text-grafite/80">
            Não é falta de força de vontade. <b className="text-grafite">Uma cabeça sobrecarregada não consegue simplesmente sentar, planejar e seguir uma lista.</b>
          </p>
          <p className="mt-6 rounded-2xl bg-salvia-bg p-5 font-display text-[19px] font-semibold leading-snug text-petroleo-escuro">
            Você não precisa de mais uma lista de tarefas. Precisa de uma forma de organizar tudo o que não sai da sua cabeça.
          </p>
        </div>
      </section>

      {/* ======= POR QUE A AGENDA COMUM NÃO FUNCIONA ======= */}
      <section className="bg-grafite py-16 text-creme sm:py-20">
        <div className="estreito">
          <h2 className="reveal text-center font-display text-[28px] font-bold leading-[1.12] sm:text-[40px]">Por que a agenda comum não funciona para quem tem a mente acelerada</h2>
          <div className="mt-9 space-y-3">
            {POR_QUE_NAO.map(([t, d], i) => (
              <div key={t} className="reveal flex gap-4 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracota font-display text-[16px] font-bold text-grafite">{i + 1}</span>
                <div>
                  <p className="font-display text-[17.5px] font-bold">{t}</p>
                  <p className="mt-1 text-[15.5px] leading-relaxed text-creme/70">{d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="reveal mt-10 text-center text-[19px] leading-relaxed text-creme/85">
            O Mente Calma foi desenvolvido ao contrário: <b className="text-creme">antes de organizar o seu dia, ele organiza o que está ocupando a sua cabeça.</b>
          </p>
        </div>
      </section>

      {/* ======= MÉTODO ======= */}
      <section id="metodo" className="relative py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[700px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-petroleo px-3.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-[.2em] text-creme">
              <LogoMark size={18} light /> A metodologia exclusiva
            </span>
            <h2 className="titulo mt-4">Método Mente em 3 Lugares</h2>
            <p className="sub mt-4">
              A ansiedade guarda tudo na mesma gaveta: o que você <b className="text-grafite">precisa fazer</b>, o que <b className="text-grafite">pode esperar</b> e o que você está <b className="text-grafite">só antecipando</b>. Enquanto fica tudo junto, tudo parece urgente.
            </p>
            <p className="sub mt-3">O método separa essas três coisas. E quando cada pensamento ganha o seu lugar, a cabeça finalmente para de segurar tudo.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LUGARES.map((m, i) => (
              <div key={m.n} className={`reveal rounded-[22px] p-6 ${m.cor}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-petroleo">
                    <m.icon size={21} strokeWidth={2.3} />
                  </span>
                  <span className="font-display text-[13px] font-bold text-grafite/35">LUGAR 0{i + 1}</span>
                </div>
                <p className="mt-4 font-display text-[22px] font-bold uppercase tracking-wide">{m.n}</p>
                <p className="text-[15px] italic text-grafite/65">{m.s}</p>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-grafite/80">{m.d}</p>
                <div className="mt-4 rounded-xl bg-white/70 p-3 text-[14.5px]">
                  <p className="italic text-grafite/75">{m.ex}</p>
                  <p className="mt-1 font-bold text-petroleo-escuro">→ {m.fim}</p>
                </div>
              </div>
            ))}
          </div>

          {/* As 3 etapas dos 10 minutos */}
          <div className="reveal mx-auto mt-12 max-w-[860px] rounded-[26px] bg-white/80 p-5 shadow-suave ring-1 ring-grafite/5 sm:p-7">
            <div className="flex items-center justify-center gap-2 text-center">
              <Timer size={20} className="text-terracota-escuro" />
              <p className="font-display text-[17px] font-bold">Como funcionam os 10 minutos</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {ETAPAS.map(([t, min, d], i) => (
                <div key={t} className="relative rounded-2xl bg-creme p-4">
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-[13px] font-bold text-terracota-escuro">ETAPA {i + 1}</p>
                    <p className="font-display text-[12px] font-bold text-grafite/40">{min}</p>
                  </div>
                  <p className="mt-1 font-display text-[19px] font-bold">{t}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-grafite/70">{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mx-auto mt-10 max-w-[860px]">
            <p className="mb-4 text-center font-display text-[13px] font-bold uppercase tracking-[.22em] text-grafite/50">Veja o método funcionando</p>
            <MetodoDemo />
          </div>

          <div className="reveal mx-auto mt-10 max-w-[640px] text-center">
            <p className="text-[18px] leading-relaxed text-grafite/80">
              Em 10 minutos: <b className="text-grafite">preocupações separadas</b>, <b className="text-grafite">pendências encaminhadas</b> e <b className="text-grafite">uma primeira ação definida</b>.
            </p>
            <div className="mt-7 flex justify-center">
              <Cta>Quero aplicar o método</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ======= VEJA POR DENTRO ======= */}
      <section className="bg-white/60 py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <span className="inline-block rounded-full bg-grafite px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[.2em] text-creme">Veja por dentro</span>
            <h2 className="titulo mt-4">Páginas feitas para riscar, rabiscar e recomeçar.</h2>
            <p className="sub mt-3">Nada de páginas perfeitas que dão medo de estragar. Aqui é para usar de verdade.</p>
          </div>
          <div className="reveal mt-9">
            <PorDentro />
          </div>
        </div>
      </section>

      {/* ======= O QUE VEM DENTRO ======= */}
      <section id="dentro" className="py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[660px] text-center">
            <p className="eyebrow">O que vem no planner</p>
            <h2 className="titulo mt-3">Uma agenda organiza compromissos. O Mente Calma organiza também as preocupações.</h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {DENTRO.map((d, i) => (
              <div
                key={d.t}
                className={`reveal rounded-[22px] p-5 ${d.destaque ? 'bg-petroleo text-creme shadow-papel sm:col-span-2' : 'card'}`}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${d.destaque ? 'bg-white/15 text-creme' : 'bg-salvia-bg text-petroleo'}`}>
                  <d.icon size={21} />
                </span>
                <p className={`mt-4 font-display font-bold leading-snug ${d.destaque ? 'text-[21px]' : 'text-[17px]'}`}>{d.t}</p>
                <p className={`mt-1.5 text-[15px] leading-relaxed ${d.destaque ? 'text-creme/80' : 'text-grafite/70'}`}>{d.d}</p>
              </div>
            ))}
          </div>

          <div className="reveal mx-auto mt-8 grid max-w-[860px] gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-salvia-bg p-4 text-[15px] leading-snug">
              <Printer size={22} className="shrink-0 text-petroleo" /> <span><b>Imprima</b> em A4 só as páginas que for usar, quantas vezes quiser.</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-salvia-bg p-4 text-[15px] leading-snug">
              <Tablet size={22} className="shrink-0 text-petroleo" /> <span>Ou <b>preencha no tablet</b>: GoodNotes, Notability, Xodo, Samsung Notes.</span>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="reveal rounded-[22px] bg-creme-escuro p-6">
              <p className="font-display text-[12px] font-bold uppercase tracking-[.22em] text-grafite/45">Antes</p>
              <p className="mt-2 text-[17.5px] leading-relaxed text-grafite/80">Acordar já cansada(o), com mil coisas na cabeça, e chegar à noite sem saber o que realmente fez.</p>
            </div>
            <div className="reveal rounded-[22px] bg-petroleo p-6 text-creme" style={{ transitionDelay: '90ms' }}>
              <p className="font-display text-[12px] font-bold uppercase tracking-[.22em] text-salvia">Depois</p>
              <p className="mt-2 text-[17.5px] leading-relaxed">Tirar tudo da cabeça em 10 minutos, saber o primeiro passo e ir dormir sabendo o que fica para amanhã.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======= BÔNUS ======= */}
      <section id="bonus" className="bg-white/60 py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <p className="eyebrow">Só nesta oferta</p>
            <h2 className="titulo mt-3">Você ainda leva 4 bônus para os momentos mais pesados.</h2>
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
                    <p className="text-[13px]">
                      <s className="text-grafite/45">{brl(valores.bonus[i])}</s>{' '}
                      <span className="rounded-full bg-petroleo px-2.5 py-0.5 font-display text-[11px] font-bold text-creme">GRÁTIS</span>
                    </p>
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
      <Depoimentos />

      {/* ======= QUEM CRIOU ======= */}
      {modoTeste && (
        <section className="so-teste bg-white/60 py-16 sm:py-20">
          <div className="wrap grid items-center gap-8 md:grid-cols-[.8fr_1.2fr] md:gap-12">
            <div className="reveal relative mx-auto w-[74%] max-w-[340px] md:w-full">
              <div className="absolute -inset-3 rotate-[-3deg] rounded-[30px] bg-salvia/50" />
              <Image src={criadora.foto} alt={criadora.nome} width={640} height={800} sizes="(max-width:768px) 74vw, 340px" className="relative h-auto w-full rounded-[26px] shadow-papel" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-petroleo px-4 py-2 font-display text-[12.5px] font-bold text-creme shadow-suave">{criadora.papel}</span>
            </div>
            <div className="reveal">
              <p className="eyebrow">Quem criou</p>
              <h2 className="titulo mt-3">Eu criei o método que eu precisava ter encontrado.</h2>
              <div className="mt-5 space-y-4 text-[16.5px] leading-relaxed text-grafite/80">
                {criadora.historia.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-5 font-display text-[18px] font-bold text-petroleo">— {criadora.nome}</p>
            </div>
          </div>
        </section>
      )}

      {/* ======= OFERTA ======= */}
      <section id="oferta" className="bg-gradient-to-b from-salvia-bg to-creme py-16 sm:py-20">
        <div className="estreito">
          <h2 className="titulo reveal text-center">Sua cabeça não precisa carregar tudo sozinha.</h2>
          <p className="sub reveal mt-3 text-center">Comece hoje, com 10 minutos.</p>
          <div className="reveal mt-9 overflow-hidden rounded-[28px] bg-white shadow-papel ring-1 ring-grafite/5">
            <div className="relative flex items-center gap-4 bg-petroleo px-6 py-5 text-creme">
              <LogoMark size={46} light />
              <div className="pr-14">
                <p className="font-display text-[19px] font-bold leading-tight">Planner Mente Calma</p>
                <p className="text-[14px] text-creme/75">completo + 4 bônus</p>
              </div>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-terracota px-2.5 py-1 font-display text-[11px] font-bold text-grafite">-{Math.round((1 - preco / precoDe) * 100)}%</span>
            </div>
            <div className="p-5 sm:p-8">
              <div className="mx-auto w-[52%] max-w-[210px]">
                <Image src={imagens.capa} alt="" width={482} height={657} sizes="210px" className="h-auto w-full -rotate-2 rounded-xl shadow-papel" />
              </div>
              <ul className="mt-7 divide-y divide-grafite/10 rounded-2xl bg-creme/70 px-4">
                <Linha t="Planner Mente Calma completo + Método Mente em 3 Lugares" v={valores.planner} />
                {BONUS.map((b, i) => (
                  <Linha key={b.t} t={`Bônus ${i + 1} · ${b.t}`} v={valores.bonus[i]} gratis />
                ))}
              </ul>
              <p className="mt-3 text-center text-[14px] text-grafite/60">
                Valor total: <s>{brl(totalValor)}</s>
              </p>
              <div className="mt-5 text-center">
                <p className="text-[15px] text-grafite/70">
                  Hoje, de <s>{brl(precoDe)}</s> por apenas
                </p>
                <p className="mt-1 font-display text-[60px] font-bold leading-none tracking-tight text-grafite">
                  <span className="align-top text-[24px]">R$</span>
                  {preco}
                </p>
                <p className="mt-2 text-[14px] text-grafite/60">pagamento único · sem mensalidade · acesso imediato</p>
              </div>
              <div className="mt-6 flex justify-center">
                <Cta>Quero o Planner Mente Calma</Cta>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-grafite/55">
                <ShieldCheck size={15} /> Compra 100% segura · PDF para imprimir ou usar no tablet
              </p>
            </div>
          </div>

          <div className="reveal mt-6 flex gap-4 rounded-[22px] bg-white/80 p-5 ring-1 ring-grafite/5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-terracota-claro text-center font-display text-[13px] font-bold leading-tight text-terracota-escuro">
              {garantiaDias}
              <br />
              dias
            </span>
            <div>
              <p className="font-display text-[17px] font-bold">Garantia incondicional de {garantiaDias} dias.</p>
              <p className="mt-1 text-[15px] leading-relaxed text-grafite/70">Use o planner. Se não ajudar você a organizar a cabeça e a rotina, peça o reembolso dentro do prazo e devolvemos 100% do valor. Sem perguntas.</p>
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
      <section className="relative overflow-hidden bg-petroleo pb-24 pt-16 text-creme sm:pb-28 sm:pt-20">
        <svg className="absolute bottom-0 left-0 w-full opacity-40" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden>
          <path d="M0 90 C250 30 420 150 700 80 S1100 40 1200 70 V160 H0Z" fill="#A8BDB0" opacity=".45" />
          <path d="M0 130 C300 90 600 170 1200 110 V160 H0Z" fill="#D7A58D" opacity=".55" />
        </svg>
        <div className="estreito relative text-center">
          <LogoMark size={64} light className="mx-auto" />
          <h2 className="reveal mt-5 font-display text-[28px] font-bold leading-[1.12] sm:text-[40px]">Você não precisa guardar tudo na cabeça. Só precisa de um lugar para colocar.</h2>
          <p className="reveal mt-4 text-[18px] text-creme/80">Menos peso na mente. Mais clareza no dia.</p>
          <div className="reveal mt-8 flex justify-center">
            <Cta>Quero começar hoje</Cta>
          </div>
          <p className="mt-4 text-[13px] text-creme/65">
            de {brl(precoDe)} por {brl(preco)} · acesso imediato · {garantiaDias} dias de garantia
          </p>
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

function Linha({ t, v, gratis = false }: { t: string; v: number; gratis?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 py-3 text-[14.5px] leading-snug">
      <span className="flex gap-2.5 text-grafite/85">
        <Check size={17} strokeWidth={3} className="mt-0.5 shrink-0 text-petroleo" />
        {t}
      </span>
      <span className="shrink-0 text-right">
        {gratis ? (
          <>
            <s className="block text-[12px] text-grafite/40">{brl(v)}</s>
            <span className="font-display text-[12px] font-bold text-petroleo">GRÁTIS</span>
          </>
        ) : (
          <span className="font-display text-[14px] font-bold text-grafite/70">{brl(v)}</span>
        )}
      </span>
    </li>
  );
}

function Depoimentos() {
  const reais = imagens.depoimentos;
  if (!reais.length && !modoTeste && !mostrarPlaceholders) return null;
  return (
    <section className="py-16 sm:py-20">
      <div className="wrap">
        <div className="reveal mx-auto max-w-[640px] text-center">
          <p className="eyebrow">Quem já usa</p>
          <h2 className="titulo mt-3">O que acontece quando a cabeça finalmente ganha um lugar para descansar</h2>
        </div>
        {reais.length ? (
          <div className="mt-10 columns-2 gap-4 sm:columns-3">
            {reais.map((d) => (
              <Image key={d.img} src={d.img} alt="Depoimento de cliente" width={d.w} height={d.h} sizes="(max-width:640px) 50vw, 33vw" className="reveal mb-4 h-auto w-full rounded-2xl shadow-suave" />
            ))}
          </div>
        ) : (
          <>
            {modoTeste && (
              <div className="so-teste mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {depoimentosTeste.map((d, i) => (
                  <figure key={d.nome} className="reveal card flex flex-col p-5" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                    <p className="text-[15px] tracking-[.2em] text-terracota-escuro">★★★★★</p>
                    <blockquote className="mt-2 flex-1 text-[16px] leading-relaxed text-grafite/85">
                      “{d.texto} <span className="grifo font-bold text-grafite">{d.destaque}</span>
                      {d.fim}”
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <Image src={d.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                      <span className="font-display text-[14px] font-bold">{d.nome}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
            {mostrarPlaceholders && (
              <div className={`${modoTeste ? 'so-placeholder' : 'grid'} mt-10 grid-cols-2 gap-4 sm:grid-cols-3`}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="grid aspect-[9/14] place-items-center rounded-2xl border-2 border-dashed border-grafite/15 bg-white/50 p-4 text-center text-[13px] text-grafite/45">
                    Espaço para print de depoimento real {i + 1}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function Garantias() {
  return (
    <p className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px] text-grafite/60 md:justify-start">
      <span>
        de <s>{brl(precoDe)}</s> por <b className="text-grafite">{brl(preco)}</b>
      </span>
      <span>·</span>
      <span>PDF para imprimir ou usar no tablet</span>
      <span>·</span>
      <span>{garantiaDias} dias de garantia</span>
    </p>
  );
}
