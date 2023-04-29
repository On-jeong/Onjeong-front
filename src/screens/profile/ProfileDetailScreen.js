import React, {useEffect} from 'react';
import FamilyProfile from './component/FamilyProfile';
import FamilyInfo from './component/FamilyInfo';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppContainer} from '@/components/container';
import {useGetFamilyInfo, useGetFamilyProfile} from '@/hooks/useProFileData';
import {ProfileImageUrIState, ProfileMessageState} from '@/state/ProfileData';
import {useRecoilState} from 'recoil';
import {BackHandler, ScrollView} from 'react-native';

const ProfileDetailScreen = ({navigation, route}) => {
  const [profileMessageState, setProfileMessageState] =
    useRecoilState(ProfileMessageState);
  const [profileImageUrIState, setProfileImageUrIState] =
    useRecoilState(ProfileImageUrIState);

  // 백핸들러
  useEffect(() => {
    handlePressBack();
    return () => handlePressBack();
  }, []);

  const handlePressBack = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.pop();
      return true;
    });
  };

  const {
    data: detailData,
    isLoading: detailIsLoading,
    isError: detailIsError,
    refetch: detailRefetch,
  } = useGetFamilyProfile({
    userId: route.params.userId,
    onSuccess: data => {
      setProfileMessageState(data?.message);
      setProfileImageUrIState(data?.profileImageUrl);
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* 유저 프로필 부분 */}
            <FamilyProfile route={route} detailData={detailData} />

            {/* 유저 정보 부분 - 좋아하는 것 등*/}
            <FamilyInfo route={route} infoData={infoData} />
          </ScrollView>
        </AppContainer.Paper>
      </AppContainer.Basic>
    </WithHeader>
  );
};

export default ProfileDetailScreen;
