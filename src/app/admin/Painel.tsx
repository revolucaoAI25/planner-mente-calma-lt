'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

const KEY = 'pmc:pv';
const AUTH = 'pmc:admin';

type Status = { checkout: boolean; pixel: boolean; utmify: boolean; suporte: boolean; exemplo: boolean };

export function Painel({ status }: { status: Status }) {
  const [entrou, setEntrou] = useState(false);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [pv, setPv] = useState<{ ex?: boolean; ph?: boolean }>({});

  useEffect(() => {
    try {
      setEntrou(sessionStorage.getItem(AUTH) === '1');
      setPv(JSON.parse(localStorage.getItem(KEY) || '{}'));
    } catch {
      /* ignore */
    }
  }, []);

  const salvar = (v: { ex?: boolean; ph?: boolean }) => {
    setPv(v);
    try {
      localStorage.setItem(KEY, JSON.stringify(v));
    } catch {
      /* ignore */
    }
  };

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    const r = await fetch('/api/admin', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ senha }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.ok) return setErro('Senha incorreta.');
    if (d.aviso) setAviso(d.aviso);
    try {
      sessionStorage.setItem(AUTH, '1');
    } catch {
      /* ignore */
    }
    setEntrou(true);
  };

  return (
    <main className="estreito min-h-dvh py-10">
      <Logo />
      <h1 className="mt-6 text-[28px] font-bold">Painel</h1>
      {!entrou ? (
        <form onSubmit={entrar} className="card mt-6 space-y-3 p-5">
          <label className="block text-[14px] font-bold">Senha do painel</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-3 text-[16px] outline-none focus:border-petroleo" autoFocus />
          {erro && <p className="text-[14px] font-bold text-red-700">{erro}</p>}
          <button className="btn-verde !w-full !min-w-0">Entrar</button>
        </form>
      ) : (
        <div className="mt-6 space-y-5">
          {aviso && <p className="rounded-xl bg-terracota-claro p-3 text-[14px]">{aviso}</p>}

          <section className="card p-5">
            <h2 className="text-[18px] font-bold">Conteúdo de teste</h2>
            <p className="mt-1 text-[14px] text-grafite/65">
              O conteúdo de exemplo (criadora e depoimentos) aparece <b>para todos</b> enquanto o modo teste estiver ligado na Vercel. <b>Antes de rodar anúncios</b>, coloque <code>NEXT_PUBLIC_MODO_TESTE=0</code> e faça um novo deploy. As chaves abaixo valem só para este aparelho.
            </p>
            <Chave
              on={pv.ex !== false}
              set={(v) => salvar({ ...pv, ex: v })}
              t="Mostrar conteúdo de exemplo"
              d={status.exemplo ? 'Criadora e depoimentos fictícios. Desligue para ver a página como ficará sem eles.' : 'Já removido do site (NEXT_PUBLIC_MODO_TESTE=0).'}
              off={!status.exemplo}
            />
            <Chave on={!!pv.ph} set={(v) => salvar({ ...pv, ph: v })} t="Mostrar espaços reservados" d="Mostra onde entram os prints reais: depoimentos e fotos do planner na vida real." />
            <Link href="/" className="btn-principal mt-4 !w-full !min-w-0 !animate-none">
              <span className="relative z-10">Abrir a página</span>
            </Link>
          </section>

          <section className="card p-5">
            <h2 className="text-[18px] font-bold">Configuração</h2>
            <ul className="mt-3 space-y-2 text-[14.5px]">
              <Item ok={status.checkout} t="Link do checkout da Kiwify" d="NEXT_PUBLIC_CHECKOUT" />
              <Item ok={status.pixel} t={status.utmify ? 'Pixel pela Utmify' : 'Pixel da Meta'} d="NEXT_PUBLIC_UTMIFY_PIXEL_ID ou NEXT_PUBLIC_META_PIXEL_ID" />
              <Item ok={status.suporte} t="E-mail de suporte" d="NEXT_PUBLIC_SUPORTE_EMAIL" />
            </ul>
            <p className="mt-3 text-[13px] text-grafite/55">Essas variáveis ficam na Vercel (Settings → Environment Variables) e valem depois de um novo deploy.</p>
          </section>

          <button
            type="button"
            onClick={() => {
              salvar({});
              try {
                sessionStorage.removeItem(AUTH);
              } catch {
                /* ignore */
              }
              setEntrou(false);
            }}
            className="w-full text-center text-[13px] text-grafite/55 underline"
          >
            Sair (volta às configurações padrão neste aparelho)
          </button>
        </div>
      )}
    </main>
  );
}

function Chave({ on, set, t, d, off = false }: { on: boolean; set: (v: boolean) => void; t: string; d: string; off?: boolean }) {
  return (
    <button type="button" disabled={off} onClick={() => set(!on)} className="mt-4 flex w-full items-center gap-4 text-left disabled:opacity-50">
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition ${on && !off ? 'bg-petroleo' : 'bg-grafite/20'}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${on && !off ? 'left-6' : 'left-1'}`} />
      </span>
      <span>
        <span className="block font-display text-[15px] font-bold">{t}</span>
        <span className="block text-[13.5px] leading-snug text-grafite/60">{d}</span>
      </span>
    </button>
  );
}

function Item({ ok, t, d }: { ok: boolean; t: string; d: string }) {
  return (
    <li className="flex gap-2.5">
      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${ok ? 'bg-petroleo' : 'bg-terracota-escuro'}`}>{ok ? '✓' : '!'}</span>
      <span>
        <b>{t}</b> <span className="text-grafite/50">· {ok ? 'configurado' : `falta ${d}`}</span>
      </span>
    </li>
  );
}
