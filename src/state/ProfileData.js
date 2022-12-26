import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom } from "recoil";

export const ProfileImageUrIState = atom({
  key: 'profileImageUrI',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const ProfileMessageState = atom({
  key: 'profileMessage',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
