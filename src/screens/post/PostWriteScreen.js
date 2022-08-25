import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {FontStyle} from '@/utils/GlobalFonts';
import {MainInput, Paper, PaperContainer} from '@/screens/mail/MailWriteScreen';
import {useAddBoard} from '../../hooks/useBoardData';

const SendBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const SendBtn = styled.TouchableOpacity`
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

const PostWriteScreen = ({navigation, route}) => {
  const [mainText, setMainText] = useState('');

  const {mutate} = useAddBoard();

 

  return (
    <NoHeader title={route.params.date} isBack={true} navigation={navigation}>
      <>
        <PaperContainer>
          <Paper>
            <MainInput
              multiline={true}
              numberOfLines={20}
              textAlignVertical="top"
              value={mainText}
              onChangeText={setMainText}
            />
          </Paper>
          <SendBox>
            <SendBtn>
              <EvilIcons name="paperclip" size={22} />
              <FontStyle.SubContent>첨부파일</FontStyle.SubContent>
            </SendBtn>
            <SendBtn
              onPress={() => {
                mutate({boardDate: route.params.date, boardContent: mainText});
              }}>
              <FontStyle.ContentB>작성</FontStyle.ContentB>
            </SendBtn>
          </SendBox>
        </PaperContainer>
      </>
    </NoHeader>
  );
};

export default PostWriteScreen;
