import Image from 'next/image';
import Link from 'next/link';
import {
  BatteryLow,
  Brain,
  CalendarDays,
  Check,
  CircleDollarSign,
  HeartPulse,
  MessageCircleQuestion,
  Moon,
  Printer,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Sun,
  Tablet,
  Wind,
  Zap,
} from 'lucide-react';
import { Cta } from '@/components/Cta';
import { ExitPopup } from '@/components/ExitPopup';
import { Faq } from '@/components/Faq';
import { Logo, LogoMark } from '@/components/Logo';
import { PorDentro } from '@/components/PorDentro';
import { Quiz } from '@/components/Quiz';
import { Reveal } from '@/components/Reveal';
import { StickyBar } from '@/components/StickyBar';
import { criadora, criadoraReal, depoimentosTeste, garantiaDias, imagens, marca, modoTeste, preco, precoDe, provaSocial, valores } from '@/config/oferta';

const brl = (n: number) => `R$ ${n}`;

const ABAS = [
  { icon: Moon, t: 'Deita exausta(o) e a cabeça não desliga' },
  { icon: Zap, t: 'Trava, adia o que importa e depois se culpa' },
  { icon: Brain, t: 'Está com quem ama, mas a cabeça está longe' },
  { icon: BatteryLow, t: 'Acorda já cansada(o), antes do dia começar' },
];

const VILOES: { n: string; d: string; a: React.ReactNode }[] = [
  {
    n: 'O Ruminador',
    d: 'Você deita para descansar e ele começa a repassar o dia inteiro: o que você falou, o que esqueceu, o que pode dar errado, até o sono ir embora.',
    a: <>o bônus <b className="text-creme">Desligando a Cabeça Antes de Dormir</b>: descarregue tudo no papel e <b className="text-creme">deite sabendo que nada ficou solto</b>.</>,
  },
  {
    n: 'O “E se…”',
    d: 'Antecipa problemas que ainda não aconteceram (e que, na maioria das vezes, nem vão acontecer), mas que você já sofre hoje.',
    a: <>o lugar <b className="text-creme">Desocupar</b>: registre a preocupação e volte para o que dá para fazer hoje.</>,
  },
  {
    n: 'O Incêndio',
    d: 'Tudo parece urgente ao mesmo tempo, você não sabe por onde começar e acaba travando enquanto o dia passa.',
    a: <>os lugares <b className="text-creme">Resolver e Programar</b>: o que é para agora, o que pode esperar e <b className="text-creme">uma única primeira ação</b>.</>,
  },
];

const LUGARES = [
  { n: 'Resolver', s: 'O que depende de mim', d: 'Tarefas e pendências que pedem uma ação concreta.', ex: '“Preciso pagar aquela conta.”', fim: 'Definir quando pagar.', cor: 'bg-salvia-bg', icon: Check },
  { n: 'Programar', s: 'O que não precisa ser agora', d: 'Compromissos e assuntos que podem esperar o momento certo.', ex: '“Preciso marcar uma consulta.”', fim: 'Colocar na lista de amanhã.', cor: 'bg-salvia-claro/70', icon: CalendarDays },
  { n: 'Desocupar', s: 'O que estou só antecipando', d: 'Preocupações repetitivas e medos sobre o que ainda não aconteceu.', ex: '“E se der errado amanhã?”', fim: 'Registrar e voltar ao que dá para fazer hoje.', cor: 'bg-terracota-claro', icon: Wind },
];

const ETAPAS = [
  ['Despejar', '3 min', 'tudo o que está na cabeça vai para a página, sem filtro'],
  ['Distribuir', '5 min', 'cada pensamento vai para o seu lugar'],
  ['Definir', '2 min', 'você escolhe uma única primeira ação'],
];

