import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from '../screens/CalendarScreen';
import Home from '../screens/HomeScreen';
import Qa from '../screens/QaScreen';
import Profile from '../screens/ProfileScreen';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {height: 66, position: 'absolute'},
        tabBarActiveTintColor: '#e91e63',
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Qa"
        component={Qa}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
