import React, {forwardRef} from 'react';
import styled from 'styled-components';
import {AppColors, windowWidth} from '../../utils/GlobalStyles';
import PropTypes from 'prop-types';

export const InputContainer = styled.View`
  width: ${props => (props.width ? props.width : '90%')};
`;

export const InputBox = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${AppColors.Gray300};
  font-family: 'GangwonLight';
  font-size: ${props => props.fontSize}px;
  overflow-y: hidden;
`;

export const BorderBottomInput = forwardRef(
  (
    {
      value,
      onChangeText,
      placeholder,
      maxLength,
      secureTextEntry,
      autoFocus,
      onSubmitEditing,
      blurOnSubmit,
      width,
      margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
      padding = {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
      },
      fontSize = 17,
      disable = false,
    },
    ref,
  ) => {
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
          ref={ref}
          blurOnSubmit={blurOnSubmit}
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
  },
);

BorderBottomInput.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  secureTextEntry: PropTypes.bool,
};
