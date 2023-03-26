import React, {useState} from 'react';
import styled from 'styled-components';
import {AppColors, windowHeight} from '@/utils/GlobalStyles';
import {AppFonts} from '@/utils/GlobalFonts';
import {useRecoilValue} from 'recoil';
import {UserIdState, UserStatusState} from '../../state/UserData';
import {usePostMail} from '../../hooks/useMailData';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {AppButtons} from '../../components/buttons';
import {AppIconButtons} from '@/components/IconButtons';
import {WithHeader} from '@/components/headers/WithHeader';
import {PaperInput} from '@/components/inputs/PaperInput';
import {AppIcons} from '@/ui/icons';

export const PaperContainer = styled.View`
 // flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

const PaperTop = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
`;

const ToBox = styled.View`
  height: 38px;
  justify-content: center;
`;

const AlertBox = styled.View`
  margin-top: 10px;
`;

export const MainInput = styled.TextInput`
  flex: 1;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

export const SendBox = styled.View`
  width: 100%;
  padding-top: 2px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: flex-end;
`;

const SelectBox = styled.View``;

const SelectItem = styled.TouchableOpacity`
  width: 100px;
  height: 38px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  margin-bottom: -1px;
`;

const MailWriteScreen = ({navigation}) => {
  const userId = useRecoilValue(UserIdState);
  const userState = useRecoilValue(UserStatusState);

  const [mainText, setMainText] = useState('');
  const [toUserStatus, setToUserStatus] = useState('가족 선택'); // 보낼 가족 별명
  const [toUserId, setToUserId] = useState(''); // 보낼 가족 아이디
  const [isOpen, setIsOpen] = useState(false); // 보낼 가족 선택창 열기 여부

  const {data, status, isLoading, error} = useGetFamilyList();
  if (error) console.log(error);

  const {mutate: postMutate, isLoading: postIsLoading} =
    usePostMail(navigation);

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
      <WithHeader
        title="편지 쓰기"
        isBack={true}
        navigation={navigation}
        isLoading={postIsLoading}>
        <PaperContainer>
          <PaperInput mainText={mainText} setMainText={setMainText}>
            <PaperTop>
              <ToBox>
                <AppFonts.SubTitle>To.</AppFonts.SubTitle>
              </ToBox>
              <CustomSelectBox
                data={data}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                toUserStatus={toUserStatus}
                setToUserStatus={setToUserStatus}
                userId={userId}
                setToUserId={setToUserId}
              />
            </PaperTop>
          </PaperInput>
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
          sendPost();
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
}) => {
  return (
    <>
      <SelectBox>
        <SelectItem
          onPress={() => {
            setIsOpen(!isOpen);
          }}>
          <AppFonts.SubTitle>{toUserStatus}</AppFonts.SubTitle>
          <AppIcons.Down />
        </SelectItem>
        {isOpen && (
          <>
            {data?.data?.data.length === 1 && (
              <AlertBox>
                <AppFonts.Body2>보낼 가족이 없습니다.</AppFonts.Body2>
                <AppFonts.Body2>가족 구성원을 초대해 주세요!</AppFonts.Body2>
              </AlertBox>
            )}
            {data?.data?.data?.map(family => {
              return (
                <React.Fragment key={family.userId}>
                  {family.userId !== userId && (
                    <SelectItem
                      key={family.userId}
                      onPress={() => {
                        setToUserStatus(family.userStatus);
                        setToUserId(family.userId);
                        setIsOpen(!isOpen);
                      }}>
                      <AppFonts.Content>{family.userStatus}</AppFonts.Content>
                    </SelectItem>
                  )}
                </React.Fragment>
              );
            })}
          </>
        )}
      </SelectBox>
    </>
  );
};

export default MailWriteScreen;
