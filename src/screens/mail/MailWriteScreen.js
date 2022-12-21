import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import {AppColors, windowHeight} from '@/utils/GlobalStyles';
import {FontStyle} from '@/utils/GlobalFonts';
import {useRecoilValue} from 'recoil';
import {UserIdState, UserNameState} from '../../state/UserData';
import {usePostMail} from '../../hooks/useMailData';
import {useGetFamilyList} from '../../hooks/useProFileData';
import {AppButtons} from '../../components/buttons';

export const PaperContainer = styled.View`
  flex: 1;
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
  align-items: center;
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
  margin-left: 30px;
  margin-top: 5px;
  align-self: flex-start;
`;

const SelectItem = styled.TouchableOpacity`
  padding: 5px;
  border: 1px solid ${AppColors.border};
  margin-bottom: -1px;
`;

const MailWriteScreen = ({navigation}) => {
  const userId = useRecoilValue(UserIdState);
  const userName = useRecoilValue(UserNameState);

  const [mainText, setMainText] = useState('');
  const [toUserStatus, setToUserStatus] = useState(''); // 보낼 가족 별명
  const [toUserId, setToUserId] = useState(''); // 보낼 가족 아이디
  const [isOpen, setIsOpen] = useState(false); // 보낼 가족 선택창 열기 여부

  const {data, status, isLoading, error} = useGetFamilyList();
  if (error) console.log(error);

  const {mutate} = usePostMail(navigation);

  const sendMail = () => {
    if (!toUserId) {
      alert('보낼 가족을 선택해 주세요.');
      return 0;
    } else if (!mainText) {
      alert('보낼 내용을 입력해 주세요.');
      return 0;
    }

    mutate({mailContent: mainText, receiveUserId: toUserId});
  };

  return (
    <NoHeader isBack={true} navigation={navigation}>
      <>
        <PaperContainer>
          <Paper>
            <PaperTop
              onPress={() => {
                setIsOpen(!isOpen);
              }}>
              <FontStyle.ContentB>
                To. <FontStyle.ContentB>{toUserStatus}</FontStyle.ContentB>
              </FontStyle.ContentB>
            </PaperTop>
            {isOpen && (
              <SelectBox>
                {data?.data?.data.length === 1 && (
                  <>
                    <FontStyle.Content>보낼 가족이 없습니다.</FontStyle.Content>
                    <FontStyle.Content>
                      가족 구성원을 초대해 주세요.
                    </FontStyle.Content>
                  </>
                )}
                {data?.data?.data.map(family => {
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
                          <FontStyle.Content>
                            {family.userStatus}
                          </FontStyle.Content>
                        </SelectItem>
                      )}
                    </React.Fragment>
                  );
                })}
              </SelectBox>
            )}
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
              <FontStyle.ContentB>
                From. <FontStyle.ContentB>{userName}</FontStyle.ContentB>
              </FontStyle.ContentB>
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
    </NoHeader>
  );
};

export default MailWriteScreen;
