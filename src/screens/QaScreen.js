import React, {useCallback, useEffect, useState} from 'react';
import {BasicHeader} from '../components/headers/WithHeader';
import styled from 'styled-components';
import {ScrollView} from 'react-native';
import {AppFonts} from '../utils/GlobalFonts';
import {AppColors, windowHeight} from '../utils/GlobalStyles';
import {AppComponents} from '@/components/Components';
import {
  useAddAnswer,
  useDeleteAnswer,
  useGetAnswers,
  useGetQuest,
  useModifyAnswer,
} from '@/hooks/useQuestionData';
import {useQueryClient} from '@tanstack/react-query';
import {useRecoilValue} from 'recoil';
import {UserNameState} from '@/state/UserData';
import {useFocusEffect} from '@react-navigation/native';
import LoadingComponent, {
  LoadingBox,
} from '@/components/Loading/LoadingComponent';
import {AppIcons} from '@/ui/icons';
import {AppContainer} from '@/components/container';
import {AppInputs} from '@/components/inputs';
import {AppMessage} from '@/components/message';

const AddAnsButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const TopContainer = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const QuestBox = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${AppColors.Primary};
  padding: 5px;
`;

const BottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MyAnsInput = styled.TextInput`
  font-family: 'GangwonLight';
  font-size: 18px;
`;

const MaxLength = styled.View`
  align-items: flex-end;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const BottomRight = styled.View`
  width: 100%;
  align-items: flex-end;
  margin: -5px;
`;

const MessageBox = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.View`
  margin-top: 15;
  margin-bottom: 10;
`;

