import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {BasicHeader} from '../components/WithHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {
  UserBirthState,
  UserIdState,
  UserNameState,
  UserStatusState,
} from '../state/UserData';
import styled from 'styled-components';
import {windowHeight, windowWidth} from '@/utils/GlobalStyles';
import AutoHeightImage from 'react-native-auto-height-image';
import {useGetCoins} from '@/hooks/useHomeData';
import {FamilyCoinState} from '@/state/FamilyData';

const Background = styled.ImageBackground`
  flex: 1;
`;

const BackgroundSun = styled.Image`
  position: absolute;
  top: ${windowHeight * 0.15}%;
  left: 5%;
  width: 100px;
  height: 100px;
`;

const FamilyCoinView = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
`;

const Flower = styled.Image`
  position: absolute;
  bottom: ${windowHeight * 0.15}px;
  left: ${props =>
    props.flower
      ? windowWidth / 2 - (windowWidth * 0.6) / 2
      : windowWidth / 2 - (windowWidth * 0.2) / 2}px;
  width: ${props => (props.flower ? windowWidth * 0.6 : windowWidth * 0.2)}px;
  height: ${props => (props.flower ? windowWidth * 0.6 : windowWidth * 0.2)}px;
`;

const FlowerBoxTouchable = styled.TouchableOpacity`
  position: absolute;
  bottom: ${windowHeight * 0.25}px;
  left: 3%;
`;

const PostBoxTouchable = styled.TouchableOpacity`
  position: absolute;
  bottom: ${windowHeight * 0.25}px;
  right: 2%;
`;

export const HomeScreen = ({navigation}) => {
  const [userId, setUserId] = useRecoilState(UserIdState);
  const [userName, setUserName] = useRecoilState(UserNameState);
  const [userBirth, setUserBirth] = useRecoilState(UserBirthState);
  const [userStatus, setUserStatus] = useRecoilState(UserStatusState);

  const [familyCoinState, setFamilyCoinState] = useRecoilState(FamilyCoinState);

  const {data} = useGetCoins({
    onSuccess: data => {
      setFamilyCoinState(data.data);
    },
  });

  console.log(
    '리코일: ' + JSON.stringify(userId),
    JSON.stringify(userName),
    JSON.stringify(userBirth),
    JSON.stringify(userStatus),
    JSON.stringify(userId),
  );

  return (
    <BasicHeader title="온정" navigation={navigation}>
      <Background
        source={require('@/assets/image/background_cloud_sky_grace_ground.png')}
        resizeMode="stretch">
        <BackgroundSun source={require('@/assets/image/background_sun.png')} />
        <FamilyCoinView>
          <FontStyle.ContentB>코인 : {familyCoinState}</FontStyle.ContentB>
        </FamilyCoinView>
      </Background>
      <FlowerBoxTouchable onPress={() => navigation.navigate('Mail')}>
        <AutoHeightImage
          width={windowWidth * 0.2}
          source={require('@/assets/image/background_flowerbox.png')}
        />
      </FlowerBoxTouchable>
      <PostBoxTouchable onPress={() => navigation.navigate('Mail')}>
        <AutoHeightImage
          width={windowWidth * 0.13}
          source={require('@/assets/image/background_postbox.png')}
        />
      </PostBoxTouchable>
      <Flower source={require('@/assets/image/seed_1.png')} flower={false} />
      {/* <Flower source={require('@/assets/image/flower_10.png')} flower={true} /> */}
    </BasicHeader>
  );
};

export default HomeScreen;
