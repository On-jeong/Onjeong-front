import {atom} from 'recoil';
import ReactNativeRecoilPersist from 'react-native-recoil-persist';

// 알림 허용 여부
export const NotificationPermissionState = atom({
  key: 'notificationPermission',
  default: false,
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
