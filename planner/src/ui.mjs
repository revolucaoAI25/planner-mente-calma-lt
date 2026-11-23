// Componentes visuais do Planner Mente Calma (HTML -> PDF pelo Chromium).
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as L from 'lucide-react';

export const C = {
  pet: '#315F5A', petEsc: '#234743', sal: '#A8BDB0', salEsc: '#5E8577', salBg: '#EAF1EC', salCl: '#D6E2DA',
  cre: '#F7F4ED', creEsc: '#EFE9DC', gra: '#263431', ter: '#D7A58D', terEsc: '#B5694A', terCl: '#F6E6DC',
};

/** Ícone lucide em SVG. */
export const ic = (n, s = 12, c = 'currentColor', w = 2) => {
  if (!L[n]) throw new Error('Ícone inexistente: ' + n);
  return renderToStaticMarkup(createElement(L[n], { size: s, color: c, strokeWidth: w }));
};

/** Símbolo da marca. */
export const mark = (w = 30, light = false) => {
  const ring = light ? C.cre : C.pet, a = light ? C.cre : '#6E9488', b = light ? 'rgba(247,244,237,.75)' : C.sal, c = light ? C.cre : '#D08A68';
  return `<svg width="${w}" height="${w * 0.84}" viewBox="0 0 120 100" fill="none" style="display:block"><path d="M86 18.5 A44 44 0 1 0 86 81.5" stroke="${ring}" stroke-width="5.5" stroke-linecap="round"/><path d="M7 40 C26 40 34 58 50 58 C58 58 62 50 70 50 H112" stroke="${b}" stroke-width="5" stroke-linecap="round"/><path d="M7 58 C26 58 34 40 50 40 C56 40 60 40 70 40 H112" stroke="${a}" stroke-width="5" stroke-linecap="round"/><path d="M9 67 C28 67 36 52 50 54 C58 55 62 60 70 60 H112" stroke="${c}" stroke-width="5" stroke-linecap="round"/></svg>`;
};

/** Ondas da capa (mesma linguagem do brand board). */
export const ondas = (ordem = ['creEsc', 'sal', 'pet', 'ter']) => {
  const [a, b, c, d] = ordem.map((k) => C[k] || k);
  return `<svg viewBox="0 0 560 300" preserveAspectRatio="none" style="position:absolute;left:0;bottom:0;width:100%;height:36%">
  <path d="M0 70 C110 20 210 40 300 75 S470 130 560 60 V300 H0Z" fill="${a}"/>
  <path d="M0 140 C90 95 200 95 290 135 S460 190 560 120 V300 H0Z" fill="${b}"/>
  <path d="M0 175 C120 150 210 200 300 210 S470 175 560 205 V300 H0Z" fill="${c}"/>
  <path d="M170 300 C250 240 330 215 420 225 S530 250 560 238 V300Z" fill="${d}"/>
</svg>`;
};

/** Linhas de escrita que preenchem o espaço livre (completadas no navegador, antes de gerar o PDF). */
export const fill = (h = 6.6, cls = '') => `<div class="fill ${cls}" data-h="${h}"></div>`;
export const dots = (h = 5) => `<div class="dotfill" data-h="${h}"></div>`;
export const linhas = (n, h = 6.6) => `<div class="lns" style="--lh:${h}mm">${'<i></i>'.repeat(n)}</div>`;

/** Caixa com título. cor: sal | ter | cre | pet | line | white */
export const box = ({ t = '', s = '', icon = '', cor = 'sal', body = '', cls = '', style = '', num = '' }) => `
<div class="box b-${cor} ${cls}" style="${style}">
  ${t ? `<div class="bt">${num ? `<span class="num">${num}</span>` : ''}${icon ? `<span class="bi">${ic(icon, 10.5)}</span>` : ''}<span>${t}</span>${s ? `<em>${s}</em>` : ''}</div>` : ''}
  ${body}
</div>`;

/** Escala 0 a 10. */
export const escala = (rotulo = '', min = 0, max = 10, extremos = ['', ''], marcado = -1) => `
<div class="esc">${rotulo ? `<span class="er">${rotulo}</span>` : ''}
  <span class="eo">${extremos[0] ? `<small>${extremos[0]}</small>` : ''}${Array.from({ length: max - min + 1 }, (_, i) => `<b${i + min === marcado ? ' class="sel"' : ''}>${i + min}</b>`).join('')}${extremos[1] ? `<small>${extremos[1]}</small>` : ''}</span>
</div>`;

