# Planner Mente Calma · Guia de produção dos 5 criativos em vídeo

Este guia transforma o briefing em **lista de takes**. Para cada take ele diz:
- o que gerar com IA e o que já está pronto nesta pasta;
- o prompt da imagem e o prompt da animação;
- a fala, o texto na tela, os efeitos sonoros e a edição.

## 0. A regra que resolve 80% dos problemas

O planner **nunca é desenhado pela IA**. A IA gera **pessoas, mãos, ambientes e o tablet com a tela verde**. Tudo o que aparece na tela vem dos arquivos desta pasta, com as **páginas reais do PDF**: sem letra errada, sem página inventada, sem logo deformado.

| Pasta | O que tem | Para quê |
|---|---|---|
| `telas/` | 14 páginas reais em 1536×2048 (3:4, proporção de tela de tablet) | Colocar dentro do tablet verde nas cenas com pessoa |
| `inserts/*-tela.mp4` | 9 vídeos só da tela (1080×1440): escrita à mão, destaques, troca de páginas | Colocar dentro do tablet verde quando a tela precisa ter movimento |
| `inserts/*-vertical.mp4` | Os mesmos 9 vídeos já num tablet, em 9:16 sobre o fundo da marca | Usar direto como cena de demonstração (corte seco), sem IA |
| `tela-final/` | 10 telas finais: 5 criativos × versão **A** (sem preço) e **B** (com preço), em PNG e MP4 de 3,5 s | Últimos 3 segundos de cada vídeo |
| `logo/` | Logo original recortado, com fundo transparente (completo e só o símbolo) | Marca d'água discreta, se quiser |

### Os 9 inserts prontos

| Arquivo | Página real | O que acontece | Duração |
|---|---|---|---|
| `metodo` | 6 · Método Mente em 3 Lugares | Zoom nos 3 cards; contorno em **Resolver → Programar → Desocupar** | 10 s |
| `despejar` | 21 · Tire tudo da cabeça | Escrita à mão: pagar a conta de luz, marcar consulta, “e se eu for mal na reunião amanhã?”, responder a Ana | 8 s |
| `distribuir` | 21 | A câmera passa coluna por coluna e escreve em cada uma: pagar a luz → Resolver; consulta → quinta → Programar; “e se eu for mal na reunião?” → Desocupar | 15 s |
| `definir` | 21 | Zoom em “Minha primeira ação”: “pagar a luz pelo app do banco”, quando: “agora, 19h” | 5 s |
| `paginas` | 1, 20, 12, 22, 18, 1 | Folheando: capa → organizador de preocupações → meu mês → meu dia → jornada de 30 dias → capa | 9 s |
| `noite` | 21 | Preocupações da noite escritas e distribuídas nos 3 lugares | 11 s |
| `meumes` | 12 · Meu mês | Janeiro / 2027, foco do mês e 3 objetivos leves | 8 s |
| `dia` | 20 → 22 | Organizador de preocupações → Meu dia sem sobrecarga, com zoom lento | 10 s |
| `capa` | 1 | Capa com aproximação lenta | 4 s |

---

## 1. Ferramentas (o que funciona hoje)

| Etapa | Ferramenta sugerida | Observação |
|---|---|---|
| Imagem estática | **Gemini (Nano Banana)** ou **ChatGPT (imagem)** | Gere primeiro a **ficha da personagem** e anexe ela em todos os takes do mesmo vídeo |
| Animação | **Veo 3** ou **Kling 2.x** (imagem → vídeo) | Takes de 5 a 8 s. Peça câmera quase parada quando houver tablet verde |
| Fala com boca (lip sync) | **Veo 3** já gera com fala, ou **Kling Lip Sync / HeyGen / Hedra** a partir do áudio | Só nas cenas em que a personagem fala para a câmera |
| Voz | **ElevenLabs**, modelo *Multilingual v2*, voz feminina brasileira | Estabilidade 40–50%, similaridade 75%, estilo 15–25%, velocidade 1,0. Se me passar a chave, gero e corto as narrações como no ID Pet |
| Trilha | Biblioteca **comercial** do CapCut, Epidemic Sound ou Artlist | Precisa ter licença para anúncio. Evite música do TikTok sem licença |
| Edição | **CapCut** (desktop) | Ou me mande os takes que eu monto como no ID Pet |

