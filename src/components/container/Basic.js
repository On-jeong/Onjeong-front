import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
`;

const Basic = ({children}) => {
  return <Container>{children}</Container>;
};

export default Basic;
