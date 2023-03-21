import React, {useCallback, useEffect, useState} from 'react';
import {FontStyle} from '../utils/GlobalFonts';
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
import { WithHeader } from '@/components/headers/WithHeader';

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

  const {newUserData, status} = useGetUserData({enabled: isUserData});

  const checkToken = async () => {
    const accessToken = await storage.getItem('accessToken');
    const refreshToken = await storage.getItem('refreshToken');
    console.log('accessToken: ' + accessToken);
    console.log('refreshToken: ' + refreshToken);
    if (accessToken !== null) {
      // 유저 데이터가 저장되어있지 않은 경우
      if (userIdState === '') {
        setIsUserData(true);
        if (status === 'success') {
          // 새로 받은 유저정보 리코일에 저장
          setUserIdState(data.data.data.userId);
          setUserNameState(data.data.data.userName);
          setUserEmailState(data.data.data.userEmail);
          setUserNicknameState(data.data.data.userNickname);
          setUserStatusState(data.data.data.userStatus);
          setUserBirthState(data.data.data.userBirth);
          setFamilyIdState(data.data.data.familyId);
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
        <FontStyle.TitleB>온정</FontStyle.TitleB>
      </Center>
    </WithHeader>
  );
};

export default WelcomeScreen;
