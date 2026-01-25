
import { SubCategory } from '../../../types';

import { lashLifting } from './lash-lifting/data';
import { volumeExpress } from './volume-express/data';
import { volumeBrasileiro } from './volume-brasileiro/data';
import { volumeBrasileiroColorido } from './volume-brasileiro-colorido/data';
import { efeitoMolhado } from './efeito-molhado/data';
import { volumeEgipcio } from './volume-egipcio/data';
import { volumeRusso } from './volume-russo/data';
import { volumePardo } from './volume-pardo/data';
import { efeitoFox } from './efeito-fox/data';
import { efeitoAnime } from './efeito-anime/data';
import { megaVolume } from './mega-volume/data';
import { capping } from './capping/data';
import { megaCapping } from './mega-capping/data';
import { remocao } from './remocao/data';

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
      volumeExpress,
      volumeBrasileiro,
      volumeBrasileiroColorido,
      efeitoMolhado,
      volumeEgipcio,
      volumeRusso,
      volumePardo,
      efeitoFox,
      efeitoAnime,
      megaVolume,
      capping,
      megaCapping,
      remocao
    ],
  },
];