const DENTRO: { icon: typeof Brain; t: string; d: string }[] = [
  { icon: Sun, t: 'Dia sem sobrecarga', d: '3 prioridades e um primeiro passo, em vez de uma lista sem fim' },
  { icon: CalendarDays, t: 'Semana e mês', d: 'compromissos, contas e objetivos à vista, sem datas' },
  { icon: Wind, t: 'Modo Mente Acelerada', d: 'páginas simplificadas para os dias mais pesados' },
  { icon: MessageCircleQuestion, t: 'Organizador de preocupações', d: 'problema real, situação futura ou pensamento repetitivo' },
  { icon: HeartPulse, t: 'Hábitos e autocuidado', d: 'sono, pausas e hábitos, sem cobrança' },
  { icon: CircleDollarSign, t: 'Organização financeira', d: 'contas e vencimentos fora da sua cabeça' },
  { icon: RefreshCcw, t: 'Páginas de recomeço', d: 'volte depois de dias difíceis, sem culpa' },
];

const BONUS = [
  { t: 'SOS Mente Acelerada', d: 'Páginas rápidas para organizar os pensamentos e escolher um próximo passo quando a cabeça estiver a mil.' },
  { t: 'Desligando a Cabeça Antes de Dormir', d: 'Um ritual para encerrar o dia: descarregue as preocupações, prepare o amanhã e deite mais leve.' },
  { t: 'Diário da Ansiedade', d: 'Registre o que se repete, o que aumenta a ansiedade e o que te ajuda no dia a dia.' },
  { t: 'Kit Rotina Sem Sobrecarga', d: 'Modelos simples de rotina para manhã, tarde e noite, que se adaptam à sua realidade.' },
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

      {/* Faixa */}
      <div className="bg-petroleo px-4 py-2 text-center text-[12.5px] leading-snug text-creme">
        <b className="font-bold">Chega de ansiedade:</b> o planner desenvolvido para quem tem a mente sobrecarregada.
      </div>

      {/* ======= TOPO ======= */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 bg-[radial-gradient(closest-side,rgba(168,189,176,.35),transparent)]" />
        <div className="pointer-events-none absolute -left-36 top-[440px] h-96 w-96 bg-[radial-gradient(closest-side,rgba(215,165,141,.3),transparent)]" />
        <div className="wrap relative pt-5">
          <Logo />
        </div>
        <div className="wrap relative grid items-center gap-6 pb-12 pt-7 md:grid-cols-[1.05fr_.95fr] md:gap-10 md:pb-16 md:pt-12">
          <div>
            <p className="eyebrow">Para quem pensa demais e se preocupa com tudo</p>
            <h1 className="mt-4 text-[33px] font-bold leading-[1.06] tracking-tight text-grafite min-[400px]:text-[36px] sm:text-[52px]">
              Finalmente, um planner desenvolvido para o <span className="grifo">cérebro com ansiedade</span>.
            </h1>
            <p className="sub mt-5">
              Pare de lutar contra uma cabeça que não desliga e te deixa cansada(o) o dia inteiro. Com o <b className="text-grafite">Método Mente em 3 Lugares</b>, em 10 minutos por dia você tira tudo da cabeça, separa o que precisa resolver do que é só preocupação e termina com <b className="text-grafite">um primeiro passo claro</b>.
            </p>
            <div className="mt-7 hidden md:block">
              <Cta>Quero minha mente mais calma</Cta>
              <Garantias />
              <ProvaSocial />
            </div>
          </div>

          {/* Mockup: páginas reais do planner (tablet com exemplo preenchido, mapa da jornada e o caderno impresso) */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(168,189,176,.55),rgba(215,165,141,.25)_60%,transparent)]" />
            <Image src={imagens.hero} alt="Planner Mente Calma impresso e no tablet, com páginas preenchidas" width={1000} height={838} priority sizes="(max-width:768px) 92vw, 500px" className="relative h-auto w-full" />
            <span className="absolute left-0 top-[4%] rotate-[-5deg] rounded-full bg-grafite px-3 py-1.5 font-display text-[12px] font-bold text-white shadow-suave">30 dias prontos</span>
            <span className="absolute right-0 top-[52%] rotate-[5deg] rounded-full bg-terracota-escuro px-3 py-1.5 font-display text-[12px] font-bold text-white shadow-suave">+ 4 bônus</span>
            <span className="absolute bottom-[3%] left-[3%] rotate-[-4deg] rounded-full bg-white px-3 py-1.5 font-display text-[12px] font-bold text-petroleo shadow-suave">✓ Sem ansiedade, sem preocupação</span>
          </div>

          <div className="md:hidden">
            <Cta>Quero minha mente mais calma</Cta>
            <Garantias />
            <ProvaSocial />
          </div>
        </div>

      </section>

      {/* ======= VEJA POR DENTRO (prints) ======= */}
      <section id="por-dentro" className="bg-white/60 py-14 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <span className="inline-block rounded-full bg-grafite px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[.2em] text-creme">Veja por dentro</span>
            <h2 className="titulo mt-4">
              Páginas feitas para <span className="grifo">riscar, rabiscar e recomeçar</span>.
            </h2>
            <p className="sub mt-3">Nada de páginas perfeitas que dão medo de estragar. Use no tablet ou imprima quantas vezes quiser.</p>
          </div>
          <div className="reveal mt-9">
            <PorDentro />
          </div>
          <FotosReais />
        </div>

      </section>

      {/* ======= QUIZ ======= */}
      <section id="teste" className="relative overflow-hidden bg-gradient-to-b from-petroleo to-petroleo-escuro py-16 text-creme sm:py-20">
        <svg className="pointer-events-none absolute -top-px left-0 w-full rotate-180 opacity-30" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60 C250 10 420 110 700 50 S1100 20 1200 40 V120 H0Z" fill="#A8BDB0" />
        </svg>
        <div className="mx-auto w-full max-w-[640px] px-5">
          <div className="reveal text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-terracota px-3.5 py-1.5 font-display text-[12px] font-bold uppercase tracking-[.16em] text-grafite">
              <span className="h-2 w-2 animate-ping rounded-full bg-grafite" /> Teste de 1 minuto
            </span>
            <h2 className="mt-4 font-display text-[29px] font-bold leading-[1.1] sm:text-[40px]">
              O quanto a sua mente está <span className="text-terracota">ansiosa e sobrecarregada</span>?
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-creme/80">
              Responda 5 perguntas rápidas e descubra <b className="text-creme">o seu nível de ansiedade e sobrecarga</b>, o que mais pesa e por onde começar. Resultado na hora.
            </p>
          </div>
          <div className="reveal mt-8">
            <Quiz />
          </div>
        </div>
      </section>

      {/* ======= IDENTIFICAÇÃO ======= */}
      <section className="py-16 sm:py-20">
        <div className="estreito text-center">
          <h2 className="titulo reveal">
            Se a sua mente fosse um navegador, teria <span className="grifo">47 abas abertas</span>.
          </h2>
          <p className="sub reveal mt-3">E todas tocando música ao mesmo tempo.</p>
        </div>

        {/* abas do navegador */}
        <div className="reveal mx-auto mt-9 max-w-[720px] px-5">
          <div className="overflow-hidden rounded-2xl bg-white shadow-papel ring-1 ring-grafite/10">
            <div className="flex items-center gap-1.5 border-b border-grafite/10 bg-creme-escuro/70 px-3 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-terracota" />
              <span className="h-2.5 w-2.5 rounded-full bg-salvia" />
              <span className="h-2.5 w-2.5 rounded-full bg-petroleo/50" />
              <span className="ml-2 truncate text-[12px] text-grafite/45">minha-cabeca.com/tudo-ao-mesmo-tempo</span>
            </div>
            <ul className="divide-y divide-grafite/5">
              {ABAS.map((a, i) => (
                <li key={a.t} className="flex items-center gap-3 px-4 py-3.5" style={{ opacity: 1 - i * 0.04 }}>
                  <a.icon size={18} className="shrink-0 text-terracota-escuro" />
                  <span className="flex-1 font-display text-[15.5px] font-semibold text-grafite">{a.t}</span>
                  <span className="text-[16px] text-grafite/25">×</span>
                </li>
              ))}
              <li className="px-4 py-3 text-center text-[13px] font-bold text-grafite/40">+ 43 abas abertas…</li>
            </ul>
          </div>
        </div>

        <div className="estreito reveal mt-12 space-y-5 text-center text-[19px] leading-relaxed text-grafite/80">
          <p>
            E isso cobra um preço alto: o trabalho não rende como você sabe que poderia, os planos vão ficando para depois, nem o fim de semana descansa de verdade e, às vezes, sobra para quem não tem culpa. <b className="text-grafite">Dá a sensação de que a vida está passando enquanto você só tenta dar conta.</b>
          </p>
          <p>
            Isso não tem nada a ver com preguiça. <b className="text-grafite">Uma cabeça sobrecarregada não consegue simplesmente sentar, planejar e seguir uma lista.</b>
          </p>
          <p className="font-display text-[22px] font-bold leading-snug text-petroleo-escuro sm:text-[26px]">
            Você não precisa de mais uma lista de tarefas. Precisa de um jeito de <span className="grifo">esvaziar a cabeça</span>.
          </p>
        </div>
      </section>

      {/* ======= VILÕES E ANTÍDOTOS ======= */}
      <section className="bg-grafite py-16 text-creme sm:py-20">
        <div className="estreito">
          <h2 className="reveal text-center font-display text-[28px] font-bold leading-[1.12] sm:text-[40px]">
            Os 3 vilões da mente ansiosa, e o <span className="text-terracota">antídoto</span> de cada um
          </h2>
          <ol className="mt-10 space-y-8">
            {VILOES.map((v, i) => (
              <li key={v.n} className="reveal flex gap-5" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="font-display text-[46px] font-bold leading-none text-terracota">{i + 1}</span>
                <div className="border-l border-white/15 pl-5">
                  <p className="font-display text-[20px] font-bold">{v.n}</p>
                  <p className="mt-1 text-[16.5px] leading-relaxed text-creme/70">{v.d}</p>
                  <p className="mt-2.5 text-[16px] leading-relaxed text-creme/85">
                    <span className="font-display text-[12px] font-bold uppercase tracking-[.16em] text-salvia">Antídoto · </span>
                    {v.a}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="reveal mt-12 text-center text-[20px] leading-relaxed text-creme/85">
            Uma agenda comum não ajuda com nenhum deles, porque só acrescenta mais coisa na lista. O Mente Calma foi desenvolvido ao contrário: <span className="font-bold text-creme underline decoration-terracota decoration-[3px] underline-offset-[6px]">antes de organizar o seu dia, ele organiza o que está ocupando a sua cabeça.</span>
          </p>
        </div>
      </section>

      {/* ======= MÉTODO ======= */}
      <section id="metodo" className="py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[700px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-petroleo px-3.5 py-1.5 font-display text-[11px] font-bold uppercase tracking-[.2em] text-creme">
              <LogoMark size={18} light /> A metodologia exclusiva
            </span>
            <h2 className="titulo mt-4">Método Mente em 3 Lugares</h2>
            <p className="sub mt-4">
              A ansiedade joga tudo na mesma gaveta: o que você <b className="text-grafite">precisa fazer</b>, o que <b className="text-grafite">pode esperar</b> e o que é <span className="grifo font-bold text-grafite">só medo do que pode acontecer</span>. Enquanto fica tudo junto, tudo parece urgente e fica difícil sair do lugar.
            </p>
            <p className="sub mt-3">O método separa essas três coisas. Quando cada pensamento ganha o seu lugar, <b className="text-grafite">a cabeça finalmente para de segurar tudo</b>.</p>
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
                <p className="mt-4 text-[14.5px] italic text-grafite/70">{m.ex}</p>
                <p className="mt-1 text-[14.5px] font-bold text-petroleo-escuro">→ {m.fim}</p>
              </div>
            ))}
          </div>

          {/* linha do tempo dos 10 minutos */}
          <div className="reveal mx-auto mt-14 max-w-[820px]">
            <p className="text-center font-display text-[20px] font-bold">
              Tudo isso em <span className="grifo">10 minutos</span>:
            </p>
            <ol className="relative mt-8 grid gap-6 sm:grid-cols-3 sm:gap-4">
              <span className="absolute left-[19px] top-5 h-[calc(100%-40px)] w-0.5 bg-terracota/40 sm:left-[16%] sm:right-[16%] sm:top-5 sm:h-0.5 sm:w-auto" aria-hidden />
              {ETAPAS.map(([t, min, d], i) => (
                <li key={t} className="relative flex gap-4 sm:flex-col sm:items-center sm:text-center">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-terracota-escuro font-display text-[15px] font-bold text-white ring-4 ring-creme">{i + 1}</span>
                  <div>
                    <p className="font-display text-[19px] font-bold">
                      {t} <span className="text-[13px] font-bold text-terracota-escuro">{min}</span>
                    </p>
                    <p className="mt-0.5 text-[15.5px] leading-relaxed text-grafite/70">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal mx-auto mt-12 max-w-[640px] text-center">
            <p className="text-[19px] leading-relaxed text-grafite/80">
              No fim dos 10 minutos, as pendências estão no papel, a cabeça fica mais leve e <span className="grifo font-bold text-grafite">você sabe por onde começar</span>.
            </p>
            <p className="mt-3 text-[16px] leading-relaxed text-grafite/70">
              E sem sobrecarga: <b className="text-grafite">na primeira semana você usa só 2 páginas</b>. O resto vem quando você quiser.
            </p>
            <div className="mt-7 flex justify-center">
              <Cta>Quero aplicar o método</Cta>
            </div>
          </div>
        </div>
      </section>

      {/* ======= O QUE VEM DENTRO ======= */}
      <section id="dentro" className="bg-white/60 py-16 sm:py-20">
        <div className="wrap grid items-center gap-10 md:grid-cols-[.9fr_1.1fr] md:gap-14">
          <div className="reveal relative mx-auto w-full max-w-[520px]">
            <Image src={imagens.fotoAberto} alt="Planner Mente Calma aberto: Mente em 3 Lugares e Meu dia lado a lado" width={1100} height={825} sizes="(max-width:768px) 92vw, 480px" className="h-auto w-full rounded-[24px] shadow-papel ring-1 ring-grafite/5" />
            <span className="absolute -bottom-3 left-4 rounded-full bg-white px-3.5 py-2 font-display text-[12.5px] font-bold text-petroleo shadow-suave">Cada dia numa página dupla ✍️</span>
          </div>
          <div>
            <p className="eyebrow reveal">O que vem no planner</p>
            <h2 className="titulo reveal mt-3">
              Uma agenda organiza compromissos. O Mente Calma organiza também as <span className="grifo">preocupações</span>.
            </h2>
            <p className="reveal mt-6 rounded-2xl bg-petroleo p-5 text-[16px] leading-relaxed text-creme/85">
              <Sparkles size={18} className="mb-2 text-terracota" />
              <b className="text-creme">Páginas do Método Mente em 3 Lugares:</b> o passo a passo guiado de 10 minutos para tirar tudo da cabeça e separar no lugar certo. Use todo dia ou sempre que a mente pesar.
            </p>
            <ul className="reveal mt-6 space-y-3.5">
              {DENTRO.map((d) => (
                <li key={d.t} className="flex gap-3 text-[16px] leading-snug text-grafite/75">
                  <d.icon size={19} className="mt-0.5 shrink-0 text-petroleo" />
                  <span>
                    <b className="text-grafite">{d.t}:</b> {d.d}
                  </span>
                </li>
              ))}
            </ul>
            <p className="reveal mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-grafite/70">
              <span className="inline-flex items-center gap-1.5">
                <Printer size={17} className="text-petroleo" /> Imprima em A4
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tablet size={17} className="text-petroleo" /> ou use no tablet
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={17} strokeWidth={3} className="text-petroleo" /> sem datas
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ======= BÔNUS ======= */}
      <section id="bonus" className="bg-white/60 py-16 sm:py-20">
        <div className="wrap">
          <div className="reveal mx-auto max-w-[640px] text-center">
            <p className="eyebrow">Só nesta oferta</p>
            <h2 className="titulo mt-3">
              Você ainda leva <span className="grifo">4 bônus</span> para os momentos mais pesados.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
            {BONUS.map((b, i) => (
              <div key={b.t} className="reveal" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                <div className="relative">
                  <Image src={imagens.bonus[i]} alt={b.t} width={480} height={644} sizes="(max-width:1024px) 46vw, 240px" className="h-auto w-full rounded-xl shadow-papel" />
                  <span className="absolute -right-1.5 -top-2.5 rotate-[6deg] rounded-full bg-petroleo px-2.5 py-1 font-display text-[11px] font-bold text-creme shadow-suave">GRÁTIS</span>
                </div>
                <p className="mt-3 font-display text-[11px] font-bold uppercase tracking-[.18em] text-terracota-escuro">
                  Bônus {i + 1} · <s className="text-grafite/40">{brl(valores.bonus[i])}</s>
                </p>
                <p className="mt-1 font-display text-[16.5px] font-bold leading-snug">{b.t}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-grafite/70">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= DEPOIMENTOS ======= */}
      <Depoimentos />

      {/* ======= QUEM CRIOU ======= */}
      {(modoTeste || criadoraReal) && (
        <section className={`${criadoraReal ? '' : 'so-ex'} bg-white/60 py-16 sm:py-20`}>
          <div className="wrap grid items-center gap-8 md:grid-cols-[.8fr_1.2fr] md:gap-12">
            <div className="reveal relative mx-auto w-[74%] max-w-[340px] md:w-full">
              <div className="absolute -inset-3 rotate-[-3deg] rounded-[30px] bg-salvia/50" />
              <Image src={criadora.foto} alt={criadora.nome} width={640} height={800} sizes="(max-width:768px) 74vw, 340px" className="relative h-auto w-full rounded-[26px] shadow-papel" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-petroleo px-4 py-2 font-display text-[12.5px] font-bold text-creme shadow-suave">{criadora.papel}</span>
            </div>
            <div className="reveal">
              <p className="eyebrow">Quem criou</p>
              <h2 className="titulo mt-3">
                Eu criei o método que eu <span className="grifo">precisava ter encontrado</span>.
              </h2>
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
          <h2 className="titulo reveal text-center">
            Quanto tempo mais você vai viver <span className="grifo">no modo sobrevivência</span>?
          </h2>
          <p className="sub reveal mt-3 text-center">Dá para começar hoje mesmo, com 10 minutos por dia.</p>
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
              <Image src={imagens.hero} alt="" width={1000} height={838} sizes="(max-width:640px) 80vw, 380px" className="mx-auto h-auto w-full max-w-[380px]" />
              <ul className="mt-6 divide-y divide-grafite/10 rounded-2xl bg-creme/70 px-4">
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
              <p className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-terracota-claro px-3.5 py-1.5 text-[13.5px] font-bold text-terracota-escuro">
                <span className="h-2 w-2 animate-pulse rounded-full bg-terracota-escuro" /> Bônus limitados · válidos até hoje às 23h59
              </p>
              <div className="mt-4 flex justify-center">
                <Cta>Quero o Planner Mente Calma</Cta>
              </div>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[13px] text-grafite/55">
                <ShieldCheck size={15} className="shrink-0" /> Compra 100% segura · PDF para imprimir ou usar no tablet
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
              <p className="mt-1 text-[15px] leading-relaxed text-grafite/70">
                Use o planner. Se não ajudar você a organizar a cabeça e a rotina, peça o reembolso dentro do prazo e <b className="text-grafite">devolvemos 100% do valor</b>. Sem perguntas.
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
      <section className="relative overflow-hidden bg-petroleo pb-24 pt-16 text-creme sm:pb-28 sm:pt-20">
        <svg className="absolute bottom-0 left-0 w-full opacity-40" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden>
          <path d="M0 90 C250 30 420 150 700 80 S1100 40 1200 70 V160 H0Z" fill="#A8BDB0" opacity=".45" />
          <path d="M0 130 C300 90 600 170 1200 110 V160 H0Z" fill="#D7A58D" opacity=".55" />
        </svg>
        <div className="estreito relative text-center">
          <div className="reveal mx-auto w-full max-w-[300px] sm:max-w-[340px]">
            <Image src={imagens.fotoMaos} alt="Planner Mente Calma impresso nas mãos" width={900} height={900} sizes="(max-width:640px) 300px, 340px" className="h-auto w-full rotate-[-2deg] rounded-[26px] shadow-[0_24px_50px_-20px_rgba(0,0,0,.5)] ring-4 ring-white/15" />
          </div>
          <h2 className="reveal mt-8 font-display text-[28px] font-bold leading-[1.12] sm:text-[40px]">
            Você não precisa guardar tudo na cabeça. Só precisa de <span className="text-terracota">um lugar para colocar</span>.
          </h2>
          <p className="reveal mt-4 text-[18px] text-creme/80">Com menos peso na cabeça, fica mais fácil dormir melhor, render no trabalho e aproveitar o seu dia.</p>
          {mostraProva && (
            <p className="so-ex reveal mt-3 text-[16px] text-creme/80">
              Junte-se a <b className="text-creme">mais de {provaSocial.pessoas} pessoas</b> que já trocaram a cabeça cheia por 10 minutos de clareza.
            </p>
          )}
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
            <Link href="/termos" className="inline-block py-2 underline-offset-2 hover:underline">
              Termos de uso
            </Link>{' '}
            ·{' '}
            <Link href="/privacidade" className="inline-block py-2 underline-offset-2 hover:underline">
              Privacidade
            </Link>{' '}
            · {marca.suporte}
          </p>
          <p className="mt-3 text-creme/45">© {new Date().getFullYear()} {marca.nome}. Este site não é afiliado ao Facebook ou à Meta.</p>
        </div>
      </footer>

      <StickyBar />
      <ExitPopup />
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

const mostraProva = provaSocial.real || modoTeste;

/** "Mais de X pessoas" com avatares. Fictício enquanto provaSocial.real = false (some com o modo teste desligado). */
function ProvaSocial() {
  if (!mostraProva) return null;
  return (
    <div className={`${provaSocial.real ? '' : 'so-ex'} mt-5 flex items-center justify-center gap-3 md:justify-start`}>
      <div className="flex shrink-0 -space-x-2.5">
        {depoimentosTeste.slice(0, 4).map((d) => (
          <Image key={d.avatar} src={d.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover ring-2 ring-creme" />
        ))}
      </div>
      <p className="text-[13.5px] leading-tight text-grafite/75">
        <span className="tracking-[.12em] text-terracota-escuro">★★★★★</span> <b className="text-grafite">{provaSocial.nota}</b>
        <br />
        Já mudou a rotina de <b className="whitespace-nowrap text-grafite">+{provaSocial.pessoas} pessoas</b>
      </p>
    </div>
  );
}

function Depoimentos() {
  const reais = imagens.depoimentos;
  return (
    <section className={`${reais.length ? '' : 'so-dep'} py-16 sm:py-20`}>
      <div className="wrap">
        <div className="reveal mx-auto max-w-[640px] text-center">
          <p className="eyebrow">Resultados reais de quem já usa</p>
          <h2 className="titulo mt-3">
            {mostraProva ? (
              <>
                O método que já mudou a rotina de <span className="grifo">mais de {provaSocial.pessoas} pessoas</span> com a mente ansiosa
              </>
            ) : (
              <>
                O que acontece quando a cabeça finalmente ganha <span className="grifo">um lugar para descansar</span>
              </>
            )}
          </h2>
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
              <div className="so-ex">
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] text-grafite/70">
                  <span className="text-[18px] tracking-[.15em] text-terracota-escuro">★★★★★</span>
                  <span>
                    <b className="text-grafite">{provaSocial.nota} de 5</b> · avaliação de quem já usa
                  </span>
                </div>
                <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
                  {depoimentosTeste.map((d, i) => (
                    <figure key={d.nome} className={`reveal mb-4 break-inside-avoid rounded-[22px] p-5 shadow-suave ring-1 ring-grafite/5 ${i === 0 ? 'bg-petroleo text-creme' : i === 3 ? 'bg-terracota-claro' : 'bg-white'}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[14px] tracking-[.18em] ${i === 0 ? 'text-terracota' : 'text-terracota-escuro'}`}>★★★★★</span>
                        <span className={`font-display text-[40px] leading-[0] ${i === 0 ? 'text-white/25' : 'text-grafite/10'}`}>”</span>
                      </div>
                      {d.titulo && <p className="mt-2 font-display text-[17px] font-bold leading-snug">{d.titulo}</p>}
                      <blockquote className={`mt-2 text-[15.5px] leading-relaxed ${i === 0 ? 'text-creme/90' : 'text-grafite/85'}`}>
                        {d.texto.split('**').map((t, k) =>
                          k % 2 ? (
                            <b key={k} className={i === 0 ? 'text-white underline decoration-terracota decoration-2 underline-offset-4' : 'grifo text-grafite'}>
                              {t}
                            </b>
                          ) : (
                            <span key={k}>{t}</span>
                          ),
                        )}
                      </blockquote>
                      <figcaption className="mt-4 flex items-center gap-3">
                        <Image src={d.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />
                        <span className="leading-tight">
                          <span className="block font-display text-[14.5px] font-bold">{d.nome}</span>
                          <span className={`text-[12.5px] ${i === 0 ? 'text-creme/65' : 'text-grafite/55'}`}>{d.info}</span>
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
            <div className="so-ph mt-10 grid-cols-2 gap-4 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid aspect-[9/14] place-items-center rounded-2xl border-2 border-dashed border-grafite/15 bg-white/50 p-4 text-center text-[13px] text-grafite/45">
                  Espaço para print de depoimento real {i + 1}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/** Fotos reais do planner (capa impressa, alguém folheando…). Sem fotos: só espaço reservado na pré-visualização do /admin. */
function FotosReais() {
  const fotos = imagens.fotosReais;
  const temReal = fotos.some((f) => f.img);
  return (
    <div className={`${temReal ? '' : 'so-pv'} reveal mt-12`}>
      <p className="mb-5 text-center font-display text-[13px] font-bold uppercase tracking-[.22em] text-grafite/50">Na vida real</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {fotos.map((f, i) => (
          <figure key={f.legenda} className={i === 0 ? 'col-span-2 sm:col-span-1' : ''}>
            {f.img ? (
              <div className={`relative overflow-hidden rounded-[20px] shadow-papel ${i === 0 ? 'aspect-[4/3] sm:aspect-[4/5]' : 'aspect-[4/5]'}`}>
                <Image src={f.img} alt={f.legenda} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
              </div>
            ) : (
              <div className={`grid place-items-center rounded-[20px] border-2 border-dashed border-grafite/20 bg-white/60 p-4 text-center text-[13px] text-grafite/50 ${i === 0 ? 'aspect-[4/3] sm:aspect-[4/5]' : 'aspect-[4/5]'}`}>
                Foto real {i + 1}: {f.legenda}
              </div>
            )}
            <figcaption className="mt-2 text-center text-[13px] text-grafite/60">{f.legenda}</figcaption>
          </figure>
        ))}
      </div>
    </div>
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
