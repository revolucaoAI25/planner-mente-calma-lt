// Materiais extras (order bumps): Menos Tela, Menos Ansiedade · Casa em Ordem, Mente Mais Leve · Rotinas Prontas para Mentes Ansiosas.
import { C, ic, fill, linhas, box, escala, chk, chkLinha, campo } from './ui.mjs';
import { capa, contracapa } from './paginas.mjs';

/* ---------------- peças didáticas ---------------- */

/** Cartão de estudo: o que a pesquisa encontrou + como usar + referência curta. */
const estudo = (ref, achado, uso = '') => `
<div class="box b-white" style="flex-direction:row;gap:2.6mm;align-items:flex-start;padding:2.4mm 2.8mm">
  <span class="bi" style="background:var(--s-bg);color:var(--s-tx);width:7mm;height:7mm;flex-shrink:0">${ic('FlaskConical', 13)}</span>
  <div>
    <p style="font-size:7.8pt;line-height:1.42">${achado}</p>
    ${uso ? `<p style="font-size:7.3pt;line-height:1.38;margin-top:.9mm;color:var(--t-tx)"><b>Na prática:</b> ${uso}</p>` : ''}
    <p class="mini it" style="margin-top:.7mm;font-size:6.3pt">${ref}</p>
  </div>
</div>`;

/** Número de destaque. */
const stat = (num, txt, ref, cor = 'sal') => `
<div class="box b-${cor}" style="padding:2.6mm 2.8mm">
  <p style="font-family:Mont;font-weight:700;font-size:17pt;color:${cor === 'ter' ? 'var(--t-tx)' : 'var(--p)'};line-height:1">${num}</p>
  <p style="font-size:7.3pt;line-height:1.35;margin-top:1.2mm">${txt}</p>
  <p class="mini it" style="margin-top:.8mm;font-size:6.2pt">${ref}</p>
</div>`;

/** Ciclo de 4 etapas (diagrama circular). */
const ciclo = (nos, centro) => {
  const pos = [
    'left:50%;top:0;transform:translateX(-50%)',
    'right:0;top:50%;transform:translateY(-50%)',
    'left:50%;bottom:0;transform:translateX(-50%)',
    'left:0;top:50%;transform:translateY(-50%)',
  ];
  return `<div style="position:relative;height:64mm;flex:0 0 auto;margin:1mm 0">
    <svg viewBox="0 0 200 200" style="position:absolute;left:50%;top:50%;width:46mm;height:46mm;transform:translate(-50%,-50%)" fill="none">
      <defs><marker id="sa" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="${C.terEsc}"/></marker></defs>
      <path d="M128 18 A86 86 0 0 1 182 72" stroke="${C.terEsc}" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#sa)"/>
      <path d="M182 128 A86 86 0 0 1 128 182" stroke="${C.terEsc}" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#sa)"/>
      <path d="M72 182 A86 86 0 0 1 18 128" stroke="${C.terEsc}" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#sa)"/>
      <path d="M18 72 A86 86 0 0 1 72 18" stroke="${C.terEsc}" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#sa)"/>
    </svg>
    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:26mm;text-align:center;font-family:Mont;font-weight:700;font-size:7.4pt;line-height:1.2;color:var(--p)">${centro}</div>
    ${nos.map(([t, d], i) => `<div style="position:absolute;${pos[i]};width:36mm;background:${i % 2 ? 'var(--t-bg)' : 'var(--s-bg)'};border-radius:2.6mm;padding:1.8mm 2.2mm;text-align:center">
      <p style="font-family:Mont;font-weight:700;font-size:7.4pt;color:${i % 2 ? 'var(--t-tx)' : 'var(--s-tx)'}">${i + 1}. ${t}</p>
      <p style="font-size:6.5pt;line-height:1.3;margin-top:.4mm">${d}</p></div>`).join('')}
  </div>`;
};

/** Tabela com linhas vazias. */
const tabela = (cols, n, h = 8.2, larg = []) => `
<table class="tb" style="flex:0 0 auto">
  <tr>${cols.map((c, i) => `<th style="${larg[i] ? `width:${larg[i]}` : ''}">${c}</th>`).join('')}</tr>
  ${Array.from({ length: n }, () => `<tr style="height:${h}mm">${cols.map((_, i) => `<td style="${i < cols.length - 1 ? `border-right:.25mm solid ${C.gra}18` : ''}"></td>`).join('')}</tr>`).join('')}
</table>`;

/** Lista numerada de passos com explicação curta. */
const passos = (arr, cor = 'p') => `<div style="display:flex;flex-direction:column;gap:2.2mm">${arr
  .map(([t, d], i) => `<div style="display:flex;gap:2.6mm;align-items:flex-start"><span class="num" style="width:5.6mm;height:5.6mm;font-size:7.4pt;flex-shrink:0;background:var(--${cor})">${i + 1}</span><p style="font-size:7.9pt;line-height:1.42"><b>${t}</b> ${d}</p></div>`)
  .join('')}</div>`;

/** Rastreador de N dias (grade de círculos por linha). */
const rastreador = (linhasRot, dias, extra = '') => `
<div style="flex:0 0 auto">
  <div style="display:grid;grid-template-columns:26mm repeat(${dias},1fr);gap:.7mm;align-items:center">
    <span></span>${Array.from({ length: dias }, (_, d) => `<span style="text-align:center;font-family:Mont;font-weight:700;font-size:5.4pt;color:var(--p)">${d + 1}</span>`).join('')}
    ${linhasRot.map((r) => `<span style="font-size:6.6pt;line-height:1.15;padding-right:1mm">${r}</span>${Array.from({ length: dias }, () => `<span style="aspect-ratio:1;border-radius:50%;border:.28mm solid var(--ln);background:#fff"></span>`).join('')}`).join('')}
  </div>${extra}
</div>`;

const referencias = (lista) => `
<p class="tx" style="font-size:7.6pt">As ideias deste material se apoiam nos estudos abaixo. Eles mostram efeitos <b>em média</b>, em grupos de pessoas: cada corpo e cada rotina reagem de um jeito. Use como direção, não como regra.</p>
<ol style="padding-left:4.4mm;display:flex;flex-direction:column;gap:1.5mm;flex:0 0 auto">
  ${lista.map((r) => `<li style="font-size:6.7pt;line-height:1.38;color:${C.gra}cc">${r}</li>`).join('')}
</ol>
<div class="box b-cre" style="margin-top:auto;flex-direction:row;gap:2.6mm;align-items:flex-start">
  <span style="color:var(--t-tx);flex-shrink:0">${ic('HeartHandshake', 14)}</span>
  <p class="mini" style="font-size:6.8pt">Material de organização pessoal e educação em saúde. Não substitui acompanhamento psicológico ou médico. Se a ansiedade estiver atrapalhando muito a sua vida, procure um profissional. Em crise, ligue <b>188 (CVV)</b>, gratuito e 24h.</p>
</div>`;

