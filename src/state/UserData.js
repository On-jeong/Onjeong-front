import ReactNativeRecoilPersist from "react-native-recoil-persist";
import {atom} from 'recoil';


export const UserIdState = atom({
  key: 'userId',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const UserNameState = atom({
  key: 'userName',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const UserStatusState = atom({
  key: 'userStatus',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const UserBirthState = atom({
  key: 'userBirth',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const UserNicknameState = atom({
  key: 'userNickname',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});

export const FamilyIdState = atom({
  key: 'familyId',
  default: '',
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
