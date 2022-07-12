import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {AppColors, windowHeight} from '@/utils/GlobalStyles';
import {FontStyle} from '@/utils/GlobalFonts';

export const PaperContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

export const Paper = styled.View`
  width: 100%;
  height: ${windowHeight * 0.8};
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  padding: 20px;
  padding-top: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const PaperTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToInput = styled.TextInput`
  width: 80%;
  padding-left: 10px;
  font-family: 'GangwonLight';
  font-size: 20px;
  caret-color: ${AppColors.black};
`;

export const MainInput = styled.TextInput`
  flex: 1;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

export const SendBox = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const SendBtn = styled.TouchableOpacity`
  margin: 5px;
`;

const MailWriteScreen = ({navigation}) => {
  const [mainText, setMainText] = useState('');
  const [toText, setToText] = useState('');

  return (
    <NoHeader
    isBack={true}
    navigation={navigation}>
      <>
        <PaperContainer>
          <Paper>
            <PaperTop>
              <FontStyle.ContentB>To.</FontStyle.ContentB>
              <ToInput
                maxLength={10}
                selectionColor="black"
                value={toText}
                onChangeText={setToText}
              />
            </PaperTop>
            <MainInput
              multiline={true}
              numberOfLines={20}
              textAlignVertical="top"
              value={mainText}
              onChangeText={setMainText}
            />
            <SendBox>
              <FontStyle.ContentB>
                From. <FontStyle.ContentB>현진</FontStyle.ContentB>
              </FontStyle.ContentB>
            </SendBox>
          </Paper>
          <SendBox>
            <SendBtn>
              <FontStyle.ContentB>보내기</FontStyle.ContentB>
            </SendBtn>
          </SendBox>
        </PaperContainer>
      </>
    </NoHeader>
  );
};

export default MailWriteScreen;
