const {atom} = require('recoil');

export const FamilyCoinState = atom({
  key: 'familyCoin',
  default: null,
});

export const FlowerLevelState = atom({
  key: 'flowerLevel',
  default: '',
});

export const FlowerColorState = atom({
  key: 'flowerColor',
  default: '',
});

export const FlowerKindState = atom({
  key: 'flowerKind',
  default: '',
});

export const FlowerBloomDateState = atom({
  key: 'flowerBloomDate',
  default: '',
});
