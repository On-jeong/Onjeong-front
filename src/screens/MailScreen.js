import React from 'react';
import styled from 'styled-components';
import NoHeader from '../components/NoHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import {FontStyle} from '../utils/GlobalFonts';

const Filter = styled.View`
  width: 90%;
  flex-direction: row;
  justify-content: flex-end;
`;

const MailBox = styled.View`
  align-items: center;
`;

const Mail = styled.View`
  width: 85%;
  height: 100px;
  border-width: 2px;
  border-color: #c9c3a3;
  background-color: #fffcf3;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const MailScreen = ({navigation}) => {
  return (
    <NoHeader
      title={'우편함'}
      leftIcon={<Entypo name="chevron-left" size={20} />}
      leftOnPress={() => {
        navigation.goBack();
      }}>
      <Filter>
        <FontStyle.ContentB>받은 우편함 / 보낸 우편함</FontStyle.ContentB>
      </Filter>
      <ScrollView>
        <MailBox>
          <Mail></Mail>
          <Mail></Mail>
          <Mail></Mail>
          <Mail></Mail>
          <Mail></Mail>
          <Mail></Mail>
          <Mail></Mail>
          <Mail></Mail>
        </MailBox>
      </ScrollView>
    </NoHeader>
  );
};

export default MailScreen;
