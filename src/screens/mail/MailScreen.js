import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {FontStyle} from '@/utils/GlobalFonts';
import {TouchableOpacity} from 'react-native';
import {AppColors} from '@/utils/GlobalStyles';
import {AppIconButtons} from '@/components/IconButtons';
import {useGetReceiveMails, useGetSendMails} from '../../hooks/useMailData';
import {useIsFocused} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';

const TopBar = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Filter = styled.View`
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

const Mail = styled.View`
  width: 100%;
  height: 100px;
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
`;

const FromBox = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const MailScreen = ({navigation}) => {
  const isFocus = useIsFocused();
  const queryClient = useQueryClient();

  useEffect(() => {
    refetch();
    sendRefetch();
  }, [isFocus]);

  const {data, isLoading, status, error, refetch} = useGetReceiveMails();
  const {
    data: sendData,
    isLoading: sendLoading,
    status: sendStatus,
    error: sendError,
    refetch: sendRefetch,
  } = useGetSendMails();

  const [mails, setMails] = useState(data?.data);
  const [isReceive, setIsReceive] = useState(true);

  const receiveMails = () => {
    setIsReceive(true);
    setMails(data.data);
  };

  const sendMails = () => {
    setIsReceive(false);
    setMails(sendData.data);
  };

  return (
    <NoHeader title={'우편함'} isBack={true} navigation={navigation}>
      <>
        <TopBar>
          <Filter>
            <TouchableOpacity onPress={() => receiveMails()}>
              <FontStyle.Content bold={isReceive}>
                받은 우편함
              </FontStyle.Content>
            </TouchableOpacity>
            <FontStyle.Content> / </FontStyle.Content>
            <TouchableOpacity onPress={() => sendMails()}>
              <FontStyle.Content bold={!isReceive}>
                보낸 우편함
              </FontStyle.Content>
            </TouchableOpacity>
            <Alert>
              <AppIconButtons.Alert onPress={() => {}} />
            </Alert>
          </Filter>
          <Filter>
            <TouchableOpacity>
              <AppIconButtons.Pencil
                margin={{marginRight: 8}}
                onPress={() => {
                  navigation.navigate('MailWrite');
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="delete" size={20} />
            </TouchableOpacity>
          </Filter>
        </TopBar>
        <ScrollView>
          <MailBox>
            {isLoading && <FontStyle.Content>Loading...</FontStyle.Content>}
            {status == 'success' &&
              (mails?.size == 0 ? (
                <FontStyle.Content>받은 메일이 없습니다.</FontStyle.Content>
              ) : (
                mails.map(mail => (
                  <Mail key={mail.mailId}>
                    <FontStyle.Content numberOfLines={2} ellipsizeMode="tail">
                      {mail.mailContent}
                    </FontStyle.Content>
                    <FromBox>
                      <FontStyle.ContentB>
                        {isReceive?'From. ':'To. '}
                        <FontStyle.ContentB>
                          {mail.receiveUserName}
                        </FontStyle.ContentB>
                      </FontStyle.ContentB>
                    </FromBox>
                  </Mail>
                ))
              ))}
          </MailBox>
        </ScrollView>
      </>
    </NoHeader>
  );
};

export default MailScreen;
