import localFont from 'next/font/local';

// Fontes servidas pelo próprio site (carregam rápido e não dependem do Google).
export const montserrat = localFont({ src: './fonts/montserrat.woff2', weight: '100 900', display: 'swap', variable: '--font-montserrat' });
export const lato = localFont({
  src: [
    { path: './fonts/lato-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/lato-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/lato-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-lato',
});
