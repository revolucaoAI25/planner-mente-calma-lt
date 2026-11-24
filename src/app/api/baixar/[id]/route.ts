import { podeBaixar } from '@/config/entrega';
import { arquivoPorId, lerToken, urlDireta } from '@/lib/entrega';

export const runtime = 'nodejs';

/** Link de download do e-mail: confere o token do comprador e redireciona para o PDF. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = new URL(req.url).searchParams.get('t');
  const a = lerToken(t);
  if (!a) return Response.redirect(new URL('/acesso', req.url), 302);
  const arq = arquivoPorId(id);
  const url = urlDireta(id);
  if (!arq || !url) return new Response('Arquivo não encontrado', { status: 404 });
  if (!podeBaixar(arq, a.b)) return new Response('Este material não faz parte do seu pedido.', { status: 403 });
  return Response.redirect(url, 302);
}
