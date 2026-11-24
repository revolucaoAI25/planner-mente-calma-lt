// Telas finais dos 5 criativos, versão A (sem preço) e B (com preço). PNG 1080×1920 + MP4 de 3,5 s.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('/home/user/geladinho-de-drink/materiais/');
const { chromium } = require('playwright');
const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

// Áreas seguras do Reels: evitar o topo (≈ 220 px) e a base (≈ 420 px) por causa da interface.
const TEMAS = {
  c01: { cta: 'Conheça o planner digital para ansiedade', fundo: 'radial-gradient(90% 55% at 50% 30%,#FFFFFF,#F7F4ED 60%,#EFE9DC)', tinta: '#263431', sub: '#315F5A', onda: true },
  c02: { cta: 'Conheça o planner para ansiedade', fundo: 'radial-gradient(70% 45% at 70% 28%,#6b4a32 0%,#2c2620 45%,#15191a 100%)', tinta: '#FBF6EC', sub: '#F3D9C8', onda: false, escuro: true },
  c03: { cta: 'Conheça o método completo', fundo: 'linear-gradient(180deg,#F7F4ED,#EAF1EC)', tinta: '#263431', sub: '#315F5A', onda: true, metodo: true },
  c04: { cta: 'Quero meu planner para ansiedade', fundo: '#F7F4ED', tinta: '#263431', sub: '#B5694A', onda: false, contraste: true },
  c05: { cta: 'Comece 2027 com mais leveza', fundo: 'radial-gradient(80% 50% at 50% 25%,#FFFDF7,#EAF1EC 55%,#D6E2DA)', tinta: '#263431', sub: '#315F5A', onda: true, ano: true },
};

const pagina = (t, preco) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Mont;src:url(montserrat.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:Jak;src:url(plus-jakarta-sans-latin-wght-normal.woff2) format('woff2');font-weight:200 800}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;overflow:hidden;background:${t.fundo};font-family:Jak;color:${t.tinta};position:relative}
.onda{position:absolute;left:0;right:0;bottom:0;height:560px}
.logo{position:absolute;top:232px;left:50%;transform:translateX(-50%);height:96px;opacity:.95}
.tablet{position:absolute;left:50%;top:360px;width:462px;height:616px;transform:translateX(-50%) rotate(-3deg);border-radius:44px;background:#16181a;padding:22px;box-shadow:0 50px 90px rgba(20,30,30,${t.escuro ? '.6' : '.28'}),0 10px 24px rgba(20,30,30,.2)}
.tablet img{width:100%;height:100%;object-fit:cover;border-radius:24px;display:block}
.bloco{position:absolute;left:70px;right:70px;top:1012px;text-align:center}
h1{font-family:Mont;font-weight:800;font-size:72px;line-height:1;letter-spacing:-1.5px}
.sub{font-family:Mont;font-weight:700;font-size:34px;color:${t.sub};margin-top:16px;letter-spacing:.3px;text-transform:uppercase}
.chips{display:flex;gap:14px;justify-content:center;margin-top:26px;flex-wrap:wrap}
.chip{font-weight:700;font-size:27px;padding:12px 22px;border-radius:999px;background:${t.escuro ? 'rgba(255,255,255,.12)' : '#fff'};color:${t.tinta};box-shadow:0 4px 14px rgba(0,0,0,.08)}
.preco{display:inline-flex;align-items:baseline;gap:12px;margin-top:18px;font-family:Mont;font-weight:800}
.preco b{font-size:84px;color:${t.escuro ? '#FFD9A8' : '#B5694A'};letter-spacing:-2px}
.preco span{font-size:26px;font-weight:700;opacity:.85}
.cta{display:inline-flex;align-items:center;gap:16px;margin-top:${preco ? 22 : 40}px;padding:26px 44px;border-radius:999px;background:${t.escuro ? '#F3D9C8' : '#315F5A'};color:${t.escuro ? '#1d2422' : '#fff'};font-family:Mont;font-weight:800;font-size:33px;box-shadow:0 14px 30px rgba(49,95,90,.35)}
.cta i{font-style:normal;font-size:38px}
.ano{position:absolute;top:1530px;left:0;right:0;text-align:center;font-family:Mont;font-weight:800;font-size:230px;color:#315F5A;opacity:.13;letter-spacing:-8px}
.trio{position:absolute;left:60px;right:60px;top:300px;display:flex;justify-content:space-between}
.trio span{font-family:Mont;font-weight:800;font-size:22px;letter-spacing:3px;padding:10px 16px;border-radius:14px}
.lado{position:absolute;top:0;bottom:0;width:18px}
</style></head><body>
${t.onda ? `<svg class="onda" viewBox="0 0 1080 560" preserveAspectRatio="none"><path d="M0 260 C260 180 520 330 760 250 S1000 170 1080 220 V560 H0Z" fill="#D6E2DA"/><path d="M0 360 C300 290 560 430 820 350 S1010 300 1080 330 V560 H0Z" fill="#A8BDB0" opacity=".55"/><path d="M0 450 C280 400 600 500 1080 430 V560 H0Z" fill="#F6E6DC"/></svg>` : ''}
${t.contraste ? '<div class="lado" style="left:0;background:#B5694A"></div><div class="lado" style="right:0;background:#315F5A"></div>' : ''}
${t.ano ? '<div class="ano">2027</div>' : ''}
<img class="logo" src="${t.escuro ? 'logo-claro.png' : '../logo/logo-mente-calma-completo.png'}">
<div class="tablet"><img src="../telas/tela-01-capa.png"></div>
<div class="bloco">
  <h1>Planner Mente Calma</h1>
  <p class="sub">Planner digital para ansiedade</p>
  <div class="chips"><span class="chip">109 páginas</span><span class="chip">+ 4 bônus</span><span class="chip">Método de 10 min</span></div>
  ${preco ? `<div class="preco"><b>R$ 37</b><span>digital e imprimível</span></div><br>` : '<br>'}
  <div class="cta">${t.cta}<i>→</i></div>
</div>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
for (const [id, t] of Object.entries(TEMAS)) {
  for (const [v, preco] of [['A-sem-preco', false], ['B-com-preco', true]]) {
    const arq = join(RAIZ, 'src', '_final.html');
    writeFileSync(arq, pagina(t, preco));
    await p.goto('file://' + arq);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(200);
    const png = join(RAIZ, 'tela-final', `${id}-${v}.png`);
    await p.screenshot({ path: png });
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-loop', '1', '-i', png, '-vf', "scale=1188:-1,zoompan=z='1+0.02*on/105':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=105:s=1080x1920:fps=30", '-t', '3.5', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', png.replace('.png', '.mp4')]);
    console.log('✓', id, v);
  }
}
await b.close();
