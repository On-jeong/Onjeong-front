import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '../../utils/GlobalFonts';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${props => props.color};
`;

export const BasicButton = ({
  title,
  disabled: disable = false,
  onPress,
  fontColor,
  color,
  height = 36,
  width = 92,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <>
      <Button
        color={
          disable ? AppColors.Gray400 : color ? color : AppColors.Primary
        }
        onPress={onPress}
        disabled={disable}
        height={height}
        width={width}
        margin={margin}
        style={{
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}>
        <AppFonts.Body1
          color={
            disable
              ? AppColors.Gray700
              : fontColor
              ? fontColor
              : AppColors.Font
          }>
          {title}
        </AppFonts.Body1>
      </Button>
    </>
  );
};

BasicButton.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  inputCheck: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};

export const BigButton = ({
  title,
  disabled: disable = false,
  onPress,
  fontColor,
  color,
  height = 44,
  width,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <BasicButton
      title={title}
      disabled={disable}
      onPress={onPress}
      fontColor={fontColor}
      color={color}
      height={height}
      width={width ? width : windowWidth * 0.9}
      margin={margin}
    />
  );
};

export const SmallButton = ({
  title,
  disabled: disable = false,
  onPress,
  fontColor,
  color,
  height = 25,
  width = 50,
  margin = {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
}) => {
  return (
    <>
      <Button
        color={
          disable ? AppColors.Secondary : color ? color : AppColors.Primary
        }
        onPress={onPress}
        disabled={disable}
        height={height}
        width={width}
        margin={margin}
        style={{
          margin: margin.margin,
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}>
        <AppFonts.SubContent
          color={
            disable
              ? AppColors.Gray700
              : fontColor
              ? fontColor
              : AppColors.Font
          }>
          {title}
        </AppFonts.SubContent>
      </Button>
    </>
  );
};

SmallButton.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  inputCheck: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};
