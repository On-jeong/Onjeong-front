import React from 'react';
import styled from 'styled-components';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

export const InputContainer = styled.View`
  width: ${props => (props.width ? props.width : windowWidth * 0.7)};
  margin-bottom: 10px;
`;

export const InputBox = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${AppColors.border};
  font-family: 'GangwonLight';
  font-size: 20px;
`;

export const BorderBottomInput = ({
  value,
  onChangeText,
  placeholder,
  maxLength,
  secureTextEntry,
  width,
}) => {
  return (
    <InputContainer width={width}>
      <InputBox
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </InputContainer>
  );
};

BorderBottomInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  secureTextEntry: PropTypes.bool,
};
