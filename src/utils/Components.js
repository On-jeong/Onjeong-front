import React from 'react';
import styled from 'styled-components';
import {AppColors} from './GlobalStyles';
import PropTypes from 'prop-types';

const HLine = styled.View`
  background-color: ${AppColors.border};
  height: ${props => (props.height ? props.height : 1)}px;
  width: 100%;
`;

const HorizonLine = ({
  height,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <HLine
      height={height}
      style={{
        marginTop: margin.marginTop,
        marginBottom: margin.marginBottom,
        marginLeft: margin.marginLeft,
        marginRight: margin.marginRight,
      }}
    />
  );
};
HorizonLine.propTypes = {
  height: PropTypes.number,
  margin: PropTypes.objectOf(PropTypes.number),
};

const Box = styled.View`
  height: ${props => (props.height ? props.height : 100)}px;
`;

// 스크롤 할 때 맨 밑에 빈공간 만들어주는 용도
const EmptyBox = ({height = 50}) => {
  return <Box height={height} />;
};
EmptyBox.propTypes = {
  height: PropTypes.number,
};

export const Components = {
  HorizonLine,
  EmptyBox,
};
