import {BasicHeader} from '../components/headers/WithHeader';
import React from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import {Email} from './mySetting/MyScreen';
import styled from 'styled-components';
import {AppComponents} from '@/components/Components';
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
          <AppFonts.ContentB>온정에 오신 것을 환영합니다!</AppFonts.ContentB>
        </MessageBox>
        <AppComponents.HorizonLine />
      </ScrollView>
      <Email>
        <AppIconButtons.Alert size={15} />
        <AppFonts.SubContent>
          {' '}
          3일이 지나면 알림이 사라집니다.
        </AppFonts.SubContent>
      </Email>
    </BasicHeader>
  );
};

export default AlertScreen;
