import {FontStyle} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {Body} from '../headers/WithHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigationHeight} from '@/utils/GlobalStyles';

export const LoadingBox = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: ${navigationHeight};
`;

export const ReloadButtoon = styled.TouchableOpacity`
  padding: 10px;
  margin-top: 10px;
`;

const LoadingComponent = ({isLoading, isError, children, reloadFunc}) => {
  if (isError)
    return (
      <LoadingBox>
        <FontStyle.Content>에러가 발생했습니다!</FontStyle.Content>
        <FontStyle.Content>잠시 후 다시 시도해 주세요.</FontStyle.Content>
        <ReloadButtoon onPress={reloadFunc}>
          <AntDesign name="reload1" size={28} />
        </ReloadButtoon>
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
