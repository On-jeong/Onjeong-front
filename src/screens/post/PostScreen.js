import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {useQueryClient} from '@tanstack/react-query';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {Components} from '../../utils/Components';
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
import Octicons from 'react-native-vector-icons/Octicons';

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

const PostScreen = ({navigation, route}) => {
  const queryClient = useQueryClient();
  const [isAddPlan, setIsAddPlan] = useState(false);
  const [isDelPlan, setIsDelPlan] = useState(false);
  const [newPlan, setNewPlan] = useState('');
  const [isAnniversary, setIsAnniversary] = useState(true);

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

  console.log('post: ', BoardData);

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
    <NoHeader title={route.params.date} isBack={true} navigation={navigation}>
      <>
        <Components.HorizonLine />
        <ScrollView>
          <PlanContainer>
            <PlanTitle>
              <FontStyle.SubTitle>오늘의 일정</FontStyle.SubTitle>
              <Filter>
                <AppIconButtons.Pencil
                  padding={{paddingRight: 8}}
                  active={isAddPlan}
                  onPress={() => {
                    setNewPlan('');
                    setIsAddPlan(!isAddPlan);
                    if (!isAddPlan && isDelPlan) setIsDelPlan(!isDelPlan);
                  }}
                />
                {AnnData?.data?.data.length !== 0 && (
                  <AppIconButtons.Delete
                    active={isDelPlan}
                    onPress={() => {
                      setIsDelPlan(!isDelPlan);
                      if (isAddPlan && !isDelPlan) setIsAddPlan(!isAddPlan);
                    }}
                  />
                )}
              </Filter>
            </PlanTitle>
            {AnnIsLoading && <FontStyle.Content>Loading...</FontStyle.Content>}
            {AnnData?.data?.data.length === 0 && !isAddPlan && (
              <FontStyle.Content>오늘의 일정이 없습니다.</FontStyle.Content>
            )}
            {AnnData?.data?.data.map(ann => (
              <PlanBox key={ann.anniversaryId}>
                {isDelPlan ? (
                  <AppIconButtons.Cancel
                    size={18}
                    padding={{paddingRight: 5}}
                    onPress={() => {
                      delAnn(ann.anniversaryId);
                    }}
                  />
                ) : (
                  <FontStyle.ContentB>{number++}. </FontStyle.ContentB>
                )}

                <FontStyle.Content bold={ann.anniversaryType === 'ANNIVERSARY'}>
                  {ann.anniversaryContent}
                </FontStyle.Content>
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
                    maxLength={15}
                  />
                </PlanTextBox>
                <SpaceBetween>
                  <SendBox>
                    <IconBox>
                      <Octicons
                        name="check"
                        style={{opacity: isAnniversary ? 1 : 0}} // 영역 그대로 안보이게
                      />
                      <AppButtons.TextButton.Content
                        title="기념일"
                        margin={5}
                        onPress={() => setIsAnniversary(true)}
                      />
                    </IconBox>
                    <IconBox>
                      <Octicons
                        name="check"
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
                      onPress={() => addPlan()}
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
            {BoardData?.data?.data.length === 0 && (
              <FontStyle.Content>오늘의 기록이 없습니다.</FontStyle.Content>
            )}

            {BoardData?.data?.data.map(board => (
              <PaperContainer key={board.boardId}>
                <Paper>
                  <PaperHeader>
                    <FontStyle.SubContent>
                      작성자 : {board.userStatus}
                    </FontStyle.SubContent>
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
                      <FontStyle.SubContent> | </FontStyle.SubContent>
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
