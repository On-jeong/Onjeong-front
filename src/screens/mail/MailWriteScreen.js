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

export const PaperContainer = styled.View`
 // flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

export const Paper = styled.View`
  width: 100%;
  height: ${windowHeight * 0.8}px;
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  padding: 20px;
  padding-top: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
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
  flex-direction: row;
  justify-content: flex-end;
`;

const SelectBox = styled.View`
  margin-left: 10px;
`;

const SelectItem = styled.TouchableOpacity`
  width: 110px;
  height: 38px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  border: 1px solid ${AppColors.border};
  margin-bottom: -1px;
`;

const IconButtons = styled.View`
  margin-left: 10px;
`;

const MailWriteScreen = ({navigation}) => {
  const userId = useRecoilValue(UserIdState);
  const userState = useRecoilValue(UserStatusState);

  const [mainText, setMainText] = useState('');
  const [toUserStatus, setToUserStatus] = useState('가족선택'); // 보낼 가족 별명
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
    <WithHeader isBack={true} navigation={navigation} isLoading={postIsLoading}>
      <>
        <PaperContainer>
          <Paper>
            <PaperTop>
              <ToBox>
                <AppFonts.ContentB>To.</AppFonts.ContentB>
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
            <MainInput
              multiline={true}
              numberOfLines={20}
              textAlignVertical="top"
              value={mainText}
              onChangeText={setMainText}
              onFocus={() => {
                setIsOpen(false);
              }}
            />
            <SendBox>
              <AppFonts.ContentB>
                From. <AppFonts.ContentB>{userState}</AppFonts.ContentB>
              </AppFonts.ContentB>
            </SendBox>
          </Paper>
          <SendBox>
            <AppButtons.TextButton.Content
              title={'보내기'}
              margin={5}
              onPress={() => sendMail()}
            />
          </SendBox>
        </PaperContainer>
      </>
    </WithHeader>
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
          <AppFonts.ContentB>{toUserStatus}</AppFonts.ContentB>
          <AppIconButtons.Down size={15} color={AppColors.border} />
        </SelectItem>
        {isOpen && (
          <>
            {data?.data?.data.length === 1 && (
              <AlertBox>
                <AppFonts.Content>보낼 가족이 없습니다.</AppFonts.Content>
                <AppFonts.Content>
                  가족 구성원을 초대해 주세요!
                </AppFonts.Content>
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
