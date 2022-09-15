import React, {useEffect, useState} from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {storage} from '../config/storage';
import axios from '@/api/axios';
import {useFocusEffect} from '@react-navigation/native';
import {useGetUserData} from '@/hooks/useUserData';

const Center = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const WelcomeScreen = ({navigation}) => {
  const [isUserData, setIsUserData] = useState(false);

  // 로그인 되어있는 상태이면 바로 홈화면으로 이동, 없으면 로그인 화면으로
  useEffect(() => {
    checkToken();
  }, []);

  useFocusEffect(() => {
    checkToken();
  }, []);

  const {newUserData, status} = useGetUserData(isUserData);

  const checkToken = async () => {
    const accessToken = await storage.getItem('accessToken');
    const refreshToken = await storage.getItem('refreshToken');
    console.log('accessToken: ' + accessToken);
    console.log('refreshToken: ' + refreshToken);
    if (accessToken !== null) {
      const data = await storage.getStrItem('userData');
      if (!data) {
        setIsUserData(true);
        if (status === 'success') storage.setStrItem('userData', newUserData);
        console.log('newUserData: ' + newUserData);
      }
      axios.defaults.headers.common['AuthorizationAccess'] = accessToken;
      navigation.navigate('Home');
    } else navigation.navigate('SignIn');
  };

  return (
    <NoHeader>
      <Center>
        <FontStyle.Title>온정</FontStyle.Title>
      </Center>
    </NoHeader>
  );
};

export default WelcomeScreen;
