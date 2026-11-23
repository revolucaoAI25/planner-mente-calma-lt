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
