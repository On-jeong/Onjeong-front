import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AppColors, windowHeight} from '@/utils/GlobalStyles';
import {AppFonts, FontFamily} from '@/utils/GlobalFonts';
import {useRecoilValue} from 'recoil';
import {UserIdState, UserStatusState} from '../../state/UserData';
import {usePostMail} from '../../hooks/useMailData';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {AppButtons} from '../../components/buttons';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppIcons} from '@/ui/icons';
import {AppContainer} from '@/components/container';
import {BackHandler} from 'react-native';
import Confirm from '@/components/alert/Alert';

export const PaperContainer = styled.View`
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

export const MainInput = styled.TextInput`
  padding: 20px;
  padding-top: 70px;
  font-family: ${FontFamily.Light};
  font-size: 17px;
  height: ${windowHeight * 0.5};
`;

const ToBox = styled.View`
  height: 38px;
  justify-content: center;
`;

const AlertBox = styled.View`
  margin-top: 10px;
`;

export const SendBox = styled.View`
  width: 100%;
  padding-top: 2px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;

const PaperTop = styled.TouchableOpacity`
  position: absolute;
  top: 10;
  left: 20;
  flex-direction: row;
  align-items: flex-start;
  z-index: 9999;
`;

const SelectBox = styled.View`
  position: relative;
  z-index: 9999;
`;

const SelectTitle = styled.TouchableOpacity`
  width: 120px;
  height: 38px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-left: 5px;
  margin-bottom: -1px;
  border-width:2px;
  border-color:${AppColors.Gray400}
  background-color: ${AppColors.white};
`;

const SelectItems = styled.View`
  position: absolute;
  top: 36;
  left: 5;
  z-index: 9999;
`;

const SelectItem = styled.TouchableOpacity`
  position: relative;
  width: 120px;
  height: 35px;
  flex-direction: row;
  align-items: center;
  justify-content:center;
  margin-bottom: -2px;
  border-width:2px;
  border-color:${AppColors.Gray400}
  background-color: ${AppColors.white};
  z-index: 9999;
`;

const MailWriteScreen = ({navigation}) => {
  const userId = useRecoilValue(UserIdState);
  const userState = useRecoilValue(UserStatusState);

  const [mainText, setMainText] = useState('');
  const [toUserStatus, setToUserStatus] = useState('가족 선택'); // 보낼 가족 별명
  const [toUserId, setToUserId] = useState(''); // 보낼 가족 아이디
  const [isOpen, setIsOpen] = useState(false); // 보낼 가족 선택창 열기 여부

  useEffect(() => {
    handlePressBack();
    return () => handlePressBack();
  }, []);

  const handlePressBack = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.pop();
      return true;
    });
  };

  const {data, status, isLoading, error} = useGetFamilyList({
    onSuccess: () => {},
  });

  const {mutate: postMutate, isLoading: postIsLoading} = usePostMail({
    onSuccess: () => {
      Confirm('편지', '성공적으로 편지를 보냈습니다');
      navigation.navigate('MailTab');
      setMainText('');
    },
  });

  const sendMail = () => {
    if (!toUserId) {
      alert('보낼 가족을 선택해 주세요.');
      return 0;
    } else if (!mainText) {
      alert('보낼 내용을 입력해 주세요.');
      return 0;
    }

    postMutate({mailContent: mainText, receiveUserId: toUserId});
  };

  return (
    <>
      <WithHeader title="편지 쓰기" isBack={true} isLoading={postIsLoading}>
        <PaperContainer>
          <AppContainer.Paper>
            <CustomSelectBox
              data={data}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              toUserStatus={toUserStatus}
              setToUserStatus={setToUserStatus}
              userId={userId}
              setToUserId={setToUserId}
              toUserId={toUserId}
            />
            <MainInput
              multiline={true}
              textAlignVertical="top"
              value={mainText}
              onChangeText={setMainText}
              contextMenuHidden={isOpen}
              editable={!isOpen}
              style={{color: 'black'}}
            />
          </AppContainer.Paper>
          <SendBox>
            <AppFonts.SubTitle>
              From. <AppFonts.SubTitle>{userState}</AppFonts.SubTitle>
            </AppFonts.SubTitle>
          </SendBox>
        </PaperContainer>
      </WithHeader>
      <AppButtons.FullButton
        title="보내기"
        disabled={mainText == '' || toUserId == ''}
        onPress={() => {
          sendMail();
        }}
      />
    </>
  );
};

const CustomSelectBox = ({
  data,
  isOpen,
  setIsOpen,
  toUserStatus,
  setToUserStatus,
  userId,
  setToUserId,
  toUserId,
}) => {
  return (
    <PaperTop>
      <ToBox>
        <AppFonts.SubTitle>To.</AppFonts.SubTitle>
      </ToBox>
      <SelectBox>
        <SelectTitle
          onPress={() => {
            setIsOpen(!isOpen);
          }}>
          <AppFonts.SubTitle>{toUserStatus}</AppFonts.SubTitle>
          <AppIcons.Down />
        </SelectTitle>
        {isOpen && (
          <SelectItems>
            {data?.length === 1 && (
              <AlertBox>
                <AppFonts.Body2>보낼 가족이 없습니다.</AppFonts.Body2>
                <AppFonts.Body2>가족 구성원을 초대해 주세요!</AppFonts.Body2>
              </AlertBox>
            )}
            {data?.map(family => {
              return (
                <React.Fragment key={family.userId}>
                  {family.userId !== userId && family.userId !== toUserId && (
                    <SelectItem
                      key={family.userId}
                      onPress={() => {
                        setToUserStatus(family.userStatus);
                        setToUserId(family.userId);
                        setIsOpen(!isOpen);
                      }}>
                      <AppFonts.Body2>{family.userStatus}</AppFonts.Body2>
                    </SelectItem>
                  )}
                </React.Fragment>
              );
            })}
          </SelectItems>
        )}
      </SelectBox>
    </PaperTop>
  );
};

export default MailWriteScreen;
