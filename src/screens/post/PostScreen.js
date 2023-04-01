import React from 'react';
import {WithHeader} from '@/components/headers/WithHeader';
import TodayPlan from './component/TodayPlan';
import {format} from 'date-fns';
import {useGetDateAnn} from '@/hooks/useAnniversaryData';
import {useGetTodayBoards} from '@/hooks/useBoardData';
import styled from 'styled-components';
import TodayPost from './component/TodayPost';
import {AppComponents} from '@/components/Components';

const PostContainer = styled.ScrollView`
  width: 100%;
`;

const PostScreen = ({navigation, route}) => {
  const formatDate = format(route.params.date, 'yyyy-MM-dd');

  const {
    data: AnnData,
    isLoading: AnnIsLoading,
    isError: AnnIsError,
    status: AnnStatus,
    refetch: AnnRefetch,
  } = useGetDateAnn(formatDate); // 기념일 데이터 받아오기

  const {
    data: BoardData,
    isLoading: BoardIsLoading,
    isError: BoardIsError,
    status: BoardStatus,
    refetch: BoardRefetch,
  } = useGetTodayBoards(formatDate); // 포스트 데이터 받아오기

  return (
    <WithHeader
      title={format(route.params.date, 'yyyy년 M월 d일')}
      isBack={true}
      navigation={navigation}
      isLoading={AnnIsLoading || BoardIsLoading}
      isError={AnnIsError || BoardIsError}>
      <PostContainer>
        <TodayPlan AnnData={AnnData} date={formatDate} />
        <TodayPost
          BoardData={BoardData?.data?.data}
          date={route.params.date}
          navigation={navigation}
        />
        <AppComponents.EmptyBox height={50} />
      </PostContainer>
    </WithHeader>
  );
};
export default PostScreen;
