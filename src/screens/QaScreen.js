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
import {UserNameState} from '@/state/UserData';

const SpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const QuestBox = styled.View`
  width: 100%;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 30px;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
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
  min-height: 100px;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  padding: 10px;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const MessageBox = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
`;

export default function QaScreen({navigation}) {
  const queryClient = useQueryClient();
  const userName = useRecoilValue(UserNameState);

  const [isMyAns, setIsMyAns] = useState(true); // 내가 문답을 입력했는지 여부
  const [isModAns, setIsModAns] = useState(false); // 내 문답 수정중인지 여부
  const [ansText, setAnsText] = useState('');

  const {
    data: questData,
    isLoading: questIsLoading,
    status: questStatus,
  } = useGetQuest();
  const {
    data: ansData,
    isLoading: ansIsLoading,
    status: ansStatus,
  } = useGetAnswers();
  console.log(ansData);

  const {mutate: addAns} = useAddAnswer(() => {
    // 문답 답변들 리패치
    queryClient.invalidateQueries('getAnswers');
    setIsMyAns(true); // 문답 입력칸 없애기
  });
  const {mutate: modAns} = useModifyAnswer({
    onSuccess: () => {
      isModAns(false);
      queryClient.setQueryData('getAnswers', oldData => {
        console.log(oldData);
        // 수정된 데이터로 바꾸기
      });
    },
  });
  const {mutate: delAns} = useDeleteAnswer({
    onSuccess: () => {
      queryClient.setQueryData('getAnswers', oldData => {
        console.log(oldData);
        // 삭제한 데이터 지우기
      });
    },
  });

  useEffect(() => {
    isAnswered();
  }, [ansData]);

  // 내가 답변을 작성했는지 여부 확인
  const isAnswered = () => {
    setIsMyAns(false);
    ansData?.data.map(obj => {
      if (obj.userName == userName) setIsMyAns(true);
    });
  };

  return (
    <BasicHeader title="이 주의 문답" navigation={navigation}>
      {(questIsLoading || ansIsLoading) && (
        <FontStyle.Content>Loading...</FontStyle.Content>
      )}
      {questStatus == 'success' && ansStatus == 'success' ? (
        <>
          <QuestBox>
            <FontStyle.ContentB>
              질문 :{' '}
              <FontStyle.Content>
                {questData?.data.questionContent}
              </FontStyle.Content>
            </FontStyle.ContentB>
          </QuestBox>
          {!isMyAns && (
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
                  <FontStyle.SubContent>
                    {ansText.length}/80
                  </FontStyle.SubContent>
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
              <FontStyle.Content>
                문답을 첫번째로 작성해보세요!
              </FontStyle.Content>
            </MessageBox>
          ) : (
            <ScrollView>
              {ansData?.data.map(ans => (
                <AnsContainer>
                  <AnsBox>
                    <SpaceBetween>
                      <FontStyle.ContentB>{ans.userName}</FontStyle.ContentB>
                      {ans.userName == userName && (
                        <SpaceBetween>
                          <AppIconButtons.Pencil
                            onPress={() => {
                              setIsModAns(!isModAns);
                              setAnsText(ans.answerContent);
                            }}
                            margin={{marginRight: 6}}
                          />
                          <AppIconButtons.Delete
                            onPress={() => delAns(ans.answerId)}
                          />
                        </SpaceBetween>
                      )}
                    </SpaceBetween>
                    <Ans>
                      {/* 수정버튼 누른 경우 내 대답 수정할 수 있게 */}
                      {ans.userName == userName && isModAns ? (
                        <>
                          <MyAnsInput
                            multiline={true}
                            numberOfLines={4}
                            maxLength={80}
                            textAlignVertical="top"
                            value={ansText}
                            onChangeText={setAnsText}
                            autoFocus={true}
                          />
                          <MaxLength>
                            <FontStyle.SubContent>
                              {ansText.length}/80
                            </FontStyle.SubContent>
                          </MaxLength>
                        </>
                      ) : (
                        <FontStyle.Content>
                          {ans.answerContent}
                        </FontStyle.Content>
                      )}
                    </Ans>
                    {/* 수정중인 경우 수정버튼 나타나게 */}
                    {ans.userName == userName && isModAns && (
                      <SubmitButton>
                        <TextButton.Content
                          title="수정"
                          onPress={() => {
                            modAns({
                              answerContent: ansText,
                              answerId: ans.answerId,
                            });
                          }}
                        />
                      </SubmitButton>
                    )}
                  </AnsBox>
                </AnsContainer>
              ))}
              <Components.EmptyBox />
            </ScrollView>
          )}
        </>
      ) : (
        !questIsLoading &&
        !ansIsLoading && (
          <FontStyle.Content>데이터 로딩에 실패했습니다.</FontStyle.Content>
        )
      )}
    </BasicHeader>
  );
}
