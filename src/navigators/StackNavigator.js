import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomNavigator} from './BottomNavigator';
import MailScreen from '../screens/MailScreen';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={BottomNavigator} />
      <Stack.Screen name="Mail" component={MailScreen} />
    </Stack.Navigator>
  );
}
