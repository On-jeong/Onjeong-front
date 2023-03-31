import React, {useCallback} from 'react';
import {BasicHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {ScrollView, View} from 'react-native';
import {AppComponents} from '@/components/Components';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {AppFonts} from '../../utils/GlobalFonts';
import {useFocusEffect} from '@react-navigation/native';
import {AppContainer} from '@/components/container';

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
  const {data, isLoading, isError, refetch} = useGetFamilyList();

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
            {data?.data?.data.map(fm => (
              <Profile
                onPress={() =>
                  navigation.navigate('ProfileDetail', {
                    userId: fm.userId,
                    role: fm.userStatus,
                  })
                }>
                <AppContainer.Paper height={'100%'} key={fm.userId}>
                  <ProfileBody>
                    <View
                      style={{
                        width: parseInt(windowWidth / 2.3) - 60,
                        height: parseInt(windowWidth / 2.3) - 60,
                        backgroundColor: 'pink',
                      }}></View>
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
