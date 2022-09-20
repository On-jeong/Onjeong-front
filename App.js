import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';

import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {FontStyle} from './src/utils/GlobalFonts';

//fcm
import messaging from '@react-native-firebase/messaging';
import {storage} from '@/config/storage';
import {Interceptor} from '@/api/intercepter';

export default function App({navigation}) {
  const queryClient = new QueryClient();

  const foregroundListener = React.useCallback(() => {
    messaging().onMessage(async remoteMessage => {
      alert(JSON.stringify(remoteMessage));
    });
  }, []);

  // fcm token 가져오기
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
      <Interceptor>
        <RecoilRoot>
          <React.Suspense
            fallback={<FontStyle.Content>Loading</FontStyle.Content>}>
            <FlipperAsyncStorage />
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </React.Suspense>
        </RecoilRoot>
      </Interceptor>
    </QueryClientProvider>
  );
}
