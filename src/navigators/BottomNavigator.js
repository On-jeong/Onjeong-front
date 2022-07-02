import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calender from '../screens/CalenderScreen';
import Home from '../screens/HomeScreen';
import Qa from '../screens/QaScreen';
import Profile from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {height: 66, position: 'absolute'},
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        tabBarShowLabel: true,
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Calender" component={Calender} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Qa" component={Qa} />
    </Tab.Navigator>
  );
}
