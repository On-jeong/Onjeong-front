import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {refreshAxios} from '../axios';

const useRefreshToken = () => {
  const navigation = useNavigation();
  const refresh = async () => {
    refreshAxios
      .post('/refresh')
      .then(res => {
        console.log('엑세스 토큰을 새로 발급받았습니다.');
        console.log(
          'newRefreshToken: ',
          res.config.headers.AuthorizationRefresh,
        );
        console.log('newAccessToken: ', res.config.headers.AuthorizationAccess);
        console.log(res);
        return res.data;
      })
      .catch(async err => {
        // 리프레쉬 토큰이 만료된 걸로 간주
        await AsyncStorage.clear();
        alert('세션이 만료되어 로그인 화면으로 이동합니다.');
        navigation.navigate('SignIn');
        return false;
      });
  };

  return refresh;
};

export default useRefreshToken;
