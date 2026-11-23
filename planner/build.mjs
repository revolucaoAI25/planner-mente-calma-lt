// Gera todos os PDFs do Planner Mente Calma.
// Uso: node planner/build.mjs   (precisa de Playwright/Chromium e Python com pypdf)
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { CSS, FILL_JS, C, ic, mark } from './src/ui.mjs';
import { SECOES, planner, bonus, mantra } from './src/paginas.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const TMP = path.join(DIR, '.build');
const OUT = path.join(DIR, 'dist');
fs.mkdirSync(TMP, { recursive: true });
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

/* ---------- montagem de um documento ---------- */
function montar(pags, modo, { secoes, titulo, numerar = true }) {
  const pn = {};
  pags.forEach((p, i) => (pn[p.key] ??= i + 1));
  const anc = {};
  pags.forEach((p) => {
    if (p.anchor && !anc[p.sec]) anc[p.sec] = p.key;
  });
  pags.forEach((p) => (anc[p.sec] ??= p.key));
  const x = { pn: (k) => pn[k] ?? '?', modo };

  const tabs = (sec) =>
    `<nav class="tabs">${secoes
      .map((s) => `<a href="#p-${anc[s]}" class="tab ${SECOES[s].bonus ? 'bn' : ''} ${s === sec ? 'on' : ''}" style="--tc:${SECOES[s].cor}"><span>${SECOES[s].nome}</span></a>`)
      .join('')}</nav>`;

  const html = pags
    .map((p, i) => {
      const lado = (i + 1) % 2 ? 'r' : 'l';
      const cor = SECOES[p.sec].cor;
      const id = `id="p-${p.key}"`;
      if (p.raw) {
        const comTabs = modo === 'dig' && p.key !== 'capa';
        return `<section ${id} class="pg ${modo} ${lado}">${p.raw(x)}${comTabs ? tabs(p.sec) : ''}</section>`;
      }
      const voltar = p.voltar || (SECOES[p.sec].bonus ? anc[p.sec] : 'indice');
      const rodapeEsq = modo === 'dig'
        ? `<a class="vi" href="#p-${voltar}">${ic('ChevronLeft', 9)}${p.voltar ? 'Jornada' : SECOES[p.sec].bonus ? 'Início do bônus' : 'Índice'}</a>`
        : numerar ? `<span class="pn">${i + 1}</span>` : '<span></span>';
      return `<section ${id} class="pg ${modo} ${lado}" style="--c:${cor}">
  <div class="ct">
    <header class="hd">
      <div><p class="eb">${p.eb || SECOES[p.sec].nome}</p><h1>${p.t}</h1>${p.sub ? `<p class="sub">${p.sub}</p>` : ''}</div>
      <div class="hd-r">${p.data ? `<span class="data">${ic('Calendar', 9)}<i></i>/<i></i>/<i></i></span>` : mark(22)}</div>
    </header>
    <div class="bd${p.sp ? ' sp' : ''}">${p.body(x)}</div>
    <footer class="ft">${rodapeEsq}<span class="mt">${mantra(i)}</span><span class="lg">${p.data ? mark(13) : ''}<span>PLANNER MENTE CALMA</span></span></footer>
  </div>
  ${modo === 'dig' ? tabs(p.sec) : ''}
</section>`;
    })
    .join('\n');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${titulo}</title><style>${CSS}</style></head><body>${html}</body></html>`;
}

let browser;
async function pdf(nome, html, { largura = '148mm', altura = '210mm', png = false } = {}) {
  const f = path.join(TMP, nome.replace(/[^\w-]+/g, '_') + '.html');
  fs.writeFileSync(f, html);
  const page = await browser.newPage();
  await page.goto('file://' + f, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ content: FILL_JS });
  await page.waitForFunction(() => document.body.dataset.pronto === '1');
  const destino = path.join(TMP, nome + '.pdf');
  await page.pdf({ path: destino, width: largura, height: altura, printBackground: true, preferCSSPageSize: false, tagged: false, outline: false });
  if (png) {
    // prévias das páginas (site e revisão)
    await page.setViewportSize({ width: 560, height: 794 });
    const n = await page.evaluate(() => document.querySelectorAll('.pg').length);
    fs.mkdirSync(path.join(TMP, 'png', nome), { recursive: true });
    for (let i = 0; i < n; i++) {
      const el = (await page.$$('.pg'))[i];
      await el.screenshot({ path: path.join(TMP, 'png', nome, String(i + 1).padStart(3, '0') + '.png') });
    }
  }
  await page.close();
  return destino;
}

/** Completa com páginas de notas até dar número par (a contracapa fica sempre no verso da última folha). */
function parear(pags, sec) {
  if (pags.length % 2 === 0) return pags;
  const nota = { key: `${sec}-notas-extra`, sec, eb: 'Notas', t: 'Anotações', data: true, body: () => `<div style="flex:1;display:flex;flex-direction:column"><div class="fill" data-h="7"></div></div>` };
  const ult = pags[pags.length - 1];
  return ult.raw ? [...pags.slice(0, -1), nota, ult] : [...pags, nota];
}

const py = (...a) => execFileSync('python3', ['-I', path.join(DIR, 'impor.py'), ...a], { stdio: 'inherit' });

(async () => {
  browser = await chromium.launch();
  const previa = process.argv.includes('--png');
  const NOMES = {
    planner: 'Planner Mente Calma',
    b1: 'Bonus 1 - SOS Mente Acelerada',
    b2: 'Bonus 2 - Desligando a Cabeca Antes de Dormir',
    b3: 'Bonus 3 - Diario da Ansiedade',
    b4: 'Bonus 4 - Kit Rotina Sem Sobrecarga',
  };

  // ---------- TABLET (tudo em um arquivo, com abas clicáveis) ----------
  const dig = planner('dig');
  const bd = bonus('dig');
  const tudo = [...dig, ...bd.b1, ...bd.b2, ...bd.b3, ...bd.b4];
  const tab = await pdf('tablet', montar(tudo, 'dig', { secoes: Object.keys(SECOES), titulo: 'Planner Mente Calma · Tablet' }), { png: previa });
  fs.copyFileSync(tab, path.join(OUT, 'Planner Mente Calma - TABLET (com abas e 4 bonus).pdf'));

  // ---------- marcas de corte (A4 deitada) ----------
  const MARCAS = await pdf('marcas', `<!doctype html><html><head><style>@page{size:297mm 210mm;margin:0}body{margin:0}</style></head><body><div style="position:relative;width:297mm;height:210mm"><div style="position:absolute;left:148.35mm;top:0;bottom:0;width:0;border-left:.3mm dashed #9aa9a3"></div></div></body></html>`, { largura: '297mm', altura: '210mm' });

  // ---------- IMPRESSÃO A5 + A4 2 por folha ----------
  const bi = bonus('imp');
  const docs = { planner: parear(planner('imp'), 'notas'), b1: parear(bi.b1, 'b1'), b2: parear(bi.b2, 'b2'), b3: parear(bi.b3, 'b3'), b4: parear(bi.b4, 'b4') };
  for (const [k, pags] of Object.entries(docs)) {
    const secs = [...new Set(pags.map((p) => p.sec))];
    const a5 = await pdf(`a5-${k}`, montar(pags, 'imp', { secoes: secs, titulo: NOMES[k] }), { png: previa });
    fs.copyFileSync(a5, path.join(OUT, `${NOMES[k]} - A5 (grafica ou impressora A5).pdf`));
    py('cortar', a5, MARCAS, path.join(OUT, `${NOMES[k]} - A4 2 por folha (frente e verso, cortar ao meio).pdf`));
  }

  // ---------- REFIS (A4, cada folha = 2 cópias, frente e verso) ----------
  const todas = [...planner('imp'), ...bi.b1, ...bi.b2, ...bi.b3, ...bi.b4];
  const por = Object.fromEntries(todas.map((p) => [p.key, p]));
  const PARES = [
    ['tpl-metodo', 'tpl-dia'], ['tpl-metodo', 'tpl-metodo'], ['tpl-dia', 'tpl-dia'], ['tpl-semana', 'tpl-revisao'], ['tpl-preoc', 'tpl-horario'], ['tpl-acelerada', 'tpl-acelerada'],
    ['tpl-habitos', 'tpl-sono'], ['tpl-contas', 'tpl-dinheiro'], ['tpl-recomeco', 'tpl-pautada'], ['tpl-pautada', 'tpl-pontilhada'],
    ['b1-sos', 'b1-ancora'], ['b1-fato', 'b1-sos'], ['b2-noite', 'b2-noite'], ['b2-madrugada', 'b2-sono'], ['b3-registro', 'b3-registro'],
    ['b3-termometro', 'b3-reformular'], ['b4-manha', 'b4-tarde'], ['b4-noite', 'b4-semana'],
  ];
  const refPags = PARES.flatMap(([a, b], i) => [{ ...por[a], key: `r${i}a` }, { ...por[b], key: `r${i}b` }]);
  const ref = await pdf('refis', montar(refPags, 'imp', { secoes: [], titulo: 'Refis', numerar: false }));
  py('refil', ref, MARCAS, path.join(OUT, 'Refis - paginas do dia a dia (A4, 2 copias por folha).pdf'));

  // ---------- Guia e teste de impressão ----------
  const guia = fs.readFileSync(path.join(DIR, 'src', 'guia.html'), 'utf8').replace('/*CSS*/', () => CSS).replace(/\{\{MARK\}\}/g, () => mark(40));
  const g = await pdf('guia', guia, { largura: '210mm', altura: '297mm' });
  fs.copyFileSync(g, path.join(OUT, 'LEIA PRIMEIRO - Guia de impressao e uso no tablet.pdf'));
  const teste = fs.readFileSync(path.join(DIR, 'src', 'teste.html'), 'utf8').replace('/*CSS*/', () => CSS);
  const t = await pdf('teste', teste);
  py('cortar', t, MARCAS, path.join(OUT, 'Teste de impressao frente e verso (1 folha).pdf'));

  await browser.close();
  console.log('PDFs gerados em', OUT);
  for (const f of fs.readdirSync(OUT)) console.log(' ·', f, (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + ' KB');
})();
