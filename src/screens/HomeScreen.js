import {View, Text} from 'react-native';
import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import WithHeader from '../components/WithHeader';
import Octicons from 'react-native-vector-icons/Octicons';

export default function HomeScreen() {
  return (
    <WithHeader
      title="온정"
      rightIcon1={<Octicons name="bell" size={20} />}
      rightIcon2={<Octicons name="person" size={21} />}
      >
      <FontStyle.Title>여기는 홈입니당</FontStyle.Title>
      <FontStyle.Content style={{fontFamily: 'GangwonLight', fontSize: 17}}>
        여기는 홈입니당
      </FontStyle.Content>
    </WithHeader>
  );
}
