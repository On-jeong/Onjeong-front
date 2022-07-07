import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigator} from './BottomNavigator';
import MailScreen from '../screens/MailScreen';
import MailWriteScreen from '../screens/MailWriteScreen';
import PostWriteScreen from '../screens/PostWriteScreen';

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
    </Stack.Navigator>
  );
}
