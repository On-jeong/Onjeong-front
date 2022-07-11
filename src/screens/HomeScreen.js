import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {BasicHeader} from '../components/WithHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
  return (
    <BasicHeader title="온정" navigation={navigation}>
      <TouchableOpacity onPress={() => navigation.navigate('Mail')}>
        <MaterialCommunityIcons name="mailbox-open-up-outline" size={40} />
      </TouchableOpacity>
      <FontStyle.Content style={{fontFamily: 'GangwonLight', fontSize: 17}}>
        여기는 홈입니당
      </FontStyle.Content>
    </BasicHeader>
  );
}
