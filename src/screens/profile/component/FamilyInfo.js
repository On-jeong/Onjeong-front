import React, {useState} from 'react';
import styled from 'styled-components';
import {AppColors} from '@/utils/GlobalStyles';
import {AppFonts} from '@/utils/GlobalFonts';
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
import {AppComponents} from '@/components/Components';
import LoadingComponent from '@/components/Loading/LoadingComponent';
import {AppIcons} from '@/ui/icons';
import {AppContainer} from '@/components/container';

const ContentsContainer = styled.ScrollView`
  padding-left: 7%;
  padding-right: 7%;
`;

const TagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
`;

const CancelBox = styled.View`
  position: absolute;
  top: -10;
  right: -10;
`;

const FamilyInfo = ({route, infoData}) => {
  const queryClient = useQueryClient();

  const [tagValue, setTagValue] = useState(''); // 새로운 태그 추가 내용

  // 수정중인 태그 카테고리 표시
  const [modiCategory, setModiCategory] = useState('');

  // 태그 추가 api
  const {mutate: addFavorite} = useAddFavorite({
    onMutate: () => onAddMutate('favorites'),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });
  const {mutate: addHate} = useAddHate({
    onMutate: () => onAddMutate('hates'),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });
  const {mutate: addInterest} = useAddInterest({
    onMutate: () => onAddMutate('interests'),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });
  const {mutate: addExpression} = useAddExpression({
    onMutate: () => onAddMutate('expressions'),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });

  // 태그 삭제 api
  const {mutate: delFavorite} = useDelFavorite({
    onMutate: value => onDelMutate('favorites', value),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });
  const {mutate: delHate} = useDelHate({
    onMutate: value => onDelMutate('hates', value),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });
  const {mutate: delInterest} = useDelInterest({
    onMutate: value => onDelMutate('interests', value),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });
  const {mutate: delExpression} = useDelExpression({
    onMutate: value => onDelMutate('expressions', value),
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => onSettled(),
  });

  const getId = data => {
    if (data.length === 0) return 0;
    else return data[data.length - 1].selfIntroductionAnswerId + 1;
  };

  const onAddMutate = category => {
    // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
    queryClient.cancelQueries(['getFamilyInfo', route.params.userId]);

    // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
    const rollbackData = queryClient.getQueryData([
      'getFamilyInfo',
      route.params.userId,
    ]);

    // 성공 가정하고 UI 미리 적용
    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      oldData => {
        return {
          ...oldData,
          [category]: [
            ...oldData[category],
            {
              selfIntroductionAnswerId: getId(oldData[category]),
              selfIntroductionAnswerContent: tagValue,
            },
          ],
        };
      },
    );
    setModiCategory('');

    // 실패시 되돌릴 데이터 리턴
    return {rollbackData, add: true};
  };

  const onDelMutate = (category, value) => {
    // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
    queryClient.cancelQueries(['getFamilyInfo', route.params.userId]);

    // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
    const rollbackData = queryClient.getQueryData([
      'getFamilyInfo',
      route.params.userId,
    ]);

    // 성공 가정하고 UI 미리 적용
    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      oldData => {
        return {
          ...oldData,
          [category]: rollbackData[category].filter(
            it => it.selfIntroductionAnswerId !== value.delTagId,
          ),
        };
      },
    );

    // 실패시 되돌릴 데이터 리턴
    return {rollbackData, del: true};
  };

  const onError = (err, value, context) => {
    // 실패할 경우 onMutate에서 반환한 값이 context로 들어옴
    // 기존 data로 rollback
    queryClient.setQueryData(
      ['getFamilyInfo', route.params.userId],
      context.rollbackData,
    );
    if (context.add) alert('태그 생성 중 오류가 발생했습니다');
    else if (context.del) alert('태그 삭제 중 오류가 발생했습니다');

    console.log('context : ', context);
    console.log('태그오류 : ', err);
  };

  const onSettled = () => {
    queryClient.invalidateQueries(['getFamilyInfo', route.params.userId]);
  };

  // 카테고리별 태그 추가 - 서버로 보내는 함수
  const submitTag = (category, userId, data) => {
    if (tagValue === '') alert('태그를 입력해 주세요');
    else {
      if (category === 'favorites') addFavorite({userId, data});
      else if (category === 'hates') addHate({userId, data});
      else if (category === 'interests') addInterest({userId, data});
      else if (category === 'expressions') addExpression({userId, data});
    }
  };

  // 카테고리별 태그 삭제 - 서버로 보내는 함수
  const deleteTag = (category, userId, delTagId) => {
    if (category === 'favorites') delFavorite({userId, delTagId});
    else if (category === 'hates') delHate({userId, delTagId});
    else if (category === 'interests') delInterest({userId, delTagId});
    else if (category === 'expressions') delExpression({userId, delTagId});
  };

  const TagCategory = (title, infoData, category, tagValue, setTagValue) => {
    const tagData = infoData[category];

    return (
      <>
        <CategoryTitle
          title={title}
          isActive={modiCategory === category}
          onPress={() => {
            if (modiCategory === '') setModiCategory(category);
            else setModiCategory('');

            setTagValue('');
          }}
        />
        <TagContainer>
          {modiCategory === category && (
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
          {tagData.size === 0 ? (
            <AppFonts.Content></AppFonts.Content> // 태그 없을 때 빈칸
          ) : (
            tagData?.map(info => (
              <Tag
                key={info.selfIntroductionAnswerId}
                title={info.selfIntroductionAnswerContent}
                isModify={category === modiCategory}
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
      <>
        {TagCategory(
          '좋아하는 것들',
          infoData,
          'favorites',
          tagValue,
          setTagValue,
        )}

        {TagCategory('싫어하는 것들', infoData, 'hates', tagValue, setTagValue)}

        {TagCategory(
          '요즘 관심사',
          infoData,
          'interests',
          tagValue,
          setTagValue,
        )}

        {TagCategory(
          `'${route.params.role}'을(를) 한단어로 표현한다면?`,
          infoData,
          'expressions',
          tagValue,
          setTagValue,
        )}
      </>
    </ContentsContainer>
  );
};

const Title = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const CategoryTitle = ({title, onPress, isActive}) => {
  return (
    <>
      <Title>
        <AppFonts.Body2>{title}</AppFonts.Body2>
        {/* 추가 버튼 */}
        <AppComponents.IconButton
          icon={isActive ? <AppIcons.AddGray /> : <AppIcons.Add />}
          padding={{padding: 5, paddingLeft: 10}}
          onPress={onPress}
        />
      </Title>
    </>
  );
};

CategoryTitle.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const TagGroup = styled.TouchableOpacity`
  margin-right: 12px;
  margin-bottom: 10px;
  margin-bottom: ${props => (props.isModify ? 15 : 10)}px;
`;

const TagBox = styled.View`
  align-self: flex-start;
  padding: 7px 12px;
  background-color: ${AppColors.Secondary};
  elevation: ${props => (props.isModify ? 4 : 0)};
  border-radius: 4px;
`;

const Tag = ({title, isModify, onPress}) => {
  return (
    <TagGroup onPress={onPress} disabled={!isModify} isModify={isModify}>
      <TagBox isModify={isModify}>
        <AppFonts.SubContent>{title}</AppFonts.SubContent>
      </TagBox>
      {isModify && (
        <CancelBox>
          <AppIconButtons.Cancel />
        </CancelBox>
      )}
    </TagGroup>
  );
};
Tag.propTypes = {
  title: PropTypes.string,
};

export default FamilyInfo;
