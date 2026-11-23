// Entrega por e-mail: token de acesso assinado + e-mail via Resend. Só roda no servidor.
import { createHmac, timingSafeEqual } from 'crypto';
import { ARQUIVOS, GRUPOS, urlArquivo, type Grupo } from '@/config/entrega';
import { marca } from '@/config/oferta';

export const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

const segredo = () => process.env.ENTREGA_SECRET || process.env.ADMIN_PASSWORD || '';

export type Acesso = { e: string; n?: string; o?: string };

const b64 = (s: string) => Buffer.from(s).toString('base64url');
const assinar = (dados: string) => createHmac('sha256', segredo()).update(dados).digest('base64url').slice(0, 32);

/** Token permanente do comprador (e-mail, nome, pedido). Não expira: o link do e-mail vale sempre. */
export function criarToken(a: Acesso): string {
  if (!segredo()) throw new Error('ENTREGA_SECRET não configurado');
  const d = b64(JSON.stringify(a));
  return `${d}.${assinar(d)}`;
}

export function lerToken(t: string | null | undefined): Acesso | null {
  if (!t || !segredo()) return null;
  const [d, sig] = t.split('.');
  if (!d || !sig) return null;
  const ok = Buffer.from(assinar(d));
  const rec = Buffer.from(sig);
  if (ok.length !== rec.length || !timingSafeEqual(ok, rec)) return null;
  try {
    const a = JSON.parse(Buffer.from(d, 'base64url').toString()) as Acesso;
    return a?.e ? a : null;
  } catch {
    return null;
  }
}

export const linkAcesso = (t: string) => `${siteUrl()}/acesso?t=${encodeURIComponent(t)}`;
export const linkArquivo = (id: string, t: string) => `${siteUrl()}/api/baixar/${id}?t=${encodeURIComponent(t)}`;
export const arquivoPorId = (id: string) => ARQUIVOS.find((a) => a.id === id);
export const urlDireta = (id: string) => {
  const a = arquivoPorId(id);
  return a ? urlArquivo(a, siteUrl()) : null;
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function html(nome: string, t: string): string {
  const acesso = linkAcesso(t);
  const primeiro = nome.trim().split(/\s+/)[0] || '';
  const item = (id: string, titulo: string, desc: string) =>
    `<tr><td style="padding:10px 0;border-bottom:1px solid #EFE9DC"><a href="${linkArquivo(id, t)}" style="color:#315F5A;font-weight:bold;font-size:15px;text-decoration:none">⬇ ${esc(titulo)}</a><br><span style="font-size:13px;color:#6b7572">${esc(desc)}</span></td></tr>`;
  const grupo = (g: Grupo) => {
    const lista = ARQUIVOS.filter((a) => a.grupo === g);
    const itens =
      g === 'bonus'
        ? [...new Set(lista.map((a) => a.titulo))]
            .map((titulo) => {
              const [a4, a5] = lista.filter((a) => a.titulo === titulo);
              return `<tr><td style="padding:10px 0;border-bottom:1px solid #EFE9DC"><span style="font-weight:bold;font-size:15px;color:#263431">${esc(titulo)}</span><br><a href="${linkArquivo(a4.id, t)}" style="color:#315F5A;font-size:14px;font-weight:bold">⬇ A4 (em casa)</a> &nbsp;·&nbsp; <a href="${linkArquivo(a5.id, t)}" style="color:#315F5A;font-size:14px;font-weight:bold">⬇ A5 (gráfica)</a></td></tr>`;
            })
            .join('')
        : lista.map((a) => item(a.id, a.titulo, a.desc)).join('');
    return `<tr><td style="padding-top:22px;font-size:12px;font-weight:bold;letter-spacing:2px;color:#B5694A;text-transform:uppercase">${GRUPOS[g].titulo}</td></tr>${GRUPOS[g].desc ? `<tr><td style="font-size:13px;color:#6b7572;padding-top:2px">${GRUPOS[g].desc}</td></tr>` : ''}${itens}`;
  };
  return `<!doctype html><html><body style="margin:0;background:#F7F4ED;font-family:Arial,Helvetica,sans-serif;color:#263431">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 14px">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;background:#ffffff;border-radius:22px;padding:30px 26px">
<tr><td align="center"><img src="${siteUrl()}/icon.png" width="56" height="56" alt="" style="display:block;border-radius:14px"></td></tr>
<tr><td align="center" style="padding-top:10px;font-size:11px;letter-spacing:4px;color:#315F5A;font-weight:bold">PLANNER MENTE CALMA</td></tr>
<tr><td align="center" style="padding-top:16px;font-size:24px;font-weight:bold;line-height:1.25">${primeiro ? `${esc(primeiro)}, seu` : 'Seu'} planner chegou 💚</td></tr>
<tr><td align="center" style="padding-top:10px;font-size:16px;line-height:1.55;color:#3d4a47">Que bom ter você aqui! Aqui estão o <b>Planner Mente Calma</b> e os <b>4 bônus</b>. Os links ficam sempre disponíveis: guarde este e-mail.</td></tr>
<tr><td align="center" style="padding-top:22px"><a href="${acesso}" style="background:#B5694A;color:#ffffff;text-decoration:none;font-weight:bold;font-size:17px;padding:15px 28px;border-radius:14px;display:inline-block">Abrir minha área de downloads</a></td></tr>
<tr><td style="padding-top:22px;font-size:15px;line-height:1.55;background:#EAF1EC;border-radius:14px;padding:14px 16px"><b>Por onde começar:</b> no tablet, baixe o arquivo <b>“Planner completo para tablet”</b>. Para imprimir em casa, baixe o <b>“A4”</b> e imprima antes a folha de teste. Depois, leia as páginas <b>Boas-vindas</b> e <b>Método</b> (5 minutos) e faça o <b>Dia 1</b>.</td></tr>
${grupo('comece')}${grupo('tablet')}${grupo('imprimir')}${grupo('bonus')}
<tr><td style="padding-top:24px;font-size:13px;line-height:1.5;color:#6b7572">Algum link não abriu? Use o botão acima ou responda este e-mail${marca.suporte ? ` / escreva para ${esc(marca.suporte)}` : ''}.</td></tr>
</table>
<p style="max-width:540px;font-size:11px;line-height:1.5;color:#8a918f;padding:14px 10px 0">O Planner Mente Calma é uma ferramenta de organização pessoal e não substitui acompanhamento psicológico ou médico. Em crise, ligue 188 (CVV), gratuito e 24h. Material para uso pessoal: não compartilhe os arquivos.</p>
</td></tr></table></body></html>`;
}

/** Envia o e-mail com o acesso. `chave` evita e-mail repetido quando a Kiwify manda o mesmo aviso de novo. */
export async function enviarAcesso(a: Acesso, chave?: string): Promise<{ ok: boolean; erro?: string }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { ok: false, erro: 'RESEND_API_KEY ou EMAIL_FROM não configurados' };
  const t = criarToken(a);
  const headers: Record<string, string> = { authorization: `Bearer ${key}`, 'content-type': 'application/json' };
  if (chave) headers['Idempotency-Key'] = chave.slice(0, 256);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from,
        to: a.e,
        reply_to: marca.suporte || undefined,
        subject: 'Seu Planner Mente Calma chegou (+ 4 bônus) 💚',
        html: html(a.n || '', t),
      }),
    });
    if (!r.ok) {
      const txt = await r.text();
      console.error('resend', r.status, txt);
      return { ok: false, erro: `Resend ${r.status}: ${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    console.error('resend', e);
    return { ok: false, erro: String(e) };
  }
}
