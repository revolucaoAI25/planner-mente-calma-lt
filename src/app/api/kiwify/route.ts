import { createHmac, timingSafeEqual } from 'crypto';
import { enviarAcesso } from '@/lib/entrega';

export const runtime = 'nodejs';

type Obj = Record<string, unknown>;
const obj = (o: Obj, ...k: string[]): Obj => {
  for (const x of k) if (o[x] && typeof o[x] === 'object') return o[x] as Obj;
  return {};
};
const str = (o: Obj, ...k: string[]): string => {
  for (const x of k) if (typeof o[x] === 'string' || typeof o[x] === 'number') return String(o[x]);
  return '';
};

/** A Kiwify assina o corpo com HMAC-SHA1 usando o token do webhook (?signature=…). */
function assinaturaOk(raw: string, sig: string | null): boolean {
  const tokens = (process.env.KIWIFY_WEBHOOK_TOKEN ?? '').split(/[\s,;]+/).filter(Boolean);
  if (!tokens.length) return true; // sem token configurado: aceita (configure em produção)
  if (!sig) return false;
  return tokens.some((t) => {
    const esperado = Buffer.from(createHmac('sha1', t).update(raw).digest('hex'));
    const recebido = Buffer.from(sig);
    return esperado.length === recebido.length && timingSafeEqual(esperado, recebido);
  });
}

/**
 * Webhook da Kiwify (Apps → Webhooks → evento "Compra aprovada").
 * Compra aprovada → envia o e-mail com o planner e os bônus.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  if (!assinaturaOk(raw, new URL(req.url).searchParams.get('signature'))) {
    console.warn('kiwify: assinatura inválida');
    return Response.json({ error: 'signature' }, { status: 401 });
  }
  let body: Obj;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'json' }, { status: 400 });
  }
  const o: Obj = body.order && typeof body.order === 'object' ? (body.order as Obj) : body;
  const status = str(o, 'order_status', 'status').toLowerCase();
  const evento = str(o, 'webhook_event_type', 'event').toLowerCase();
  const pedido = str(o, 'order_id', 'id', 'order_ref');
  const cliente = obj(o, 'Customer', 'customer');
  const email = str(cliente, 'email').trim().toLowerCase();
  const nome = str(cliente, 'full_name', 'first_name', 'name');

  const pago = status === 'paid' || status === 'approved' || evento === 'order_approved';
  if (!pago) return Response.json({ ok: true, ignorado: status || evento || 'sem status' });
  if (!email) return Response.json({ ok: true, ignorado: 'sem e-mail' });
  // Botão "Testar" da Kiwify usa e-mails de exemplo: não envia.
  if (/@example\.(com|org|net)$/.test(email)) return Response.json({ ok: true, teste: true });

  const r = await enviarAcesso({ e: email, n: nome, o: pedido }, pedido ? `kiwify-${pedido}` : undefined);
  console.log('kiwify', pedido, email.replace(/(.{2}).*@/, '$1***@'), r.ok ? 'enviado' : r.erro);
  // 500 faz a Kiwify tentar de novo mais tarde se o envio falhar.
  return Response.json({ ok: r.ok, erro: r.erro }, { status: r.ok ? 200 : 500 });
}
