import axios from 'axios';
import {BASE_URL} from '@/config/api';
import {storage} from '@/config/storage';

const customAxios = axios.create({
  baseURL: BASE_URL,
});

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
});

export default customAxios;

// 엑세스 토큰 추가해서 보내기 (로그인 돼있을 때만)
customAxios.interceptors.request.use(
  async config => {
    const accessToken = await storage.getItem('accessToken');

    if (accessToken && !config.headers['AuthorizationAccess']) {
      config.headers['AuthorizationAccess'] = await storage.getItem(
        'accessToken',
      );
    }
    // config.headers['AuthorizationAccess'] = '0';

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
