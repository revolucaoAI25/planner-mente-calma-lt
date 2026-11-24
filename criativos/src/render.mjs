// Gera os vídeos de demonstração do Planner Mente Calma com as PÁGINAS REAIS do PDF.
// Uso: node src/render.mjs [id ...]   (sem id = todos)
// Saída: inserts/<id>-tela.mp4 (só a tela, 3:4, para colocar dentro do tablet)
//        inserts/<id>-vertical.mp4 (9:16, tablet pronto sobre fundo da marca)
import { createRequire } from 'node:module';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CLIPS } from './clips.mjs';

const require = createRequire('/home/user/geladinho-de-drink/materiais/');
const { chromium } = require('playwright');
const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const FPS = 30;

const html = (modo) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Caveat;src:url(caveat-latin-500-normal.woff2) format('woff2'),url(caveat-latin-ext-500-normal.woff2) format('woff2')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${modo === 'tela' ? 1080 : 1080}px;height:${modo === 'tela' ? 1440 : 1920}px;overflow:hidden;background:#F2EEE5}
#palco{position:absolute;inset:0;background:radial-gradient(120% 70% at 50% 0%,#FBF9F4,#EFE9DC 70%,#E6DCCB)}
#tablet{position:absolute;left:${(1080 - 900) / 2}px;top:${(1920 - 1200) / 2 - 40}px;width:900px;height:1200px;border-radius:58px;background:#16181a;padding:30px;box-shadow:0 40px 90px rgba(38,52,49,.35),0 8px 20px rgba(38,52,49,.25),inset 0 0 0 2px #2b2e31}
#tela{position:relative;width:1080px;height:1440px;overflow:hidden;background:#FBF9F4;transform-origin:0 0}
.modo-v #tela{transform:scale(${840 / 1080});border-radius:${30 / (840 / 1080)}px}
#cam{position:absolute;left:0;top:0;width:1080px;height:1440px;transform-origin:0 0}
.pagina{position:absolute;left:0;top:0;width:1080px;height:1440px;display:flex;justify-content:center;background:#FBF9F4}
.pagina img{height:1440px;width:auto;display:block}
.esc{position:absolute;font-family:Caveat;font-weight:500;color:#26386a;white-space:nowrap;line-height:1}
.marca{position:absolute;border-radius:14px;border:5px solid #B5694A;box-shadow:0 0 0 6px rgba(181,105,74,.18),0 0 26px rgba(181,105,74,.35)}
.caneta{position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #263431;box-shadow:0 2px 6px rgba(0,0,0,.35);transform:translate(-4px,-14px)}
</style></head><body class="${modo === 'tela' ? '' : 'modo-v'}">
${modo === 'tela' ? '<div id="tela"><div id="cam"></div></div>' : '<div id="palco"></div><div id="tablet"><div id="tela"><div id="cam"></div></div></div>'}
<script>
const PT = 1440 / 595.92;            // px por ponto do PDF (página encaixada pela altura)
const OX = (1080 - 420 * PT) / 2;    // margem lateral da página dentro da tela
const ease = (x) => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerp = (a, b, p) => a + (b - a) * p;
let C;
function montar(clip) {
  C = clip;
  const cam = document.getElementById('cam');
  cam.innerHTML = '';
  clip.paginas.forEach((p, i) => {
    const d = document.createElement('div'); d.className = 'pagina'; d.id = 'pg' + i;
    d.style.background = p.src === 'p01' ? '#F7F4ED' : '#FBF9F4';
    d.innerHTML = '<img src="pag/' + p.src + '.png">';
    (clip.escritas || []).filter((e) => e.pg === i).forEach((e, j) => {
      const s = document.createElement('div'); s.className = 'esc'; s.dataset.k = e.k;
      s.style.left = (OX + e.x * PT) + 'px'; s.style.top = (e.y * PT) + 'px'; s.style.fontSize = (e.t || 13) * PT + 'px';
      if (e.cor) s.style.color = e.cor; if (e.rot) s.style.transform = 'rotate(' + e.rot + 'deg)';
      s.textContent = e.txt; d.appendChild(s);
    });
    (clip.marcas || []).filter((m) => m.pg === i).forEach((m) => {
      const b = document.createElement('div'); b.className = 'marca'; b.dataset.k = m.k;
      b.style.left = (OX + m.x * PT) + 'px'; b.style.top = (m.y * PT) + 'px'; b.style.width = m.w * PT + 'px'; b.style.height = m.h * PT + 'px';
      if (m.cor) { b.style.borderColor = m.cor; b.style.boxShadow = '0 0 0 6px ' + m.cor + '30,0 0 26px ' + m.cor + '60'; }
      d.appendChild(b);
    });
    cam.appendChild(d);
  });
  const pen = document.createElement('div'); pen.className = 'caneta'; pen.id = 'caneta'; cam.appendChild(pen);
}
function quadro(t) {
  // páginas: cada uma entra em p.de (com deslize ou corte)
  C.paginas.forEach((p, i) => {
    const el = document.getElementById('pg' + i);
    const prox = C.paginas[i + 1];
    let x = 0, vis = t >= p.de && (!prox || t < prox.de + (prox.trans || 0));
    if (p.trans && t >= p.de && t < p.de + p.trans) x = (1 - ease((t - p.de) / p.trans)) * 1080;
    el.style.display = vis ? 'flex' : 'none';
    el.style.transform = 'translateX(' + x + 'px)';
    el.style.zIndex = i;
  });
  // câmera: [t, zoom, cx, cy] em pontos do PDF
  const k = C.cam; let a = k[0], b = k[k.length - 1];
  for (let i = 0; i < k.length - 1; i++) if (t >= k[i][0] && t <= k[i + 1][0]) { a = k[i]; b = k[i + 1]; break; }
  const p = b[0] === a[0] ? 1 : ease(Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0]))));
  const z = lerp(a[1], b[1], p), cx = OX + lerp(a[2], b[2], p) * PT, cy = lerp(a[3], b[3], p) * PT;
  let tx = 540 - cx * z, ty = 720 - cy * z;
  tx = Math.min(0, Math.max(1080 - 1080 * z, tx)); ty = Math.min(0, Math.max(1440 - 1440 * z, ty));
  document.getElementById('cam').style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + z + ')';
  // escrita: revela da esquerda para a direita
  const pen = document.getElementById('caneta'); pen.style.display = 'none';
  (C.escritas || []).forEach((e) => {
    const s = document.querySelector('.esc[data-k="' + e.k + '"]');
    const q = Math.min(1, Math.max(0, (t - e.ini) / e.dur));
    s.style.clipPath = 'inset(-20% ' + (100 - q * 100) + '% -20% 0)';
    if (q > 0 && q < 1 && C.paginas[e.pg].de <= t) {
      const pg = document.getElementById('pg' + e.pg);
      pen.style.display = 'block';
      pen.style.left = (parseFloat(s.style.left) + s.offsetWidth * q) + 'px';
      pen.style.top = (parseFloat(s.style.top) + s.offsetHeight * .75 + Math.sin(t * 40) * 3) + 'px';
    }
  });
  (C.marcas || []).forEach((m) => {
    const b = document.querySelector('.marca[data-k="' + m.k + '"]');
    const fi = Math.min(1, Math.max(0, (t - m.ini) / .35)), fo = m.fim ? Math.min(1, Math.max(0, (m.fim - t) / .35)) : 1;
    const o = Math.min(fi, fo);
    b.style.opacity = o; b.style.transform = 'scale(' + (0.96 + 0.04 * ease(fi)) + ')';
  });
}
</script></body></html>`;

const lista = process.argv.slice(2);
const b = await chromium.launch();
for (const [id, clip] of Object.entries(CLIPS)) {
  if (lista.length && !lista.includes(id)) continue;
  for (const modo of process.env.PREVIEW ? ['tela'] : ['tela', 'vertical']) {
    const W = 1080, H = modo === 'tela' ? 1440 : 1920;
    const p = await b.newPage({ viewport: { width: W, height: H } });
    const arq = join(RAIZ, 'src', `_${modo}.html`);
    writeFileSync(arq, html(modo));
    await p.goto('file://' + arq);
    await p.evaluate((c) => montar(c), clip);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const dir = join(RAIZ, 'src', '_q', id + '-' + modo);
    rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
    if (process.env.PREVIEW) {
      for (const t of process.env.PREVIEW.split(',').map(Number)) { await p.evaluate((x) => quadro(x), t); await p.screenshot({ path: join(RAIZ, 'src', `_prev-${id}-${t}.jpg`), type: 'jpeg', quality: 80 }); }
      await p.close(); continue;
    }
    const n = Math.round(clip.dur * FPS);
    for (let f = 0; f < n; f++) {
      await p.evaluate((t) => quadro(t), f / FPS);
      await p.screenshot({ path: join(dir, String(f).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 92 });
    }
    await p.close();
    const out = join(RAIZ, 'inserts', `${id}-${modo}.mp4`);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(dir, '%04d.jpg'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', out]);
    rmSync(dir, { recursive: true, force: true });
    console.log('✓', id, modo, clip.dur + 's');
  }
}
await b.close();
