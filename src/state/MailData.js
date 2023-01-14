
import customAxios from '@/api/axios';
import ReactNativeRecoilPersist from 'react-native-recoil-persist';
import {atom, selector} from 'recoil';

const receiveMailsEffects =
  key =>
  ({setSelf}) => {
    customAxios
      .get(`/mailList/receive`)
      .then(data => setSelf(data?.data?.data))
      .catch(err => console.log(err));
  };

export const ReceiveMailsState = atom({
  key: 'receiveMails',
  default: [],
  effects: [receiveMailsEffects('receiveMails')],
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});


// 안읽은 메일
export const NotReadMailsState = selector({
  key: 'notReadMails',
  get: ({get}) => {
    let notReadCount = 0;

    get(ReceiveMailsState)?.map(mail => {
      console.log(mail);
      if (mail.checkRead === false) notReadCount++;
    });

    return notReadCount;
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
