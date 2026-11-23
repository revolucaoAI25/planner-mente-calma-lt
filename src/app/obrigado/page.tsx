import { Legal } from '@/components/Legal';
import { marca } from '@/config/oferta';

export const metadata = { title: 'Compra confirmada · Planner Mente Calma', robots: { index: false } };

export default function Obrigado() {
  return (
    <Legal titulo="Que bom ter você aqui! 💚">
      <p>Seu pagamento foi confirmado. Em alguns minutos chega no seu e-mail a mensagem <b>“Seu Planner Mente Calma chegou”</b>, com o planner, os 4 bônus e o link da sua área de downloads.</p>
      <p><b>Não chegou?</b> Confira a caixa de spam e a aba Promoções (e marque como “não é spam”). Se precisar, fale com a gente: {marca.suporte}.</p>
      <p><b>Por onde começar:</b> escolha um jeito de usar (tablet ou impresso), leia as páginas Boas-vindas e Método (5 minutos) e faça o <b>Dia 1</b>. São só duas páginas e 10 minutos.</p>
    </Legal>
  );
}
