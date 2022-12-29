import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/headers/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import {AppInputs} from '../../components/inputs';
import {useSignIn} from '../../hooks/useUserData';
import {storage} from '../../config/storage';
import {refreshAxios} from '@/api/axios';
import {useAddFCM} from '@/hooks/useFCMtoken';
import {useSetRecoilState} from 'recoil';
import UserData, {
  FamilyIdState,
  UserBirthState,
  UserIdState,
  UserNameState,
  UserNicknameState,
  UserStatusState,
} from '@/state/UserData';
import messaging from '@react-native-firebase/messaging';
import customAxios from '@/api/axios';

//
// 로그인
//

export const Container = styled.SafeAreaView`
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

const SignInScreen = ({navigation}) => {
  const setUserIdState = useSetRecoilState(UserIdState);
  const setUserNameState = useSetRecoilState(UserNameState);
  const setUserBirthState = useSetRecoilState(UserBirthState);
  const setUserStatusState = useSetRecoilState(UserStatusState);
  const setUserNicknameState = useSetRecoilState(UserNicknameState);
  const setFamilyIdState = useSetRecoilState(FamilyIdState);

  const [inputCheck, setInputCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const {mutate} = useSignIn(navigation);
  const {mutate: addFCM} = useAddFCM();

  // 항목을 전부 입력했는지 체크
  useEffect(() => {
    if (userId && userPassword) setInputCheck(true);
    else setInputCheck(false);
  }, [userId, userPassword]);

  useEffect(() => {
    // 기본 헤더 제거
    delete customAxios.defaults.headers.common['AuthorizationAccess'];
  }, []);

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
    mutate(
      {
        userNickname: userId,
        userPassword,
      },
      {
        onSuccess: async data => {
          // 헤더 등록
          customAxios.defaults.headers.common['AuthorizationAccess'] =
            data.headers.authorizationaccess;
          refreshAxios.defaults.headers.common['AuthorizationAccess'] =
            data.headers.authorizationaccess;
          refreshAxios.defaults.headers.common['AuthorizationRefresh'] =
            data.headers.authorizationrefresh;

          //FCM 토큰 보내기
          getFCMToken();

          //FCM 토큰 구독
          subscribeTopic(data.data.data.familyId);

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
          setUserIdState(data.data.data.userId);
          setUserNameState(data.data.data.userName);
          setUserNicknameState(data.data.data.userNickname);
          setUserStatusState(data.data.data.userStatus);
          setUserBirthState(data.data.data.userBirth);
          setFamilyIdState(data.data.data.familyId);

          navigation.navigate('Home');
        },
        onError: err => {
          console.log(err);
          if (err?.response?.data?.error === 'Unauthorized') {
            alert('아이디 또는 비밀번호가 맞지 않습니다.');
            setUserId('');
            setUserPassword('');
          }
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
              value={userId}
              onChangeText={setUserId}
            />
            <AppInputs.BorderBottomInput
              maxLength={15}
              placeholder="비밀번호"
              value={userPassword}
              onChangeText={setUserPassword}
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
              navigation.navigate('SignUp');
            }}
            inputCheck={true}
          />
        </Box>
      </Container>
    </NoHeader>
  );
};

export default SignInScreen;
