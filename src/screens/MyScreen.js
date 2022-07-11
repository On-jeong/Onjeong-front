import {View, Text} from 'react-native';
import React from 'react';
import {BasicHeader} from '../components/WithHeader';
import styled from 'styled-components';
import {AppColors} from '../utils/GlobalStyles';
import {FontStyle} from '../utils/GlobalFonts';

const Menu = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`;

const HorizonLine = styled.View`
  background-color: ${AppColors.border};
  height: 1px;
  width: 100%;
`;

const Email = styled.View`
  position: absolute;
  bottom: 20px;
  left: 30px;
`;

const MyScreen = ({navigation}) => {
  return (
    <BasicHeader title={'온정'} isBack={true} navigation={navigation}>
      <Menu>
        <FontStyle.SubTitle>공지사항</FontStyle.SubTitle>
      </Menu>
      <HorizonLine />
      <Menu>
        <FontStyle.SubTitle>버전</FontStyle.SubTitle>
        <FontStyle.SubTitle>1.0.0</FontStyle.SubTitle>
      </Menu>
      <HorizonLine />
      {/* 공백 */}
      <Menu />
      <HorizonLine />
      <Menu>
        <FontStyle.SubTitle>비밀번호 변경</FontStyle.SubTitle>
      </Menu>
      <HorizonLine />
      <Menu>
        <FontStyle.SubTitle>로그아웃</FontStyle.SubTitle>
      </Menu>
      <HorizonLine />
      <Menu>
        <FontStyle.SubTitle>회원탈퇴</FontStyle.SubTitle>
      </Menu>
      <HorizonLine />
      <Email>
        <FontStyle.Content>
          연락가능 이메일 : onjeong@gmail.com
        </FontStyle.Content>
      </Email>
    </BasicHeader>
  );
};

export default MyScreen;
