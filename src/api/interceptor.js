import {storage} from '@/config/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import customAxios, {refreshAxios} from './axios';

//
// hook 사용 위해 response interceptor component 따로 생성
//

export const Interceptor = ({children}) => {
  const navigation = useNavigation();

  customAxios.interceptors.response.use(
    res => res,
    async err => {
      console.log(err);

      const prevRequest = err?.config;

      // 401에러 -> 기간이 만료된 access토큰이라고 판단
      // prevRequest.sent로 중복 요청인지 판단
      if (
        err?.response?.data?.status === 401 &&
        err?.response?.data?.error === 'Unauthorized' &&
        !prevRequest.sent
      ) {
        prevRequest.sent = true; // 중복 요청 방지

        // 새로운 access token 받아오기
        refreshAxios
          .post('/refresh')
          .then(res => {
            console.log('엑세스 토큰을 새로 발급받았습니다.');
            console.log('newAccessToken: ', res.headers.authorizationaccess);
            console.log('prevRequest: ', prevRequest);

            prevRequest.headers['AuthorizationAccess'] =
              res.headers.authorizationaccess;
            customAxios.defaults.headers.common['AuthorizationAccess'] =
              res.headers.authorizationaccess;
            refreshAxios.defaults.headers.common['AuthorizationAccess'] =
              res.headers.authorizationaccess;

            storage.setItem('accessToken', res.headers.authorizationaccess);
            return axios(prevRequest);
          })
          .catch(err => {
            // 리프레쉬 토큰이 만료됐거나 맞지 않을 경우
            console.log('리프레시 만료됨:', err?.response.data);

            if (err?.response?.data?.status === 401) {
              alert('세션이 만료되어 로그인 화면으로 이동합니다.');
              AsyncStorage.clear();
              navigation.navigate('SignIn');
            }
            return Promise.reject(err);
          });
      }

      return Promise.reject(err);
    },
  );

  return children;
};
