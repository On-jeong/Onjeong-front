import {View, Text} from 'react-native';
import React from 'react';
import { FontStyle } from '../utils/GlobalFonts';

export default function HomeScreen() {
  return (
    <View>
      <FontStyle.Title>여기는 홈입니당</FontStyle.Title>
      <FontStyle.Content style={{fontFamily: 'GangwonLight', fontSize: 17}}>
        여기는 홈입니당
      </FontStyle.Content>
    </View>
  );
}
