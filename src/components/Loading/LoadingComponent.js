import {AppFonts} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {Body} from '../headers/WithHeader';
import {AppColors, navigationHeight} from '@/utils/GlobalStyles';
import {ActivityIndicator} from 'react-native';
import {AppComponents} from '../Components';
import {AppIcons} from '@/ui/icons';

export const LoadingBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: ${navigationHeight};
`;

// 로딩 후 화면 or 에러 전환
const LoadingComponent = ({isLoading, isError, children, reloadFunc}) => {
  if (isError)
    return (
      <Body>
        <LoadingBox>
          <AppFonts.Body1 color={AppColors.Gray800}>
            에러가 발생했습니다!
          </AppFonts.Body1>
          <AppFonts.Body1 color={AppColors.Gray800}>
            잠시 후 다시 시도해 주세요.
          </AppFonts.Body1>
          <AppComponents.IconButton
            icon={<AppIcons.Reload />}
            onPress={reloadFunc}
            padding={{padding: 10, paddingTop: 15}}
          />
        </LoadingBox>
      </Body>
    );

  return (
    <Body>
      {isLoading ? (
        <LoadingBox>
          <ActivityIndicator size={'large'} color={AppColors.border} />
        </LoadingBox>
      ) : (
        <>{children}</>
      )}
    </Body>
  );
};

export default LoadingComponent;
