# Planner Mente Calma · página de vendas

Next.js 15 + Tailwind. Tudo o que muda com frequência (preço, checkout, imagens) fica em `src/config/oferta.ts`.

## Variáveis (Vercel)
Veja `.env.example`. A principal é `NEXT_PUBLIC_CHECKOUT` (link do checkout da Kiwify).

## Pendências para o lançamento
- Link do checkout da Kiwify (`NEXT_PUBLIC_CHECKOUT`) e Pixel/Utmify.
- Prints reais das páginas do planner → `public/img/paginas/` e campo `img` em `imagens.porDentro`.
- Capas dos 4 bônus → `imagens.bonus`.
- Depoimentos reais (prints) → `imagens.depoimentos`.
- E-mail de suporte (`NEXT_PUBLIC_SUPORTE_EMAIL`) e domínio (`NEXT_PUBLIC_SITE_URL`).
- Na Kiwify: página de obrigado → `/obrigado`; garantia de 7 dias; order bumps.
