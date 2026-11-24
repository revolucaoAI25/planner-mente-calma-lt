// Conteúdo de todas as páginas do Planner Mente Calma e dos 4 bônus.
import { C, ic, mark, ondas, fill, dots, linhas, box, escala, chk, chkLinha, campo, hand, chip } from './ui.mjs';

/* ---------------- Temas de cor (paleta pastel estendida) ---------------- */
export const TEMAS = {
  brand: { sbg: '#EAF1EC', stx: '#315F5A', tbg: '#F6E6DC', ttx: '#B5694A', p: '#315F5A', ln: '#A8BDB0' },
  azul: { sbg: '#E2EDF6', stx: '#36678A', tbg: '#F8E3E6', ttx: '#AE5468', p: '#36678A', ln: '#A9C4DA' },
  lav: { sbg: '#ECE8F6', stx: '#5B4E8C', tbg: '#FBEFD6', ttx: '#9C7226', p: '#5B4E8C', ln: '#BEB4DE' },
  rosa: { sbg: '#F8E3E6', stx: '#A54C64', tbg: '#ECE8F6', ttx: '#5B4E8C', p: '#A54C64', ln: '#E2B5C0' },
  mant: { sbg: '#FBF0D4', stx: '#87651B', tbg: '#E2EDF6', ttx: '#36678A', p: '#87651B', ln: '#E6CF95' },
};
/** Cor de cada semana da jornada (índice 0..3 = semanas 1..4, 4 = dias 29 e 30). */
export const TEMA_SEMANA = ['brand', 'azul', 'lav', 'rosa', 'mant'];

/* ---------------- Seções (abas do tablet) ---------------- */
export const SECOES = {
  inicio: { nome: 'Início', cor: TEMAS.brand.p, tema: 'brand'},
  metodo: { nome: 'Método', cor: TEMAS.brand.p, tema: 'brand'},
  dia: { nome: '30 dias', cor: TEMAS.brand.p, tema: 'brand'},
  semana: { nome: 'Semana', cor: TEMAS.azul.p, tema: 'azul'},
  mes: { nome: 'Mês', cor: TEMAS.lav.p, tema: 'lav'},
  preoc: { nome: 'Preocupações', cor: TEMAS.rosa.p, tema: 'rosa'},
  habitos: { nome: 'Hábitos', cor: TEMAS.mant.p, tema: 'mant'},
  financas: { nome: 'Finanças', cor: TEMAS.azul.p, tema: 'azul'},
  recomeco: { nome: 'Recomeço', cor: TEMAS.lav.p, tema: 'lav'},
  notas: { nome: 'Notas', cor: TEMAS.brand.p, tema: 'brand'},
  b1: { nome: 'SOS', cor: TEMAS.rosa.p, tema: 'rosa', bonus: true },
  b2: { nome: 'Noite', cor: TEMAS.lav.p, tema: 'lav', bonus: true },
  b3: { nome: 'Diário', cor: TEMAS.azul.p, tema: 'azul', bonus: true },
  b4: { nome: 'Rotina', cor: TEMAS.mant.p, tema: 'mant', bonus: true },
  e1: { nome: 'Menos Tela', cor: TEMAS.azul.p, tema: 'azul', bonus: true, mantras: ['Você escolhe quando usar.', 'Presença vale mais que o feed.', 'A vontade sobe e desce. Deixe passar.', 'Menos tela, mais vida.', 'Nada de importante some em 10 minutos.'] },
  e2: { nome: 'Casa em Ordem', cor: TEMAS.mant.p, tema: 'mant', bonus: true, mantras: ['Pouco e sempre.', 'Feito é melhor que perfeito.', 'Uma superfície de cada vez.', 'Casa leve, cabeça leve.', 'Cada coisa no seu lugar, inclusive a culpa: fora.'] },
  e3: { nome: 'Rotinas Prontas', cor: TEMAS.lav.p, tema: 'lav', bonus: true, mantras: ['A versão mínima também conta.', 'Previsível é tranquilo.', 'Um passo depois do outro.', 'Falhou um dia? Siga no próximo.', 'Rotina é carinho com a sua mente.'] },
};

const MANTRAS = [
  'Um passo de cada vez.', 'Feito é melhor que perfeito.', 'Está no papel. Pode soltar.', 'Você não precisa dar conta de tudo hoje.',
  'Respira. Uma coisa de cada vez.', 'O que é seu hoje é só o próximo passo.', 'Menos peso na mente, mais clareza no dia.',
];
export const mantra = (i) => MANTRAS[i % MANTRAS.length];

/* ---------------- Peças reutilizadas ---------------- */
const handLines = (arr, h = 6.6) => arr.map((t) => `<i style="display:flex;align-items:flex-end;height:${h}mm"><span class="hand" style="padding-bottom:.4mm">${t}</span></i>`).join('');
const hl = (arr, h = 6.6) => `<div class="lns" style="--lh:${h}mm">${handLines(arr, h)}</div>`;

const LUGAR = {
  resolver: { nome: 'Resolver', icon: 'SquareCheck', cor: 'sal', d: 'depende de mim · pede ação' },
  programar: { nome: 'Programar', icon: 'CalendarDays', cor: 'line', d: 'pode esperar · ganha data' },
  desocupar: { nome: 'Desocupar', icon: 'Wind', cor: 'ter', d: 'só antecipando · registro e solto' },
};

const lugarCol = (k, conteudo) => {
  const l = LUGAR[k];
  return `<div class="box ${l.cor === 'line' ? 'b-line fx-line' : 'fx-' + l.cor}" style="padding:2.2mm 2.2mm 2.4mm">
    <div class="bt" style="font-size:6.4pt;letter-spacing:.1em"><span class="bi">${ic(l.icon, 10)}</span>${l.nome}</div>
    <p class="mini it" style="margin-top:.6mm">${l.d}</p>
    ${conteudo}
  </div>`;
};

/** Página-mãe do método. ex = dados de exemplo (escritos à mão). */
export const paginaMetodo = (ex) => `
  <div class="row" style="align-items:center;justify-content:space-between;flex:0 0 auto">
    ${escala('Ansiedade agora', 0, 10, ['', ''], ex ? ex.antes : -1)}
  </div>
  ${box({ num: '1', t: 'Despejar', s: '3 min · tudo o que está na cabeça, sem filtro e sem ordem', cor: 'cre', cls: 'grow', style: 'flex:1.05', body: ex ? `${hl(ex.despejar)}${fill()}` : fill() })}
  <div style="flex:1.45;display:flex;flex-direction:column;gap:1.6mm;min-height:0">
    <div class="bt" style="padding-left:1mm"><span class="num">2</span><span>Distribuir</span><em>5 min · leve cada item para um dos 3 lugares</em></div>
    <div class="g3" style="flex:1;min-height:0">
      ${['resolver', 'programar', 'desocupar'].map((k) => lugarCol(k, ex ? `${hl(ex[k], 6.2)}${fill(6.2)}` : fill(6.2))).join('')}
    </div>
  </div>
  ${box({ num: '3', t: 'Definir', s: '2 min · uma ação pequena, para hoje', cor: 'dash', style: 'flex:0 0 auto', body: `
    <div style="display:flex;gap:3mm;align-items:flex-end;margin-top:1.2mm">
      <span class="lbl" style="white-space:nowrap">Minha primeira ação:</span>
      <span style="flex:1;border-bottom:.25mm solid ${C.gra}55;height:5.6mm;display:flex;align-items:flex-end">${ex ? hand(ex.acao) : ''}</span>
    </div>
    <div style="display:flex;gap:3mm;align-items:flex-end;margin-top:1.6mm">
      <span class="lbl">Quando:</span><span style="width:22mm;border-bottom:.25mm solid ${C.gra}55;height:5.6mm;display:flex;align-items:flex-end">${ex ? hand(ex.quando) : ''}</span>
      <span class="chk" style="margin-left:auto;min-height:0">${ex ? `<span class="cb" style="display:grid;place-items:center;color:#2F5D8A">${ic('Check', 9, '#2F5D8A', 3)}</span>` : '<span class="cb"></span>'}<span class="mini">feito</span></span>
    </div>` })}
  <div class="row" style="align-items:center;flex:0 0 auto">
    ${escala('Ansiedade depois', 0, 10, ['', ''], ex ? ex.depois : -1)}
  </div>`;

const paginaDia = () => `
  <div class="row" style="align-items:center;flex:0 0 auto;justify-content:space-between">
    <span class="lbl">Como estou chegando hoje</span>
    <span style="display:flex;gap:1.4mm">${['leve', 'ok', 'pesado', 'difícil'].map((t) => `<span class="chip c-cre" style="font-weight:600;letter-spacing:.04em;text-transform:none;font-size:6.6pt;display:inline-flex;align-items:center;gap:1mm"><span class="cb" style="width:2.6mm;height:2.6mm;border-radius:50%"></span>${t}</span>`).join('')}</span>
  </div>
  ${box({ icon: 'Star', t: 'Minhas 3 prioridades', s: 'só 3. o resto pode esperar', cor: 'sal', style: 'flex:0 0 auto', body: `<div style="margin-top:.8mm">${chkLinha(3)}</div>` })}
  ${box({ icon: 'Footprints', t: 'Primeiro passo', s: 'tão pequeno que dá para começar agora', cor: 'dash', style: 'flex:0 0 auto', body: linhas(1) })}
  <div class="row" style="flex:1;min-height:0">
    ${box({ icon: 'Clock', t: 'Compromissos com hora', cor: 'white', body: fill(6.4, 'hora') })}
    <div class="col" style="min-height:0">
      ${box({ icon: 'ListPlus', t: 'Se sobrar tempo', cor: 'cre', cls: 'grow', body: fill(6.4) })}
      ${box({ icon: 'Coffee', t: 'Pausas', s: 'sem culpa', cor: 'ter', style: 'flex:0 0 auto', body: `<div class="g2" style="gap:0 2mm;margin-top:.8mm">${['água', 'respirar', 'comer bem', 'mexer-se', 'sem tela', 'ar livre'].map((t) => chk(t)).join('')}</div>` })}
    </div>
  </div>
  ${box({ icon: 'ArrowRightCircle', t: 'Pode ficar para amanhã', s: 'e está tudo bem', cor: 'cre', style: 'flex:0 0 auto', body: linhas(2) })}
  <div class="row" style="flex:0 0 auto;align-items:stretch">
    ${box({ icon: 'Heart', t: 'Uma coisa que deu certo hoje', cor: 'sal', style: 'flex:1.5', body: linhas(1) })}
    <div class="box b-pet" style="justify-content:center;align-items:center;text-align:center;flex:1"><p style="font-family:Mont;font-weight:700;font-size:8pt;line-height:1.25">Fiz o possível hoje.</p><p class="it" style="font-size:7pt;opacity:.8">O resto vai para amanhã.</p></div>
  </div>`;

const semanaDias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const paginaSemana = () => `
  <div class="g2" style="flex:1;min-height:0;grid-template-rows:repeat(4,1fr)">
    <div class="box b-pet"><div class="bt">${ic('Target', 11)}<span>Foco da semana</span></div><p class="mini it" style="color:${C.cre}b3;margin-top:.4mm">uma coisa só, que faria a semana valer</p>${fill(6)}</div>
    ${semanaDias.map((d, i) => `<div class="box ${i > 4 ? 'b-ter' : i % 2 ? 'b-cre' : 'b-sal'}" style="padding:2.2mm 2.6mm">
      <div class="bt" style="justify-content:space-between"><span>${d}</span><span style="display:flex;gap:.6mm;align-items:flex-end;color:${C.gra}55;font-weight:600"><i style="display:inline-block;width:4.4mm;border-bottom:.25mm solid ${C.gra}44;height:3mm"></i>/<i style="display:inline-block;width:4.4mm;border-bottom:.25mm solid ${C.gra}44;height:3mm"></i></span></div>
      ${fill(6)}
    </div>`).join('')}
  </div>
  <div class="row" style="flex:0 0 auto">
    ${box({ icon: 'Receipt', t: 'Contas e prazos', cor: 'white', body: chkLinha(3) })}
    ${box({ icon: 'Hourglass', t: 'Pode esperar', cor: 'white', body: chkLinha(3) })}
  </div>`;

const paginaRevisao = () => `
  ${box({ icon: 'Activity', t: 'Como foi a minha ansiedade', s: 'marque um ponto por dia e ligue', cor: 'white', style: 'flex:0 0 auto', body: grafico7() })}
  <div class="row" style="flex:1;min-height:0">
    ${box({ icon: 'Sparkles', t: 'O que deu certo', cor: 'sal', body: fill() })}
    ${box({ icon: 'Feather', t: 'O que pesou', cor: 'ter', body: fill() })}
  </div>
  ${box({ icon: 'Repeat', t: 'O que mais apareceu no “Desocupar”?', s: 'isso mostra o que a sua mente repete', cor: 'cre', style: 'flex:.8', body: fill() })}
  <div class="row" style="flex:.9;min-height:0">
    ${box({ icon: 'ArrowRight', t: 'Levo para a próxima', cor: 'line', body: fill() })}
    ${box({ icon: 'Wind', t: 'Eu solto', cor: 'line', body: fill() })}
  </div>
  <div class="row" style="flex:0 0 auto;align-items:center">${escala('Nota para a semana, com carinho', 0, 10)}</div>`;

