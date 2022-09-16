import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {useQueryClient} from '@tanstack/react-query';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {Components} from '../../utils/Components';
import {AppIconButtons} from '../../components/IconButtons';
import {AppButtons} from '../../components/buttons';
import {SendBox} from '../mail/MailWriteScreen';
import {
  useAddAnn,
  useDeleteAnn,
  useGetDateAnn,
} from '../../hooks/useAnniversaryData';
import {Filter} from '../mail/MailScreen';
import {useDeleteBoard, useGetTodayBoards} from '../../hooks/useBoardData';
import {ScrollView} from 'react-native';

const PlanContainer = styled.View`
  padding: 7%;
`;

const PlanBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
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

const RightHeader = styled.View`
  flex-direction: row;
`;

const PaperBottom = styled.View`
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

const PostScreen = ({navigation, route}) => {
  const queryClient = useQueryClient();
  const [isAddPlan, setIsAddPlan] = useState(false);
  const [isDelPlan, setIsDelPlan] = useState(false);
  const [newPlan, setNewPlan] = useState('');

  const {mutate: addAnn} = useAddAnn({
    onSuccess: () => {
      setIsAddPlan(false);
      // 받아왔던 기념일 데이터 리패치
      queryClient.invalidateQueries('getDateAnn', route.params.barDate);
    },
  });

  const {mutate: delAnn} = useDeleteAnn({
    onSuccess: () => {
      // 받아왔던 기념일 데이터 리패치
      queryClient.invalidateQueries('getDateAnn', route.params.barDate);
    },
  });

  const {mutate: delBoard} = useDeleteBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', route.params.barDate);
    },
  });

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

  console.log('post: ',BoardData);

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
        anniversaryType: 'ANNIVERSARY',
      },
    });
  };

  return (
    <NoHeader title={route.params.date} isBack={true} navigation={navigation}>
      <>
        <Components.HorizonLine />
        <ScrollView>
          <PlanContainer>
            <PlanTitle>
              <FontStyle.SubTitle>오늘의 행사</FontStyle.SubTitle>
              <Filter>
                <AppIconButtons.Pencil
                  margin={{marginRight: 8}}
                  onPress={() => {
                    setNewPlan('');
                    setIsAddPlan(!isAddPlan);
                    if (!isAddPlan && isDelPlan) setIsDelPlan(!isDelPlan);
                  }}
                />
                <AppIconButtons.Delete
                  onPress={() => {
                    setIsDelPlan(!isDelPlan);
                    if (isAddPlan && !isDelPlan) setIsAddPlan(!isAddPlan);
                  }}
                />
              </Filter>
            </PlanTitle>
            {AnnIsLoading && <FontStyle.Content>Loading...</FontStyle.Content>}
            {AnnData?.data.length === 0 && !isAddPlan && (
              <FontStyle.Content>오늘의 행사가 없습니다.</FontStyle.Content>
            )}
            {AnnData?.data.map(ann => (
              <PlanBox key={ann.anniversaryId}>
                {isDelPlan ? (
                  <AppIconButtons.Cancel
                    size={18}
                    margin={{marginRight: 5}}
                    onPress={() => {
                      delAnn(ann.anniversaryId);
                    }}
                  />
                ) : (
                  <FontStyle.ContentB>{number++}. </FontStyle.ContentB>
                )}
                <FontStyle.ContentB>
                  {ann.anniversaryContent}
                </FontStyle.ContentB>
              </PlanBox>
            ))}

            {/* 기념일 추가 */}
            {isAddPlan && (
              <>
                <PlanTextBox>
                  <FontStyle.ContentB>{number++}. </FontStyle.ContentB>
                  <PlanText
                    value={newPlan}
                    onChangeText={setNewPlan}
                    maxLength={20}
                  />
                </PlanTextBox>
                <SendBox>
                  <AppButtons.TextButton.Content
                    title="추가"
                    margin={5}
                    onPress={() => addPlan()}
                  />
                  <AppButtons.TextButton.Content
                    title="취소"
                    margin={5}
                    onPress={() => setIsAddPlan(false)}
                  />
                </SendBox>
              </>
            )}
          </PlanContainer>
          <Components.HorizonLine />
          <PlanContainer>
            <PlanTitle>
              <FontStyle.SubTitle>오늘의 기록</FontStyle.SubTitle>
              <AppIconButtons.Pencil
                onPress={() => {
                  navigation.navigate('PostWrite', {
                    date: route.params.date,
                    barDate: route.params.barDate,
                  });
                }}
              />
            </PlanTitle>
            {BoardIsLoading && (
              <FontStyle.Content>Loading...</FontStyle.Content>
            )}
            {BoardData?.data.length === 0 && (
              <FontStyle.Content>오늘의 기록이 없습니다.</FontStyle.Content>
            )}

            {BoardData?.data.map(board => (
              <PaperContainer>
                <Paper key={board.boardId}>
                  <PaperHeader>
                    <FontStyle.SubContent>
                      작성자 : {board.userStatus}
                    </FontStyle.SubContent>
                    <RightHeader>
                      <AppButtons.TextButton.SubContent title={'수정'} />
                      <FontStyle.SubContent> | </FontStyle.SubContent>
                      <AppButtons.TextButton.SubContent
                        title={'삭제'}
                        onPress={() => {
                          delBoard(board.boardId);
                        }}
                      />
                    </RightHeader>
                  </PaperHeader>
                  <FontStyle.Content>{board.boardContent}</FontStyle.Content>
                </Paper>
              </PaperContainer>
            ))}
          </PlanContainer>
        </ScrollView>
      </>
    </NoHeader>
  );
};
export default PostScreen;
