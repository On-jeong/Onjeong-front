import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';
import {storage} from '../config/storage';

const fetchFamilyList = () => {
  return axios.get(`${API}/families`);
};

const fetchFamilyDetail = userId => {
  return axios.get(`${API}/profiles/${userId}`);
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

// // 가족이 없는 회원가입 데이터 전송
// export const useSignUpNoJoined = navigation => {
//   return useMutation(postSignUpNoJoined, {
//     // 성공시 로그인 페이지로 이동
//     onSuccess: data => navigation.navigate('SignIn'),
//     onError: error => alert('회원가입에 실패했습니다.'),
//   });
// };
