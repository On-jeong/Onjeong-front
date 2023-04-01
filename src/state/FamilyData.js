import ReactNativeRecoilPersist from 'react-native-recoil-persist';
import {atom} from 'recoil';

export const FamilyCoinState = atom({
  key: 'familyCoin',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const FlowerLevelState = atom({
  key: 'flowerLevel',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const FlowerColorState = atom({
  key: 'flowerColor',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const FlowerKindState = atom({
  key: 'flowerKind',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const FlowerBloomDateState = atom({
  key: 'flowerBloomDate',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const FamilyProfileState = atom({
  key: 'familyProfile',
  default: [],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
