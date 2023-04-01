import React from 'react';
import {AppFonts} from '@/utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors, betweenIcons, navigationHeight} from '@/utils/GlobalStyles';
import PropTypes from 'prop-types';
import LoadingComponent from '../Loading/LoadingComponent';
import {AppIcons} from '@/ui/icons';

const NavBar = styled.View`
  height: ${navigationHeight}px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RightNav = styled.View`
  width: 70px;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: ${betweenIcons}px;
`;

export const LeftNav = styled.View`
  width: 70px;
  flex-direction: row;
  margin-left: 10px;
`;

export const BellIconBox = styled.TouchableOpacity`
  padding: 12px;
  padding-top: 13px;
`;

export const IconBox = styled.TouchableOpacity`
  padding: 12px;
`;

export const BackBox = styled.TouchableOpacity`
  padding: 15px;
  padding-left: 15px;
  padding-right: 40px;
`;

export const Body = styled.View`
  flex: 1;
  background-color: ${AppColors.Background};
`;

// 제목이 있는 헤더 커스텀 가능
export const WithHeader = ({
  isBack,
  children,
  title,
  leftIcon,
  rightIcon1,
  rightIcon2,
  leftOnPress,
  rightOnPress1,
  rightOnPress2,
  navigation,
  isLoading,
  isError,
  reloadFunc,
}) => {
  return (
    <Body>
      <NavBar>
        <LeftNav>
          {isBack ? (
            <BackBox
              onPress={() => {
                navigation.goBack();
              }}>
              <AppIcons.Back_gray />
            </BackBox>
          ) : (
            <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
          )}
        </LeftNav>
        <AppFonts.Heading>{title}</AppFonts.Heading>
        <RightNav>
          <IconBox onPress={rightOnPress1}>{rightIcon1}</IconBox>
          <IconBox onPress={rightOnPress2}>{rightIcon2}</IconBox>
        </RightNav>
      </NavBar>
      <LoadingComponent
        isLoading={isLoading}
        isError={isError}
        reloadFunc={reloadFunc}>
        {children}
      </LoadingComponent>
    </Body>
  );
};

// 오른쪽에 setting, alert로 연결되는 기본 아이콘 및 뒤로가기 버튼 형태
export const BasicHeader = ({
  isBack,
  children,
  title,
  leftIcon,
  leftOnPress,
  navigation,
  isLoading,
  isError,
  reloadFunc,
}) => {
  return (
    <Body>
      <NavBar>
        <LeftNav>
          {isBack ? (
            <BackBox
              onPress={() => {
                navigation.goBack();
              }}>
              <AppIcons.Back_gray />
            </BackBox>
          ) : (
            <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
          )}
        </LeftNav>
        <AppFonts.Heading>{title}</AppFonts.Heading>
        <RightNav>
          <BellIconBox
            onPress={() => {
              navigation.navigate('Alert');
            }}>
            <AppIcons.Bell />
          </BellIconBox>
          <IconBox
            onPress={() => {
              navigation.navigate('My');
            }}>
            <AppIcons.Setting />
          </IconBox>
        </RightNav>
      </NavBar>
      <Body>
        <LoadingComponent
          isLoading={isLoading}
          isError={isError}
          reloadFunc={reloadFunc}>
          {children}
        </LoadingComponent>
      </Body>
    </Body>
  );
};

WithHeader.propTypes = {
  isBack: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  leftIcon: PropTypes.element,
  leftOnPress: PropTypes.func,
  rightIcon1: PropTypes.element,
  rightIcon2: PropTypes.element,
  rightOnPress1: PropTypes.func,
  rightOnPress2: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

BasicHeader.propTypes = {
  isBack: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  leftIcon: PropTypes.element,
  leftOnPress: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
