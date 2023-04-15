import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {ScrollView} from 'react-native';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppContainer} from '@/components/container';
import {AppColors} from '@/utils/GlobalStyles';
import {AppMessage} from '@/components/message';

const MessageBox = styled.View`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  flex-direction: row;
  align-items: center;
`;

const CoinGuideScreen = ({navigation}) => {
  return (
    <WithHeader
      isBack={true}
      title={'영양제 적립 가이드'}>
      <ScrollView>
        <AppContainer.Basic>
          <AppContainer.Paper padding={{padding: 10}}>
            <Message title={'일일랜덤 코인'} coin={'10-100'} line={true} />
            <Message title={'메세지 보내기'} coin={10} line={true} />
            <Message title={'오늘의 기록 작성하기'} coin={20} line={true} />
            <Message title={'이주의 문답 작성하기'} coin={10} line={true} />
            <Message title={'이주의 문답을 모든 가족이 작성하기'} coin={200} />
          </AppContainer.Paper>
          <AppContainer.Paper padding={{padding: 10}}>
            <AppMessage.Warning
              title="한 번만 적립할 수 있어요"
              padding={{padding: 5}}
            />
            <Message title={'프로필 사진 등록하기'} coin={100} />
            <Message title={'상태메시지 등록하기'} coin={100} />
            <Message title={'좋아하는 것 작성하기'} coin={100} />
            <Message title={'싫어하는 것 작성하기'} coin={100} />
            <Message title={'한단어로 표현하는 것 작성하기'} coin={100} />
            <Message title={'관심사 작성하기'} coin={100} line={false} />
          </AppContainer.Paper>
        </AppContainer.Basic>

        <AppComponents.EmptyBox />
      </ScrollView>
    </WithHeader>
  );
};

const Message = ({title, coin, line = false}) => {
  return (
    <>
      <MessageBox>
        <AppFonts.Body1>{title + '  '}</AppFonts.Body1>
        <AppFonts.Body2 color={AppColors.Gray700}>{coin}</AppFonts.Body2>
      </MessageBox>
      {line && (
        <AppComponents.HorizonLine margin={{marginTop: 5, marginBottom: 5}} />
      )}
    </>
  );
};

export default CoinGuideScreen;
