import {BasicHeader, WithHeader} from '../components/headers/WithHeader';
import React from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import {Email, MenuContainer} from './mySetting/MyScreen';
import styled from 'styled-components';
import {AppComponents} from '@/components/Components';
import {AppIconButtons} from '../components/IconButtons';
import {FlatList, ScrollView} from 'react-native';
import {AppIcons, IconBox, IconButton} from '@/ui/icons';
import {AppColors} from '@/utils/GlobalStyles';
import {useGetNotif} from '@/hooks/useFCMtoken';

export const MessageBox = styled.View`
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
  const {data, isLoading, isError} = useGetNotif();
  console.log(data?.data?.data);

  return (
    <WithHeader
      title={'알림'}
      isBack={true}
      navigation={navigation}
      isLoading={isLoading}
      isError={isError}>
      <MenuContainer>
        {/* 기본 메세지 */}
        <FlatList
          data={data?.data?.data}
          renderItem={RenderMessage}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </MenuContainer>
      <Email>
        <AppIconButtons.Alert size={15} color={AppColors.Gray700} />
        <AppFonts.Caption color={AppColors.Gray700}>
          {' '}
          3일이 지나면 알림이 사라집니다.
        </AppFonts.Caption>
      </Email>
    </WithHeader>
  );
};

const RenderMessage = ({item, index}) => {
  console.log('아이템', index);
  return (
    <>
      {index != 0 && <AppComponents.HorizonLine />}
      <MessageBox>
        <MessageContent>
          <IconBox padding={{paddingRight: 8}}>
            <AppIcons.FlowerGray />
          </IconBox>
          <AppFonts.Body2>{item.notificationContent}</AppFonts.Body2>
        </MessageContent>
        {/* <Time>
          <AppFonts.Caption color={AppColors.Gray600}>
            {item.time}시간전
          </AppFonts.Caption>
        </Time> */}
      </MessageBox>
    </>
  );
};

export default AlertScreen;
