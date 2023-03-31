import React from 'react';
import styled from 'styled-components';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

export const InputContainer = styled.View`
  width: ${props => (props.width ? props.width : windowWidth * 0.9)};
`;

export const InputBox = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${AppColors.Gray300};
  font-family: 'GangwonLight';
  font-size: ${props => props.fontSize}px;
  overflow-y: hidden;
`;

export const BorderBottomInput = ({
  value,
  onChangeText,
  placeholder,
  maxLength,
  secureTextEntry,
  autoFocus,
  onSubmitEditing,
  width,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
  padding = {paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0},
  fontSize = 17,
  disable = false,
}) => {
  return (
    <InputContainer width={width}>
      <InputBox
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={AppColors.Gray600}
        editable={!disable}
        color={disable && AppColors.Gray600}
        fontSize={fontSize}
        style={{
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}
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
