import React, {useCallback, useEffect} from 'react';
import {AppFonts} from '../utils/GlobalFonts';
import {BasicHeader} from '../components/headers/WithHeader';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  DailyCoinState,
  UserBirthState,
  UserIdState,
  UserNameState,
  UserStatusState,
} from '../state/UserData';
import styled from 'styled-components';
import {
  AppColors,
  bottomTabHeight,
  navigationHeight,
  windowHeight,
  windowWidth,
} from '@/utils/GlobalStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import {
  useAddRandCoins,
  useGetCoins,
  useGetFlowerInfo,
} from '@/hooks/useHomeData';
import {
  FamilyCoinState,
  FlowerBloomDateState,
  FlowerColorState,
  FlowerKindState,
  FlowerLevelState,
} from '@/state/FamilyData';
import {flower} from '@/utils/FlowerImagePath';
import {format} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';
import {NotReadMailsState, ReceiveMailsState} from '@/state/MailData';
import {AppIcons} from '@/ui/icons';

const Background = styled.ImageBackground`
  flex: 1;
  margin-left: ${windowWidth * 0.1}px;
  margin-right: ${windowWidth * 0.1}px;
  margin-top: ${windowHeight * 0.05}px;
  margin-bottom: ${bottomTabHeight + windowHeight * 0.1}px;
`;

const FamilyCoinView = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  top: -60;
  left: -3;
  margin: 10px;
`;

const CoinBox = styled.TouchableOpacity`
  height: 37px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.View`
  margin-right: 5px;
`;

const Flower = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

export const HomeScreen = ({navigation}) => {
  const curDate = new Date();
  const formatDate = format(curDate, 'yyyy-MM-dd');

  const [userId, setUserId] = useRecoilState(UserIdState);
  const [userName, setUserName] = useRecoilState(UserNameState);
  const [userBirth, setUserBirth] = useRecoilState(UserBirthState);
  const [userStatus, setUserStatus] = useRecoilState(UserStatusState);

  const [familyCoinState, setFamilyCoinState] = useRecoilState(FamilyCoinState);
  const [dailyCoinState, setDailyCoinState] = useRecoilState(DailyCoinState);
  const [flowerLevelState, setFlowerLevelState] =
    useRecoilState(FlowerLevelState);
  const [flowerColorState, setFlowerColorState] =
    useRecoilState(FlowerColorState);
  const [flowerKindState, setFlowerKindState] = useRecoilState(FlowerKindState);
  const [flowerBloomState, setFlowerBloomState] =
    useRecoilState(FlowerBloomDateState);

  const [receiveMailsState, setReceiveMailsState] =
    useRecoilState(ReceiveMailsState);
  const notReadMailsState = useRecoilValue(NotReadMailsState);

  const {
    data: coinData,
    isError: coinError,
    isLoading: coinIsLoading,
    refetch: coinRefetch,
  } = useGetCoins({
    onSuccess: data => {
      setFamilyCoinState(data?.data?.data);
    },
  });

  const {
    status: flowerStatus,
    isError: flowerError,
    refetch: flowerRefetch,
  } = useGetFlowerInfo({
    onSuccess: data => {
      setFlowerKindState('camellia');
      setFlowerLevelState(data?.data?.data.flowerLevel);
      setFlowerColorState(data?.data?.data.flowerColor);
      setFlowerBloomState(data?.data?.data.flowerBloomDate);
    },
  });

  const {mutate: addRandCoins} = useAddRandCoins({
    onSuccess: data => {
      setFamilyCoinState(familyCoinState + data?.data?.data);
      setDailyCoinState(formatDate);
      alert(`오늘의 랜덤 영양제 ${data?.data?.data}를 받았어요!`);
    },
  });

  // 받은메일 업데이트 -> 안읽은 메일 업데이트 위함
  // const {refetch: receiveMailsRefetch} = useGetReceiveMails({
  //   onSuccess: data => {
  //     setReceiveMailsState(data?.data?.data);
  //   },
  // });

  console.log(
    '리코일: ' + JSON.stringify(userId),
    JSON.stringify(userName),
    JSON.stringify(userBirth),
    JSON.stringify(userStatus),
    JSON.stringify(userId),
  );

  console.log('꽃레벨:', flowerLevelState);

  console.log('받은메일:', receiveMailsState);
  console.log('안읽은 메일 개수:', notReadMailsState);

  useEffect(() => {
    getDailyCoinInfo();
    // receiveMailsRefetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      coinRefetch();
      flowerRefetch();
    }, []),
  );

  const getDailyCoinInfo = async () => {
    console.log(dailyCoinState);
    console.log(formatDate);

    // 해당 기기에서 오늘 랜덤코인을 은 적이 없을 경우 호출
    if (dailyCoinState == null && dailyCoinState !== formatDate) {
      addRandCoins();
    }
  };

  return (
    <BasicHeader
      navigation={navigation}
      leftIcon1={
        <CoinBox onPress={() => navigation.navigate('History')}>
          <IconBox>
            <AppIcons.Water />
          </IconBox>
          <AppFonts.Heading>{flowerLevelState}</AppFonts.Heading>
        </CoinBox>
      }
      leftIcon2={
        <CoinBox onPress={() => navigation.navigate('Guide')}>
          <IconBox>
            <AppIcons.Flower />
          </IconBox>
          <AppFonts.Heading color={AppColors.Gray700}>lv.</AppFonts.Heading>
          <AppFonts.Heading>{familyCoinState}</AppFonts.Heading>
        </CoinBox>
      }
      isError={coinError || flowerError}
      reloadFunc={() => {
        flowerRefetch();
        coinRefetch();
      }}>
      <FamilyCoinView>
        {/* <CoinBox onPress={() => navigation.navigate('History')}>
          <IconBox>
            <AppIcons.Water />
          </IconBox>
          <AppFonts.Heading>{flowerLevelState}</AppFonts.Heading>
        </CoinBox>
        <CoinBox onPress={() => navigation.navigate('Guide')}>
          <IconBox>
            <AppIcons.Flower />
          </IconBox>
          <AppFonts.Heading color={AppColors.Gray700}>lv.</AppFonts.Heading>
          <AppFonts.Heading>{familyCoinState}</AppFonts.Heading>
        </CoinBox> */}
      </FamilyCoinView>
      <Background
        source={require('@/assets/image/background/background.png')}
        resizeMode="stretch">
        {flowerStatus == 'success' && (
          <Flower>
            {flowerKindState &&
              flowerLevelState &&
              flower[flowerKindState][flowerLevelState] && (
                <AutoHeightImage
                  width={windowWidth * 0.8}
                  source={flower[flowerKindState][flowerLevelState]}
                  // source={flower['violet'][10]}
                />
              )}
          </Flower>
        )}
      </Background>
    </BasicHeader>
  );
};

export default HomeScreen;
