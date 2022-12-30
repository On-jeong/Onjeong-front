import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '../../utils/GlobalFonts';
import {AppColors} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  height: 45px;
  width: ${props => props.width}px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.color};
`;

export const BasicButton = ({
  title,
  inputCheck,
  onPress,
  borderColor,
  width = 300,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <>
      <Button
        color={inputCheck ? borderColor : AppColors.border}
        onPress={onPress}
        disabled={!inputCheck}
        width={width}
        margin={margin}
        style={{
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}>
        <FontStyle.ContentB color={!inputCheck && AppColors.border}>
          {title}
        </FontStyle.ContentB>
      </Button>
    </>
  );
};

BasicButton.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  inputCheck: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  borderColor: PropTypes.string,
};
