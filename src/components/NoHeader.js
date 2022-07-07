import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors} from '../utils/GlobalStyles';
import {Body, IconBox} from './WithHeader';
import Entypo from 'react-native-vector-icons/Entypo';

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
  flex-direction: row;
  align-items: center;
`;

const NoHeader = ({
  isBack,
  children,
  title,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  navigation
}) => {
  return (
    <Container>
      <NavContainer>
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
          <FontStyle.Title>{title}</FontStyle.Title>
        </LeftNav>
        <IconBox onPress={rightOnPress}>{rightIcon}</IconBox>
      </NavContainer>
      <Body>{children}</Body>
    </Container>
  );
};

export default NoHeader;
