import { Legal } from '@/components/Legal';
import { marca } from '@/config/oferta';

export const metadata = { title: 'Privacidade · Planner Mente Calma' };

export default function Privacidade() {
  return (
    <Legal titulo="Política de privacidade">
      <p>Esta página usa cookies e ferramentas de medição (como o Pixel da Meta e a Utmify) para entender de onde vêm as visitas e melhorar os anúncios. Os parâmetros de campanha (UTMs) são guardados no seu navegador e enviados ao checkout.</p>
      <p>Os dados de compra (nome, e-mail, telefone e pagamento) são coletados e processados pela Kiwify, de acordo com a política de privacidade dela, e usados apenas para entregar o produto e prestar suporte.</p>
      <p>Você pode pedir informações ou a exclusão dos seus dados a qualquer momento pelo e-mail {marca.suporte}.</p>
    </Legal>
  );
}
