import React, {useState} from 'react';
import {BasicHeader, WithHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {useSignOut} from '@/hooks/useUserData';
import {useDelFCM} from '@/hooks/useFCMtoken';
import {useRecoilValue} from 'recoil';
import {storage} from '@/config/storage';
import {UserNicknameState} from '@/state/UserData';
import PromptModal from '@/components/modal/PromptModal';
import {AppColors} from '@/utils/GlobalStyles';
import {AppIcons} from '@/ui/icons';
import customAxios from '@/api/axios';
import axios from 'axios';

export const MenuContainer = styled.View`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 100px;
  padding-left: 5%;
  padding-right: 5%;
`;

const Menu = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding-left: 4%;
  padding-right: 4%;
`;

export const Email = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: 20px;
  left: 30px;
`;

const MyScreen = ({navigation}) => {
  const userNickname = useRecoilValue(UserNicknameState);
  const [signOutModal, setSignOutModal] = useState(false);

  const {mutate: signOut} = useSignOut();
  const {mutate: delFCM} = useDelFCM();

  const delFCMToken = async () => {
    const fcmToken = await storage.getItem('fcmToken');

    delFCM({token: fcmToken, userNickname: userNickname});
  };

  return (
    <>
      <WithHeader title={'환경 설정'} isBack={true} navigation={navigation}>
        <MenuContainer>
          <Menu>
            <AppFonts.Body1>공지사항</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu>
            <AppFonts.Body1>서비스 이용약관</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu>
            <AppFonts.Body1>개인정보 처리 방침</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu>
            <AppFonts.Body1>버전</AppFonts.Body1>
            <AppFonts.Body1>1.0.0</AppFonts.Body1>
          </Menu>
          <AppComponents.HorizonLine />
          <Menu
            onPress={() => {
              navigation.navigate('AccountMod');
            }}>
            <AppFonts.Body1>회원정보 수정</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu
            onPress={() => {
              setSignOutModal(true);
            }}>
            <AppFonts.Body1>로그아웃</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu
            onPress={() => {
              navigation.navigate('AccountDelete');
            }}>
            <AppFonts.Body1>회원탈퇴</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <AppComponents.HorizonLine />
          <Menu
            onPress={() => {
              navigation.navigate('AccountDelete');
            }}>
            <AppFonts.Body1>connection</AppFonts.Body1>
            <AppFonts.Body1>onjeong@gmail.com</AppFonts.Body1>
          </Menu>

          {/* 로그아웃 모달 */}
          <PromptModal
            modalVisible={signOutModal}
            setModalVisible={setSignOutModal}
            title={'로그아웃'}
            script1={'정말 로그아웃을 하시겠습니까?'}
            leftOnPress={() => setSignOutModal(false)}
            rightOnPress={() => {
              delFCMToken();
              setSignOutModal(false);
              signOut();
            }}
            leftBorderColor={AppColors.Gray200}
          />
        </MenuContainer>
      </WithHeader>
    </>
  );
};

export default MyScreen;
