
import { Procedure } from '../../../../types';

export const protocoloCrescimento: Procedure = {
  id: 'protocolo-crescimento',
  name: 'Protocolo de Crescimento',
  description: 'Para ativar o crescimento de pelos de forma natural, SEM MICROAGULHAMENTO. Um verdadeiro spa para suas sobrancelhas.',
  price: 'R$ 80,00',
  details: [
      'Incluso: Higienização e Esfoliação',
      'Argila e Essência',
      'Gel Calmante e Esferas Relaxantes',
      'Alta Frequência',
      'Design incluso (Sem Henna)'
  ],
  toggleOption: {
      label: 'Com Henna',
      priceIncrement: 10.00
  },
  images: [
      '/data/designSobrancelhas/protocolo-crescimento/img/PC1.png',
      '/data/designSobrancelhas/protocolo-crescimento/img/PC2.png',
      '/data/designSobrancelhas/protocolo-crescimento/img/PC3.png',
  ],
};
