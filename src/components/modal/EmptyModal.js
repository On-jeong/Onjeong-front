import React from 'react';
import {Modal} from 'react-native';
import {modalHeight} from '@/utils/GlobalStyles';
import {ModalBackground, ModalBox} from './PromptModal';

const EmptyModal = ({
  modalVisible,
  setModalVisible,
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
      <ModalBox height={height}>{children}</ModalBox>
    </Modal>
  );
};

export default EmptyModal;
