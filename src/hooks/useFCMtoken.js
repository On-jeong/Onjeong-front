import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const addFCM = data => {
  return customAxios.post(`/token/generate?token=${data}`);
};

const delFCM = data => {
  return customAxios.post(`/token/cancel`, data);
};

const fetchNotif = data => {
  return customAxios.get(`/notification`, data).then(data => data?.data?.data);
};

const fetchCheckNotif = () => {
  return customAxios.get(`/token/check`);
};

const updateNotif = data => {
  return customAxios.post(`/token/update`, data);
};

// FCM 토큰 등록하기
export const useAddFCM = () => {
  return useMutation(addFCM, {
    onSuccess: () => {
      console.log('add FCM 성공!!!');
    },
    onError: error => console.log(error),
  });
};

// FCM 토큰 해제하기
export const useDelFCM = () => {
  return useMutation(delFCM, {
    onSuccess: () => {
      console.log('del FCM 성공!!!');
    },
    onError: error => console.log(error),
  });
};

// 알림 목록 받아오기
export const useGetNotif = () => {
  return useQuery(['getNotif'], fetchNotif, {
    onError: error => console.log(error),
  });
};

// 알림 허용 여부 받아오기
export const useCheckNotification = ({onSuccess}) => {
  return useQuery(['checkNotif'], fetchCheckNotif, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 알림 허용 여부 변경
export const useUpdateNotification = () => {
  return useMutation(updateNotif, {
    onError: error => console.log(error),
  });
};
