import React, {useState} from 'react';
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

import {useQueryClient} from '@tanstack/react-query';
import {MessageInput} from './FamilyProfile';
import {Components} from '@/utils/Components';

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
  const queryClient = useQueryClient();

  const [tagValue, setTagValue] = useState(''); // 새로운 태그 추가 내용

  // 태그 수정중인지
  const [isFavoritesMod, setIsFavoritesMod] = useState(false);
  const [isHatesMod, setIsHatesMod] = useState(false);
  const [isInterestsMod, setIsInterestsMod] = useState(false);
  const [isExpressionsMod, setIsExpressionsMod] = useState(false);

  const {
    data: infoData,
    isLoading: infoIsLoading,
    status: infoStatus,
  } = useGetFamilyInfo(route.params.userId);

  // 태그 추가 api
  const {mutate: addFavorite} = useAddFavorite(() => onAddSuccess('favorites'));
  const {mutate: addHate} = useAddHate(() => onAddSuccess('hates'));
  const {mutate: addInterest} = useAddInterest(() => onAddSuccess('interests'));
  const {mutate: addExpression} = useAddExpression(() =>
    onAddSuccess('expressions'),
  );

  // 태그 삭제 api
  const {mutate: delFavorite} = useDelFavorite();
  const {mutate: delHate} = useDelHate();
  const {mutate: delInterest} = useDelInterest();
  const {mutate: delExpression} = useDelExpression();

  const getId = data => {
    if (data.length === 0) return 0;
    else return data[data.length - 1].selfIntroductionAnswerId + 1;
  };

  const onAddSuccess = category => {
    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      oldData => {
        let data = oldData.data.data[category];
        oldData.data.data[category] = [
          ...data,
          {
            selfIntroductionAnswerId: getId(data),
            selfIntroductionAnswerContent: tagValue,
          },
        ];

        if (category === 'favorites') {
          setIsFavoritesMod(!isFavoritesMod);
        } else if (category === 'hates') {
          setIsHatesMod(!isHatesMod);
        } else if (category === 'interests') {
          setIsInterestsMod(!isInterestsMod);
        } else if (category === 'expressions') {
          setIsExpressionsMod(!isExpressionsMod);
        }
      },
    );
  };

  // 태그 추가 - 서버로 보내는 함수
  const submitTag = (category, userId, data) => {
    if (tagValue === '') alert('태그를 입력해 주세요');
    else {
      if (category === 'favorites') addFavorite({userId, data});
      else if (category === 'hates') addHate({userId, data});
      else if (category === 'interests') addInterest({userId, data});
      else if (category === 'expressions') addExpression({userId, data});
    }
  };

  // 태그 삭제 - 서버로 보내는 함수
  const deleteTag = (category, userId, selfIntroductionAnswerId) => {
    if (category === 'favorites') {
      delFavorite({userId, selfIntroductionAnswerId});
    } else if (category === 'hates') {
      delHate({userId, selfIntroductionAnswerId});
    } else if (category === 'interests') {
      delInterest({userId, selfIntroductionAnswerId});
    } else if (category === 'expressions') {
      delExpression({userId, selfIntroductionAnswerId});
    }

    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      oldData => {
        oldData.data.data[category] = oldData.data.data[category].filter(it => {
          return it.selfIntroductionAnswerId !== selfIntroductionAnswerId;
        });
      },
    );
  };

  // 태그 수정 중 다른 태그 분야 수정 누를 시 수정상태 풀리도록 하는 함수
  const tagCheck = category => {
    if (category === 'favorites') {
      setIsHatesMod(false);
      setIsInterestsMod(false);
      setIsExpressionsMod(false);
    } else if (category === 'hates') {
      setIsFavoritesMod(false);
      setIsInterestsMod(false);
      setIsExpressionsMod(false);
    } else if (category === 'interests') {
      setIsFavoritesMod(false);
      setIsHatesMod(false);
      setIsExpressionsMod(false);
    } else if (category === 'expressions') {
      setIsFavoritesMod(false);
      setIsHatesMod(false);
      setIsInterestsMod(false);
    }
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
    let tagData = infoData?.data?.data[category];

    return (
      <>
        <CategoryTitle
          title={title}
          onPress={() => {
            setIsMod(!isMod);
            tagCheck(category);
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
                  onSubmitEditing={() => {
                    submitTag(category, route.params.userId, {
                      selfIntroductionAnswerContent: tagValue,
                    });
                  }}
                  autoFocus={true}
                  maxLength={10}
                />
              </TagBox>
            </TagGroup>
          )}
          {tagData.length === 0 ? (
            <FontStyle.Content></FontStyle.Content> // 태그 없을 때 빈칸
          ) : (
            tagData?.map(info => (
              <Tag
                key={info.selfIntroductionAnswerId}
                title={info.selfIntroductionAnswerContent}
                isModify={isMod}
                onPress={() => {
                  deleteTag(
                    category,
                    route.params.userId,
                    info.selfIntroductionAnswerId,
                  );
                }}
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

          {TagCategory(
            '싫어하는 것들',
            infoData,
            setIsHatesMod,
            isHatesMod,
            'hates',
            tagValue,
            setTagValue,
          )}

          {TagCategory(
            '요즘 관심사',
            infoData,
            setIsInterestsMod,
            isInterestsMod,
            'interests',
            tagValue,
            setTagValue,
          )}

          {TagCategory(
            `'${route.params.role}'을(를) 한단어로 표현한다면?`,
            infoData,
            setIsExpressionsMod,
            isExpressionsMod,
            'expressions',
            tagValue,
            setTagValue,
          )}

          <Components.EmptyBox height={50} />
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
          size={15}
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
