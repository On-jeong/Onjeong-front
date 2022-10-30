import {atom} from 'recoil';
import {storage} from '../config/storage';

// asyncstorage와 데이터 연동 (userData에 있는 값들 가져오기)
const asyncStorageEffect =
  (key, detail) =>
  async ({setSelf, onSet}) => {
    const savedValue = await storage.getStrItem(key);

    if (savedValue !== null) {
      // 초기화
      setSelf(savedValue[detail]);
    }

    // 해당하는 atom 값 변경시 실행
    // onSet((newValue, _, isReset) => {
    //   isReset ? storage.removeItem(key) : storage.setItem(key, newValue);
    // });
  };

export const UserIdState = atom({
  key: 'userId',
  default: '',
  effects: [asyncStorageEffect('userData', 'userId')],
});

export const UserNameState = atom({
  key: 'userName',
  default: '',
  effects: [asyncStorageEffect('userData', 'userName')],
});

export const UserStatusState = atom({
  key: 'userStatus',
  default: '',
  effects: [asyncStorageEffect('userData', 'userStatus')],
});

export const UserBirthState = atom({
  key: 'userBirth',
  default: '',
  effects: [asyncStorageEffect('userData', 'userBirth')],
});

export const UserNicknameState = atom({
  key: 'userNickname',
  default: '',
  effects: [asyncStorageEffect('userData', 'userNickname')],
});

export const FamilyIdState = atom({
  key: 'familyId',
  default: '',
  effects: [asyncStorageEffect('userData', 'familyId')],
});
