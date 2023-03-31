import {BasicHeader, WithHeader} from '../components/headers/WithHeader';
import React from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import {Email, MenuContainer} from './mySetting/MyScreen';
import styled from 'styled-components';
import {AppComponents} from '@/components/Components';
import {AppIconButtons} from '../components/IconButtons';
import {ScrollView} from 'react-native';
import {AppIcons, IconBox, IconButton} from '@/ui/icons';
import {AppColors} from '@/utils/GlobalStyles';

export const MessageBox = styled.TouchableOpacity`
  width: 100%;
  padding-top: 3%;
  padding-bottom: 3%;
`;

export const MessageContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 3%;
  padding-right: 3%;
`;

export const Time = styled.View`
  margin-top: 5px;
  margin-left: 40px;
`;

const AlertScreen = ({navigation}) => {
  return (
    <WithHeader title={'알림'} isBack={true} navigation={navigation}>
      <ScrollView>
        <MenuContainer>
          {/* 기본 메세지 */}
          <MessageBox>
            <MessageContent>
              <IconBox padding={{paddingRight: 8}}>
                <AppIcons.FlowerGray />
              </IconBox>
              <AppFonts.Body2>온정에 오신 것을 환영합니다!</AppFonts.Body2>
            </MessageContent>
          </MessageBox>
          <Message title={'이 주의 문답 작성으로 10의 영양제를 얻었어요.'} />
          <Message title={'이 주의 문답 작성으로 10의 영양제를 얻었어요.'} />
        </MenuContainer>
      </ScrollView>
      {/* <Email>
        <AppIconButtons.Alert size={15} />
        <AppFonts.SubContent>
          {' '}
          3일이 지나면 알림이 사라집니다.
        </AppFonts.SubContent>
      </Email> */}
    </WithHeader>
  );
};

const Message = ({title, time}) => {
  return (
    <>
      <AppComponents.HorizonLine />
      <MessageBox>
        <MessageContent>
          <IconBox padding={{paddingRight: 8}}>
            <AppIcons.FlowerGray />
          </IconBox>
          <AppFonts.Body2>
            이 주의 문답 작성으로 10의 영양제를 얻었어요.
          </AppFonts.Body2>
        </MessageContent>
        <Time>
          <AppFonts.Caption color={AppColors.Gray600}>
            10시간전
          </AppFonts.Caption>
        </Time>
      </MessageBox>
    </>
  );
};

export default AlertScreen;
