import { SubCategory } from '../../../types';

import { designSobrancelhas } from './design-feminino/data';
import { designHenna } from './design-henna/data';
import { designTintura } from './design-tintura/data';
import { brownLamination } from './brown-lamination/data';

export const eyebrowSubCategories: SubCategory[] = [
  {
    id: 'design-essencial-sub',
    name: 'Design Essencial',
    procedures: [designSobrancelhas],
  },
  {
    id: 'design-coloracao-sub',
    name: 'Design com Coloração',
    procedures: [designHenna, designTintura],
  },
  {
    id: 'estilizacao-sobrancelhas-sub',
    name: 'Tratamentos e Estilização',
    procedures: [brownLamination],
  },
];
