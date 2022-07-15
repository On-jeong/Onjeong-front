import React from 'react';
import NoHeader from '@/components/NoHeader';
import styled from 'styled-components';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import {FontStyle} from '../../utils/GlobalFonts';
import {Components} from '../../utils/Components';
import {AppIconButtons} from '@/components/IconButtons';
import PropTypes from 'prop-types';

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

const TagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const ProfileDetailScreen = ({navigation, route}) => {
  return (
    <NoHeader title={route.params.role} isBack={true} navigation={navigation}>
      <Container>
        <TopContainer>
          <Image
            source={{
              uri: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMTRfMjIz%2FMDAxNjM5NDcyNTY1MTYw.eZq3xw951hO9XplL50Q6j1Ir7SEGp8ZBRenxxao0RFUg.8HoXLtv1V5qdprl1_O-v2s85c5YbHfLNMLbqooTueWMg.JPEG.dhfhwlwodnjs%2F832982630_1639462263.039.jpg&type=sc960_832',
            }}
          />
          <BasicInfos>
            <BasicInfo>
              <FontStyle.Content>
                이름: <FontStyle.Content>소현진</FontStyle.Content>
              </FontStyle.Content>
            </BasicInfo>
            <BasicInfo>
              <FontStyle.Content>
                나이: <FontStyle.Content>23</FontStyle.Content>
              </FontStyle.Content>
            </BasicInfo>
            <BasicInfo>
              <FontStyle.Content>
                생일: <FontStyle.Content>2000-04-25</FontStyle.Content>
              </FontStyle.Content>
            </BasicInfo>
          </BasicInfos>
        </TopContainer>

        {/* 상태메시지 */}
        <ArrowBox>
          <TopArrow />
          <FontStyle.SubContent>
            하잉~ 다들 오늘도 행복하게!
          </FontStyle.SubContent>
        </ArrowBox>
      </Container>

      <Components.HorizonLine margin={{marginBottom: 10}} />

      <ContentsContainer>
        <CategoryTitle title="좋아하는 것들" />
        <TagContainer>
          <Tag title="노래" />
          <Tag title="춤" />
          <Tag title="게임" />
        </TagContainer>
        <CategoryTitle title="싫어하는 것들" />
        <TagContainer>
          <Tag title="벌레" />
          <Tag title="무서운 거" />
          <Tag title="공부" />
        </TagContainer>
        <CategoryTitle title="요즘 관심사" />
        <TagContainer>
          <Tag title="놀기" />
          <Tag title="눞기" />
          <Tag title="케이크" />
        </TagContainer>
        <CategoryTitle
          title={`'${route.params.role}'을(를) 한단어로 표현한다면?`}
        />
        <TagContainer>
          <Tag title="사랑" />
          <Tag title="이쁨" />
          <Tag title="isfp" />
          <Tag title="isfp" />
          <Tag title="isfp" />
          <Tag title="isfp" />
          <Tag title="isfp" />
          <Tag title="isfp" />
        </TagContainer>
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
CategoryTitle.ProtoTypes = {
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

const Tag = ({title}) => {
  return (
    <>
      <TagBox>
        <FontStyle.SubContent>{title}</FontStyle.SubContent>
      </TagBox>
    </>
  );
};
Tag.ProtoTypes = {
  title: PropTypes.string,
};

export default ProfileDetailScreen;
