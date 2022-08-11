import React, {useEffect} from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {BasicHeader} from '../components/WithHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGetUserData} from '../hooks/useUserData';
import {useMutation, useQuery} from '@tanstack/react-query';
import {storage} from '../config/storage';
import axios from 'axios';
import {API} from '@/config/api';

export const HomeScreen = ({navigation}) => {
  const {status, data, error} = useGetUserData();
  // console.log('status: ' + status);
  // if (error) console.log('error: ' + error);
  // if (status != 'loading') console.log('data: ' + data);

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
};

export default HomeScreen;
