import {FontStyle} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import { Body } from '../headers/WithHeader';

export const LoadingBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingComponent = ({isLoading, isError, children}) => {
  if (isError)
    return (
      <LoadingBox>
        <FontStyle.Content>에러가 발생했습니다!</FontStyle.Content>
        <FontStyle.Content>잠시 후 다시 시도해 주세요.</FontStyle.Content>
      </LoadingBox>
    );

  return (
    <Body>
      {isLoading ? (
        <LoadingBox>
          <FontStyle.Content>Loading...</FontStyle.Content>
        </LoadingBox>
      ) : (
        <>{children}</>
      )}
    </Body>
  );
};

export default LoadingComponent;
