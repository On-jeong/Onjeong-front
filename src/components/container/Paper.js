import React from 'react';
import styled from 'styled-components';
import {AppColors} from '@/utils/GlobalStyles';

export const PaperBox = styled.View`
  width: 100%;
  height: ${props => props.height && props.height};
  justify-content: center;
  align-items: center;
  background-color: ${AppColors.white};
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const PaperLine = styled.View`
  width: 100%;
  height: 100%;
  border-width: 2px;
  padding: ${props => props.padding}px;
  padding-top: ${props => props.paddingTop}px;
  border-color: ${AppColors.Gray500};
  background-color: ${AppColors.white};
`;

export const Paper = ({
  children,
  height = 500,
  padding = 30,
  paddingTop = 10,
}) => {
  return (
    <PaperBox height={height}>
      <PaperLine padding={padding} paddingTop={paddingTop}>
        {children}
      </PaperLine>
    </PaperBox>
  );
};
