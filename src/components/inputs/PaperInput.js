import React from 'react';
import styled from 'styled-components';
import {FontFamily} from '@/utils/GlobalFonts';
import {AppContainer} from '../container';
import {windowHeight} from '@/utils/GlobalStyles';

export const MainInput = styled.TextInput`
  font-family: ${FontFamily.Light};
  font-size: 17px;
  min-height: ${props => props.minHeight};
  height: ${props => props.height && props.height};
`;

export const PaperInput = ({
  children,
  mainText,
  setMainText,
  numberOfLines,
  placeholder,
  topComponent,
  bottomComponent,
  maxLength = 300,
  minHeight = 0,
  height = 'auto',
  padding = {
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
}) => {
  return (
    <AppContainer.Paper
      height={height}
      padding={{
        padding: padding.padding,
        paddingTop: padding.paddingTop,
        paddingBottom: padding.paddingBottom,
        paddingLeft: padding.paddingLeft,
        paddingRight: padding.paddingRight,
      }}>
      <>
        {topComponent}
        {children}
        <MainInput
          height={height}
          multiline={true}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          placeholder={placeholder}
          textAlignVertical="top"
          value={mainText}
          onChangeText={setMainText}
          minHeight={minHeight}
        />
        {bottomComponent}
      </>
    </AppContainer.Paper>
  );
};
