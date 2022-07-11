import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigator} from './BottomNavigator';
import MailScreen from '../screens/MailScreen';
import MailWriteScreen from '../screens/MailWriteScreen';
import PostWriteScreen from '../screens/PostWriteScreen';
import MyScreen from '../screens/MyScreen';
import AlertScreen from '../screens/AlertScreen';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={BottomNavigator} />
      <Stack.Screen name="Mail" component={MailScreen} />
      <Stack.Screen name="MailWrite" component={MailWriteScreen} />
      <Stack.Screen name="PostWrite" component={PostWriteScreen} />
      <Stack.Screen name="My" component={MyScreen} />
      <Stack.Screen name="Alert" component={AlertScreen} />
    </Stack.Navigator>
  );
}
