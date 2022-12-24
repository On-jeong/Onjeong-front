import React from 'react';
import NoHeader from '@/components/NoHeader';
import {Components} from '../../utils/Components';

import FamilyProfile from './component/FamilyProfile';
import FamilyInfo from './component/FamilyInfo';

const ProfileDetailScreen = ({navigation, route}) => {
  return (
    <NoHeader title={route.params.role} isBack={true} navigation={navigation}>
      <Components.HorizonLine padding={{paddingBottom: 10}} />

      {/* 유저 프로필 부분 */}
      <FamilyProfile route={route} />

      {/* 유저 정보 부분 - 좋아하는 것 등*/}
      <FamilyInfo route={route} />
    </NoHeader>
  );
};

export default ProfileDetailScreen;
