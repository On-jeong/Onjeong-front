import React from 'react';
import {FontStyle} from '@/utils/GlobalFonts';
import styled from 'styled-components';
import {AppColors} from '@/utils/GlobalStyles';
import {Body, IconBox} from './WithHeader';
import PropTypes from 'prop-types';
import LoadingComponent from '../Loading/LoadingComponent';
import { AppIconButtons } from '../IconButtons';

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

const LeftNavTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const LeftNav = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightMargin = styled.View`
  margin-right: 10px;
`;

const NoHeader = ({
  isBack,
  children,
  title,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  navigation,
  isLoading,
  isError,
  reloadFunc,
}) => {
  return (
    <Container>
      <NavContainer>
        {isBack ? (
          <LeftNavTouchable
            onPress={() => {
              navigation.goBack();
            }}>
            <RightMargin>
              <AppIconButtons.Back size={20} />
            </RightMargin>
            <FontStyle.TitleB>{title}</FontStyle.TitleB>
          </LeftNavTouchable>
        ) : (
          <LeftNav>
            <IconBox onPress={leftOnPress}>{leftIcon}</IconBox>
          </LeftNav>
        )}
        <IconBox onPress={rightOnPress}>{rightIcon}</IconBox>
      </NavContainer>
      <Body>
        <LoadingComponent
          isLoading={isLoading}
          isError={isError}
          reloadFunc={reloadFunc}>
          {children}
        </LoadingComponent>
      </Body>
    </Container>
  );
};

export default NoHeader;

NoHeader.propTypes = {
  isBack: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.string,
  leftIcon: PropTypes.element,
  leftOnPress: PropTypes.func,
  rightIcon: PropTypes.element,
  rightOnPress: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
