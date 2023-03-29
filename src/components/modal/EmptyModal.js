import React from 'react';
import styled from 'styled-components';
import {Modal} from 'react-native';
import {ModalBox} from './PromptModal';

export const ModalBackground = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const EmptyModal = ({modalVisible, setModalVisible, children}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ModalBackground onPress={() => setModalVisible(false)} />
      <ModalBox>{children}</ModalBox>
    </Modal>
  );
};

export default EmptyModal;
