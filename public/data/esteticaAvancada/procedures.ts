import { SubCategory } from '../../../types';

import { botoxFullface } from './botox-fullface/data';
import { fioEnzima } from './fio-enzima/data';
import { preenchimentoBioestimulador } from './preenchimento-bioestimulador/data';


export const advancedSubCategories: SubCategory[] = [
  {
    id: 'harmonizacao-facial-sub',
    name: 'Estética Orofacial Avançada (com Drª. Mariciane)',
    procedures: [
      botoxFullface,
      fioEnzima,
      preenchimentoBioestimulador,
    ],
  },
];
