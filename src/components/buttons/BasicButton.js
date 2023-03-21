import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '../../utils/GlobalFonts';
import {AppColors} from '../../utils/GlobalStyles';
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
  inputCheck = true,
  onPress,
  color,
  height = 36,
  width = 92,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <>
      <Button
        color={color ? color : AppColors.Primary}
        onPress={onPress}
        disabled={!inputCheck}
        height={height}
        width={width}
        margin={margin}
        style={{
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}>
        <FontStyle.Body1>{title}</FontStyle.Body1>
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
