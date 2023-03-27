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
  padding: 20px;
  padding-top: 10px;
  border-color: ${AppColors.Gray500};
  background-color: ${AppColors.white};
`;

export const Paper = ({children, height = 500}) => {
  return (
    <PaperBox height={height}>
      <PaperLine>{children}</PaperLine>
    </PaperBox>
  );
};
