import React, {useCallback} from 'react';
import {BasicHeader} from '@/components/headers/WithHeader';
import styled from 'styled-components';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {ScrollView} from 'react-native';
import {Components} from '@/utils/Components';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {FontStyle} from '../../utils/GlobalFonts';
import {useFocusEffect} from '@react-navigation/native';

const ProfileBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

const Profile = styled.TouchableOpacity`
  width: ${parseInt(windowWidth / 2.5)}px;
  height: ${parseInt(windowHeight / 3)}px;
  margin: 10px;
  background-color: ${AppColors.white};
  border-width: 2px;
  border-color: ${AppColors.border};
  border-radius: 12px;
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
      title="가족 프로필"
      navigation={navigation}
      isLoading={isLoading}
      isError={isError}>
      <ScrollView>
        <ProfileBox>
          <>
            {data?.data?.data.map(fm => (
              <Profile
                key={fm.userId}
                onPress={() =>
                  navigation.navigate('ProfileDetail', {
                    userId: fm.userId,
                    role: fm.userStatus,
                  })
                }>
                <FontStyle.SubTitle>{fm.userStatus}</FontStyle.SubTitle>
              </Profile>
            ))}
          </>
        </ProfileBox>
        <Components.EmptyBox />
      </ScrollView>
    </BasicHeader>
  );
};

export default ProfileScreen;
