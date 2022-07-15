import React from 'react';
import styled from 'styled-components';
import {AppColors} from './GlobalStyles';

const HLine = styled.View`
  background-color: ${AppColors.border};
  height: 1px;
  width: 100%;
`;

const HorizonLine = () => {
  return <HLine />;
};


const Box = styled.View`
  height: 100px;
`;

const EmptyBox = () => {
  return <Box />;
};

export const Components = {
  HorizonLine,
  EmptyBox,
};
