import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Calendar from '../screens/CalendarScreen';
import Home from '../screens/HomeScreen';
import Qa from '../screens/QaScreen';
import Profile from '../screens/profile/ProfileScreen';
import Mail from '@/screens/mail/MailScreen';
import {AppColors, bottomTabHeight} from '../utils/GlobalStyles';
import {AppIcons} from '@/ui/icons';
import styled from 'styled-components';
import {FontStyle} from '@/utils/GlobalFonts';

const Tab = createBottomTabNavigator();

const Circle = styled.View`
  position: absolute;
  top: -8;
  right: -2;
  width: 22px;
  height: 22px;
  border-radius: 50px;
  background-color: ${AppColors.black};
  justify-content: center;
  align-items: center;
`;

export function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
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
      }}>
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
        name="MailTab"
        component={Mail}
        options={{
          tabBarIcon: ({color, size}) =>
            color ? (
              <>
                {/* <Circle>
                  <FontStyle.SubContentB style={{color: AppColors.blur}}>
                    {notReadMailsState}
                  </FontStyle.SubContentB>
                </Circle> */}
                <AppIcons.MailBlack width={size} height={size} />
              </>
            ) : (
              <>
                {/* <Circle>
                  <FontStyle.SubContentB style={{color: AppColors.blur}}>
                    {notReadMailsState}
                  </FontStyle.SubContentB>
                </Circle> */}
                <AppIcons.MailWhite width={size} height={size} />
              </>
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
