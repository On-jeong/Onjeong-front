import React, {useEffect, useState} from 'react';
import NoHeader from '@/components/headers/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors, windowWidth} from '@/utils/GlobalStyles';
import {Box, Container} from './SignInScreen';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components';
import {format} from 'date-fns';
import {
  useGetCheckId,
  useGetJoinedId,
  useSignUpNoJoined,
  useSignUpWithJoined,
} from '../../hooks/useUserData';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {AppIconButtons} from '@/components/IconButtons';
import {AppComponents} from '@/components/Components';

//
// 회원가입
//

const Title = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const BirthButton = styled.TouchableOpacity`
  width: 70%;
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  margin-top: 13px;
  margin-bottom: 10px;
  padding-left: 4px;
  padding-bottom: 10px;
`;

const InputButtonBox = styled.View`
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CheckLists = styled.View`
  width: 70%;
`;

const ID_REG = /^[A-Za-z]{1}[A-Za-z0-9]{5,19}$/; //영문자 또는 숫자 6 ~ 20자 - 영문자로 시작해야 함
const EMAIL_REG = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; // 계정@도메인.최상위도메인 형식
const PW_REG = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 영문, 숫자 조합 8 ~ 16자
const NAME_REG = /[ㄱ-힣]/; // 한글만

const SignUpScreen = ({navigation}) => {
  const [inputCheck, setInputCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassWord] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [userBirth, setUserBirth] = useState(new Date());
  const [userStatus, setUserStatus] = useState('');
  const [joinedNickname, setJoinedNickname] = useState('');
  const [birthClick, setBirthClick] = useState(false); // 한번도 클릭하지 않았을 경우 '생년월일'
  const [birthOpen, setBirthOpen] = useState(false);

  const [idCheck, setIdCheck] = useState(false);
  const [joinedIdCheck, setJoinedIdCheck] = useState(false);

  // 동의사항 체크
  const [check1, setCheck1] = useState(false); // 개인정보 처리 방침
  const [check2, setCheck2] = useState(false); // 앱 이용 약관
  const [check3, setCheck3] = useState(false); // 푸시 알림 동의

  const {mutate: noJoinedMutate, isLoading: noJoinedIsLoading} =
    useSignUpNoJoined({
      onSuccess: () => {
        navigation.navigate('SignIn');
        alert('온정에 오신 것을 환영합니다!');
      },
    });
  const {
    mutate: withJoinedMutate,
    isLoading: withJoinedIsLoading,
    error: withJoinedError,
  } = useSignUpWithJoined({
    onSuccess: () => {
      navigation.navigate('SignIn');
      alert('온정에 오신 것을 환영합니다!');
    },
  });

  const {mutate: getCheckIdMutate} = useGetCheckId({
    onSuccess: data => {
      console.log(data?.data?.data?.available);
      if (data?.data?.data?.available) {
        alert('사용할 수 있는 아이디 입니다.');
        setIdCheck(true);
      } else {
        alert('사용할 수 없는 아이디 입니다.');
        setIdCheck(false);
      }
    },
  });
  const {mutate: getJoinedIdMutate} = useGetJoinedId({
    onSuccess: data => {
      console.log(data?.data?.data?.available);
      if (data?.data?.data?.available) {
        alert('초대가족이 확인되었습니다.');
        setJoinedIdCheck(true);
      } else {
        alert('초대가족을 찾을 수 없습니다.');
        setJoinedIdCheck(false);
      }
    },
  });

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
    } else if (!check1 || !check2) {
      alert('필수 약관에 동의해 주세요.');
      return 0;
    } else return 1;
  };

  const validationCheck = () => {
    if (!ID_REG.test(userId)) {
      alert('아이디는 영문 또는 숫자 조합 6 ~ 20자리로 설정해 주세요.');
      return 0;
    } else if (!idCheck) {
      alert('사용할 수 있는 아이디인지 검사해 주세요.');
      return 0;
    } else if (!joinedIdCheck) {
      alert('초대가족 아이디가 존재하는지 검사해 주세요.');
      return 0;
    } else if (!EMAIL_REG.test(userEmail)) {
      alert('이메일 형식이 일치하지 않습니다.');
      return 0;
    } else if (!NAME_REG.test(userName)) {
      alert('이름은 한글만 입력 가능합니다.');
      return 0;
    } else if (!PW_REG.test(userPassword)) {
      alert('비밀번호는 영문과 숫자 조합 8 ~ 16 자리로 설정해 주세요.');
      return 0;
    } else if (!NAME_REG.test(userStatus)) {
      alert('가족 내 역할은 한글만 입력 가능합니다.');
      return 0;
    }
    return 1;
  };

  const onSubmit = () => {
    console.log('id: ' + userId);
    console.log('email: ' + userEmail);
    console.log('name: ' + userName);
    console.log('pw: ' + userPassword);
    console.log('pwCheck: ' + pwCheck);
    console.log('birth: ' + userBirth);
    console.log('role: ' + userStatus);
    console.log('invite: ' + joinedNickname);

    // 서버에 회원가입 요청
    if (emptyCheck() && validationCheck()) {
      // 푸시알림 미동의시 재확인
      if (!check3) {
        Alert.alert(
          '',
          '푸시알림에 동의하지 않으시면\n편지와 기념일 알림 등을 받을 수 없습니다.\n푸시알림에 동의하시겠습니까?\n(광고성 정보는 포함되지 않습니다.)',
          [
            {
              text: '미동의',
              onPress: () => {
                join();
              },
              style: 'cancel',
            },
            {
              text: '동의',
              onPress: () => {
                join();
              },
            },
          ],
          {cancelable: true},
        );
      }

      const join = () => {
        // 가족회원이 없는 회원가입
        if (!joinedNickname) {
          noJoinedMutate({
            userBirth: format(userBirth, 'yyyy-MM-dd'),
            userEmail,
            userName,
            userNickname: userId,
            userPassword,
            userStatus,
          });
        }
        // 가족회원이 있는 회원가입
        else {
          withJoinedMutate({
            joinedNickname,
            userBirth: format(userBirth, 'yyyy-MM-dd'),
            userEmail,
            userName,
            userNickname: userId,
            userPassword,
            userStatus,
          });
        }
      };
    }
  };

  return (
    <NoHeader
      isBack={true}
      navigation={navigation}
      isLoading={noJoinedIsLoading || withJoinedIsLoading}>
      <ScrollView>
        <Container>
          <Box>
            <Title>
              <FontStyle.Big>온정</FontStyle.Big>
            </Title>
            <InputContainer>
              <InputButtonBox>
                <AppInputs.BorderBottomInput
                  width={windowWidth * 0.7 - 60}
                  maxLength={20}
                  placeholder="아이디 (영문 또는 숫자 6~20)"
                  value={userId}
                  onChangeText={setUserId}
                  autoCapitalize="none"
                />
                <AppButtons.BasicButton
                  title="확인"
                  width={50}
                  inputCheck={userId}
                  onPress={() => {
                    getCheckIdMutate({id: userId});
                  }}
                />
              </InputButtonBox>
              <AppInputs.BorderBottomInput
                maxLength={15}
                placeholder="이름"
                value={userName}
                onChangeText={setUserName}
              />
              <AppInputs.BorderBottomInput
                maxLength={30}
                placeholder="이메일"
                value={userEmail}
                onChangeText={setUserEmail}
                autoCapitalize="none"
              />
              <AppInputs.BorderBottomInput
                maxLength={16}
                placeholder="비밀번호 (영문과 숫자 조합 8~16)"
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
              <InputButtonBox>
                <AppInputs.BorderBottomInput
                  width={windowWidth * 0.7 - 60}
                  maxLength={20}
                  placeholder="초대가족 아이디"
                  value={joinedNickname}
                  onChangeText={setJoinedNickname}
                />
                <AppButtons.BasicButton
                  title="확인"
                  width={50}
                  inputCheck={joinedNickname}
                  onPress={() => {
                    getJoinedIdMutate({id: joinedNickname});
                  }}
                />
              </InputButtonBox>
              <CheckLists>
                <CheckList
                  check={check1}
                  setCheck={setCheck1}
                  title="개인정보 처리 방침 [필수]"
                />
                <CheckList
                  check={check2}
                  setCheck={setCheck2}
                  title="앱 이용 약관 [필수]"
                />
                <CheckList
                  check={check3}
                  setCheck={setCheck3}
                  title="앱 푸시 알림 동의 [선택]"
                />
              </CheckLists>
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
      </ScrollView>
    </NoHeader>
  );
};

const CheckList = ({check, setCheck, onPress, title}) => {
  return (
    <AppComponents.Row>
      {check ? (
        <AppIconButtons.CheckBox
          size={18}
          disabled={false}
          style={{padding: 4}}
          onPress={() => {
            setCheck(false);
          }}
        />
      ) : (
        <AppIconButtons.EmptyCheckBox
          size={18}
          disabled={false}
          style={{padding: 4}}
          onPress={() => {
            setCheck(true);
          }}
        />
      )}
      <TouchableOpacity onPress={onPress}>
        <FontStyle.SubContent>{title}</FontStyle.SubContent>
      </TouchableOpacity>
    </AppComponents.Row>
  );
};

export default SignUpScreen;
