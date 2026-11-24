/**
 * Arquivos entregues por e-mail depois da compra.
 *
 * Os PDFs são gerados por `node planner/build.mjs` e copiados para `public/<PASTA>`.
 * Alternativa: hospede os PDFs em outro lugar (Drive, Vercel Blob…) e preencha `url` de cada arquivo
 * ou a variável ENTREGA_BASE_URL (pasta com os mesmos nomes de arquivo).
 */
export const PASTA = 'a-c26442da364c919f4820c798';

export type Grupo = 'comece' | 'tablet' | 'imprimir' | 'bonus' | 'extra';

export type Arquivo = {
  id: string;
  grupo: Grupo;
  titulo: string;
  desc: string;
  arquivo: string;
  /** Link externo (Drive etc.). Vazio = usa a pasta do site. */
  url?: string;
  /** Arquivo de order bump: só abre para quem comprou aquele bump. */
  bump?: string;
};

export const ARQUIVOS: Arquivo[] = [
  { id: 'guia', grupo: 'comece', titulo: 'Leia primeiro: guia de impressão e uso no tablet', desc: 'Qual arquivo usar, como imprimir e como abrir no seu app.', arquivo: 'LEIA PRIMEIRO - Guia de impressao e uso no tablet.pdf' },
  { id: 'tablet', grupo: 'tablet', titulo: 'Planner completo para tablet', desc: 'Abas e índice clicáveis, Jornada de 30 dias. GoodNotes, Notability, Samsung Notes, Xodo…', arquivo: 'Planner Mente Calma - TABLET (abas clicaveis).pdf' },
  { id: 'a4', grupo: 'imprimir', titulo: 'Planner para imprimir em casa (A4, 2 páginas por folha)', desc: 'Imprima frente e verso, corte ao meio e empilhe.', arquivo: 'Planner Mente Calma - A4 2 por folha (frente e verso, cortar ao meio).pdf' },
  { id: 'a5', grupo: 'imprimir', titulo: 'Planner em A5 (gráfica ou impressora A5)', desc: 'Para levar à gráfica/copiadora e encadernar em espiral.', arquivo: 'Planner Mente Calma - A5 (grafica ou impressora A5).pdf' },
  { id: 'refis', grupo: 'imprimir', titulo: 'Refis: páginas do dia a dia', desc: 'As páginas que você mais usa, 2 cópias por folha A4.', arquivo: 'Refis - paginas do dia a dia (A4, 2 copias por folha).pdf' },
  { id: 'teste', grupo: 'imprimir', titulo: 'Teste de impressão frente e verso', desc: '1 folha para acertar a impressora antes de imprimir tudo.', arquivo: 'Teste de impressao frente e verso (1 folha).pdf' },
  ...(
    [
      ['b1', 'Bônus 1 · SOS Mente Acelerada', 'Bonus 1 - SOS Mente Acelerada'],
      ['b2', 'Bônus 2 · Desligando a Cabeça Antes de Dormir', 'Bonus 2 - Desligando a Cabeca Antes de Dormir'],
      ['b3', 'Bônus 3 · Diário da Ansiedade', 'Bonus 3 - Diario da Ansiedade'],
      ['b4', 'Bônus 4 · Kit Rotina Sem Sobrecarga', 'Bonus 4 - Kit Rotina Sem Sobrecarga'],
    ] as const
  ).flatMap(([id, titulo, base]) => [
    { id: `${id}-tablet`, grupo: 'bonus' as const, titulo, desc: 'Tablet', arquivo: `${base} - TABLET.pdf` },
    { id: `${id}-a4`, grupo: 'bonus' as const, titulo, desc: 'A4 (em casa)', arquivo:`${base} - A4 2 por folha (frente e verso, cortar ao meio).pdf` },
    { id: `${id}-a5`, grupo: 'bonus' as const, titulo, desc: 'A5 (gráfica)', arquivo: `${base} - A5 (grafica ou impressora A5).pdf` },
  ]),
  ...(
    [
      ['tela', 'Menos Tela, Menos Ansiedade', 'Extra - Menos Tela Menos Ansiedade'],
      ['casa', 'Casa em Ordem, Mente Mais Leve', 'Extra - Casa em Ordem Mente Mais Leve'],
      ['rotinas', 'Rotinas Prontas para Mentes Ansiosas', 'Extra - Rotinas Prontas para Mentes Ansiosas'],
    ] as const
  ).flatMap(([bump, titulo, base]) => [
    { id: `x-${bump}-tablet`, grupo: 'extra' as const, bump, titulo, desc: 'Tablet', arquivo: `${base} - TABLET.pdf` },
    { id: `x-${bump}-a4`, grupo: 'extra' as const, bump, titulo, desc: 'A4 (em casa)', arquivo: `${base} - A4 2 por folha (frente e verso, cortar ao meio).pdf` },
    { id: `x-${bump}-a5`, grupo: 'extra' as const, bump, titulo, desc: 'A5 (gráfica)', arquivo: `${base} - A5 (grafica ou impressora A5).pdf` },
  ]),
];

