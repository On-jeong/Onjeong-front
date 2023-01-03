import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from '../screens/CalendarScreen';
import Home from '../screens/HomeScreen';
import Qa from '../screens/QaScreen';
import Profile from '../screens/profile/ProfileScreen';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppColors, bottomTabHeight} from '../utils/GlobalStyles';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarStyle: {
          height: bottomTabHeight,
          position: 'absolute',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          overflow: 'hidden',
        },
        tabBarInactiveTintColor: AppColors.font,
        tabBarActiveTintColor: AppColors.red2,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: AppColors.main_op,
        tabBarInactiveBackgroundColor: AppColors.main_op,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="home" color={color} size={size + 1} />
          ),
        }}
      />
      <Tab.Screen
        name="CalendarTab"
        component={Calendar}
        options={{
          tabBarIcon: ({color, size}) => (
            <Octicons name="calendar" color={color} size={size - 1} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="QaTab"
        component={Qa}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="comment-question-outline"
              color={color}
              size={size + 2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
