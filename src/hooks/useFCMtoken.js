import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const addFCM = data => {
  return customAxios.post(`/token/generate`, data);
};

const delAnn = data => {
  console.log(data)
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
  return useMutation( delAnn, {
    onError: error => console.log(error),
  });
};
