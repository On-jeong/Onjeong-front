import * as React from 'react';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from 'react-native-recoil-persist';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';

import codePush from 'react-native-code-push';

//fcm
import messaging from '@react-native-firebase/messaging';
import {storage} from '@/config/storage';
import {Interceptor} from '@/api/interceptor';
import {LoadingBox} from '@/components/Loading/LoadingComponent';
import {ActivityIndicator} from 'react-native';
import {AppColors} from '@/utils/GlobalStyles';

// 업데이트 체크
const updateCheck = async () => {
  const update = await codePush.checkForUpdate();
  console.log('업데이트 체크 : ', update);
};

const App = () => {
  const queryClient = new QueryClient();

  React.useEffect(() => {
    updateCheck();
  }, []);

  const foregroundListener = React.useCallback(() => {
    messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage.notification.body));
      //alert(JSON.stringify(remoteMessage.notification.body));
    });
  }, []);

  // fcm token 가져와서 storage에 저장
  const getFCMToken = async () => {
    let fcmToken = await storage.getItem('fcmToken');
    console.log('old fcmToken: ', fcmToken);
    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('new fcmToken: ', fcmToken);
          await storage.setItem('fcmToken', fcmToken);
        }
      } catch (err) {
        console.log(err, 'fcmtoken에서 error 발생');
      }
    }
  };

  React.useEffect(() => {
    getFCMToken();
    foregroundListener();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
          <React.Suspense
            fallback={
              <LoadingBox>
                <ActivityIndicator size={'large'} color={AppColors.Primary} />
              </LoadingBox>
            }>
            <NavigationContainer>
              <Interceptor>
                <StackNavigator />
              </Interceptor>
            </NavigationContainer>
          </React.Suspense>
        </ReactNativeRecoilPersistGate>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default codePush(App);
