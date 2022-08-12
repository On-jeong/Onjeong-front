/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';

import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {FontStyle} from './src/utils/GlobalFonts';


const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

export default function App({navigation}) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <React.Suspense
            fallback={<FontStyle.Content>Loading</FontStyle.Content>}>
            <FlipperAsyncStorage />
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </React.Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
