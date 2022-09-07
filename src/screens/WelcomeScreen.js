import React, {useEffect} from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {storage} from '../config/storage';
import axios from '@/api/axios';
import {useFocusEffect} from '@react-navigation/native';

const Center = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const WelcomeScreen = ({navigation}) => {
  // 로그인 되어있는 상태이면 바로 홈화면으로 이동, 없으면 로그인 화면으로
  useEffect(() => {
    checkToken();
  }, []);

  useFocusEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await storage.getItem('accessToken');
    console.log('loginToken: ' + token);
    if (token !== null) {
      const data = await storage.getStrItem('userData');
      console.log('logindata: ' + data);
      axios.defaults.headers.common['AuthorizationAccess'] = token;
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
