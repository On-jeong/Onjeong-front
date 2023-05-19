import React, {useEffect, useState} from 'react';
import {WithHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {useDeleteAccount, useSignOut} from '@/hooks/useUserData';
import {useDelFCM} from '@/hooks/useFCMtoken';
import {useRecoilValue} from 'recoil';
import {storage} from '@/config/storage';
import {UserNicknameState} from '@/state/UserData';
import PromptModal from '@/components/modal/PromptModal';
import {AppIcons} from '@/ui/icons';
import {Linking} from 'react-native';
import {AppInputs} from '@/components/inputs';
import InputModal from '@/components/modal/InputModal';

export const MenuContainer = styled.View`
  flex: 1;
  margin-top: 10px;
  margin-bottom: 100px;
  padding-left: 5%;
  padding-right: 5%;
`;

export const Menu = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding-left: 4%;
  padding-right: 4%;
`;

const MyScreen = ({navigation}) => {
  const userNickname = useRecoilValue(UserNicknameState);
  const [signOutModal, setSignOutModal] = useState(false);
  const [accountDelModal, setAccountDelModal] = useState(false);
  const [userPW, setUserPW] = useState(null);

  const {mutate: signOut} = useSignOut();
  const {mutate: delAccount, isError} = useDeleteAccount();
  const {mutate: delFCM} = useDelFCM();

  const delFCMToken = async () => {
    const fcmToken = await storage.getItem('fcmToken');

    delFCM({token: fcmToken, userNickname: userNickname});
  };

  useEffect(() => {
    if (isError) setUserPW('');
  }, [isError]);

  return (
    <>
      <WithHeader title={'환경 설정'} isBack={true}>
        <MenuContainer>
          <Menu
            onPress={() => {
              navigation.navigate('Notice');
            }}>
            <AppFonts.Body1>공지사항</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu
            onPress={() => {
              Linking.openURL(
                'https://www.onjeong-app.com/privacy-policy.html',
              );
            }}>
            <AppFonts.Body1>개인정보 처리 방침</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu
            onPress={() => {
              Linking.openURL('https://www.onjeong-app.com/service-terms.html');
            }}>
            <AppFonts.Body1>서비스 이용약관</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <Menu disabled={true}>
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
              setAccountDelModal(true);
            }}>
            <AppFonts.Body1>회원탈퇴</AppFonts.Body1>
            <AppIcons.Right_gray />
          </Menu>
          <AppComponents.HorizonLine />
          <AppComponents.HorizonLine />
          <Menu disabled={true}>
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
          />
          {/* 회원탈퇴 모달 */}

          <InputModal
            modalVisible={accountDelModal}
            setModalVisible={setAccountDelModal}
            title={'회원 탈퇴'}
            input={userPW}
            setInput={setUserPW}
            placeholder={'비밀번호'}
            script1={'가족을 두고 정말 떠나시는 건가요?'}
            script2={'탈퇴하면 복구할 수 없습니다.'}
            height={250}
            leftOnPress={() => setAccountDelModal(false)}
            rightOnPress={() => {
              delFCMToken();
              setAccountDelModal(false);
              delAccount(userPW);
              console.log(userPW);
            }}
          />
        </MenuContainer>
      </WithHeader>
    </>
  );
};

export default MyScreen;
