import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';

const Container = styled.View`
  align-items: flex-end;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const MaxLength = ({
  maxLen,
  curLen,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <Container
      style={{
        padding: padding.padding,
        paddingTop: padding.paddingTop,
        paddingBottom: padding.paddingBottom,
        paddingLeft: padding.paddingLeft,
        paddingRight: padding.paddingRight,
      }}>
      <AppFonts.Caption>
        {curLen}/{maxLen}
      </AppFonts.Caption>
    </Container>
  );
};

export default MaxLength;
