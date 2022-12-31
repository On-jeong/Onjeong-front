import React, {useCallback} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/headers/NoHeader';
import {FontStyle} from '@/utils/GlobalFonts';
import {Components} from '@/utils/Components';
import {useGetCoinHistory} from '@/hooks/useHomeData';
import {ScrollView} from 'react-native';
import EmptyComponent from '@/components/Loading/EmptyComponent';
import {useFocusEffect} from '@react-navigation/native';

const MessageBox = styled.View`
  width: 100%;
  height: 45px;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const script = {
  BOARD: '게시글 올리기로',
  PROFILE: '프로필 수정으로',
  MAIL: '메일 보내기로',
  RAND: '데일리 랜덤코인으로',
};

const CoinHistoryScreen = ({navigation}) => {
  const {data, isLoading, isError, refetch} = useGetCoinHistory();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <NoHeader
      isBack={true}
      title={'꽃 성장 기록'}
      navigation={navigation}
      isLoading={isLoading}
      isError={isError}
      reloadFunc={refetch}>
      <EmptyComponent
        isEmpty={data?.data?.data.length === 0}
        title1={'꽃 성장 기록이 없습니다!'}
        title2={'꽃을 성장시켜 기록을 채워나가요!'}>
        <ScrollView>
          {data?.data?.data?.map((data, index) => (
            <React.Fragment key={index}>
              <MessageBox>
                {data.type == 'USED' ? (
                  <FontStyle.SubContentB>
                    {data.amount * -1}의 영양제를 사용해서 꽃이 성장했어요!
                  </FontStyle.SubContentB>
                ) : (
                  <FontStyle.SubContent>
                    {script[data.type]} {data.amount}의 영양제를 얻었어요.
                  </FontStyle.SubContent>
                )}
              </MessageBox>
              <Components.HorizonLine />
            </React.Fragment>
          ))}
          <Components.EmptyBox />
        </ScrollView>
      </EmptyComponent>
    </NoHeader>
  );
};

export default CoinHistoryScreen;