export const chk = (t = '', cls = '') => `<div class="chk ${cls}"><span class="cb"></span><span class="ct2">${t}</span></div>`;
export const chkLinha = (n, cls = '') => Array.from({ length: n }, () => `<div class="chk cl ${cls}"><span class="cb"></span><span class="ln"></span></div>`).join('');
export const campo = (r, w = '') => `<span class="campo"><span>${r}</span><i style="${w ? `width:${w}` : ''}"></i></span>`;
export const dataCampo = () => `<span class="data">${ic('Calendar', 9)}<i></i>/<i></i>/<i></i></span>`;
export const hand = (t, cls = '') => `<span class="hand ${cls}">${t}</span>`;
export const chip = (t, cor = 'pet') => `<span class="chip c-${cor}">${t}</span>`;

export const CSS = /* css */ `
@font-face{font-family:Mont;src:url(../fontes/montserrat.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:Jak;src:url(../fontes/plus-jakarta-sans-latin-wght-normal.woff2) format('woff2');font-weight:200 800;font-style:normal}
@font-face{font-family:Jak;src:url(../fontes/plus-jakarta-sans-latin-wght-italic.woff2) format('woff2');font-weight:200 800;font-style:italic}
@font-face{font-family:Hand;src:url(../fontes/caveat-latin-500-normal.woff2) format('woff2');font-weight:500}
@font-face{font-family:Hand;src:url(../fontes/caveat-latin-ext-500-normal.woff2) format('woff2');font-weight:500;unicode-range:U+0100-02AF}
@page{size:148mm 210mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Jak;font-weight:450;color:${C.gra};font-size:8.4pt;line-height:1.42}
b,strong{font-weight:700}
a{color:inherit;text-decoration:none}
.pg{width:148mm;height:210mm;position:relative;overflow:hidden;break-after:page;background:#fff}
.pg.dig{background:#FBF9F4}
.ct{position:absolute;top:11mm;bottom:9mm;display:flex;flex-direction:column}
.imp.r .ct{left:14mm;right:9mm}
.imp.l .ct{left:9mm;right:14mm}
.dig .ct{top:9mm;bottom:8mm;left:9mm;right:18.5mm}
.hd{display:flex;justify-content:space-between;align-items:flex-start;gap:4mm;padding-bottom:2.6mm;margin-bottom:3mm;border-bottom:.35mm solid ${C.creEsc}}
.eb{font-family:Mont;font-weight:700;font-size:6.2pt;letter-spacing:.24em;text-transform:uppercase;color:var(--c)}
h1{font-family:Mont;font-weight:700;font-size:16.5pt;line-height:1.08;letter-spacing:-.01em;color:${C.gra};margin-top:1mm}
h1 .gr{background:linear-gradient(transparent 58%, ${C.terCl} 58%, ${C.terCl} 92%, transparent 92%)}
.sub{font-style:italic;color:${C.gra}b3;font-size:8pt;margin-top:.8mm}
.hd-r{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:1.6mm;padding-top:.6mm}
.data{display:inline-flex;align-items:flex-end;gap:.8mm;font-family:Mont;font-weight:600;font-size:8pt;color:${C.gra}80}
.data svg{margin-right:.6mm;align-self:center}
.data i{display:inline-block;width:5.4mm;border-bottom:.3mm solid ${C.gra}55;height:4mm}
.bd{flex:1;min-height:0;display:flex;flex-direction:column;gap:2.8mm}
.ft{display:flex;align-items:center;justify-content:space-between;margin-top:2.4mm;font-size:6.2pt;color:${C.gra}80;font-family:Mont;font-weight:600;letter-spacing:.06em}
.l .ft{flex-direction:row-reverse}
.ft .pn{font-size:7pt;color:${C.gra}aa}
.ft .mt{font-family:Jak;font-style:italic;font-weight:450;letter-spacing:0;font-size:6.6pt}
.ft .lg{display:flex;align-items:center;gap:1.2mm}
.ft a.vi{display:inline-flex;align-items:center;gap:1mm;padding:.8mm 2.2mm;border-radius:10mm;background:${C.creEsc};color:${C.pet}}
/* abas do tablet */
.tabs{position:absolute;right:0;top:8mm;bottom:8mm;width:11.5mm;display:flex;flex-direction:column;gap:.9mm}
.tab{flex:1;display:flex;align-items:center;justify-content:center;border-radius:2.6mm 0 0 2.6mm;background:${C.creEsc};color:${C.gra}99;font-family:Mont;font-weight:700;font-size:5.4pt;letter-spacing:.08em;text-transform:uppercase}
.tab span{writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap}
.tab.on{background:var(--tc);color:#fff;margin-left:-1.6mm}
.tab.bn{background:${C.terCl};color:${C.terEsc}}
.tab.bn.on{background:var(--tc);color:#fff}
.tab.home{flex:0 0 9mm;background:${C.pet};color:#fff}
/* caixas */
.box{border-radius:3mm;padding:2.6mm 3mm 2.8mm;display:flex;flex-direction:column;min-height:0}
.b-sal{background:${C.salBg}}.b-ter{background:${C.terCl}}.b-cre{background:${C.cre}}.b-white{background:#fff;border:.3mm solid ${C.creEsc}}
.dig .b-cre{background:${C.creEsc}99}
.b-line{border:.35mm solid ${C.sal};background:transparent}
.b-dash{border:.35mm dashed ${C.terEsc}99}
.b-pet{background:${C.pet};color:${C.cre}}
.bt{display:flex;align-items:center;gap:1.4mm;font-family:Mont;font-weight:700;font-size:6.7pt;letter-spacing:.12em;text-transform:uppercase;color:${C.pet}}
.b-ter .bt,.b-dash .bt{color:${C.terEsc}}
.b-pet .bt{color:${C.cre}}
.bt em{font-family:Jak;font-weight:450;font-style:italic;text-transform:none;letter-spacing:0;font-size:7pt;color:${C.gra}99;margin-left:auto}
.b-pet .bt em{color:${C.cre}b3}
.bi{display:inline-grid;place-items:center;width:4.6mm;height:4.6mm;border-radius:50%;background:#fff;color:${C.pet}}
.b-ter .bi{color:${C.terEsc}}
.num{display:inline-grid;place-items:center;width:4.6mm;height:4.6mm;border-radius:50%;background:${C.pet};color:#fff;font-size:6.6pt;letter-spacing:0}
.b-ter .num,.b-dash .num{background:${C.terEsc}}
.grow{flex:1}
.fill{flex:1;min-height:6mm}
.fill i,.lns i{display:block;height:var(--lh,6.6mm);border-bottom:.25mm solid ${C.gra}2e}
.b-pet .fill i{border-color:${C.cre}55}
.dotfill{flex:1;min-height:5mm}
.row{display:flex;gap:2.6mm}.row>*{flex:1;min-width:0}
.col{display:flex;flex-direction:column;gap:2.6mm}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:2.6mm}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2.2mm}
p.tx{font-size:8.4pt;line-height:1.5;color:${C.gra}dd}
p.tx+p.tx{margin-top:1.6mm}
.mini{font-size:6.8pt;color:${C.gra}99;line-height:1.35}
.it{font-style:italic}
.esc{display:flex;align-items:center;gap:2mm;font-size:7pt}
.er{font-family:Mont;font-weight:700;font-size:6.4pt;letter-spacing:.06em;color:${C.gra}aa;white-space:nowrap}
.eo{display:flex;align-items:center;gap:.9mm}
.eo b{display:inline-grid;place-items:center;width:4.4mm;height:4.4mm;border-radius:50%;border:.3mm solid ${C.sal};font-family:Mont;font-size:5.8pt;font-weight:600;color:${C.gra}aa;background:#fff}
.eo small{font-size:5.8pt;color:${C.gra}88;font-style:italic}
.chk{display:flex;align-items:center;gap:1.8mm;min-height:6mm;font-size:8pt}
.cb{flex-shrink:0;width:3.3mm;height:3.3mm;border:.35mm solid ${C.pet};border-radius:.9mm;background:#fff}
.chk.cl .ln{flex:1;border-bottom:.25mm solid ${C.gra}2e;align-self:flex-end;margin-bottom:1.2mm}
.chk.cl{min-height:6.6mm}
.campo{display:inline-flex;align-items:flex-end;gap:1.4mm;font-size:7.4pt;color:${C.gra}b3}
.campo i{display:inline-block;width:22mm;border-bottom:.25mm solid ${C.gra}55;height:3.6mm}
.hand{font-family:Hand;font-weight:500;color:#2F5D8A;font-size:12.5pt;line-height:1.05}
.eo b.sel{border:.55mm solid #2F5D8A;color:#2F5D8A;transform:rotate(-8deg) scale(1.12);border-radius:46% 54% 50% 50%}
.bd.sp{justify-content:space-between}
.bd.sp p.tx{font-size:8.9pt}
.fill.hora i,.fill.dt i,.fill.rs i,.fill.ck i{display:flex;align-items:flex-end}
.fill.hora i::before{content:'__h';width:8mm;flex-shrink:0;align-self:stretch;border-right:.25mm solid ${C.gra}24;display:flex;align-items:flex-end;font-size:6pt;color:${C.gra}66;padding-bottom:.6mm}
.fill.dt i::before{content:'';width:7mm;flex-shrink:0;align-self:stretch;border-right:.25mm solid ${C.gra}24}
.fill.rs i::after{content:'R$';margin-left:auto;width:13mm;flex-shrink:0;font-size:6pt;color:${C.gra}66;padding-bottom:.6mm}
.fill.ck i::before{content:'';width:3.3mm;height:3.3mm;flex-shrink:0;border:.35mm solid ${C.pet};border-radius:.9mm;background:#fff;margin:0 1.8mm 1mm 0}
.fill.ck.min i::after{content:'__ min';margin-left:auto;font-size:6pt;color:${C.gra}66;padding-bottom:.6mm}
.ac .chk{font-size:7.3pt;line-height:1.2}
.chip{display:inline-block;padding:.6mm 2.2mm;border-radius:10mm;font-family:Mont;font-weight:700;font-size:6pt;letter-spacing:.14em;text-transform:uppercase}
.c-pet{background:${C.pet};color:#fff}.c-ter{background:${C.terEsc};color:#fff}.c-sal{background:${C.salBg};color:${C.pet}}.c-cre{background:${C.creEsc};color:${C.gra}}
.h2{font-family:Mont;font-weight:700;font-size:10pt;color:${C.gra};line-height:1.2}
.lbl{font-family:Mont;font-weight:700;font-size:6.3pt;letter-spacing:.12em;text-transform:uppercase;color:${C.gra}88}
table.tb{width:100%;border-collapse:collapse;font-size:7pt}
table.tb th{font-family:Mont;font-weight:700;font-size:5.9pt;letter-spacing:.1em;text-transform:uppercase;color:${C.pet};text-align:left;padding:1.2mm 1.4mm;background:${C.salBg}}
table.tb th:first-child{border-radius:2mm 0 0 2mm}table.tb th:last-child{border-radius:0 2mm 2mm 0}
table.tb td{border-bottom:.25mm solid ${C.gra}24;padding:0 1.4mm}
.quote{font-family:Mont;font-weight:600;font-size:8.6pt;color:${C.pet};text-align:center;line-height:1.35}
.sep{height:.35mm;background:${C.creEsc};border-radius:1mm}
`;

