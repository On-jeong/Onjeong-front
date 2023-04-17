import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';

import {FlatList, ScrollView} from 'react-native';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {
  useDeleteReceiveMail,
  useDeleteSendMail,
  useGetReceiveMails,
  useGetSendMails,
} from '../../hooks/useMailData';
import {useFocusEffect} from '@react-navigation/native';
import {AppComponents} from '@/components/Components';
import {AppButtons} from '../../components/buttons';
import EmptyComponent from '@/components/Loading/EmptyComponent';
import {useRecoilState} from 'recoil';
import {
  IsReceivePageState,
  ReceiveMailsState,
  SendMailsState,
} from '@/state/MailData';
import {BasicHeader} from '@/components/headers/WithHeader';
import {AppIcons} from '@/ui/icons';
import {AppContainer} from '@/components/container';
import {format} from 'date-fns';

const TopBar = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Filter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Alert = styled.View`
  margin-left: 5px;
`;

const Mail = styled.TouchableOpacity`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 5px;
  padding-top: 0;
`;

const FromBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const DeleteIconBox = styled.View`
  position: absolute;
  top: -18px;
  left: -20px;
  padding: 10px;
`;

const ReadIconBox = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const NewButton = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  bottom: 88px;
  width: 64px;
  height: 64px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: ${AppColors.Primary};
`;

const MailScreen = ({navigation}) => {
  // 받은 우편함인지 보낸 우편함인지 구분
  const [isReceivePageState, setIsReceivePageState] =
    useState(IsReceivePageState);
  // 받은 메일
  const [receiveMailsState, setReceiveMailsState] =
    useRecoilState(ReceiveMailsState);
  // 보낸 메일
  const [sendMailsState, setSendMailsState] = useRecoilState(SendMailsState);

  // 받은 메일 or 보낸 메일
  const mails = {
    0: sendMailsState,
    1: receiveMailsState,
  };

  // 삭제 버튼 클릭 여부
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    setIsReceivePageState(true);
  }, []);

  // 뒤로가기로 화면이 포커스 됐을 때도 업데이트
  useFocusEffect(
    useCallback(() => {
      isReceivePageState ? refetch() : sendRefetch();
      setIsDelete(false);
    }, []),
  );
  const {
    data: receiveData,
    isLoading: receiveIsLoading,
    isError: receiveIsError,
    refetch,
  } = useGetReceiveMails({
    onSuccess: data => {
      setReceiveMailsState(data?.data?.data);
    },
  });
  const {
    data: sendData,
    isLoading: sendIsLoading,
    isError: sendIsError,
    refetch: sendRefetch,
  } = useGetSendMails({
    onSuccess: data => {
      setSendMailsState(data?.data?.data);
    },
  });
  const {mutate: delReceiveMail} = useDeleteReceiveMail();
  const {mutate: delSendMail} = useDeleteSendMail();

  const receiveMails = () => {
    setIsReceivePageState(true);
    refetch();
    setReceiveMailsState(receiveData?.data?.data);
  };

  const sendMails = () => {
    setIsReceivePageState(false);
    sendRefetch();
    setSendMailsState(sendData?.data?.data);
  };

  const mailOnPress = mail => {
    if (isDelete) {
      // 메일 삭제 요청
      if (isReceivePageState) delReceiveMail(mail.mailId);
      else delSendMail(mail.mailId);
      isReceivePageState
        ? setReceiveMailsState(
            receiveMailsState.filter(it => it.mailId !== mail.mailId),
          )
        : setSendMailsState(
            sendMailsState.filter(it => it.mailId !== mail.mailId),
          );
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
    <BasicHeader
      title={'우편함'}
      isLoading={isReceivePageState ? receiveIsLoading : sendIsLoading}
      isError={isReceivePageState ? receiveIsError : sendIsError}>
      <>
        <TopBar>
          <Filter>
            <AppButtons.BasicButton
              title={'받은 편지'}
              color={
                isReceivePageState ? AppColors.Primary : AppColors.Background
              }
              onPress={() => receiveMails()}
            />
            <AppButtons.BasicButton
              title={'보낸 편지'}
              color={
                !isReceivePageState ? AppColors.Primary : AppColors.Background
              }
              onPress={() => sendMails()}
            />
          </Filter>
          <AppComponents.IconButton
            icon={<AppIcons.Trash />}
            padding={{padding: 10, paddingRight: 5}}
            disabled={false}
            onPress={() => setIsDelete(!isDelete)}
          />
        </TopBar>

        <EmptyComponent
          isEmpty={mails[isReceivePageState ? 1 : 0]?.length === 0}
          title1={
            isReceivePageState
              ? '받은 메일이 없습니다.'
              : '보낸 메일이 없습니다.'
          }>
          <ScrollView>
            <AppContainer.Basic>
              <FlatList
                data={mails[isReceivePageState ? 1 : 0]}
                renderItem={item =>
                  MailList(item, isDelete, isReceivePageState, mailOnPress)
                }
                keyExtractor={(mail, index) => mail.mailId}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 20}}
              />
            </AppContainer.Basic>
            <AppComponents.EmptyBox height={70} />
          </ScrollView>
        </EmptyComponent>
        <NewButton
          onPress={() => {
            setIsDelete(false);
            navigation.navigate('MailWrite');
          }}>
          <AppIcons.Add />
        </NewButton>
      </>
    </BasicHeader>
  );
};

const MailList = ({item}, isDelete, isReceivePageState, mailOnPress) => {
  console.log(item);
  return (
    <Mail
      key={item.mailId}
      onPress={() => mailOnPress(item)}
      isDelete={isDelete}>
      <AppContainer.Paper padding={{padding: 15}} elevation={isDelete ? 7 : 0}>
        {/* 안읽은 메일 표시 (받은 메일함만) */}
        {!item.checkRead && isReceivePageState && (
          <ReadIconBox>
            <AppIcons.DotPink />
          </ReadIconBox>
        )}
        {isDelete && (
          <DeleteIconBox>
            <AppIcons.CancelSmall />
          </DeleteIconBox>
        )}
        <AppFonts.Body2 numberOfLines={2} ellipsizeMode="tail">
          {item.mailContent}
        </AppFonts.Body2>
        <FromBox>
          <AppFonts.Caption color={AppColors.Gray700}>
            {format(new Date(item.sendTime), 'yyyy.MM.dd')}
          </AppFonts.Caption>
          <AppFonts.SubTitle>
            {isReceivePageState ? 'From. ' : 'To. '}
            <AppFonts.SubTitle>
              {isReceivePageState ? item.sendUserName : item.receiveUserName}
            </AppFonts.SubTitle>
          </AppFonts.SubTitle>
        </FromBox>
      </AppContainer.Paper>
    </Mail>
  );
};

export default MailScreen;
