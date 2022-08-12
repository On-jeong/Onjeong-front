import {atom} from 'recoil';
import {storage} from '../config/storage';

// asyncstorage와 데이터 연동
const asyncStorageEffect =
  key =>
  ({setSelf, onSet}) => {
    const savedValue = storage.getItem(key);

    if (savedValue !== null) {
      // 초기화
      setSelf(savedValue);
    }

    // storage 변경시 변경
    onSet((newValue, _, isReset) => {
      isReset ? storage.removeItem(key) : storage.setItem(key, newValue);
    });
  };

export default atom({
  key: 'userData',
  default: {},
  effects: [asyncStorageEffect('userData')],
});
