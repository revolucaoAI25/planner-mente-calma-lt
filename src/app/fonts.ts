import localFont from 'next/font/local';

// Fontes servidas pelo próprio site (carregam rápido e não dependem do Google).
export const montserrat = localFont({ src: './fonts/montserrat.woff2', weight: '100 900', display: 'swap', variable: '--font-montserrat' });
/** Texto corrido: Plus Jakarta Sans (mais encorpada e legível que a Lato no celular). */
export const jakarta = localFont({
  src: [
    { path: './fonts/plus-jakarta-sans-latin-wght-normal.woff2', weight: '200 800', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-latin-wght-italic.woff2', weight: '200 800', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-texto',
});
