import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {AppColors, windowHeight} from '@/utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import {useSignIn} from '../../hooks/useUserData';
import {storage} from '../../config/storage';
import {refreshAxios} from '@/api/axios';
import {useAddFCM} from '@/hooks/useFCMtoken';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  FamilyIdState,
  UserBirthState,
  UserEmailState,
  UserIdState,
  UserNameState,
  UserNicknameState,
  UserStatusState,
} from '@/state/UserData';
import messaging, {firebase} from '@react-native-firebase/messaging';
import customAxios from '@/api/axios';
import {AppComponents} from '@/components/Components';
import {NoHeader} from '@/components/headers/NoHeader';
import {
  check,
  checkNotifications,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Alert, Linking, Platform} from 'react-native';
import {NotificationPermissionState} from '@/state/DeviceData';

//
// 로그인
//

export const LogoContainer = styled.View`
  flex: 2;
  justify-content: flex-end;
  align-items: center;
`;

export const Container = styled.SafeAreaView`
  flex: 3;
  justify-content: flex-start;
  align-items: center;
`;

export const Box = styled.View`
  width: 100%;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Title = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const InputContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: ${windowHeight * 0.05};
  margin-bottom: 20px;
`;

const SignInScreen = ({navigation}) => {
  const setUserIdState = useSetRecoilState(UserIdState);
  const setUserNameState = useSetRecoilState(UserNameState);
  const setUserBirthState = useSetRecoilState(UserBirthState);
  const setUserStatusState = useSetRecoilState(UserStatusState);
  const setUserNicknameState = useSetRecoilState(UserNicknameState);
  const setUserEmailState = useSetRecoilState(UserEmailState);
  const setFamilyIdState = useSetRecoilState(FamilyIdState);
  const [notificationPermissionState, setNotificationPermissionState] =
    useRecoilState(NotificationPermissionState);

  const [inputCheck, setInputCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const inputPW = useRef();

  const {
    mutate: signInMutate,
    isLoading: signInIsLoading,
    isError: signInIsError,
    error: signInError,
  } = useSignIn(navigation);
  const {mutate: addFCM} = useAddFCM();

  if (signInError) console.log('로긴에러:', signInError);

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (userId && userPassword) setInputCheck(true);
    else setInputCheck(false);
  }, [userId, userPassword]);

  useEffect(() => {
    // 기본 헤더 제거
    delete customAxios.defaults.headers.common['AuthorizationAccess'];

    getStoragePermission();
    getNotificationPermission();
  }, []);

  const getStoragePermission = () => {
    // 앨범 접근 권한 요청
    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(result => {
          console.log(result);
          switch (result) {
            case RESULTS.UNAVAILABLE:
              alert('해당 기기는 앨범에 접근할 수 있는 기기가 아닙니다.');
              console.log('앨범 접근 권한 : unavailable');
              break;
            case RESULTS.GRANTED:
              console.log('앨범 접근 권한 : granted');
              break;
            case RESULTS.DENIED:
              request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
                .then(res => {
                  console.log('앨범 접근 권한 허용 : ', res);
                })
                .catch(() => {
                  alert(
                    '앨범 접근 권한 허용 중 에러가 발생했습니다. 앱 설정 화면에서 권한을 허용해 주세요.',
                  );
                });
              break;
            case RESULTS.BLOCKED:
              alert('앨범 접근 권한 : blocked');
              Alert.alert(
                '',
                '온정에서 기기의 사진, 미디어, 파일에 액세스할 수 있도록 앱 설정 화면에서 권한을 허용해주세요.',
                [
                  {
                    text: '거부',
                    onPress: () => {
                      console.log('앨범 접근 권한 허용 거부됨');
                    },
                  },
                  {
                    text: '허용',
                    onPress: () => Linking.openSettings(),
                  },
                ],
              );
              break;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const getNotificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('알림 허용됨');
      setNotificationPermissionState(true);
    } else {
      console.log('알림 거부됨');
      requestPermission();
      setNotificationPermissionState(false);
    }
  };

  const requestPermission = async () => {
    // 안드로이드 13 버전
    if (Platform.OS == 33) {
      const res = await firebase.messaging().requestPermission();
      if (res == 'denied')
        alert('푸시 알림 설정은 회원정보변경에서 변경 가능합니다.');
    } else
      Alert.alert(
        '',
        '가족들에 관한 알림을 받기 위해 앱 설정 화면에서 권한을 허용해주세요.',
        [
          {
            text: '거부',
            onPress: () => {
              alert('푸시 알림 설정은 회원정보변경에서 변경 가능합니다.');
            },
          },
          {
            text: '허용',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
  };

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
    signInMutate(
      {
        userNickname: userId,
        userPassword,
      },
      {
        onSuccess: async data => {
          console.log(data);
          // 헤더 등록
          customAxios.defaults.headers.common['AuthorizationAccess'] =
            data.headers.authorizationaccess;
          refreshAxios.defaults.headers.common['AuthorizationAccess'] =
            data.headers.authorizationaccess;
          refreshAxios.defaults.headers.common['AuthorizationRefresh'] =
            data.headers.authorizationrefresh;

          if (notificationPermissionState) {
            //FCM 토큰 보내기
            getFCMToken();
            //FCM 토큰 구독
            subscribeTopic(data.data.data.familyId);
          }

          //로그인 토큰 저장
          await storage.setItem(
            'accessToken',
            data.headers.authorizationaccess,
          );
          await storage.setItem(
            'refreshToken',
            data.headers.authorizationrefresh,
          );
          setUserId('');
          setUserPassword('');

          // 유저정보 리코일에 저장
          console.log('홈데이터', data);
          setUserIdState(data.data.data.userId);
          setUserNameState(data.data.data.userName);
          setUserNicknameState(data.data.data.userNickname);
          setUserEmailState(data.data.data.userEmail);
          setUserStatusState(data.data.data.userStatus);
          setUserBirthState(data.data.data.userBirth);
          setFamilyIdState(data.data.data.familyId);

          navigation.navigate('Home');
        },
        onError: err => {
          if (err.response.status != 502) alert(err.response.data.message);
          console.log(err);

          // 아이디 비번이 틀린 경우 제외
          if (
            !err.response.data.code === 'A005' ||
            !err.response.data.code === 'A006'
          )
            setIsError(true);

          console.log(isError);
        },
      },
    );
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

  return (
    <NoHeader
      isLoading={signInIsLoading}
      reloadFunc={onSubmit}
      isError={signInIsError && isError}>
      <LogoContainer>
        <Box>
          <Logo source={require('@/assets/image/logo/onjeong_logo.jpg')} />
          {/* <Title>
            <AppFonts.Heading>온정</AppFonts.Heading>
          </Title> */}
        </Box>
      </LogoContainer>
      <Container>
        <Box>
          <InputContainer>
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="아이디"
              value={userId}
              onChangeText={setUserId}
              margin={{marginBottom: 10}}
              onSubmitEditing={() => inputPW.current?.focus()}
              blurOnSubmit={false}
            />
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="비밀번호"
              value={userPassword}
              onChangeText={setUserPassword}
              ref={inputPW}
              secureTextEntry={true}
              margin={{marginBottom: 10}}
              onSubmitEditing={onSubmit}
            />
          </InputContainer>

          <AppButtons.BigButton
            title="로그인"
            onPress={onSubmit}
            disabled={!inputCheck}
          />
          <AppComponents.EmptyBox height={12} />
          <AppButtons.BigButton
            title="회원가입"
            color={AppColors.Secondary}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignInScreen;
