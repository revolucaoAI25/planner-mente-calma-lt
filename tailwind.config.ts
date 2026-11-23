import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleo: { DEFAULT: '#315F5A', escuro: '#244A46', claro: '#4C7C75' },
        salvia: { DEFAULT: '#A8BDB0', claro: '#DCE7E0', bg: '#EAF1EC' },
        creme: { DEFAULT: '#F7F4ED', escuro: '#EFE9DD' },
        grafite: '#263431',
        terracota: { DEFAULT: '#D7A58D', escuro: '#B5694A', claro: '#F6E4D9' },
      },
      fontFamily: {
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        suave: '0 10px 30px -12px rgba(38,52,49,.22)',
        papel: '0 18px 40px -18px rgba(38,52,49,.35), 0 2px 6px rgba(38,52,49,.06)',
      },
      keyframes: {
        flutua: { '0%,100%': { transform: 'translateY(0) rotate(-2deg)' }, '50%': { transform: 'translateY(-10px) rotate(-1deg)' } },
        entra: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'none' } },
        brilho: { '0%': { transform: 'translateX(-120%)' }, '60%,100%': { transform: 'translateX(220%)' } },
        pulso: { '0%,100%': { boxShadow: '0 0 0 0 rgba(181,105,74,.45)' }, '50%': { boxShadow: '0 0 0 12px rgba(181,105,74,0)' } },
        balao: { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(3px,-5px)' } },
      },
      animation: {
        flutua: 'flutua 6s ease-in-out infinite',
        entra: 'entra .7s cubic-bezier(.2,.7,.2,1) both',
        brilho: 'brilho 3.2s ease-in-out infinite',
        pulso: 'pulso 2.2s ease-out infinite',
        balao: 'balao 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
