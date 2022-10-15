import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import styled from 'styled-components';
import {AppColors} from '@/utils/GlobalStyles';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppIconButtons} from '@/components/IconButtons';
import PropTypes from 'prop-types';
import {
  useGetFamilyInfo,
  useDelFavorite,
  useDelHate,
  useDelInterest,
  useDelExpression,
  useAddFavorite,
  useAddHate,
  useAddInterest,
  useAddExpression,
} from '@/hooks/useProFileData';

import UserData from '@/state/UserData';
import {useQueryClient} from '@tanstack/react-query';
import {MessageInput} from './FamilyProfile';

const ContentsContainer = styled.ScrollView`
  padding-left: 7%;
  padding-right: 7%;
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

const FamilyInfo = ({route}) => {
  const userData = useRecoilValue(UserData);
  const queryClient = useQueryClient();

  const [tagValue, setTagValue] = useState('');

  const [isFavoritesMod, setIsFavoritesMod] = useState(false);
  const [isHatesMod, setIsHatesMod] = useState(false);
  const [isInterestsMod, setIsInterestsMod] = useState(false);
  const [isExpressionsMod, setIsExpressionsMod] = useState(false);

  const {
    data: infoData,
    isLoading: infoIsLoading,
    status: infoStatus,
  } = useGetFamilyInfo(route.params.userId);

  const {mutate: addFavorite} = useAddFavorite(() => {
    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      oldData => {
        const data = oldData.data.data.favorites;
        oldData.data.data.favorites = [
          ...data,
          {
            selfIntroductionAnswerId:
              data[data.length - 1].selfIntroductionAnswerId + 1,
            selfIntroductionAnswerContent: tagValue,
          },
        ];
      },
    );
    setIsFavoritesMod(!isFavoritesMod);
  });
  const {mutate: addHate} = useAddHate(onAddSuccess);
  const {mutate: addInterest} = useAddInterest(onAddSuccess);
  const {mutate: addExpression} = useAddExpression(onAddSuccess);

  const {mutate: delFavorite} = useDelFavorite();
  const {mutate: delHate} = useDelHate();
  const {mutate: delInterest} = useDelInterest();
  const {mutate: delExpression} = useDelExpression();

  const onAddSuccess = () => {};

  const onDelSuccess = () => {
    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      oldData => {
        oldData.data.data.favorites.filter(
          it => it.selfIntroductionAnswerId == dataId,
        );
      },
    );
  };

  const submitTag = (category, userId, data) => {
    if (category === 'favorites') addFavorite({userId, data});
    else if (category === 'hates') addHate({userId, data});
    else if (category === 'interests') addInterest({userId, data});
    else if (category === 'expressions') addExpression({userId, data});
  };

  const deleteTag = (category, userId, selfIntroductionAnswerId) => {
    console.log('데이터', selfIntroductionAnswerId);
    if (category === 'favorites') delFavorite({userId, selfIntroductionAnswerId});
    else if (category === 'hates') delHate({userId, selfIntroductionAnswerId});
    else if (category === 'interests')
      delInterest({userId, selfIntroductionAnswerId});
    else if (category === 'expressions')
      delExpression({userId, selfIntroductionAnswerId});
  };

  const TagCategory = (
    title,
    infoData,
    setIsMod,
    isMod,
    category,
    tagValue,
    setTagValue,
  ) => {
    let tagData;

    if (category === 'favorites') {
      tagData = infoData?.data?.data.favorites;
    } else if (category === 'hates') {
      tagData = infoData?.data?.data.hates;
    } else if (category === 'interests') {
      tagData = infoData?.data?.data.interests;
    } else if (category === 'expressions') {
      tagData = infoData?.data?.data.expressions;
    }

    return (
      <>
        <CategoryTitle
          title={title}
          onPress={() => {
            setIsMod(!isMod);
            setTagValue('');
          }}
        />
        <TagContainer>
          {isMod && (
            <TagGroup>
              <TagBox>
                <MessageInput
                  placeholder={'새로운 태그'}
                  value={tagValue}
                  onChangeText={setTagValue}
                  onSubmitEditing={() =>
                    submitTag(category, userData.userId, {
                      selfIntroductionAnswerContent: tagValue,
                    })
                  }
                  autoFocus={true}
                  maxLength={10}
                />
              </TagBox>
            </TagGroup>
          )}
          {tagData.length === 0 ? (
            <FontStyle.Content>...</FontStyle.Content>
          ) : (
            tagData.map(info => (
              <Tag
                key={info.selfIntroductionAnswerId}
                title={info.selfIntroductionAnswerContent}
                isModify={isMod}
                onPress={() =>
                  deleteTag(
                    category,
                    userData.userId,
                    info.selfIntroductionAnswerId,
                  )
                }
              />
            ))
          )}
        </TagContainer>
      </>
    );
  };
  return (
    <ContentsContainer>
      {infoIsLoading ? (
        <FontStyle.Content>Loading...</FontStyle.Content>
      ) : infoStatus === 'success' ? (
        <>
          {TagCategory(
            '좋아하는 것들',
            infoData,
            setIsFavoritesMod,
            isFavoritesMod,
            'favorites',
            tagValue,
            setTagValue,
          )}

          <CategoryTitle title="싫어하는 것들" />
          <TagContainer>
            {infoData?.data?.data.hates.length === 0 ? (
              <FontStyle.Content>...</FontStyle.Content>
            ) : (
              infoData?.data?.data.hates.map(info => {
                <Tag key={info.hateId} title={info.hateContent} />;
              })
            )}
          </TagContainer>
          <CategoryTitle title="요즘 관심사" />
          <TagContainer>
            {infoData?.data?.data.interests.length === 0 ? (
              <FontStyle.Content>...</FontStyle.Content>
            ) : (
              infoData?.data?.data.interests.map(info => {
                <Tag key={info.interestId} title={info.interestContent} />;
              })
            )}
          </TagContainer>
          <CategoryTitle
            title={`'${route.params.role}'을(를) 한단어로 표현한다면?`}
          />
          <TagContainer>
            {infoData?.data?.data.expressions.length === 0 ? (
              <FontStyle.Content>...</FontStyle.Content>
            ) : (
              infoData?.data?.data.expressions.map(info => {
                <Tag key={info.expressionId} title={info.expressionContent} />;
              })
            )}
          </TagContainer>
        </>
      ) : (
        <FontStyle.Content>데이터를 불러오는데 실패했습니다.</FontStyle.Content>
      )}
    </ContentsContainer>
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

const TagGroup = styled.View`
  margin-right: 12px;
  margin-bottom: 10px;
`;

const TagBox = styled.View`
  align-self: flex-start;
  padding: 7px 12px;
  background-color: ${AppColors.beige1};
  border-radius: 12px;
`;

const Tag = ({title, isModify, onPress}) => {
  return (
    <TagGroup>
      <TagBox>
        <FontStyle.SubContent>{title}</FontStyle.SubContent>
      </TagBox>
      {isModify && (
        <CancelBox>
          <AppIconButtons.Cancel onPress={onPress} />
        </CancelBox>
      )}
    </TagGroup>
  );
};
Tag.propTypes = {
  title: PropTypes.string,
};

export default FamilyInfo;
