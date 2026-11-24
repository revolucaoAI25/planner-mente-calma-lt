import { createHmac, timingSafeEqual } from 'crypto';
import { bumpDoProduto } from '@/config/entrega';
import { enviarAcesso, enviarBump } from '@/lib/entrega';
import { sendUtmifyOrder } from '@/lib/utmify';

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
 * Webhook da Kiwify (Apps → Webhooks; eventos "Compra aprovada", "Reembolso" e "Chargeback"; todos os produtos).
 * - Planner (produto principal): envia o e-mail com o planner e os bônus. A venda chega na Utmify
 *   pela integração Kiwify → Utmify (a Utmify manda a compra para a Meta).
 * - Order bump (a Kiwify registra como compra à parte): envia o e-mail do material extra e repassa a venda
 *   para a Utmify pela API (a integração da Utmify não recebe os bumps).
 * O site não manda nada direto para a Meta.
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
  const produto = obj(o, 'Product', 'product');
  const comissoes = obj(o, 'Commissions', 'commissions');
  const email = str(cliente, 'email').trim().toLowerCase();
  const nome = str(cliente, 'full_name', 'first_name', 'name');
  const nomeProduto = str(produto, 'product_name', 'name') || str(o, 'product_name');
  const bump = bumpDoProduto(nomeProduto);

  const pago = status === 'paid' || status === 'approved' || evento === 'order_approved';
  const estorno = ['refunded', 'chargedback', 'chargeback'].includes(status) || ['order_refunded', 'chargeback'].includes(evento);
  if (!pago && !estorno) return Response.json({ ok: true, ignorado: status || evento || 'sem status' });
  if (!email) return Response.json({ ok: true, ignorado: 'sem e-mail' });
  // Botão "Testar" da Kiwify usa e-mails de exemplo: não envia.
  if (/@example\.(com|org|net)$/.test(email)) return Response.json({ ok: true, teste: true });
  const log = (s: string) => console.log('kiwify', pedido, nomeProduto || '?', email.replace(/(.{2}).*@/, '$1***@'), s);

  // Venda do bump → Utmify (paga ou estornada). Valores da Kiwify vêm em centavos.
  let utmify: true | string = 'não se aplica';
  if (bump) {
    const centavos = (v: string) => {
      const n = Number(v);
      if (!Number.isFinite(n) || !n) return 0;
      return Number.isInteger(n) && n >= 100 ? n : Math.round(n * 100);
    };
    const utms: Obj = {};
    for (const [k, v] of Object.entries(obj(o, 'TrackingParameters', 'tracking_parameters'))) if (v) utms[k] = v;
    utmify = await sendUtmifyOrder({
      orderId: pedido,
      status: estorno ? (status.includes('charge') || evento.includes('charge') ? 'chargedback' : 'refunded') : 'paid',
      paymentMethod: str(o, 'payment_method'),
      createdAt: str(o, 'created_at') || null,
      approvedAt: str(o, 'approved_date') || null,
      refundedAt: str(o, 'refunded_at') || null,
      customer: { name: nome, email, phone: str(cliente, 'mobile', 'phone') || null, document: str(cliente, 'CPF', 'cpf', 'cnpj') || null, ip: str(cliente, 'ip') || null },
      product: { id: str(produto, 'product_id', 'id') || pedido, name: nomeProduto || bump.nome, priceInCents: centavos(str(comissoes, 'charge_amount', 'product_base_price')) },
      feeInCents: centavos(str(comissoes, 'kiwify_fee')) || undefined,
      netInCents: centavos(str(comissoes, 'my_commission')) || undefined,
      utms,
    });
  }
  if (estorno) {
    log(`estorno · Utmify: ${utmify === true ? 'enviado' : utmify}`);
    return Response.json({ ok: true, estorno: true });
  }

  if (bump) {
    const r = await enviarBump({ e: email, n: nome, o: pedido }, bump.id, pedido ? `kiwify-bump-${pedido}` : undefined);
    log(`bump ${bump.id} · e-mail: ${r.ok ? 'enviado' : r.erro} · Utmify: ${utmify === true ? 'enviado' : utmify}`);
    // Material ainda não cadastrado não é motivo para a Kiwify reenviar o aviso: responde 200 e fica no log.
    return Response.json({ ok: r.ok, erro: r.erro, utmify: utmify === true });
  }

  const r = await enviarAcesso({ e: email, n: nome, o: pedido }, pedido ? `kiwify-${pedido}` : undefined);
  log(r.ok ? 'planner · e-mail enviado' : `planner · ${r.erro}`);
  // 500 faz a Kiwify tentar de novo mais tarde se o envio falhar.
  return Response.json({ ok: r.ok, erro: r.erro }, { status: r.ok ? 200 : 500 });
}