const grafico7 = (h = 30) => {
  const dias = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  return `<div style="display:flex;gap:1.6mm;margin-top:1.4mm;height:${h}mm">
    <div style="display:flex;flex-direction:column;justify-content:space-between;font-size:5.6pt;color:${C.gra}77;font-family:Mont;font-weight:600;padding-bottom:4mm">${[10, 8, 6, 4, 2, 0].map((n) => `<span>${n}</span>`).join('')}</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <div style="flex:1;display:grid;grid-template-columns:repeat(7,1fr);background:repeating-linear-gradient(to bottom, var(--s-bg) 0, var(--s-bg) .25mm, transparent .25mm, transparent calc((100% - .25mm)/5));border-bottom:.3mm solid var(--ln)">
        ${dias.map(() => `<div style="border-left:.25mm dashed ${C.gra}22"></div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);font-family:Mont;font-weight:700;font-size:6pt;color:var(--p);margin-top:.8mm">${dias.map((d) => `<span style="padding-left:.6mm">${d}</span>`).join('')}</div>
    </div>
  </div>`;
};

/* ---------------- Capa e páginas especiais ---------------- */
export const capa = ({ titulo = 'mente calma', topo = 'PLANNER', tag = 'Organize seus pensamentos, suas prioridades e sua rotina em um só lugar.', selo = '', ordem, sub = 'Método Mente em 3 Lugares' }) => `
<div style="position:absolute;inset:0;background:${C.cre}">
  <div style="position:absolute;left:0;right:0;top:19%;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 14mm">
    ${selo ? `<span class="chip c-ter" style="margin-bottom:5mm;font-size:6.6pt;padding:1mm 3.2mm">${selo}</span>` : ''}
    ${mark(selo ? 62 : 78)}
    <p style="font-family:Mont;font-weight:600;font-size:${selo ? 7.5 : 9}pt;letter-spacing:.55em;color:var(--p);margin-top:${selo ? 5 : 7}mm;padding-left:.55em">${topo}</p>
    <p style="font-family:Mont;font-weight:700;font-size:${selo ? 25 : 34}pt;line-height:1.02;letter-spacing:-.02em;color:${C.petEsc};margin-top:1.2mm">${titulo}</p>
    <p class="it" style="font-size:9pt;line-height:1.45;color:${C.gra}cc;margin-top:5mm;max-width:80mm">${tag}</p>
    <span style="display:block;width:14mm;height:.5mm;background:${C.ter};border-radius:1mm;margin-top:5mm"></span>
    <p style="font-family:Mont;font-weight:700;font-size:6.2pt;letter-spacing:.28em;color:${C.pet}99;margin-top:4mm;text-transform:uppercase">${sub}</p>
  </div>
  ${ondas(ordem)}
