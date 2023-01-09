import React, {useState} from 'react';
import {BasicHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {useDeleteAccount, useSignOut} from '@/hooks/useUserData';
import {useDelFCM} from '@/hooks/useFCMtoken';
import {useRecoilValue} from 'recoil';
import {storage} from '@/config/storage';
import {UserNicknameState} from '@/state/UserData';
import PromptModal from '@/components/modal/PromptModal';
import {AppColors} from '@/utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '@/api/axios';

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

  const [signOutModal, setSignOutModal] = useState(false);

  const userNickname = useRecoilValue(UserNicknameState);

  const {error, status} = useSignOut({
    enabled: signOut,
  });

  const {mutate} = useDelFCM();

  const delFCMToken = async () => {
    const fcmToken = await storage.getItem('fcmToken');

    mutate({token: fcmToken, userNickname: userNickname});
  };

  return (
    <>
      <BasicHeader title={'온정'} isBack={true} navigation={navigation}>
        <Menu>
          <FontStyle.SubTitle>공지사항</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        <Menu>
          <FontStyle.SubTitle>서비스 이용약관</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        <Menu>
          <FontStyle.SubTitle>개인정보 처리 방침</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        <Menu>
          <FontStyle.SubTitle>버전</FontStyle.SubTitle>
          <FontStyle.SubTitle>1.0.0</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        {/* 공백 */}
        <Menu />
        <AppComponents.HorizonLine />
        <Menu
          onPress={() => {
            navigation.navigate('AccountMod');
          }}>
          <FontStyle.SubTitle>회원정보 변경</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        <Menu
          onPress={() => {
            setSignOutModal(true);
          }}>
          <FontStyle.SubTitle>로그아웃</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        <Menu
          onPress={() => {
            navigation.navigate('AccountDelete');
          }}>
          <FontStyle.SubTitle>회원탈퇴</FontStyle.SubTitle>
        </Menu>
        <AppComponents.HorizonLine />
        <Email>
          <FontStyle.Content>
            연락가능 이메일 : onjeong@gmail.com
          </FontStyle.Content>
        </Email>

        {/* 로그아웃 모달 */}
        <PromptModal
          modalVisible={signOutModal}
          setModalVisible={setSignOutModal}
          title1={'정말 로그아웃을 하시겠습니까?'}
          leftOnPress={() => setSignOutModal(false)}
          rightOnPress={() => {
            delFCMToken();
            setSignOutModal(false);
            setSignOut(true);
          }}
          leftBorderColor={AppColors.green2}
        />
      </BasicHeader>
    </>
  );
};

export default MyScreen;
