import React, {useCallback, useEffect} from 'react';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppComponents} from '@/components/Components';
import {useGetCoinHistory} from '@/hooks/useHomeData';
import {BackHandler, FlatList} from 'react-native';
import EmptyComponent from '@/components/Loading/EmptyComponent';
import {useFocusEffect} from '@react-navigation/native';
import {WithHeader} from '@/components/headers/WithHeader';
import {MessageBox, MessageContent, Time} from '../AlertScreen';
import {AppIcons} from '@/ui/icons';
import {AppColors} from '@/utils/GlobalStyles';
import {AppContainer} from '@/components/container';

const script = {
  RAND: '출석',
  MAIL: '편지 보내기',
  PROFILEIMAGE: '프로필 사진 등록',
  PROFILEMESSAGE: '상태메시지 작성',
  PROFILEFAV: '좋아하는 것 작성',
  PROFILEHATE: '싫어하는 것 작성',
  PROFILEEXPRESSION: '한단어로 표현하기 작성',
  PROFILEINTEREST: '관심사 작성',
  BOARD: '오늘의 기록 작성',
  ANSWER: '이주의 문답 작성',
};

const CoinHistoryScreen = ({navigation}) => {
  const {data, isLoading, isError, refetch} = useGetCoinHistory();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  // 백 핸들러
  useEffect(() => {
    handlePressBack();
    return () => handlePressBack();
  }, []);

  const handlePressBack = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.pop();
      return true;
    });
  };

  console.log(data);

  return (
    <WithHeader
      isBack={true}
      title={'꽃 성장 기록'}
      isLoading={isLoading}
      isError={isError}
      reloadFunc={refetch}>
      <EmptyComponent
        isEmpty={data?.length === 0}
        title1={'꽃 성장 기록이 없습니다.'}
        title2={'꽃을 성장시켜 기록을 채워나가요!'}>
        <AppContainer.Basic margin={{marginTop: 10}}>
          {/* 기본 메세지 */}
          <FlatList
            data={data}
            renderItem={RenderMessage}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 20}}
          />
        </AppContainer.Basic>
      </EmptyComponent>
    </WithHeader>
  );
};

const RenderMessage = ({item, index}) => {
  return (
    <>
      {index != 0 && <AppComponents.HorizonLine />}
      <MessageBox>
        <MessageContent>
          {item.type == 'USED' ? (
            <>
              <AppComponents.IconBox
                icon={<AppIcons.FlowerGray />}
                padding={{paddingRight: 8}}
              />
              <AppFonts.Body2>
                꽃이 {item.after}레벨로 성장했어요!
              </AppFonts.Body2>
            </>
          ) : (
            <>
              <AppComponents.IconBox
                icon={<AppIcons.WaterGray />}
                padding={{paddingRight: 8}}
              />
              <AppFonts.Body1>
                {item.user}의 {script[item.type]}
                {' '}
                <AppFonts.SubTitle>
                  {item.amount > 0 && '+'}
                  {item.amount}
                </AppFonts.SubTitle>
              </AppFonts.Body1>
            </>
          )}
        </MessageContent>
        <Time>
          <AppFonts.Caption color={AppColors.Gray600}>
            {item.date.substr(0,16)}
          </AppFonts.Caption>
        </Time>
      </MessageBox>
    </>
  );
};

export default CoinHistoryScreen;
