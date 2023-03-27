import React from 'react';
import LoadingComponent from '../Loading/LoadingComponent';
import {Body} from './WithHeader';

export const NoHeader = ({children, isLoading, isError, reloadFunc}) => {
  return (
    <Body>
      <LoadingComponent
        isLoading={isLoading}
        isError={isError}
        reloadFunc={reloadFunc}>
        {children}
      </LoadingComponent>
    </Body>
  );
};
