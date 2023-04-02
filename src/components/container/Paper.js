import React from 'react';
import styled from 'styled-components';
import {AppColors} from '@/utils/GlobalStyles';

export const PaperBox = styled.View`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
  background-color: ${AppColors.white};
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  elevation: ${props => props.elevation};
`;

export const PaperLine = styled.View`
  width: 100%;
  height: ${props => (props.height == 'auto' ? 'auto' : props.height - 20)};
  max-height: 100%;
  border-width: 2px;
  border-color: ${AppColors.Gray500};
  background-color: ${AppColors.white};
`;

export const Paper = ({
  children,
  height = 'auto',
  width,
  elevation = 0,
  padding = {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <PaperBox height={height} width={width} elevation={elevation}>
      <PaperLine
        style={{
          padding: padding.padding,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}
        height={height}>
        {children}
      </PaperLine>
    </PaperBox>
  );
};
