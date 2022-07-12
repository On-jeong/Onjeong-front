import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import { AppInputs } from '../../components/inputs';

export const Container = styled.View`
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


const SignUpScreen = ({navigation}) => {
  const [inputCheck, setInputCheck] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (id && pw) setInputCheck(true);
    else setInputCheck(false);
  }, [id, pw]);

  const onSubmit = () => {
    console.log('id: ' + id);
    console.log('pw: ' + pw);

    if (!id) {
      alert('아이디를 입력해주세요.');
      return 0;
    } else if (!pw) {
      alert('비밀번호를 입력해주세요.');
      return 0;
    }

    navigation.navigate('Home');
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
              value={id}
              onChangeText={setId}
            />
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="비밀번호"
              value={pw}
              onChangeText={setPw}
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
              navigation.navigate('SignIn');
            }}
            inputCheck={true}
          />
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignUpScreen;
