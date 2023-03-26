import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {Paper, PaperContainer, SendBox} from './MailWriteScreen';
import {useGetMailDetail} from '@/hooks/useMailData';
import {WithHeader} from '@/components/headers/WithHeader';

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

const MailDetailScreen = ({navigation, route}) => {
  // 메일 읽음 처리 용 서버 연동
  useGetMailDetail(route.params.mailId);

  console.log(route);

  return (
    <WithHeader isBack={true} navigation={navigation}>
      <>
        <PaperContainer>
          <Paper>
            <PaperTop>
              <AppFonts.ContentB>
                To.{' '}
                <AppFonts.ContentB>
                  {route.params.receiveUserName}
                </AppFonts.ContentB>
              </AppFonts.ContentB>
            </PaperTop>
            <MainContent textAlignVertical="top">
              {route.params.mailContent}
            </MainContent>
            <SendBox>
              <AppFonts.ContentB>
                From.{' '}
                <AppFonts.ContentB>
                  {route.params.sendUserName}
                </AppFonts.ContentB>
              </AppFonts.ContentB>
            </SendBox>
          </Paper>
        </PaperContainer>
      </>
    </WithHeader>
  );
};

export default MailDetailScreen;
