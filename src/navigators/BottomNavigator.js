import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from '../screens/CalendarScreen';
import Home from '../screens/HomeScreen';
import Qa from '../screens/QaScreen';
import Profile from '../screens/profile/ProfileScreen';
import Mail from '@/screens/mail/MailScreen';
import {AppColors, bottomTabHeight} from '../utils/GlobalStyles';
import {AppIcons} from '@/ui/icons';
import {useRecoilValue} from 'recoil';
import {NotReadMailsState} from '@/state/MailData';

const Tab = createBottomTabNavigator();

export function BottomNavigator() {
  const notReadMailsState = useRecoilValue(NotReadMailsState);

  console.log('안읽은 메일', notReadMailsState);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarStyle: {
          height: bottomTabHeight,
          position: 'absolute',
          overflow: 'hidden',
        },
        tabBarInactiveTintColor: false,
        tabBarActiveTintColor: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: AppColors.white,
        tabBarInactiveBackgroundColor: AppColors.white,
      }}
      animationEnabled={false}>
      <Tab.Screen
        name="QaTab"
        component={Qa}
        options={{
          tabBarIcon: ({color, size}) =>
            color ? (
              <AppIcons.QuestBlack width={size} height={size} />
            ) : (
              <AppIcons.QuestWhite width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="CalendarTab"
        component={Calendar}
        options={{
          tabBarIcon: ({color, size}) =>
            color ? (
              <AppIcons.CalendarBlack width={size} height={size} />
            ) : (
              <AppIcons.CalendarWhite width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) =>
            color ? (
              <AppIcons.HomeBlack width={size} height={size} />
            ) : (
              <AppIcons.HomeWhite width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="MailTab"
        component={Mail}
        options={{
          tabBarIconStyle: {marginTop: 3},
          tabBarBadge: notReadMailsState > 0 ? notReadMailsState : null,
          tabBarBadgeStyle: {
            backgroundColor: '#D88775',
            color: 'white',
            fontSize: 13,
            fontWeight: 'bold',
            marginTop: 8,
          },
          tabBarIcon: ({color, size}) =>
            color ? (
              <>
                <AppIcons.MailBlack width={size} height={size} />
              </>
            ) : (
              <>
                <AppIcons.MailWhite width={size} height={size} />
              </>
            ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) =>
            color ? (
              <AppIcons.ProfileBlack width={size} height={size} />
            ) : (
              <AppIcons.ProfileWhite width={size} height={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
