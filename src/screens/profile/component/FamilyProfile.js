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
import {AppIconButtons} from '@/components/IconButtons';
import {useQueryClient} from '@tanstack/react-query';
import {useRecoilState, useRecoilValue} from 'recoil';
import {UserIdState} from '@/state/UserData';
import {ProfileImageUrIState, ProfileMessageState} from '@/state/ProfileData';

const ImageBox = styled.TouchableOpacity``;

const Image = styled.Image`
  width: ${windowWidth * 0.3}px;
  height: ${windowWidth * 0.3}px;
`;

const IconBox = styled.View`
  position: absolute;
  right: 5;
  top: 5;
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

const BasicInfo = styled.View`
  width: ${windowWidth * 0.4}px;
  padding: 2px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${AppColors.border};
`;

const ArrowBox = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  min-width: 50px;
  padding: 8px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: ${AppColors.beige1};
  align-self: flex-start;
`;

const TopArrow = styled.View`
  border-top-width: 0px;
  border-top-color: transparent;
  border-right-width: 5px;
  border-right-color: transparent;
  border-bottom-width: 10px;
  border-bottom-color: ${AppColors.beige1};
  border-left-width: 5px;
  border-left-color: transparent;
  border-style: solid;
  height: 0px;
  width: 0px;
  position: absolute;
  top: -9px;
  left: 20px;
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

  const [isMessageWrite, setIsMessageWrite] = useState(false);

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
    setIsMessageWrite(!isMessageWrite);
  };

  return (
    <Container>
      <>
        <TopContainer>
          {/* 본인일 경우에만 프사 수정 */}
          {route.params.userId === userId ? (
            <ImageBox
              onPress={() => {
                getImage();
              }}>
              <Image
                source={
                  profileImageUrIState
                    ? {uri: profileImageUrIState}
                    : require('@/assets/image/profileImage.png')
                }
              />
              <IconBox>
                <AppIconButtons.Pencil size={12} padding={{paddingLeft: 20}} />
              </IconBox>
            </ImageBox>
          ) : (
            <Image
              source={
                profileImageUrIState
                  ? {uri: profileImageUrIState}
                  : require('@/assets/image/profileImage.png')
              }
            />
          )}

          <BasicInfos>
            <Infos title={'이름'} content={detailData?.data?.data.name} />
            <Infos title={'나이'} content={detailData?.data?.data.age} />
            <Infos title={'생일'} content={detailData?.data?.data.birth} />
          </BasicInfos>
        </TopContainer>

        {/* 상태메시지 */}
        <ArrowBox>
          <TopArrow />
          {isMessageWrite ? (
            <MessageInput
              value={profileMessageState}
              onChangeText={setProfileMessageState}
              autoFocus={true}
              onSubmitEditing={submitMessage}
            />
          ) : (
            <AppFonts.SubContent>
              {detailData?.data?.data.message}
            </AppFonts.SubContent>
          )}
          {/* 메세지 작성중이 아니고, 자신의 프로필일 경우에만 수정 버튼 보이기 */}
          {!isMessageWrite && route.params.userId === userId && (
            <AppIconButtons.Pencil
              disabled={false}
              onPress={() => {
                setIsMessageWrite(true);
              }}
              size={15}
              padding={{paddingLeft: 20}}
            />
          )}
        </ArrowBox>
      </>
    </Container>
  );
};

const Infos = ({title, content}) => {
  return (
    <BasicInfo>
      <AppFonts.Content>
        {title}: <AppFonts.Content>{content}</AppFonts.Content>
      </AppFonts.Content>
    </BasicInfo>
  );
};

export default FamilyProfile;