/* ===================================================================== */
/* 1. MENOS TELA, MENOS ANSIEDADE                                         */
/* ===================================================================== */
function menosTela(modo) {
  const P = [];
  const s = 'e1';
  P.push({ key: 'e1-capa', sec: s, raw: () => capa({ selo: 'Material extra', topo: 'PLANNER MENTE CALMA', titulo: 'Menos Tela,<br>Menos Ansiedade', tag: 'Um plano de 21 dias, baseado em pesquisas, para usar o celular sem que ele use você.', ordem: ['#E2EDF6', '#A9C4DA', '#36678A', '#F6E6DC'], sub: 'Plano de 21 dias' }) });

  P.push({
    key: 'e1-porque', sec: s, sp: true, eb: 'Entenda primeiro', t: 'Por que o celular <span class="gr">alimenta a ansiedade</span>', sub: 'não é falta de força de vontade. é um ciclo', body: () => `
    <p class="tx">O celular dá um <b>alívio rápido</b> para o desconforto: tédio, preocupação, cansaço. Só que o alívio dura pouco e o desconforto volta maior, e a mão volta para o celular. Esse ciclo é aprendido, e por isso também pode ser <b>desaprendido</b>.</p>
    ${ciclo([
      ['Desconforto', 'tédio, preocupação, cansaço'],
      ['Pega o celular', 'quase sem perceber'],
      ['Alívio rápido', 'novidade, distração'],
      ['Mais ansiedade', 'comparação, notícias, sono pior'],
    ], 'o ciclo da checagem')}
    <div class="g2">
      ${[
        ['Gift', 'Recompensa imprevisível', 'Às vezes tem algo bom, às vezes não. Esse padrão (como numa máquina caça-níquel) é o que mais prende o comportamento.'],
        ['BellRing', 'Interrupções', 'Cada notificação puxa a atenção para fora do que você está fazendo e deixa a mente em estado de alerta.'],
        ['Moon', 'Sono atrasado', 'A tela à noite estimula o cérebro e atrasa o relógio interno. Dormir mal aumenta a ansiedade do dia seguinte.'],
        ['Users', 'Comparação e notícias', 'Vidas editadas e notícias ruins em sequência ativam a sensação de ameaça e de “estou ficando para trás”.'],
      ].map(([i, t, d]) => `<div class="box b-cre" style="padding:2.4mm"><div class="bt">${ic(i, 11)}<span style="font-size:6.4pt">${t}</span></div><p class="mini" style="font-size:6.9pt;margin-top:.8mm;color:${C.gra}cc">${d}</p></div>`).join('')}
    </div>`,
  });

  P.push({
    key: 'e1-ciencia', sec: s, sp: true, eb: 'O que as pesquisas mostram', t: 'A ciência por trás <span class="gr">do plano</span>', sub: 'cada passo deste material vem de um destes achados', body: () => `
    <div class="g2">
      ${stat('30 min', 'por dia de redes sociais, durante 3 semanas, reduziram solidão e sintomas de depressão em universitários.', 'Hunt et al., 2018')}
      ${stat('3×', 'ao dia: checar e-mails só três vezes diminuiu o estresse diário em relação a checar à vontade.', 'Kushlev & Dunn, 2015', 'ter')}
    </div>
    ${estudo('Ward et al., 2017', 'Só de ter o <b>próprio celular em cima da mesa</b>, mesmo desligado e virado para baixo, as pessoas tiveram desempenho pior em tarefas de memória e raciocínio do que quando o aparelho estava em outra sala.', 'durante o foco e o descanso, o celular fica em outro cômodo, não só “guardado”.')}
    ${estudo('Kushlev, Proulx & Dunn, 2016', 'Com as <b>notificações ligadas</b>, as pessoas relataram mais desatenção e agitação do que na semana em que as deixaram desligadas.', 'desligue tudo o que não é uma pessoa falando com você.')}
    ${estudo('Chang et al., 2015', 'Ler em tela antes de dormir <b>atrasou a melatonina</b> (o hormônio do sono), fez as pessoas demorarem mais para dormir e acordarem menos alertas, comparado a ler um livro de papel.', 'a última hora antes de dormir é livre de tela.')}
    ${estudo('Holman, Garfin & Silver, 2014', 'Depois de um atentado, quem passou <b>6 horas ou mais por dia</b> vendo a cobertura na mídia relatou mais estresse agudo do que pessoas que estavam no local.', 'notícias com hora marcada, em dose pequena.')}`,
  });

  P.push({
    key: 'e1-raiox', sec: s, eb: 'Antes de começar', t: 'Meu raio-X <span class="gr">da tela</span>', sub: 'sem julgamento: só o ponto de partida', data: true, body: () => `
    <div class="box b-sal" style="flex:0 0 auto">
      <div class="bt">${ic('Smartphone', 11)}<span>Onde ver os números</span></div>
      <p class="mini" style="font-size:7pt;margin-top:1mm"><b>iPhone:</b> Ajustes › Tempo de Uso › Ver Toda a Atividade. <b>Android:</b> Configurações › Bem-estar digital e controle parental. Anote a <b>média diária</b> da última semana.</p>
    </div>
    <div class="g3" style="flex:0 0 auto">
      ${[['Tempo de tela por dia', '__ h __ min'], ['Desbloqueios por dia', '______'], ['Notificações por dia', '______']].map(([t, v]) => `<div class="box b-white" style="padding:2.4mm;text-align:center"><p class="lbl" style="font-size:5.8pt">${t}</p><p style="font-family:Mont;font-weight:600;font-size:10pt;color:${C.gra}66;margin-top:2mm">${v}</p></div>`).join('')}
    </div>
    ${box({ icon: 'LayoutGrid', t: 'Os 3 apps que mais uso', s: 'e quanto tempo em cada', cor: 'white', style: 'flex:0 0 auto', body: `<div style="margin-top:.6mm">${[1, 2, 3].map((n) => `<div class="chk cl"><span class="num" style="width:4mm;height:4mm;font-size:6pt">${n}</span><span class="ln"></span><span style="font-size:6.4pt;color:${C.gra}66;align-self:flex-end;margin-bottom:1mm">__ min</span></div>`).join('')}</div>` })}
    ${box({ icon: 'Gauge', t: 'Como o celular me afeta hoje', s: '0 = nada · 10 = muito', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:2mm;margin-top:1.6mm">${['Pego o celular sem perceber', 'Fico mais ansiosa(o) depois de rolar o feed', 'Uso a tela na cama antes de dormir', 'Me comparo com outras pessoas', 'Sinto que perco tempo e me culpo'].map((t) => `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:7.4pt">${t}</span>${escala('', 0, 10)}</div>`).join('')}</div>` })}
    ${box({ icon: 'Target', t: 'Por que eu quero mudar', s: 'o que eu ganho com mais tempo fora da tela', cor: 'ter', cls: 'grow', body: fill() })}`,
  });

  P.push({
    key: 'e1-gatilhos', sec: s, eb: 'Autoconhecimento', t: 'Quando a mão vai <span class="gr">sozinha</span> ao celular?', sub: 'anote 3 dias. os padrões aparecem rápido', refil: true, body: () => `
    <p class="tx" style="font-size:7.8pt">Toda vez que perceber que pegou o celular <b>sem decidir</b>, anote. A pergunta mais útil é a última: <b>o que eu queria de verdade naquele momento?</b> (descanso, companhia, fugir de uma tarefa, acalmar uma preocupação…)</p>
    ${tabela(['Hora', 'Onde / o que eu fazia', 'Como eu me sentia', 'O que eu queria de verdade'], 12, 9.2, ['11%', '30%', '26%', ''])}
    <div class="row" style="flex:0 0 auto">
      ${box({ icon: 'Search', t: 'Meu gatilho mais comum', cor: 'sal', body: linhas(2) })}
      ${box({ icon: 'Repeat', t: 'O que eu poderia fazer no lugar', cor: 'ter', body: linhas(2) })}
    </div>`,
  });

  P.push({
    key: 'e1-metodo', sec: s, sp: true, eb: 'O método', t: 'Ambiente, atrito e <span class="gr">substituição</span>', sub: 'mudar o entorno funciona melhor do que lutar contra a vontade', body: () => `
    <p class="tx">Força de vontade cansa. O que mais funciona é <b>mudar o ambiente</b> para que o comportamento automático fique mais difícil e a alternativa fique mais fácil. O plano de 21 dias usa três camadas, uma por semana:</p>
    ${[
      ['Eye', 'Semana 1 · Consciência', 'Perceber os gatilhos e o tempo real de uso. Só observar já reduz o uso automático, porque transforma o “sem pensar” em escolha.', 'sal'],
      ['Lock', 'Semana 2 · Atrito', 'Colocar pequenos obstáculos: notificações desligadas, apps fora da tela inicial, tela em tons de cinza, celular fora do quarto. Cada segundo a mais de esforço quebra o automático.', 'cre'],
      ['Sprout', 'Semana 3 · Substituição', 'Colocar algo no lugar: para cada gatilho, uma alternativa pronta que atenda à mesma necessidade (descanso, conexão, pausa).', 'ter'],
    ].map(([i, t, d, c]) => `<div class="box b-${c}" style="flex-direction:row;gap:3mm;align-items:flex-start"><span class="bi" style="width:8mm;height:8mm;flex-shrink:0">${ic(i, 15)}</span><div><p class="h2" style="font-size:9.4pt">${t}</p><p class="tx" style="font-size:8pt;margin-top:.6mm">${d}</p></div></div>`).join('')}
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center">${ic('Info', 18, C.ter)}<p style="font-size:7.8pt;line-height:1.45">A meta não é zerar o celular. É <b>você escolher</b> quando usar. Ele continua útil para trabalho, família e diversão, só deixa de ser a resposta automática para todo desconforto.</p></div>`,
  });

  P.push({
    key: 'e1-ajustes', sec: s, eb: 'Faça hoje · 15 minutos', t: 'Ajustes que fazem <span class="gr">o trabalho por você</span>', sub: 'configure uma vez e colha todos os dias', body: () => `
    ${[
      ['Notificações', 'Desligue as de redes sociais, lojas, jogos e notícias. Deixe só mensagens de pessoas e ligações.', 'Kushlev et al., 2016'],
      ['Tela inicial limpa', 'Tire redes e jogos da primeira tela; deixe em uma pasta na última página. Abrir exige busca, e isso quebra o automático.', ''],
      ['Tons de cinza', 'Ative a tela em escala de cinza (acessibilidade › filtros de cor). Sem cores vivas, o feed perde a graça e o uso tende a cair.', 'Holte & Ferraro, 2020'],
      ['Foco programado', 'Agende o “Não perturbe” para a noite e para o horário de trabalho/estudo.', ''],
      ['Despertador fora do celular', 'Use um relógio simples. Assim o celular pode dormir fora do quarto.', 'Chang et al., 2015'],
      ['Sair das contas no navegador', 'Se uma rede é difícil de largar, apague o app e use só pelo navegador, onde é menos prático.', ''],
      ['Limite de app', 'Defina um limite diário para o app que mais consome tempo. Quando aparecer o aviso, pare e respire antes de estender.', ''],
      ['Lugar fixo de carregar', 'Escolha um lugar fora do quarto e longe da mesa de trabalho.', 'Ward et al., 2017'],
    ].map(([t, d, r]) => `<div style="display:flex;gap:2.4mm;align-items:flex-start;padding:1.5mm 0;border-bottom:.25mm dotted ${C.gra}2a"><span class="cb" style="margin-top:.6mm"></span><p style="font-size:7.7pt;line-height:1.4"><b>${t}.</b> ${d}${r ? ` <span class="mini it">(${r})</span>` : ''}</p></div>`).join('')}
    <p class="quote" style="font-size:7.8pt;margin-top:auto">Ambiente bem desenhado vale mais do que mil promessas de “amanhã eu paro”.</p>`,
  });

  const fase = (n, nome, cor, missoes) => ({
    key: `e1-sem${n}`, sec: s, eb: `Plano de 21 dias · semana ${n}`, t: `${nome}`, sub: 'uma missão por dia. marque quando fizer', refil: true, tema: cor, body: () => `
    ${missoes.map(([m, d], i) => `<div class="box ${i % 2 ? 'b-cre' : 'b-sal'}" style="flex-direction:row;gap:2.6mm;align-items:center;padding:2mm 2.6mm;flex:1;min-height:0">
      <div style="flex-shrink:0;text-align:center;width:10mm"><p class="lbl" style="font-size:5.4pt">DIA</p><p style="font-family:Mont;font-weight:700;font-size:13pt;color:var(--p);line-height:1">${(n - 1) * 7 + i + 1}</p></div>
      <div style="flex:1"><p style="font-size:7.9pt;line-height:1.3"><b>${m}</b></p><p class="mini" style="font-size:6.8pt;margin-top:.3mm">${d}</p></div>
      <div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:.6mm"><span class="cb" style="width:4.4mm;height:4.4mm"></span><span style="font-size:5.4pt;color:${C.gra}77">feito</span></div>
    </div>`).join('')}`,
  });
  P.push(fase(1, 'Semana 1 · <span class="gr">Consciência</span>', 'azul', [
    ['Anote seu tempo de tela de ontem', 'Preencha o Raio-X. Só olhar o número já muda a relação.'],
    ['Registre 5 momentos de “mão automática”', 'Use a página de gatilhos. Não tente mudar nada ainda.'],
    ['Antes de desbloquear, pergunte: “para quê?”', 'Se não tiver resposta, bloqueie de novo.'],
    ['Primeiros 30 min do dia sem celular', 'Água, janela aberta, café. Deixe a mente acordar antes do mundo entrar.'],
    ['Refeições sem tela', 'Prato na mesa, celular em outro cômodo.'],
    ['Note como você se sente depois do feed', 'Antes e depois de rolar: ansiedade de 0 a 10.'],
    ['Revise a semana', 'Qual gatilho apareceu mais? Ele vira seu foco da semana 2.'],
  ]));
  P.push(fase(2, 'Semana 2 · <span class="gr">Atrito</span>', 'lav', [
    ['Desligue as notificações que não são pessoas', 'Página de ajustes, item 1.'],
    ['Limpe a tela inicial', 'Redes e jogos numa pasta na última página.'],
    ['Ative os tons de cinza', 'Teste por 3 dias e veja a diferença.'],
    ['Celular dorme fora do quarto', 'Despertador comum ao lado da cama.'],
    ['Foco programado no trabalho/estudo', 'Celular em outro cômodo durante 1 bloco de 50 min.'],
    ['Notícias só 1 vez, com hora marcada', '15 minutos, de uma fonte confiável, longe da hora de dormir.'],
    ['Revise a semana', 'Qual ajuste mais ajudou? Ele fica para sempre.'],
  ]));
  P.push(fase(3, 'Semana 3 · <span class="gr">Substituição</span>', 'rosa', [
    ['Monte sua lista de substituições', 'Página “Em vez de rolar”. Deixe à vista.'],
    ['Na vontade, espere 10 minutos', 'Use a técnica de surfar a vontade (página SOS).'],
    ['Troque 20 min de feed por algo do corpo', 'Caminhar, alongar, tomar sol, arrumar algo pequeno.'],
    ['Faça uma conexão de verdade', 'Ligue ou encontre alguém em vez de só ver o que a pessoa postou.'],
    ['Última hora do dia sem tela', 'Banho, leitura em papel, Ritual Desligando a Cabeça.'],
    ['Um bloco de 2 h sem celular', 'Avise quem precisa e aproveite.'],
    ['Compare com o dia 1', 'Preencha a revisão dos 21 dias.'],
  ]));

  P.push({
    key: 'e1-rastreador', sec: s, eb: '21 dias', t: 'Rastreador <span class="gr">tela × ansiedade</span>', sub: 'veja no papel a relação entre os dois', refil: true, body: () => `
    ${tabela(['Dia', 'Tempo de tela', 'Desbloqueios', 'Ansiedade (0–10)', 'Missão'], 21, 6.2, ['9%', '24%', '20%', '24%', ''])}
    <div class="box b-ter" style="flex:1;min-height:0"><div class="bt">${ic('Search', 10)}<span>O que eu percebi</span></div>${fill()}</div>`,
  });

  P.push({
    key: 'e1-combinados', sec: s, eb: 'Meus combinados', t: 'Zonas e horários <span class="gr">livres de tela</span>', sub: 'regras simples decididas uma vez, para não decidir toda hora', body: () => `
    <p class="tx" style="font-size:7.9pt">Decidir de antemão (“<b>se</b> for hora de comer, <b>então</b> o celular fica na bancada”) funciona melhor do que decidir na hora, quando a vontade já está forte. Marque os combinados que você topa e escreva os seus.</p>
    <div class="g2" style="flex:0 0 auto">
      ${box({ icon: 'Clock', t: 'Horários', cor: 'sal', body: `<div style="margin-top:.8mm">${['primeiros 30 min do dia', 'refeições', 'última hora antes de dormir', '1 bloco de foco por dia'].map((t) => chk(t)).join('')}${chkLinha(2)}</div>` })}
      ${box({ icon: 'Home', t: 'Lugares', cor: 'ter', body: `<div style="margin-top:.8mm">${['quarto', 'mesa de refeições', 'banheiro', 'mesa de trabalho/estudo'].map((t) => chk(t)).join('')}${chkLinha(2)}</div>` })}
    </div>
    ${box({ icon: 'Newspaper', t: 'Meu combinado com as notícias', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:1.8mm;margin-top:1.6mm">${campo('Horário:', '30mm')}${campo('Fonte confiável:', '60mm')}${campo('Tempo máximo:', '24mm')}</div>` })}
    ${box({ icon: 'PenLine', t: 'Se… então…', s: 'escreva 3 combinados seus', cor: 'cre', cls: 'grow', body: `<div style="display:flex;flex-direction:column;gap:1.6mm;margin-top:1.4mm">${[1, 2, 3].map(() => `<div style="display:flex;gap:1.6mm;align-items:flex-end;font-size:7.6pt"><b style="color:var(--p)">Se</b><span style="flex:1;border-bottom:.25mm solid ${C.gra}44;height:5mm"></span><b style="color:var(--t-tx)">então</b><span style="flex:1.2;border-bottom:.25mm solid ${C.gra}44;height:5mm"></span></div>`).join('')}</div>${fill()}` })}`,
  });

  P.push({
    key: 'e1-substituir', sec: s, eb: 'Semana 3', t: 'Em vez de rolar, <span class="gr">eu posso…</span>', sub: 'o celular atende a uma necessidade. atenda a mesma necessidade de outro jeito', body: () => `
    <div class="row" style="flex:1;min-height:0">
      ${[['Zap', '2 minutos', 'sal', ['3 respirações lentas', 'beber água', 'olhar pela janela', 'alongar pescoço e ombros']], ['Timer', '10 minutos', 'cre', ['caminhar pela casa ou rua', 'arrumar uma superfície', 'ligar para alguém', 'página Mente em 3 Lugares']], ['Sun', '30 minutos', 'ter', ['ler em papel', 'cozinhar algo simples', 'tomar sol / ar livre', 'hobby manual']]].map(([i, t, c, l]) => `<div class="box b-${c}"><div class="bt">${ic(i, 11)}<span>${t}</span></div><div class="ac" style="margin-top:1.4mm">${l.map((x) => chk(x)).join('')}${chkLinha(3)}</div>${fill()}</div>`).join('')}
    </div>
    ${box({ icon: 'Compass', t: 'O que eu buscava no celular → o que eu faço', cor: 'white', style: 'flex:0 0 auto', body: `<div class="g2" style="gap:.8mm 4mm;margin-top:1.4mm;font-size:7.2pt">${[['descanso', 'pausa sem tela, deitar 5 min'], ['companhia', 'mensagem ou ligação para alguém'], ['fugir de uma tarefa', 'fazer só o primeiro passo dela'], ['acalmar uma preocupação', 'Mente em 3 Lugares']].map(([a, b]) => `<p><b>${a}</b> → ${b}</p>`).join('')}</div>` })}`,
  });

  P.push({
    key: 'e1-sos', sec: s, eb: 'SOS', t: 'Deu vontade? <span class="gr">Surfe a onda</span>', sub: 'a vontade sobe, chega no pico e desce sozinha, como uma onda', refil: true, body: () => `
    <p class="tx" style="font-size:7.9pt">“Surfar a vontade” é uma técnica usada em programas de mindfulness para comportamentos automáticos: em vez de obedecer ou brigar com a vontade, você <b>observa</b> até ela passar. Em geral, ela perde força em poucos minutos.</p>
    <div style="flex:0 0 auto;position:relative;height:26mm;margin:1mm 0">
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><path d="M0 70 C60 70 80 10 150 10 S240 70 300 70" fill="none" stroke="${C.ter}" stroke-width="3"/></svg>
      ${[['5%', 'a vontade aparece'], ['42%', 'pico: respire'], ['80%', 'ela desce']].map(([l, t]) => `<span class="chip c-sal" style="position:absolute;left:${l};bottom:0;text-transform:none;letter-spacing:0;font-size:6.6pt">${t}</span>`).join('')}
    </div>
    ${passos([
      ['Pare e nomeie.', '“Estou com vontade de pegar o celular.” Só isso, sem julgamento.'],
      ['Onde está no corpo?', 'Mãos inquietas, aperto no peito, agitação? Observe com curiosidade.'],
      ['Respire 3 vezes', 'soltando o ar devagar, mais longo do que a inspiração.'],
      ['Pergunte: “para quê?”', 'O que eu quero sentir agora? Existe outro jeito de conseguir isso?'],
      ['Espere 10 minutos.', 'Se depois disso ainda fizer sentido, use com intenção e com hora para acabar.'],
    ])}
    ${box({ icon: 'ClipboardCheck', t: 'Ondas que eu surfei', s: 'marque cada vez', cor: 'white', cls: 'grow', body: `<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:1.4mm;margin-top:1.6mm">${Array.from({ length: 36 }, () => `<span style="aspect-ratio:1;border-radius:50%;border:.3mm solid var(--ln)"></span>`).join('')}</div>` })}`,
  });

  P.push({
    key: 'e1-revisao', sec: s, eb: 'Dia 21', t: 'O que mudou em <span class="gr">21 dias</span>', sub: 'compare com o seu raio-X do começo', data: true, body: () => `
    <div class="g3" style="flex:0 0 auto">
      ${[['Tempo de tela', 'antes ___ · agora ___'], ['Desbloqueios', 'antes ___ · agora ___'], ['Ansiedade média', 'antes ___ · agora ___']].map(([t, v]) => `<div class="box b-sal" style="padding:2.4mm;text-align:center"><p class="lbl" style="font-size:5.8pt">${t}</p><p style="font-size:7pt;color:${C.gra}88;margin-top:2mm">${v}</p></div>`).join('')}
    </div>
    ${box({ icon: 'Sparkles', t: 'O que eu ganhei com o tempo de volta', cor: 'ter', cls: 'grow', body: fill() })}
    ${box({ icon: 'Wrench', t: 'Os ajustes que vou manter', cor: 'cre', cls: 'grow', body: fill() })}
    ${box({ icon: 'ShieldAlert', t: 'Meu plano para quando eu recair', s: 'recaída faz parte', cor: 'white', cls: 'grow', body: fill() })}`,
  });

  P.push({
    key: 'e1-ref', sec: s, eb: 'Para saber mais', t: 'Referências', body: () => referencias([
      'Hunt, M. G., Marx, R., Lipson, C., & Young, J. (2018). No more FOMO: Limiting social media decreases loneliness and depression. <i>Journal of Social and Clinical Psychology</i>, 37(10), 751–768.',
      'Kushlev, K., & Dunn, E. W. (2015). Checking email less frequently reduces stress. <i>Computers in Human Behavior</i>, 43, 220–228.',
      'Kushlev, K., Proulx, J., & Dunn, E. W. (2016). “Silence your phones”: Smartphone notifications increase inattention and hyperactivity symptoms. <i>Proceedings of CHI 2016</i>, 1011–1020.',
      'Ward, A. F., Duke, K., Gneezy, A., & Bos, M. W. (2017). Brain drain: The mere presence of one’s own smartphone reduces available cognitive capacity. <i>Journal of the Association for Consumer Research</i>, 2(2), 140–154.',
      'Chang, A.-M., Aeschbach, D., Duffy, J. F., & Czeisler, C. A. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. <i>PNAS</i>, 112(4), 1232–1237.',
      'Holman, E. A., Garfin, D. R., & Silver, R. C. (2014). Media’s role in broadcasting acute stress following the Boston Marathon bombings. <i>PNAS</i>, 111(1), 93–98.',
      'Holte, A. J., & Ferraro, F. R. (2020). True colors: Grayscale setting reduces screen time in college students. <i>The Social Science Journal</i>. https://doi.org/10.1080/03623319.2020.1737461',
      'Bowen, S., & Marlatt, A. (2009). Surfing the urge: Brief mindfulness-based intervention for college student smokers. <i>Psychology of Addictive Behaviors</i>, 23(4), 666–671.',
    ]),
  });
  if (modo === 'imp') P.push({ key: 'e1-cc', sec: s, raw: () => contracapa('Você escolhe quando usar. Não o contrário.') });
  return P;
}

/* ===================================================================== */
/* 2. CASA EM ORDEM, MENTE MAIS LEVE                                      */
/* ===================================================================== */
function casaEmOrdem(modo) {
  const P = [];
  const s = 'e2';
  P.push({ key: 'e2-capa', sec: s, raw: () => capa({ selo: 'Material extra', topo: 'PLANNER MENTE CALMA', titulo: 'Casa em Ordem,<br>Mente Mais Leve', tag: 'Um método de 15 minutos por dia para a casa deixar de ser mais uma fonte de cobrança.', ordem: ['#FBF0D4', '#E6CF95', '#87651B', '#EAF1EC'], sub: 'Método 15 minutos' }) });

  P.push({
    key: 'e2-porque', sec: s, sp: true, eb: 'Entenda primeiro', t: 'Por que a bagunça <span class="gr">pesa na mente</span>', sub: 'cada objeto fora do lugar é um pequeno lembrete de algo por fazer', body: () => `
    <p class="tx">Para uma mente ansiosa, a casa bagunçada não é só visual. É uma <b>lista de pendências espalhada pela casa</b>: a louça lembra que falta lavar, a pilha de papéis lembra das contas, a roupa na cadeira lembra que o dia não acabou. A mente não descansa porque vê tarefa em todo lugar.</p>
    ${ciclo([
      ['Bagunça visível', 'objetos fora do lugar'],
      ['Lembretes', '“falta fazer isso, e isso…”'],
      ['Sensação de atraso', 'culpa e cansaço'],
      ['Menos energia', 'e a bagunça cresce'],
    ], 'o ciclo do acúmulo')}
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center">${ic('Lightbulb', 18, C.ter)}<p style="font-size:7.8pt;line-height:1.45">A saída não é uma faxina gigante no sábado (que esgota e não se mantém). É <b>pouco, todo dia, sempre no mesmo lugar</b>, até a casa voltar a ser um lugar de descanso.</p></div>`,
  });

  P.push({
    key: 'e2-ciencia', sec: s, sp: true, eb: 'O que as pesquisas mostram', t: 'Casa, atenção e <span class="gr">estresse</span>', sub: 'o que os estudos dizem sobre ambiente e bem-estar', body: () => `
    ${estudo('Saxbe & Repetti, 2010', 'Mulheres que descreveram a própria casa usando mais palavras como “bagunçada” e “inacabada” tiveram um padrão de <b>cortisol (hormônio do estresse) menos saudável ao longo do dia</b> e humor mais deprimido no fim da tarde.', 'comece pelo que você vê primeiro ao chegar em casa.')}
    ${estudo('McMains & Kastner, 2011', 'Exames de imagem mostraram que <b>vários objetos no campo de visão competem pela atenção</b> no córtex visual: quanto mais coisas à vista, mais esforço o cérebro faz para focar.', 'superfícies livres (mesa, bancada) rendem mais calma do que gavetas arrumadas.')}
    ${estudo('Roster, Ferrari & Jurkat, 2016', 'O excesso de objetos em casa esteve associado a <b>menor sensação de bem-estar</b> e de que o lar é um lugar seguro e confortável.', 'destralhar um pouco por dia, sem maratona.')}
    ${estudo('Masicampo & Baumeister, 2011', 'Tarefas não terminadas ficam “voltando” à mente. Mas só de <b>fazer um plano concreto</b> para elas (quando e como), esses pensamentos intrusivos diminuíram.', 'cada cômodo ganha um dia na semana. Saber “quinta é dia do banheiro” acalma.')}
    ${estudo('Hanley et al., 2015', 'Pessoas que lavaram louça prestando atenção ao cheiro, à temperatura da água e aos movimentos relataram <b>menos nervosismo e mais inspiração</b> do que quem só lavou.', 'transforme 1 tarefa por dia em pausa de atenção plena.')}`,
  });

  P.push({
    key: 'e2-principios', sec: s, sp: true, eb: 'O método', t: 'Os 5 princípios da <span class="gr">casa leve</span>', sub: 'leia uma vez. eles guiam todo o resto', body: () => `
    ${[
      ['Timer', 'Pouco e sempre', '15 minutos por dia mantêm a casa melhor do que 4 horas no fim de semana. E não esgotam.'],
      ['Target', 'Um lugar por vez', 'Termine uma superfície antes de passar para outra. Ver algo pronto dá energia para continuar.'],
      ['Zap', 'Regra dos 2 minutos', 'Se leva menos de 2 minutos (guardar, jogar fora, pendurar), faça agora.'],
      ['Home', 'Tudo tem um lugar', 'Bagunça é, quase sempre, objeto sem endereço. Antes de arrumar, decida onde cada coisa mora.'],
      ['Eye', 'Comece pelo ponto quente', 'O lugar que você mais vê (bancada, mesa da sala, criado-mudo) é o que mais pesa. Ele vem primeiro.'],
    ].map(([i, t, d], n) => `<div class="box ${n % 2 ? 'b-cre' : 'b-sal'}" style="flex-direction:row;gap:3mm;align-items:center"><span class="bi" style="width:8mm;height:8mm;flex-shrink:0">${ic(i, 15)}</span><div><p class="h2" style="font-size:9.4pt">${t}</p><p class="tx" style="font-size:8pt;margin-top:.4mm">${d}</p></div></div>`).join('')}
    <p class="quote" style="font-size:8pt">Feito todo dia, mesmo mal feito, vence o perfeito que nunca começa.</p>`,
  });

  P.push({
    key: 'e2-mapa', sec: s, eb: 'Diagnóstico', t: 'Mapa da casa: <span class="gr">onde pesa mais?</span>', sub: 'pinte cada cômodo de 0 (tranquilo) a 3 (me incomoda muito)', data: true, body: () => `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:2mm;flex:1;min-height:0">
      ${['Cozinha', 'Sala', 'Quarto', 'Banheiro', 'Área de serviço', 'Entrada', 'Escritório / estudo', 'Guarda-roupa', 'Outro: ________'].map((c, i) => `<div class="box ${i % 2 ? 'b-cre' : 'b-white'}" style="padding:2.2mm"><p style="font-family:Mont;font-weight:700;font-size:7.6pt;color:var(--p)">${c}</p>
        <div style="display:flex;gap:1.4mm;margin-top:1.6mm">${[0, 1, 2, 3].map((n) => `<span style="flex:1;text-align:center;border-radius:1.4mm;padding:.6mm 0;font-family:Mont;font-weight:700;font-size:6.4pt;background:${['#EAF1EC', '#FBF0D4', '#F6E6DC', '#F8E3E6'][n]};color:${C.gra}aa">${n}</span>`).join('')}</div>
        <p class="mini" style="margin-top:1.6mm;font-size:6.2pt">o que mais incomoda:</p>${fill(5.6)}</div>`).join('')}
    </div>
    ${box({ icon: 'Flame', t: 'Meu ponto quente', s: 'o lugar que mais pesa: começo por ele', cor: 'ter', style: 'flex:0 0 auto', body: linhas(1) })}`,
  });

  P.push({
    key: 'e2-reset', sec: s, eb: 'Todo dia', t: 'O reset de <span class="gr">15 minutos</span>', sub: 'coloque um timer. quando tocar, pode parar com a consciência tranquila', refil: true, body: () => `
    <div style="display:flex;gap:1.4mm;flex:0 0 auto">
      ${[['0–5 min', 'Fora do lugar', 'Pegue uma cesta e recolha o que está fora do lugar. Lixo no lixo, o resto devolva ao seu endereço.', 'sal'], ['5–10 min', 'Superfícies', 'Libere e limpe as superfícies do ponto quente: bancada, mesa, pia.', 'cre'], ['10–15 min', 'O que mais incomoda', 'Escolha uma coisa que te incomoda hoje (pia, roupa, chão) e avance nela.', 'ter']].map(([tm, t, d, c], i) => `<div class="box b-${c}" style="flex:1;padding:2.4mm"><span class="chip c-${i === 2 ? 'ter' : 'pet'}" style="font-size:5.6pt">${tm}</span><p class="h2" style="font-size:8.6pt;margin-top:1.4mm">${t}</p><p class="mini" style="font-size:6.9pt;margin-top:.6mm;color:${C.gra}cc">${d}</p></div>`).join('')}
    </div>
    <div class="box b-pet" style="flex-direction:row;gap:3mm;align-items:center;flex:0 0 auto">${ic('Music', 16, C.ter)}<p style="font-size:7.6pt">Dica: uma playlist de 15 minutos faz o papel do timer e deixa o momento mais gostoso.</p></div>
    <p class="lbl" style="flex:0 0 auto">Registro do mês · marque os dias de reset</p>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1.6mm;flex:0 0 auto">
      ${Array.from({ length: 31 }, (_, d) => `<div style="border-radius:2mm;background:${d % 7 > 4 ? 'var(--t-bg)' : 'var(--s-bg)'};padding:1.4mm 0;display:flex;flex-direction:column;align-items:center;gap:.8mm"><span style="font-family:Mont;font-weight:700;font-size:6.6pt;color:var(--p)">${d + 1}</span><span class="cb" style="width:3.6mm;height:3.6mm;border-radius:50%"></span></div>`).join('')}
    </div>
    ${box({ icon: 'Smile', t: 'Como me senti depois do reset', cor: 'white', cls: 'grow', body: fill() })}`,
  });

  P.push({
    key: 'e2-semana', sec: s, eb: 'Plano semanal', t: 'Uma área <span class="gr">por dia</span>', sub: 'além do reset diário, 15 minutos numa área fixa. assim tudo é cuidado na semana', refil: true, body: () => `
    ${[
      ['Segunda', 'Cozinha', 'geladeira (tirar o vencido), armários, fogão'],
      ['Terça', 'Banheiro', 'pia, vaso, box, espelho, toalhas'],
      ['Quarta', 'Quarto', 'trocar a roupa de cama, criado-mudo, cadeira de roupas'],
      ['Quinta', 'Sala', 'superfícies, sofá, tapete, controle e cabos'],
      ['Sexta', 'Roupas', 'lavar, dobrar, guardar, separar o que não serve'],
      ['Sábado', 'Papéis e destralhe', 'contas, correspondência, 5 itens para doar'],
      ['Domingo', 'Descanso + preparar', 'só o reset e preparar a semana (refeições, roupas)'],
    ].map(([d, a, t], i) => `<div class="box ${i > 4 ? 'b-ter' : i % 2 ? 'b-cre' : 'b-sal'}" style="flex-direction:row;align-items:center;gap:2.6mm;padding:1.8mm 2.6mm;flex:1;min-height:0">
      <div style="width:15mm;flex-shrink:0"><p class="lbl" style="font-size:5.6pt">${d}</p><p style="font-family:Mont;font-weight:700;font-size:8.4pt;color:var(--p);line-height:1.1">${a}</p></div>
      <p style="flex:1;font-size:6.9pt;line-height:1.3;color:${C.gra}bb">${t}</p>
      <div style="display:flex;gap:1mm;flex-shrink:0">${[1, 2, 3, 4].map((w) => `<span style="display:flex;flex-direction:column;align-items:center;gap:.3mm"><span class="cb" style="width:3.4mm;height:3.4mm"></span><span style="font-size:4.8pt;color:${C.gra}77">S${w}</span></span>`).join('')}</div>
    </div>`).join('')}
    <p class="mini it" style="flex:0 0 auto;text-align:center">S1 a S4 = semanas do mês. Troque as áreas de dia se a sua rotina pedir: o importante é cada uma ter o seu.</p>`,
  });

  P.push({
    key: 'e2-ancoras', sec: s, eb: 'O mínimo que segura a casa', t: 'As 5 <span class="gr">tarefas-âncora</span>', sub: 'nos dias difíceis, faça só estas. elas impedem que a casa desande', body: () => `
    ${[
      ['UtensilsCrossed', 'Pia vazia antes de dormir', 'Acordar com a pia limpa muda o começo do dia.'],
      ['LayoutPanelTop', 'Uma superfície livre', 'A bancada ou a mesa: um ponto de calma visual.'],
      ['Shirt', 'Uma leva de roupa por dia', 'Lavar, estender ou guardar: uma etapa, não a montanha toda.'],
      ['Trash2', 'Lixo para fora', 'Cheiro e volume de lixo pesam mais do que parece.'],
      ['Moon', 'Reset de 10 min à noite', 'Devolver as coisas ao lugar antes de deitar.'],
    ].map(([i, t, d], n) => `<div class="box ${n % 2 ? 'b-cre' : 'b-sal'}" style="flex-direction:row;gap:3mm;align-items:center;padding:2.2mm 2.8mm"><span class="bi" style="width:7.4mm;height:7.4mm;flex-shrink:0">${ic(i, 14)}</span><div style="flex:1"><p style="font-weight:700;font-size:8.4pt">${t}</p><p class="mini" style="font-size:7pt">${d}</p></div></div>`).join('')}
    <p class="lbl" style="flex:0 0 auto">Rastreador de 14 dias</p>
    ${rastreador(['Pia vazia', 'Superfície livre', 'Uma leva de roupa', 'Lixo', 'Reset noturno'], 14)}
    ${box({ icon: 'Smile', t: 'O que eu percebi nestes 14 dias', cor: 'white', cls: 'grow', body: fill() })}`,
  });

  P.push({
    key: 'e2-destralhe', sec: s, eb: 'Destralhe', t: 'Menos coisas, <span class="gr">menos peso</span>', sub: 'o método das 4 caixas e o desafio de 30 dias', body: () => `
    <div class="g2" style="flex:0 0 auto">
      ${[['Check', 'Fica', 'uso, gosto e tem lugar', 'sal'], ['Heart', 'Doa / vende', 'em bom estado, mas não uso', 'cre'], ['Trash2', 'Lixo / reciclagem', 'quebrado, vencido, sem par', 'ter'], ['ArrowRightLeft', 'Outro cômodo', 'está no lugar errado', 'white']].map(([i, t, d, c]) => `<div class="box b-${c}" style="flex-direction:row;gap:2.4mm;align-items:center;padding:2.2mm"><span class="bi" style="width:7mm;height:7mm;flex-shrink:0">${ic(i, 13)}</span><div><p style="font-weight:700;font-size:8pt">${t}</p><p class="mini" style="font-size:6.6pt">${d}</p></div></div>`).join('')}
    </div>
    ${box({ icon: 'HelpCircle', t: 'Na dúvida, pergunte', cor: 'white', style: 'flex:0 0 auto', body: `<div class="g2" style="gap:.6mm 4mm;margin-top:1.2mm;font-size:7.2pt">${['Usei no último ano?', 'Compraria de novo hoje?', 'Tenho outro igual?', 'Guardo por culpa ou por uso?'].map((q) => `<p>• ${q}</p>`).join('')}</div>` })}
    <p class="lbl" style="flex:0 0 auto">Desafio 30 dias · 1 item por dia sai de casa</p>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1.4mm;flex:1;min-height:0;grid-auto-rows:1fr">
      ${Array.from({ length: 30 }, (_, d) => `<div style="border:.3mm solid ${C.creEsc};border-radius:2mm;background:#fff;position:relative"><span style="position:absolute;top:.8mm;left:1.2mm;font-family:Mont;font-weight:700;font-size:6pt;color:var(--p)">${d + 1}</span></div>`).join('')}
    </div>
    <p class="mini it" style="flex:0 0 auto;text-align:center">Escreva no quadradinho o item que saiu de casa. Ao fim do mês: 30 coisas a menos.</p>`,
  });

  const comodo = (key, nome, icone, diario, semanal, mensal, tema) => ({
    key, sec: s, eb: 'Checklist por cômodo', t: nome, sub: 'diário, semanal e mensal: sem tentar fazer tudo de uma vez', refil: true, tema, body: () => `
    ${[['Diário', 'sal', diario], ['Semanal', 'cre', semanal], ['Mensal', 'ter', mensal]].map(([t, c, l]) => box({ icon: icone, t, cor: c, cls: 'grow', body: `<div class="ac" style="margin-top:1mm">${l.map((x) => chk(x)).join('')}</div>${fill(6.2)}` })).join('')}`,
  });
  P.push(comodo('e2-cozinha', 'Cozinha', 'CookingPot', ['louça lavada ou na máquina', 'bancada livre e limpa', 'fogão passado um pano', 'lixo orgânico para fora'], ['geladeira: tirar o vencido', 'micro-ondas por dentro', 'pano e esponja trocados', 'chão varrido e passado pano'], ['armários: revisar mantimentos', 'forno e coifa', 'desengordurar azulejos'], 'mant'));
  P.push(comodo('e2-banheiro', 'Banheiro e quarto', 'Bath', ['banheiro: pia e espelho', 'quarto: cama arrumada', 'roupas usadas no cesto', 'criado-mudo livre'], ['banheiro: vaso, box e chão', 'trocar toalhas', 'trocar roupa de cama', 'quarto: tirar o pó'], ['organizar gavetas', 'lavar cortinas/tapetes', 'revisar remédios e cosméticos vencidos'], 'azul'));

  P.push({
    key: 'e2-divisao', sec: s, eb: 'Carga mental', t: 'Quem faz o quê <span class="gr">em casa</span>', sub: 'dividir tarefas tira peso das costas e da cabeça', body: () => `
    ${estudo('Daminger, 2019', 'Uma pesquisa com casais mostrou que o trabalho de casa tem uma parte <b>invisível</b>: perceber o que falta, planejar, decidir e acompanhar. Essa “carga mental” costuma ficar com uma pessoa só, mesmo quando a execução é dividida.', 'divida também o “lembrar e planejar”, não só o fazer.')}
    ${tabela(['Tarefa', 'Quem faz', 'Quem lembra / planeja', 'Frequência'], 12, 8.4, ['38%', '20%', '24%', ''])}
    ${box({ icon: 'MessageCircle', t: 'Combinado da casa', s: 'conversem num momento calmo, não no meio da bagunça', cor: 'cre', cls: 'grow', body: fill() })}`,
  });

  P.push({
    key: 'e2-revisao', sec: s, eb: 'Depois de 30 dias', t: 'Minha casa, <span class="gr">minha mente</span>', sub: 'compare como você se sentia antes e agora', data: true, body: () => `
    ${box({ icon: 'Gauge', t: 'Como me sinto em casa', s: '0 = nada · 10 = muito', cor: 'white', style: 'flex:0 0 auto', body: `<div style="display:flex;flex-direction:column;gap:2mm;margin-top:1.6mm">${['Consigo descansar em casa', 'A bagunça me deixa ansiosa(o)', 'Sei o que fazer e quando', 'Me cobro pela casa'].map((t) => `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:7.4pt">${t}</span><span style="display:flex;gap:2mm;align-items:center"><span class="mini">antes</span><span style="width:8mm;border-bottom:.25mm solid ${C.gra}44;height:4mm"></span><span class="mini">agora</span><span style="width:8mm;border-bottom:.25mm solid ${C.gra}44;height:4mm"></span></span></div>`).join('')}</div>` })}
    ${box({ icon: 'Sparkles', t: 'O que mais mudou', cor: 'sal', cls: 'grow', body: fill() })}
    ${box({ icon: 'Repeat', t: 'Os hábitos que vou manter', cor: 'ter', cls: 'grow', body: fill() })}`,
  });

  P.push({
    key: 'e2-ref', sec: s, eb: 'Para saber mais', t: 'Referências', body: () => referencias([
      'Saxbe, D. E., & Repetti, R. (2010). No place like home: Home tours correlate with daily patterns of mood and cortisol. <i>Personality and Social Psychology Bulletin</i>, 36(1), 71–81.',
      'McMains, S., & Kastner, S. (2011). Interactions of top-down and bottom-up mechanisms in human visual cortex. <i>Journal of Neuroscience</i>, 31(2), 587–597.',
      'Roster, C. A., Ferrari, J. R., & Jurkat, M. P. (2016). The dark side of home: Assessing possession ‘clutter’ on subjective well-being. <i>Journal of Environmental Psychology</i>, 46, 32–41.',
      'Masicampo, E. J., & Baumeister, R. F. (2011). Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals. <i>Journal of Personality and Social Psychology</i>, 101(4), 667–683.',
      'Hanley, A. W., Warner, A. R., Dehili, V. M., Canto, A. I., & Garland, E. L. (2015). Washing dishes to wash the dishes: Brief instruction in an informal mindfulness practice. <i>Mindfulness</i>, 6(5), 1095–1103.',
      'Daminger, A. (2019). The cognitive dimension of household labor. <i>American Sociological Review</i>, 84(4), 609–633.',
      'Allen, D. (2001). <i>Getting Things Done: The Art of Stress-Free Productivity</i>. Viking. (origem da “regra dos 2 minutos”)',
    ]),
  });
  if (modo === 'imp') P.push({ key: 'e2-cc', sec: s, raw: () => contracapa('Casa leve, cabeça leve.') });
  return P;
}

