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
  /** Composição do topo e da oferta: páginas reais (tablet + mapa da jornada + caderno). */
  hero: '/img/mockups/hero-planner.webp',
  /** Fotos do planner impresso (aberto na mesa e nas mãos). */
  fotoAberto: '/img/fotos/planner-aberto.webp',
  fotoMaos: '/img/fotos/planner-maos.webp',
  /** Mockups do planner (fundo transparente). */
  capa: '/img/mockups/planner-espiral-frente.webp',
  verso: '/img/mockups/planner-espiral-verso.webp',
  capaPlana: '/img/mockups/planner-capa-plana.webp',
  tablet: '/img/mockups/planner-tablet.webp',
  /**
   * Páginas do planner para o carrossel "Veja por dentro" (geradas por `node planner/build.mjs --png`).
   * `img` vazio = ilustração provisória da página. Troque pelos prints/fotos reais do produto.
   */
  porDentro: [
    { id: 'metodo', img: '/img/paginas/metodo.webp', legenda: 'Método Mente em 3 Lugares (exemplo preenchido): tudo fora da cabeça em 10 minutos' },
    { id: 'dia', img: '/img/paginas/dia.webp', legenda: 'Meu dia sem sobrecarga: 3 prioridades e um primeiro passo' },
    { id: 'acelerada', img: '/img/paginas/acelerada.webp', legenda: 'Página SOS: uma página só, para quando a cabeça estiver a mil' },
    { id: 'preocupacoes', img: '/img/paginas/preocupacoes.webp', legenda: 'Organizador de preocupações: o que é real, o que é futuro, o que é repetição' },
    { id: 'semana', img: '/img/paginas/semana.webp', legenda: 'Semana leve: compromissos, contas e o que pode esperar' },
    { id: 'recomeco', img: '/img/paginas/recomeco.webp', legenda: 'Página de recomeço: voltar sem precisar preencher o que ficou para trás' },
  ],
  /**
   * Fotos reais do planner (capa impressa, alguém folheando, página preenchida).
   * Vazio = a seção só aparece como espaço reservado na pré-visualização do /admin.
   */
  fotosReais: [
    { img: '', legenda: 'O planner impresso: a capa' },
    { img: '', legenda: 'Folheando as páginas' },
    { img: '', legenda: 'Uma página preenchida na mesa' },
  ],
  /** Capas dos bônus (vazio = capa provisória desenhada). */
  bonus: ['/img/bonus/bonus-1.webp', '/img/bonus/bonus-2.webp', '/img/bonus/bonus-3.webp', '/img/bonus/bonus-4.webp'] as string[],
  /**
   * Prints de depoimentos reais (WhatsApp/Instagram). Enquanto estiver vazio, a seção mostra espaços reservados.
   * Use só depoimentos reais com autorização: depoimento inventado é propaganda enganosa e motivo de bloqueio na Meta.
   */
  depoimentos: [] as { img: string; w: number; h: number }[],
};


/**
 * CONTEÚDO DE EXEMPLO (criadora e depoimentos fictícios) para validar o layout.
 * Ligado por padrão (aparece na página para você validar). No /admin dá para esconder no seu navegador.
 * ANTES DE RODAR ANÚNCIOS: NEXT_PUBLIC_MODO_TESTE=0 na Vercel tira tudo do site.
 */
export const modoTeste = process.env.NEXT_PUBLIC_MODO_TESTE !== '0';

/** true quando a seção "quem criou" tiver dados reais (aí ela aparece para todos). */
export const criadoraReal = false;

/**
 * Prova social ("milhares de pessoas"). Só aparece com o modo teste ligado enquanto `real` for false.
 * Antes de rodar anúncios, coloque o número verdadeiro e marque `real: true` (ou deixe false para esconder).
 */
export const provaSocial = { real: false, pessoas: '12 mil', nota: '4,9' };

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

/**
 * Depoimentos fictícios para validar o layout (só aparecem no modo teste).
 * Trechos entre **asteriscos** ficam grifados. Troque pelos reais antes de rodar.
 */
export const depoimentosTeste = [
  {
    nome: 'Juliana Ribeiro',
    info: '34 anos · Campinas, SP',
    avatar: '/img/teste/avatar-1.webp',
    texto:
      'eu deitava e ficava horas pensando em tudo que tinha pra fazer no dia seguinte, em coisa que eu falei errado, sei lá. comecei a fazer aquela página de tirar tudo da cabeça antes de dormir e **tô conseguindo dormir bem mais rápido**. não resolveu minha vida mas ajudou demais',
  },
  {
    nome: 'Fernanda Lopes',
    info: '48 anos · Belo Horizonte, MG',
    avatar: '/img/teste/avatar-2.webp',
    texto: 'Gostei muito, bem simples de usar. Imprimi e deixei na cozinha 😊',
  },
  {
    nome: 'Rafael Souza',
    info: '31 anos · Curitiba, PR',
    avatar: '/img/teste/avatar-3.webp',
    texto:
      'Já comprei umas 4 agendas e larguei todas na segunda semana kkk. Essa é diferente porque não tem data, então quando eu sumo uns dias **não fica aquele monte de página em branco me julgando**. Volto e pronto',
  },
  {
    nome: 'Camila Teixeira',
    info: '24 anos · Recife, PE',
    avatar: '/img/teste/avatar-4.webp',
    texto:
      'trabalho com atendimento e chego em casa com a cabeça explodindo. a página de quando a mente tá acelerada me salva, é rapidinho. **a sensação de sufoco passa** bem mais rápido que antes',
  },
  {
    nome: 'Marcos Vinícius',
    info: '38 anos · São Paulo, SP',
    avatar: '/img/teste/avatar-5.webp',
    texto:
      'comprei pra minha esposa e acabei usando também. eu guardo tudo na cabeça pra não esquecer e aí não consigo prestar atenção em nada, nem nas crianças. separar o que é problema de verdade do que é só preocupação **me deixou bem mais tranquilo de manhã**',
  },
  {
    nome: 'Patrícia Almeida',
    info: '39 anos · Porto Alegre, RS',
    avatar: '/img/teste/avatar-6.webp',
    texto: 'Muito bom, vale cada centavo. Uso no tablet todo dia de manhã',
  },
];
