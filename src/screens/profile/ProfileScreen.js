import React, {useCallback} from 'react';
import {BasicHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {AppColors, windowWidth} from '@/utils/GlobalStyles';
import {FlatList} from 'react-native';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {AppFonts} from '../../utils/GlobalFonts';
import {useFocusEffect} from '@react-navigation/native';
import {AppContainer} from '@/components/container';
import {FamilyProfileState} from '@/state/FamilyData';
import {useRecoilState} from 'recoil';

const ProfileBox = styled.View`
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.TouchableOpacity`
  width: ${parseInt(windowWidth / 2.3)}px;
  height: ${parseInt(windowWidth / 2.3) + 30}px;
  margin: 5px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${parseInt(windowWidth / 2.3) - 60}px;
  height: ${parseInt(windowWidth / 2.3) - 60}px;
  background-color: ${AppColors.Gray400};
`;

const ProfileBody = styled.View`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Name = styled.View`
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const ProfileScreen = ({navigation}) => {
  const [familyProfileState, setFamilyProfileState] =
    useRecoilState(FamilyProfileState);

  const {data, isLoading, isError, refetch} = useGetFamilyList({
    onSuccess: data => {
      setFamilyProfileState(data.data.data);
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <BasicHeader
      title="우리 가족"
      isLoading={isLoading}
      isError={isError}
      reloadFunc={refetch}>
      <ProfileBox>
        <FlatList
          data={familyProfileState}
          renderItem={item => ProfileList(item, navigation)}
          keyExtractor={(item, index) => item.userId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          numColumns={2}
        />
      </ProfileBox>
    </BasicHeader>
  );
};

const ProfileList = ({item}, navigation) => {
  return (
    <Profile
      key={item.userId}
      onPress={() =>
        navigation?.navigate('ProfileDetail', {
          userId: item.userId,
          role: item.userStatus,
        })
      }>
      <AppContainer.Paper>
        <ProfileBody>
          <Image source={item.profileImageUrl && {uri: item.profileImageUrl}} />
          <Name>
            <AppFonts.Body2>{item.userStatus}</AppFonts.Body2>
          </Name>
        </ProfileBody>
      </AppContainer.Paper>
    </Profile>
  );
};

export default ProfileScreen;
