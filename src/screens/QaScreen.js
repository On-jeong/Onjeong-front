import React from 'react';
import WithHeader from '../components/WithHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styled from 'styled-components';
import {ScrollView, TouchableOpacity} from 'react-native';
import {FontStyle} from '../utils/GlobalFonts';
import {AppColors} from '../utils/GlobalStyles';
import {EmptyBox} from './ProfileScreen';

const IconBox = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-top: 5px;
  padding-right: 7%;
`;

const QuestBox = styled.View`
  width: 100%;
  padding-left: 7%;
  padding-right: 7%;
  margin-top: 30px;
`;

const AnsContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 7%;
  padding-right: 7%;
`;

const AnsBox = styled.View`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Ans = styled.View`
  width: 100%;
  height: 100px;
  border-width: 2px;
  border-radius: 12px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function QaScreen() {
  return (
    <WithHeader
      title="이 주의 문답"
      rightIcon1={<Octicons name="bell" size={20} />}
      rightIcon2={<Octicons name="person" size={21} />}>
      <QuestBox>
        <FontStyle.ContentB>
          질문 :{' '}
          <FontStyle.Content>
            꺳잎 논쟁에 대해 어떻게 생각하세요?
          </FontStyle.Content>
        </FontStyle.ContentB>
      </QuestBox>
      <IconBox>
        <TouchableOpacity>
          <SimpleLineIcons name="pencil" size={18} style={{marginRight: 8}} />
        </TouchableOpacity>
      </IconBox>

      <ScrollView>
        <AnsContainer>
          <AnsBox>
            <FontStyle.ContentB>아빠</FontStyle.ContentB>
            <Ans></Ans>
          </AnsBox>
          <AnsBox>
            <FontStyle.ContentB>엄마</FontStyle.ContentB>
            <Ans></Ans>
          </AnsBox>
          <AnsBox>
            <FontStyle.ContentB>딸</FontStyle.ContentB>
            <Ans></Ans>
          </AnsBox>
          <AnsBox>
            <FontStyle.ContentB>아들</FontStyle.ContentB>
            <Ans></Ans>
          </AnsBox>
          <EmptyBox />
        </AnsContainer>
      </ScrollView>
    </WithHeader>
  );
}
