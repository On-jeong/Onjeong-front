import {FontStyle} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';

export const LoadingBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TitleBox = styled.View`
  margin-top: 10px;
`;

const EmptyComponent = ({title1, title2, children}) => {
  if (title1)
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
