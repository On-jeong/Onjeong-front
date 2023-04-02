import React, {useCallback} from 'react';
import {BasicHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {AppColors, windowWidth} from '@/utils/GlobalStyles';
import {ScrollView} from 'react-native';
import {AppComponents} from '@/components/Components';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {AppFonts} from '../../utils/GlobalFonts';
import {useFocusEffect} from '@react-navigation/native';
import {AppContainer} from '@/components/container';
import {FamilyProfileState} from '@/state/FamilyData';
import {useRecoilState} from 'recoil';

const ProfileBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  justify-content: center;
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
      navigation={navigation}
      isLoading={isLoading}
      isError={isError}
      reloadFunc={refetch}>
      <ScrollView>
        <ProfileBox>
          <>
            {familyProfileState.map(fm => (
              <Profile
                key={fm.userId}
                onPress={() =>
                navigation.navigate('ProfileDetail', {
                    userId: fm.userId,
                    role: fm.userStatus,
                  })
                }>
                <AppContainer.Paper>
                  <ProfileBody>
                    <Image
                      source={fm.profileImageUrl && {uri: fm.profileImageUrl}}
                    />
                    <Name>
                      <AppFonts.Body2>{fm.userStatus}</AppFonts.Body2>
                    </Name>
                  </ProfileBody>
                </AppContainer.Paper>
              </Profile>
            ))}
          </>
        </ProfileBox>
        <AppComponents.EmptyBox height={80} />
      </ScrollView>
    </BasicHeader>
  );
};

export default ProfileScreen;
