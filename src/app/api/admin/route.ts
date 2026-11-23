import { timingSafeEqual } from 'crypto';

export const runtime = 'nodejs';

/** Confere a senha do painel (variável ADMIN_PASSWORD na Vercel). */
export async function POST(req: Request) {
  const { senha } = (await req.json().catch(() => ({}))) as { senha?: string };
  const certa = process.env.ADMIN_PASSWORD || '';
  if (!certa) return Response.json({ ok: true, aviso: 'ADMIN_PASSWORD não configurada na Vercel: o painel está aberto.' });
  const a = Buffer.from(String(senha ?? ''));
  const b = Buffer.from(certa);
  const ok = a.length === b.length && timingSafeEqual(a, b);
  if (!ok) await new Promise((r) => setTimeout(r, 600));
  return Response.json({ ok }, { status: ok ? 200 : 401 });
}
