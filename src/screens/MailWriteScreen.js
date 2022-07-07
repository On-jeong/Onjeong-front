import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '../components/NoHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppColors, windowHeight} from '../utils/GlobalStyles';
import {FontStyle} from '../utils/GlobalFonts';

const PaperContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

const Paper = styled.View`
  width: 100%;
  height: ${windowHeight * 0.8};
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  padding: 20px;
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

const MainInput = styled.TextInput`
  flex: 1;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

const SendBox = styled.View`
  width: 100%;
  align-items: flex-end;
`;

const SendBtn = styled.TouchableOpacity`
  margin: 5px;
`;

const MailWriteScreen = ({navigation}) => {
  const [mainText, setMainText] = useState('');
  const [totext, setTotext] = useState('');
  console.log(mainText);
  return (
    <NoHeader
      leftIcon={<Entypo name="chevron-left" size={20} />}
      leftOnPress={() => {
        navigation.goBack();
      }}>
      <>
        <PaperContainer>
          <Paper>
            <PaperTop>
              <FontStyle.ContentB>To.</FontStyle.ContentB>
              <ToInput
                maxLength={10}
                selectionColor="black"
                value={totext}
                onChangeText={setTotext}
              />
            </PaperTop>
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
              <FontStyle.ContentB>보내기</FontStyle.ContentB>
            </SendBtn>
          </SendBox>
        </PaperContainer>
      </>
    </NoHeader>
  );
};

export default MailWriteScreen;
