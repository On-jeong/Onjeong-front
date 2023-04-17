import {WithHeader} from '../components/headers/WithHeader';
import React from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import {Menu, MenuContainer} from './mySetting/MyScreen';
import styled from 'styled-components';
import {AppComponents} from '@/components/Components';
import {FlatList} from 'react-native';
import {AppIcons} from '@/ui/icons';
import {AppColors} from '@/utils/GlobalStyles';
import {useGetNotif} from '@/hooks/useFCMtoken';
import {AppMessage} from '@/components/message';

export const MessageBox = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
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
  const {data, isLoading, isError} = useGetNotif();
  console.log(data);

  return (
    <WithHeader
      title={'알림'}
      isBack={true}
      isLoading={isLoading}
      isError={isError}>
      <MenuContainer>
        {/* 기본 메세지 */}
        {data?.data?.data.length == 0 ? (
          <MessageBox>
            <AppFonts.Body2 color={AppColors.Gray600}>
              최근 3일간 알림이 없습니다.
            </AppFonts.Body2>
          </MessageBox>
        ) : (
          <FlatList
            data={data?.data?.data}
            renderItem={RenderMessage}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </MenuContainer>
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
