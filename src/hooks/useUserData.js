import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchUserData = () => {
  return axios.get(`${API}`);
};

const addSignUpNoJoined = userData => {
  return axios.post(`${API}/accounts`, userData);
};

const addSignUpWithJoined = userData => {
  return axios.post(`${API}/accounts/joined`, userData);
};

// 유저 데이터 불러오기
// export const useUserData = (onSuccess, onError) => {
//   return useQuery('getUserData', fetchUserData, {onSuccess, onError});
// };

// 가족이 없는 회원가입 데이터 전송
export const useSignUpNoJoined = navigation => {
  return useMutation(addSignUpNoJoined, {
    // 성공시 로그인 페이지로 이동
    onSuccess: data => navigation.navigate('SignIn'),
    onError: error => alert('회원가입에 실패했습니다.'),
  });
};

// 가족이 있는 회원가입 데이터 전송
export const useSignUpWithJoined = (navigation) => {
  return useMutation(addSignUpWithJoined, {
    // 성공시 로그인 페이지로 이동
    onSuccess: data => navigation.navigate('SignIn'),
    onError: error => alert('회원가입에 실패했습니다.'),
  });
};
