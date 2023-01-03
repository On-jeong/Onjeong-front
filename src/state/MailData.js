import customAxios from '@/api/axios';
import {useGetReceiveMails} from '@/hooks/useMailData';
import ReactNativeRecoilPersist from 'react-native-recoil-persist';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';
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
    const receiveMails = get(ReceiveMailsState);
    let notReadCount = 0;

    console.log('NotReadMailsState바뀜', get(ReceiveMailsState));

    get(ReceiveMailsState)?.map(mail => {
      console.log(mail);
      if (mail.checkRead === false) notReadCount++;
    });

    return notReadCount;
  },
  effects_UNSTABLE: [ReactNativeRecoilPersist.persistAtom],
});
