/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  ScanScreen,
  HistoryScreen,
  FavouriteScreen,
  ProfileScreen,
} from '../Screens';
import {TabList, TabStackParamList} from './interface';
import CustomIcon from '../components/CustomIcon';
import {COLORS} from '../utils/theme';
import {TextSmall} from '../components/CustomText';
import BarcodeSVG from '../assets/images/barcode.svg';
import ClockSVG from '../assets/images/clock.svg';
import HeartSVG from '../assets/images/heart.svg';
import UserSVG from '../assets/images/user.svg';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TABS: TabList[] = [
  {
    id: 1,
    label: 'Scan',
    icon: (props: any) => <BarcodeSVG {...props} />,
    component: ScanScreen,
  },
  {
    id: 2,
    label: 'History',
    icon: (props: any) => <ClockSVG {...props} />,
    component: HistoryScreen,
  },
  {
    id: 1,
    label: 'Favourite',
    component: FavouriteScreen,
    icon: (props: any) => <HeartSVG {...props} />,
  },
  {
    id: 1,
    label: 'Profile',
    component: ProfileScreen,
    icon: (props: any) => <UserSVG {...props} />,
  },
];

const BottomTabStack: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopColor: '#DCDBCD',
          borderTopWidth: 1,
        },
      }}>
      {TABS.map(tab => (
        <Tab.Screen
          key={tab.id}
          name={tab.label}
          component={tab.component}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              tab.icon({color: focused ? COLORS.primary : COLORS.grey}),
            tabBarLabel: ({children, focused, position}) => (
              <TextSmall
                bold={focused}
                color={focused ? COLORS.primary : COLORS.grey}>
                {children}
              </TextSmall>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabStack;
