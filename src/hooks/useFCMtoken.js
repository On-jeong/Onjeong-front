import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const addFCM = data => {
  return customAxios.post(`/token/generate?token=${data}`);
};

const delFCM = data => {
  console.log(data);
  return customAxios.post(`/token/cancel`, data);
};

// FCM 토큰 등록하기
export const useAddFCM = () => {
  return useMutation(addFCM, {
    onError: error => console.log(error),
  });
};

// FCM 토큰 해제하기
export const useDelFCM = data => {
  return useMutation(delFCM, {
    onError: error => console.log(error),
  });
};
