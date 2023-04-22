import {WithHeader} from '../components/headers/WithHeader';
import React, {useEffect} from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import {MenuContainer} from './mySetting/MyScreen';
import styled from 'styled-components';
import {AppComponents} from '@/components/Components';
import {BackHandler, FlatList} from 'react-native';
import {AppIcons} from '@/ui/icons';
import {AppColors} from '@/utils/GlobalStyles';
import {useGetNotif} from '@/hooks/useFCMtoken';
import {AppMessage} from '@/components/message';
import {useNavigation} from '@react-navigation/native';
import EmptyComponent from '@/components/Loading/EmptyComponent';

export const MessageBox = styled.View`
  width: 100%;
  justify-content: center;
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

export const AlertBox = styled.View`
  position: absolute;
  bottom: 20px;
  left: 30px;
`;

const AlertScreen = () => {
  const navigation = useNavigation();

  const {data, isLoading, isError} = useGetNotif();
  console.log(data);

  // 백 핸들러
  useEffect(() => {
    handlePressBack();
    return () => handlePressBack();
  }, []);

  const handlePressBack = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.pop();
      return true;
    });
  };

  return (
    <WithHeader
      title={'알림'}
      isBack={true}
      isLoading={isLoading}
      isError={isError}>
      <EmptyComponent
        isEmpty={data?.data?.data.length == 0}
        title1={' 최근 3일간 알림이 없습니다.'}>
        <MenuContainer>
          {/* 기본 메세지 */}
          <FlatList
            data={data?.data?.data}
            renderItem={RenderMessage}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </MenuContainer>
      </EmptyComponent>
      <AlertBox>
        <AppMessage.Warning title={'3일이 지나면 알림이 사라집니다'} />
      </AlertBox>
    </WithHeader>
  );
};

const RenderMessage = ({item, index}) => {
  return (
    <>
      {index != 0 && <AppComponents.HorizonLine />}
      <MessageBox>
        <MessageContent>
          <AppComponents.IconBox
            icon={<AppIcons.FlowerGray />}
            padding={{paddingRight: 8}}
          />
          <AppFonts.Body2>{item.notificationContent}</AppFonts.Body2>
        </MessageContent>
        <Time>
          <AppFonts.Caption color={AppColors.Gray600}>
            {item.notificationTime}
          </AppFonts.Caption>
        </Time>
      </MessageBox>
    </>
  );
};

export default AlertScreen;
