import { timingSafeEqual } from 'crypto';
import { criarToken, enviarAcesso, linkAcesso } from '@/lib/entrega';

export const runtime = 'nodejs';

const senhaOk = (s: string) => {
  const certa = process.env.ADMIN_PASSWORD || '';
  if (!certa) return false;
  const a = Buffer.from(s);
  const b = Buffer.from(certa);
  return a.length === b.length && timingSafeEqual(a, b);
};

/** Painel: reenviar o acesso para um e-mail (ou só gerar o link, sem enviar). */
export async function POST(req: Request) {
  const { senha, email, nome, enviar } = (await req.json().catch(() => ({}))) as { senha?: string; email?: string; nome?: string; enviar?: boolean };
  if (!senhaOk(String(senha ?? ''))) {
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ ok: false, erro: 'Senha incorreta (ou ADMIN_PASSWORD não configurada).' }, { status: 401 });
  }
  const e = String(email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return Response.json({ ok: false, erro: 'E-mail inválido.' }, { status: 400 });
  try {
    const link = linkAcesso(criarToken({ e, n: nome || '' }));
    if (!enviar) return Response.json({ ok: true, link });
    const r = await enviarAcesso({ e, n: nome || '' });
    return Response.json({ ...r, link }, { status: r.ok ? 200 : 500 });
  } catch (err) {
    return Response.json({ ok: false, erro: String(err) }, { status: 500 });
  }
}
