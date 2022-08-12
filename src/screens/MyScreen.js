import React from 'react';
import {BasicHeader} from '../components/WithHeader';
import styled from 'styled-components';
import {FontStyle} from '../utils/GlobalFonts';
import {Components} from '../utils/Components';
import {useSignOut} from '../hooks/useUserData';

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
          navigation.navigate('SignIn');
          const {status, error, data} = useSignOut(navigation);
          console.log('status: ' + status);
          if (error) console.log('error: ' + error);
          if (status != 'loading') console.log('data: ' + data);
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
