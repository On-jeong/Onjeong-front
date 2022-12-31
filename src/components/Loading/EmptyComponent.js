import {FontStyle} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {LoadingBox} from './LoadingComponent';

const TitleBox = styled.View`
  margin-top: 10px;
`;

const EmptyComponent = ({isEmpty, title1, title2, children}) => {
  if (isEmpty)
    return (
      <LoadingBox>
        {title1 && <FontStyle.Content>{title1}</FontStyle.Content>}
        {title2 && (
          <TitleBox>
            <FontStyle.Content>{title2}</FontStyle.Content>
          </TitleBox>
        )}
      </LoadingBox>
    );

  return <>{children}</>;
};

export default EmptyComponent;
