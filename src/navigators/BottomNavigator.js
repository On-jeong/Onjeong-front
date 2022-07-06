import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from '../screens/CalendarScreen';
import Home from '../screens/HomeScreen';
import Qa from '../screens/QaScreen';
import Profile from '../screens/ProfileScreen';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors, bottomTabHeight } from '../utils/GlobalStyles';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {height: bottomTabHeight, position: 'absolute'},
        tabBarActiveTintColor: AppColors.red2,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor:AppColors.main,
        tabBarInactiveBackgroundColor:AppColors.main
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
            <MaterialCommunityIcons name="comment-question-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
