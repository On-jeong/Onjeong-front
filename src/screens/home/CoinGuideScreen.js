import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {ScrollView} from 'react-native';
import { WithHeader } from '@/components/headers/WithHeader';

const MessageBox = styled.View`
  width: 100%;
  height: 45px;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const CoinGuideScreen = ({navigation}) => {
  return (
    <WithHeader
      isBack={true}
      title={'영양제 적립 가이드'}
      navigation={navigation}>
      <ScrollView>
        <Message title={'일일랜덤 코인지급'} coin={'10~100'} />
        <Message title={'메세지 보내기'} coin={10} />
        <Message title={'오늘의 기록 작성'} coin={20} />
        <Message title={'프로필 사진 등록'} coin={100} />
        <Message title={'상태메시지 등록'} coin={100} />
        <Message title={'좋아하는 것 작성하기'} coin={100} />
        <Message title={'싫어하는 것 작성하기'} coin={100} />
        <Message title={'한단어로 표현하는 것 작성'} coin={100} />
        <Message title={'관심사 작성'} coin={100} />
        <Message title={'이주의 문답 작성'} coin={10} />
        <Message title={'이주의 문답 모든 가족이 작성할 경우'} coin={200} />
        <AppComponents.EmptyBox />
      </ScrollView>
    </WithHeader>
  );
};

const Message = ({title, coin}) => {
  return (
    <>
      <MessageBox>
        <FontStyle.Content>
          {title} : {coin}
        </FontStyle.Content>
      </MessageBox>
      {/* <AppComponents.HorizonLine /> */}
    </>
  );
};

export default CoinGuideScreen;
