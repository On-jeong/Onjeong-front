import React, {useEffect, useState} from 'react';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {Box, Container, InputContainer, Title} from './SignUpScreen';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components';
import {format} from 'date-fns';

const BirthButton = styled.TouchableOpacity`
  width: 70%;
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  margin-top: 13px;
  margin-bottom: 10px;
  padding-left: 4px;
  padding-bottom: 10px;
`;

const SignInScreen = ({navigation}) => {
  const [inputCheck, setInputCheck] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [birth, setBirth] = useState(new Date());
  const [role, setRole] = useState('');
  const [invite, setInvite] = useState('');
  const [birthClick, setBirthClick] = useState(false); // 한번도 클릭하지 않았을 경우 '생년월일'
  const [birthOpen, setBirthOpen] = useState(false);

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
    <NoHeader isBack={true} navigation={navigation}>
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
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="비밀번호 확인"
              value={pwCheck}
              onChangeText={setPwCheck}
              secureTextEntry={true}
            />
            {/* 생년월일 선택 버튼 */}
            <BirthButton onPress={() => setBirthOpen(true)}>
              <FontStyle.Content color={birthClick ? 'black' : '#999797'}>
                {birthClick ? format(birth, 'yyyy-MM-dd') : '생년월일'}
              </FontStyle.Content>
            </BirthButton>
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="가족 내 역할  (ex)첫째 딸"
              value={role}
              onChangeText={setRole}
            />
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="초대가족 아이디"
              value={invite}
              onChangeText={setInvite}
            />
          </InputContainer>
          <AppButtons.FullButton
            title="회원가입"
            borderColor={AppColors.green2}
            onPress={onSubmit}
            inputCheck={inputCheck}
          />
          {/* 생일 선택 모달 */}
          <DatePicker
            modal
            open={birthOpen}
            date={birth}
            onConfirm={date => {
              setBirthOpen(false);
              setBirth(date);
              setBirthClick(true);
            }}
            onCancel={() => {
              setBirthOpen(false);
            }}
          />
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignInScreen;
