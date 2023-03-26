import React from 'react';
import styled from 'styled-components';
import {AppColors, windowHeight, windowWidth} from '@/utils/GlobalStyles';
import {FontFamily} from '@/utils/GlobalFonts';
import {AppContainer} from '../container';

export const Paper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${AppColors.white};
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const PaperLine = styled.View`
  width: 100%;
  border-width: 2px;
  padding: 20px;
  padding-top: 10px;
  border-color: ${AppColors.Gray600};
  background-color: ${AppColors.white};
`;

export const MainInput = styled.TextInput`
  font-family: ${FontFamily.Light};
  font-size: 20px;
  height: ${windowHeight * 0.5}px;
  line-height: 30px;
`;

export const SendBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const SendBtn = styled.TouchableOpacity`
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ImageBox = styled.View`
  margin-top: 10px;
`;

export const IconBox = styled.View`
  position: absolute;
  top: -10px;
  left: -10px;
`;

export const PreImage = styled.Image`
  width: ${windowWidth * 0.3}px;
  height: ${windowWidth * 0.3}px;
`;

export const PaperInput = ({children, mainText, setMainText}) => {
  return (
    <AppContainer.Paper>
      <>
        {children}
        <MainInput
          multiline={true}
          maxLength={300}
          textAlignVertical="top"
          value={mainText}
          onChangeText={setMainText}
        />
      </>
    </AppContainer.Paper>
  );
};
