import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';
import {storage} from '../config/storage';

const fetchUserData = async () => {
  return axios.get(`${API}/users`);
};

const postSignUpNoJoined = userData => {
  return axios.post(`${API}/accounts`, userData);
};

const postSignUpWithJoined = userData => {
  return axios.post(`${API}/accounts/joined`, userData);
};

const postSignInData = userData => {
  return axios.post(`${API}/login`, userData);
};

const reqSignOut = async () => {
  return axios.get(`${API}/logout`);
};

const modifyAccount = userData => {
  return axios.put(`${API}/accounts/user`, userData);
};

const deleteAccount = () => {
  return axios.delete(`${API}/accounts`);
};

// 유저 데이터 불러오기
export const useGetUserData = () => {
  return useQuery(['getUserData'], fetchUserData, {
    onError: error => console.log(error),
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
export const useSignIn = navigation => {
  return useMutation(postSignInData, {
    onSuccess: async data => {
      // 로그인 토큰 저장
      await storage.setItem(
        'userToken',
        data.headers.authorization.substring(4),
      );
      navigation.navigate('Home');
    },
    onError: error => alert('로그인에 실패했습니다.'),
  });
};

// 로그아웃 요청
export const useSignOut = (navigation, enabled) => {
  return useQuery(['reqLogout'], reqSignOut, {
    onSuccess: async () => {
      await storage.removeItem('userToken');
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
