
import { SubCategory } from '../../../types';
import { remocaoLaser } from './remocao-laser/data';

export const laserSubCategories: SubCategory[] = [
  {
    id: 'laser-remocao-sub',
    name: 'Novidade',
    procedures: [remocaoLaser],
  },
];
