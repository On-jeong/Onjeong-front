import * as React from 'react';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from 'react-native-recoil-persist';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';

import {FontStyle} from './src/utils/GlobalFonts';

//fcm
import messaging from '@react-native-firebase/messaging';
import {storage} from '@/config/storage';
import {Interceptor} from '@/api/interceptor';

export default function App() {
  const queryClient = new QueryClient();

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
            fallback={<FontStyle.Content>Loading...</FontStyle.Content>}>
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
}
