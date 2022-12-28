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

// 오늘치 데일리 코인을 지급 받았는지 확인하는 용도의 state
// 지급 받은 날짜를 'YYYY-MM-DD' 형태의 string으로 저장한다.
// 해당 state가 오늘 날짜와 다르다면 데일리 코인을 지급
export const DailyCoinState = atom({
  key: 'DailyCoin',
  default: null,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
