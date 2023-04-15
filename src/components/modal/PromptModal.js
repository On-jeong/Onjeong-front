import React from 'react';
import {AppFonts} from '@/utils/GlobalFonts';
import styled from 'styled-components';
import {AppButtons} from '../buttons';
import {
  AppColors,
  modalHeight,
  modalWidth,
  windowHeight,
  windowWidth,
} from '@/utils/GlobalStyles';
import {Modal} from 'react-native';

export const ModalBackground = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalBox = styled.View`
  position: absolute;
  bottom: ${props => windowHeight * 0.5 - props.height / 2}px;
  left: ${windowWidth * 0.5 - modalWidth / 2}px;
  min-width: ${modalWidth}px;
  min-height: ${modalHeight}px;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  background-color: ${AppColors.white};
  border-radius: 4px;
`;

export const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const ScriptContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ChildrenBox = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PromptModal = ({
  modalVisible,
  setModalVisible,
  title,
  script1,
  script2,
  leftOnPress,
  rightOnPress,
  leftButtonColor = AppColors.Gray200,
  rightButtonColor = AppColors.Primary,
  children,
  height = modalHeight,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalBackground onPress={() => setModalVisible(false)} />
      <ModalBox height={height}>
        <TitleContainer>
          {title && <AppFonts.SubTitle>{title}</AppFonts.SubTitle>}
        </TitleContainer>
        <ScriptContainer twoTitle={script2}>
          {script1 && <AppFonts.Body2>{script1}</AppFonts.Body2>}
          {script2 && <AppFonts.Body2>{script2}</AppFonts.Body2>}
        </ScriptContainer>
        {children && <ChildrenBox>{children}</ChildrenBox>}
        <ButtonContainer children={children}>
          <AppButtons.BasicButton
            title={'취소'}
            width={modalWidth * 0.4}
            height={44}
            onPress={leftOnPress}
            color={leftButtonColor}
            margin={{marginRight: modalWidth * 0.02}}
          />
          <AppButtons.BasicButton
            title={'확인'}
            width={modalWidth * 0.4}
            height={44}
            onPress={rightOnPress}
            color={rightButtonColor}
            margin={{marginLeft: modalWidth * 0.02}}
          />
        </ButtonContainer>
      </ModalBox>
    </Modal>
  );
};

export default PromptModal;
