import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '../../utils/GlobalFonts';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  height: 56px;
  width: ${windowWidth};
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
`;

export const FullButton = ({title, onPress, color, disabled}) => {
  return (
    <>
      <Button
        color={disabled ? AppColors.Secondary : color ? color : AppColors.Primary}
        onPress={onPress}
        disabled={disabled}>
        <AppFonts.Body1 color={disabled ? AppColors.Gray700 : AppColors.Black}>
          {title}
        </AppFonts.Body1>
      </Button>
    </>
  );
};

FullButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
};
