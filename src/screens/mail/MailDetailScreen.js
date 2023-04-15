import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {Paper, PaperContainer, SendBox} from './MailWriteScreen';
import {useGetMailDetail} from '@/hooks/useMailData';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppContainer} from '@/components/container';
import {windowHeight} from '@/utils/GlobalStyles';

const PaperTop = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const MainContent = styled.Text`
  flex: 1;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

const MailDetailScreen = ({route}) => {
  // 메일 읽음 처리 용 서버 연동
  useGetMailDetail(route?.params?.mailId);

  console.log(route);

  return (
    <WithHeader isBack={true}>
      <>
        <PaperContainer>
          <AppContainer.Paper
            height={windowHeight * 0.6}
            padding={{padding: 15}}>
            <PaperTop>
              <AppFonts.SubTitle>
                To.{' '}
                <AppFonts.SubTitle>
                  {route?.params?.receiveUserName}
                </AppFonts.SubTitle>
              </AppFonts.SubTitle>
            </PaperTop>
            <MainContent textAlignVertical="top">
              {route?.params?.mailContent}
            </MainContent>
          </AppContainer.Paper>
          <SendBox>
            <AppFonts.SubTitle>
              From.{' '}
              <AppFonts.SubTitle>
                {route?.params?.sendUserName}
              </AppFonts.SubTitle>
            </AppFonts.SubTitle>
          </SendBox>
        </PaperContainer>
      </>
    </WithHeader>
  );
};

export default MailDetailScreen;