</div>`;

/* ---------------- Definição das páginas ----------------
   Cada página: { key, sec, eb, t, sub, data, body(ctx), raw (sem cabeçalho), so: 'dig'|'imp' } */

export function planner(modo) {
  const P = [];
  const add = (p) => P.push(p);

  const T0 = {};
  const reg0 = (p) => (T0[p.key] = p);
  // CAPA
  add({ key: 'capa', sec: 'inicio', raw: () => capa({}) });
  // VERSO DA CAPA
  add({
    key: 'pertence', sec: 'inicio', raw: () => `
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0 20mm;text-align:center">
      ${mark(40)}
      <p class="lbl" style="margin-top:8mm">Este planner pertence a</p>
      <div style="width:90mm;border-bottom:.3mm solid ${C.gra}55;height:11mm"></div>
      <p class="lbl" style="margin-top:8mm">Comecei em</p>
      <div style="display:flex;gap:2mm;align-items:flex-end;margin-top:1mm;font-family:Mont;color:${C.gra}66"><i style="display:inline-block;width:10mm;border-bottom:.3mm solid ${C.gra}55;height:7mm"></i>/<i style="display:inline-block;width:10mm;border-bottom:.3mm solid ${C.gra}55;height:7mm"></i>/<i style="display:inline-block;width:14mm;border-bottom:.3mm solid ${C.gra}55;height:7mm"></i></div>
      <p class="quote" style="margin-top:14mm;max-width:85mm;font-size:10pt">“Você não precisa guardar tudo na cabeça. Só precisa de um lugar para colocar.”</p>
      <div class="box b-cre" style="margin-top:16mm;max-width:100mm;text-align:left;flex-direction:row;gap:2.6mm;align-items:flex-start">
        <span style="color:var(--t-tx);flex-shrink:0;margin-top:.4mm">${ic('HeartHandshake', 14)}</span>
        <p class="mini" style="font-size:6.8pt">Este planner é uma ferramenta de organização pessoal e não substitui acompanhamento psicológico ou médico. Se a ansiedade estiver forte demais ou você pensar em se machucar, procure ajuda: <b>CVV, ligue 188</b> (gratuito, 24h) ou um serviço de saúde.</p>
      </div>
    </div>`,
  });

  add({
    key: 'boasvindas', sp: true, sec: 'inicio', eb: 'Boas-vindas', t: 'Que bom que <span class="gr">você chegou</span>.', body: () => `
    <p class="tx">Se você está com este planner nas mãos, provavelmente conhece bem a sensação: a cabeça cheia, tudo parecendo urgente, preocupações que não deixam dormir e aquele cansaço de quem passou o dia pensando em tudo ao mesmo tempo.</p>
    <p class="tx">Este planner <b>não foi feito para você produzir mais</b>. Ele foi feito para tirar peso da sua cabeça. Uma agenda comum organiza o seu dia. O Mente Calma vai um passo antes: <b>organiza o que está ocupando a sua mente</b>, para que o dia fique possível.</p>
    <p class="tx">Aqui não existe página atrasada, dia perdido ou jeito errado de preencher. Existe um lugar seguro para colocar o que pesa, separar o que é seu do que é só preocupação e escolher <b>um próximo passo</b>.</p>
    <div class="box b-sal" style="margin-top:1.4mm">
      <div class="bt">${ic('Handshake', 11)}<span>3 combinados com você</span></div>
      <div style="display:flex;flex-direction:column;gap:2mm;margin-top:2.2mm">
        ${[
          ['Feito é melhor que bonito.', 'Rabisque, risque, erre, escreva torto. A página é sua, não é vitrine.'],
          ['Pulou dias? Não volte para trás.', 'Você não precisa preencher o que ficou. Vá para a Página de Recomeço e siga dali.'],
          ['10 minutos bastam.', 'Se virar mais uma cobrança, faça menos. O planner existe para aliviar, não para pesar.'],
        ].map(([a, b], i) => `<div style="display:flex;gap:2.4mm"><span class="num" style="flex-shrink:0">${i + 1}</span><p style="font-size:8pt;line-height:1.42"><b>${a}</b> ${b}</p></div>`).join('')}
      </div>
    </div>
    <div class="box b-cre"><div class="bt">${ic('Sprout', 11)}<span>O que costuma mudar com o uso</span></div>
      <div class="g2" style="gap:1.4mm 4mm;margin-top:2mm">${['deitar com a cabeça mais leve', 'saber por onde começar o dia', 'separar problema real de preocupação', 'recomeçar sem culpa depois de um dia ruim'].map((t) => `<p style="display:flex;gap:1.6mm;font-size:7.9pt;line-height:1.3">${ic('Check', 10, C.terEsc, 3)}<span>${t}</span></p>`).join('')}</div>
    </div>
    <div style="display:flex;align-items:center;gap:3mm">
      ${mark(26)}
      <p class="it" style="font-size:8.4pt;color:${C.gra}bb">Leve o tempo que precisar. Comece pequeno.<br>E volte sempre que a cabeça encher.<br><b style="font-style:normal;color:var(--p)">Com carinho, equipe Planner Mente Calma</b></p>
    </div>`,
  });

  add({
    key: 'comousar', sec: 'inicio', eb: 'Antes de começar', t: 'Como usar o seu planner', body: () => `
    <div class="g3" style="flex:0 0 auto">
      ${[
        ['Printer', 'Imprimir em A5', 'Arquivo “A5”. Em gráfica ou em impressora com papel A5. Encaderne com espiral ou use em fichário.'],
        ['Scissors', 'A4 cortada ao meio', 'Arquivo “A4 · 2 por folha”. Imprima frente e verso, corte ao meio e empilhe. Instruções no guia.'],
        ['Tablet', 'No tablet', 'Arquivo “Tablet”. Abas clicáveis. Funciona no GoodNotes, Notability, Samsung Notes, Noteshelf, Xodo e outros.'],
      ].map(([i, t, d]) => `<div class="box b-cre" style="padding:2.6mm"><span class="bi" style="background:var(--p);color:#fff;width:6mm;height:6mm">${ic(i, 12)}</span><p class="h2" style="font-size:8.2pt;margin-top:1.6mm">${t}</p><p class="mini" style="margin-top:.8mm;font-size:6.6pt">${d}</p></div>`).join('')}
    </div>
    ${box({ icon: 'PenLine', t: 'Como preencher', cor: 'sal', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:1.2mm;margin-top:1.4mm;font-size:7.6pt;line-height:1.42">
      <p><b>À caneta mesmo.</b> Cada página é usada uma vez. O planner já vem com <b>30 dias prontos</b>: cada dia ocupa uma página dupla, e cada semana abre com o planejamento e fecha com a revisão.</p>
      <p><b>Acabaram os 30 dias?</b> Imprima o arquivo de novo para um novo ciclo, ou só os <b>Refis</b> das páginas que você mais usa. As páginas não têm datas: comece em qualquer dia do ano.</p>
      <p><b>No tablet</b>, escreva com a caneta digital ou o dedo. Para repetir uma página, use “duplicar” no seu app.</p>
    </div>` })}
    ${box({ icon: 'Map', t: 'O caminho mais simples', cor: 'white', cls: 'grow', body: `
      <div style="display:flex;flex-direction:column;justify-content:space-evenly;flex:1;gap:2.2mm;margin-top:2mm">
        ${[
          ['Todo dia, 10 min', 'Mente em 3 Lugares', 'página da esquerda de cada dia'],
          ['Todo dia, 3 min', 'Meu dia sem sobrecarga', 'página da direita de cada dia'],
          ['Uma vez por semana', 'Semana leve + Revisão', 'abrem e fecham cada semana'],
          ['Quando apertar', 'Modo Mente Acelerada', 'uma página só, para os momentos difíceis'],
          ['No começo do mês', 'Meu mês, hábitos e contas', '15 minutos, uma vez por mês'],
          ['Depois de dias difíceis', 'Página de recomeço', 'volte sem culpa'],
        ].map(([q, t, d]) => `<div style="display:flex;gap:2.6mm;align-items:baseline"><span class="lbl" style="width:27mm;flex-shrink:0;color:var(--t-tx)">${q}</span><p style="font-size:7.8pt"><b>${t}</b> <span class="mini it">· ${d}</span></p></div>`).join('')}
      </div>` })}
    ${modo === 'dig' ? box({ icon: 'MousePointerClick', t: 'Dica para tablet', cor: 'ter', style: 'flex:0 0 auto', body: `<p class="mini" style="font-size:7pt;margin-top:.8mm">Toque nas abas à direita para navegar. Para usar uma página de novo, duplique-a no seu app (no GoodNotes: toque no título da página › Duplicar). A <b>Jornada de 30 dias</b> já traz 60 páginas prontas.</p>` }) : box({ icon: 'FileText', t: 'Dica de impressão', cor: 'ter', style: 'flex:0 0 auto', body: `<p class="mini" style="font-size:7pt;margin-top:.8mm">Imprima sempre em <b>tamanho real (100%)</b>, sem “ajustar à página”. Papel 75 g funciona; 90 g deixa a escrita mais gostosa e não marca o verso.</p>` })}`,
  });

  add({
    key: 'indice', sec: 'inicio', anchor: true, eb: 'Índice', t: 'O que tem aqui dentro', body: (x) => {
      const grupos = [
        ['Início', [['Boas-vindas', 'boasvindas'], ['Como usar', 'comousar']]],
        ['O Método', [['Mente em 3 Lugares', 'metodo1'], ['Exemplo preenchido', 'exemplo'], ['Isso vai para onde?', 'fluxo'], ['Perguntas que acalmam', 'perguntas']]],
        ['Antes de começar', [['Meu ponto de partida', 'partida'], ['Sua primeira semana', 'primeirasemana']]],
        ['Começo do mês', [['Meu mês', 'tpl-mes'], ['Calendário sem datas', 'tpl-cal'], ['Hábitos e ansiedade', 'tpl-habitos'], ['Sono e energia', 'tpl-sono'], ['Contas do mês', 'tpl-contas'], ['Meu dinheiro sem susto', 'tpl-dinheiro']]],
        ['Jornada de 30 dias', [['Mapa da jornada', 'jornada'], ['Semana 1 · dias 1 a 7', 's1-plano'], ['Semana 2 · dias 8 a 14', 's2-plano'], ['Semana 3 · dias 15 a 21', 's3-plano'], ['Semana 4 · dias 22 a 28', 's4-plano'], ['Dias 29 e 30', 'd29-m'], ['Minha evolução em 30 dias', 'evolucao']]],
        ['Para quando precisar', [['Modo Mente Acelerada', 'acelerada-1'], ['Horário da preocupação', 'tpl-horario'], ['Menu de autocuidado', 'autocuidado'], ['Página de recomeço', 'recomeco-1']]],
        ['Notas', [['Pautada', 'tpl-pautada'], ['Pontilhada', 'tpl-pontilhada']]],
      ];
      return `<div style="columns:2;column-gap:5mm;flex:1">
        ${grupos.map(([g, it]) => `<div style="break-inside:avoid;margin-bottom:4.4mm">
          <p class="lbl" style="color:var(--t-tx);margin-bottom:1mm">${g}</p>
          ${it.map(([n, k]) => `<a href="#p-${k}" style="display:flex;align-items:baseline;gap:1mm;font-size:8.5pt;padding:1.25mm 0;border-bottom:.25mm dotted ${C.gra}33"><span>${n}</span><span style="flex:1"></span><b style="font-family:Mont;font-size:7pt;color:var(--p)">${modo === 'dig' ? '›' : x.pn(k)}</b></a>`).join('')}
        </div>`).join('')}
        ${false ? `<div style="break-inside:avoid;margin-bottom:3mm">
          <p class="lbl" style="color:var(--t-tx);margin-bottom:1mm">Bônus</p>
          ${[['SOS Mente Acelerada', 'b1-capa'], ['Desligando a Cabeça', 'b2-capa'], ['Diário da Ansiedade', 'b3-capa'], ['Kit Rotina Sem Sobrecarga', 'b4-capa']].map(([n, k]) => `<a href="#p-${k}" style="display:flex;align-items:baseline;gap:1mm;font-size:8.5pt;padding:1.25mm 0;border-bottom:.25mm dotted ${C.gra}33"><span>${n}</span><span style="flex:1"></span><b style="font-family:Mont;font-size:7pt;color:var(--p)">›</b></a>`).join('')}
        </div>` : `<div class="box b-ter" style="break-inside:avoid"><div class="bt">${ic('Gift', 10)}<span>Seus 4 bônus</span></div><p class="mini" style="margin-top:.8mm">SOS Mente Acelerada · Desligando a Cabeça Antes de Dormir · Diário da Ansiedade · Kit Rotina Sem Sobrecarga. Cada um em um arquivo próprio, que chegou junto no seu e-mail.</p></div>`}
      </div>`;
    },
  });

  reg0({
    key: 'primeirasemana', sp: true, sec: 'inicio', eb: 'Comece por aqui', t: 'Sua primeira semana: <span class="gr">só 2 páginas</span>', body: (x) => `
    <p class="tx">Começar com tudo é o jeito mais rápido de desistir. Na primeira semana, use <b>apenas as duas páginas de cada dia</b>: a <b>Mente em 3 Lugares</b> e o <b>Meu dia sem sobrecarga</b>${modo === 'imp' ? ` (a partir da p. ${x.pn('d1-m')})` : ''}. Pode pular a Semana leve e o Organizador por enquanto. Marque abaixo e anote a ansiedade antes e depois do método: você vai <b>ver a diferença no papel</b>.</p>
    <table class="tb" style="flex:0 0 auto">
      <tr><th>Dia</th><th style="text-align:center">Mente em 3 Lugares</th><th style="text-align:center">Meu dia</th><th style="text-align:center">Ansiedade antes</th><th style="text-align:center">Depois</th></tr>
      ${Array.from({ length: 7 }, (_, i) => `<tr style="height:10.6mm"><td><b style="font-family:Mont;color:var(--p);font-size:9pt">${i + 1}</b></td><td style="text-align:center"><span class="cb" style="display:inline-block"></span></td><td style="text-align:center"><span class="cb" style="display:inline-block"></span></td><td style="text-align:center;color:${C.gra}55">___ /10</td><td style="text-align:center;color:${C.gra}55">___ /10</td></tr>`).join('')}
    </table>
    ${box({ icon: 'Sprout', t: 'Da segunda semana em diante, se quiser', cor: 'sal', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:1.2mm;margin-top:1.4mm;font-size:7.8pt">
      <p><b>+ Semana leve e Revisão</b>, que abrem e fecham cada semana.</p>
      <p><b>+ Organizador de preocupações</b>, quando o “e se…” não parar.</p>
      <p><b>+ Começo do mês</b>: hábitos, sono e contas, se fizer sentido para você.</p>
      <p><b>+ Ritual antes de dormir</b> (bônus), se a cabeça não desliga à noite.</p>
    </div>` })}
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center;flex:0 0 auto">
      ${ic('Lightbulb', 18, C.ter)}
      <p style="font-size:7.8pt;line-height:1.45">Se a semana fugir do plano, <b>não recomece do zero</b>. Faça só a página de hoje. Constância é voltar, não é nunca falhar.</p>
    </div>`,
  });

  reg0({
    key: 'partida', sec: 'inicio', eb: 'Antes do primeiro dia', t: 'Meu ponto de partida', sub: 'daqui a 30 dias você vai comparar com a página “Minha evolução”', data: true, body: () => `
    ${box({ icon: 'Gauge', t: 'Como estou hoje', s: '0 = nada · 10 = muito', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:2.2mm;margin-top:2mm">
      ${['Minha cabeça está cheia', 'A ansiedade atrapalha o meu dia', 'Tenho dificuldade para dormir', 'Me sinto perdida(o) sobre por onde começar', 'Me cobro por não dar conta'].map((t) => `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:7.6pt">${t}</span>${escala('', 0, 10)}</div>`).join('')}
    </div>` })}
    ${box({ icon: 'Weight', t: 'O que mais pesa em mim hoje', cor: 'ter', cls: 'grow', body: fill() })}
    ${box({ icon: 'Flag', t: 'Por que eu decidi começar', cor: 'sal', cls: 'grow', body: fill() })}
    ${box({ icon: 'Sunrise', t: 'Como eu quero me sentir daqui a 30 dias', cor: 'cre', cls: 'grow', body: fill() })}`,
  });

  // ---------- MÉTODO ----------
  add({
    key: 'metodo1', sp: true, sec: 'metodo', anchor: true, eb: 'A metodologia', t: 'Método <span class="gr">Mente em 3 Lugares</span>', body: () => `
    <p class="tx">A ansiedade guarda tudo na mesma gaveta: o que você <b>precisa fazer</b>, o que <b>pode esperar</b> e o que você está <b>só antecipando</b>. Misturado, tudo parece urgente e grande demais. Separado, <b>cada coisa volta ao seu tamanho real</b>.</p>
    <div class="g3" style="flex:0 0 auto">
      ${[
        ['resolver', 'O que depende de mim e pede uma ação concreta.', '“Pagar a conta de luz.”'],
        ['programar', 'O que é importante, mas não precisa ser agora. Ganha um dia.', '“Marcar a consulta.” → quinta'],
        ['desocupar', 'Preocupações e “e se…” sobre o que ainda não aconteceu.', '“E se eu for mal na reunião?”'],
      ].map(([k, d, e]) => { const l = LUGAR[k]; return `<div class="box ${l.cor === 'line' ? 'b-line fx-line' : 'fx-' + l.cor}" style="padding:2.6mm"><span class="bi" style="width:6mm;height:6mm;background:${k === 'desocupar' ? C.terEsc : C.pet};color:#fff">${ic(l.icon, 12)}</span><p class="h2" style="margin-top:1.6mm">${l.nome}</p><p class="mini" style="margin-top:.8mm;font-size:6.9pt;color:${C.gra}cc">${d}</p><p class="mini it" style="margin-top:1.2mm">${e}</p></div>`; }).join('')}
    </div>
    <div>
    <p class="h2" style="margin-bottom:2.6mm;font-size:11pt">Os 3 passos · <span style="color:var(--t-tx)">10 minutos</span></p>
    <div style="display:flex;flex-direction:column;gap:1mm;flex:0 0 auto;position:relative">
      ${[
        ['Despejar', '3 min', 'Escreva tudo o que está na sua cabeça: tarefas, medos, lembretes, frases soltas. Sem filtro e sem ordem. Se veio à mente, vai para o papel.'],
        ['Distribuir', '5 min', 'Leia item por item e leve cada um para um dos 3 lugares. Na dúvida, use o fluxograma da próxima página.'],
        ['Definir', '2 min', 'Olhe para o “Resolver” e escolha uma única ação pequena para começar. Só uma. É ela que tira você da paralisia.'],
      ].map(([t, m, d], i) => `<div style="display:flex;gap:3mm;padding-bottom:2.6mm">
        <div style="display:flex;flex-direction:column;align-items:center"><span class="num" style="width:6.4mm;height:6.4mm;font-size:8pt;background:var(--t-tx)">${i + 1}</span>${i < 2 ? `<span style="flex:1;width:.4mm;background:${C.ter}88;margin-top:1mm"></span>` : ''}</div>
        <div><p class="h2" style="font-size:9.6pt">${t} <span style="font-size:7.4pt;color:var(--t-tx)">${m}</span></p><p class="tx" style="font-size:8.4pt">${d}</p></div>
      </div>`).join('')}
    </div>
    </div>
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center">
      ${ic('Clock', 18, C.ter)}
      <p style="font-size:7.8pt;line-height:1.45"><b>Quando usar:</b> de manhã, antes de começar o trabalho, antes de dormir ou em qualquer momento em que a cabeça encher. Quanto mais você usa, mais rápido fica.</p>
    </div>`,
  });

  add({
    key: 'exemplo', sec: 'metodo', eb: 'Exemplo preenchido', t: 'Como fica na prática', sub: 'uma terça-feira comum, cabeça a mil às 7h da manhã', body: () => paginaMetodo({
      antes: 8, depois: 4,
      despejar: ['conta de luz vence sexta · responder a Ana · consulta da mãe', 'e se eu não der conta do relatório? · roupa pra lavar', 'presente do aniversário do Léo · e se o chefe ficar bravo?', 'dor nas costas · ligar pro banco · tô cansada de tudo'],
      resolver: ['pagar a luz', 'responder Ana', 'relatório: abrir', 'e fazer 1 parte'],
      programar: ['consulta → qui', 'presente → sáb', 'banco → amanhã', 'roupa → noite'],
      desocupar: ['“e se eu não', 'der conta?”', '“chefe bravo”', '→ registrei'],
      acao: 'pagar a conta de luz pelo app do banco', quando: 'agora, 7h15',
    }),
  });

  add({
    key: 'fluxo', sp: true, sec: 'metodo', eb: 'Na dúvida', t: 'Isso vai para onde?', sub: 'siga as perguntas com cada item que você despejou', body: () => {
      const q = (t, n) => `<div style="display:flex;align-items:center;gap:2.4mm;background:#fff;border:.35mm solid var(--ln);border-radius:3mm;padding:2.4mm 3mm"><span class="num" style="width:5.4mm;height:5.4mm;font-size:7pt">${n}</span><p style="font-family:Mont;font-weight:700;font-size:8.6pt;line-height:1.25">${t}</p></div>`;
      const dest = (k, t) => { const l = LUGAR[k]; return `<div style="display:flex;align-items:center;gap:2mm;border-radius:3mm;padding:2mm 2.6mm;background:${k === 'desocupar' ? C.terCl : k === 'resolver' ? C.salBg : C.creEsc}"><span style="color:${k === 'desocupar' ? C.terEsc : C.pet}">${ic(l.icon, 13)}</span><p style="font-size:7.4pt;line-height:1.3"><b style="font-family:Mont;letter-spacing:.06em;text-transform:uppercase;font-size:7pt;color:${k === 'desocupar' ? C.terEsc : C.pet}">${l.nome}</b><br>${t}</p></div>`; };
      const seta = (t) => `<div style="display:flex;align-items:center;gap:1.6mm;padding-left:5.5mm;color:var(--t-tx);font-family:Mont;font-weight:700;font-size:6.6pt;letter-spacing:.08em;text-transform:uppercase">${ic('CornerDownRight', 11)}${t}</div>`;
      return `
      <div style="background:var(--p);color:#fff;border-radius:3mm;padding:2.4mm 3mm;display:flex;align-items:center;gap:2.4mm">${ic('Brain', 14, C.ter)}<p style="font-family:Mont;font-weight:700;font-size:8.6pt">Um pensamento, tarefa ou preocupação</p></div>
      <div style="display:flex;justify-content:center;color:var(--ln)">${ic('ArrowDown', 14)}</div>
      ${q('Isso já está acontecendo ou é um “e se…” sobre o futuro?', 1)}
      <div class="row">${seta('É um “e se…”')}${dest('desocupar', 'Registre e solte. Use as Perguntas que acalmam.')}</div>
      ${seta('Está acontecendo / é real')}
      ${q('Existe alguma ação que depende de mim?', 2)}
      <div class="row">${seta('Não depende de mim')}${dest('desocupar', 'Anote o que sente e volte para o que você controla.')}</div>
      ${seta('Sim, tem algo que eu posso fazer')}
      ${q('Precisa ser feito hoje ou nos próximos 2 dias?', 3)}
      <div class="row">
        ${dest('resolver', 'Entra na lista de hoje. Qual é o primeiro passo?')}
        ${dest('programar', 'Escolha um dia. Anotado, sai da cabeça.')}
      </div>
      <div class="box b-cre"><div class="bt">${ic('Lightbulb', 11)}<span>Três atalhos</span></div>
        <p class="mini" style="font-size:7.2pt;margin-top:1mm;color:${C.gra}cc">• Ficou entre dois lugares? Escolha o mais leve.<br>• Item grande demais (“organizar a casa”)? Quebre: qual é o <b>menor</b> pedaço?<br>• Apareceu de novo no Desocupar? Normal. Registrar de novo também acalma.</p>
      </div>`;
    },
  });

  add({
    key: 'perguntas', sec: 'metodo', eb: 'Para o Desocupar', t: 'Perguntas que <span class="gr">acalmam</span>', sub: 'quando uma preocupação não quer sair, faça a ela estas perguntas', body: () => `
    <div class="g2" style="flex:0 0 auto">
      ${[
        ['Isso está acontecendo agora?', 'Ou é algo que a sua mente está ensaiando?'],
        ['Que prova eu tenho?', 'O que é fato e o que é suposição?'],
        ['Se acontecer, o que eu faria?', 'Você já passou por coisas difíceis antes.'],
        ['O que eu diria a uma amiga?', 'Use com você a mesma gentileza.'],
        ['Isso vai importar daqui a 1 ano?', 'E daqui a 1 mês? E daqui a 1 semana?'],
        ['Qual pedaço depende de mim?', 'Ele vai para o Resolver. O resto, solte.'],
      ].map(([a, b]) => `<div class="box b-cre" style="padding:2.6mm"><p style="font-family:Mont;font-weight:700;font-size:8pt;color:var(--p);line-height:1.25">${a}</p><p class="mini" style="margin-top:.8mm;font-size:6.9pt">${b}</p></div>`).join('')}
    </div>
    ${box({ icon: 'Feather', t: 'Frases para soltar', s: 'leia em voz alta, se quiser', cor: 'ter', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:1.4mm;margin-top:1.6mm">
      ${['Eu registrei. Não preciso segurar isso agora.', 'Pensar não é o mesmo que acontecer.', 'Eu cuido disso quando (e se) chegar a hora.', 'Hoje eu escolho o próximo passo, não o problema inteiro.', 'Eu fiz o que dava. O resto não depende de mim.'].map((f) => `<p style="font-family:Mont;font-weight:600;font-size:8pt;color:${C.gra}">“${f}”</p>`).join('')}
    </div>` })}
    ${box({ icon: 'PenLine', t: 'Minhas frases', s: 'as que funcionam para você', cor: 'line', cls: 'grow', body: fill() })}`,
  });

  // ---------- MODELOS (registrados; a ordem final é montada no fim) ----------
  const T = {};
  const reg = (p) => (T[p.key] = p);
  reg({ key: 'tpl-metodo', sec: 'dia', eb: 'Mente em 3 Lugares', t: 'Tire tudo da cabeça', sub: '10 minutos · sempre que a cabeça encher', data: true, refil: true, body: () => paginaMetodo() });
  reg({ key: 'tpl-dia', sec: 'dia', eb: 'Diário', t: 'Meu dia <span class="gr">sem sobrecarga</span>', sub: 'o dia não precisa caber numa lista interminável', data: true, refil: true, body: () => paginaDia() });
  reg({ key: 'tpl-semana', sec: 'semana', eb: 'Planejamento semanal', t: 'Semana <span class="gr">leve</span>', sub: 'sem datas · comece em qualquer dia', refil: true, body: () => paginaSemana() });
  reg({ key: 'tpl-revisao', sec: 'semana', eb: 'Fechamento da semana', t: 'Revisão da semana', sub: '15 minutos para fechar a semana com leveza', data: true, refil: true, body: () => paginaRevisao() });
  reg({
    key: 'jornada', sec: 'dia', eb: 'Seu mapa', t: 'Jornada de <span class="gr">30 dias</span>', sub: 'o “Dia 1” é o dia em que você começar', body: (x) => `
    <p class="tx">Cada dia tem <b>2 páginas lado a lado</b>: à esquerda a <b>Mente em 3 Lugares</b>, à direita o <b>Meu dia</b>. Cada semana começa com a <b>Semana leve</b> e termina com a <b>Revisão</b>. ${modo === 'dig' ? 'Toque no número para ir direto ao dia.' : 'Marque o círculo de cada dia feito.'} Pulou um dia? Siga do próximo número, sem culpa.</p>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:2mm">
      ${[0, 1, 2, 3, 4].map((s) => {
        const dias = s < 4 ? Array.from({ length: 7 }, (_, i) => s * 7 + i + 1) : [29, 30];
        return `<div style="display:flex;gap:1.6mm;align-items:stretch">
          <${modo === 'dig' && s < 4 ? `a href="#p-s${s + 1}-plano"` : 'div'} style="width:15mm;flex-shrink:0;border-radius:2.4mm;background:${TEMAS[TEMA_SEMANA[s]].p};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.6mm 0"><span style="font-family:Mont;font-weight:700;font-size:5.4pt;letter-spacing:.12em;opacity:.8">${s < 4 ? 'SEMANA' : 'FINAL'}</span><span style="font-family:Mont;font-weight:700;font-size:13pt;line-height:1">${s < 4 ? s + 1 : '✦'}</span></${modo === 'dig' && s < 4 ? 'a' : 'div'}>
          ${dias.map((d) => `<${modo === 'dig' ? `a href="#p-d${d}-m"` : 'div'} style="flex:1;max-width:13.4mm;border-radius:2.4mm;background:${TEMAS[TEMA_SEMANA[s]].sbg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8mm;padding:1.6mm 0;min-height:13mm">
            <span style="font-family:Mont;font-weight:700;font-size:11pt;color:${TEMAS[TEMA_SEMANA[s]].stx};line-height:1">${d}</span>
            ${modo === 'dig' ? `<span style="font-size:5pt;color:${C.gra}77">abrir ›</span>` : `<span style="width:3.4mm;height:3.4mm;border-radius:50%;border:.3mm solid var(--p);background:#fff"></span><span style="font-size:5pt;color:${C.gra}77">p. ${x.pn(`d${d}-m`)}</span>`}
          </${modo === 'dig' ? 'a' : 'div'}>`).join('')}
          ${s === 4 ? `<${modo === 'dig' ? 'a href="#p-evolucao"' : 'div'} style="flex:3;border-radius:2.4mm;background:var(--t-bg);display:flex;align-items:center;gap:2mm;padding:0 3mm;color:var(--t-tx)">${ic('TrendingUp', 16)}<span style="font-size:7.4pt;color:${C.gra}"><b>Dia 30:</b> preencha “Minha evolução”${modo === 'dig' ? '' : ` (p. ${x.pn('evolucao')})`} e compare com o seu ponto de partida.</span></${modo === 'dig' ? 'a' : 'div'}>` : ''}
        </div>`;
      }).join('')}
    </div>
    <div class="box b-cre" style="flex-direction:row;gap:3mm;align-items:center;flex:0 0 auto">${ic('Repeat', 16, C.pet)}<p style="font-size:7.6pt;line-height:1.45"><b>Terminou os 30 dias?</b> ${modo === 'dig' ? 'Duplique as páginas da semana no seu app ou importe o arquivo de novo em branco para um novo ciclo.' : 'Imprima o arquivo de novo para um novo ciclo, ou só os <b>Refis</b> das páginas que você mais usa.'}</p></div>`,
  });


  // ---------- MÊS ----------
  reg({
    key: 'tpl-mes', sec: 'mes', anchor: true, eb: 'Visão do mês', t: 'Meu mês', sub: 'poucas metas, bem escolhidas', body: () => `
    <div class="row" style="flex:0 0 auto;align-items:flex-end">${campo('Mês:', '40mm')}${campo('Ano:', '18mm')}</div>
    ${box({ icon: 'Target', t: 'Meu foco deste mês', s: 'uma palavra ou uma frase', cor: 'pet', style: 'flex:0 0 auto', body: linhas(2) })}
    ${box({ icon: 'Sprout', t: 'Até 3 objetivos leves', cor: 'sal', style: 'flex:0 0 auto', body: `<div style="margin-top:.6mm">${[1, 2, 3].map((n) => `<div class="chk cl"><span class="num" style="width:4mm;height:4mm;font-size:6pt">${n}</span><span class="ln"></span></div><div style="padding-left:6mm"><div class="chk cl" style="min-height:5.6mm"><span class="mini it" style="white-space:nowrap">primeiro passo:</span><span class="ln"></span></div></div>`).join('')}</div>` })}
    <div class="row" style="flex:1;min-height:0">
      ${box({ icon: 'CalendarHeart', t: 'Datas importantes', cor: 'cre', body: fill(6.4, 'dt') })}
      <div class="col" style="min-height:0">
        ${box({ icon: 'Smile', t: 'Como quero me sentir', cor: 'ter', cls: 'grow', body: fill(6.4) })}
        ${box({ icon: 'Ban', t: 'O que eu não vou carregar', cor: 'line', cls: 'grow', body: fill(6.4) })}
      </div>
    </div>`,
  });
  reg({
    key: 'tpl-cal', sec: 'mes', eb: 'Calendário', t: 'Mês sem datas', sub: 'escreva os números no cantinho de cada dia', body: () => `
    <div class="row" style="flex:0 0 auto">${campo('Mês:', '40mm')}</div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1.1mm;flex:0 0 auto">
      ${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d, i) => `<span style="text-align:center;font-family:Mont;font-weight:700;font-size:6.4pt;letter-spacing:.08em;text-transform:uppercase;padding:1mm 0;border-radius:1.6mm;background:${i > 4 ? 'var(--t-bg)' : 'var(--s-bg)'};color:${i > 4 ? 'var(--t-tx)' : 'var(--s-tx)'}">${d}</span>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(6,1fr);gap:1.1mm;flex:1;min-height:0">
      ${Array.from({ length: 42 }, (_, i) => `<div style="border:.3mm solid ${C.creEsc};border-radius:1.8mm;position:relative;background:#fff"><span style="position:absolute;top:.8mm;left:.8mm;width:4mm;height:3.6mm;border-radius:1mm;background:${(i % 7) > 4 ? C.terCl : C.cre}"></span></div>`).join('')}
    </div>
    ${box({ icon: 'StickyNote', t: 'Lembretes do mês', cor: 'cre', style: 'flex:0 0 auto', body: linhas(3) })}`,
  });

  // ---------- PREOCUPAÇÕES ----------
  reg({
    key: 'tpl-preoc', sec: 'preoc', anchor: true, eb: 'Organizador', t: 'Organizador de <span class="gr">preocupações</span>', sub: 'separe o que é real do que é antecipação', data: true, refil: true, body: () => `
    <div class="g3" style="flex:0 0 auto">
      ${[['R', 'Problema real', 'está acontecendo e tem ação', 'sal'], ['F', 'Situação futura', 'pode acontecer, ganha data', 'cre'], ['P', 'Pensamento repetitivo', 'volta e volta, sem ação', 'ter']].map(([l, t, d, c]) => `<div class="box b-${c}" style="padding:2mm 2.4mm;flex-direction:row;gap:2mm;align-items:center"><span class="num" style="flex-shrink:0;background:${c === 'ter' ? 'var(--t-tx)' : 'var(--p)'}">${l}</span><span><b style="font-size:7pt;line-height:1.2;display:block">${t}</b><span class="mini it" style="font-size:6.2pt">${d}</span></span></div>`).join('')}
    </div>
    <table class="tb" style="flex:0 0 auto">
      <tr><th style="width:46%">O que está me preocupando</th><th style="text-align:center;width:16%">R · F · P</th><th>O que eu posso fazer?</th></tr>
      ${Array.from({ length: 9 }, () => `<tr style="height:9.4mm"><td style="border-right:.25mm solid ${C.gra}18"></td><td style="text-align:center;white-space:nowrap;border-right:.25mm solid ${C.gra}18">${['R', 'F', 'P'].map((l) => `<span style="display:inline-grid;place-items:center;width:4.2mm;height:4.2mm;border-radius:50%;border:.3mm solid var(--ln);font-family:Mont;font-size:5.6pt;font-weight:700;color:${C.gra}88;margin:0 .3mm">${l}</span>`).join('')}</td><td></td></tr>`).join('')}
    </table>
    ${box({ icon: 'Footprints', t: 'O que eu posso fazer hoje?', s: 'só o que depende de mim', cor: 'dash', cls: 'grow', body: fill() })}
    <p class="quote" style="font-size:7.6pt;flex:0 0 auto">Preocupação anotada é preocupação que você não precisa ficar segurando.</p>`,
  });
  reg({
    key: 'tpl-horario', sec: 'preoc', eb: 'Técnica', t: 'Horário da preocupação', sub: 'em vez de se preocupar o dia todo, marque um horário para isso', refil: true, body: () => `
    <div class="box b-sal" style="flex:0 0 auto">
      <div class="bt">${ic('AlarmClock', 11)}<span>Como funciona</span></div>
      <div class="g3" style="margin-top:2mm;gap:2.6mm">
        ${[['Escolha um horário', 'ex.: 18h, por 15 minutos. Longe da hora de dormir.'], ['Durante o dia, adie', 'veio a preocupação? anote aqui e diga: “agora não, às 18h”.'], ['Na hora marcada', 'releia. Muita coisa já perdeu a força. O resto, leve para o método.']].map(([t, d], i) => `<div><span class="num">${i + 1}</span><p style="font-weight:700;font-size:7.6pt;margin-top:1mm">${t}</p><p class="mini" style="font-size:6.8pt">${d}</p></div>`).join('')}
      </div>
    </div>
    <div class="row" style="flex:0 0 auto;align-items:flex-end">${campo('Meu horário:', '18mm')}${campo('Duração:', '14mm')}</div>
    <table class="tb" style="flex:1">
      <tr><th style="width:12%">Hora</th><th>Preocupação que apareceu (anote e adie)</th><th style="width:22%;text-align:center">Ainda importa?</th></tr>
      ${Array.from({ length: 13 }, () => `<tr style="height:8.6mm"><td style="border-right:.25mm solid ${C.gra}18"></td><td></td><td style="text-align:center;font-size:6.4pt;color:${C.gra}88"><span class="cb" style="display:inline-block;vertical-align:middle"></span> sim &nbsp; <span class="cb" style="display:inline-block;vertical-align:middle"></span> não</td></tr>`).join('')}
    </table>`,
  });

  reg({ key: 'tpl-acelerada', sec: 'preoc', eb: 'Para os dias difíceis', t: 'Modo <span class="gr">Mente Acelerada</span>', sub: 'uma página só, para quando a cabeça estiver a mil', data: true, refil: true, body: (x) => bonus(modo).b1.find((p) => p.key === 'b1-sos').body(x) });

  // ---------- HÁBITOS ----------
  reg({
    key: 'tpl-habitos', sec: 'habitos', anchor: true, eb: 'Rastreador do mês', t: 'Hábitos e ansiedade', sub: 'pinte o que fez. não precisa ser todo dia', refil: true, body: () => {
      const cols = 6;
      return `
      <div class="row" style="flex:0 0 auto;align-items:flex-end">${campo('Mês:', '34mm')}<span class="mini it" style="text-align:right">sugestões: água · remédio · caminhar · dormir até 23h · método do dia · 10 min sem celular</span></div>
      <div style="flex:1;display:grid;grid-template-columns:7mm repeat(${cols},1fr) 25mm;grid-template-rows:18mm repeat(31,1fr);min-height:0;font-size:6pt">
        <span></span>
        ${Array.from({ length: cols }, (_, i) => `<div style="border-radius:1.6mm 1.6mm 0 0;background:${i % 2 ? C.cre : 'var(--s-bg)'};margin:0 .4mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm"><span style="font-family:Mont;font-size:5pt;color:${C.gra}55">hábito ${i + 1}</span></div>`).join('')}
        <div style="border-radius:1.6mm 1.6mm 0 0;background:var(--t-bg);margin-left:1mm;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:1mm"><span style="font-family:Mont;font-weight:700;font-size:5.4pt;letter-spacing:.06em;color:var(--t-tx)">ANSIEDADE</span><span style="font-size:5pt;color:${C.gra}88">baixa · média · alta</span></div>
        ${Array.from({ length: 31 }, (_, d) => `<span style="display:flex;align-items:center;font-family:Mont;font-weight:700;color:var(--p);font-size:6pt">${d + 1}</span>${Array.from({ length: cols }, (_, i) => `<div style="background:${i % 2 ? C.cre : 'var(--s-bg)'};margin:0 .4mm;display:flex;align-items:center;justify-content:center;border-top:.2mm solid #fff"><span style="width:3.1mm;height:3.1mm;border-radius:50%;border:.28mm solid var(--ln);background:#fff"></span></div>`).join('')}<div style="background:var(--t-bg);margin-left:1mm;display:flex;align-items:center;justify-content:space-around;border-top:.2mm solid #fff">${[0, 1, 2].map((k) => `<span style="width:3mm;height:3mm;border-radius:50%;border:.28mm solid ${C.ter};background:${['#fff', '#fff', '#fff'][k]}"></span>`).join('')}</div>`).join('')}
      </div>`;
    },
  });
  reg({
    key: 'tpl-sono', sec: 'habitos', eb: 'Rastreador do mês', t: 'Sono e energia', sub: 'descobrir padrões ajuda a cuidar melhor de você', refil: true, body: () => `
      <div class="row" style="flex:0 0 auto">${campo('Mês:', '34mm')}</div>
      <table class="tb" style="flex:1">
        <tr><th style="width:7%">Dia</th><th style="text-align:center">Deitei</th><th style="text-align:center">Acordei</th><th style="text-align:center">Sono</th><th style="text-align:center">Energia</th><th style="text-align:center">Cabeça ao deitar</th></tr>
        <tr><td></td><td></td><td></td><td style="text-align:center;font-size:5.4pt;color:${C.gra}88">ruim · ok · bom</td><td style="text-align:center;font-size:5.4pt;color:${C.gra}88">baixa · média · alta</td><td style="text-align:center;font-size:5.4pt;color:${C.gra}88">calma · cheia · a mil</td></tr>
        ${Array.from({ length: 31 }, (_, d) => `<tr><td style="font-family:Mont;font-weight:700;color:var(--p);font-size:6pt">${d + 1}</td><td style="color:${C.gra}44;text-align:center;font-size:6pt">__:__</td><td style="color:${C.gra}44;text-align:center;font-size:6pt">__:__</td>${[0, 1, 2].map((c) => `<td style="text-align:center">${[0, 1, 2].map(() => `<span style="display:inline-block;width:2.8mm;height:2.8mm;border-radius:50%;border:.28mm solid ${c === 2 ? C.ter : C.sal};margin:0 .9mm;vertical-align:middle"></span>`).join('')}</td>`).join('')}</tr>`).join('')}
      </table>`,
  });
  reg({
    key: 'autocuidado', sec: 'habitos', eb: 'Para os dias pesados', t: 'Menu de <span class="gr">autocuidado</span>', sub: 'escolha um item quando não souber o que fazer por você', body: () => `
    <div class="row" style="flex:1;min-height:0">
      ${[['Zap', '2 minutos', 'sal', ['beber um copo d’água', 'respirar 4-4-6, 4 vezes', 'lavar o rosto', 'abrir a janela', 'alongar o pescoço', 'colocar uma música']], ['Timer', '15 minutos', 'cre', ['caminhar no quarteirão', 'tomar um banho sem pressa', 'ligar para alguém querido', 'arrumar só uma gaveta', 'tomar sol', 'escrever no planner']], ['Sun', '1 hora ou mais', 'ter', ['cozinhar algo gostoso', 'ver um filme sem celular', 'cochilar sem culpa', 'encontrar uma amiga', 'fazer algo manual', 'ficar em contato com a natureza']]].map(([i, t, c, l]) => `
        <div class="box b-${c}"><div class="bt">${ic(i, 11)}<span>${t}</span></div>
          <div class="ac" style="margin-top:1.6mm;display:flex;flex-direction:column;gap:.4mm">${l.map((x) => chk(x)).join('')}${chkLinha(3)}</div>
          ${fill()}
        </div>`).join('')}
    </div>
    ${box({ icon: 'Users', t: 'Pessoas com quem eu posso contar', cor: 'white', style: 'flex:0 0 auto', body: `<div class="g2" style="gap:0 4mm">${Array.from({ length: 4 }, () => `<div class="chk cl"><span style="color:var(--t-tx)">${ic('Phone', 9)}</span><span class="ln"></span></div>`).join('')}</div><p class="mini" style="margin-top:1.4mm">Em uma crise, ligue <b>188 (CVV)</b>, gratuito e 24 horas.</p>` })}`,
  });

  // ---------- FINANÇAS ----------
  reg({
    key: 'tpl-contas', sec: 'financas', anchor: true, eb: 'Finanças', t: 'Contas do mês', sub: 'conta anotada não fica martelando na cabeça', refil: true, body: () => `
    <div class="row" style="flex:0 0 auto">${campo('Mês:', '34mm')}</div>
    <table class="tb" style="flex:1">
      <tr><th>Conta</th><th style="width:15%;text-align:center">Vence dia</th><th style="width:20%">Valor</th><th style="width:12%;text-align:center">Paga</th></tr>
      ${Array.from({ length: 13 }, () => `<tr style="height:8.4mm"><td></td><td></td><td style="color:${C.gra}55">R$</td><td style="text-align:center"><span class="cb" style="display:inline-block"></span></td></tr>`).join('')}
      <tr style="height:8.4mm"><td style="font-family:Mont;font-weight:700;color:var(--p);font-size:7pt">TOTAL</td><td></td><td style="color:${C.gra}55">R$</td><td></td></tr>
    </table>
    ${box({ icon: 'BellRing', t: 'Ação desta semana', s: 'ex.: renegociar, cancelar, pedir 2ª via', cor: 'dash', style: 'flex:0 0 auto', body: linhas(2) })}`,
  });
  reg({
    key: 'tpl-dinheiro', sec: 'financas', eb: 'Finanças', t: 'Meu dinheiro <span class="gr">sem susto</span>', sub: 'olhar o número real assusta menos que imaginar', refil: true, body: () => `
    <div class="row" style="flex:0 0 auto">${campo('Mês:', '34mm')}</div>
    <div class="g3" style="flex:0 0 auto">
      ${[['Entrou', 'sal', 'ArrowDownCircle'], ['Saiu', 'ter', 'ArrowUpCircle'], ['Sobrou', 'cre', 'PiggyBank']].map(([t, c, i]) => `<div class="box b-${c}" style="padding:2.4mm"><div class="bt">${ic(i, 11)}<span>${t}</span></div><p style="font-family:Mont;font-weight:600;color:${C.gra}55;margin-top:3mm;border-bottom:.25mm solid ${C.gra}44;padding-bottom:1mm">R$</p></div>`).join('')}
    </div>
    <div class="row" style="flex:1;min-height:0">
      ${box({ icon: 'Home', t: 'Gastos fixos', cor: 'white', body: fill(6.4, 'rs') })}
      ${box({ icon: 'ShoppingBag', t: 'Gastos variáveis', cor: 'white', body: fill(6.4, 'rs') })}
    </div>
    ${box({ icon: 'HeartHandshake', t: 'Um gasto que me preocupa → o que eu posso fazer', cor: 'ter', style: 'flex:0 0 auto', body: linhas(3) })}`,
  });

  // ---------- RECOMEÇO ----------
  reg({
    key: 'tpl-recomeco', sec: 'recomeco', anchor: true, eb: 'Sem culpa', t: 'Página de <span class="gr">recomeço</span>', sub: 'pulou dias? tudo bem. recomece daqui.', data: true, refil: true, body: () => `
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center;flex:0 0 auto">${ic('RefreshCcw', 18, C.ter)}<p style="font-size:7.8pt;line-height:1.45">Você <b>não</b> precisa preencher as páginas que ficaram em branco. Ninguém está contando. Hoje é um bom dia para voltar.</p></div>
    ${box({ icon: 'Archive', t: 'O que ficou para trás', s: 'sem culpa, só para tirar da cabeça', cor: 'cre', cls: 'grow', body: fill() })}
    ${box({ icon: 'Sparkle', t: 'O que ainda importa', cor: 'sal', cls: 'grow', body: fill() })}
    ${box({ icon: 'Wind', t: 'O que eu posso soltar', cor: 'ter', cls: 'grow', body: fill() })}
    ${box({ icon: 'Footprints', t: 'Recomeço por aqui', s: 'uma ação, hoje', cor: 'dash', style: 'flex:0 0 auto', body: linhas(2) })}`,
  });
  reg({
    key: 'evolucao', sec: 'recomeco', eb: '30 dias depois', t: 'Minha <span class="gr">evolução</span>', sub: 'compare com o “Meu ponto de partida”', data: true, body: () => `
    ${box({ icon: 'Gauge', t: 'Como estou hoje', s: '0 = nada · 10 = muito', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:2.2mm;margin-top:2mm">
      ${['Minha cabeça está cheia', 'A ansiedade atrapalha o meu dia', 'Tenho dificuldade para dormir', 'Me sinto perdida(o) sobre por onde começar', 'Me cobro por não dar conta'].map((t) => `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:7.6pt">${t}</span>${escala('', 0, 10)}</div>`).join('')}
    </div>` })}
    ${box({ icon: 'TrendingUp', t: 'O que mudou em mim', cor: 'sal', cls: 'grow', body: fill() })}
    ${box({ icon: 'Wrench', t: 'O que mais me ajudou', s: 'páginas, hábitos, frases', cor: 'cre', cls: 'grow', body: fill() })}
    ${box({ icon: 'Mail', t: 'Um recado para mim daqui a 30 dias', cor: 'ter', cls: 'grow', body: fill() })}`,
  });

  reg({
    key: 'despejo', sec: 'dia', eb: 'Antes do Dia 1', t: 'O grande <span class="gr">despejo</span>', sub: 'esvazie tudo de uma vez. sem ordem, sem filtro, sem julgar', data: true, body: () => `
    <p class="tx" style="font-size:8pt">Antes de começar a jornada, tire da cabeça <b>tudo</b> o que está aí guardado: tarefas, medos, contas, conversas pendentes, ideias. Use as dicas como gatilho. Depois, nos próximos dias, você distribui aos poucos nos 3 lugares.</p>
    <div style="display:flex;flex-wrap:wrap;gap:1.4mm;flex:0 0 auto">${['trabalho', 'casa', 'contas', 'saúde', 'família', 'amigos', 'estudos', 'compras', 'documentos', 'consultas', '“e se…”', 'o que eu evito', 'o que me tira o sono'].map((t) => `<span class="chip c-cre" style="text-transform:none;letter-spacing:.02em;font-weight:600;font-size:6.6pt">${t}</span>`).join('')}</div>
    <div class="box b-cre grow" style="padding:2.4mm 3mm">${fill(6.6)}</div>
    <p class="quote" style="font-size:7.8pt;flex:0 0 auto">Pronto. Tudo isso agora está no papel, e não mais só na sua cabeça.</p>`,
  });

  // ---------- NOTAS ----------
  reg({ key: 'tpl-pautada', sec: 'notas', eb: 'Notas', t: 'Anotações', data: true, refil: true, body: () => `<div style="flex:1;display:flex;flex-direction:column">${fill(7)}</div>` });
  reg({ key: 'tpl-pontilhada', sec: 'notas', eb: 'Notas', t: 'Ideias e rabiscos', data: true, refil: true, body: () => `<div style="flex:1;display:flex;flex-direction:column">${dots(5)}</div>` });

  /* ---------- ORDEM FINAL ----------
     Impresso: cada dia ocupa uma página dupla (Mente em 3 Lugares à esquerda, Meu dia à direita).
     Para isso a jornada começa sempre numa página par (lado esquerdo do caderno aberto). */
  const usar = (k, extra = {}) => add({ ...T[k], refil: false, ...extra });
  const parEsquerda = (sec) => {
    if (modo === 'imp' && P.length % 2 === 0) usar('despejo', { sec });
  };

  // Antes de começar: ponto de partida e plano da primeira semana
  add(T0.partida);
  add(T0.primeirasemana);
  // Começo do mês
  usar('tpl-mes', { anchor: true });
  usar('tpl-cal');
  usar('tpl-habitos', { anchor: true });
  usar('tpl-sono');
  usar('tpl-contas', { anchor: true });
  usar('tpl-dinheiro');
  // Jornada
  usar('jornada', { anchor: true });
  parEsquerda('dia');
  const dia = (d, s) => {
    const tema = TEMA_SEMANA[s - 1];
    usar('tpl-metodo', { key: `d${d}-m`, dia: d, tema, voltar: 'jornada', eb: `Dia ${d} · Mente em 3 Lugares` });
    usar('tpl-dia', { key: `d${d}-d`, dia: d, tema, voltar: 'jornada', eb: `Dia ${d} · Meu dia` });
  };
  for (let s = 1; s <= 4; s++) {
    const tema = TEMA_SEMANA[s - 1];
    usar('tpl-semana', { key: `s${s}-plano`, tema, anchor: s === 1, voltar: 'jornada', eb: `Semana ${s} de 4`, semana: s });
    usar('tpl-preoc', { key: `s${s}-preoc`, tema, anchor: s === 1, voltar: 'jornada', eb: `Semana ${s} · Organizador` });
    for (let d = s * 7 - 6; d <= s * 7; d++) dia(d, s);
    usar('tpl-revisao', { key: `s${s}-revisao`, tema, voltar: 'jornada', eb: `Semana ${s} · fechamento` });
    usar('tpl-pautada', { key: `s${s}-notas`, tema, voltar: 'jornada', eb: `Semana ${s} · notas`, t: 'Notas da semana' });
  }
  dia(29, 5); dia(30, 5);
  usar('evolucao', { tema: 'brand', voltar: 'jornada' });
  // Ferramentas para quando precisar
  usar('tpl-acelerada', { key: 'acelerada-1' });
  usar('tpl-acelerada', { key: 'acelerada-2' });
  usar('tpl-horario', { tema: 'lav' });
  usar('autocuidado', { tema: 'mant' });
  usar('tpl-recomeco', { key: 'recomeco-1', anchor: true });
  usar('tpl-recomeco', { key: 'recomeco-2' });
  usar('tpl-pautada', { anchor: true });
  usar('tpl-pontilhada');
  if (modo === 'dig') for (let n = 2; n <= 4; n++) { usar('tpl-pautada', { key: `pautada-${n}` }); usar('tpl-pontilhada', { key: `pontilhada-${n}` }); }
  if (modo === 'imp') add({ key: 'contracapa', sec: 'notas', raw: () => contracapa() });
  P.tpl = T;
  return P;
}

