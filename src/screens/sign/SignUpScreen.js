import React, {useEffect, useRef, useState} from 'react';
import {AppFonts} from '@/utils/GlobalFonts';
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
import {Alert, Linking, ScrollView, TouchableOpacity} from 'react-native';
import {AppComponents} from '@/components/Components';
import {WithHeader} from '@/components/headers/WithHeader';
import {reg} from '@/config/reg';
import {AppIcons} from '@/ui/icons';
import {AppList} from '@/components/lists';
import {CommonActions} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {NotificationPermissionState} from '@/state/DeviceData';
import Confirm from '@/components/alert/Alert';

//
// 회원가입
//

const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

export const BirthButton = styled.TouchableOpacity`
  width: ${windowWidth * 0.9};
  border-bottom-width: 1px;
  border-color: ${AppColors.Gray300};
  margin-top: 13px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-bottom: 15px;
`;

const InputButtonBox = styled.View`
  width: ${windowWidth * 0.9};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CheckLists = styled.View`
  width: ${windowWidth * 0.9};
`;

const SignUpScreen = ({navigation}) => {
  const inputRef = useRef([]);

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
  const [notificationPermissionState, setNotificationPermissionState] =
    useRecoilState(NotificationPermissionState);

  const {mutate: noJoinedMutate, isLoading: noJoinedIsLoading} =
    useSignUpNoJoined({
      onSuccess: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          }),
        );
        Confirm('온정', '온정에 오신 것을 환영합니다!');
        setNotificationPermissionState(check3);
      },
    });

  const {
    mutate: withJoinedMutate,
    isLoading: withJoinedIsLoading,
    error: withJoinedError,
  } = useSignUpWithJoined({
    onSuccess: () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        }),
      );
      Confirm('알림', '온정에 오신 것을 환영합니다!');
      setNotificationPermissionState(check3);
    },
  });

  const {mutate: getCheckIdMutate} = useGetCheckId({
    onSuccess: data => {
      console.log('data', data);
      if (data?.available) {
        Confirm('알림', '사용할 수 있는 아이디 입니다.');
        setIdCheck(true);
      } else {
        Confirm('알림', '사용할 수 없는 아이디 입니다.');
        setIdCheck(false);
      }
    },
  });
  const {mutate: getJoinedIdMutate} = useGetJoinedId({
    onSuccess: data => {
      console.log(data);
      if (data?.available) {
        Confirm('알림', '초대가족이 확인되었습니다.');
        setJoinedIdCheck(true);
      } else {
        Confirm('알림', '초대가족을 찾을 수 없습니다.');
        setJoinedIdCheck(false);
      }
    },
  });

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (
      userId &&
      userName &&
      userEmail &&
      userPassword &&
      pwCheck &&
      userBirth &&
      userStatus
    )
      setInputCheck(true);
    else setInputCheck(false);
  }, [
    userId,
    userName,
    userEmail,
    userPassword,
    pwCheck,
    userBirth,
    userStatus,
  ]);

  const emptyCheck = () => {
    if (!userId) {
      Confirm('알림', '아이디를 입력해주세요. (6~20자리)');
      return 0;
    } else if (!userName) {
      Confirm('알림', '이름을 입력해주세요.');
      return 0;
    } else if (!userPassword) {
      Confirm('알림', '비밀번호를 입력해주세요. (8~16자리)');
      return 0;
    } else if (!pwCheck) {
      Confirm('알림', '비밀번호 확인을 입력해주세요.');
      return 0;
    } else if (userPassword != pwCheck) {
      Confirm('알림', '비밀번호 확인이 맞지 않습니다.');
      return 0;
    } else if (!userBirth) {
      Confirm('알림', '생일을 입력해주세요.');
      return 0;
    } else if (!userStatus) {
      Confirm('알림', '가족 내 역할을 입력해주세요.');
      return 0;
    } else if (!check1 || !check2) {
      Confirm('알림', '필수 약관에 동의해 주세요.');
      return 0;
    } else return 1;
  };

  const validationCheck = () => {
    if (!reg.ID_REG.test(userId)) {
      Confirm(
        '알림',
        '아이디는 영문 또는 숫자 조합 6 ~ 20자리로 설정해 주세요.',
      );
      return 0;
    } else if (!idCheck) {
      Confirm('알림', '사용할 수 있는 아이디인지 검사해 주세요.');
      return 0;
    } else if (joinedNickname && !joinedIdCheck) {
      Confirm('알림', '초대가족 아이디가 존재하는지 검사해 주세요.');
      return 0;
    } else if (!reg.EMAIL_REG.test(userEmail)) {
      Confirm('알림', '이메일 형식이 일치하지 않습니다.');
      return 0;
    } else if (!reg.NAME_REG.test(userName)) {
      Confirm('알림', '이름은 한글만 입력 가능합니다.');
      return 0;
    } else if (!reg.PW_REG.test(userPassword)) {
      Confirm(
        '알림',
        '비밀번호는 영문과 숫자 조합 8 ~ 16 자리로 설정해 주세요.',
      );
      return 0;
    } else if (!reg.NAME_REG.test(userStatus)) {
      Confirm('알림', '가족 내 역할은 한글만 입력 가능합니다.');
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
                join(false);
              },
              style: 'cancel',
            },
            {
              text: '동의',
              onPress: () => {
                join(true);
              },
            },
          ],
          {cancelable: true},
        );
      } else {
        join(check3);
      }
    }
  };

  const join = notifCheck => {
    // 가족회원이 없는 회원가입
    if (!joinedNickname) {
      noJoinedMutate({
        checkNotification: notifCheck,
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
        checkNotification: notifCheck,
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

  return (
    <WithHeader
      title="회원가입"
      isBack={true}
      isLoading={noJoinedIsLoading || withJoinedIsLoading}>
      <ScrollView>
        <Container>
          <Box>
            <InputContainer>
              <InputButtonBox>
                <AppInputs.BorderBottomInput
                  width={windowWidth * 0.9 - 70}
                  maxLength={20}
                  placeholder="아이디 (영문 또는 숫자 6~20)"
                  value={userId}
                  onChangeText={setUserId}
                  autoCapitalize="none"
                  margin={{marginBottom: 10}}
                  onSubmitEditing={e => {
                    if (!reg.ID_REG.test(userId)) {
                      Confirm(
                        '알림',
                        '아이디는 영문 또는 숫자 조합 6 ~ 20자리로 설정해 주세요.',
                      );
                      return 0;
                    } else {
                      getCheckIdMutate({id: userId});
                      inputRef.current[0].focus();
                    }
                  }}
                  blurOnSubmit={false}
                />
                <AppButtons.BasicButton
                  title="확인"
                  width={50}
                  disabled={!userId}
                  onPress={() => {
                    if (!reg.ID_REG.test(userId)) {
                      Confirm(
                        '알림',
                        '아이디는 영문 또는 숫자 조합 6 ~ 20자리로 설정해 주세요.',
                      );
                      return 0;
                    } else {
                      getCheckIdMutate({id: userId});
                      inputRef.current[0].focus();
                    }
                  }}
                  margin={{marginBottom: 10}}
                />
              </InputButtonBox>
              <AppInputs.BorderBottomInput
                maxLength={8}
                placeholder="이름"
                value={userName}
                onChangeText={setUserName}
                margin={{marginBottom: 10}}
                ref={element => (inputRef.current[0] = element)}
                onSubmitEditing={() => {
                  inputRef.current[1].focus();
                }}
                blurOnSubmit={false}
              />
              <AppInputs.BorderBottomInput
                maxLength={30}
                placeholder="이메일"
                value={userEmail}
                onChangeText={setUserEmail}
                autoCapitalize="none"
                margin={{marginBottom: 10}}
                ref={element => (inputRef.current[1] = element)}
                onSubmitEditing={() => {
                  inputRef.current[2].focus();
                }}
                blurOnSubmit={false}
              />
              <AppInputs.BorderBottomInput
                maxLength={16}
                placeholder="비밀번호 (영문과 숫자 조합 8~16)"
                value={userPassword}
                onChangeText={setUserPassWord}
                secureTextEntry={true}
                autoCapitalize="none"
                margin={{marginBottom: 10}}
                ref={element => (inputRef.current[2] = element)}
                onSubmitEditing={() => {
                  inputRef.current[3].focus();
                }}
                blurOnSubmit={false}
              />
              <AppInputs.BorderBottomInput
                maxLength={16}
                placeholder="비밀번호 확인"
                value={pwCheck}
                onChangeText={setPwCheck}
                secureTextEntry={true}
                autoCapitalize="none"
                margin={{marginBottom: 10}}
                ref={element => (inputRef.current[3] = element)}
                onSubmitEditing={() => {
                  setBirthOpen(true);
                }}
              />
              {/* 생년월일 선택 버튼 */}
              <BirthButton onPress={() => setBirthOpen(true)}>
                <AppFonts.Body2
                  color={birthClick ? 'black' : AppColors.Gray600}>
                  {birthClick ? format(userBirth, 'yyyy-MM-dd') : '생년월일'}
                </AppFonts.Body2>
              </BirthButton>
              <AppInputs.BorderBottomInput
                maxLength={8}
                placeholder="가족 내 역할  (ex)첫째 딸"
                value={userStatus}
                onChangeText={setUserStatus}
                margin={{marginBottom: 10}}
                ref={element => (inputRef.current[4] = element)}
                onSubmitEditing={() => {
                  inputRef.current[5].focus();
                }}
                blurOnSubmit={false}
              />
              <InputButtonBox>
                <AppInputs.BorderBottomInput
                  width={windowWidth * 0.9 - 70}
                  maxLength={20}
                  placeholder="초대가족 아이디"
                  value={joinedNickname}
                  onChangeText={setJoinedNickname}
                  margin={{marginBottom: 10}}
                  ref={element => (inputRef.current[5] = element)}
                  onSubmitEditing={() => {
                    getJoinedIdMutate({id: joinedNickname});
                  }}
                />
                <AppButtons.BasicButton
                  title="확인"
                  width={50}
                  disabled={!joinedNickname}
                  onPress={() => {
                    getJoinedIdMutate({id: joinedNickname});
                  }}
                />
              </InputButtonBox>
              <CheckLists>
                <AppComponents.Row margin={{marginTop: 10}}>
                  <AppList.CheckList
                    check={check1}
                    title="개인정보 처리 방침 동의 [필수]"
                    onPress={() => {
                      setCheck1(!check1);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        'https://www.onjeong-app.com/privacy-policy.html',
                      );
                    }}>
                    <AppComponents.IconBox
                      icon={<AppIcons.Right_gray />}
                      padding={{paddingLeft: 10}}
                    />
                  </TouchableOpacity>
                </AppComponents.Row>
                <AppComponents.Row margin={{marginTop: 5}}>
                  <AppList.CheckList
                    check={check2}
                    title="앱 이용 약관 동의 [필수]"
                    onPress={() => {
                      setCheck2(!check2);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        'https://www.onjeong-app.com/service-terms.html',
                      );
                    }}>
                    <AppComponents.IconBox
                      icon={<AppIcons.Right_gray />}
                      padding={{paddingLeft: 10}}
                    />
                  </TouchableOpacity>
                </AppComponents.Row>
                <AppComponents.Row margin={{marginTop: 5}}>
                  <AppList.CheckList
                    check={check3}
                    title="앱 푸시 알림 동의 [선택]"
                    onPress={() => {
                      setCheck3(!check3);
                    }}
                  />
                </AppComponents.Row>
              </CheckLists>
            </InputContainer>

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
                inputRef.current[4].focus();
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
  );
};

export default SignUpScreen;
