import React from 'react';
import {BasicHeader} from '@/components/WithHeader';
import styled from 'styled-components';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {ScrollView} from 'react-native';
import { Components } from '@/utils/Components';

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
`;


export default function ProfileScreen({navigation}) {
  return (
    <BasicHeader title="가족 프로필" navigation={navigation}>
      <ScrollView>
        <ProfileBox>
          <Profile
            onPress={() =>
              navigation.navigate('ProfileDetail', {role: '딸1'})
            }></Profile>
          <Profile></Profile>
          <Profile></Profile>
          <Profile></Profile>
          <Profile></Profile>
        </ProfileBox>
        <Components.EmptyBox />
      </ScrollView>
    </BasicHeader>
  );
}
