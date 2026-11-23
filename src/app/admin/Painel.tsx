'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

const KEY = 'pmc:pv';
const AUTH = 'pmc:admin';

type Status = { checkout: boolean; pixel: boolean; utmify: boolean; suporte: boolean; exemplo: boolean; resend: boolean; from: boolean; kiwify: boolean; segredo: boolean; site: string };
const SENHA = 'pmc:admin-senha';

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
      sessionStorage.setItem(SENHA, senha);
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

          <Entrega status={status} />

          <button
            type="button"
            onClick={() => {
              salvar({});
              try {
                sessionStorage.removeItem(AUTH);
                sessionStorage.removeItem(SENHA);
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

function Entrega({ status }: { status: Status }) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; t: string; link?: string } | null>(null);
  const [enviando, setEnviando] = useState(false);
  const site = status.site || (typeof window !== 'undefined' ? window.location.origin : '');

  const agir = async (enviar: boolean) => {
    setEnviando(true);
    setMsg(null);
    let senha = '';
    try {
      senha = sessionStorage.getItem(SENHA) || '';
    } catch {
      /* ignore */
    }
    const r = await fetch('/api/admin/reenviar', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ senha, email, nome, enviar }) });
    const d = await r.json().catch(() => ({}));
    setEnviando(false);
    setMsg(d.ok ? { ok: true, t: enviar ? 'E-mail enviado.' : 'Link gerado (não enviado).', link: d.link } : { ok: false, t: d.erro || 'Não deu certo.', link: d.link });
  };

  return (
    <section className="card p-5">
      <h2 className="text-[18px] font-bold">Entrega por e-mail</h2>
      <p className="mt-1 text-[14px] text-grafite/65">
        Compra aprovada na Kiwify → o site recebe o aviso e envia um e-mail (Resend) com os links do planner e dos bônus, e uma área de downloads.
      </p>
      <ul className="mt-3 space-y-2 text-[14.5px]">
        <Item ok={status.resend} t="Chave do Resend" d="RESEND_API_KEY" />
        <Item ok={status.from} t="Remetente (domínio verificado no Resend)" d="EMAIL_FROM" />
        <Item ok={status.kiwify} t="Token do webhook da Kiwify" d="KIWIFY_WEBHOOK_TOKEN" />
        <Item ok={status.segredo} t="Segredo dos links de acesso" d="ENTREGA_SECRET" />
      </ul>
      <p className="mt-3 rounded-xl bg-creme p-3 text-[13px] leading-relaxed text-grafite/70">
        URL do webhook na Kiwify (evento <b>Compra aprovada</b>):<br />
        <code className="break-all font-bold text-grafite">{site}/api/kiwify</code>
      </p>

      <h3 className="mt-5 font-display text-[15px] font-bold">Reenviar acesso</h3>
      <div className="mt-2 space-y-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail da compradora" type="email" className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-3 text-[16px] outline-none focus:border-petroleo" />
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="nome (opcional)" className="w-full rounded-xl border border-grafite/15 bg-white px-4 py-3 text-[16px] outline-none focus:border-petroleo" />
        <div className="flex gap-2">
          <button type="button" disabled={enviando || !email} onClick={() => agir(true)} className="btn-verde !min-w-0 flex-1 disabled:opacity-50">
            {enviando ? 'Enviando…' : 'Enviar e-mail'}
          </button>
          <button type="button" disabled={enviando || !email} onClick={() => agir(false)} className="flex-1 rounded-full border border-grafite/15 bg-white px-4 text-[14px] font-bold disabled:opacity-50">
            Só gerar o link
          </button>
        </div>
      </div>
      {msg && (
        <div className={`mt-3 rounded-xl p-3 text-[13.5px] ${msg.ok ? 'bg-salvia-bg' : 'bg-terracota-claro'}`}>
          <b>{msg.t}</b>
          {msg.link && (
            <p className="mt-1 break-all">
              <a href={msg.link} target="_blank" rel="noreferrer" className="underline">
                {msg.link}
              </a>
            </p>
          )}
        </div>
      )}
    </section>
  );
}
