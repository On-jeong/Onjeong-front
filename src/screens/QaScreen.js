import React, {useEffect, useState} from 'react';
import {BasicHeader} from '../components/WithHeader';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styled from 'styled-components';
import {ScrollView, TouchableOpacity} from 'react-native';
import {FontStyle} from '../utils/GlobalFonts';
import {AppColors} from '../utils/GlobalStyles';
import {Components} from '../utils/Components';
import {AppIconButtons} from '../components/IconButtons';
import {
  useAddAnswer,
  useDeleteAnswer,
  useGetAnswers,
  useGetQuest,
  useModifyAnswer,
} from '@/hooks/useQuestionData';
import {TextButton} from '@/components/buttons/TextButton';
import {useQueryClient} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import UserData from '@/state/UserData';

const IconBox = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-top: 5px;
  padding-right: 7%;
`;

const QuestBox = styled.View`
  width: 100%;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 30px;
`;

const MyAnsContainer = styled.View`
  padding-left: 7%;
  padding-right: 7%;
  margin: 10px 0;
`;

const MyAnsWriteBox = styled.View`
  width: 100%;
  margin-top: 10px;
  min-height: 100px;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${AppColors.green1};
  background-color: ${AppColors.white};
`;

const MyAnsInput = styled.TextInput`
  padding-left: 10px;
  padding-right: 10px;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

const MaxLength = styled.View`
  align-items: flex-end;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const SubmitButton = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 10px;
  padding-right: 5px;
`;

const AnsContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

const AnsBox = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Ans = styled.View`
  width: 100%;
  height: 100px;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MessageBox = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
`;

export default function QaScreen({navigation}) {
  const queryClient = useQueryClient();
  const userData = useRecoilValue(UserData);

  const {data: questData} = useGetQuest();
  const {data: ansData} = useGetAnswers();
  console.log(ansData);
  console.log(questData);

  const {mutate: addAns} = useAddAnswer(() => {
    // 문답 답변들 리패치
    queryClient.invalidateQueries('getAnswers');
    setMyAns(false);
  });
  const {mutate: modifyAns} = useModifyAnswer();
  const {mutate: delAns} = useDeleteAnswer();

  const [myAns, setMyAns] = useState(false); // 내가 문답을 아직 입력하지 않았을 때
  const [ansText, setAnsText] = useState('');

  // 내가 답변을 작성했는지 여부
  useEffect(() => {
    if (isMyAns()) {
      setMyAns(true);
    }
  }, []);

  const isMyAns = () => {
    ansData?.data.find(obj => {
      return obj.userName === userData.userName;
    });
  };

  return (
    <BasicHeader title="이 주의 문답" navigation={navigation}>
      <QuestBox>
        <FontStyle.ContentB>
          질문 :{' '}
          <FontStyle.Content>
            {questData?.data.questionContent}
          </FontStyle.Content>
        </FontStyle.ContentB>
      </QuestBox>
      <IconBox>
        <AppIconButtons.Pencil onPress={() => setMyAns(!myAns)} />
      </IconBox>

      {!myAns && (
        <MyAnsContainer>
          <FontStyle.ContentB>내 답변</FontStyle.ContentB>
          <MyAnsWriteBox>
            <MyAnsInput
              multiline={true}
              numberOfLines={4}
              maxLength={80}
              textAlignVertical="top"
              value={ansText}
              onChangeText={setAnsText}
            />
            <MaxLength>
              <FontStyle.SubContent>{ansText.length}/80</FontStyle.SubContent>
            </MaxLength>
          </MyAnsWriteBox>
          <SubmitButton>
            <TextButton.Content
              title="제출"
              onPress={() => {
                addAns(ansText);
              }}
            />
          </SubmitButton>
        </MyAnsContainer>
      )}
      {ansData?.data.length === 0 ? (
        <MessageBox>
          <FontStyle.Content>문답을 첫번째로 작성해보세요!</FontStyle.Content>
        </MessageBox>
      ) : (
        <ScrollView>
          <AnsContainer>
            <AnsBox>
              <FontStyle.ContentB>아빠</FontStyle.ContentB>
              <Ans></Ans>
            </AnsBox>

            <Components.EmptyBox />
          </AnsContainer>
        </ScrollView>
      )}
    </BasicHeader>
  );
}
