import React from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: 100%;
  height: 60%;
  align-items: center;
  //background-color: pink;
`;

const Title = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

const InputBox = styled.TextInput`
  width: 70%;
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  font-family: 'GangwonLight';
  font-size: 20px;
  margin-bottom: 10px;
`;

const SignButton = styled.TouchableOpacity`
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
  return (
    <NoHeader>
      <Container>
        <Title>
          <FontStyle.Big>온정</FontStyle.Big>
        </Title>
        <Box>
          <InputContainer>
            <InputBox maxLength={15} placeholder="아이디" />
            <InputBox
              maxLength={15}
              placeholder="비밀번호"
              secureTextEntry={true}
            />
          </InputContainer>
          <SignButton
            color={AppColors.red1}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <FontStyle.ContentB>로그인</FontStyle.ContentB>
          </SignButton>
          <SignButton color={AppColors.green2}>
            <FontStyle.ContentB>회원가입</FontStyle.ContentB>
          </SignButton>
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignUpScreen;