export const contracapa = (t = 'Menos peso na mente. Mais clareza no dia.') => `
<div style="position:absolute;inset:0;background:${C.cre};display:flex;flex-direction:column;align-items:center;text-align:center;color:${C.gra}">
  <div style="margin-top:50mm;display:flex;flex-direction:column;align-items:center">
    ${mark(50)}
    <p style="font-family:Mont;font-weight:600;font-size:7pt;letter-spacing:.5em;margin-top:6mm;padding-left:.5em;color:var(--p)">PLANNER</p>
    <p style="font-family:Mont;font-weight:700;font-size:22pt;letter-spacing:-.02em;line-height:1;color:${C.petEsc}">mente calma</p>
    <p class="it" style="font-size:9pt;margin-top:6mm;color:${C.gra}bb">${t}</p>
  </div>
  ${ondas(['creEsc', 'salCl', 'sal', 'terCl'])}
  <p style="position:absolute;top:16mm;left:0;right:0;font-size:6pt;color:${C.gra}88;padding:0 20mm">© Planner Mente Calma · Material para uso pessoal. Proibida a revenda, distribuição ou compartilhamento.</p>
</div>`;

/* ============================== BÔNUS ============================== */

const capaBonus = (n, titulo, tag, ordem) => capa({ selo: `Bônus ${n}`, topo: 'PLANNER MENTE CALMA', titulo, tag, ordem, sub: 'Método Mente em 3 Lugares' });

