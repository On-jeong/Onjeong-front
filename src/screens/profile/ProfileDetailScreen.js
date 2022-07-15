import React from 'react';
import NoHeader from '@/components/NoHeader';
import styled from 'styled-components';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import {FontStyle} from '../../utils/GlobalFonts';

const Image = styled.Image`
  width: ${windowWidth * 0.3};
  height: ${windowWidth * 0.3};
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

const ProfileDetailScreen = ({navigation, route}) => {
  return (
    <NoHeader title={route.params.role} isBack={true} navigation={navigation}>
      <Container>
        <TopContainer>
          <Image source={{uri: 'https://placeimg.com/100/100/people'}} />
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
          <FontStyle.SubContent>하잉~</FontStyle.SubContent>
        </ArrowBox>
      </Container>
    </NoHeader>
  );
};

export default ProfileDetailScreen;
