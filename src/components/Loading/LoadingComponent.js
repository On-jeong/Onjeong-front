import {AppFonts} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {Body} from '../headers/WithHeader';
import {AppColors, navigationHeight} from '@/utils/GlobalStyles';
import {ActivityIndicator} from 'react-native';
import {AppIconButtons} from '../IconButtons';

export const LoadingBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: ${navigationHeight};
`;

export const ReloadButton = styled.TouchableOpacity`
  padding: 10px;
  margin-top: 10px;
`;

// 로딩 후 화면 or 에러 전환
const LoadingComponent = ({isLoading, isError, children, reloadFunc}) => {
  if (isError)
    return (
      <Body>
        <LoadingBox>
          <AppFonts.Content>에러가 발생했습니다!</AppFonts.Content>
          <AppFonts.Content>잠시 후 다시 시도해 주세요.</AppFonts.Content>
          <ReloadButton onPress={reloadFunc}>
            <AppIconButtons.ReLoad size={28} />
          </ReloadButton>
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
