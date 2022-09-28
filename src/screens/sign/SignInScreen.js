import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import {useGetUserData, useSignIn} from '../../hooks/useUserData';
import {storage} from '../../config/storage';
import axios, {refreshAxios} from '@/api/axios';
import {useAddFCM} from '@/hooks/useFCMtoken';
import {useRecoilState} from 'recoil';
import UserData from '@/state/UserData';

//
// 로그인
//

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: 50px;
`;

export const Title = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const SignInScreen = ({navigation}) => {
  const setUserData = useRecoilState(UserData);

  const [inputCheck, setInputCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const {mutate} = useSignIn(navigation);
  const {mutate: addFCM} = useAddFCM();

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (userId && userPassword) setInputCheck(true);
    else setInputCheck(false);
  }, [userId, userPassword]);

  const onSubmit = () => {
    console.log('id: ' + userId);
    console.log('pw: ' + userPassword);

    if (!userId) {
      alert('아이디를 입력해주세요.');
      return 0;
    } else if (!userPassword) {
      alert('비밀번호를 입력해주세요.');
      return 0;
    }

    // 서버에 로그인 요청
    mutate(
      {
        userNickname: userId,
        userPassword,
      },
      {
        onSuccess: async data => {
          // 헤더 등록
          axios.defaults.headers.common['AuthorizationAccess'] =
            data.headers.authorizationaccess;
          refreshAxios.defaults.headers.common['AuthorizationAccess'] =
            data.headers.authorizationaccess;
          refreshAxios.defaults.headers.common['AuthorizationRefresh'] =
            data.headers.authorizationrefresh;

          //FCM 토큰 보내기
          getFCMToken();

          //로그인 토큰 저장
          await storage.setItem(
            'accessToken',
            data.headers.authorizationaccess,
          );
          await storage.setItem(
            'refreshToken',
            data.headers.authorizationrefresh,
          );
          setUserId('');
          setUserPassword('');

          const userData = {...data.data, userNickname: userId};
          console.log(userData);

          // 유저정보 저장
          storage.setStrItem('userData', userData);
          setUserData(userData);
          
          navigation.navigate('Home');
        },
        onError: err => {
          console.log(err);
          if (err?.response?.data?.error === 'Unauthorized') {
            alert('아이디 또는 비밀번호가 맞지 않습니다.');
            setUserId('');
            setUserPassword('');
          }
        },
      },
    );
  };

  const getFCMToken = async () => {
    const fcmToken = await storage.getItem('fcmToken');

    console.log('fcm토큰출력:', fcmToken);

    addFCM({
      token: fcmToken,
      userNickname: userId,
    });
  };

  return (
    <NoHeader>
      <Container>
        <Box>
          <Title>
            <FontStyle.Big>온정</FontStyle.Big>
          </Title>
          <InputContainer>
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="아이디"
              value={userId}
              onChangeText={setUserId}
            />
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="비밀번호"
              value={userPassword}
              onChangeText={setUserPassword}
              secureTextEntry={true}
            />
          </InputContainer>
          <AppButtons.FullButton
            title="로그인"
            borderColor={AppColors.red1}
            onPress={onSubmit}
            inputCheck={inputCheck}
          />
          <AppButtons.FullButton
            title="회원가입"
            borderColor={AppColors.green2}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            inputCheck={true}
          />
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignInScreen;
