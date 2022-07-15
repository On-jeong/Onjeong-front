import {BasicHeader} from '../components/WithHeader';
import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {Email} from './MyScreen';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Components } from '../utils/Components';

const Menu = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const AlertScreen = ({navigation}) => {
  return (
    <BasicHeader title={'온정'} isBack={true} navigation={navigation}>
      <Menu>
        <FontStyle.ContentB>온정에 오신 것을 환영합니다!</FontStyle.ContentB>
      </Menu>
      <Components.HorizonLine />
      <Email>
        <Ionicons name="alert-circle-outline" size={15} />
        <FontStyle.SubContent>
          {' '}3일이 지나면 알림이 사라집니다.
        </FontStyle.SubContent>
      </Email>
    </BasicHeader>
  );
};

export default AlertScreen;
