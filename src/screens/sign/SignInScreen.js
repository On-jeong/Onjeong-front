import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import {useGetUserData, useSignIn} from '../../hooks/useUserData';
import {storage} from '../../config/storage';
import axios from 'axios';

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
  const [inputCheck, setInputCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const {status, data, error} = useGetUserData();

  if (error) console.log('error: ' + error);
  if (status == 'success') {
    storage.setStrItem('userData', data.data);
  }

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (userId && userPassword) setInputCheck(true);
    else setInputCheck(false);
  }, [userId, userPassword]);

  const {mutate} = useSignIn(navigation);

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
          // 로그인 토큰 저장
          await storage.setItem(
            'userToken',
            data.headers.authorization.substring(4),
          );
          setUserId('');
          setUserPassword('');
          navigation.navigate('Home');
        },
      },
    );
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
