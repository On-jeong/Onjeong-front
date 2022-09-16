import axios from 'axios';
import {BASE_URL} from '@/config/api';
import {storage} from '@/config/storage';

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

    const prevRequest = err?.config;
    // 401에러 -> 기간이 만료된 access토큰이라고 판단
    // !prevRequest?.sent -> 존재하지 않는 access토큰일 경우
    if (err?.response?.status === 401 && !prevRequest?.sent) {
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
