import React, {useCallback, useEffect, useState} from 'react';
import {BasicHeader} from '../components/headers/WithHeader';
import styled from 'styled-components';
import {ScrollView} from 'react-native';
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
import {useFocusEffect} from '@react-navigation/native';
import LoadingComponent, {
  LoadingBox,
} from '@/components/Loading/LoadingComponent';

export const SpaceBetween = styled.View`
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

  const [isMyAns, setIsMyAns] = useState(true); // 문답을 입력했는지 여부
  const [isModAns, setIsModAns] = useState(false); // 내 문답 수정중인지 여부
  const [ansText, setAnsText] = useState('');

  // 수정 중 다른 페이지로 이동 시 수정 다시 false
  useFocusEffect(
    useCallback(() => {
      setIsModAns(false);
    }, []),
  );

  const {
    data: questData,
    isLoading: questIsLoading,
    isError: questIsError,
    error: questError,
    refetch: questRefetch,
  } = useGetQuest();
  const {
    data: ansData,
    isLoading: ansIsLoading,
    isError: ansIsError,
    refetch: ansRefetch,
  } = useGetAnswers();
  console.log(ansData);

  const getId = data => {
    if (data.length === 0) return 0;
    else return data[data.length - 1].answerId + 1;
  };

  const {mutate: addAns, isLoading: addIsLoading} = useAddAnswer({
    onSuccess: () => {
      // 문답 답변들 리패치
      setIsMyAns(true); // 문답 입력칸 없애기
      setAnsText('');

      queryClient.setQueryData(['getAnswers'], oldData => [
        ...oldData,
        {
          answerId: getId(oldData),
          answerContent: ansText,
          userName: userName,
          answerTime: '',
        },
      ]);
    },
    onSettled: () => onSettled(),
  });
  const {mutate: modAns, isLoading: modIsLoading} = useModifyAnswer({
    onSuccess: () => {
      setIsModAns(false);
      queryClient.setQueryData(['getAnswers'], oldData => {
        return oldData.map(data =>
          data.userName === userName ? {...data, answerContent: ansText} : data,
        );
      });
    },
    onSettled: () => onSettled(),
  });
  const {mutate: delAns, isLoading: delIsLoading} = useDeleteAnswer({
    onSuccess: () => {
      setAnsText('');

      queryClient.setQueryData(['getAnswers'], oldData =>
        oldData?.filter(it => it.userName !== userName),
      );
    },
    onSettled: () => onSettled(),
  });

  const onSettled = () => {
    queryClient.invalidateQueries(['getAnswers']);
  };

  useEffect(() => {
    isAnswered();
  }, [ansData]);

  // 내가 답변을 작성했는지 여부 확인
  const isAnswered = () => {
    setIsMyAns(false);
    ansData?.map(obj => {
      if (obj.userName == userName) setIsMyAns(true);
    });
  };

  if (questError?.response?.data?.message === 'WEEKLY QUESTION NOT EXIST') {
    return (
      <BasicHeader title="이 주의 문답" navigation={navigation}>
        <LoadingBox>
          <FontStyle.Content>이 주의 문답이 준비중입니다..</FontStyle.Content>
          <FontStyle.Content>조금만 기다려 주세요!</FontStyle.Content>
        </LoadingBox>
      </BasicHeader>
    );
  }

  return (
    <BasicHeader
      title="이 주의 문답"
      navigation={navigation}
      isLoading={questIsLoading || ansIsLoading || modIsLoading || delIsLoading}
      isError={questIsError || ansIsError}
      reloadFunc={() => {
        questRefetch();
        ansRefetch();
      }}>
      <>
        <QuestBox>
          <FontStyle.ContentB>
            질문 :{' '}
            <FontStyle.Content>
              {questData?.data?.data.questionContent}
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
        {ansData && ansData?.length === 0 ? (
          <MessageBox>
            <FontStyle.Content>문답을 첫번째로 작성해보세요!</FontStyle.Content>
          </MessageBox>
        ) : (
          <LoadingComponent isLoading={addIsLoading}>
            <ScrollView>
              {ansData?.map(ans => (
                <AnsContainer key={ans.answerId}>
                  <AnsBox>
                    <SpaceBetween>
                      <FontStyle.ContentB>{ans.userName}</FontStyle.ContentB>
                      {ans.userName == userName && (
                        <SpaceBetween>
                          <AppIconButtons.Pencil
                            active={isModAns}
                            disabled={false}
                            onPress={() => {
                              setIsModAns(!isModAns);
                              setAnsText(ans.answerContent);
                            }}
                            padding={{padding: 6}}
                          />
                          <AppIconButtons.Delete
                            onPress={() => {
                              setIsModAns(false);
                              delAns(ans.answerId);
                              setAnsText('');
                            }}
                            padding={{padding: 6}}
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
              <Components.EmptyBox height={70} />
            </ScrollView>
          </LoadingComponent>
        )}
      </>
    </BasicHeader>
  );
}