/** Script que roda no navegador: completa linhas/pontos conforme o espaço disponível. */
export const FILL_JS = `
(() => {
  const mm = 96 / 25.4;
  document.querySelectorAll('.fill').forEach((el) => {
    const h = parseFloat(el.dataset.h) * mm;
    const n = Math.max(1, Math.floor((el.getBoundingClientRect().height + 0.5) / h));
    el.style.setProperty('--lh', el.dataset.h + 'mm');
    el.innerHTML = '<i></i>'.repeat(n);
    el.style.flex = '1 1 auto';
  });
  document.querySelectorAll('.dotfill').forEach((el) => {
    const r = el.getBoundingClientRect(), s = parseFloat(el.dataset.h) * mm;
    const cols = Math.floor(r.width / s), rows = Math.floor(r.height / s);
    const ox = (r.width - (cols - 1) * s) / 2, oy = (r.height - (rows - 1) * s) / 2;
    let c = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) c += '<circle cx="' + (ox + x * s).toFixed(1) + '" cy="' + (oy + y * s).toFixed(1) + '" r="0.75"/>';
    el.innerHTML = '<svg width="' + r.width + '" height="' + r.height + '" fill="#26343155" style="display:block">' + c + '</svg>';
  });
  document.body.dataset.pronto = '1';
})();`;
