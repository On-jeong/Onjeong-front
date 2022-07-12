import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {
  Box,
  Container,
  InputBox,
  InputContainer,
  SignButton,
  Title,
} from './SignUpScreen';

const SignInScreen = ({naviagtion}) => {
  const [inputCheck, setInputCheck] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [birth, setBirth] = useState('');
  const [role, setRole] = useState('');
  const [invite, setInvite] = useState('');

   // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (id && pw && pwCheck && birth && role) setInputCheck(true);
    else setInputCheck(false);
  }, [id, pw, pwCheck, birth, role]);

  const onSubmit = () => {
    console.log('id: ' + id);
    console.log('pw: ' + pw);
    console.log('pwCheck: ' + pwCheck);
    console.log('birth: ' + birth);
    console.log('role: ' + role);
    console.log('invite: ' + invite);

    if (!id) {
      alert('아이디를 입력해주세요.');
      return 0;
    } else if (pw != pwCheck) {
      alert('비밀번호 확인이 맞지 않습니다.');
      return 0;
    } else if (pw != pwCheck) {
      alert('비밀번호 확인을 입력해주세요.');
      return 0;
    } else if (pw != pwCheck) {
      alert('생일을 입력해주세요.');
      return 0;
    } else if (pw != pwCheck) {
      alert('가족 내 역할을 입력해주세요.');
      return 0;
    }
  };

  return (
    <NoHeader isBack={true} naviagtion={naviagtion}>
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
            <InputBox
              maxLength={15}
              placeholder="비밀번호 확인"
              value={pwCheck}
              onChangeText={setPwCheck}
              secureTextEntry={true}
            />
            <InputBox
              maxLength={15}
              placeholder="생일"
              value={birth}
              onChangeText={setBirth}
            />
            <InputBox
              maxLength={15}
              placeholder="가족 내 역할  (ex)첫째 딸"
              value={role}
              onChangeText={setRole}
            />
            <InputBox
              maxLength={15}
              placeholder="초대가족 아이디"
              value={invite}
              onChangeText={setInvite}
            />
          </InputContainer>
          <SignButton
            color={inputCheck ? AppColors.green2 : AppColors.blur}
            onPress={onSubmit}
            disabled={!inputCheck}>
            <FontStyle.ContentB>회원가입</FontStyle.ContentB>
          </SignButton>
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignInScreen;
