import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import NoHeader from '@/components/NoHeader';
import styled from 'styled-components';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import {FontStyle} from '../../utils/GlobalFonts';
import {Components} from '../../utils/Components';
import {AppIconButtons} from '@/components/IconButtons';
import PropTypes from 'prop-types';
import {
  useAddProfileImage,
  useGetFamilyProfile,
  useGetFamilyInfo,
  useAddMessage,
  useDelFavorite,
  useDelHate,
  useDelInterest,
  useDelExpression,
  useModMessage,
} from '../../hooks/useProFileData';
import {TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import UserData from '@/state/UserData';
import {useQueryClient} from '@tanstack/react-query';

const Image = styled.Image`
  width: ${windowWidth * 0.3};
  height: ${windowWidth * 0.3};
`;

const Container = styled.View`
  padding-left: 7%;
  padding-right: 7%;
`;

const ContentsContainer = styled.ScrollView`
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
  width: ${windowWidth * 0.4};
  padding: 2px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${AppColors.border};
`;

const ArrowBox = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  min-width: 50;
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

const MessageInput = styled.TextInput`
  font-family: 'GangwonLight';
  font-size: 15px;
  margin: 0;
  padding: 0;
`;

const TagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const CancelBox = styled.View`
  position: absolute;
  top: -10;
  right: -10;
`;

const ProfileDetailScreen = ({navigation, route}) => {
  const userData = useRecoilValue(UserData);
  const queryClient = useQueryClient();

  const [isMessageWrite, setIsMessageWrite] = useState(false);
  const [messageValue, setMessageValue] = useState(detailData?.data.message);
  const [tagValue, setTagValue] = useState('');

  const [isFavoritesMod, setIsFavoritesMod] = useState(false);
  const [isHatesMod, setIsHatesMod] = useState(false);
  const [isInterestsMod, setIsInterestsMod] = useState(false);
  const [isExpressionsMod, setIsExpressionsMod] = useState(false);

  const {
    data: detailData,
    isLoading: detailIsLoading,
    status: detailStatus,
  } = useGetFamilyProfile(route.params.userId, () => {
    setMessageValue(detailData?.data.message);
  });

  const {
    data: infoData,
    isLoading: infoIsLoading,
    status: infoStatus,
  } = useGetFamilyInfo(route.params.userId);
  if (detailStatus == 'success') console.log(detailData.data);
  if (infoStatus == 'success') console.log(infoData.data);

  const {mutate: addImage} = useAddProfileImage();
  const {mutate: addMessage} = useAddMessage();
  const {mutate: modMessage} = useModMessage();

  const {mutate: delFavorite} = useDelFavorite();
  const {mutate: delHate} = useDelHate();
  const {mutate: delInterest} = useDelInterest();
  const {mutate: delExpression} = useDelExpression();

  const getImage = async () => {
    const data = await launchImageLibrary({
      mediaTypes: 'photo',
    });

    // 이미지 업로드 취소한 경우
    if (data.cancelled) {
      return 0;
    }

    // 에러 발생
    if (data.errorMessage) {
      console.log(data.errorMessage);
    }

    const formData = new FormData();

    formData.append('images', data.assets[0].uri);
    console.log(formData);

    addImage(formData);
  };

  const submitMessage = () => {
    if (!messageValue) {
      addMessage({message: messageValue});
    } else if (messageValue) {
      modMessage({message: messageValue});
      // 상태메시지 쿼리데이터 직접 교체
      queryClient.setQueryData(['getFamilyProfile', 26], oldData => {
        oldData.data.message = messageValue;
      });
    }
    setIsMessageWrite(!isMessageWrite);
  };

  const submitTag = ()=>{
    
  }

  return (
    <NoHeader title={route.params.role} isBack={true} navigation={navigation}>
      <Container>
        {detailIsLoading && <FontStyle.Content>Loading...</FontStyle.Content>}
        {detailStatus == 'success' ? (
          <>
            <TopContainer>
              <TouchableOpacity
                onPress={() => {
                  getImage();
                }}>
                <Image
                  source={
                    detailData?.data?.profileImageUrl
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
                      {detailData?.data.name}
                    </FontStyle.Content>
                  </FontStyle.Content>
                </BasicInfo>
                <BasicInfo>
                  <FontStyle.Content>
                    나이:{' '}
                    <FontStyle.Content>
                      {detailData?.data.age}
                    </FontStyle.Content>
                  </FontStyle.Content>
                </BasicInfo>
                <BasicInfo>
                  <FontStyle.Content>
                    생일:{' '}
                    <FontStyle.Content>
                      {detailData?.data.birth}
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
                <FontStyle.SubContent>{detailData?.data.message}</FontStyle.SubContent>
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
          <FontStyle.Content>
            데이터를 불러오는데 실패했습니다.
          </FontStyle.Content>
        )}
      </Container>

      <Components.HorizonLine margin={{marginBottom: 10}} />

      <ContentsContainer>
        {infoIsLoading && <FontStyle.Content>Loading...</FontStyle.Content>}
        {infoStatus === 'success' ? (
          <>
            <CategoryTitle
              title="좋아하는 것들"
              onPress={() => {
                setIsFavoritesMod(!isFavoritesMod);
                // 유저 정보 리패치
                queryClient.invalidateQueries('getFamilyInfo');
              }}
            />
            <TagContainer>
              <>
                {isFavoritesMod&&
                  <TagBox>
                    <MessageInput
                      placeholder={'새로운 태그'}
                      value={tagValue}
                      onChangeText={setTagValue}
                      onSubmitEditing={() => {}}
                    />
                  </TagBox>
                }
                {infoData?.data.favorites.length === 0 ? (
                  <FontStyle.Content>...</FontStyle.Content>
                ) : (
                  infoData?.data.favorites.map(info => (
                    <Tag
                      key={info.favoriteId}
                      title={info.favoriteContent}
                      isModify={isFavoritesMod}
                      onPress={() => {
                        delFavorite({
                          userId: userData.userId,
                          dataId: info.favoriteId,
                        });
                      }}
                    />
                  ))
                )}
              </>
            </TagContainer>
            <CategoryTitle title="싫어하는 것들" />
            <TagContainer>
              {infoData?.data.hates.length === 0 ? (
                <FontStyle.Content>...</FontStyle.Content>
              ) : (
                infoData?.data.hates.map(info => {
                  <Tag key={info.hateId} title={info.hateContent} />;
                })
              )}
            </TagContainer>
            <CategoryTitle title="요즘 관심사" />
            <TagContainer>
              {infoData?.data.interests.length === 0 ? (
                <FontStyle.Content>...</FontStyle.Content>
              ) : (
                infoData?.data.interests.map(info => {
                  <Tag key={info.interestId} title={info.interestContent} />;
                })
              )}
            </TagContainer>
            <CategoryTitle
              title={`'${route.params.role}'을(를) 한단어로 표현한다면?`}
            />
            <TagContainer>
              {infoData?.data.expressions.length === 0 ? (
                <FontStyle.Content>...</FontStyle.Content>
              ) : (
                infoData?.data.expressions.map(info => {
                  <Tag
                    key={info.expressionId}
                    title={info.expressionContent}
                  />;
                })
              )}
            </TagContainer>
          </>
        ) : (
          <FontStyle.Content>
            데이터를 불러오는데 실패했습니다.
          </FontStyle.Content>
        )}
      </ContentsContainer>
    </NoHeader>
  );
};

const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CategoryTitle = ({title, onPress}) => {
  return (
    <>
      <Title>
        <FontStyle.ContentB>{title}</FontStyle.ContentB>
        <AppIconButtons.Pencil
          onPress={onPress}
          size={17}
          margin={{marginLeft: 10}}
        />
      </Title>
    </>
  );
};
CategoryTitle.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const TagBox = styled.View`
  align-self: flex-start;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${AppColors.beige1};
  border-radius: 12px;
`;

const Tag = ({title, isModify, onPress}) => {
  return (
    <>
      <TagBox>
        {isModify && (
          <CancelBox>
            <AppIconButtons.Cancel onPress={onPress} />
          </CancelBox>
        )}
        <FontStyle.SubContent>{title}</FontStyle.SubContent>
      </TagBox>
    </>
  );
};
Tag.propTypes = {
  title: PropTypes.string,
};

export default ProfileDetailScreen;
