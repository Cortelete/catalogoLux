import { Procedure, MaleVersion } from '../../../../types';

const maleVersionData: MaleVersion = {
    name: 'Design de Sobrancelhas Masculino',
    price: 'R$ 50,00',
    description: 'Limpeza e alinhamento dos fios para um visual natural e bem cuidado, respeitando o formato masculino.',
    details: ['Preserva a naturalidade', 'Remove excessos'],
    images: [
      '/data/designSobrancelhas/design-masculino/img/DM1.png',
      '/data/designSobrancelhas/design-masculino/img/DM2.png',
      '/data/designSobrancelhas/design-masculino/img/DM3.png',
    ],
};

export const designSobrancelhas: Procedure = {
  id: 'design-sobrancelhas',
  name: 'Design de Sobrancelhas',
  description: 'Modelagem das sobrancelhas com pinça e/ou cera, criando um design harmônico para o rosto.',
  price: 'R$ 40,00',
  details: [
    'Design personalizado via mapeamento facial',
    'Modelagem precisa com pinça e/ou cera',
    'Realça a harmonia e expressão do olhar'
  ],
  images: [
      '/data/designSobrancelhas/design-feminino/img/DF1.png',
      '/data/designSobrancelhas/design-feminino/img/DF2.png',
      '/data/designSobrancelhas/design-feminino/img/DF3.png',
  ],
  maleVersion: maleVersionData
};
