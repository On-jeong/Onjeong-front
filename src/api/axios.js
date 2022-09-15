import axios from 'axios';
import {BASE_URL} from '@/config/api';
import {storage} from '@/config/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default axios.create({
  baseURL: BASE_URL,
});

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    AuthorizationRefresh: storage.getItem('refreshToken'),
    AuthorizationAccess: storage.getItem('accessToken'),
  },
});

axios.interceptors.request.use(
  config => {
    if (!config.headers['AuthorizationAccess']) {
      config.headers['AuthorizationAccess'] = storage.getItem('accessToken');
      config.headers['AuthorizationRefresh'] = storage.getItem('refreshToken');
    }
    return config;
  },
  err => Promise.reject(err),
);

axios.interceptors.response.use(
  res => res,
  async err => {
    console.log(err);
    const refresh = useRefreshToken();
    const navigation = useNavigation();

    const prevRequest = err?.config;
    // 기간이 만료된 access토큰일 경우 -> 403에러
    // 존재하지 않는 access토큰일 경우 -> !prevRequest?.sent
    if (err?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refresh();
      prevRequest.headers['AuthorizationAccess'] = newAccessToken;
      console.log('prevRequest: ', prevRequest);
      console.log('newAccessToken: ', newAccessToken);
      return axios(prevRequest);
    }
    // refresh 토큰이 만료된 경우
    else if (err?.response?.status === 460) {
      await AsyncStorage.clear();
      alert('세션이 만료되어 로그인 화면으로 이동합니다.');
      navigation.navigate('SignIn');
    }
    return Promise.reject(err);
  },
);
