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
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import { navigationHeight } from './src/utils/GlobalStyles';

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
        <FlipperAsyncStorage />
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}
