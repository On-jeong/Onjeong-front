import ReactNativeRecoilPersist from "react-native-recoil-persist";
import { atom } from "recoil";

export const ProfileImageUrIState = atom({
  key: 'profileImageUrI',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const ProfileMessageState = atom({
  key: 'profileMessage',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
