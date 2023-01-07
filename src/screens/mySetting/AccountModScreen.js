import {AppButtons} from '@/components/buttons';
import NoHeader from '@/components/headers/NoHeader';
import {useModifyAccount} from '@/hooks/useUserData';
import {
  UserBirthState,
  UserNameState,
  UserStatusState,
  UserNicknameState,
  UserEmailState,
} from '@/state/UserData';
import {FontStyle} from '@/utils/GlobalFonts';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import styled from 'styled-components';
import DatePicker from 'react-native-date-picker';
import {AppColors} from '@/utils/GlobalStyles';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  padding-left: 30px;
`;

const Input = styled.TextInput`
  flex: 1;
  //width: 50px;
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

const BirthButton = styled.TouchableOpacity`
  flex: 1;
`;

function AccountModScreen({navigation}) {
  // 변경값 임시저장
  const [name, setName] = useState(useRecoilValue(UserNameState));
  const [email, setEmail] = useState(useRecoilValue(UserEmailState));
  const [status, setStatus] = useState(useRecoilValue(UserStatusState));
  const [birth, setBirth] = useState(new Date(useRecoilValue(UserBirthState)));
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  console.log(new Date());

  const [birthOpen, setBirthOpen] = useState(false);

  const userNicknameState = useRecoilValue(UserNicknameState);
  // 변경값 영구저장
  const setUserNameState = useSetRecoilState(UserNameState);
  const setUserEmailState = useSetRecoilState(UserEmailState);
  const setUserStatusState = useSetRecoilState(UserStatusState);
  const setUserBirthState = useSetRecoilState(UserBirthState);

  const PW_REG = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 영문, 숫자 조합 8 ~ 16자
  const NAME_REG = /[ㄱ-힣]/; // 한글만

  const {
    mutate: modifyAccountMutate,
    isLoading: modifyAccountIsLoading,
    isError: modifyAccountIsError,
  } = useModifyAccount({
    onSuccess: () => {
      alert('회원정보 변경이 완료되었습니다.');
      setUserNameState(name);
      setUserEmailState(email);
      setUserStatusState(status);
      setUserBirthState(birth);
      setPw('');
      setPwCheck('');
    },
    onError: () => {
      alert('회원정보 변경에 실패했습니다.');
      setName(UserNameState);
      setEmail(UserEmailState);
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

    //if (validationCheck())
    modifyAccountMutate({
      userBirth: birth,
      userName: name,
      userPassword: pw,
      userStatus: status,
    });
  };

  const validationCheck = () => {
    if (!NAME_REG.test(name)) {
      alert('이름은 한글만 입력 가능합니다.');
      return 0;
    } else if (!PW_REG.test(pw)) {
      alert('비밀번호는 영문과 숫자 조합 8~16 자리로 설정해 주세요.');
      return 0;
    } else if (!NAME_REG.test(status)) {
      alert('가족 내 역할은 한글만 입력 가능합니다.');
      return 0;
    }
    return 1;
  };

  return (
    <NoHeader
      title="회원정보 변경"
      isBack={true}
      navigation={navigation}
      isLoading={modifyAccountIsLoading}
      isError={modifyAccountIsError}>
      <InfoBox
        title={'아이디'}
        modAvailable={false}
        value={userNicknameState}
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
        title={'이메일'}
        modAvailable={true}
        value={email}
        setValue={setEmail}
        maxLength={30}
        secureTextEntry={false}
      />
      {/* 생년월일 선택 버튼 */}
      <Container>
        <FontStyle.SubTitleB>
          {'생년월일'}
          <FontStyle.SubTitleB> : </FontStyle.SubTitleB>
        </FontStyle.SubTitleB>
        <BirthButton onPress={() => setBirthOpen(true)}>
          <FontStyle.Content>{format(birth, 'yyyy-MM-dd')}</FontStyle.Content>
        </BirthButton>
      </Container>
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
      {/* 생일 선택 모달 */}
      <DatePicker
        modal
        mode="date"
        open={birthOpen}
        date={birth}
        onConfirm={date => {
          setBirthOpen(false);
          setBirth(date);
        }}
        onCancel={() => {
          setBirthOpen(false);
        }}
        confirmText="확인"
        cancelText="취소"
        title={null}
        androidVariant="iosClone"
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
      <FontStyle.SubTitleB>
        {title}
        <FontStyle.SubTitleB> : </FontStyle.SubTitleB>
      </FontStyle.SubTitleB>
      {modAvailable ? (
        <Input
          maxLength={maxLength}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry}
        />
      ) : (
        <FontStyle.SubTitleB>{value}</FontStyle.SubTitleB>
      )}
    </Container>
  );
};

export default AccountModScreen;
