import React from 'react';
import WithHeader from '../components/WithHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import styled from 'styled-components';
import {AppColors, windowHeight, windowWidth} from '../utils/GlobalStyles';
import {ScrollView} from 'react-native';

const ProfileBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

const Profile = styled.View`
  width: ${windowWidth / 2.5};
  height: ${windowHeight / 3};
  margin: 10px;
  background-color: ${AppColors.white};
  border-width: 2px;
  border-color: ${AppColors.border};
  border-radius: 12px;
`;

export const EmptyBox = styled.View`
  height: 100px;
`;

export default function ProfileScreen() {
  return (
    <WithHeader
      title="가족 프로필"
      rightIcon1={<Octicons name="bell" size={20} />}
      rightIcon2={<Octicons name="person" size={21} />}>
      <ScrollView>
        <ProfileBox>
          <Profile></Profile>
          <Profile></Profile>
          <Profile></Profile>
          <Profile></Profile>
          <Profile></Profile>
        </ProfileBox>
        <EmptyBox />
      </ScrollView>
    </WithHeader>
  );
}
