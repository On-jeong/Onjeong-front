import React from 'react';
import styled from 'styled-components';
import { FontStyle } from '../../utils/GlobalFonts';
import {AppColors} from '../../utils/GlobalStyles';

const Button = styled.TouchableOpacity`
  height: 40px;
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
        color={inputCheck ? borderColor : AppColors.blur}
        onPress={onPress}
        disabled={!inputCheck}>
        <FontStyle.ContentB>{title}</FontStyle.ContentB>
      </Button>
    </>
  );
};