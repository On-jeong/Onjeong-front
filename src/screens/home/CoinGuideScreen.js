import React from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {Components} from '@/utils/Components';
import {ScrollView} from 'react-native';

const MessageBox = styled.View`
  width: 100%;
  height: 45px;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const CoinGuideScreen = ({navigation}) => {
  return (
    <NoHeader
      isBack={true}
      title={'영양제 적립 가이드'}
      navigation={navigation}>
      <ScrollView>
        <Message title={'메세지 보내기'} coin={10} />
        <Message title={'게시물 작성'} coin={20} />
        <Message title={'프로필 등록'} coin={100} />
        <Components.EmptyBox />
      </ScrollView>
    </NoHeader>
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
      {/* <Components.HorizonLine /> */}
    </>
  );
};

export default CoinGuideScreen;
