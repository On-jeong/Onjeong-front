import React from 'react';
import styled from 'styled-components';
import {FontFamily} from '@/utils/GlobalFonts';
import {AppContainer} from '../container';

export const MainInput = styled.TextInput`
  font-family: ${FontFamily.Light};
  font-size: 20px;
  height: ${props => props.height && props.height};
`;

export const PaperInput = ({
  children,
  mainText,
  setMainText,
  height = 500,
  padding = {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
}) => {
  return (
    <AppContainer.Paper
      height={height}
      padding={{
        paddingTop: padding.paddingTop,
        paddingBottom: padding.paddingBottom,
        paddingLeft: padding.paddingLeft,
        paddingRight: padding.paddingRight,
      }}>
      <>
        {children}
        <MainInput
          height={height}
          multiline={true}
          maxLength={300}
          textAlignVertical="top"
          value={mainText}
          onChangeText={setMainText}
        />
      </>
    </AppContainer.Paper>
  );
};
