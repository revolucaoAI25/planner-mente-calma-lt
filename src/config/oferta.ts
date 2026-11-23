/**
 * Conteúdo editável da página: marca, preço, links de checkout e imagens.
 * Para trocar uma imagem, coloque o arquivo em /public/img e preencha o campo `img` (ex.: '/img/paginas/metodo.webp').
 * Campo `img` vazio = a página mostra a ilustração provisória (ou um espaço reservado com a descrição).
 */

export const marca = {
  nome: 'Planner Mente Calma',
  suporte: process.env.NEXT_PUBLIC_SUPORTE_EMAIL || 'suporte@plannermentecalma.com.br',
};

/** Checkout da Kiwify (variável NEXT_PUBLIC_CHECKOUT na Vercel). Vazio = os botões levam para a seção de preço. */
export const checkout = process.env.NEXT_PUBLIC_CHECKOUT ?? '';

export const preco = 37;
/** Preço "de" (riscado). */
export const precoDe = 97;

/** Valor de cada entregável na pilha de valor da oferta (o planner vale o preço "de"; os bônus saem de graça). */
export const valores = { planner: 97, bonus: [27, 27, 24, 24] };

/** Garantia em dias (precisa bater com o que está configurado na Kiwify). */
export const garantiaDias = 7;

export const imagens = {
  /** Mockup do planner (topo e oferta). */
  capa: '/img/planner-capa.webp',
  /**
   * Páginas do planner para o carrossel "Veja por dentro".
   * `img` vazio = ilustração provisória da página. Troque pelos prints/fotos reais do produto.
   */
  porDentro: [
    { id: 'metodo', img: '', legenda: 'Método Mente em 3 Lugares: tire tudo da cabeça em 10 minutos' },
    { id: 'dia', img: '', legenda: 'Meu dia sem sobrecarga: 3 prioridades e um primeiro passo' },
    { id: 'acelerada', img: '', legenda: 'Modo Mente Acelerada: uma página só, para os dias difíceis' },
    { id: 'preocupacoes', img: '', legenda: 'Organizador de preocupações: o que é real, o que é futuro, o que é repetição' },
    { id: 'semana', img: '', legenda: 'Semana leve: compromissos, contas e o que pode esperar' },
    { id: 'recomeco', img: '', legenda: 'Página de recomeço: voltar sem precisar preencher o que ficou para trás' },
  ],
  /** Capas dos bônus (vazio = capa provisória desenhada). */
  bonus: ['', '', '', ''] as string[],
  /**
   * Prints de depoimentos reais (WhatsApp/Instagram). Enquanto estiver vazio, a seção mostra espaços reservados.
   * Use só depoimentos reais com autorização: depoimento inventado é propaganda enganosa e motivo de bloqueio na Meta.
   */
  depoimentos: [] as { img: string; w: number; h: number }[],
};

/** Esconde os espaços reservados (prints, depoimentos) quando a página for ao ar sem eles. */
export const mostrarPlaceholders = process.env.NEXT_PUBLIC_ESCONDER_PLACEHOLDERS !== '1';

/**
 * MODO TESTE: mostra conteúdo fictício (criadora e depoimentos de exemplo) só para validar o layout.
 * Desligue antes de rodar anúncios: NEXT_PUBLIC_MODO_TESTE=0 na Vercel (ou troque aqui para false).
 * Com o modo teste ligado, aparece um botão flutuante para mostrar/esconder o conteúdo fictício.
 */
export const modoTeste = process.env.NEXT_PUBLIC_MODO_TESTE !== '0';

/** Seção "quem criou". No modo teste usa a persona fictícia abaixo; troque pelos dados reais antes de ir ao ar. */
export const criadora = {
  nome: 'Helena Prado',
  papel: 'Criadora do Método Mente em 3 Lugares',
  foto: '/img/teste/criadora.webp',
  historia: [
    'Durante anos, eu fui a pessoa que “dava conta de tudo”. Por fora, organizada. Por dentro, uma cabeça que não desligava: deitava e repassava o dia inteiro, ensaiava conversas, acordava às 3h lembrando de uma conta.',
    'Testei agenda, aplicativo, bullet journal, listas coloridas. Todos funcionavam por uma semana. O problema não era falta de disciplina: nenhum deles tinha lugar para o que mais pesava, as preocupações.',
    'Foi numa madrugada, despejando tudo num caderno, que percebi: metade do que me tirava o sono eu podia resolver, uma parte podia esperar, e o resto eu só estava antecipando. Separar isso em três lugares mudou meus dias.',
    'Transformei esse jeito de pensar em método e o método em planner. Hoje ele ajuda pessoas que, como eu, pensam demais e só precisavam de um lugar para colocar tudo.',
  ],
};

/** Depoimentos fictícios para validar o layout (só aparecem no modo teste). */
export const depoimentosTeste = [
  { nome: 'Juliana, 34 anos', avatar: '/img/teste/avatar-1.webp', texto: 'Eu deitava e ficava repassando tudo. Agora faço a página do Mente em 3 Lugares antes de dormir e', destaque: 'durmo sabendo que nada ficou solto', fim: '.' },
  { nome: 'Fernanda, 41 anos', avatar: '/img/teste/avatar-2.webp', texto: 'O “Desocupar” foi a coisa mais simples e mais útil que já fiz.', destaque: 'Metade do que me preocupava nem era para agora', fim: '.' },
  { nome: 'Rafael, 29 anos', avatar: '/img/teste/avatar-3.webp', texto: 'Já larguei umas cinco agendas. Essa não tem data, então quando eu sumo uns dias', destaque: 'só volto pela página de recomeço', fim: ', sem culpa.' },
  { nome: 'Camila, 26 anos', avatar: '/img/teste/avatar-4.webp', texto: 'Nos dias em que a cabeça fica a mil, abro o Modo Mente Acelerada.', destaque: 'Uma página só e eu já sei o próximo passo', fim: '.' },
  { nome: 'Marcos, 38 anos', avatar: '/img/teste/avatar-5.webp', texto: 'Achei que era “mais um planner”. Mas separar o que é problema do que é preocupação', destaque: 'tirou um peso enorme das minhas manhãs', fim: '.' },
  { nome: 'Patrícia, 45 anos', avatar: '/img/teste/avatar-6.webp', texto: 'Imprimi só as páginas que uso. Dez minutos de manhã e', destaque: 'o dia deixou de parecer uma lista sem fim', fim: '.' },
];
