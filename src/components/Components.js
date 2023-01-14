import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {AppColors} from '@/utils/GlobalStyles';

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

// 동그라미
const CircleBox = styled.View`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-bottom: 2px;
  border-radius: 50px;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
`;

const Circle = ({color, width = 25, height = 25, children}) => {
  return (
    <CircleBox color={color} width={width} height={height}>
      {children}
    </CircleBox>
  );
};
Circle.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

const RowBox = styled.View`
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

const Row = ({justifyContent = 'flex-start', children}) => {
  return <RowBox justifyContent={justifyContent}>{children}</RowBox>;
};
Row.propTypes = {
  justifyContent: PropTypes.string,
};

export const AppComponents = {
  HorizonLine,
  EmptyBox,
  Circle,
  Row,
};
