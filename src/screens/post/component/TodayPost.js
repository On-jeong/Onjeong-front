import React from 'react';
import styled from 'styled-components';
import {useQueryClient} from '@tanstack/react-query';
import {AppColors, windowWidth} from '@/utils/GlobalStyles';
import {useDeleteBoard} from '@/hooks/useBoardData';
import {AppContainer} from '@/components/container';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {AppIcons} from '@/ui/icons';
import {Filter} from '@/screens/mail/MailScreen';
import {PlanTitle} from './TodayPlan';
import {format} from 'date-fns';
import AutoHeightImage from 'react-native-auto-height-image';
import {useNavigation} from '@react-navigation/native';
import { Vibration } from 'react-native';

const PaperContainer = styled.View`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const PaperBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ImageContainer = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const RightHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TodayPost = ({BoardData, date}) => {
  const navigation = useNavigation();

  const formatDate = format(date, 'yyyy-MM-dd');

  const queryClient = useQueryClient();

  const {mutate: delBoard} = useDeleteBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', formatDate);
    },
  });

  return (
    <>
      <AppContainer.Basic margin={{marginTop: 20}}>
        <PlanTitle>
          <AppFonts.SubTitle>오늘의 기록</AppFonts.SubTitle>
          <Filter>
            {/* 추가 버튼 */}
            <AppComponents.IconButton
              icon={<AppIcons.Add />}
              padding={{padding: 8, paddingLeft: 12}}
              onPress={() => {
                navigation.navigate('PostWrite', {
                  date: date,
                });
              }}
            />
          </Filter>
        </PlanTitle>

        {BoardData.length === 0 && (
          <AppContainer.Paper padding={{padding: 20}} height={'auto'}>
            <AppFonts.Body2 color={AppColors.Gray600}>
              오늘의 기록이 없습니다.
            </AppFonts.Body2>
          </AppContainer.Paper>
        )}
        {BoardData.map(board => (
          <AppContainer.Paper
            padding={{padding: 20, paddingLeft: 20, paddingBottom: 0}}
            height={'auto'}
            key={board.boardId}>
            <PaperContainer>
              {board.boardImageUrl && (
                <ImageContainer>
                  <AutoHeightImage
                    width={windowWidth - 44 - windowWidth * 0.14}
                    source={{uri: board.boardImageUrl}}
                  />
                </ImageContainer>
              )}
              <Content>
                <AppFonts.Body1>{board.boardContent}</AppFonts.Body1>
              </Content>
              <PaperBottom>
                <AppFonts.Caption color={AppColors.Gray800}>
                  {board.userStatus}
                </AppFonts.Caption>
                <RightHeader>
                  <AppComponents.IconButton
                    icon={
                      <AppFonts.Caption color={AppColors.Gray700}>
                        수정
                      </AppFonts.Caption>
                    }
                    onPress={() => {
                      navigation.navigate('PostWrite', {
                        date: date,
                        boardId: board.boardId,
                        boardImageUrl: board.boardImageUrl,
                        boardContent: board.boardContent,
                      });
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
                      delBoard(board.boardId);
                      Vibration.vibrate(5);
                    }}
                    padding={{padding: 10, paddingRight: 0}}
                  />
                </RightHeader>
              </PaperBottom>
            </PaperContainer>
          </AppContainer.Paper>
        ))}
      </AppContainer.Basic>
    </>
  );
};

export default TodayPost;
