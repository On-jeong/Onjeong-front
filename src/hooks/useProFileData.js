import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchFamilyList = () => {
  return customAxios.get(`/families`);
};

const fetchFamilyProfile = userId => {
  return customAxios.get(`/profiles/${userId}/user-profile`);
};

const fetchFamilyInfo = userId => {
  return customAxios.get(`/profiles/${userId}/user-informations`);
};

const addProfileImage = formData => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return customAxios.post(`/profiles/image`, formData, config);
};

const addMessage = message => {
  return customAxios.post(`/profiles/messages`, message);
};

const modMessage = message => {
  return customAxios.patch(`/profiles/messages`, message);
};

const delFavorite = ({userId, dataId}) => {
  console.log('dataId',dataId)
  return customAxios.delete(`/profiles/favorites/${userId}/${dataId}`);
};

const delHate = (userId, dataId) => {
  return customAxios.delete(`/profiles/hates/${userId}/${dataId}`);
};

const delInterest = (userId, dataId) => {
  return customAxios.delete(`/profiles/interests/${userId}/${dataId}`);
};

const delExpression = (userId, dataId) => {
  return customAxios.delete(`/profiles/expressions/${userId}/${dataId}`);
};

// 가족 리스트 데이터 불러오기
export const useGetFamilyList = () => {
  return useQuery(['getFamilyList'], fetchFamilyList, {
    onError: error => console.log(error),
  });
};

// 유저 프로필 불러오기 (개인정보 + 상태메시지)
export const useGetFamilyProfile = (userId, onSuccess) => {
  return useQuery(
    ['getFamilyProfile', userId],
    () => fetchFamilyProfile(userId),
    {
      onError: error => console.log(error),
      onSuccess: onSuccess,
    },
  );
};

// 유저 정보 불러오기 (좋아하는 것, 싫어하는 것 등)
export const useGetFamilyInfo = userId => {
  return useQuery(['getFamilyInfo', userId], () => fetchFamilyInfo(userId), {
    onError: error => console.log(error),
  });
};

// 프로필 사진 등록
export const useAddProfileImage = () => {
  return useMutation(addProfileImage, {
    onError: error => console.log(error),
  });
};

// 상태 메세지 등록
export const useAddMessage = () => {
  return useMutation(addMessage, {
    onError: error => console.log(error),
  });
};

// 상태 메세지 수정
export const useModMessage = () => {
  return useMutation(modMessage, {
    onError: error => console.log(error),
  });
};

// 태그 삭제
export const useDelFavorite = () => {
  return useMutation(delFavorite, {
    onError: error => console.log(error),
  });
};

export const useDelHate = () => {
  return useMutation(delHate, {
    onError: error => console.log(error),
  });
};

export const useDelInterest = () => {
  return useMutation(delInterest, {
    onError: error => console.log(error),
  });
};

export const useDelExpression = () => {
  return useMutation(delExpression, {
    onError: error => console.log(error),
  });
};
