import axios from 'axios';
import {BASE_URL} from '@/config/api';
import {storage} from '@/config/storage';

export default axios.create({
  baseURL: BASE_URL,
});

export const refreshAxios = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  async config => {
    if (!config.headers['AuthorizationAccess']) {
      config.headers['AuthorizationAccess'] = await storage.getItem(
        'accessToken',
      );
    }
    console.log('prevRequest: ', prevRequest);
    console.log('newAccessToken: ', newAccessToken);
    return config;
  },
  err => Promise.reject(err),
);

axios.interceptors.response.use(
  res => res,
  async err => {
    console.log(err);
    const refresh = useRefreshToken();

    const prevRequest = err?.config;

    // 401에러 -> 기간이 만료된 access토큰이라고 판단
    if (
      err?.response?.status === 401 &&
      err?.response?.message === 'REFRESH TOKEN EXPIRED'
    ) {
      prevRequest.sent = true;
      // 새로운 refresh token 받아오기
      const newAccessToken = await refresh();
      prevRequest.headers['AuthorizationAccess'] = newAccessToken;
      console.log('prevRequest: ', prevRequest);
      console.log('newAccessToken: ', newAccessToken);
      return axios(prevRequest);
    }

    return Promise.reject(err);
  },
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
