import React, {useEffect} from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {BasicHeader} from '../components/WithHeader';
import {useRecoilState} from 'recoil';
import {
  DailyCoinState,
  UserBirthState,
  UserIdState,
  UserNameState,
  UserStatusState,
} from '../state/UserData';
import styled from 'styled-components';
import {windowHeight, windowWidth} from '@/utils/GlobalStyles';
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
  bottom: ${windowHeight * 0.25}px;
  left: ${props =>
    props.flower
      ? windowWidth / 2 - (windowWidth * 0.6) / 2
      : windowWidth / 2 - (windowWidth * 0.2) / 2}px;
  width: ${props => (props.flower ? windowWidth * 0.6 : windowWidth * 0.2)}px;
  height: ${props => (props.flower ? windowWidth * 0.6 : windowWidth * 0.2)}px;
`;

const FlowerBoxTouchable = styled.TouchableOpacity`
  position: absolute;
  bottom: ${windowHeight * 0.17}px;
  left: 3%;
`;

const PostBoxTouchable = styled.TouchableOpacity`
  position: absolute;
  bottom: ${windowHeight * 0.22}px;
  right: 2%;
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

  const {data: coinData} = useGetCoins({
    onSuccess: data => {
      setFamilyCoinState(data?.data?.data);
    },
  });

  const {data: flowerInfoData, status: flowerStatus} = useGetFlowerInfo({
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
      alert(`데일리코인이 ${data?.data?.data}만큼 적립됐어요!`);
    },
  });

  console.log(
    '리코일: ' + JSON.stringify(userId),
    JSON.stringify(userName),
    JSON.stringify(userBirth),
    JSON.stringify(userStatus),
    JSON.stringify(userId),
  );

  useEffect(() => {
    getDailyCoinInfo();
  }, []);

  const getDailyCoinInfo = async () => {
    console.log(dailyCoinState);
    console.log(formatDate);

    if (dailyCoinState == null && dailyCoinState !== formatDate) {
      addRandCoins();
    }
  };

  return (
    <BasicHeader title="온정" navigation={navigation}>
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
      </PostBoxTouchable>
      {/* 레벨3 까지는 공통 씨앗 형태 */}
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
