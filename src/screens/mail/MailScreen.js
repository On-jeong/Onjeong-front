import React from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {FontStyle} from '@/utils/GlobalFonts';
import {TouchableOpacity} from 'react-native';
import {AppColors} from '@/utils/GlobalStyles';
import { AppIconButtons } from '../../components/IconButtons';

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
`;

const MailScreen = ({navigation}) => {
  return (
    <NoHeader title={'우편함'} isBack={true} navigation={navigation}>
      <>
        <TopBar>
          <Filter>
            <TouchableOpacity>
              <FontStyle.ContentB>받은 우편함</FontStyle.ContentB>
            </TouchableOpacity>
            <FontStyle.ContentB> / </FontStyle.ContentB>
            <TouchableOpacity>
              <FontStyle.ContentB>보낸 우편함</FontStyle.ContentB>
            </TouchableOpacity>
            <Alert>
             <AppIconButtons.Alert onPress={()=>{}}/>
            </Alert>
          </Filter>
          <Filter>
            <TouchableOpacity>
              <AppIconButtons.Pencil
                style={{marginRight: 8}}
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
      </>
    </NoHeader>
  );
};

export default MailScreen;
