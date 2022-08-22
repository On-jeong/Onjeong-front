import React from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {Paper, PaperContainer, SendBox} from './MailWriteScreen';

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
  return (
    <NoHeader isBack={true} navigation={navigation}>
      <>
        <PaperContainer>
          <Paper>
            <PaperTop>
              <FontStyle.ContentB>
                To.{' '}
                <FontStyle.ContentB>
                  {route.params.receiveUserName}
                </FontStyle.ContentB>
              </FontStyle.ContentB>
            </PaperTop>
            <MainContent textAlignVertical="top">
              {route.params.mailContent}
            </MainContent>
            <SendBox>
              <FontStyle.ContentB>
                From.{' '}
                <FontStyle.ContentB>
                  {route.params.sendUserName}
                </FontStyle.ContentB>
              </FontStyle.ContentB>
            </SendBox>
          </Paper>
        </PaperContainer>
      </>
    </NoHeader>
  );
};

export default MailDetailScreen;
