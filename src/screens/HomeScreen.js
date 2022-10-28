import React from 'react';
import {FontStyle} from '../utils/GlobalFonts';
import {BasicHeader} from '../components/WithHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {
  UserBirthState,
  UserIdState,
  UserNameState,
  UserStatusState,
} from '../state/UserData';

export const HomeScreen = ({navigation}) => {
  const [userId, setUserId] = useRecoilState(UserIdState);
  const [userName, setUserName] = useRecoilState(UserNameState);
  const [userBirth, setUserBirth] = useRecoilState(UserBirthState);
  const [userStatus, setUserStatus] = useRecoilState(UserStatusState);

  console.log(
    '리코일: ' + JSON.stringify(userId),
    JSON.stringify(userName),
    JSON.stringify(userBirth),
    JSON.stringify(userStatus),
    JSON.stringify(userId),
  );

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
