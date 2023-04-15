import React from 'react';
import FamilyProfile from './component/FamilyProfile';
import FamilyInfo from './component/FamilyInfo';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppContainer} from '@/components/container';
import {useGetFamilyInfo, useGetFamilyProfile} from '@/hooks/useProFileData';
import {ProfileImageUrIState, ProfileMessageState} from '@/state/ProfileData';
import {useRecoilState} from 'recoil';

const ProfileDetailScreen = ({navigation, route}) => {
  const [profileMessageState, setProfileMessageState] =
    useRecoilState(ProfileMessageState);
  const [profileImageUrIState, setProfileImageUrIState] =
    useRecoilState(ProfileImageUrIState);

  const {
    data: detailData,
    isLoading: detailIsLoading,
    isError: detailIsError,
    refetch: detailRefetch,
  } = useGetFamilyProfile({
    userId: route.params.userId,
    onSuccess: data => {
      setProfileMessageState(data?.data?.data.message);
      setProfileImageUrIState(data?.data?.data.profileImageUrl);
    },
  });

  const {
    data: infoData,
    isLoading: infoIsLoading,
    isError: infoIsError,
    refetch: infoRefetch,
  } = useGetFamilyInfo(route.params.userId);

  return (
    <WithHeader
      title={route.params.role}
      isBack={true}
      isLoading={infoIsLoading || detailIsLoading}
      isError={infoIsError || detailIsError}>
      <AppContainer.Basic>
        <AppContainer.Paper>
          {/* 유저 프로필 부분 */}
          <FamilyProfile route={route} detailData={detailData?.data?.data} />

          {/* 유저 정보 부분 - 좋아하는 것 등*/}
          <FamilyInfo route={route} infoData={infoData} />
        </AppContainer.Paper>
      </AppContainer.Basic>
    </WithHeader>
  );
};

export default ProfileDetailScreen;
