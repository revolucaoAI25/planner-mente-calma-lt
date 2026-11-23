import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Tracking } from '@/components/Tracking';
import { lato, montserrat } from './fonts';
import './globals.css';

const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const utmify = process.env.NEXT_PUBLIC_UTMIFY_UTMS !== '0';
const utmifyPixel = (process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID || '').replace(/[^a-zA-Z0-9]/g, '');
// Com o Pixel da Utmify ligado, ela dispara o Pixel da Meta (com deduplicação). Carregar o da Meta também duplicaria os eventos.
const pixelId = utmifyPixel ? '' : (process.env.NEXT_PUBLIC_META_PIXEL_ID || '').replace(/\D/g, '');

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: 'Planner Mente Calma · O planner para quem vive com ansiedade',
  description: 'Em 10 minutos por dia, tire as preocupações da cabeça, organize sua rotina e saiba por onde começar. Planner em PDF para imprimir ou usar no tablet.',
  openGraph: {
    title: 'Planner Mente Calma',
    description: 'O planner criado para quem vive com ansiedade e uma mente que não desliga.',
    images: ['/img/planner-capa.webp'],
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#315F5A' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://pay.kiwify.com.br" />
        <link rel="preconnect" href="https://pay.kiwify.com.br" crossOrigin="" />
        {pixelId ? (
          <>
            <link rel="preconnect" href="https://connect.facebook.net" />
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="min-h-dvh font-sans">
        {children}
        <Tracking />
        {utmify ? (
          <Script id="utmify-utms" src="https://cdn.utmify.com.br/scripts/utms/latest.js" strategy="afterInteractive" data-utmify-prevent-xcod-sck="" data-utmify-prevent-subids="" />
        ) : null}
        {utmifyPixel ? (
          <Script id="utmify-pixel" strategy="afterInteractive">
            {`window.pixelId="${utmifyPixel}";var a=document.createElement("script");a.setAttribute("async","");a.setAttribute("defer","");a.setAttribute("src","https://cdn.utmify.com.br/scripts/pixel/pixel.js");document.head.appendChild(a);`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
