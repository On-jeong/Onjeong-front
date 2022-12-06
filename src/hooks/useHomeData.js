import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchCoins = () => {
  return customAxios.get(`/coins`);
};

const fetchFlowerInfo = () => {
  return customAxios.get(`/flowers`);
};

const AddRandCoins = () => {
  return customAxios.post(`/coins-random`);
};

const fetchCoinHistory = () => {
  return customAxios.get(`/histories`, );
};

// 패밀리 코인 보여주기
export const useGetCoins = ({onSuccess}) => {
  return useQuery(['getCoin'], fetchCoins, {
    onSuccess:onSuccess,
    onError: error => console.log(error),
  });
};

// 패밀리 꽃 종류
export const useGetFlowerInfo = ({onSuccess}) => {
  return useQuery(['getFlowerInfo'], fetchFlowerInfo, {
    onSuccess:onSuccess,
    onError: error => console.log(error),
  });
};


// 패밀리 코인 랜덤 지급
export const useAddRandCoins = () => {
  return useMutation(AddRandCoins, {
    onError: error => console.log(error),
  });
};

// 패밀리 코인 적립 내역
export const useGetCoinHistory = () => {
  return useQuery(['getCoinHistory'], fetchCoinHistory, {
    onError: error => console.log(error),
  });
};
