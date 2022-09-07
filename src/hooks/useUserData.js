import axios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {storage} from '../config/storage';

const fetchUserData = async () => {
  return axios.get(`/users`);
};

const postSignUpNoJoined = userData => {
  return axios.post(`/accounts`, userData);
};

const postSignUpWithJoined = userData => {
  return axios.post(`/accounts/joined`, userData);
};

const postSignInData = userData => {
  return axios.post(`/login`, userData);
};

const reqSignOut = async () => {
  return axios.get(`/logout`);
};

const modifyAccount = userData => {
  return axios.put(`/accounts/user`, userData);
};

const deleteAccount = () => {
  return axios.delete(`/accounts`);
};


// 유저 데이터 불러오기
export const useGetUserData = enabled => {
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
export const useSignIn = onSuccess => {
  return useMutation(postSignInData, {
    onSuccess: () => onSuccess,
    onError: error => console.log(error),
  });
};

// 로그아웃 요청
export const useSignOut = (navigation, enabled) => {
  return useQuery(['reqLogout'], reqSignOut, {
    onSuccess: async () => {
      await storage.removeItem('accessToken');
      await storage.removeItem('userData');
      navigation.navigate('SignIn');
      // storage.getAllKeys().then(keys =>
      //   storage.multiGet(keys).then(data => console.log(data)),
      // );
    },
    onError: error => alert('로그아웃에 실패했습니다.'),
    enabled: enabled,
  });
};

// 회원정보 수정
export const useModifyAccount = userData => {
  return useMutation(modifyAccount(userData), {
    onError: error => console.log(error),
  });
};

// 회원탈퇴
export const useDeleteAccount = () => {
  return useMutation(deleteAccount(), {
    onError: error => console.log(error),
  });
};