/**
 * Order bumps (nomes exatamente como na Kiwify). A Kiwify registra cada bump como uma compra à parte:
 * o site manda o e-mail com o material e repassa a venda para a Utmify (a Utmify não recebe bump pelo webhook dela).
 * `chaves`: trechos do nome do produto que identificam o bump (sem acento, minúsculas).
 * `inclui`: o combo libera os materiais dos outros bumps.
 * Para entregar, acrescente em ARQUIVOS itens com `grupo: 'extra'` e `bump: '<id>'`.
 */
export const BUMPS: { id: string; nome: string; chaves: string[]; inclui?: string[] }[] = [
  { id: 'combo', nome: 'Combo Rotina Mais Leve — 3 Materiais em 1', chaves: ['combo rotina mais leve', '3 materiais em 1'], inclui: ['tela', 'casa', 'rotinas'] },
  { id: 'tela', nome: 'Menos Tela, Menos Ansiedade', chaves: ['menos tela'] },
  { id: 'casa', nome: 'Casa em Ordem, Mente Mais Leve', chaves: ['casa em ordem'] },
  { id: 'rotinas', nome: 'Rotinas Prontas para Mentes Ansiosas', chaves: ['rotinas prontas'] },
];
/** Nome do produto principal na Kiwify. */
export const PRODUTO_PRINCIPAL = 'Planner Mente Calma';

const norm = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
/** Qual bump é este produto (pelo nome que veio da Kiwify)? */
export const bumpDoProduto = (nome: string) => BUMPS.find((b) => b.chaves.some((k) => norm(nome).includes(norm(k))));
/** Arquivos liberados por um bump (o combo libera os dos 3 materiais). */
export const bumpsLiberados = (ids: string[] = []) => [...new Set(ids.flatMap((id) => [id, ...(BUMPS.find((b) => b.id === id)?.inclui ?? [])]))];
export const arquivosDoBump = (id: string) => {
  const ids = bumpsLiberados([id]);
  return ARQUIVOS.filter((a) => a.bump && ids.includes(a.bump));
};
/** O link de acesso libera este arquivo? (arquivos de bump só para quem comprou o bump) */
export const podeBaixar = (a: Arquivo, bumps: string[] = []) => !a.bump || bumpsLiberados(bumps).includes(a.bump);

export const GRUPOS: Record<Grupo, { titulo: string; desc: string }> = {
  comece: { titulo: 'Comece por aqui', desc: '' },
  tablet: { titulo: 'Para usar no tablet ou celular', desc: 'O planner completo, com abas clicáveis.' },
  imprimir: { titulo: 'Para imprimir', desc: 'Escolha um formato: A4 (em casa) ou A5 (gráfica).' },
  bonus: { titulo: 'Seus 4 bônus', desc: 'Cada bônus em um arquivo próprio: escolha tablet, A4 ou A5.' },
  extra: { titulo: 'Seus materiais extras', desc: 'Os materiais que você acrescentou na compra.' },
};

export function urlArquivo(a: Arquivo, site: string): string {
  if (a.url) return a.url;
  const base = process.env.ENTREGA_BASE_URL?.replace(/\/$/, '') || `${site}/${PASTA}`;
  return `${base}/${encodeURIComponent(a.arquivo)}`;
}
