import { Category } from '../../types';

import { lashSubCategories } from './lash/procedures';
import { eyebrowSubCategories } from './designSobrancelhas/procedures';
import { skinSubCategories } from './pele/procedures';
import { advancedSubCategories } from './esteticaAvancada/procedures';
import { nanoProcedures } from './nanopigmentacao/procedures';

export const CATEGORIES: Category[] = [
  {
    id: 'lash',
    name: 'Lash - Cílios',
    subCategories: lashSubCategories,
  },
  {
    id: 'designSobrancelhas',
    name: 'Design de Sobrancelhas',
    subCategories: eyebrowSubCategories,
  },
  {
    id: 'limpezaPele',
    name: 'Cuidados com a Pele',
    subCategories: skinSubCategories,
  },
  {
    id: 'botoxDay',
    name: 'Estética Avançada',
    subCategories: advancedSubCategories,
  },
  {
    id: 'nanopigmentacao',
    name: 'Microblading',
    procedures: nanoProcedures,
  },
];