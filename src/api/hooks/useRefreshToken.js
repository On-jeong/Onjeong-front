import { refreshAxios } from '../axios';

const useRefreshToken = () => {
  const refresh = async () => {
    const res = await refreshAxios.post('/refresh');
    console.log('newRefreshToken: ',res.config.headers.AuthorizationRefresh);
    console.log('newAcsessToken: ',res.config.headers.AuthorizationAccess);
    console.log(res)

    return res.data;
  };

  return refresh;
};

export default useRefreshToken;
