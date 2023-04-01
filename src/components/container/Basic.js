import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  padding-left: 5%;
  padding-right: 5%;
`;

export const Basic = ({
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
    <Container
      style={{
        margin: margin.margin,
        marginTop: margin.marginTop,
        marginBottom: margin.marginBottom,
        marginLeft: margin.marginLeft,
        marginRight: margin.marginRight,
      }}>
      {children}
    </Container>
  );
};
