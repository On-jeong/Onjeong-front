import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors, navigationHeight} from '../utils/GlobalStyles';

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
  height: 100%;
  background-color: ${AppColors.body};
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
      <Body>{children}</Body>
    </>
  );
};

export default WithHeader;
