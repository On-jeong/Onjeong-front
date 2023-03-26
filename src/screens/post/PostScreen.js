import React, {useState} from 'react';
import styled from 'styled-components';
import {useQueryClient} from '@tanstack/react-query';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {AppComponents} from '@/components/Components';
import {AppIconButtons} from '../../components/IconButtons';
import {AppButtons} from '../../components/buttons';
import {
  useAddAnn,
  useDeleteAnn,
  useGetDateAnn,
} from '../../hooks/useAnniversaryData';
import {Filter} from '../mail/MailScreen';
import {useDeleteBoard, useGetTodayBoards} from '../../hooks/useBoardData';
import {Image, ScrollView} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {SpaceBetween} from '../QaScreen';
import {WithHeader} from '@/components/headers/WithHeader';

const PlanContainer = styled.View`
  padding: 7%;
`;

const PlanBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const SendBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconBox = styled.View`
  margin-right: 5px;
  flex-direction: row;
  align-items: center;
`;

const PlanTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PlanTextBox = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin-top: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${AppColors.border};
`;

const PlanText = styled.TextInput`
  height: 30px;
  min-width: 100px;
  padding: 0;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

const PaperContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Paper = styled.View`
  width: 100%;
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  padding: 20px;
  padding-top: 10px;
  margin-top: 5px;
`;

const PaperHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ImageContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const RightHeader = styled.View`
  flex-direction: row;
`;

export const getId = ({data, id}) => {
  if (data.length === 0) return 0;
  else return data[data.length - 1].id + 1;
};

