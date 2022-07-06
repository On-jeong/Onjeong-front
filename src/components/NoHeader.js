import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors} from '../utils/GlobalStyles';
import {Body, IconBox} from './WithHeader';

const Container = styled.View`
  flex: 1;
  background-color: ${AppColors.body};
`;

const LeftNav = styled.View`
  height: 55px;
  width: 70px;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

const NoHeader = ({children, title, leftIcon, leftOnPress}) => {
  return (
    <Container>
      <LeftNav>
        <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
        <FontStyle.Title>{title}</FontStyle.Title>
      </LeftNav>
      <Body>{children}</Body>
    </Container>
  );
};

export default NoHeader;
