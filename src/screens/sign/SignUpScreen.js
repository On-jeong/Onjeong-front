import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: 30px;
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

export const InputBox = styled.TextInput`
  width: 70%;
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  font-family: 'GangwonLight';
  font-size: 20px;
  margin-bottom: 10px;
`;

export const SignButton = styled.TouchableOpacity`
  height: 40px;
  width: 70%;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.color};
  margin-bottom: 10px;
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
            <InputBox
              maxLength={15}
              placeholder="아이디"
              value={id}
              onChangeText={setId}
            />
            <InputBox
              maxLength={15}
              placeholder="비밀번호"
              value={pw}
              onChangeText={setPw}
              secureTextEntry={true}
            />
          </InputContainer>
          <SignButton
            color={inputCheck ? AppColors.red1 : AppColors.blur}
            onPress={onSubmit}
            disabled={!inputCheck}>
            <FontStyle.ContentB>로그인</FontStyle.ContentB>
          </SignButton>
          <SignButton
            color={AppColors.green2}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <FontStyle.ContentB>회원가입</FontStyle.ContentB>
          </SignButton>
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignUpScreen;
