import { SubCategory } from '../../../types';

import { lashLifting } from './lash-lifting/data';
import { fioAFio } from './fio-a-fio/data';
import { volumeBrasileiro } from './volume-brasileiro/data';
import { volumeBrasileiroColorido } from './volume-brasileiro-colorido/data';
import { volumeEgipcio } from './volume-egipcio/data';
import { efeitoSirena } from './efeito-sirena/data';
import { efeitoFox } from './efeito-fox/data';
import { volumeRusso } from './volume-russo/data';
import { megaVolume } from './mega-volume/data';
import { volumeWispy } from './volume-wispy/data';
import { capping } from './capping/data';
import { volumeExpress } from './volume-express/data';

export const lashSubCategories: SubCategory[] = [
  {
    id: 'lash-lifting-sub',
    name: 'Lash Lifting',
    procedures: [lashLifting],
  },
  {
    id: 'extensoes-sub',
    name: 'Extensões',
    procedures: [
      fioAFio,
      volumeBrasileiro,
      volumeBrasileiroColorido,
      volumeEgipcio,
      efeitoSirena,
      efeitoFox,
      volumeRusso,
      megaVolume,
      volumeWispy,
      capping,
      volumeExpress,
    ],
  },
];
