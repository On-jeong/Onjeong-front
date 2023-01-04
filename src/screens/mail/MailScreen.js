import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/headers/NoHeader';

import {ScrollView} from 'react-native';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppIconButtons} from '@/components/IconButtons';
import {
  useDeleteReceiveMail,
  useDeleteSendMail,
  useGetReceiveMails,
  useGetSendMails,
} from '../../hooks/useMailData';
import {useFocusEffect} from '@react-navigation/native';
import {Components} from '../../utils/Components';
import {AppButtons} from '../../components/buttons';
import EmptyComponent from '@/components/Loading/EmptyComponent';
import {useRecoilState, useRecoilValue} from 'recoil';
import {NotReadMailsState, ReceiveMailsState} from '@/state/MailData';

const TopBar = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const Filter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Alert = styled.View`
  margin-left: 5px;
`;

const MailBox = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

const Mail = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  margin-top: 12px;
  margin-bottom: 5px;
  padding: 10px;
  elevation: ${props => (props.isDelete ? 7 : 0)};
`;

const FromBox = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const DeleteIconBox = styled.View`
  position: absolute;
  top: -10px;
  left: -10px;
`;
const ReadIconBox = styled.View`
  position: absolute;
  top: -9px;
  left: -9px;
`;

const MailScreen = ({navigation}) => {
  useEffect(() => {
    setIsReceive(true);
  }, []);

  //뒤로가기로 화면이 포커스 됐을 때도 업데이트
  useFocusEffect(
    useCallback(() => {
      refetch();
      sendRefetch();
    }, [receiveData]),
  );
  const {
    data: receiveData,
    isLoading: receiveIsLoading,
    isError: receiveIsError,
    refetch,
  } = useGetReceiveMails({
    onSuccess: data => {
      setMails(data?.data?.data);
      setReceiveMailsState(data?.data?.data);
    },
  });
  const {
    data: sendData,
    isLoading: sendIsLoading,
    isError: sendIsError,
    refetch: sendRefetch,
  } = useGetSendMails();
  const {mutate: delReceiveMail} = useDeleteReceiveMail();
  const {mutate: delSendMail} = useDeleteSendMail();

  const [receiveMailsState, setReceiveMailsState] =
    useRecoilState(ReceiveMailsState);

  const [mails, setMails] = useState(receiveData?.data?.data);
  const [isReceive, setIsReceive] = useState(true); // 받은 우편함인지 보낸 우편함인지 구분
  const [isDelete, setIsDelete] = useState(false);
  console.log('mails', mails);

  const receiveMails = () => {
    setIsReceive(true);
    refetch();
    setReceiveMailsState(receiveData?.data?.data);
    setMails(receiveData?.data?.data);
  };

  const sendMails = () => {
    setIsReceive(false);
    sendRefetch();
    setMails(sendData?.data?.data);
  };

  const mailOnPress = mail => {
    if (isDelete) {
      // 메일 삭제 요청
      if (isReceive) delReceiveMail(mail.mailId);
      else delSendMail(mail.mailId);
      setMails(mails.filter(it => it.mailId !== mail.mailId));
    } else {
      navigation.navigate('MailDetail', {
        mailContent: mail.mailContent,
        receiveUserName: mail.receiveUserName,
        sendUserName: mail.sendUserName,
        mailId: mail.mailId,
      });
    }
  };

  return (
    <NoHeader
      title={'우편함'}
      isBack={true}
      navigation={navigation}
      isLoading={isReceive ? receiveIsLoading : sendIsLoading}
      isError={isReceive ? receiveIsError : sendIsError}>
      <>
        <TopBar>
          <Filter>
            <AppButtons.TextButton.Content
              title={'받은 우편함'}
              bold={isReceive}
              onPress={() => receiveMails()}
            />
            <FontStyle.Content> / </FontStyle.Content>
            <AppButtons.TextButton.Content
              title={'보낸 우편함'}
              bold={!isReceive}
              onPress={() => sendMails()}
            />
            <Alert>
              <AppIconButtons.Alert onPress={() => {}} />
            </Alert>
          </Filter>
          <Filter>
            <AppIconButtons.Pencil
              padding={{paddingRight: 8}}
              disabled={false}
              onPress={() => {
                setIsDelete(false);
                navigation.navigate('MailWrite');
              }}
            />
            <AppIconButtons.Delete
              disabled={false}
              onPress={() => setIsDelete(!isDelete)}
            />
          </Filter>
        </TopBar>

        <EmptyComponent
          isEmpty={mails?.length === 0}
          title1={
            isReceive ? '받은 메일이 없습니다.' : '보낸 메일이 없습니다.'
          }>
          <ScrollView>
            <MailBox>
              {mails?.map(mail => (
                <Mail
                  key={mail.mailId}
                  onPress={() => mailOnPress(mail)}
                  isDelete={isDelete}>
                  {/* 안읽은 메일 표시 (받은 메일함만, 삭제중이 아닐 때) */}
                  {!mail.checkRead && isReceive && !isDelete && (
                    <ReadIconBox>
                      <Components.Circle
                        color={AppColors.green1}
                        width={21}
                        height={21}>
                        <FontStyle.SubContentB>1</FontStyle.SubContentB>
                      </Components.Circle>
                    </ReadIconBox>
                  )}
                  {isDelete && (
                    <DeleteIconBox>
                      <AppIconButtons.Cancel />
                    </DeleteIconBox>
                  )}
                  <FontStyle.Content numberOfLines={2} ellipsizeMode="tail">
                    {mail.mailContent}
                  </FontStyle.Content>
                  <FromBox>
                    <FontStyle.ContentB>
                      {isReceive ? 'From. ' : 'To. '}
                      <FontStyle.ContentB>
                        {isReceive ? mail.sendUserName : mail.receiveUserName}
                      </FontStyle.ContentB>
                    </FontStyle.ContentB>
                  </FromBox>
                </Mail>
              ))}
              <Components.EmptyBox height={50} />
            </MailBox>
          </ScrollView>
        </EmptyComponent>
      </>
    </NoHeader>
  );
};

export default MailScreen;
