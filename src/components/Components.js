import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {AppColors} from '@/utils/GlobalStyles';

const HLine = styled.View`
  background-color: ${AppColors.Gray300};
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
const EmptyBox = ({height = 50, width = 5}) => {
  return <Box height={height} width={width} />;
};
EmptyBox.propTypes = {
  height: PropTypes.number,
};

// 동그라미
const CircleBox = styled.View`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin-bottom: 2px;
  border-radius: 8px;
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

const Row = ({
  justifyContent = 'flex-start',
  children,
  margin = {
    margin: 0,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
}) => {
  return (
    <RowBox
      justifyContent={justifyContent}
      style={{
        margin: margin.margin,
        marginTop: margin.marginTop,
        marginBottom: margin.marginBottom,
        marginLeft: margin.marginLeft,
        marginRight: margin.marginRight,
      }}>
      {children}
    </RowBox>
  );
};
Row.propTypes = {
  justifyContent: PropTypes.string,
};

const Icon = styled.View`
`;
const IconBox = ({
  icon,
  padding = {
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <Icon
      style={{
        padding: padding.padding,
        paddingTop: padding.paddingTop,
        paddingBottom: padding.paddingBottom,
        paddingLeft: padding.paddingLeft,
        paddingRight: padding.paddingRight,
      }}>
      {icon}
    </Icon>
  );
};

const IconTouch = styled.TouchableOpacity`
  padding: 5px;
`;
const IconButton = ({
  icon,
  onPress,
  disabled = false,
  padding = {
    padding: 5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <IconTouch
      onPress={onPress}
      disabled={disabled}
      style={{
        padding: padding.padding,
        paddingTop: padding.paddingTop,
        paddingBottom: padding.paddingBottom,
        paddingLeft: padding.paddingLeft,
        paddingRight: padding.paddingRight,
      }}>
      {icon}
    </IconTouch>
  );
};
IconButton.propTypes = {
  icon: PropTypes.element,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export const AppComponents = {
  HorizonLine,
  EmptyBox,
  Circle,
  Row,
  IconBox,
  IconButton,
};
