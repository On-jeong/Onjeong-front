import axios from 'axios';
import {BASE_URL} from '@/config/api';
import {storage} from '@/config/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
});

export default customAxios;

customAxios.interceptors.request.use(
  async config => {
    if (!config.headers['AuthorizationAccess']) {
      config.headers['AuthorizationAccess'] = await storage.getItem(
        'accessToken',
      );
    }
    return config;
  },
  err => Promise.reject(err),
);


// 엑세스 및 리프레쉬 토큰 추가해서 보내기
refreshAxios.interceptors.request.use(
  async config => {
    if (!config.headers['AuthorizationAccess']) {
      config.headers['AuthorizationAccess'] = await storage.getItem(
        'accessToken',
      );
    }
    if (!config.headers['AuthorizationRefresh']) {
      config.headers['AuthorizationRefresh'] = await storage.getItem(
        'refreshToken',
      );
    }
    return config;
  },
  err => Promise.reject(err),
);
