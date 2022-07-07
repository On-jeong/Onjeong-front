import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors} from '../utils/GlobalStyles';
import {Body, IconBox} from './WithHeader';

const Container = styled.View`
  flex: 1;
  background-color: ${AppColors.body};
`;

const NavContainer = styled.View`
  height: 55px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-right: 15px;
`;

const LeftNav = styled.View`
  width: 70px;
  flex-direction: row;
  align-items: center;
`;

const NoHeader = ({
  children,
  title,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
}) => {
  return (
    <Container>
      <NavContainer>
        <LeftNav>
          <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
          <FontStyle.Title>{title}</FontStyle.Title>
        </LeftNav>
        <IconBox onPress={rightOnPress}>{rightIcon}</IconBox>
      </NavContainer>
      <Body>{children}</Body>
    </Container>
  );
};

export default NoHeader;