const PostScreen = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const [isAddPlan, setIsAddPlan] = useState(false);
  const [isDelPlan, setIsDelPlan] = useState(false);
  const [newPlan, setNewPlan] = useState('');
  const [isAnniversary, setIsAnniversary] = useState(true);

  const {
    data: AnnData,
    isLoading: AnnIsLoading,
    status: AnnStatus,
    refetch: AnnRefetch,
  } = useGetDateAnn(route.params.barDate); // 기념일 데이터 받아오기

  const {
    data: BoardData,
    isLoading: BoardIsLoading,
    status: BoardStatus,
    refetch: BoardRefetch,
  } = useGetTodayBoards(route.params.barDate); // 포스트 데이터 받아오기

  console.log('ann: ', AnnData);

  const {mutate: addAnn} = useAddAnn({
    onMutate: () => {
      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getDateAnn', route.params.barDate]);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData([
        'getDateAnn',
        route.params.barDate,
      ]);

      queryClient.setQueryData(
        ['getDateAnn', route.params.barDate],
        oldData => {
          return [
            ...oldData,
            {
              anniversaryContent: newPlan,
              anniversaryDate: route.params.barDate,
              anniversaryId: getId({data: oldData, id: 'anniversaryId'}),
              anniversaryType: isAnniversary
                ? 'ANNIVERSARY'
                : 'SPECIAL_SCHEDULE',
            },
          ];
        },
      );
      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
    },
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => {
      console.log('????????');
      // 받아왔던 기념일 데이터 리패치
      queryClient.invalidateQueries('getDateAnn', route.params.barDate);
    },
  });

  // ({
  //   onMutate: () => {
  //     // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
  //     queryClient.cancelQueries(['getDateAnn', route.params.barDate]);

  //     queryClient.setQueryData(
  //       ['getDateAnn', route.params.barDate],
  //       oldData => {
  //         return [
  //           ...oldData,
  //           {
  //             anniversaryContent: newPlan,
  //             anniversaryDate: route.params.barDate,
  //             anniversaryId: getId({data: oldData, id: 'anniversaryId'}),
  //             anniversaryType: isAnniversary
  //               ? 'ANNIVERSARY'
  //               : 'SPECIAL_SCHEDULE',
  //           },
  //         ];
  //       },
  //     );
  //     // 실패시 되돌릴 데이터 리턴
  //     return {rollbackData};
  //   },
  //   onError: (err, value, context) => onError(err, value, context),
  //   onSettled: () => {
  //     console.log('????????')
  //     // 받아왔던 기념일 데이터 리패치
  //     queryClient.invalidateQueries('getDateAnn', route.params.barDate);
  //   },
  // });

  const {mutate: delAnn} = useDeleteAnn({
    onMutate: value => {
      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getDateAnn', route.params.barDate]);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData([
        'getDateAnn',
        route.params.barDate,
      ]);

      // 성공 가정하고 UI 미리 적용
      queryClient.setQueryData(
        ['getDateAnn', route.params.barDate],
        oldData => {
          return oldData.filter(it => it.anniversaryId !== value.annId);
        },
      );

      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
    },
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => {
      // 받아왔던 기념일 데이터 리패치
      queryClient.invalidateQueries('getDateAnn', route.params.barDate);
    },
  });

  const onError = (err, value, context) => {
    queryClient.setQueryData(
      ['getDateAnn', route.params.barDate],
      context.rollbackData,
    );

    console.log('일정 에러', err);
  };

  const {mutate: delBoard} = useDeleteBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', route.params.barDate);
    },
  });

  // 기념일 번호 매기기
  let number = 1;

  const addPlan = () => {
    if (newPlan === '') {
      alert('내용을 입력해 주세요.');
      return 0;
    }
    addAnn({
      annDate: route.params.barDate,
      annData: {
        anniversaryContent: newPlan,

        //SPECIAL_SCHEDULE / ANNIVERSARY
        anniversaryType: isAnniversary ? 'ANNIVERSARY' : 'SPECIAL_SCHEDULE',
      },
    });
  };

  return (
    <WithHeader title={route.params.date} isBack={true} navigation={navigation}>
      <>
        <AppComponents.HorizonLine />
        <ScrollView>
          <PlanContainer>
            <PlanTitle>
              <AppFonts.SubTitleB>오늘의 일정</AppFonts.SubTitleB>
              <Filter>
                <AppIconButtons.Pencil
                  padding={{paddingRight: 8}}
                  disabled={false}
                  active={isAddPlan}
                  onPress={() => {
                    setNewPlan('');
                    setIsAddPlan(!isAddPlan);
                    if (!isAddPlan && isDelPlan) setIsDelPlan(!isDelPlan);
                  }}
                />
                {AnnData?.length !== 0 && (
                  <AppIconButtons.Delete
                    active={isDelPlan}
                    disabled={false}
                    onPress={() => {
                      setIsDelPlan(!isDelPlan);
                      if (isAddPlan && !isDelPlan) setIsAddPlan(!isAddPlan);
                    }}
                  />
                )}
              </Filter>
            </PlanTitle>
            {AnnIsLoading && <AppFonts.Content>Loading...</AppFonts.Content>}
            {AnnData?.length === 0 && !isAddPlan && (
              <AppFonts.Content>오늘의 일정이 없습니다.</AppFonts.Content>
            )}
            {AnnData?.map(ann => (
              <PlanBox key={ann.anniversaryId}>
                {isDelPlan ? (
                  <AppIconButtons.Cancel
                    size={18}
                    disabled={false}
                    padding={{paddingRight: 5}}
                    onPress={() => {
                      delAnn({annId: ann.anniversaryId});
                    }}
                  />
                ) : (
                  <AppFonts.ContentB>{number++}. </AppFonts.ContentB>
                )}

                <AppFonts.Content bold={ann.anniversaryType === 'ANNIVERSARY'}>
                  {ann.anniversaryContent}
                </AppFonts.Content>
              </PlanBox>
            ))}

            {/* 기념일 추가 */}
            {isAddPlan && (
              <>
                <PlanTextBox>
                  <AppFonts.ContentB>{number++}. </AppFonts.ContentB>
                  <PlanText
                    value={newPlan}
                    onChangeText={setNewPlan}
                    maxLength={15}
                  />
                </PlanTextBox>
                <SpaceBetween>
                  <SendBox>
                    <IconBox>
                      <AppIconButtons.Check
                        style={{opacity: isAnniversary ? 1 : 0}} // 영역 그대로 안보이게
                      />

                      <AppButtons.TextButton.Content
                        title="기념일"
                        margin={5}
                        onPress={() => setIsAnniversary(true)}
                      />
                    </IconBox>
                    <IconBox>
                      <AppIconButtons.Check
                        style={{opacity: isAnniversary ? 0 : 1}}
                      />

                      <AppButtons.TextButton.Content
                        title="일정"
                        margin={5}
                        onPress={() => setIsAnniversary(false)}
                      />
                    </IconBox>
                  </SendBox>
                  <SendBox>
                    <AppButtons.TextButton.Content
                      title="추가"
                      margin={5}
                      onPress={() => {
                        addPlan();
                        setIsAddPlan(false);
                      }}
                    />
                    <AppButtons.TextButton.Content
                      title="취소"
                      margin={5}
                      onPress={() => setIsAddPlan(false)}
                    />
                  </SendBox>
                </SpaceBetween>
              </>
            )}
          </PlanContainer>
          <AppComponents.HorizonLine />
          <PlanContainer>
            <PlanTitle>
              <AppFonts.SubTitleB>오늘의 기록</AppFonts.SubTitleB>
              <AppIconButtons.Pencil
                disabled={false}
                onPress={() => {
                  navigation.navigate('PostWrite', {
                    date: route.params.date,
                    barDate: route.params.barDate,
                  });
                }}
              />
            </PlanTitle>
            {BoardIsLoading && <AppFonts.Content>Loading...</AppFonts.Content>}
            {BoardData?.data?.data.length === 0 && (
              <AppFonts.Content>오늘의 기록이 없습니다.</AppFonts.Content>
            )}

            {BoardData?.data?.data.map(board => (
              <PaperContainer key={board.boardId}>
                <Paper>
                  <PaperHeader>
                    <AppFonts.SubContent>
                      작성자 : {board.userStatus}
                    </AppFonts.SubContent>
                    <RightHeader>
                      <AppButtons.TextButton.SubContent
                        title={'수정'}
                        onPress={() => {
                          navigation.navigate('PostWrite', {
                            date: route.params.date,
                            barDate: route.params.barDate,
                            boardId: board.boardId,
                            boardImageUrl: board.boardImageUrl,
                            boardContent: board.boardContent,
                          });
                        }}
                      />
                      <AppFonts.SubContent> | </AppFonts.SubContent>
                      <AppButtons.TextButton.SubContent
                        title={'삭제'}
                        onPress={() => {
                          delBoard(board.boardId);
                        }}
                      />
                    </RightHeader>
                  </PaperHeader>
                  {board.boardImageUrl && (
                    <ImageContainer>
                      <AutoHeightImage
                        width={windowWidth - 44 - windowWidth * 0.14}
                        source={{uri: board.boardImageUrl}}
                      />
                    </ImageContainer>
                  )}
                  <AppFonts.Content>{board.boardContent}</AppFonts.Content>
                </Paper>
              </PaperContainer>
            ))}
          </PlanContainer>
        </ScrollView>
      </>
    </WithHeader>
  );
};
export default PostScreen;
