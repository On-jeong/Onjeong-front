import customAxios from '@/api/axios';
import {AppButtons} from '@/components/buttons';
import {AppInputs} from '@/components/inputs';
import {LoadingBox} from '@/components/Loading/LoadingComponent';
import PromptModal from '@/components/modal/PromptModal';
import {useDeleteAccount} from '@/hooks/useUserData';
import {AppComponents} from '@/components/Components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {WithHeader} from '@/components/headers/WithHeader';

const AccountDeleteScreen = ({navigation}) => {
  const [quitModal, setQuitModal] = useState(false);
  const [userPW, setUserPW] = useState(null);

  const {mutate: deleteAccount} = useDeleteAccount({
    onSuccess: async () => {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');

      // 기본 헤더 제거
      delete customAxios.defaults.headers.common['AuthorizationAccess'];

      alert('회원탈퇴가 완료되었습니다');
      navigation.navigate('Welcome');
    },
  });

  return (
    <WithHeader title="회원탈퇴" isBack={true} navigation={navigation}>
      <LoadingBox>
        <AppFonts.Content>
          가족들을 남겨두고 정말 떠나시는 건가요?
        </AppFonts.Content>
        <AppFonts.Content>비밀번호를 입력해 주세요ㅜㅜ</AppFonts.Content>
        <AppComponents.EmptyBox height={20} />
        <AppInputs.BorderBottomInput
          onChangeText={setUserPW}
          placeholder={'비밀번호'}
          secureTextEntry={true}
        />
        <AppComponents.EmptyBox height={10} />
        <AppButtons.FullButton
          title="회원 탈퇴"
          inputCheck={userPW}
          onPress={() => {
            setQuitModal(true);
          }}
        />
      </LoadingBox>
      {/* 회원 탈퇴 모달 */}
      <PromptModal
        modalVisible={quitModal}
        setModalVisible={setQuitModal}
        title1={'계정을 탈퇴하면 복구할 수 없습니다'}
        title2={'정말 탈퇴하시겠습니까?'}
        leftOnPress={() => setQuitModal(false)}
        rightOnPress={() => {
          deleteAccount(userPW);
          setQuitModal(false);
        }}
        leftBorderColor={AppColors.green2}
      />
    </WithHeader>
  );
};

export default AccountDeleteScreen;
