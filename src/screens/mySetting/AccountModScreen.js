import {AppButtons} from '@/components/buttons';
import NoHeader from '@/components/NoHeader';
import {useModifyAccount} from '@/hooks/useUserData';
import {
  UserBirthState,
  UserIdState,
  UserNameState,
  UserStatusState,
} from '@/state/UserData';
import {FontStyle} from '@/utils/GlobalFonts';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
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

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 40px;
  padding-right: 30px;
`;

function AccountModScreen({navigation}) {
  const [name, setName] = useState(useRecoilValue(UserNameState));
  const [status, setStatus] = useState(useRecoilValue(UserStatusState));
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const userIdState = useRecoilValue(UserIdState);
  const setUserNameState = useSetRecoilState(UserNameState);
  const setUserStatusState = useSetRecoilState(UserStatusState);
  const setUserBirthState = useSetRecoilState(UserBirthState);

  const {mutate} = useModifyAccount({
    onSuccess: () => {
      alert('회원정보 변경이 완료되었습니다.');
      setUserNameState(name);
      setUserStatusState(status);
    },
    onError: () => {
      alert('회원정보 변경에 실패했습니다.');
      setName(UserNameState);
      setStatus(UserStatusState);
    },
  });

  useEffect(() => {}, [name, status]);

  const onSubmit = () => {
    if (name === '') {
      alert('이름을 입력해 주세요');
      return 0;
    } else if (status == '') {
      alert('역할을 입력해 주세요');
      return 0;
    } else if (pw == '') {
      alert('비밀번호를 입력해 주세요');
      return 0;
    } else if (pwCheck == '') {
      alert('비밀번호 확인을 입력해 주세요');
      return 0;
    } else if (pw !== pwCheck) {
      alert('비밀번호 확인이 맞지 않습니다.');
      return 0;
    }
    mutate({
      userBirth: '2022-01-01',
      userName: name,
      userPassword: pw,
      userStatus: status,
    });
    setPw('');
    setPwCheck('');
  };

  return (
    <NoHeader title="회원정보 변경" isBack={true} navigation={navigation}>
      <InfoBox
        title={'아이디'}
        modAvailable={false}
        value={userIdState}
        maxLength={20}
        secureTextEntry={false}
      />
      <InfoBox
        title={'이름'}
        modAvailable={true}
        value={name}
        setValue={setName}
        maxLength={20}
        secureTextEntry={false}
      />
      <InfoBox
        title={'역할'}
        modAvailable={true}
        value={status}
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
        <AppButtons.TextButton.Content
          title={'변경하기'}
          bold={true}
          onPress={onSubmit}
        />
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
