import { Download, FileText, Printer, Tablet, Gift, BookOpen } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { ARQUIVOS, GRUPOS, type Grupo } from '@/config/entrega';
import { marca } from '@/config/oferta';
import { lerToken } from '@/lib/entrega';

export const metadata = { title: 'Meus arquivos · Planner Mente Calma', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const ICONE: Record<Grupo, typeof Tablet> = { comece: BookOpen, tablet: Tablet, imprimir: Printer, bonus: Gift };

export default async function Acesso({ searchParams }: { searchParams: Promise<{ t?: string }> }) {
  const { t } = await searchParams;
  const a = lerToken(t);
  const link = (id: string) => `/api/baixar/${id}?t=${encodeURIComponent(t ?? '')}`;

  if (!a) {
    return (
      <main className="estreito min-h-dvh py-10">
        <Logo />
        <h1 className="mt-8 font-display text-[26px] font-bold">Link de acesso inválido</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-grafite/75">
          Use o botão do e-mail que você recebeu depois da compra (assunto “Seu Planner Mente Calma chegou”). Não encontrou? Confira o spam e a aba Promoções, ou fale com a gente: <b>{marca.suporte}</b>.
        </p>
      </main>
    );
  }

  const primeiro = (a.n || '').trim().split(/\s+/)[0];
  const grupos: Grupo[] = ['comece', 'tablet', 'imprimir', 'bonus'];

  return (
    <main className="min-h-dvh bg-creme pb-16">
      <div className="bg-petroleo pb-10 pt-6 text-creme">
        <div className="estreito">
          <Logo light />
          <h1 className="mt-8 font-display text-[28px] font-bold leading-tight sm:text-[34px]">{primeiro ? `${primeiro}, aqui estão` : 'Aqui estão'} os seus arquivos 💚</h1>
          <p className="mt-2 text-[16px] leading-relaxed text-creme/80">Planner Mente Calma + 4 bônus. Esta página fica sempre disponível pelo link do seu e-mail.</p>
        </div>
      </div>

      <div className="estreito -mt-5 space-y-5">
        <section className="card p-5">
          <h2 className="font-display text-[17px] font-bold">Por onde começar</h2>
          <ol className="mt-3 space-y-2 text-[15px] leading-relaxed text-grafite/80">
            <li>
              <b className="text-grafite">1.</b> Escolha <b>um</b> jeito de usar: <b>tablet</b> ou <b>imprimir</b> (A4 em casa ou A5 na gráfica).
            </li>
            <li>
              <b className="text-grafite">2.</b> Leia as páginas <b>Boas-vindas</b> e <b>Método Mente em 3 Lugares</b> (5 minutos).
            </li>
            <li>
              <b className="text-grafite">3.</b> Faça o <b>Dia 1</b> da Jornada de 30 dias: são só duas páginas, 10 minutos.
            </li>
          </ol>
        </section>

        {grupos.map((g) => {
          const Icone = ICONE[g];
          const lista = ARQUIVOS.filter((x) => x.grupo === g);
          return (
            <section key={g} className="card p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-salvia-bg text-petroleo">
                  <Icone size={18} />
                </span>
                <div>
                  <h2 className="font-display text-[17px] font-bold leading-tight">{GRUPOS[g].titulo}</h2>
                  {GRUPOS[g].desc && <p className="text-[13.5px] text-grafite/60">{GRUPOS[g].desc}</p>}
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {g === 'bonus'
                  ? [...new Set(lista.map((x) => x.titulo))].map((titulo) => {
                      const fs = lista.filter((x) => x.titulo === titulo);
                      return (
                        <div key={titulo} className="rounded-2xl bg-creme/70 p-3.5">
                          <p className="font-display text-[15px] font-bold">{titulo}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {fs.map((x) => (
                              <Botao key={x.id} href={link(x.id)} t={x.desc} />
                            ))}
                          </div>
                        </div>
                      );
                    })
                  : lista.map((x) => (
                      <a key={x.id} href={link(x.id)} className="flex items-center gap-3 rounded-2xl bg-creme/70 p-3.5 transition hover:bg-salvia-bg">
                        <FileText size={20} className="shrink-0 text-terracota-escuro" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[15px] font-bold leading-snug">{x.titulo}</span>
                          <span className="block text-[13.5px] leading-snug text-grafite/60">{x.desc}</span>
                        </span>
                        <Download size={18} className="shrink-0 text-petroleo" />
                      </a>
                    ))}
              </div>
            </section>
          );
        })}

        <p className="px-2 text-center text-[13px] leading-relaxed text-grafite/55">
          Precisa de ajuda? Fale com a gente: {marca.suporte}. Os arquivos são para uso pessoal: não compartilhe este link.
        </p>
      </div>
    </main>
  );
}

function Botao({ href, t }: { href: string; t: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-1.5 rounded-full bg-petroleo px-4 py-2 text-[14px] font-bold text-creme">
      <Download size={15} /> {t}
    </a>
  );
}
