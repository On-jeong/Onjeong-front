import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors, navigationHeight} from '../utils/GlobalStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';

const NavBar = styled.View`
  height: ${navigationHeight}px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${AppColors.main};
`;

const RightNav = styled.View`
  width: 70px;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 15px;
`;

export const LeftNav = styled.View`
  width: 70px;
  flex-direction: row;
  margin-left: 10px;
`;

export const IconBox = styled.TouchableOpacity`
  padding: 12px;
`;

export const Body = styled.View`
  flex: 1;
  background-color: ${AppColors.body};
`;

export const LoadingBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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
}) => {
  if (isError) {
    return (
      <>
        <NavBar>
          <LeftNav>
            {isBack ? (
              <IconBox
                onPress={() => {
                  navigation.goBack();
                }}>
                <Entypo name="chevron-left" size={20} />
              </IconBox>
            ) : (
              <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
            )}
          </LeftNav>
          <FontStyle.Title>{title}</FontStyle.Title>
          <RightNav>
            <IconBox onPress={rightOnPress1}>{rightIcon1}</IconBox>
            <IconBox onPress={rightOnPress2}>{rightIcon2}</IconBox>
          </RightNav>
        </NavBar>
        <Body>
          <LoadingBox>
            <FontStyle.Content>에러가 발생했습니다!</FontStyle.Content>
            <FontStyle.Content>잠시 후 다시 시도해 주세요.</FontStyle.Content>
          </LoadingBox>
        </Body>
      </>
    );
  }

  return (
    <>
      <NavBar>
        <LeftNav>
          {isBack ? (
            <IconBox
              onPress={() => {
                navigation.goBack();
              }}>
              <Entypo name="chevron-left" size={20} />
            </IconBox>
          ) : (
            <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
          )}
        </LeftNav>
        <FontStyle.Title>{title}</FontStyle.Title>
        <RightNav>
          <IconBox onPress={rightOnPress1}>{rightIcon1}</IconBox>
          <IconBox onPress={rightOnPress2}>{rightIcon2}</IconBox>
        </RightNav>
      </NavBar>
      <Body>
        {isLoading ? (
          <LoadingBox>
            <FontStyle.Content>Loading...</FontStyle.Content>
          </LoadingBox>
        ) : (
          <>{children}</>
        )}
      </Body>
    </>
  );
};

export const BasicHeader = ({
  isBack,
  children,
  title,
  leftIcon,
  leftOnPress,
  navigation,
  isLoading,
  isError,
}) => {
  if (isError) {
    return (
      <>
        <NavBar>
          <LeftNav>
            {isBack ? (
              <IconBox
                onPress={() => {
                  navigation.goBack();
                }}>
                <Entypo name="chevron-left" size={22} />
              </IconBox>
            ) : (
              <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
            )}
          </LeftNav>
          <FontStyle.Title>{title}</FontStyle.Title>
          <RightNav>
            <IconBox
              onPress={() => {
                navigation.navigate('Alert');
              }}>
              <Octicons name="bell" size={22} />
            </IconBox>
            <IconBox
              onPress={() => {
                navigation.navigate('My');
              }}>
              <Octicons name="person" size={23} />
            </IconBox>
          </RightNav>
        </NavBar>
        <Body>
          <LoadingBox>
            <FontStyle.Content>에러가 발생했습니다!</FontStyle.Content>
            <FontStyle.Content>잠시 후 다시 시도해 주세요.</FontStyle.Content>
          </LoadingBox>
        </Body>
      </>
    );
  }

  return (
    <>
      <NavBar>
        <LeftNav>
          {isBack ? (
            <IconBox
              onPress={() => {
                navigation.goBack();
              }}>
              <Entypo name="chevron-left" size={22} />
            </IconBox>
          ) : (
            <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
          )}
        </LeftNav>
        <FontStyle.Title>{title}</FontStyle.Title>
        <RightNav>
          <IconBox
            onPress={() => {
              navigation.navigate('Alert');
            }}>
            <Octicons name="bell" size={22} />
          </IconBox>
          <IconBox
            onPress={() => {
              navigation.navigate('My');
            }}>
            <Octicons name="person" size={23} />
          </IconBox>
        </RightNav>
      </NavBar>
      <Body>
        {isLoading ? (
          <LoadingBox>
            <FontStyle.Content>Loading...</FontStyle.Content>
          </LoadingBox>
        ) : (
          <>{children}</>
        )}
      </Body>
    </>
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
