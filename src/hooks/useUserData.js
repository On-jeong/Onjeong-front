import customAxios from '@/api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchUserData = () => {
  return customAxios.get(`/user-information`);
};
const fetchCheckId = ({id}) => {
  return customAxios.post(`/check/id/${id} `);
};
const fetchJoinedId = ({id}) => {
  return customAxios.post(`/check/joined-id/${id}`);
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

const reqSignOut = () => {
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

// 사용할 수 있는 아이디인지 체크
export const useGetCheckId = ({onSuccess}) => {
  return useMutation(fetchCheckId, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 초대가족 아이디 존재유무 체크
export const useGetJoinedId = ({onSuccess}) => {
  return useMutation(fetchJoinedId, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 가족이 없는 회원가입 데이터 전송
export const useSignUpNoJoined = ({onSuccess}) => {
  return useMutation(postSignUpNoJoined, {
    // 성공시 로그인 페이지로 이동
    onSuccess: onSuccess,
    onError: err => {
      if (err?.response?.data?.message === 'USER NICKNAME DUPLICATION') {
        alert('이미 가입된 아이디 입니다.');
      } else alert('회원가입 진행 중 에러가 발생했습니다.');
      console.log(err);
    },
  });
};

// 가족이 있는 회원가입 데이터 전송
export const useSignUpWithJoined = ({onSuccess}) => {
  return useMutation(postSignUpWithJoined, {
    // 성공시 로그인 페이지로 이동
    onSuccess: onSuccess,
    onError: err => {
      if (err?.response?.data?.message === 'USER NICKNAME DUPLICATION') {
        alert('이미 가입된 아이디 입니다.');
      } else if (err?.response?.data?.message === 'JOINED USER NOT EXIST') {
        alert('초대가족 아이디가 존재하지 않습니다.');
      } else alert('회원가입 진행 중 에러가 발생했습니다.');
      console.log(err);
    },
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
export const useSignOut = ({enabled=true}) => {
  const navigation = useNavigation();

  return useQuery(['reqLogout'], reqSignOut, {
    //onSuccess: onSuccess,
    onSuccess: async () => {
      console.log('로그아웃 완료')
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      // 기본 헤더 제거
      delete customAxios.defaults.headers.common['AuthorizationAccess'];

      navigation.navigate('Welcome');
    },
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
      if (err.response.data.message === 'USER PASSWORD NOT CORRECT')
        alert('잘못된 비밀번호 입니다');
      else alert('회원탈퇴 진행 중 에러가 발생했습니다.');
    },
  });
};
