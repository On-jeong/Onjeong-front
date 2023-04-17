import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchFamilyList = () => {
  return customAxios.get(`/families`);
};

const fetchFamilyProfile = userId => {
  return customAxios.get(`/profiles/${userId}/user-profile`);
};

const fetchFamilyInfo = userId => {
  return customAxios.get(`/profiles/${userId}/self-introduction`).then(data => {
    return data?.data?.data;
  });
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
  return customAxios.post(`/profiles/message`, message);
};

const modMessage = message => {
  return customAxios.patch(`/profiles/message`, message);
};

const delFavorite = ({userId, delTagId}) => {
  return customAxios.delete(`/profiles/favorites/${userId}/${delTagId}`);
};

const delHate = ({userId, delTagId}) => {
  return customAxios.delete(`/profiles/hates/${userId}/${delTagId}`);
};

const delInterest = ({userId, delTagId}) => {
  return customAxios.delete(`/profiles/interests/${userId}/${delTagId}`);
};

const delExpression = ({userId, delTagId}) => {
  return customAxios.delete(`/profiles/expressions/${userId}/${delTagId}`);
};

const addFavorite = ({userId, data}) => {
  return customAxios.post(`/profiles/favorites/${userId}`, data);
};

const addHate = ({userId, data}) => {
  return customAxios.post(`/profiles/hates/${userId}`, data);
};

const addInterest = ({userId, data}) => {
  return customAxios.post(`/profiles/interests/${userId}`, data);
};

const addExpression = ({userId, data}) => {
  return customAxios.post(`/profiles/expressions/${userId}`, data);
};

// 가족 리스트 데이터 불러오기
export const useGetFamilyList = ({onSuccess}) => {
  return useQuery(['getFamilyList'], fetchFamilyList, {
    onSuccess: onSuccess,
    onError: error => console.log(error),
  });
};

// 유저 프로필 불러오기 (개인정보 + 상태메시지)
export const useGetFamilyProfile = ({userId, onSuccess}) => {
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
export const useAddProfileImage = ({onSuccess}) => {
  return useMutation(addProfileImage, {
    onError: error => console.log(error),
    onSuccess,
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

//
// 태그 등록
//

export const useAddFavorite = ({onError, onMutate, onSettled}) => {
  return useMutation(addFavorite, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

export const useAddHate = ({onError, onMutate, onSettled}) => {
  return useMutation(addHate, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

export const useAddInterest = ({onError, onMutate, onSettled}) => {
  return useMutation(addInterest, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

export const useAddExpression = ({onError, onMutate, onSettled}) => {
  return useMutation(addExpression, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

//
// 태그 삭제
//
export const useDelFavorite = ({onError, onMutate, onSettled}) => {
  return useMutation(delFavorite, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

export const useDelHate = ({onError, onMutate, onSettled}) => {
  return useMutation(delHate, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

export const useDelInterest = ({onError, onMutate, onSettled}) => {
  return useMutation(delInterest, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

export const useDelExpression = ({onError, onMutate, onSettled}) => {
  return useMutation(delExpression, {
    onError: onError,
    onMutate: onMutate,
    onSettled: onSettled,
  });
};
