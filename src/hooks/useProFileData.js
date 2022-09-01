import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchFamilyList = () => {
  return axios.get(`${API}/families`);
};

const fetchFamilyDetail = userId => {
  return axios.get(`${API}/profiles/${userId}`);
};

const addProfileImage = (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(`${API}/profiles/image`, formData, config);
};

// 가족 리스트 데이터 불러오기
export const useGetFamilyList = () => {
  return useQuery(['getFamilyList'], fetchFamilyList, {
    onError: error => console.log(error),
  });
};

// 가족 리스트 데이터 불러오기
export const useGetFamilyDetail = userId => {
  return useQuery(
    ['getFamilyDetail', userId],
    () => fetchFamilyDetail(userId),
    {
      onError: error => console.log(error),
    },
  );
};

// 프로필 사진 등록
export const useAddProfileImage = () => {
  return useMutation(addProfileImage, {
    onError: error => console.log(error),
  });
};
