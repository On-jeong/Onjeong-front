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

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.View`
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

const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-bottom: ${props =>
    props.twoTitle ? modalHeight * 0.2 : modalHeight * 0.1};
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
          {title1 && <AppFonts.Body1>{title1}</AppFonts.Body1>}
          {title2 && <AppFonts.Body1>{title2}</AppFonts.Body1>}
        </TitleContainer>
        <ButtonContainer>
          <AppButtons.BasicButton
            title={'확인'}
            width={modalWidth * 0.4}
            onPress={onPress}
            disabled={true}
            color={borderColor}
          />
        </ButtonContainer>
      </ModalBox>
    </Modal>
  );
};

export default AlertModal;
