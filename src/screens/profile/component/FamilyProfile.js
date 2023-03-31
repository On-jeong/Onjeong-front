import React, {useState} from 'react';
import styled from 'styled-components';
import {
  useAddProfileImage,
  useGetFamilyProfile,
  useAddMessage,
  useModMessage,
} from '@/hooks/useProFileData';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppColors, windowWidth} from '@/utils/GlobalStyles';
import {AppFonts} from '@/utils/GlobalFonts';
import {useQueryClient} from '@tanstack/react-query';
import {useRecoilState, useRecoilValue} from 'recoil';
import {UserIdState} from '@/state/UserData';
import {ProfileImageUrIState, ProfileMessageState} from '@/state/ProfileData';
import {AppStyled} from '@/components/style';
import {AppComponents} from '@/components/Components';
import {AppInputs} from '@/components/inputs';

const ImageBox = styled.TouchableOpacity``;

const Image = styled.Image`
  width: ${windowWidth * 0.3}px;
  height: ${windowWidth * 0.3}px;
  border-radius: ${windowWidth * 0.3}px;
  background-color: ${AppColors.Gray400};
`;

const Container = styled.View`
  padding-left: 7%;
  padding-right: 7%;
`;

const TopContainer = styled.View`
  width: 100%;
  height: 150px;
  flex-direction: row;
  align-items: center;
`;

const BasicInfos = styled.View`
  margin-left: 5%;
`;

export const MessageInput = styled.TextInput`
  font-family: 'GangwonLight';
  font-size: 15px;
  margin: 0;
  padding: 0;
`;

const FamilyProfile = ({route}) => {
  const queryClient = useQueryClient();

  const userId = useRecoilValue(UserIdState);

  const [profileMessageState, setProfileMessageState] =
    useRecoilState(ProfileMessageState);
  const [profileImageUrIState, setProfileImageUrIState] =
    useRecoilState(ProfileImageUrIState);

  const {data: detailData} = useGetFamilyProfile(route.params.userId, data => {
    setProfileMessageState(data?.data?.data.message);
    setProfileImageUrIState(data?.data?.data.profileImageUrl);
    console.log('데이터 가져옴', data);
  });

  const {mutate: addImage} = useAddProfileImage({
    onSuccess: data => {
      setProfileImageUrIState(data?.data?.data.profileImageUrl);
    },
  });
  const {mutate: addMessage} = useAddMessage();
  const {mutate: modMessage} = useModMessage();

  const getImage = async () => {
    const image = await launchImageLibrary({
      mediaTypes: 'photo',
    });

    // 이미지 업로드 취소한 경우
    if (image.cancelled) {
      return 0;
    }

    // 에러 발생
    if (image.errorMessage) {
      alert('이미지를 업로드하지 못했습니다.');
      console.log(image.errorMessage);
    }

    const formData = new FormData();

    formData.append('images', {
      uri: image.assets[0].uri,
      name: image.assets[0].fileName,
      type: image.assets[0].type,
    });

    addImage(formData);
  };

  const submitMessage = () => {
    if (!profileMessageState) {
      addMessage({message: profileMessageState});
    } else if (profileMessageState) {
      modMessage({message: profileMessageState});
      // 상태메시지 쿼리데이터 직접 교체
      queryClient.setQueryData(
        ['getFamilyProfile', route.params.userId],
        oldData => {
          oldData.data.data.message = profileMessageState;
        },
      );
    }
  };

  return (
    <Container>
      <>
        <TopContainer>
          {/* 본인일 경우에만 프사 수정 */}
          <ImageBox
            disabled={route.params.userId !== userId}
            onPress={() => {
              getImage();
            }}>
            <Image
              source={profileImageUrIState && {uri: profileImageUrIState}}
            />
          </ImageBox>

          <BasicInfos>
            <AppStyled.Row>
              <AppFonts.SubTitle>
                {detailData?.data?.data.name}
              </AppFonts.SubTitle>
              <AppComponents.EmptyBox width={10} />
              <AppFonts.Body2 color={AppColors.Gray600}>
                {detailData?.data?.data.age}
              </AppFonts.Body2>
            </AppStyled.Row>
            <AppFonts.Body2 color={AppColors.Gray800}>
              {detailData?.data?.data.birth}
            </AppFonts.Body2>

            {/* 상태메세지 */}
            <AppInputs.BorderBottomInput
              value={profileMessageState}
              onChangeText={setProfileMessageState}
              onSubmitEditing={submitMessage}
              maxLength={15}
              width={'auto'}
              fontSize={12}
              margin={{marginLeft: -5}}
              padding={{paddingBottom: 0}}
            />
          </BasicInfos>
        </TopContainer>
      </>
    </Container>
  );
};

export default FamilyProfile;
