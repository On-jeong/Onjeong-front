import React from 'react';
import styled from 'styled-components';

const Container = styled.TouchableWithoutFeedback`
  flex: 1;
`;

const TouchableBox = styled.View`
  flex: 1;
`;

export const TouchableWithoutFeedback = ({
  children,
  onPress,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <Container onPress={onPress}>
      <TouchableBox
        style={{
          padding: padding.padding,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}>
        {children}
      </TouchableBox>
    </Container>
  );
};
