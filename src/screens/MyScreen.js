import React, {useState} from 'react';
import {BasicHeader} from '../components/WithHeader';
import styled from 'styled-components';
import {FontStyle} from '../utils/GlobalFonts';
import {Components} from '../utils/Components';
import {useSignOut} from '../hooks/useUserData';
import {useDelFCM} from '@/hooks/useFCMtoken';
import {useRecoilValue} from 'recoil';
import {storage} from '@/config/storage';
import UserData from '@/state/UserData';

const Menu = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`;

export const Email = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: 20px;
  left: 30px;
`;

const MyScreen = ({navigation}) => {
  const [signOut, setSignOut] = useState(false);

  const userData = useRecoilValue(UserData);

  const {error, status} = useSignOut({
    navigation,
    enabled: signOut,
    onMutate: delFCMToken,
  });
  const {mutate} = useDelFCM();

  const delFCMToken = async () => {
    const fcmToken = await storage.getItem('fcmToken');
    console.log('온뮤:', userData);
    mutate({token: fcmToken, userNickname: userData.userNickname});
  };

  return (
    <BasicHeader title={'온정'} isBack={true} navigation={navigation}>
      <Menu>
        <FontStyle.SubTitle>공지사항</FontStyle.SubTitle>
      </Menu>
      <Components.HorizonLine />
      <Menu>
        <FontStyle.SubTitle>버전</FontStyle.SubTitle>
        <FontStyle.SubTitle>1.0.0</FontStyle.SubTitle>
      </Menu>
      <Components.HorizonLine />
      {/* 공백 */}
      <Menu />
      <Components.HorizonLine />
      <Menu>
        <FontStyle.SubTitle>비밀번호 변경</FontStyle.SubTitle>
      </Menu>
      <Components.HorizonLine />
      <Menu
        onPress={() => {
          delFCMToken();
          setSignOut(true);
        }}>
        <FontStyle.SubTitle>로그아웃</FontStyle.SubTitle>
      </Menu>
      <Components.HorizonLine />
      <Menu>
        <FontStyle.SubTitle>회원탈퇴</FontStyle.SubTitle>
      </Menu>
      <Components.HorizonLine />
      <Email>
        <FontStyle.Content>
          연락가능 이메일 : onjeong@gmail.com
        </FontStyle.Content>
      </Email>
    </BasicHeader>
  );
};

export default MyScreen;
