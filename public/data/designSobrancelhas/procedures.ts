
import { SubCategory } from '../../../types';

import { designSobrancelhas } from './design-feminino/data';
import { designHenna } from './design-henna/data';
import { brownLamination } from './brown-lamination/data';

import { micropigmentacao } from './micropigmentacao/data';
import { repareBrow } from './repare-brow/data';
import { protocoloCrescimento } from './protocolo-crescimento/data';


export const eyebrowSubCategories: SubCategory[] = [
  {
    id: 'design-essencial-sub',
    name: 'Design',
    procedures: [
        designSobrancelhas,
        designHenna,
        brownLamination
    ],
  },
  {
    id: 'especial-sobrancelhas-sub',
    name: 'Especial',
    procedures: [
        micropigmentacao,
        repareBrow,
        protocoloCrescimento
    ],
  },
];
