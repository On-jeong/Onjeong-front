import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '../../utils/GlobalFonts';
import {AppColors} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  height: 45px;
  width: 70%;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.color};
  margin-bottom: 10px;
`;

export const FullButton = ({title, inputCheck, onPress, borderColor}) => {
  return (
    <>
      <Button
        color={inputCheck ? borderColor : AppColors.border}
        onPress={onPress}
        disabled={!inputCheck}>
        <FontStyle.ContentB color={!inputCheck && AppColors.border}>
          {title}
        </FontStyle.ContentB>
      </Button>
    </>
  );
};

FullButton.PropTypes = {
  title: PropTypes.string.isRequired,
  inputCheck: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  borderColor: PropTypes.string,
};
