// Roteiro de cada vídeo de demonstração. Coordenadas em pontos do PDF (página 420 × 596).
// cam: [segundo, zoom, centro x, centro y] · escritas: texto manuscrito revelado · marcas: contorno de destaque.
const PET = '#315F5A', SAL = '#5E8577', TER = '#B5694A';
const preenchido = (pg, ini = -1) => [
  { k: 'd1', pg, x: 44, y: 127, txt: 'pagar a conta de luz', ini, dur: 0.01 },
  { k: 'd2', pg, x: 44, y: 144, txt: 'marcar consulta', ini, dur: 0.01 },
  { k: 'd3', pg, x: 44, y: 161, txt: 'e se eu for mal na reunião amanhã?', ini, dur: 0.01 },
  { k: 'd4', pg, x: 44, y: 178, txt: 'responder a Ana', ini, dur: 0.01 },
];

export const CLIPS = {
  // Página 6 · Método Mente em 3 Lugares: destaca Resolver, Programar e Desocupar
  metodo: {
    dur: 10,
    paginas: [{ src: 'p06', de: 0 }],
    cam: [[0, 1, 210, 298], [1.2, 1, 210, 298], [2.4, 1.3, 196, 210], [9, 1.3, 196, 210], [10, 1.15, 200, 240]],
    marcas: [
      { k: 'r', pg: 0, x: 23, y: 156, w: 114, h: 100, ini: 3, fim: 5, cor: PET },
      { k: 'p', pg: 0, x: 140, y: 156, w: 112, h: 100, ini: 5.2, fim: 7.2, cor: SAL },
      { k: 'd', pg: 0, x: 255, y: 156, w: 114, h: 100, ini: 7.4, fim: 9.6, cor: TER },
    ],
  },
  // Página 21 · Tire tudo da cabeça: passo 1, Despejar
  despejar: {
    dur: 8,
    paginas: [{ src: 'p21', de: 0 }],
    cam: [[0, 1, 210, 298], [1, 1.7, 210, 175], [8, 1.7, 210, 175]],
    escritas: [
      { k: 'd1', pg: 0, x: 44, y: 127, txt: 'pagar a conta de luz', ini: 1.3, dur: 1.4 },
      { k: 'd2', pg: 0, x: 44, y: 144, txt: 'marcar consulta', ini: 3, dur: 1.1 },
      { k: 'd3', pg: 0, x: 44, y: 161, txt: 'e se eu for mal na reunião amanhã?', ini: 4.4, dur: 2 },
      { k: 'd4', pg: 0, x: 44, y: 178, txt: 'responder a Ana', ini: 6.6, dur: 1.1 },
    ],
  },
  // Página 21 · passo 2, Distribuir (Resolver · Programar · Desocupar)
  distribuir: {
    dur: 15,
    paginas: [{ src: 'p21', de: 0 }],
    cam: [[0, 1.2, 210, 300], [1.2, 1.2, 210, 330], [2.2, 1.9, 80, 365], [5.6, 1.9, 80, 365], [6.4, 1.9, 196, 365], [9.6, 1.9, 196, 365], [10.4, 1.9, 312, 365], [13.8, 1.9, 312, 365], [15, 1.2, 210, 330]],
    escritas: [
      ...preenchido(0),
      { k: 'r1', pg: 0, x: 46, y: 314, txt: 'pagar a luz', ini: 2.8, dur: 1.2, t: 11 },
      { k: 'p1', pg: 0, x: 163, y: 314, txt: 'consulta → quinta', ini: 6.8, dur: 1.4, t: 11 },
      { k: 'x1', pg: 0, x: 279, y: 324, txt: 'e se eu for mal', ini: 10.8, dur: 1.1, t: 11 },
      { k: 'x2', pg: 0, x: 279, y: 339, txt: 'na reunião?', ini: 12, dur: 0.9, t: 11 },
    ],
    marcas: [
      { k: 'r', pg: 0, x: 23, y: 285, w: 114, h: 168, ini: 2.4, fim: 5.8, cor: PET },
      { k: 'p', pg: 0, x: 140, y: 285, w: 112, h: 168, ini: 6.4, fim: 9.8, cor: SAL },
      { k: 'd', pg: 0, x: 255, y: 285, w: 114, h: 168, ini: 10.4, fim: 14, cor: TER },
    ],
  },
  // Página 21 · passo 3, Definir: a primeira ação
  definir: {
    dur: 5,
    paginas: [{ src: 'p21', de: 0 }],
    cam: [[0, 1.2, 210, 330], [0.9, 1.85, 175, 495], [5, 1.85, 175, 495]],
    escritas: [
      ...preenchido(0),
      { k: 'r1', pg: 0, x: 46, y: 314, txt: 'pagar a luz', ini: -1, dur: 0.01, t: 11 },
      { k: 'p1', pg: 0, x: 163, y: 314, txt: 'consulta → quinta', ini: -1, dur: 0.01, t: 11 },
      { k: 'x1', pg: 0, x: 279, y: 324, txt: 'e se eu for mal', ini: -1, dur: 0.01, t: 11 },
      { k: 'x2', pg: 0, x: 279, y: 339, txt: 'na reunião?', ini: -1, dur: 0.01, t: 11 },
      { k: 'a1', pg: 0, x: 142, y: 488, txt: 'pagar a luz pelo app do banco', ini: 1.2, dur: 2.2, t: 12 },
      { k: 'a2', pg: 0, x: 84, y: 508, txt: 'agora, 19h', ini: 3.7, dur: 0.8, t: 12 },
    ],
  },
  // Páginas em sequência: capa → preocupações → mês → dia → jornada → capa
  paginas: {
    dur: 9,
    paginas: [{ src: 'p01', de: 0 }, { src: 'p20', de: 1.5, trans: 0.45 }, { src: 'p12', de: 3, trans: 0.45 }, { src: 'p22', de: 4.5, trans: 0.45 }, { src: 'p18', de: 6, trans: 0.45 }, { src: 'p01', de: 7.5, trans: 0.45 }],
    cam: [[0, 1, 210, 298], [9, 1.05, 210, 298]],
  },
  // Criativo 02 · preocupações da noite no "Tire tudo da cabeça" e a distribuição
  noite: {
    dur: 11,
    paginas: [{ src: 'p21', de: 0 }],
    cam: [[0, 1, 210, 298], [0.8, 1.7, 210, 175], [7, 1.7, 210, 175], [7.8, 1.2, 210, 300], [11, 1.2, 210, 300]],
    escritas: [
      { k: 'n1', pg: 0, x: 44, y: 127, txt: 'e aquela reunião amanhã?', ini: 1, dur: 1.4 },
      { k: 'n2', pg: 0, x: 44, y: 144, txt: 'pagar aquela conta', ini: 2.6, dur: 1.2 },
      { k: 'n3', pg: 0, x: 44, y: 161, txt: 'e se não der certo?', ini: 4, dur: 1.2 },
      { k: 'n4', pg: 0, x: 44, y: 178, txt: 'será que esqueci alguma coisa?', ini: 5.4, dur: 1.5 },
      { k: 'r1', pg: 0, x: 46, y: 314, txt: 'pagar a conta', ini: 8, dur: 0.8, t: 11 },
      { k: 'p1', pg: 0, x: 163, y: 314, txt: 'reunião → 8h', ini: 8.9, dur: 0.8, t: 11 },
      { k: 'x1', pg: 0, x: 279, y: 324, txt: 'e se não der', ini: 9.8, dur: 0.6, t: 11 },
      { k: 'x2', pg: 0, x: 279, y: 339, txt: 'certo?', ini: 10.4, dur: 0.4, t: 11 },
    ],
  },
  // Criativo 05 · Meu mês preenchido para janeiro de 2027
  meumes: {
    dur: 8,
    paginas: [{ src: 'p12', de: 0 }],
    cam: [[0, 1, 210, 298], [0.8, 1.55, 160, 150], [3.6, 1.55, 160, 150], [4.4, 1.55, 160, 245], [8, 1.55, 160, 245]],
    escritas: [
      { k: 'm', pg: 0, x: 47, y: 81, txt: 'Janeiro', ini: 1, dur: 0.8, t: 14 },
      { k: 'a', pg: 0, x: 220, y: 81, txt: '2027', ini: 1.9, dur: 0.6, t: 14 },
      { k: 'f', pg: 0, x: 40, y: 124, txt: 'começar o ano mais leve', ini: 2.6, dur: 1.4, t: 14, cor: '#ffffff' },
      { k: 'o1', pg: 0, x: 56, y: 196, txt: 'usar o método 10 min por dia', ini: 4.6, dur: 1.2, t: 11.5 },
      { k: 'o2', pg: 0, x: 56, y: 231, txt: 'caminhar 2x por semana', ini: 5.9, dur: 1, t: 11.5 },
      { k: 'o3', pg: 0, x: 56, y: 265, txt: 'organizar as contas', ini: 7, dur: 0.9, t: 11.5 },
    ],
  },
  // Criativo 01 · Organizador de preocupações → Meu dia sem sobrecarga
  dia: {
    dur: 10,
    paginas: [{ src: 'p20', de: 0 }, { src: 'p22', de: 5, trans: 0.5 }],
    cam: [[0, 1, 210, 298], [4.6, 1.3, 210, 230], [5, 1, 210, 298], [10, 1.3, 210, 230]],
  },
  // Capa com aproximação lenta (para cenas de tablet e tela final)
  capa: {
    dur: 4,
    paginas: [{ src: 'p01', de: 0 }],
    cam: [[0, 1, 210, 298], [4, 1.07, 210, 260]],
  },
};
