import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {BottomNavigator} from './BottomNavigator';
import MailScreen from '@/screens/mail/MailScreen';
import MailWriteScreen from '@/screens/mail/MailWriteScreen';
import PostWriteScreen from '@/screens/post/PostWriteScreen';
import MyScreen from '@/screens/MyScreen';
import AlertScreen from '@/screens/AlertScreen';
import PostScreen from '@/screens/post/PostScreen';
import SignUpScreen from '@/screens/sign/SignUpScreen';
import SignInScreen from '@/screens/sign/SignInScreen';
import ProfileDetailScreen from '../screens/profile/ProfileDetailScreen';
import MailDetailScreen from '../screens/mail/MailDetailScreen';

const Stack = createStackNavigator();

export function StackNavigator(navigation) {

  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Home" component={BottomNavigator} />
      <Stack.Screen name="Mail" component={MailScreen} />
      <Stack.Screen name="MailWrite" component={MailWriteScreen} />
      <Stack.Screen name="MailDetail" component={MailDetailScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="PostWrite" component={PostWriteScreen} />
      <Stack.Screen name="My" component={MyScreen} />
      <Stack.Screen name="Alert" component={AlertScreen} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </Stack.Navigator>
  );
}
