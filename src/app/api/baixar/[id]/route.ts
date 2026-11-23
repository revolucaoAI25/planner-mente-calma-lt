import { lerToken, urlDireta } from '@/lib/entrega';

export const runtime = 'nodejs';

/** Link de download do e-mail: confere o token do comprador e redireciona para o PDF. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = new URL(req.url).searchParams.get('t');
  if (!lerToken(t)) return Response.redirect(new URL('/acesso', req.url), 302);
  const url = urlDireta(id);
  if (!url) return new Response('Arquivo não encontrado', { status: 404 });
  return Response.redirect(url, 302);
}
