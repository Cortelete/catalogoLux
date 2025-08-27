import { SubCategory } from '../../../types';

import { limpezaProfunda } from './limpeza-profunda/data';
import { limpezaRelaxante } from './limpeza-relaxante/data';
import { radiofrequencia } from './radiofrequencia/data';

export const skinSubCategories: SubCategory[] = [
  {
    id: 'limpeza-pele-sub',
    name: 'Limpeza de Pele',
    procedures: [limpezaProfunda, limpezaRelaxante],
  },
  {
    id: 'tratamentos-faciais-sub',
    name: 'Tratamentos Faciais',
    procedures: [radiofrequencia],
  },
];
