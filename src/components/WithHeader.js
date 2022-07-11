import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors, navigationHeight} from '../utils/GlobalStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

const NavBar = styled.View`
  height: ${navigationHeight};
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
  margin-right: 10px;
`;

export const LeftNav = styled.View`
  width: 70px;
  flex-direction: row;
  margin-left: 10px;
`;

export const IconBox = styled.TouchableOpacity`
  margin: 8px;
`;

export const Body = styled.View`
  flex: 1;
  background-color: ${AppColors.body};
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
}) => {
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
      <Body>{children}</Body>
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
}) => {
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
          <IconBox
            onPress={() => {
              navigation.navigate('Alert');
            }}>
            <Octicons name="bell" size={20} />
          </IconBox>
          <IconBox
            onPress={() => {
              navigation.navigate('My');
            }}>
            <Octicons name="person" size={21} />
          </IconBox>
        </RightNav>
      </NavBar>
      <Body>{children}</Body>
    </>
  );
};
