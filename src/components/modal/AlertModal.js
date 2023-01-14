import React from 'react';
import {FontStyle} from '@/utils/GlobalFonts';
import styled from 'styled-components';
import {AppButtons} from '../buttons';
import {
  AppColors,
  ModalHeight,
  ModalWidth,
  windowHeight,
  windowWidth,
} from '@/utils/GlobalStyles';
import {Modal} from 'react-native';

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.View`
  position: absolute;
  bottom: ${windowHeight * 0.5 - ModalHeight / 2}px;
  left: ${windowWidth * 0.5 - ModalWidth / 2}px;
  min-width: ${ModalWidth}px;
  min-height: ${ModalHeight}px;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  background-color: ${AppColors.body};
  border: solid 3px ${AppColors.border};
  border-radius: 20px;
`;

const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${props =>
    props.twoTitle ? ModalHeight * 0.2 : ModalHeight * 0.1};
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AlertModal = ({
  modalVisible,
  setModalVisible,
  title1,
  title2,
  onPress,
  borderColor = AppColors.border,
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
          {title1 && <FontStyle.ContentB>{title1}</FontStyle.ContentB>}
          {title2 && <FontStyle.ContentB>{title2}</FontStyle.ContentB>}
        </TitleContainer>
        <ButtonContainer>
          <AppButtons.BasicButton
            title={'확인'}
            width={ModalWidth * 0.4}
            onPress={onPress}
            inputCheck={true}
            borderColor={borderColor}
          />
        </ButtonContainer>
      </ModalBox>
    </Modal>
  );
};

export default AlertModal;
