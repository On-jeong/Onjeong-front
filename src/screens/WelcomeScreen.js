import React, {useCallback, useEffect, useState} from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {storage} from '../config/storage';
import axios, {refreshAxios} from '@/api/axios';
import {useFocusEffect} from '@react-navigation/native';
import {useGetUserData} from '@/hooks/useUserData';
import {
  FamilyIdState,
  UserBirthState,
  UserEmailState,
  UserIdState,
  UserNameState,
  UserNicknameState,
  UserStatusState,
} from '@/state/UserData';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {WithHeader} from '@/components/headers/WithHeader';
import {Logo} from './sign/SignInScreen';
import {AppComponents} from '@/components/Components';
import {AppColors} from '@/utils/GlobalStyles';

const Center = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const WelcomeScreen = ({navigation}) => {
  const [isUserData, setIsUserData] = useState(false);

  const [userIdState, setUserIdState] = useRecoilState(UserIdState);
  const setUserNameState = useSetRecoilState(UserNameState);
  const setUserEmailState = useSetRecoilState(UserEmailState);
  const setUserBirthState = useSetRecoilState(UserBirthState);
  const setUserStatusState = useSetRecoilState(UserStatusState);
  const setUserNicknameState = useSetRecoilState(UserNicknameState);
  const setFamilyIdState = useSetRecoilState(FamilyIdState);

  // 로그인 되어있는 상태이면 바로 홈화면으로 이동, 없으면 로그인 화면으로
  useEffect(() => {
    checkToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, []),
  );

  const {data: newUserData, isSuccess} = useGetUserData({enabled: isUserData});

  const checkToken = async () => {
    const accessToken = await storage.getItem('accessToken');
    const refreshToken = await storage.getItem('refreshToken');
    console.log('accessToken: ' + accessToken);
    console.log('refreshToken: ' + refreshToken);
    if (accessToken !== null) {
      // 유저 데이터가 저장되어있지 않은 경우
      if (userIdState === '') {
        setIsUserData(true);
        if (isSuccess) {
          // 새로 받은 유저정보 리코일에 저장
          setUserIdState(newUserData?.userId);
          setUserNameState(newUserData?.userName);
          setUserEmailState(newUserData?.userEmail);
          setUserNicknameState(newUserData?.userNickname);
          setUserStatusState(newUserData?.userStatus);
          setUserBirthState(newUserData?.userBirth);
          setFamilyIdState(newUserData?.familyId);
        }
        console.log('newUserData: ' + newUserData);
      }
      axios.defaults.headers.common['AuthorizationAccess'] = accessToken;
      refreshAxios.defaults.headers.common['AuthorizationAccess'] = accessToken;
      refreshAxios.defaults.headers.common['AuthorizationRefresh'] =
        refreshToken;
      navigation.navigate('Home');
    } else navigation.navigate('SignIn');
  };

  return (
    <WithHeader>
      <Center>
        <Logo source={require('@/assets/image/logo/onjeong_logo.jpg')} />
        <AppComponents.EmptyBox height={5} />
        <AppFonts.Heading color={AppColors.Gray800}>온정</AppFonts.Heading>
      </Center>
    </WithHeader>
  );
};

export default WelcomeScreen;