/* ===================================================================== */
/* 3. ROTINAS PRONTAS PARA MENTES ANSIOSAS                                */
/* ===================================================================== */
function rotinasProntas(modo) {
  const P = [];
  const s = 'e3';
  P.push({ key: 'e3-capa', sec: s, raw: () => capa({ selo: 'Material extra', topo: 'PLANNER MENTE CALMA', titulo: 'Rotinas Prontas<br>para Mentes Ansiosas', tag: '8 rotinas já montadas, passo a passo, para cada momento do dia. É só seguir.', ordem: ['#ECE8F6', '#BEB4DE', '#5B4E8C', '#F6E6DC'], sub: '8 rotinas guiadas' }) });

  P.push({
    key: 'e3-porque', sec: s, sp: true, eb: 'Entenda primeiro', t: 'Por que a rotina <span class="gr">acalma</span>', sub: 'previsibilidade é um remédio natural para a mente ansiosa', body: () => `
    <p class="tx">A ansiedade se alimenta de <b>incerteza</b>. Quando cada momento do dia exige uma decisão (“e agora, o que eu faço?”), a mente fica em alerta. Uma rotina pronta tira essas decisões do caminho: o próximo passo já está escolhido, e a mente pode descansar.</p>
    ${estudo('Carleton, 2016', 'A <b>dificuldade de tolerar a incerteza</b> aparece em vários transtornos de ansiedade e é considerada um fator central para eles.', 'rotinas criam pequenas ilhas de previsibilidade no dia.')}
    ${estudo('Gollwitzer & Sheeran, 2006', 'Uma revisão de 94 estudos mostrou que planos no formato <b>“se X acontecer, então eu faço Y”</b> aumentam bastante a chance de a pessoa realmente agir.', 'cada rotina deste material começa com um gatilho “depois de…”.')}
    ${estudo('Lally et al., 2010', 'Um hábito levou em média <b>66 dias</b> para ficar automático (variando de 18 a 254). E <b>falhar um dia não atrapalhou</b> a formação do hábito.', 'pulou um dia? Só continue. Ninguém precisa de sequência perfeita.')}
    ${estudo('Phillips et al., 2017', 'Estudantes com horários de sono <b>irregulares</b> tinham o relógio biológico atrasado e pior desempenho do que os de horários regulares, mesmo dormindo um total parecido.', 'horário de deitar e acordar parecido todos os dias, inclusive no fim de semana.')}`,
  });

  P.push({
    key: 'e3-comousar', sec: s, eb: 'Como usar', t: 'Escolha uma. <span class="gr">Comece pequeno.</span>', sub: 'não tente adotar as 8 rotinas de uma vez', body: () => `
    ${passos([
      ['Escolha uma rotina só.', 'A que resolveria o momento mais difícil do seu dia hoje (manhã corrida? noite sem conseguir desligar?).'],
      ['Comece pela versão mínima.', 'Cada rotina tem uma versão de 3 minutos para os dias pesados. Fazer a mínima conta como fazer.'],
      ['Grude num gatilho.', 'Escreva o “depois de…” (depois do café, depois do banho). Hábito novo pega carona em hábito antigo.'],
      ['Marque os dias.', 'Cada rotina tem uma linha de 14 dias. Ver a sequência no papel motiva a continuar.'],
      ['Em 2 semanas, avalie.', 'Funcionou? Mantenha e acrescente outra. Não funcionou? Ajuste o horário ou os passos.'],
    ])}
    <div class="g2">
      ${[['Sunrise', 'Manhã sem pressa', 'e3-manha'], ['Brain', 'Começar a trabalhar', 'e3-foco'], ['Wind', 'Pausa de 5 minutos', 'e3-pausa'], ['DoorOpen', 'Chegar em casa', 'e3-transicao'], ['Moon', 'Noite que desacelera', 'e3-noite'], ['LifeBuoy', 'Dia de crise', 'e3-crise'], ['Footprints', 'Movimento mínimo', 'e3-movimento'], ['CalendarCheck', 'Domingo de preparo', 'e3-domingo']].map(([i, t, k]) => `<${modo === 'dig' ? `a href="#p-${k}"` : 'div'} class="box b-cre" style="flex-direction:row;gap:2.2mm;align-items:center;padding:2mm 2.4mm"><span style="color:var(--p)">${ic(i, 13)}</span><span style="font-size:7.6pt;font-weight:700">${t}</span></${modo === 'dig' ? 'a' : 'div'}>`).join('')}
    </div>
    ${box({ icon: 'Flag', t: 'A rotina que eu começo esta semana', s: 'e por quê', cor: 'ter', cls: 'grow', body: fill() })}`,
  });

  /** Modelo de rotina pronta. */
  const rotina = ({ key, t, sub, icon, quando, dur, gatilho, passos: ps, minima, ciencia, tema }) => ({
    key, sec: s, eb: 'Rotina pronta', t, sub, refil: true, tema, body: () => `
    <div style="display:flex;gap:1.4mm;flex-wrap:wrap;flex:0 0 auto">
      ${[['Clock', quando], ['Timer', dur], ['Link', gatilho]].map(([i, x]) => `<span class="chip c-sal" style="display:inline-flex;align-items:center;gap:1mm;text-transform:none;letter-spacing:0;font-size:6.8pt;font-weight:600">${ic(i, 9)}${x}</span>`).join('')}
    </div>
    <div class="box b-white" style="flex:0 0 auto;padding:2.4mm 3mm">
      <div class="bt">${ic(icon, 11)}<span>Passo a passo</span><em>e por que cada passo ajuda</em></div>
      <div style="display:flex;flex-direction:column;margin-top:1.4mm">
        ${ps.map(([tm, a, pq], i) => `<div style="display:flex;gap:2.4mm;align-items:flex-start;padding:1.5mm 0;${i < ps.length - 1 ? `border-bottom:.25mm dotted ${C.gra}2a` : ''}">
          <span class="cb" style="margin-top:.5mm"></span>
          <span style="width:10mm;flex-shrink:0;font-family:Mont;font-weight:700;font-size:6.6pt;color:var(--t-tx);padding-top:.3mm">${tm}</span>
          <p style="font-size:7.7pt;line-height:1.36"><b>${a}</b><br><span class="mini" style="font-size:6.7pt">${pq}</span></p>
        </div>`).join('')}
      </div>
    </div>
    <div class="row" style="flex:0 0 auto">
      <div class="box b-ter" style="padding:2.4mm 2.8mm"><div class="bt">${ic('CloudSun', 10)}<span>Versão mínima · dias difíceis</span></div><p style="font-size:7.3pt;line-height:1.4;margin-top:1mm">${minima}</p></div>
      <div class="box b-sal" style="padding:2.4mm 2.8mm"><div class="bt">${ic('FlaskConical', 10)}<span>Por que funciona</span></div><p style="font-size:7pt;line-height:1.4;margin-top:1mm">${ciencia}</p></div>
    </div>
    ${box({ icon: 'PenLine', t: 'Do meu jeito', s: 'o que eu ajusto, horário, observações', cor: 'cre', cls: 'grow', body: fill() })}
    <div style="flex:0 0 auto"><p class="lbl" style="margin-bottom:1mm">14 dias · marque: ● completa · ◐ mínima</p>
      <div style="display:grid;grid-template-columns:repeat(14,1fr);gap:1mm">${Array.from({ length: 14 }, (_, d) => `<div style="text-align:center"><span style="font-size:5.4pt;font-family:Mont;font-weight:700;color:var(--p)">${d + 1}</span><span style="display:block;margin:0 auto;width:5mm;height:5mm;border-radius:50%;border:.3mm solid var(--ln);background:#fff"></span></div>`).join('')}</div>
    </div>`,
  });

  P.push(rotina({
    key: 'e3-manha', t: 'Manhã <span class="gr">sem pressa</span>', sub: 'começar o dia antes que o mundo comece por você', icon: 'Sunrise', quando: 'ao acordar', dur: '10 minutos', gatilho: 'depois de levantar da cama', tema: 'lav',
    passos: [
      ['1 min', 'Não pegue o celular. Beba um copo d’água.', 'Os primeiros minutos sem notícias e mensagens evitam que o dia comece em modo de alerta.'],
      ['2 min', 'Abra a janela e pegue luz natural.', 'A luz da manhã é o principal sinal para o relógio biológico; ajuda o sono da noite seguinte.'],
      ['2 min', 'Alongue o corpo devagar (pescoço, ombros, costas).', 'Movimento suave reduz a tensão muscular que a ansiedade acumula durante a noite.'],
      ['3 min', 'Página Mente em 3 Lugares, versão rápida.', 'Tirar as preocupações da cabeça logo cedo evita que elas te acompanhem o dia todo.'],
      ['2 min', 'Escolha a prioridade número 1 do dia.', 'Uma decisão clara pela manhã diminui a sensação de “tudo ao mesmo tempo”.'],
    ],
    minima: 'Água, janela aberta e escolher uma única prioridade. Três minutos.',
    ciencia: 'A exposição à luz natural pela manhã ajuda a sincronizar o relógio biológico, e começar sem o celular reduz a quantidade de estímulos e cobranças logo cedo (Chang et al., 2015, sobre luz de telas e sono).',
  }));
  P.push(rotina({
    key: 'e3-foco', t: 'Começar a <span class="gr">trabalhar ou estudar</span>', sub: 'sair da paralisia e entrar no primeiro passo', icon: 'Brain', quando: 'início do trabalho/estudo', dur: '5 minutos', gatilho: 'depois de sentar à mesa', tema: 'azul',
    passos: [
      ['1 min', 'Celular em outro cômodo (ou na gaveta, no silencioso).', 'A simples presença do celular na mesa reduz a memória de trabalho disponível.'],
      ['1 min', 'Escreva as 3 tarefas do bloco, em ordem.', 'Decidir antes evita gastar energia decidindo toda hora.'],
      ['1 min', 'Quebre a primeira tarefa no menor passo possível.', '“Abrir o arquivo e escrever o título” é mais fácil de começar do que “fazer o relatório”.'],
      ['1 min', 'Respiração: inspire em 4, solte em 6, três vezes.', 'Soltar o ar mais devagar ativa a resposta de relaxamento do corpo.'],
      ['1 min', 'Timer de 25 a 50 minutos e comece pelo menor passo.', 'Um limite de tempo torna a tarefa finita e menos ameaçadora.'],
    ],
    minima: 'Celular longe e só o menor passo da primeira tarefa. Nada mais.',
    ciencia: 'O celular por perto rouba atenção mesmo desligado (Ward et al., 2017). E definir quando e como começar aumenta muito a chance de agir (Gollwitzer & Sheeran, 2006).',
  }));
  P.push(rotina({
    key: 'e3-pausa', t: 'Pausa de <span class="gr">5 minutos</span>', sub: 'para quando a tensão subir no meio do dia', icon: 'Wind', quando: 'meio do dia / tensão alta', dur: '5 minutos', gatilho: 'depois do almoço ou ao sentir tensão', tema: 'rosa',
    passos: [
      ['2 min', 'Suspiro cíclico: puxe o ar pelo nariz, puxe mais um pouco, solte bem devagar pela boca.', 'Repetir esse padrão por poucos minutos melhorou o humor e reduziu a agitação no corpo.'],
      ['1 min', 'Levante, alongue e olhe para longe (janela, horizonte).', 'Mudar a postura e o foco dos olhos interrompe o estado de alerta.'],
      ['1 min', 'Beba água e, se der, pegue um pouco de sol.', 'Pausa física de verdade, sem trocar uma tela por outra.'],
      ['1 min', 'Pergunte: “o que é o próximo passo?”. Só ele.', 'Volta o foco para o que dá para fazer agora.'],
    ],
    minima: 'Um minuto de suspiro cíclico, onde você estiver.',
    ciencia: 'Num estudo de 2023, 5 minutos diários de suspiro cíclico melhoraram o humor e reduziram a frequência respiratória em repouso mais do que a meditação de atenção plena no mesmo período (Balban et al., 2023).',
  }));
  P.push(rotina({
    key: 'e3-transicao', t: 'Chegar em casa <span class="gr">e desligar</span>', sub: 'um ritual para o trabalho não entrar com você', icon: 'DoorOpen', quando: 'fim do expediente', dur: '7 minutos', gatilho: 'depois de fechar o computador ou chegar em casa', tema: 'lav',
    passos: [
      ['2 min', 'Anote o que ficou pendente e o primeiro passo de amanhã.', 'Tarefas inacabadas voltam à mente; com um plano anotado, elas param de insistir.'],
      ['1 min', 'Diga em voz alta: “encerrado por hoje”.', 'Um marcador claro de fim ajuda o cérebro a mudar de modo.'],
      ['2 min', 'Troque de roupa e lave o rosto ou as mãos.', 'Ações físicas sinalizam a transição entre “trabalho” e “casa”.'],
      ['2 min', 'Faça algo do corpo: alongar, sentar na varanda, chá.', 'Uma pausa curta antes das tarefas da casa reduz a irritação acumulada.'],
    ],
    minima: 'Anotar o pendente e dizer “encerrado por hoje”.',
    ciencia: 'Fazer um plano concreto para metas não concluídas diminuiu os pensamentos intrusivos sobre elas (Masicampo & Baumeister, 2011).',
  }));
  P.push(rotina({
    key: 'e3-noite', t: 'Noite que <span class="gr">desacelera</span>', sub: 'preparar o corpo e a mente para dormir', icon: 'Moon', quando: '1 hora antes de deitar', dur: '15 minutos', gatilho: 'depois do jantar ou do banho', tema: 'azul',
    passos: [
      ['5 min', 'Escreva a lista de tarefas de amanhã, com detalhes.', 'Num estudo com polissonografia, quem escreveu a lista de amanhã antes de deitar dormiu mais rápido do que quem escreveu o que já tinha feito.'],
      ['1 min', 'Celular para fora do quarto, despertador comum.', 'A tela à noite atrasa a melatonina e o sono.'],
      ['5 min', 'Luz baixa e uma atividade calma (banho morno, leitura em papel).', 'Pouca luz e pouco estímulo avisam o corpo de que o dia acabou.'],
      ['2 min', 'Uma coisa boa do dia, escrita.', 'Fechar o dia com algo positivo muda a última imagem antes de dormir.'],
      ['2 min', 'Respiração 4-4-6 já deitada(o).', 'Ritmo lento de respiração favorece o relaxamento.'],
    ],
    minima: 'Lista de amanhã e celular fora do quarto.',
    ciencia: 'Escrever a lista de tarefas antes de dormir acelerou o adormecer (Scullin et al., 2018). Ler em tela antes de dormir atrasou o sono e a melatonina (Chang et al., 2015).',
  }));
  P.push(rotina({
    key: 'e3-crise', t: 'Dia de <span class="gr">crise ansiosa</span>', sub: 'o roteiro para os piores dias: sem metas, só cuidado', icon: 'LifeBuoy', quando: 'quando a ansiedade estiver muito alta', dur: 'o dia todo, no mínimo', gatilho: 'ao perceber que o dia está pesado', tema: 'rosa',
    passos: [
      ['agora', 'Respire: 4 suspiros cíclicos e pés no chão.', 'Primeiro acalmar o corpo; pensar vem depois.'],
      ['5 min', 'Técnica 5-4-3-2-1: 5 coisas que vê, 4 que toca, 3 que ouve, 2 cheiros, 1 sabor.', 'Usar os sentidos traz a atenção para o presente e para fora do “e se…”.'],
      ['10 min', 'Corte a lista do dia para o essencial (até 2 itens).', 'Reduzir as exigências diminui a sensação de ameaça.'],
      ['ao longo', 'Cuide do básico: comer, beber água, remédio (se houver), banho.', 'Corpo cuidado aguenta melhor a ansiedade.'],
      ['à noite', 'Avise alguém de confiança como você está.', 'Apoio social é um dos fatores mais protetores contra o sofrimento.'],
    ],
    minima: 'Respirar, comer algo, beber água e falar com uma pessoa. Se for demais, ligue 188 (CVV).',
    ciencia: 'Técnicas de respiração lenta e de ancoragem nos sentidos ajudam a baixar a ativação do corpo. Se as crises forem frequentes, procure acompanhamento: há tratamentos eficazes para ansiedade.',
  }));
  P.push(rotina({
    key: 'e3-movimento', t: 'Movimento <span class="gr">mínimo</span>', sub: 'para quem não tem tempo, energia nem vontade de academia', icon: 'Footprints', quando: 'qualquer hora do dia', dur: '10 minutos', gatilho: 'depois de uma refeição', tema: 'mant',
    passos: [
      ['5 min', 'Caminhada leve (rua, quintal, corredor, escada).', 'Atividade aeróbica leve já melhora o humor e diminui a tensão.'],
      ['2 min', '10 agachamentos apoiado numa cadeira + 10 elevações de calcanhar.', 'Força leve ativa grandes grupos musculares sem exigir preparo.'],
      ['2 min', 'Alongamento de pescoço, ombros e quadril.', 'Ansiedade costuma se acumular como tensão nessas regiões.'],
      ['1 min', 'Respiração lenta, notando o coração desacelerar.', 'Ensina o corpo que coração acelerado também pode ser sinal de saúde, não só de perigo.'],
    ],
    minima: '5 minutos de caminhada, de preferência ao ar livre.',
    ciencia: 'Uma grande revisão de estudos concluiu que a atividade física reduz sintomas de ansiedade e depressão, com benefícios mesmo em intensidades leves e moderadas (Singh et al., 2023).',
  }));
  P.push(rotina({
    key: 'e3-domingo', t: 'Domingo <span class="gr">de preparo</span>', sub: '20 minutos que tiram o peso da segunda-feira', icon: 'CalendarCheck', quando: 'domingo à tarde', dur: '20 minutos', gatilho: 'depois do almoço de domingo', tema: 'brand',
    passos: [
      ['5 min', 'Olhe a semana: compromissos, contas, prazos.', 'Ver tudo de uma vez evita sustos e a ansiedade de domingo à noite.'],
      ['5 min', 'Preencha a Semana leve do planner com o foco da semana.', 'Um foco só dá direção sem sobrecarregar.'],
      ['5 min', 'Prepare o que der: roupas da segunda, marmita, bolsa.', 'Cada decisão tomada hoje é uma a menos na manhã corrida.'],
      ['5 min', 'Reserve um momento bom na semana (encontro, passeio, hobby).', 'Ter algo agradável marcado melhora o ânimo e equilibra as obrigações.'],
    ],
    minima: 'Só olhar a agenda da semana e anotar o foco.',
    ciencia: 'Planejar quando e como fazer as tarefas reduz os pensamentos repetitivos sobre elas (Masicampo & Baumeister, 2011) e aumenta a chance de cumpri-las (Gollwitzer & Sheeran, 2006).',
  }));

  P.push({
    key: 'e3-montar', sec: s, eb: 'Personalize', t: 'Minha rotina <span class="gr">se… então…</span>', sub: 'adapte qualquer rotina à sua vida', refil: true, body: () => `
    <div class="box b-pet" style="flex:0 0 auto"><p style="font-size:7.8pt;line-height:1.45"><b>A fórmula:</b> “Depois de <i>[algo que eu já faço todo dia]</i>, eu vou <i>[novo passo pequeno]</i>, em <i>[lugar]</i>.” Quanto mais específico, mais fácil de cumprir.</p></div>
    ${[1, 2, 3].map((n) => `<div class="box ${n % 2 ? 'b-sal' : 'b-cre'}" style="flex:1;min-height:0;padding:2.4mm 3mm">
      <div class="bt"><span class="num">${n}</span><span>Rotina ${n}</span><em>nome: ____________________</em></div>
      <div style="display:flex;flex-direction:column;gap:1.4mm;margin-top:1.4mm;font-size:7.4pt">
        ${['Depois de', 'eu vou', 'onde', 'versão mínima'].map((r) => `<div style="display:flex;gap:1.6mm;align-items:flex-end"><b style="color:var(--p);white-space:nowrap;width:18mm">${r}</b><span style="flex:1;border-bottom:.25mm solid ${C.gra}44;height:5mm"></span></div>`).join('')}
      </div>
    </div>`).join('')}`,
  });

  P.push({
    key: 'e3-rastreador', sec: s, eb: '30 dias', t: 'Rastreador <span class="gr">das rotinas</span>', sub: 'escreva as rotinas que você escolheu e marque os dias', refil: true, body: () => `
    <div style="flex:1;display:grid;grid-template-columns:7mm repeat(5,1fr) 20mm;grid-template-rows:14mm repeat(30,1fr);min-height:0;font-size:6pt">
      <span></span>
      ${Array.from({ length: 5 }, (_, i) => `<div style="border-radius:1.6mm 1.6mm 0 0;background:${i % 2 ? C.cre : 'var(--s-bg)'};margin:0 .4mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm"><span style="font-family:Mont;font-size:5pt;color:${C.gra}55">rotina ${i + 1}</span></div>`).join('')}
      <div style="border-radius:1.6mm 1.6mm 0 0;background:var(--t-bg);margin-left:1mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm"><span style="font-family:Mont;font-weight:700;font-size:5pt;color:var(--t-tx)">ANSIEDADE 0–10</span></div>
      ${Array.from({ length: 30 }, (_, d) => `<span style="display:flex;align-items:center;font-family:Mont;font-weight:700;color:var(--p);font-size:6pt">${d + 1}</span>${Array.from({ length: 5 }, (_, i) => `<div style="background:${i % 2 ? C.cre : 'var(--s-bg)'};margin:0 .4mm;display:flex;align-items:center;justify-content:center;border-top:.2mm solid #fff"><span style="width:3.1mm;height:3.1mm;border-radius:50%;border:.28mm solid var(--ln);background:#fff"></span></div>`).join('')}<div style="background:var(--t-bg);margin-left:1mm;border-top:.2mm solid #fff"></div>`).join('')}
    </div>`,
  });

  P.push({
    key: 'e3-ref', sec: s, eb: 'Para saber mais', t: 'Referências', body: () => referencias([
      'Carleton, R. N. (2016). Into the unknown: A review and synthesis of contemporary models involving uncertainty. <i>Journal of Anxiety Disorders</i>, 39, 30–43.',
      'Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. <i>Advances in Experimental Social Psychology</i>, 38, 69–119.',
      'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. <i>European Journal of Social Psychology</i>, 40(6), 998–1009.',
      'Phillips, A. J. K., et al. (2017). Irregular sleep/wake patterns are associated with poorer academic performance and delayed circadian and sleep/wake timing. <i>Scientific Reports</i>, 7, 3216.',
      'Balban, M. Y., et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. <i>Cell Reports Medicine</i>, 4(1), 100895.',
      'Scullin, M. K., Krueger, M. L., Ballard, H. K., Pruett, N., & Bliwise, D. L. (2018). The effects of bedtime writing on difficulty falling asleep: A polysomnographic study comparing to-do lists and completed activity lists. <i>Journal of Experimental Psychology: General</i>, 147(1), 139–146.',
      'Chang, A.-M., Aeschbach, D., Duffy, J. F., & Czeisler, C. A. (2015). Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness. <i>PNAS</i>, 112(4), 1232–1237.',
      'Ward, A. F., Duke, K., Gneezy, A., & Bos, M. W. (2017). Brain drain: The mere presence of one’s own smartphone reduces available cognitive capacity. <i>Journal of the Association for Consumer Research</i>, 2(2), 140–154.',
      'Masicampo, E. J., & Baumeister, R. F. (2011). Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals. <i>Journal of Personality and Social Psychology</i>, 101(4), 667–683.',
      'Singh, B., et al. (2023). Effectiveness of physical activity interventions for improving depression, anxiety and distress: An overview of systematic reviews. <i>British Journal of Sports Medicine</i>, 57(18), 1203–1209.',
    ]),
  });
  if (modo === 'imp') P.push({ key: 'e3-cc', sec: s, raw: () => contracapa('Rotina é carinho com a sua mente.') });
  return P;
}

export function extras(modo) {
  return { e1: menosTela(modo), e2: casaEmOrdem(modo), e3: rotinasProntas(modo) };
}
