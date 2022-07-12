import React from 'react';
import styled from 'styled-components';
import {AppColors} from '../../utils/GlobalStyles';

export const InputBox = styled.TextInput`
  width: 70%;
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  font-family: 'GangwonLight';
  font-size: 20px;
  margin-bottom: 10px;
`;

export const BorderBottomInput = ({
  value,
  onChangeText,
  placeholder,
  maxLength,
  secureTextEntry,
}) => {
  return (
    <>
      <InputBox
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};
