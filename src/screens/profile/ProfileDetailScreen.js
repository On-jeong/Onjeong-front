import React from 'react';
import {AppComponents} from '@/components/Components';

import FamilyProfile from './component/FamilyProfile';
import FamilyInfo from './component/FamilyInfo';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppContainer} from '@/components/container';
import {AppStyled} from '@/components/style';

const ProfileDetailScreen = ({navigation, route}) => {
  return (
    <WithHeader title={route.params.role} isBack={true} navigation={navigation}>
      <AppStyled.Container>
        <AppContainer.Paper height={'90%'}>
          {/* 유저 프로필 부분 */}
          <FamilyProfile route={route} />

          {/* 유저 정보 부분 - 좋아하는 것 등*/}
          <FamilyInfo route={route} />
        </AppContainer.Paper>
      </AppStyled.Container>
    </WithHeader>
  );
};

export default ProfileDetailScreen;
