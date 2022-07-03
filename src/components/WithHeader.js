import {View, Text} from 'react-native';
import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {navigationHeight} from '../utils/GlobalStyles';

const NavBar = styled.View`
  height: ${navigationHeight};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightNav = styled.View`
  width: 70px;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10px;
`;

const LeftNav = styled.View`
  width: 70px;
  flex-direction: row;
  margin-left: 10px;
`;

const IconBox = styled.TouchableOpacity`
  margin: 8px;
`;

const WithHeader = ({
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
          <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
        </LeftNav>
        <FontStyle.Title>{title}</FontStyle.Title>
        <RightNav>
          <IconBox onPress={rightOnPress1}>{rightIcon1}</IconBox>
          <IconBox onPress={rightOnPress2}>{rightIcon2}</IconBox>
        </RightNav>
      </NavBar>
      {children}
    </>
  );
};

export default WithHeader;
