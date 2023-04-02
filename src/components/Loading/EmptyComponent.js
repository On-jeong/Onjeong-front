import {AppFonts} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {LoadingBox} from './LoadingComponent';
import {AppColors} from '@/utils/GlobalStyles';

const TitleBox = styled.View`
  margin-top: 10px;
`;

// contents가 없을 경우 사용
const EmptyComponent = ({isEmpty, title1, title2, children}) => {
  if (isEmpty)
    return (
      <LoadingBox>
        {title1 && (
          <AppFonts.Body1 color={AppColors.Gray600}>{title1}</AppFonts.Body1>
        )}
        {title2 && (
          <TitleBox>
            <AppFonts.Body1 color={AppColors.Gray600}>{title2}</AppFonts.Body1>
          </TitleBox>
        )}
      </LoadingBox>
    );

  return <>{children}</>;
};

export default EmptyComponent;
