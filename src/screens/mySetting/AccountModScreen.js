import {AppButtons} from '@/components/buttons';
import {useModifyAccount} from '@/hooks/useUserData';
import {
  UserBirthState,
  UserNameState,
  UserStatusState,
  UserNicknameState,
  UserEmailState,
  UserIdState,
  FamilyIdState,
} from '@/state/UserData';
import {AppFonts} from '@/utils/GlobalFonts';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import DatePicker from 'react-native-date-picker';
import {WithHeader} from '@/components/headers/WithHeader';
import {Box, Container, InputContainer} from '../sign/SignInScreen';
import {AppInputs} from '@/components/inputs';
import {Platform, ScrollView} from 'react-native';
import {BirthButton} from '../sign/SignUpScreen';
import {reg} from '@/config/reg';
import {AppList} from '@/components/lists';
import {NotificationPermissionState} from '@/state/DeviceData';
import styled from 'styled-components';
import {firebase} from '@react-native-firebase/messaging';
import {useAddFCM, useDelFCM} from '@/hooks/useFCMtoken';
import {storage} from '@/config/storage';

const Check = styled.View`
  width: 90%;
`;

function AccountModScreen() {
  const [inputCheck, setInputCheck] = useState(false);

  const userNicknameState = useRecoilValue(UserNicknameState);
  const familyIdState = useRecoilValue(FamilyIdState);
  const [notificationPermissionState, setNotificationPermissionState] =
    useRecoilState(NotificationPermissionState);

  // 변경값 임시저장
  const [name, setName] = useState(useRecoilValue(UserNameState));
  const [email, setEmail] = useState(useRecoilValue(UserEmailState));
  const [status, setStatus] = useState(useRecoilValue(UserStatusState));
  const [birth, setBirth] = useState(new Date(useRecoilValue(UserBirthState)));
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [birthOpen, setBirthOpen] = useState(false);

  // 변경값 영구저장
  const setUserNameState = useSetRecoilState(UserNameState);
  const setUserEmailState = useSetRecoilState(UserEmailState);
  const setUserStatusState = useSetRecoilState(UserStatusState);
  const setUserBirthState = useSetRecoilState(UserBirthState);

  const {mutate: delFCM} = useDelFCM();
  const {mutate: addFCM} = useAddFCM();

  const {
    mutate: modifyAccountMutate,
    isLoading: modifyAccountIsLoading,
    isError: modifyAccountIsError,
  } = useModifyAccount({
    onSuccess: () => {
      alert('회원정보 변경이 완료되었습니다.');
      setUserNameState(name);
      setUserEmailState(email);
      setUserStatusState(status);
      setUserBirthState(birth);
      setPw('');
      setPwCheck('');
    },
    onError: () => {
      alert('회원정보 변경에 실패했습니다.');
      setName(UserNameState);
      setEmail(UserEmailState);
      setStatus(UserStatusState);
    },
  });

  const onNotification = async () => {
    //FCM 토큰 보내기
    getFCMToken();
    //FCM 토큰 구독
    subscribeTopic(familyIdState);
  };

  const getFCMToken = async () => {
    const fcmToken = await storage.getItem('fcmToken');

    console.log('fcm토큰출력:', fcmToken);

    addFCM(fcmToken);
  };

  const subscribeTopic = topic => {
    messaging()
      .subscribeToTopic(topic.toString())
      .then(() => {
        console.log(`토픽 ${topic} 구독 성공`);
      })
      .catch(err => {
        console.log(`토픽 ${topic} 구독 실패 :`, err);
      });
  };

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (name && email && pw && pwCheck && birth && status) setInputCheck(true);
    else setInputCheck(false);
  }, [name, email, pw, pwCheck, birth, status]);

  const onSubmit = () => {
    if (name === '') {
      alert('이름을 입력해 주세요');
      return 0;
    } else if (status == '') {
      alert('역할을 입력해 주세요');
      return 0;
    } else if (email == '') {
      alert('이메일을 입력해 주세요');
      return 0;
    } else if (pw == '') {
      alert('비밀번호를 입력해 주세요');
      return 0;
    } else if (pwCheck == '') {
      alert('비밀번호 확인을 입력해 주세요');
      return 0;
    } else if (pw !== pwCheck) {
      alert('비밀번호 확인이 맞지 않습니다.');
      return 0;
    }

    if (validationCheck())
      modifyAccountMutate({
        userBirth: birth,
        userEmail: email,
        userName: name,
        userPassword: pw,
        userStatus: status,
      });
  };

  const validationCheck = () => {
    if (!reg.NAME_REG.test(name)) {
      alert('이름은 한글만 입력 가능합니다.');
      return 0;
    } else if (!reg.EMAIL_REG.test(email)) {
      alert('이메일 형식이 일치하지 않습니다.');
      return 0;
    } else if (!reg.PW_REG.test(pw)) {
      alert('비밀번호는 영문과 숫자 조합 8~16 자리로 설정해 주세요.');
      return 0;
    } else if (!reg.NAME_REG.test(status)) {
      alert('가족 내 역할은 한글만 입력 가능합니다.');
      return 0;
    }
    return 1;
  };

  return (
    <>
      <WithHeader
        title="회원정보 수정"
        isBack={true}
        isLoading={modifyAccountIsLoading}
        isError={modifyAccountIsError}
        // reloadFunc={modifyAccountMutate({
        //   userBirth: birth,
        //   userEmail: email,
        //   userName: name,
        //   userPassword: pw,
        //   userStatus: status,
        // })}
      >
        <ScrollView>
          <Container>
            <Box>
              <InputContainer>
                <AppInputs.BorderBottomInput
                  maxLength={15}
                  placeholder="아이디"
                  value={userNicknameState}
                  onChangeText={setName}
                  disable={true}
                  margin={{marginBottom: 10}}
                />
                <AppInputs.BorderBottomInput
                  maxLength={15}
                  placeholder="이름"
                  value={name}
                  onChangeText={setName}
                  margin={{marginBottom: 10}}
                />
                <AppInputs.BorderBottomInput
                  maxLength={30}
                  placeholder="이메일"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  margin={{marginBottom: 10}}
                />
                {/* 생년월일 선택 버튼 */}
                <BirthButton onPress={() => setBirthOpen(true)}>
                  <AppFonts.Content>
                    {format(birth, 'yyyy-MM-dd')}
                  </AppFonts.Content>
                </BirthButton>
                <AppInputs.BorderBottomInput
                  maxLength={15}
                  placeholder="가족 내 역할  (ex)첫째 딸"
                  value={status}
                  onChangeText={setStatus}
                  margin={{marginBottom: 10}}
                />
                <AppInputs.BorderBottomInput
                  maxLength={16}
                  placeholder="비밀번호 (영문과 숫자 조합 8~16)"
                  value={pw}
                  onChangeText={setPw}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  margin={{marginBottom: 10}}
                />
                <AppInputs.BorderBottomInput
                  maxLength={16}
                  placeholder="비밀번호 확인"
                  value={pwCheck}
                  onChangeText={setPwCheck}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  margin={{marginBottom: 10}}
                />
                <Check>
                  <AppList.CheckList
                    check={notificationPermissionState}
                    title="푸시 알림 허용"
                    onPress={() => {
                      if (notificationPermissionState) delFCM();
                      else onNotification();
                      setNotificationPermissionState(
                        !notificationPermissionState,
                      );
                    }}
                  />
                </Check>
              </InputContainer>

              {/* 생일 선택 모달 */}
              <DatePicker
                modal
                mode="date"
                open={birthOpen}
                date={birth}
                onConfirm={date => {
                  setBirthOpen(false);
                  setBirth(date);
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
        <AppButtons.FullButton
          title="저장하기"
          onPress={onSubmit}
          disabled={!inputCheck}
        />
      </WithHeader>
    </>
  );
}

export default AccountModScreen;
