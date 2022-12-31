import customAxios from '@/api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchUserData = async () => {
  return customAxios.get(`/user-information`);
};

const postSignUpNoJoined = userData => {
  return customAxios.post(`/accounts`, userData);
};

const postSignUpWithJoined = userData => {
  return customAxios.post(`/accounts/joined`, userData);
};

const postSignInData = userData => {
  return customAxios.post(`/login`, userData);
};

const reqSignOut = async () => {
  return customAxios.get(`/logout`);
};

const modifyAccount = userData => {
  return customAxios.put(`/accounts`, userData);
};

const deleteAccount = userPassword => {
  console.log('userPassword', userPassword);
  return customAxios.delete(
    `/accounts`,
    {data: {userPassword}},
    {
      withCredentials: true,
    },
  );
};

// 유저 데이터 불러오기
export const useGetUserData = ({enabled: enabled = true}) => {
  console.log(enabled);
  return useQuery(['getUserData'], fetchUserData, {
    onError: error => console.log(error),
    enabled: enabled,
  });
};

// 가족이 없는 회원가입 데이터 전송
export const useSignUpNoJoined = navigation => {
  return useMutation(postSignUpNoJoined, {
    // 성공시 로그인 페이지로 이동
    onSuccess: () => navigation.navigate('SignIn'),
    onError: () => alert('회원가입에 실패했습니다.'),
  });
};

// 가족이 있는 회원가입 데이터 전송
export const useSignUpWithJoined = navigation => {
  return useMutation(postSignUpWithJoined, {
    // 성공시 로그인 페이지로 이동
    onSuccess: () => navigation.navigate('SignIn'),
    onError: () => alert('회원가입에 실패했습니다.'),
  });
};

// 로그인 데이터 전송
export const useSignIn = ({onSuccess, onError}) => {
  return useMutation(postSignInData, {
    onSuccess: onSuccess,
    onError: onError,
  });
};

// 로그아웃 요청
export const useSignOut = ({enabled, onSuccess}) => {
  return useQuery(['reqLogout'], reqSignOut, {
    onSuccess: onSuccess,
    onError: err => {
      console.log(err);
      alert('로그아웃 진행 중 에러가 발생했습니다.');
    },
    enabled: enabled,
  });
};

// 회원정보 수정
export const useModifyAccount = ({onError, onSuccess}) => {
  return useMutation(modifyAccount, {
    onError: onError,
    onSuccess: onSuccess,
  });
};

// 회원탈퇴
export const useDeleteAccount = ({onSuccess}) => {
  return useMutation(deleteAccount, {
    onSuccess: onSuccess,
    onError: err => {
      console.log('회원탈퇴 진행 중 에러', err);
      alert('회원탈퇴 진행 중 에러가 발생했습니다.');
    },
  });
};
