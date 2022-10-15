import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {
  useAddProfileImage,
  useGetFamilyProfile,
  useAddMessage,
  useModMessage,
} from '@/hooks/useProFileData';
import {TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppColors, windowWidth} from '@/utils/GlobalStyles';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppIconButtons} from '@/components/IconButtons';
import {useQueryClient} from '@tanstack/react-query';
import {useFocusEffect} from '@react-navigation/native';

const Image = styled.Image`
  width: ${windowWidth * 0.3}px;
  height: ${windowWidth * 0.3}px;
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

  const [isMessageWrite, setIsMessageWrite] = useState(false);
  const [messageValue, setMessageValue] = useState('');

  const {
    data: detailData,
    isLoading: detailIsLoading,
    status: detailStatus,
  } = useGetFamilyProfile(route.params.userId, () => {
    console.log('데이터:', detailData);
    setMessageValue(detailData?.data?.data.message);
  });

  const {mutate: addImage} = useAddProfileImage();
  const {mutate: addMessage} = useAddMessage();
  const {mutate: modMessage} = useModMessage();

  // 화면 포커스 될 때 상태 매세지 리패치
  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries('getFamilyProfile', route.params.userId);
    }, []),
  );

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
      console.log(image.errorMessage);
    }

    const formData = new FormData();

    formData.append('images', image.assets[0]);

    addImage(formData);
  };

  const submitMessage = () => {
    if (!messageValue) {
      addMessage({message: messageValue});
    } else if (messageValue) {
      modMessage({message: messageValue});
      // 상태메시지 쿼리데이터 직접 교체
      queryClient.setQueryData(
        ['getFamilyProfile', route.params.userId],
        oldData => {
          oldData.data.data.message = messageValue;
        },
      );
    }
    setIsMessageWrite(!isMessageWrite);
  };

  return (
    <Container>
      {detailIsLoading ? (
        <FontStyle.Content>Loading...</FontStyle.Content>
      ) : detailStatus == 'success' ? (
        <>
          <TopContainer>
            <TouchableOpacity
              onPress={() => {
                getImage();
              }}>
              <Image
                source={
                  detailData?.data?.data.profileImageUrl
                    ? {uri: checkProfileImage}
                    : require('@/assets/image/profileImage.png')
                }
              />
            </TouchableOpacity>
            <BasicInfos>
              <BasicInfo>
                <FontStyle.Content>
                  이름:{' '}
                  <FontStyle.Content>
                    {detailData?.data?.data.name}
                  </FontStyle.Content>
                </FontStyle.Content>
              </BasicInfo>
              <BasicInfo>
                <FontStyle.Content>
                  나이:{' '}
                  <FontStyle.Content>
                    {detailData?.data?.data.age}
                  </FontStyle.Content>
                </FontStyle.Content>
              </BasicInfo>
              <BasicInfo>
                <FontStyle.Content>
                  생일:{' '}
                  <FontStyle.Content>
                    {detailData?.data?.data.birth}
                  </FontStyle.Content>
                </FontStyle.Content>
              </BasicInfo>
            </BasicInfos>
          </TopContainer>

          {/* 상태메시지 */}
          <ArrowBox>
            <TopArrow />
            {isMessageWrite ? (
              <MessageInput
                value={messageValue}
                onChangeText={setMessageValue}
                autoFocus={true}
                onSubmitEditing={submitMessage}
              />
            ) : (
              <FontStyle.SubContent>
                {detailData?.data?.data.message}
              </FontStyle.SubContent>
            )}
            {!isMessageWrite && (
              <AppIconButtons.Pencil
                onPress={() => {
                  setIsMessageWrite(true);
                }}
                size={17}
                margin={{marginLeft: 20}}
              />
            )}
          </ArrowBox>
        </>
      ) : (
        <FontStyle.Content>데이터를 불러오는데 실패했습니다.</FontStyle.Content>
      )}
    </Container>
  );
};

export default FamilyProfile;
