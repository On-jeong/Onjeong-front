import React from 'react';
import styled from 'styled-components';
import {AppColors} from './GlobalStyles';
import PropTypes from 'prop-types';

const HLine = styled.View`
  background-color: ${AppColors.border};
  height: ${props => (props.height ? props.height : 1)};
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
HorizonLine.PropTypes = {
  height: PropTypes.number,
  margin: {
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
  },
};

const Box = styled.View`
  height: ${props => (props.height ? props.height : 100)};
`;

const EmptyBox = ({height}) => {
  return <Box height={height} />;
};
EmptyBox.PropTypes = {
  height: PropTypes.number,
};

export const Components = {
  HorizonLine,
  EmptyBox,
};
