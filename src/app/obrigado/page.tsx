import { Legal } from '@/components/Legal';
import { marca } from '@/config/oferta';

export const metadata = { title: 'Compra confirmada · Planner Mente Calma', robots: { index: false } };

export default function Obrigado() {
  return (
    <Legal titulo="Que bom ter você aqui! 💚">
      <p>Seu pagamento foi confirmado. O acesso ao Planner Mente Calma e aos 4 bônus chega no seu e-mail em alguns minutos.</p>
      <p><b>Não chegou?</b> Confira a caixa de spam e a aba Promoções. Se precisar, fale com a gente: {marca.suporte}.</p>
      <p><b>Por onde começar:</b> imprima (ou abra no tablet) a página do Método Mente em 3 Lugares e reserve 10 minutos hoje. Só isso.</p>
    </Legal>
  );
}
