import {FontStyle} from '@/utils/GlobalFonts';
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
          <FontStyle.Content>에러가 발생했습니다!</FontStyle.Content>
          <FontStyle.Content>잠시 후 다시 시도해 주세요.</FontStyle.Content>
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
