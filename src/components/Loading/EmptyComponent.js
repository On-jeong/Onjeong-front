import {AppFonts} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {LoadingBox} from './LoadingComponent';

const TitleBox = styled.View`
  margin-top: 10px;
`;

// contents가 없을 경우 사용
const EmptyComponent = ({isEmpty, title1, title2, children}) => {
  if (isEmpty)
    return (
      <LoadingBox>
        {title1 && <AppFonts.Content>{title1}</AppFonts.Content>}
        {title2 && (
          <TitleBox>
            <AppFonts.Content>{title2}</AppFonts.Content>
          </TitleBox>
        )}
      </LoadingBox>
    );

  return <>{children}</>;
};

export default EmptyComponent;
