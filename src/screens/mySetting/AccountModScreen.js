import {AppButtons} from '@/components/buttons';
import NoHeader from '@/components/NoHeader';
import {UserIdState} from '@/state/UserData';
import {FontStyle} from '@/utils/GlobalFonts';
import React, {useState} from 'react';
import { useRecoilValue} from 'recoil';
import styled from 'styled-components';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
`;

const Input = styled.TextInput`
  min-width: 50px;
  font-family: 'GangwonLight';
  font-size: 20px;
  margin-bottom: 10px;
  padding: 0;
  margin: 0;
`;

const InfoText = styled.Text`
  font-family: 'GangwonLight';
  font-size: 20px;
  margin-bottom: 10px;
  padding: 0;
  margin: 0;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 40px;
  padding-right: 30px;
`;

function AccountModScreen() {
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const userId = useRecoilValue(UserIdState);

  return (
    <NoHeader title="회원정보 변경" isBack={true}>
      <InfoBox
        title={'아이디'}
        modAvailable={false}
        value={userId}
        maxLength={20}
        secureTextEntry={false}
      />
      <InfoBox
        title={'이름'}
        modAvailable={true}
        value={'현진'}
        setValue={setName}
        maxLength={20}
        secureTextEntry={false}
      />
      <InfoBox
        title={'역할'}
        modAvailable={true}
        value={'딸1'}
        setValue={setStatus}
        maxLength={20}
        secureTextEntry={false}
      />
      <InfoBox
        title={'비밀번호'}
        modAvailable={true}
        value={pw}
        setValue={setPw}
        maxLength={20}
        secureTextEntry={true}
      />
      <InfoBox
        title={'비밀번호 확인'}
        modAvailable={true}
        value={pwCheck}
        setValue={setPwCheck}
        maxLength={20}
        secureTextEntry={true}
      />
      <ButtonContainer>
        <AppButtons.TextButton.Content title={'변경하기'} bold={true} />
      </ButtonContainer>
    </NoHeader>
  );
}

const InfoBox = ({
  title,
  value,
  setValue,
  modAvailable,
  maxLength,
  secureTextEntry,
}) => {
  return (
    <Container>
      <FontStyle.SubTitle>
        {title}
        <FontStyle.SubTitle> : </FontStyle.SubTitle>
      </FontStyle.SubTitle>
      {modAvailable ? (
        <Input
          maxLength={maxLength}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry}
        />
      ) : (
        <FontStyle.SubTitle>{value}</FontStyle.SubTitle>
      )}
    </Container>
  );
};

export default AccountModScreen;
