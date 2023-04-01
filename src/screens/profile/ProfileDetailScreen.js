import React from 'react';
import FamilyProfile from './component/FamilyProfile';
import FamilyInfo from './component/FamilyInfo';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppContainer} from '@/components/container';

const ProfileDetailScreen = ({navigation, route}) => {
  return (
    <WithHeader title={route.params.role} isBack={true} navigation={navigation}>
      <AppContainer.Basic>
        <AppContainer.Paper >
          {/* 유저 프로필 부분 */}
          <FamilyProfile route={route} />

          {/* 유저 정보 부분 - 좋아하는 것 등*/}
          <FamilyInfo route={route} />
        </AppContainer.Paper>
      </AppContainer.Basic>
    </WithHeader>
  );
};

export default ProfileDetailScreen;
