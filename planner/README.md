# Planner Mente Calma: arquivos do produto

Os PDFs são gerados em `planner/dist/` e copiados para `public/<pasta secreta>` (ver `src/config/entrega.ts`).
A entrega é por e-mail: compra aprovada na Kiwify → `/api/kiwify` → e-mail (Resend) com os links e a área `/acesso`.

**Atenção:** enquanto o repositório for público, os PDFs ficam fora do git (`.gitignore`), senão qualquer pessoa baixaria.
Com o repositório privado, tire as linhas `planner/dist/` e `public/a-*/` do `.gitignore` e faça commit dos PDFs.

| Arquivo | Para quê |
|---|---|
| LEIA PRIMEIRO - Guia de impressao e uso no tablet | instruções de impressão e de uso nos apps |
| Planner Mente Calma - TABLET (com abas e 4 bonus) | GoodNotes, Notability, Samsung Notes, Xodo… (abas e índice clicáveis, Jornada de 30 dias) |
| … - A5 (grafica ou impressora A5) | gráfica / impressora A5, frente e verso |
| … - A4 2 por folha (frente e verso, cortar ao meio) | impressora de casa: imprimir, cortar ao meio e empilhar |
| Refis - paginas do dia a dia | páginas mais usadas, 2 cópias por folha A4 |
| Teste de impressao frente e verso | 1 folha para acertar a configuração da impressora |

## Como gerar de novo

```bash
node planner/build.mjs          # gera os PDFs em planner/dist
node planner/build.mjs --png    # também gera prévias PNG em planner/.build/png
```

Conteúdo das páginas: `planner/src/paginas.mjs`. Visual (cores, caixas, linhas): `planner/src/ui.mjs`.
Precisa de Playwright/Chromium e Python com `pypdf`.