export function bonus(modo) {
  const B = { b1: [], b2: [], b3: [], b4: [] };

  /* ---------- BÔNUS 1 · SOS MENTE ACELERADA ---------- */
  const b1 = B.b1;
  b1.push({ key: 'b1-capa', sec: 'b1', anchor: true, raw: () => capaBonus(1, 'SOS Mente<br>Acelerada', 'Páginas rápidas para quando a cabeça estiver a mil: respirar, voltar ao presente e escolher um próximo passo.', ['#F8E3E6', '#E2B5C0', '#A54C64', '#315F5A']) });
  b1.push({
    key: 'b1-comece', sp: true, sec: 'b1', eb: 'SOS · Comece por aqui', t: 'Quando a cabeça <span class="gr">estiver a mil</span>', sub: 'três passos, menos de 5 minutos', body: (x) => `
    <p class="tx">Na crise, a mente quer resolver tudo de uma vez. O caminho é o contrário: <b>primeiro acalmar o corpo, depois voltar ao presente, e só então escolher uma coisa pequena</b>. Siga a ordem.</p>
    ${[
      ['Wind', 'Respire', '1 min', 'Respiração 4-4-6: inspire em 4, segure em 4, solte devagar em 6. Quatro vezes. Soltar o ar mais longo avisa o corpo que está tudo bem.', 'b1-resp'],
      ['Eye', 'Volte ao presente', '2 min', 'Técnica 5-4-3-2-1: use os sentidos para tirar a mente do “e se…” e trazer de volta para onde você está agora.', 'b1-ancora'],
      ['Footprints', 'Um próximo passo', '2 min', 'Preencha a Página SOS: o que está pesando, se é para agora e qual a menor ação possível.', 'b1-sos'],
    ].map(([i, t, m, d, k], n) => `<div class="box ${n === 1 ? 'b-cre' : n === 2 ? 'b-ter' : 'b-sal'}" style="flex-direction:row;gap:3mm;align-items:flex-start;flex:0 0 auto">
      <span class="num" style="width:7mm;height:7mm;font-size:9pt;flex-shrink:0;${n === 2 ? `background:var(--t-tx)` : ''}">${n + 1}</span>
      <div><p class="h2">${t} <span style="font-size:7pt;color:var(--t-tx)">${m}</span></p><p class="tx" style="font-size:7.8pt;margin-top:.6mm">${d}</p><p class="mini" style="margin-top:.8mm;color:var(--p);font-weight:700">${modo === 'dig' ? `<a href="#p-${k}">ir para a página ›</a>` : `página ${x.pn(k)}`}</p></div>
    </div>`).join('')}
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center">${ic('HeartHandshake', 18, C.ter)}<p style="font-size:7.4pt;line-height:1.45">Se a crise for muito forte, não passar ou você pensar em se machucar, procure ajuda agora: <b>CVV 188</b> (24h, gratuito), <b>SAMU 192</b> ou o pronto-socorro mais próximo.</p></div>`,
  });
  b1.push({
    key: 'b1-resp', sec: 'b1', eb: 'SOS · Passo 1', t: 'Respiração <span class="gr">4-4-6</span>', sub: 'siga o quadrado com o dedo ou com os olhos', body: () => `
    <div style="display:flex;justify-content:center;flex:0 0 auto;padding:3mm 0">
      <div style="position:relative;width:74mm;height:74mm">
        <div style="position:absolute;inset:8mm;border-radius:6mm;border:1.2mm solid var(--ln);background:var(--s-bg)"></div>
        <div style="position:absolute;inset:8mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">${ic('Wind', 22, C.pet)}<p style="font-family:Mont;font-weight:700;font-size:11pt;color:var(--p);margin-top:2mm">repita 4 vezes</p><p class="mini it">devagar, sem forçar</p></div>
        <span style="position:absolute;top:0;left:50%;transform:translateX(-50%)" class="chip c-pet">Inspire · 4</span>
        <span style="position:absolute;right:-5mm;top:50%;transform:translateY(-50%) rotate(90deg)" class="chip c-sal">Segure · 4</span>
        <span style="position:absolute;bottom:0;left:50%;transform:translateX(-50%)" class="chip c-ter">Solte · 6</span>
        <span style="position:absolute;left:-5mm;top:50%;transform:translateY(-50%) rotate(-90deg)" class="chip c-cre">Pausa</span>
      </div>
    </div>
    <div class="g2" style="flex:0 0 auto">
      ${box({ icon: 'Sparkles', t: 'Suspiro duplo', cor: 'cre', body: `<p class="mini" style="font-size:7pt;margin-top:1mm">Puxe o ar pelo nariz, puxe mais um pouquinho por cima, e solte tudo bem devagar pela boca. Uma ou duas vezes já acalmam.</p>` })}
      ${box({ icon: 'Hand', t: 'Mão no peito', cor: 'ter', body: `<p class="mini" style="font-size:7pt;margin-top:1mm">Coloque a mão no peito, sinta o ar entrar e sair e diga por dentro: “agora eu estou segura(o)”.</p>` })}
    </div>
    ${box({ icon: 'ClipboardCheck', t: 'Registro', s: 'marque cada vez que usar', cor: 'white', cls: 'grow', body: `<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:1.6mm;margin-top:2mm">${Array.from({ length: 40 }, () => `<span style="aspect-ratio:1;border-radius:50%;border:.3mm solid var(--ln)"></span>`).join('')}</div>` })}`,
  });
  b1.push({
    key: 'b1-ancora', sec: 'b1', eb: 'SOS · Passo 2', t: 'Volte ao presente: <span class="gr">5-4-3-2-1</span>', sub: 'devagar, um sentido de cada vez', data: true, refil: true, body: () => `
    ${[['Eye', '5 coisas que eu vejo', 'sal', 5], ['Hand', '4 coisas que eu posso tocar', 'cre', 4], ['Ear', '3 sons que eu escuto', 'sal', 3], ['Flower2', '2 cheiros que eu sinto', 'cre', 2], ['Coffee', '1 sabor ou 1 coisa boa agora', 'ter', 1]].map(([i, t, c, n]) => box({ icon: i, t, cor: c, cls: 'grow', style: `flex:${n + 1}`, body: fill(6.2) })).join('')}
    <p class="quote" style="font-size:8pt;flex:0 0 auto">Você está aqui. Agora. E agora está tudo bem o suficiente.</p>`,
  });
  b1.push({
    key: 'b1-sos', sec: 'b1', eb: 'SOS · Passo 3', t: 'Página <span class="gr">SOS</span>', sub: 'uma página só, para os dias mais difíceis', data: true, refil: true, body: () => `
    <div class="row" style="flex:0 0 auto;align-items:center">${escala('Ansiedade agora', 0, 10)}</div>
    ${box({ num: '1', t: 'O que está me pesando agora?', cor: 'ter', cls: 'grow', style: 'flex:1.4', body: fill() })}
    ${box({ num: '2', t: 'Isso é para agora?', cor: 'cre', style: 'flex:0 0 auto', body: `<div style="display:flex;gap:6mm;margin-top:1.4mm">${chk('Sim, precisa de mim hoje')}${chk('Não, pode esperar → anotei')}</div>` })}
    ${box({ num: '3', t: 'Qual é a menor ação possível?', s: 'pequena de verdade', cor: 'sal', cls: 'grow', body: fill() })}
    ${box({ num: '4', t: 'Respirei', s: '4-4-6, quatro vezes', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;gap:2.4mm;margin-top:1.4mm">${[1, 2, 3, 4].map(() => '<span class="cb" style="width:4.4mm;height:4.4mm;border-radius:50%"></span>').join('')}</div>` })}
    ${box({ num: '5', t: 'O que eu digo para mim agora', cor: 'dash', cls: 'grow', body: `<p class="hand" style="color:${C.terEsc}aa;font-size:10pt;margin-top:.6mm">ex.: “Isso é ansiedade. Vai passar. Um passo de cada vez.”</p>${fill()}` })}
    <div class="row" style="flex:0 0 auto;align-items:center">${escala('Ansiedade depois', 0, 10)}</div>`,
  });
  b1.push({
    key: 'b1-fato', sec: 'b1', eb: 'SOS · Para depois', t: 'Fato ou <span class="gr">pensamento</span>?', sub: 'quando a cabeça transforma uma situação em catástrofe', data: true, refil: true, body: () => `
    <p class="tx" style="font-size:7.8pt">Escreva <b>o que aconteceu</b> como uma câmera filmaria, sem interpretação. Depois, o que <b>a sua mente diz</b> sobre isso. Por último, procure <b>outro jeito de ver</b>, mais justo e mais gentil.</p>
    ${[1, 2, 3].map((n) => `<div class="box b-white" style="flex:1;min-height:0;gap:1.6mm;padding:2.4mm 2.8mm">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.4mm;flex:1;min-height:0">
        ${[['O que aconteceu (fato)', 'sal', 'Video'], ['O que minha mente diz', 'ter', 'MessageCircleWarning'], ['Outro jeito de ver', 'cre', 'Sun']].map(([t, c, i]) => `<div class="box b-${c}" style="padding:1.8mm 2mm"><div class="bt" style="font-size:5.6pt;letter-spacing:.06em">${ic(i, 9)}<span>${t}</span></div>${fill(5.8)}</div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:3mm">${escala('Quanto acredito agora', 0, 10)}</div>
    </div>`).join('')}`,
  });
  if (modo === 'imp') b1.push({ key: 'b1-cc', sec: 'b1', raw: () => contracapa('Isso é ansiedade. E ansiedade passa.') });

  /* ---------- BÔNUS 2 · DESLIGANDO A CABEÇA ---------- */
  const b2 = B.b2;
  b2.push({ key: 'b2-capa', sec: 'b2', anchor: true, raw: () => capaBonus(2, 'Desligando a Cabeça<br>Antes de Dormir', 'Um ritual de 10 minutos para encerrar o dia: descarregar, preparar o amanhã e deitar mais leve.', ['#ECE8F6', '#BEB4DE', '#4A3F78', '#F6E6DC']) });
  b2.push({
    key: 'b2-ritual', sp: true, sec: 'b2', eb: 'Ritual noturno', t: 'O ritual de <span class="gr">10 minutos</span>', sub: 'faça 30 a 60 minutos antes de deitar, longe da cama', body: () => `
    <p class="tx">A cabeça não desliga porque ainda está tentando <b>lembrar</b>, <b>resolver</b> e <b>prevenir</b>. Este ritual entrega para o papel cada uma dessas tarefas. Quando a mente entende que nada vai se perder, ela pode descansar.</p>
    ${[
      ['Inbox', 'Descarregar', '3 min', 'Tudo o que ficou rodando hoje vai para o papel: pendências, conversas, preocupações.'],
      ['CalendarCheck', 'Preparar o amanhã', '3 min', 'Escolha as 3 prioridades de amanhã e o primeiro passo. Pronto: ninguém precisa ficar “lembrando” durante a noite.'],
      ['Feather', 'Soltar', '2 min', 'Escreva o que você solta hoje e uma coisa boa que aconteceu. Fechar o dia no positivo muda a última imagem da mente.'],
      ['Moon', 'Desacelerar', '2 min', 'Respiração 4-4-6 e luz baixa. A partir daqui: tela longe e nada de resolver problemas.'],
    ].map(([i, t, m, d], n) => `<div style="display:flex;gap:3mm;align-items:flex-start;flex:0 0 auto"><span class="bi" style="width:8mm;height:8mm;background:${n % 2 ? C.terCl : C.salBg};color:${n % 2 ? C.terEsc : C.pet};flex-shrink:0">${ic(i, 15)}</span><div><p class="h2" style="font-size:10pt">${n + 1}. ${t} <span style="font-size:7.4pt;color:var(--t-tx)">${m}</span></p><p class="tx" style="font-size:8.6pt">${d}</p></div></div>`).join('')}
    ${box({ icon: 'BedDouble', t: 'Para dormir melhor', cor: 'pet', body: `<div class="g2" style="gap:1mm 4mm;margin-top:1.6mm;font-size:7.2pt">${['mesmo horário para deitar, até no fim de semana', 'celular fora do alcance da cama', 'café só até o meio da tarde', 'quarto escuro e mais fresco', 'cama é para dormir, não para resolver', 'perdeu o sono? levante e volte com sono'].map((t) => `<p style="display:flex;gap:1.4mm">${ic('Check', 9, C.ter, 3)}<span>${t}</span></p>`).join('')}</div>` })}`,
  });
  b2.push({
    key: 'b2-noite', sec: 'b2', eb: 'Ritual noturno', t: 'Desligando a cabeça', sub: '10 minutos para o dia terminar aqui', data: true, refil: true, body: () => `
    ${box({ num: '1', t: 'Descarregar', s: 'o que ficou rodando hoje', cor: 'cre', cls: 'grow', style: 'flex:1.3', body: fill() })}
    ${box({ num: '2', t: 'Amanhã', s: 'só 3 prioridades', cor: 'sal', style: 'flex:0 0 auto', body: `<div style="margin-top:.6mm">${chkLinha(3)}<div class="chk cl"><span class="lbl" style="white-space:nowrap;color:var(--t-tx)">1º passo:</span><span class="ln"></span></div></div>` })}
    <div class="row" style="flex:1;min-height:0">
      ${box({ num: '3', t: 'Hoje eu solto', cor: 'ter', body: fill() })}
      ${box({ icon: 'Heart', t: 'Uma coisa boa de hoje', cor: 'line', body: fill() })}
    </div>
    ${box({ num: '4', t: 'Desacelerar', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;gap:4mm;flex-wrap:wrap;margin-top:1mm">${['respirei 4-4-6', 'tela longe', 'luz baixa', 'água/chá'].map((t) => chk(t)).join('')}</div>` })}
    <div class="box b-pet" style="flex-direction:row;align-items:center;justify-content:space-between;flex:0 0 auto"><p style="font-family:Mont;font-weight:700;font-size:8.6pt">Está tudo no papel. Pode descansar.</p><span style="font-size:7pt;opacity:.85;display:flex;gap:1mm;align-items:flex-end">deitei às <i style="display:inline-block;width:10mm;border-bottom:.3mm solid ${C.cre}99;height:3.6mm"></i></span></div>`,
  });
  b2.push({
    key: 'b2-madrugada', sec: 'b2', eb: 'Se acordar à noite', t: 'Bloco da <span class="gr">madrugada</span>', sub: 'deixe ao lado da cama. uma linha e volte a dormir', refil: true, body: () => `
    <div class="box b-sal" style="flex:0 0 auto"><p style="font-size:7.8pt;line-height:1.45">Acordou com a cabeça a mil? <b>Não tente resolver agora.</b> Escreva em uma linha o que veio, marque quando vai cuidar disso e respire 4-4-6. De madrugada tudo parece maior do que é.</p></div>
    <table class="tb" style="flex:1">
      <tr><th style="width:15%">Noite</th><th>O que veio na cabeça</th><th style="width:25%">Eu cuido disso…</th></tr>
      ${Array.from({ length: 14 }, () => `<tr><td style="color:${C.gra}44;font-size:6pt">__/__</td><td></td><td style="color:${C.gra}55;font-size:6pt">amanhã às ___h</td></tr>`).join('')}
    </table>
    <p class="quote" style="font-size:7.8pt;flex:0 0 auto">De madrugada a gente não resolve. A gente anota e descansa.</p>`,
  });
  b2.push({
    key: 'b2-sono', sec: 'b2', eb: 'Duas semanas', t: 'Diário do sono', sub: 'veja o que ajuda (e o que atrapalha) as suas noites', refil: true, body: () => `
    <table class="tb" style="flex:1">
      <tr><th style="width:9%">Dia</th><th style="text-align:center">Fiz o ritual</th><th style="text-align:center">Deitei</th><th style="text-align:center">Acordei</th><th style="text-align:center">Dormi</th><th>Observação</th></tr>
      ${Array.from({ length: 14 }, (_, d) => `<tr style="height:8.1mm"><td style="font-family:Mont;font-weight:700;color:var(--p)">${d + 1}</td><td style="text-align:center"><span class="cb" style="display:inline-block"></span></td><td style="text-align:center;color:${C.gra}44;font-size:6pt">__:__</td><td style="text-align:center;color:${C.gra}44;font-size:6pt">__:__</td><td style="text-align:center;white-space:nowrap">${['mal', 'ok', 'bem'].map((t) => `<span style="font-size:5.6pt;color:${C.gra}88;margin:0 .6mm"><span style="display:inline-block;width:2.6mm;height:2.6mm;border-radius:50%;border:.28mm solid var(--ln);vertical-align:middle;margin-right:.4mm"></span>${t}</span>`).join('')}</td><td></td></tr>`).join('')}
    </table>
    ${box({ icon: 'Search', t: 'O que eu percebi', cor: 'ter', style: 'flex:0 0 auto', body: linhas(3) })}`,
  });
  if (modo === 'imp') b2.push({ key: 'b2-cc', sec: 'b2', raw: () => contracapa('Está tudo no papel. Pode descansar.') });

  /* ---------- BÔNUS 3 · DIÁRIO DA ANSIEDADE ---------- */
  const b3 = B.b3;
  b3.push({ key: 'b3-capa', sec: 'b3', anchor: true, raw: () => capaBonus(3, 'Diário da<br>Ansiedade', 'Registre o que se repete, o que aumenta a ansiedade e o que te ajuda. Conhecer o padrão é o começo do alívio.', ['#E2EDF6', '#A9C4DA', '#36678A', '#F8E3E6']) });
  b3.push({
    key: 'b3-como', sp: true, sec: 'b3', eb: 'Diário da Ansiedade', t: 'Conhecer o padrão <span class="gr">acalma</span>', sub: 'a ansiedade parece aleatória. quase nunca é.', body: () => `
    <p class="tx">Quando você registra os momentos de ansiedade por duas ou três semanas, começa a ver o que está por trás: <b>horários, situações, pessoas e pensamentos que se repetem</b>. E também o que realmente ajuda. Com isso, você deixa de ser pega(o) de surpresa.</p>
    <div class="g2" style="flex:0 0 auto">
      ${[['PenLine', 'Registre logo depois', 'Não precisa ser no meio da crise. Assim que der, anote o que lembrar.'], ['Scale', 'Sem julgamento', 'Você está observando, não se avaliando. Não existe registro errado.'], ['Repeat', 'Duas semanas', 'É o tempo mínimo para começar a perceber os padrões.'], ['Search', 'Revise no fim de semana', 'Use as páginas de gatilhos e termômetro para juntar as pistas.']].map(([i, t, d]) => `<div class="box b-cre" style="padding:2.6mm"><span style="color:var(--p)">${ic(i, 14)}</span><p style="font-weight:700;font-size:8.8pt;margin-top:1mm">${t}</p><p class="mini" style="font-size:7.6pt;margin-top:.4mm">${d}</p></div>`).join('')}
    </div>
    ${box({ icon: 'Activity', t: 'Escala de intensidade', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.6mm;margin-top:1.6mm">${[['0–2', 'tranquila', C.salBg], ['3–5', 'incômoda', C.salCl], ['6–8', 'forte', C.terCl], ['9–10', 'muito forte', C.ter]].map(([n, t, c]) => `<div style="background:${c};border-radius:2mm;padding:1.6mm;text-align:center"><p style="font-family:Mont;font-weight:700;font-size:9pt">${n}</p><p class="mini">${t}</p></div>`).join('')}</div>` })}
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center">${ic('Stethoscope', 18, C.ter)}<p style="font-size:7.4pt;line-height:1.45">Se você faz acompanhamento com psicóloga(o) ou médica(o), leve este diário para as consultas. Ele mostra em minutos o que levaria semanas para contar.</p></div>`,
  });
  const registro = () => `<div class="box b-white" style="flex:1;min-height:0;gap:1.6mm;padding:2.6mm 3mm">
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="display:flex;gap:3mm">${campo('Data', '13mm')}${campo('Hora', '10mm')}</span>${escala('', 0, 10)}</div>
    <div class="row" style="flex:1;min-height:0">
      <div class="col" style="min-height:0">
        <div class="box b-cre" style="padding:1.8mm 2.2mm;flex:1"><div class="bt" style="font-size:5.8pt">${ic('MapPin', 9)}<span>Onde / o que acontecia</span></div>${fill(5.8)}</div>
        <div class="box b-ter" style="padding:1.8mm 2.2mm;flex:1"><div class="bt" style="font-size:5.8pt">${ic('MessageCircle', 9)}<span>O que eu pensei</span></div>${fill(5.8)}</div>
      </div>
      <div class="col" style="min-height:0">
        <div class="box b-sal" style="padding:1.8mm 2.2mm;flex:0 0 auto"><div class="bt" style="font-size:5.8pt">${ic('HeartPulse', 9)}<span>No corpo</span></div>
          <div class="g2" style="gap:0 1mm;margin-top:.6mm">${['coração acelerado', 'aperto no peito', 'falta de ar', 'tensão', 'estômago', 'inquietação'].map((t) => `<span style="display:flex;align-items:center;gap:1mm;font-size:6pt;min-height:4.2mm"><span class="cb" style="width:2.6mm;height:2.6mm"></span>${t}</span>`).join('')}</div>
        </div>
        <div class="box b-line" style="padding:1.8mm 2.2mm;flex:1"><div class="bt" style="font-size:5.8pt">${ic('LifeBuoy', 9)}<span>O que fiz · o que ajudou</span></div>${fill(5.8)}</div>
      </div>
    </div>
  </div>`;
  b3.push({ key: 'b3-registro', sec: 'b3', eb: 'Registro', t: 'Momentos de ansiedade', sub: 'dois registros por página', refil: true, body: () => `${registro()}${registro()}` });
  b3.push({
    key: 'b3-gatilhos', sec: 'b3', eb: 'Depois de 2 semanas', t: 'Meus <span class="gr">gatilhos</span>', sub: 'junte as pistas dos seus registros', body: () => `
    <div class="g2" style="flex:1;min-height:0;grid-template-rows:1fr 1fr">
      ${[['MapPin', 'Situações', 'sal'], ['Clock', 'Horários e dias', 'cre'], ['Users', 'Pessoas e conversas', 'cre'], ['MessageCircle', 'Pensamentos que se repetem', 'ter']].map(([i, t, c]) => box({ icon: i, t, cor: c, body: fill() })).join('')}
    </div>
    ${box({ icon: 'Siren', t: 'Os primeiros sinais do meu corpo', s: 'o aviso antes da crise', cor: 'white', style: 'flex:0 0 auto', body: linhas(3) })}
    ${box({ icon: 'Lightbulb', t: 'O que eu posso fazer diferente', cor: 'dash', style: 'flex:0 0 auto', body: linhas(3) })}`,
  });
  b3.push({
    key: 'b3-ferramentas', sec: 'b3', eb: 'O que funciona para mim', t: 'Minha caixa de <span class="gr">ferramentas</span>', sub: 'anote o que já te ajudou. na crise, é só abrir aqui', body: () => `
    <div class="g2" style="flex:1;min-height:0;grid-template-rows:1fr 1fr">
      ${[['Zap', 'Em 2 minutos', 'sal', 'respirar 4-4-6 · água gelada no rosto'], ['Home', 'Em casa', 'cre', 'banho · música · arrumar algo pequeno'], ['Briefcase', 'No trabalho / na rua', 'cre', 'ir ao banheiro e respirar · caminhar'], ['MessageCircleHeart', 'Frases que me acalmam', 'ter', '“isso é ansiedade, vai passar”']].map(([i, t, c, e]) => box({ icon: i, t, cor: c, body: `<p class="hand" style="font-size:10pt;color:${C.gra}77;margin-top:.6mm">ex.: ${e}</p>${fill()}` })).join('')}
    </div>
    ${box({ icon: 'Phone', t: 'Posso ligar para', cor: 'white', style: 'flex:0 0 auto', body: `<div class="g2" style="gap:0 4mm">${Array.from({ length: 4 }, () => `<div class="chk cl"><span style="color:var(--t-tx)">${ic('User', 9)}</span><span class="ln"></span></div>`).join('')}</div><p class="mini" style="margin-top:1.4mm"><b>CVV 188</b> · 24h, gratuito, também por chat em cvv.org.br</p>` })}`,
  });
  b3.push({
    key: 'b3-termometro', sec: 'b3', eb: 'Semanal', t: 'Termômetro da semana', sub: 'marque a ansiedade média de cada dia e ligue os pontos', data: true, refil: true, body: () => `
    ${box({ icon: 'Thermometer', t: 'Ansiedade média do dia', cor: 'white', style: 'flex:0 0 auto', body: grafico7(52) })}
    <div class="row" style="flex:1;min-height:0">
      ${box({ icon: 'TrendingUp', t: 'Dia mais difícil e por quê', cor: 'ter', body: fill() })}
      ${box({ icon: 'TrendingDown', t: 'Dia mais leve e por quê', cor: 'sal', body: fill() })}
    </div>
    ${box({ icon: 'Lightbulb', t: 'Uma coisa que eu aprendi sobre mim', cor: 'cre', style: 'flex:.6', body: fill() })}`,
  });
  b3.push({
    key: 'b3-reformular', sec: 'b3', eb: 'Pensamentos', t: 'Pensamento → <span class="gr">nova perspectiva</span>', sub: 'não é pensar positivo. é pensar mais justo', refil: true, body: () => `
    <div class="box b-sal" style="flex:0 0 auto;padding:2.4mm 3mm"><p class="hand" style="font-size:10.5pt;color:var(--p)">“Vou ser demitida, fiz tudo errado.” → “Errei um detalhe. Posso corrigir e avisar. Isso não apaga o resto do meu trabalho.”</p></div>
    ${[1, 2, 3, 4].map(() => `<div class="row" style="flex:1;min-height:0;align-items:stretch">
      <div class="box b-ter" style="padding:2mm 2.4mm"><div class="bt" style="font-size:5.8pt">${ic('CloudRain', 9)}<span>O pensamento</span></div>${fill(5.8)}</div>
      <div style="flex:0 0 5mm;display:grid;place-items:center;color:var(--t-tx)">${ic('ArrowRight', 13)}</div>
      <div class="box b-cre" style="padding:2mm 2.4mm"><div class="bt" style="font-size:5.8pt">${ic('Sun', 9)}<span>Um jeito mais justo</span></div>${fill(5.8)}</div>
    </div>`).join('')}`,
  });
  if (modo === 'imp') b3.push({ key: 'b3-cc', sec: 'b3', raw: () => contracapa('Conhecer o padrão é o começo do alívio.') });

  /* ---------- BÔNUS 4 · KIT ROTINA SEM SOBRECARGA ---------- */
  const b4 = B.b4;
  b4.push({ key: 'b4-capa', sec: 'b4', anchor: true, raw: () => capaBonus(4, 'Kit Rotina<br>Sem Sobrecarga', 'Modelos simples de rotina para manhã, tarde e noite, com uma versão mínima para os dias difíceis.', ['#FBF0D4', '#E6CF95', '#87651B', '#F6E6DC']) });
  b4.push({
    key: 'b4-ideia', sp: true, sec: 'b4', eb: 'Kit Rotina', t: 'Rotina possível, <span class="gr">não perfeita</span>', sub: 'o segredo é ter duas versões de cada rotina', body: () => `
    <p class="tx">Rotinas perfeitas quebram no primeiro dia ruim, e aí vem a culpa e o “recomeço na segunda”. Aqui cada rotina tem <b>duas versões</b>: a <b>completa</b>, para os dias bons, e a <b>mínima</b>, para os dias pesados. Fazer a mínima <b>conta como fazer</b>.</p>
    <div class="row" style="flex:0 0 auto">
      <div class="box b-sal"><div class="bt">${ic('Sun', 11)}<span>Versão completa</span></div><p class="mini" style="font-size:7.9pt;margin-top:1mm">Dias com energia. Exemplo de manhã: acordar, água, alongar 5 min, café com calma, método do dia, banho.</p></div>
      <div class="box b-ter"><div class="bt">${ic('CloudSun', 11)}<span>Versão mínima</span></div><p class="mini" style="font-size:7.9pt;margin-top:1mm">Dias difíceis. No máximo 3 itens: água, remédio, escolher 1 prioridade. Pronto.</p></div>
    </div>
    ${box({ icon: 'ListChecks', t: 'Como montar a sua', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:1.6mm;margin-top:1.6mm">${['Comece pelo que você já faz. Rotina boa nasce do real, não do ideal.', 'Coloque no máximo 6 itens na versão completa e 3 na mínima.', 'Use gatilhos: “depois do café, eu…”. Hábito grudado em hábito.', 'Teste por uma semana e ajuste. Rotina é rascunho, não contrato.'].map((t, i) => `<div style="display:flex;gap:2.4mm;align-items:flex-start"><span class="num" style="flex-shrink:0">${i + 1}</span><p style="font-size:8.6pt">${t}</p></div>`).join('')}</div>` })}
    ${box({ icon: 'LifeBuoy', t: 'Rotina de emergência', s: 'para os piores dias', cor: 'pet', body: `<div class="g2" style="gap:1mm 4mm;margin-top:1.4mm;font-size:7.4pt">${['beber água', 'comer alguma coisa', 'tomar o remédio, se houver', 'tomar um banho ou ar fresco', 'uma tarefa pequena', 'deitar mais cedo'].map((t) => `<p style="display:flex;gap:1.4mm;align-items:center"><span class="cb" style="border-color:${C.cre};background:transparent"></span>${t}</p>`).join('')}</div>` })}`,
  });
  const rotina = (periodo, icon, ex) => () => `
    <div class="row" style="flex:0 0 auto;align-items:flex-end">${campo('Começa às', '14mm')}${campo('Gatilho: depois de', '30mm')}</div>
    ${box({ icon: 'Sun', t: 'Versão completa', s: 'dias com energia', cor: 'sal', cls: 'grow', style: 'flex:1.3', body: fill(6.6, 'ck min') })}
    ${box({ icon: 'CloudSun', t: 'Versão mínima', s: 'dias pesados · até 3 itens', cor: 'ter', style: 'flex:0 0 auto', body: `<div style="margin-top:.6mm">${chkLinha(3)}</div>` })}
    ${box({ icon: 'Lightbulb', t: 'Ideias', cor: 'cre', style: 'flex:0 0 auto', body: `<p class="mini" style="font-size:7pt;margin-top:.8mm">${ex}</p>` })}
    ${box({ icon: 'CalendarCheck', t: 'Esta semana eu fiz', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1.4mm;margin-top:1.6mm">${['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d) => `<div style="text-align:center"><p class="lbl" style="font-size:5.6pt">${d}</p><p style="display:flex;justify-content:center;gap:.8mm;margin-top:.6mm"><span title="completa" style="width:3.2mm;height:3.2mm;border-radius:50%;border:.3mm solid var(--ln)"></span><span style="width:3.2mm;height:3.2mm;border-radius:50%;border:.3mm solid ${C.ter}"></span></p></div>`).join('')}</div><p class="mini" style="margin-top:1mm">verde = completa · terracota = mínima. As duas contam.</p>` })}`;
  b4.push({ key: 'b4-manha', sec: 'b4', eb: 'Kit Rotina', t: 'Minha manhã', sub: 'começar o dia sem já começar atrasada(o)', refil: true, body: rotina('manhã', 'Sunrise', 'beber água antes do celular · abrir a janela · alongar 3 min · café sentada(o) · Mente em 3 Lugares · escolher a roupa na véspera') });
  b4.push({ key: 'b4-tarde', sec: 'b4', eb: 'Kit Rotina', t: 'Minha tarde', sub: 'uma pausa no meio do dia para não chegar à noite no limite', refil: true, body: rotina('tarde', 'Sun', 'almoçar longe da tela · 5 min de caminhada · conferir as 3 prioridades · lanche · respirar 4-4-6 · beber água') });
  b4.push({ key: 'b4-noite', sec: 'b4', eb: 'Kit Rotina', t: 'Minha noite', sub: 'desacelerar de verdade antes de dormir', refil: true, body: rotina('noite', 'Moon', 'ritual Desligando a Cabeça · banho morno · preparar a bolsa · luz baixa · celular fora do quarto · leitura leve') });
  b4.push({
    key: 'b4-semana', sec: 'b4', eb: 'Kit Rotina', t: 'Minha semana <span class="gr">em um olhar</span>', sub: 'o que se repete em cada dia, sem precisar lembrar', refil: true, body: () => `
    <div style="display:grid;grid-template-columns:15mm repeat(3,1fr);grid-template-rows:auto repeat(7,1fr);gap:1.2mm;flex:1;min-height:0">
      <span></span>${[['Manhã', 'Sunrise', C.salBg], ['Tarde', 'Sun', C.cre], ['Noite', 'Moon', C.terCl]].map(([t, i, c]) => `<div style="background:${c};border-radius:2mm;padding:1.2mm;display:flex;align-items:center;justify-content:center;gap:1mm;font-family:Mont;font-weight:700;font-size:6.4pt;letter-spacing:.08em;text-transform:uppercase;color:var(--p)">${ic(i, 9)}${t}</div>`).join('')}
      ${semanaDias.map((d) => `<div style="display:flex;align-items:center;font-family:Mont;font-weight:700;font-size:6.6pt;color:var(--p)">${d}</div>${[0, 1, 2].map(() => `<div style="border:.3mm solid ${C.creEsc};border-radius:2mm;background:#fff"></div>`).join('')}`).join('')}
    </div>
    ${box({ icon: 'Home', t: 'Casa sem sobrecarga', s: 'uma tarefa pequena por dia, e só', cor: 'sal', style: 'flex:0 0 auto', body: `<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1.4mm;margin-top:1.4mm">${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => `<div><p class="lbl" style="font-size:5.6pt;text-align:center">${d}</p><div style="height:9mm;border-radius:1.6mm;background:#fff;margin-top:.6mm"></div></div>`).join('')}</div>` })}`,
  });
  if (modo === 'imp') b4.push({ key: 'b4-cc', sec: 'b4', raw: () => contracapa('Rotina possível, não perfeita.') });

  return B;
}
