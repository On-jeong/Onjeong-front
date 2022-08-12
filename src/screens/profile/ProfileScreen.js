import React, {useState} from 'react';
import {BasicHeader} from '@/components/WithHeader';
import styled from 'styled-components';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {ScrollView} from 'react-native';
import {Components} from '@/utils/Components';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {FontStyle} from '../../utils/GlobalFonts';

const ProfileBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

const Profile = styled.TouchableOpacity`
  width: ${parseInt(windowWidth / 2.5)};
  height: ${parseInt(windowHeight / 3)};
  margin: 10px;
  background-color: ${AppColors.white};
  border-width: 2px;
  border-color: ${AppColors.border};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export default function ProfileScreen({navigation}) {
  const {data, isLoading, status} = useGetFamilyList();

  return (
    <BasicHeader title="가족 프로필" navigation={navigation}>
      <ScrollView>
        <ProfileBox>
          {isLoading && <FontStyle.Content>Loading...</FontStyle.Content>}
          {status == 'success' && (
            <>
              {data.data.map(fm => (
                <Profile
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
          )}
        </ProfileBox>
        <Components.EmptyBox />
      </ScrollView>
    </BasicHeader>
  );
}
