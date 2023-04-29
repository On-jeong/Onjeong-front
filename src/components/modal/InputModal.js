import React from 'react';
import {AppFonts} from '@/utils/GlobalFonts';
import styled from 'styled-components';
import {AppButtons} from '../buttons';
import {AppColors, modalHeight, modalWidth} from '@/utils/GlobalStyles';
import {Modal} from 'react-native';
import {AppInputs} from '../inputs';
import {ButtonContainer, ScriptContainer, TitleContainer} from './PromptModal';

const ModalContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalBox = styled.View`
  width: ${modalWidth}px;
  min-height: ${modalHeight}px;
  padding: 20px;
  justify-content: space-around;
  align-items: center;
  background-color: ${AppColors.white};
  border-radius: 4px;
`;

const InputBox = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const InputModal = ({
  modalVisible,
  setModalVisible,
  title,
  script1,
  script2,
  input,
  setInput,
  leftOnPress,
  rightOnPress,
  leftButtonColor = AppColors.Gray200,
  rightButtonColor = AppColors.Primary,
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
      <ModalContainer>
        <ModalBox height={height}>
          <TitleContainer>
            {title && <AppFonts.SubTitle>{title}</AppFonts.SubTitle>}
          </TitleContainer>
          <ScriptContainer twoTitle={script2}>
            {script1 && <AppFonts.Body2>{script1}</AppFonts.Body2>}
            {script2 && <AppFonts.Body2>{script2}</AppFonts.Body2>}
          </ScriptContainer>
          <InputBox>
            <AppInputs.BorderBottomInput
              placeHolder="비밀번호"
              value={input}
              onChangeText={setInput}
            />
          </InputBox>
          <ButtonContainer>
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
      </ModalContainer>
    </Modal>
  );
};

export default InputModal;
