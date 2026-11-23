import { Legal } from '@/components/Legal';
import { garantiaDias, marca } from '@/config/oferta';

export const metadata = { title: 'Termos de uso · Planner Mente Calma' };

export default function Termos() {
  return (
    <Legal titulo="Termos de uso">
      <p>O {marca.nome} é um produto digital (arquivos em PDF) para organização pessoal, de uso individual. A compra dá direito a baixar, imprimir e preencher o material quantas vezes quiser, para uso próprio. Não é permitido revender, compartilhar ou distribuir os arquivos.</p>
      <p>O planner é uma ferramenta de organização. Ele não é tratamento psicológico ou médico, não faz diagnóstico e não substitui o acompanhamento de um profissional de saúde.</p>
      <p>O pagamento é processado pela Kiwify. Você tem {garantiaDias} dias, contados da compra, para pedir o reembolso integral, sem precisar justificar.</p>
      <p>Dúvidas e suporte: {marca.suporte}.</p>
    </Legal>
  );
}
