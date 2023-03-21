import React from 'react';
import {AppComponents} from '@/components/Components';

import FamilyProfile from './component/FamilyProfile';
import FamilyInfo from './component/FamilyInfo';
import { WithHeader } from '@/components/headers/WithHeader';

const ProfileDetailScreen = ({navigation, route}) => {
  return (
    <WithHeader title={route.params.role} isBack={true} navigation={navigation}>
      <AppComponents.HorizonLine padding={{paddingBottom: 10}} />

      {/* 유저 프로필 부분 */}
      <FamilyProfile route={route} />

      {/* 유저 정보 부분 - 좋아하는 것 등*/}
      <FamilyInfo route={route} />
    </WithHeader>
  );
};

export default ProfileDetailScreen;
