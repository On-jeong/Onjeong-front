import {View, Text} from 'react-native';
import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import WithHeader from '../components/WithHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
  return (
    <WithHeader
      title="온정"
      rightIcon1={<Octicons name="bell" size={20} />}
      rightIcon2={<Octicons name="person" size={21} />}>
      <TouchableOpacity onPress={()=>navigation.navigate('Mail')}>
        <MaterialCommunityIcons name="mailbox-open-up-outline" size={40} />
      </TouchableOpacity>
      <FontStyle.Content style={{fontFamily: 'GangwonLight', fontSize: 17}}>
        여기는 홈입니당
      </FontStyle.Content>
    </WithHeader>
  );
}
