
import { Category } from '../../types';

import { lashSubCategories } from './lash/procedures';
import { eyebrowSubCategories } from './designSobrancelhas/procedures';
import { skinSubCategories } from './pele/procedures';
import { laserSubCategories } from './laser/procedures';

export const CATEGORIES: Category[] = [
  {
    id: 'lash',
    name: 'Extensão de Cílios',
    subCategories: lashSubCategories,
  },
  {
    id: 'designSobrancelhas',
    name: 'Sobrancelhas',
    subCategories: eyebrowSubCategories,
  },
  {
    id: 'limpezaPele',
    name: 'Limpeza de Pele',
    subCategories: skinSubCategories,
  },
  {
    id: 'laser',
    name: 'Remoção a Laser',
    subCategories: laserSubCategories,
  },
];
