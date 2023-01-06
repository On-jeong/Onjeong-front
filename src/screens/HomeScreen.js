import React, {useCallback, useEffect} from 'react';
import {FontStyle} from '../utils/GlobalFonts';
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
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
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
import {flower, seed} from '@/utils/FlowerImagePath';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {format} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import AlertModal from '@/components/modal/AlertModal';
import {AppModal} from '@/components/modal';
import {NotReadMailsState, ReceiveMailsState} from '@/state/MailData';
import {useGetReceiveMails} from '@/hooks/useMailData';

const Background = styled.ImageBackground`
  flex: 1;
`;

const BackgroundSun = styled.Image`
  position: absolute;
  top: ${windowHeight * 0.02}px;
  left: ${windowWidth * 0.02}px;
  width: 90px;
  height: 0px;
`;

const FamilyCoinView = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

const Flower = styled.Image`
  position: absolute;
  bottom: ${windowHeight * 0.2}px;
  left: ${props =>
    props.flower
      ? windowWidth / 2 - (windowWidth * 0.6) / 2 - 10
      : windowWidth / 2 - (windowWidth * 0.2) / 2}px;
  width: ${props => (props.flower ? windowWidth * 0.6 : windowWidth * 0.2)}px;
  height: ${props => (props.flower ? windowWidth * 0.6 : windowWidth * 0.2)}px;
`;

const FlowerBoxTouchable = styled.TouchableOpacity`
  position: absolute;
  bottom: ${windowHeight * 0.17}px;
  left: 3.5%;
`;

const PostBoxTouchable = styled.TouchableOpacity`
  position: absolute;
  bottom: ${windowHeight * 0.22}px;
  right: 2.5%;
`;

const Circle = styled.View`
  position: absolute;
  top: -8;
  right: -2;
  width: 22px;
  height: 22px;
  border-radius: 50px;
  background-color: ${AppColors.black};
  justify-content: center;
  align-items: center;
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
  const {refetch: receiveMailsRefetch} = useGetReceiveMails({
    onSuccess: data => {
      setReceiveMailsState(data?.data?.data);
    },
  });

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
    receiveMailsRefetch();
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
      title="온정"
      navigation={navigation}
      isError={coinError || flowerError}
      reloadFunc={() => {
        flowerRefetch();
        coinRefetch();
      }}>
      <Background
        source={require('@/assets/image/background/background_cloud_sky_grace_ground.png')}
        resizeMode="stretch">
        {/* <BackgroundSun
          source={require('@/assets/image/background/background_sun.png')}
        /> */}
      </Background>
      <FamilyCoinView>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <FontStyle.ContentB>꽃 레벨 : {flowerLevelState}</FontStyle.ContentB>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
          <FontStyle.ContentB>영양제 : {familyCoinState}</FontStyle.ContentB>
        </TouchableOpacity>
      </FamilyCoinView>
      <FlowerBoxTouchable
        //onPress={() => navigation.navigate('')}
        disabled={true}
        activeOpacity={0.5}>
        <AutoHeightImage
          width={windowWidth * 0.2}
          source={require('@/assets/image/background/background_flowerbox.png')}
        />
      </FlowerBoxTouchable>
      <PostBoxTouchable
        onPress={() => navigation.navigate('Mail')}
        activeOpacity={0.5}>
        <AutoHeightImage
          width={windowWidth * 0.13}
          source={require('@/assets/image/background/background_postbox.png')}
        />
        <Circle>
          <FontStyle.SubContentB style={{color: AppColors.blur}}>
            {notReadMailsState}
          </FontStyle.SubContentB>
        </Circle>
      </PostBoxTouchable>
      {/* 레벨3 까지는 공통 씨앗 형태 */}
      {/* <Flower
        source={7 > 3 ? flower[flowerKindState][7] : seed[flowerLevelState]}
        flower={7 > 3}
      /> */}
      {flowerStatus == 'success' && (
        <Flower
          source={
            flowerLevelState > 3
              ? flower[flowerKindState][flowerLevelState]
              : seed[flowerLevelState]
          }
          flower={flowerLevelState > 3}
        />
      )}
    </BasicHeader>
  );
};

export default HomeScreen;