export default function QaScreen() {
  const queryClient = useQueryClient();
  const userName = useRecoilValue(UserNameState);

  const [isMyAns, setIsMyAns] = useState(false); // 문답을 입력했는지 여부
  const [isAddAns, setIsAddAns] = useState(false); // 내 문답 추가중인지 여부
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

  const getId = data => {
    if (data.length === 0) return 0;
    else return data[data.length - 1].answerId + 1;
  };

  const {mutate: addAns, isLoading: addIsLoading} = useAddAnswer({
    onMutate: () => {
      // 문답 답변들 리패치
      setIsMyAns(true); // 문답 입력칸 없애기
      setIsAddAns(false);
      setAnsText('');

      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getAnswers']);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData(['getAnswers']);

      // 성공 가정하고 UI 미리 적용
      queryClient.setQueryData(['getAnswers'], oldData => {
        console.log('올데1', oldData);
        return [
          ...oldData,
          {
            answerId: getId(oldData),
            answerContent: ansText,
            userName: userName,
            answerTime: '',
          },
        ];
      });

      queryClient.setQueryData(['getAnswers'], oldData => {
        console.log('올데2', oldData);
      });
      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
    },
    onSettled: () => onSettled(),
  });
  const {mutate: modAns, isLoading: modIsLoading} = useModifyAnswer({
    onMutate: () => {
      setIsModAns(false);
      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getAnswers']);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData(['getAnswers']);

      // 성공 가정하고 UI 미리 적용
      queryClient.setQueryData(['getAnswers'], oldData => {
        return oldData.map(data =>
          data.userName === userName ? {...data, answerContent: ansText} : data,
        );
      });

      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
    },
    onSettled: () => onSettled(),
  });
  const {mutate: delAns, isLoading: delIsLoading} = useDeleteAnswer({
    onMutate: () => {
      setAnsText('');

      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getAnswers']);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData(['getAnswers']);

      // 성공 가정하고 UI 미리 적용
      queryClient.setQueryData(['getAnswers'], oldData => {
        return oldData?.filter(it => it.userName !== userName);
      });

      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
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
      <BasicHeader title="이 주의 문답">
        <LoadingBox>
          <AppFonts.Body2 color={AppColors.Gray600}>
            이 주의 문답이 준비중입니다..
          </AppFonts.Body2>
          <AppFonts.Body2 color={AppColors.Gray600}>
            조금만 기다려 주세요!
          </AppFonts.Body2>
        </LoadingBox>
      </BasicHeader>
    );
  }

  return (
    <BasicHeader
      title="이 주의 문답"
      isLoading={questIsLoading || ansIsLoading || modIsLoading || delIsLoading}
      isError={questIsError || ansIsError}
      reloadFunc={() => {
        questRefetch();
        ansRefetch();
      }}>
      <>
        <AppContainer.Basic>
          <TopContainer>
            <QuestBox>
              <AppFonts.SubTitle>
                {questData?.data?.data.questionContent}
              </AppFonts.SubTitle>
            </QuestBox>
          </TopContainer>
          {!isMyAns && (
            <AddAnsButton onPress={() => setIsAddAns(!isAddAns)}>
              <AppComponents.IconBox
                icon={isAddAns ? <AppIcons.Add /> : <AppIcons.AddGray />}
                padding={{paddingRight: 5}}
              />
              <AppFonts.Body1>나의 답변 추가</AppFonts.Body1>
            </AddAnsButton>
          )}
          {!isMyAns && isAddAns && (
            <AppInputs.PaperInput
              numberOfLines={3}
              maxLength={80}
              mainText={ansText}
              setMainText={setAnsText}
              placeholder="내 답변"
              padding={{padding: 15, paddingBottom: 10}}
              topComponent={<AppFonts.SubTitle>{userName}</AppFonts.SubTitle>}
              bottomComponent={
                <BottomContainer>
                  <AppComponents.Row>
                    <AppComponents.IconButton
                      icon={<AppFonts.Body2>취소</AppFonts.Body2>}
                      onPress={() => {
                        setIsModAns(false);
                      }}
                      padding={{padding: 5}}
                    />
                    <AppComponents.IconButton
                      icon={<AppFonts.Body2>저장</AppFonts.Body2>}
                      onPress={() => {
                        addAns(ansText);
                      }}
                      padding={{padding: 5}}
                    />
                  </AppComponents.Row>
                  <AppMessage.MaxLength maxLen={'80'} curLen={ansText.length} />
                </BottomContainer>
              }
            />
          )}

          {ansData && ansData?.length === 0 ? (
            <MessageBox>
              <AppFonts.Body2 color={AppColors.Gray600}>
                문답을 첫번째로 작성해보세요!
              </AppFonts.Body2>
            </MessageBox>
          ) : (
            <LoadingComponent isLoading={addIsLoading}>
              <ScrollView>
                {ansData?.map(ans => (
                  <AppContainer.Paper
                    key={ans.answerId}
                    padding={{padding: 15, paddingBottom: 10}}>
                    <AppFonts.SubTitle>{ans.userName}</AppFonts.SubTitle>
                    {/* 수정버튼 누른 경우 내 대답 수정할 수 있게 */}
                    {ans.userName == userName && isModAns ? (
                      <>
                        <MyAnsInput
                          multiline={true}
                          numberOfLines={2}
                          maxLength={80}
                          textAlignVertical="top"
                          value={ansText}
                          onChangeText={setAnsText}
                          autoFocus={true}
                        />
                        <MaxLength>
                          <AppFonts.Caption>
                            {ansText.length}/80
                          </AppFonts.Caption>
                        </MaxLength>
                      </>
                    ) : (
                      <ContentBox>
                        <AppFonts.Body1>{ans.answerContent}</AppFonts.Body1>
                      </ContentBox>
                    )}

                    {/* 나의 답변인 경우 하단의 수정, 삭제 버튼 */}
                    {/* default : 수정/삭제 버튼 , 수정중일 경우 : 저장 버튼 */}
                    {ans.userName == userName ? (
                      !isModAns ? (
                        <BottomRight>
                          <AppComponents.Row>
                            <AppComponents.IconButton
                              icon={
                                <AppFonts.Caption color={AppColors.Gray700}>
                                  수정
                                </AppFonts.Caption>
                              }
                              onPress={() => {
                                setIsModAns(!isModAns);
                                setAnsText(ans.answerContent);
                              }}
                              padding={{padding: 10}}
                            />
                            <AppIcons.DotGray />
                            <AppComponents.IconButton
                              icon={
                                <AppFonts.Caption color={AppColors.Gray700}>
                                  삭제
                                </AppFonts.Caption>
                              }
                              onPress={() => {
                                setIsModAns(false);
                                delAns(ans.answerId);
                                setAnsText('');
                              }}
                              padding={{padding: 10, paddingRight: 0}}
                            />
                          </AppComponents.Row>
                        </BottomRight>
                      ) : (
                        <BottomRight>
                          <AppComponents.IconButton
                            icon={<AppFonts.Body2>저장</AppFonts.Body2>}
                            onPress={() => {
                              modAns({
                                answerContent: ansText,
                                answerId: ans.answerId,
                              });
                            }}
                            padding={{padding: 5}}
                          />
                        </BottomRight>
                      )
                    ) : (
                      <></>
                    )}
                  </AppContainer.Paper>
                ))}
                <AppComponents.EmptyBox height={70} />
              </ScrollView>
            </LoadingComponent>
          )}
        </AppContainer.Basic>
      </>
    </BasicHeader>
  );
}