### Como colocar a página dentro do tablet verde (CapCut)

1. Na cena gerada (tablet com tela **verde #00FF00**), aplique **Remover fundo → Chroma key** e escolha o verde.
2. Coloque por baixo, numa camada, o PNG de `telas/` ou o MP4 `*-tela.mp4`.
3. Ajuste posição, rotação e escala até encaixar.
4. Se o tablet se mexer muito no vídeo gerado, troque por um insert **vertical** pronto (corte seco). Fica mais limpo do que tentar rastrear.

> **Por isso, em todos os prompts de animação com tablet, a câmera fica quase parada e o tablet não muda de posição.**

---

## 2. Fichas das personagens (gere antes de tudo)

Gere **uma imagem de referência** por personagem e anexe ela em todos os takes daquele criativo.

**Base de estilo** (cole no fim de todo prompt de imagem):

```
STYLE: realistic smartphone photo (iPhone front or rear camera), natural indoor light, true-to-life skin texture with visible pores, minimal makeup, casual Brazilian home, subtle imperfections, no studio lighting, no beauty filter, no text, no watermark. Vertical 9:16. Anatomically correct hands with five fingers.
TABLET RULE (when a tablet appears): black iPad-like tablet in portrait orientation, thin bezels, the screen is a flat solid pure green (#00FF00) with no reflections, no icons, no text, fully visible, not cropped by fingers.
```

| Personagem | Criativo | Prompt da ficha |
|---|---|---|
| **Ana** | 01 | `Character reference sheet, front-facing medium close-up. Brazilian woman, 28 years old, medium-length straight brown hair loose behind the shoulders, warm light-brown skin, natural eyebrows, small gold stud earrings, oatmeal-beige knit sweater. Friendly, empathetic expression, slight smile, looking at the camera. Living room / home office with a window on the left, soft daylight, beige wall, wooden shelf slightly blurred.` |
| **Júlia** | 02 | `Character reference sheet, medium close-up. Brazilian woman, about 28, dark-brown wavy hair in a loose messy bun, olive skin, no makeup, wearing a light-grey cotton t-shirt pajama. Tired but natural expression. Bedroom at night, warm bedside lamp, neutral bedsheets.` |
| **Mãos** | 03 | `Close-up reference of a woman's hands, light-medium skin, short natural nails with nude polish, thin silver ring on the right index finger, holding a white stylus pen, light oak wooden desk seen from above, soft window daylight.` |
| **Carla** | 05 | `Character reference sheet, medium close-up. Brazilian woman, 33 years old, shoulder-length curly black hair, deep brown skin, small hoop earrings, sage-green linen button shirt over a white tee. Calm, reflective expression. Kitchen table next to a bright window in the morning, white tiles, a mug and a notebook slightly blurred.` |

O criativo 04 não tem personagem: só produto, mesa e post-its.

---

## 3. CRIATIVO 01 · “Você que sofre com ansiedade, precisa conhecer isso” (UGC, 35–45 s)

**Trilha:** lo-fi acústico, 85 a 95 BPM, volume baixo (10 a 12%).
**Edição:**
- cortes secos e zoom de 105–110% a cada frase;
- legenda dinâmica;
- palavras em destaque: **ANSIEDADE**, **PENSAMENTOS**, **10 MINUTOS**.

| Take | Tempo | Tipo | Imagem (prompt) | Animação (prompt) | Fala | Texto na tela |
|---|---|---|---|---|---|---|
| 1A | 0–3,5 s | IA + lip sync | `Ana (attached reference) sitting on a sofa in her living room, filmed with a phone held at arm's length, chest-up framing, looking straight into the lens, slight concerned-but-warm expression, hands near her chest mid-gesture.` | `Selfie-style handheld video, subtle natural camera shake, she talks to the camera with natural lip movement, blinks, small head tilt, one open-hand gesture. No zoom jumps.` | “Você que sofre com ansiedade, que tem milhões de pensamentos ao mesmo tempo…” | SUA MENTE NÃO DESLIGA? |
| 1B | 3,5–7 s | IA + lip sync | O mesmo take, enquadramento um pouco mais fechado (rosto e ombros) | `Same as 1A, she leans slightly toward the camera on "precisa conhecer isso aqui", eyebrows raised, sincere.` | “…e sente que a sua cabeça simplesmente não desliga, precisa conhecer isso aqui.” | — |
| 2 | 7–11 s | IA + tela | `Ana holding the black tablet with both hands, screen facing the camera, tablet at chest height, she smiles slightly. TABLET RULE.` | `She raises the tablet a few centimeters toward the camera and holds it still for 2 seconds. Camera static. The tablet must not change shape or angle.` | “É um planner desenvolvido especialmente para mentes ansiosas.” | PLANNER DIGITAL PARA **ANSIEDADE** · na tela: `telas/tela-01-capa.png` |
| 3 | 11–21 s | **Insert pronto** | — | — | “Diferente de uma agenda comum, ele não organiza só as suas tarefas. Ele ajuda a organizar também suas preocupações, seus pensamentos e tudo aquilo que fica ocupando a sua cabeça.” | TAREFAS + **PENSAMENTOS** + **PREOCUPAÇÕES** · usar `inserts/dia-vertical.mp4` |
| 3-alt | 11–21 s | IA + tela | `Top-down close-up of the tablet lying on a light wooden table, a woman's hand scrolling the screen with one finger. TABLET RULE.` | `Only the finger moves, a slow swipe up. Tablet static. Slow 5% push-in.` | (mesma fala) | Na tela: `inserts/dia-tela.mp4` |
| 4 | 21–31 s | **Insert pronto** | — | — | “Ele funciona com um método de apenas 10 minutos por dia, em que você separa o que precisa resolver, o que pode esperar e o que você está apenas antecipando.” | **10 MINUTOS POR DIA** · RESOLVER · PROGRAMAR · DESOCUPAR · usar `inserts/metodo-vertical.mp4` |
| 5A | 31–38 s | IA + lip sync | `Ana back on the sofa holding the tablet on her lap, screen toward the camera, friendly expression. TABLET RULE.` | `She talks to the camera with natural lip sync, glances at the tablet once, and on the last words points down with her index finger. Camera handheld but steady.` | “São 109 páginas, mais quatro bônus exclusivos, e você pode usar no tablet ou imprimir. Clica aqui embaixo e conhece o Planner Mente Calma.” | 109 PÁGINAS + 4 BÔNUS · DIGITAL E IMPRIMÍVEL · na tela: capa |
| 5B | 38–41,5 s | Tela final | — | — | — | `tela-final/c01-A-sem-preco.mp4` ou `c01-B-com-preco.mp4` |

**Hooks alternativos** (regrave só o take 1):
1. “Se a sua cabeça não para nem quando você tenta descansar, olha isso aqui.”
2. “Finalmente criaram um planner que não foi pensado só para organizar tarefas, mas também para a ansiedade.”
3. “Você que pensa demais, se preocupa demais e não consegue organizar tudo isso, presta atenção.”
4. *Versão mais segura para a Meta:* “Um planner desenvolvido para aqueles momentos em que a mente simplesmente não desliga.”

---

## 4. CRIATIVO 03 · Como organizar uma mente ansiosa em 10 minutos (só mãos, 35–45 s)

Prioridade 2. É o criativo **mais fácil**: quase tudo já está pronto em `inserts/`. A IA gera só 2 takes.

**Trilha:** lo-fi, ~100 BPM.
**Efeitos sonoros:**
- caneta deslizando nas escritas;
- “tic” em cada contorno;
- *swoosh* suave entre as etapas.

| Take | Tempo | Tipo | Prompt / arquivo | Fala | Texto na tela |
|---|---|---|---|---|---|
| 1 | 0–4 s | IA | **Imagem:** `Top-down view of a light oak desk: black tablet in the center (TABLET RULE), a white stylus beside it, around it 8 messy yellow and pink sticky notes with short handwritten words in Portuguese: "contas", "reunião", "e se...?", "mercado", "consulta", "futuro", "luz", "Ana". Soft daylight. Hands holding the stylus enter from the bottom.` **Animação:** `Fast smooth push-in toward the tablet, the sticky notes stay in place, hand lowers the stylus to the screen. 3 seconds.` | “Olha como funciona esse método de 10 minutos desenvolvido para mentes ansiosas.” | **MÉTODO DE 10 MINUTOS** PARA **MENTES ANSIOSAS** |
| 2 | 4–12 s | Insert | `inserts/despejar-vertical.mp4` | “Primeiro, você escreve absolutamente tudo que está ocupando a sua cabeça. Contas, tarefas, medos, preocupações, pensamentos sobre o futuro. Tudo.” | 1 · DESPEJAR — 3 MIN |
| 3 | 12–27 s | Insert | `inserts/distribuir-vertical.mp4` | “Depois, você separa cada pensamento em três lugares. Resolver: aquilo que depende de você e precisa de uma ação. Programar: aquilo que é importante, mas pode esperar. Desocupar: aquelas preocupações sobre coisas que ainda nem aconteceram.” | 2 · DISTRIBUIR — 5 MIN |
| 4 | 27–31 s | Insert | `inserts/definir-vertical.mp4` | “Por último, você escolhe um único próximo passo.” | 3 · DEFINIR — 2 MIN |
| 5 | 31–41 s | Insert | `inserts/paginas-vertical.mp4` | “Esse é o Método Mente em 3 Lugares, do Planner Mente Calma. Um planner digital para ansiedade, com 109 páginas e quatro bônus. Clique em Saiba Mais e conheça o método completo.” | 109 PÁGINAS + 4 BÔNUS · PLANNER DIGITAL PARA **ANSIEDADE** |
| 6 | 41–44,5 s | Tela final | `tela-final/c03-A…` / `c03-B…` | — | — |

**Para ficar mais “mão de verdade”:** gere um take IA com `Close-up of a woman's hand (attached reference) writing on the green-screen tablet with a white stylus, slight angle from above.` e coloque `inserts/despejar-tela.mp4` dentro dele. Intercale esse take com o insert vertical.

**Hooks alternativos:**
1. “Em vez de guardar cinquenta preocupações na cabeça, experimente fazer isso.”
2. “Um método de três passos para quando a ansiedade faz tudo parecer urgente.”
3. “Esse é o motivo pelo qual um planner comum é diferente de um planner para ansiedade.”

---

## 5. CRIATIVO 04 · Agenda comum vs. planner para ansiedade (comparativo, 20–30 s)

**Trilha:** batida moderna, 110 a 120 BPM, com cortes no tempo da música.
**Efeitos sonoros:** pop, swipe, clique, risco de caneta.
**Cores:**
- terracota **#B5694A** para o “caos”;
- verde-petróleo **#315F5A** para a organização.
- Fundo creme **#F7F4ED**.

| Take | Tempo | Tipo | Prompt | Fala | Texto |
|---|---|---|---|---|---|
| 1 | 0–3 s | IA | **Imagem:** `Minimal top-down flat lay on a cream background (#F7F4ED): on the left a plain black hardcover paper agenda, closed; on the right a black tablet (TABLET RULE). Lots of empty space, soft shadow, no props.` **Animação:** `Both objects slide in from opposite sides and stop side by side. Static camera.` | “Agenda comum versus planner para ansiedade.” | AGENDA COMUM **VS.** PLANNER PARA **ANSIEDADE** · na tela: capa |
| 2 | 3–7 s | IA | **Imagem:** `Top-down close-up of an open paper agenda with a long handwritten to-do list in Portuguese, blue pen: "responder e-mails", "pagar contas", "fazer compras", "organizar a casa", "marcar consulta", "finalizar relatório". Cream background.` **Animação:** `Very slow push-in, nothing else moves.` | “Uma agenda comum coloca todas as tarefas em uma lista.” | APENAS TAREFAS E COMPROMISSOS (na edição, faça os itens “aparecerem” com máscara, um por batida) |
| 3 | 7–13 s | IA | **Imagem:** `The same open agenda now surrounded by many overlapping sticky notes in terracotta and yellow with handwritten Portuguese words: "E se der errado?", "futuro", "preocupações", "medos", "trabalho", "contas". Slightly chaotic, cream background, top-down.` **Animação:** `Sticky notes pop in one by one around the agenda.` *(ou monte na edição com post-its em PNG)* | “Mas uma mente ansiosa não tem só tarefas. Tem medos, preocupações, pensamentos repetitivos e milhares de coisas acontecendo ao mesmo tempo.” | MEDOS · PREOCUPAÇÕES · PENSAMENTOS (em terracota) |
| 4 | 13–24 s | Insert | `inserts/metodo-vertical.mp4` (transição: os post-its “voam” para fora e entra o tablet) | “Por isso, o Planner Mente Calma tem um método para organizar também os pensamentos. São 10 minutos por dia para separar o que resolver, o que programar e o que desocupar da mente.” | ORGANIZE TAREFAS **E PENSAMENTOS** |
| 5 | 24–27 s | Insert | `inserts/paginas-vertical.mp4` (primeiros 3 s) | “Conheça o planner desenvolvido para mentes ansiosas.” | PLANNER DIGITAL PARA ANSIEDADE · 109 PÁGINAS + 4 BÔNUS |
| 6 | 27–30,5 s | Tela final | `tela-final/c04-A…` / `c04-B…` | — | — |

**Hooks alternativos:**
1. “Qual a diferença entre uma agenda comum e um planner para ansiosos?”
2. “Um planner tradicional não foi pensado para organizar preocupações.”
3. “Uma agenda organiza compromissos. Este planner organiza também aquilo que ocupa a mente.”

---

## 6. CRIATIVO 02 · POV: tentando dormir com uma mente ansiosa (25–35 s)

**Som:**
- até o take 3: ambiente noturno, grilo distante, pulsação grave discreta e vozes sobrepostas bem baixas;
- depois: piano suave, 65 a 75 BPM.

**Cor:** fria e escura no início, quente (luz do abajur) a partir do take 3.

| Take | Tempo | Tipo | Prompt | Fala | Texto |
|---|---|---|---|---|---|
| 1 | 0–2 s | IA | **Imagem:** `Cinematic close-up of a digital alarm clock on a bedside table showing 23:47 in red digits, dark bedroom, faint blue moonlight, shallow depth of field.` **Animação:** `Slow push-in, digits stay exactly 23:47.` | (som ambiente) | POV: TENTANDO DORMIR COM UMA **MENTE ANSIOSA** |
| 2A | 2–5,5 s | IA | **Imagem:** `Júlia (reference) lying in bed on her back, looking at the ceiling, eyes open, worried and tired, dark room lit only by cool moonlight, top-down angle from above the bed.` **Animação:** `She blinks slowly, breathes, eyes move across the ceiling. Lips closed, no talking.` | Pensamentos em off (voz baixa, íntima): “Será que eu esqueci alguma coisa?” · “E aquela reunião amanhã?” | Cada pensamento aparece flutuando na tela, um por vez |
| 2B | 5,5–9 s | IA | **Imagem:** `Same scene, Júlia turned on her side facing the camera, hand under the pillow, eyes open.` **Animação:** `She turns slightly, sighs (chest moves), closes her eyes tight then opens them. Lips closed.` | “E se não der certo?” · “Preciso pagar aquela conta…” · “Nossa, eu só queria conseguir dormir.” | — |
| 3 | 9–15 s | IA | **Imagem:** `Júlia sitting up in bed, reaching to turn on a warm bedside lamp, the tablet on the nightstand (TABLET RULE, screen off-black is fine), warm amber light filling the room.` **Animação:** `She switches on the lamp (light warms up), picks up the tablet and places it on her lap. Natural motion, static camera.` | “Quando a ansiedade faz a cabeça continuar trabalhando mesmo depois que o dia acaba, existe uma forma de organizar essas preocupações.” | — |
| 4 | 15–26 s | Insert (+IA opcional) | `inserts/noite-vertical.mp4` · Opcional: `Close-up of Júlia's hands writing on the green-screen tablet on her lap, warm lamp light, duvet visible.` com `inserts/noite-tela.mp4` dentro | “O Planner Mente Calma tem um método de 10 minutos para tirar os pensamentos da cabeça, separar as preocupações e definir o que realmente precisa de atenção.” | **10 MINUTOS** PARA ORGANIZAR AS **PREOCUPAÇÕES** |
| 5 | 26–30 s | IA + tela | **Imagem:** `The tablet resting on the duvet (TABLET RULE), warm lamp light, cozy, shallow depth of field.` **Animação:** `Very slow push-in. Nothing else moves.` | “Conheça o planner digital para ansiedade e experimente uma rotina mais leve.” | PLANNER MENTE CALMA · 109 PÁGINAS + 4 BÔNUS · na tela: `inserts/capa-tela.mp4` |
| 6 | 30–33,5 s | Tela final | `tela-final/c02-A…` / `c02-B…` (versão escura, combina com a noite) | — | — |

> **Não prometer sono.** A legenda não pode dizer “durma melhor” nem “acabe com a insônia”.

**Hooks alternativos:**
1. “Você que deita para dormir, mas a sua cabeça começa a pensar em absolutamente tudo.”
2. “23h47. O corpo está cansado. A mente está pensando nos próximos dez anos.”
3. “A hora de dormir não deveria ser a hora de tentar resolver a vida inteira.”

---

## 7. CRIATIVO 05 · Não quero levar essa ansiedade para 2027 (30–40 s)

**Trilha:** piano e violão, ~80 BPM, crescendo na apresentação do produto.
**Luz:** manhã, janela.

| Take | Tempo | Tipo | Prompt | Fala | Texto |
|---|---|---|---|---|---|
| 1 | 0–4 s | IA + lip sync | **Imagem:** `Carla (reference) sitting at the kitchen table by a bright window in the morning, phone-camera framing chest-up, reflective look into the lens.` **Animação:** `Talks to camera with natural lip sync, small head movement, soft smile at the end.` | “Sabe uma coisa que eu não quero levar comigo para 2027?” | O QUE EU NÃO QUERO LEVAR PARA **2027** |
| 2A | 4–6 s | IA | `Carla looking at a long handwritten to-do list on paper, pen in hand, slight frown, same kitchen.` / anim.: `She scans the list, exhales.` | (off) “Essa sensação de ter que pensar em tudo…” | PENSAR EM TUDO. |
| 2B | 6–8 s | IA | `Carla typing quickly on her phone, many notification badges implied (no readable text), same kitchen.` / anim.: `Thumbs typing fast, she glances up then back.` | “…resolver tudo…” | RESOLVER TUDO. |
| 2C | 8–10 s | IA | `Carla's desk covered with sticky notes and an open agenda, her hands moving papers.` / anim.: `Hands shuffle papers, slight overwhelm.` | “…e dar conta de tudo o tempo inteiro.” | DAR CONTA DE TUDO. |
| 3 | 10–16 s | IA + tela | `Carla closes a paper agenda and picks up the black tablet (TABLET RULE), natural lived-in table, not perfectly tidy.` / anim.: `She closes the agenda, sets it aside, lifts the tablet. Static camera.` | “Em vez de fazer mais uma lista enorme de metas, eu quero aprender a organizar a minha mente também.” | — |
| 4A | 16–20 s | Insert | `inserts/capa-vertical.mp4` | “E essa é a proposta do Planner Mente Calma.” | PLANNER PARA **ANSIEDADE** |
| 4B | 20–26 s | Insert | `inserts/metodo-vertical.mp4` (trecho dos 3 destaques) | “Um planner digital desenvolvido para mentes ansiosas, com um método de 10 minutos para organizar pensamentos, preocupações e prioridades.” | MÉTODO DE **10 MINUTOS** |
| 4C | 26–30 s | Insert | `inserts/meumes-vertical.mp4` | “Ele tem planejamento mensal…” | PLANEJAMENTO MENSAL |
| 4D | 30–33 s | Insert | `inserts/paginas-vertical.mp4` (trecho da jornada, 6–7,5 s) | “…uma jornada guiada de 30 dias e não tem datas fixas.” | JORNADA GUIADA DE 30 DIAS · SEM DATAS FIXAS |
| 5 | 33–37 s | IA + lip sync | `Carla holding the tablet (TABLET RULE) facing camera, warm smile.` / anim.: `Lip sync, gentle nod, points down at the end.` | “Se você também quer começar 2027 de uma forma mais leve, clica aqui e conhece o planner.” | na tela: capa |
| 6 | 37–40,5 s | Tela final | `tela-final/c05-A…` / `c05-B…` | — | — |

> **Importante:** a Carla é uma **personagem**, não uma cliente. Nada de “eu comprei e mudou minha vida”.

**Hooks alternativos:**
1. “A minha principal meta para 2027 é não passar o ano inteiro com a cabeça a mil.”
2. “Antes de organizar 2027, talvez seja hora de organizar a própria mente.”
3. “2027 não precisa ser mais um ano de listas infinitas e preocupações.”

---

## 8. Padrões de edição (todos os vídeos)

### Legendas
- **Fonte:** Montserrat ExtraBold, 64–72 px, branca com contorno ou sombra suave. Nas cenas claras, use texto verde-petróleo **#263431** sem contorno.
- **Linhas:** no máximo 2 linhas e 4 a 6 palavras por vez, na área central.
- **Palavras em destaque**, numa caixa amarela suave (#FFE08A) ou em terracota (#B5694A):
  - ANSIEDADE · MENTE ANSIOSA · PENSAMENTOS · PREOCUPAÇÕES;
  - PLANNER · 10 MINUTOS · 2027 · MÉTODO EXCLUSIVO.
- **Área segura do Reels:** nada importante nos 220 px de cima nem nos 420 px de baixo (as telas finais já respeitam isso).

### Áudio
- Voz em −14 LUFS.
- Trilha entre 8 e 15% (−24 a −20 dB abaixo da voz).
- Efeitos sonoros discretos.

### Versões A e B
Tudo igual nas duas. Só muda a **tela final**: `-A-sem-preco` ou `-B-com-preco`.
- No criativo 01, o texto “R$ 37” do take 5A **só entra na versão B**.

### Logo
Pequeno, no canto superior direito, com 70% de opacidade: `logo/logo-mente-calma-simbolo.png`. A capa no tablet já mostra o logo inteiro.

---

## 9. Checklist antes de exportar

- [ ] Mesma personagem em todos os takes do vídeo (rosto, cabelo, roupa).
- [ ] Mãos com 5 dedos, sem deformação.
- [ ] Na tela do tablet, só páginas desta pasta. Nenhuma página “desenhada” pela IA.
- [ ] Nome correto: **Planner Mente Calma**, e “planner digital para ansiedade” falado ou escrito.
- [ ] Método correto: **Despejar (3) → Distribuir (5): Resolver · Programar · Desocupar → Definir (2)**.
- [ ] Sem promessa de cura, de sono perfeito ou de substituir terapia.
- [ ] Nenhuma personagem apresentada como cliente real.
- [ ] Preço R$ 37 só nas versões B.
- [ ] Tela final visível por 3 s.
- [ ] Exportar em 1080×1920, 30 fps, H.264, ~12 Mbps.

## 10. Se quiser que eu monte os vídeos (como no ID Pet)

Me mande:
1. **Os takes de IA animados** (MP4), com os nomes da tabela: `c01-1A.mp4`, `c01-2.mp4`, …
2. **As narrações**: ou o áudio pronto por criativo, ou a chave do ElevenLabs e o nome da voz escolhida.
3. **A trilha escolhida** para cada criativo (MP3 com licença comercial).

Com isso eu faço:
- a composição das telas nos tablets verdes;
- legendas sincronizadas e destaques;
- mixagem;
- as 10 versões finais (A e B) e as variações de hook.
