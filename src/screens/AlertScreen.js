import {BasicHeader} from '../components/headers/WithHeader';
import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {Email} from './mySetting/MyScreen';
import styled from 'styled-components';
import {Components} from '../utils/Components';
import {AppIconButtons} from '../components/IconButtons';
import {ScrollView} from 'react-native';

export const MessageBox = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const AlertScreen = ({navigation}) => {
  return (
    <BasicHeader title={'온정'} isBack={true} navigation={navigation}>
      <ScrollView>
        <MessageBox>
          <FontStyle.ContentB>온정에 오신 것을 환영합니다!</FontStyle.ContentB>
        </MessageBox>
        <Components.HorizonLine />
      </ScrollView>
      <Email>
        <AppIconButtons.Alert size={15} />
        <FontStyle.SubContent>
          {' '}
          3일이 지나면 알림이 사라집니다.
        </FontStyle.SubContent>
      </Email>
    </BasicHeader>
  );
};

export default AlertScreen;
