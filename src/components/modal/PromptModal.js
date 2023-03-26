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
  bottom: ${windowHeight * 0.5 - modalHeight / 2}px;
  left: ${windowWidth * 0.5 - modalWidth / 2}px;
  min-width: ${modalWidth}px;
  min-height: ${modalHeight}px;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  background-color: ${AppColors.Background};
  border: solid 3px ${AppColors.border};
  border-radius: 20px;
`;

export const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${props =>
    props.twoTitle ? modalHeight * 0.2 : modalHeight * 0.1};
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PromptModal = ({
  modalVisible,
  setModalVisible,
  title1,
  title2,
  leftOnPress,
  rightOnPress,
  leftBorderColor = AppColors.border,
  rightBorderColor = AppColors.border,
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
      <ModalBox>
        <TitleContainer twoTitle={title2}>
          {title1 && <AppFonts.ContentB>{title1}</AppFonts.ContentB>}
          {title2 && <AppFonts.ContentB>{title2}</AppFonts.ContentB>}
        </TitleContainer>
        <ButtonContainer>
          <AppButtons.BasicButton
            title={'취소'}
            width={modalWidth * 0.4}
            onPress={leftOnPress}
            inputCheck={true}
            color={leftBorderColor}
            margin={{marginRight: modalWidth * 0.02}}
          />
          <AppButtons.BasicButton
            title={'확인'}
            width={modalWidth * 0.4}
            onPress={rightOnPress}
            inputCheck={true}
            color={rightBorderColor}
            margin={{marginLeft: modalWidth * 0.02}}
          />
        </ButtonContainer>
      </ModalBox>
    </Modal>
  );
};

export default PromptModal;
