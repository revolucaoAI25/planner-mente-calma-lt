import Link from 'next/link';
import { Logo } from './Logo';

export function Legal({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <main className="estreito py-10">
      <Link href="/"><Logo /></Link>
      <h1 className="mt-8 text-[30px] font-bold">{titulo}</h1>
      <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-grafite/80">{children}</div>
      <p className="mt-10"><Link href="/" className="font-bold text-petroleo underline">Voltar para a página</Link></p>
    </main>
  );
}
