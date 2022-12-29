import React, {useEffect, useState} from 'react';
import NoHeader from '@/components/headers/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {Box, Container, InputContainer, Title} from './SignInScreen';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components';
import {format} from 'date-fns';
import {useSignUpNoJoined, useSignUpWithJoined} from '../../hooks/useUserData';

//
// 회원가입
//

const BirthButton = styled.TouchableOpacity`
  width: 70%;
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  margin-top: 13px;
  margin-bottom: 10px;
  padding-left: 4px;
  padding-bottom: 10px;
`;

const ID_REG = /^[A-Za-z]{1}[A-Za-z0-9]{5,19}$/; //영문자 또는 숫자 6 ~ 20자 - 영문자로 시작해야 함
const PW_REG = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 영문, 숫자 조합 8 ~ 16자
const NAME_REG = /[ㄱ-힣]/; // 한글만

const SignUpScreen = ({navigation}) => {
  const [inputCheck, setInputCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassWord] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [userBirth, setUserBirth] = useState(new Date());
  const [userStatus, setUserStatus] = useState('');
  const [joinedNickname, setJoinedNickname] = useState('');
  const [birthClick, setBirthClick] = useState(false); // 한번도 클릭하지 않았을 경우 '생년월일'
  const [birthOpen, setBirthOpen] = useState(false);

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (
      userId &&
      userName &&
      userPassword &&
      pwCheck &&
      userBirth &&
      userStatus
    )
      setInputCheck(true);
    else setInputCheck(false);
  }, [userId, userName, userPassword, pwCheck, userBirth, userStatus]);

  const emptyCheck = () => {
    if (!userId) {
      alert('아이디를 입력해주세요. (6~20자리)');
      return 0;
    } else if (!userName) {
      alert('이름을 입력해주세요.');
      return 0;
    } else if (!userPassword) {
      alert('비밀번호를 입력해주세요. (8~16자리)');
      return 0;
    } else if (!pwCheck) {
      alert('비밀번호 확인을 입력해주세요.');
      return 0;
    } else if (userPassword != pwCheck) {
      alert('비밀번호 확인이 맞지 않습니다.');
      return 0;
    } else if (!userBirth) {
      alert('생일을 입력해주세요.');
      return 0;
    } else if (!userStatus) {
      alert('가족 내 역할을 입력해주세요.');
      return 0;
    } else return 1;
  };

  const validationCheck = () => {
    if (!ID_REG.test(userId)) {
      alert('아이디는 영문과 숫자 조합 6 ~ 20자리로 설정해 주세요.');
      return 0;
    } else if (!NAME_REG.test(userName)) {
      alert('이름은 한글만 입력 가능합니다.');
      return 0;
    } else if (!PW_REG.test(userPassword)) {
      alert('비밀번호는 영문과 숫자 조합 8~16 자리로 설정해 주세요.');
      return 0;
    } else if (!NAME_REG.test(userStatus)) {
      alert('가족 내 역할은 한글만 입력 가능합니다.');
      return 0;
    }
    return 1;
  };

  const {mutate: addNoJoined} = useSignUpNoJoined(navigation);
  const {mutate: addWithJoined} = useSignUpWithJoined(navigation);

  const onSubmit = () => {
    console.log('id: ' + userId);
    console.log('name: ' + userName);
    console.log('pw: ' + userPassword);
    console.log('pwCheck: ' + pwCheck);
    console.log('birth: ' + userBirth);
    console.log('role: ' + userStatus);
    console.log('invite: ' + joinedNickname);

    // 서버에 회원가입 요청
    if (emptyCheck() && validationCheck()) {
      // 가족회원이 없는 회원가입
      if (!joinedNickname) {
        addNoJoined({
          userBirth: format(userBirth, 'yyyy-MM-dd'),
          userName,
          userNickname: userId,
          userPassword,
          userStatus,
        });
      }
      // 가족회원이 있는 회원가입
      else {
        addWithJoined({
          joinedNickname,
          userBirth: format(userBirth, 'yyyy-MM-dd'),
          userName,
          userNickname: userId,
          userPassword,
          userStatus,
        });
      }
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
              maxLength={20}
              placeholder="아이디"
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
            />
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="이름"
              value={userName}
              onChangeText={setUserName}
            />
            <AppInputs.BorderBottomInput
              maxLength={16}
              placeholder="비밀번호"
              value={userPassword}
              onChangeText={setUserPassWord}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <AppInputs.BorderBottomInput
              maxLength={16}
              placeholder="비밀번호 확인"
              value={pwCheck}
              onChangeText={setPwCheck}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {/* 생년월일 선택 버튼 */}
            <BirthButton onPress={() => setBirthOpen(true)}>
              <FontStyle.Content color={birthClick ? 'black' : '#999797'}>
                {birthClick ? format(userBirth, 'yyyy-MM-dd') : '생년월일'}
              </FontStyle.Content>
            </BirthButton>
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="가족 내 역할  (ex)첫째 딸"
              value={userStatus}
              onChangeText={setUserStatus}
            />
            <AppInputs.BorderBottomInput
              maxLength={20}
              placeholder="초대가족 아이디"
              value={joinedNickname}
              onChangeText={setJoinedNickname}
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
            mode="date"
            open={birthOpen}
            date={userBirth}
            onConfirm={date => {
              setBirthOpen(false);
              setUserBirth(date);
              setBirthClick(true);
            }}
            onCancel={() => {
              setBirthOpen(false);
            }}
            confirmText="확인"
            cancelText="취소"
            title={null}
            androidVariant="iosClone"
          />
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignUpScreen;
