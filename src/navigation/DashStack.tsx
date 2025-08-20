import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomTabStack from './BottomTabStack';
import {DashStackParamList} from './interface';
import {AccountScreen, QuestionScreen, UpdatedPassScreen} from '../Screens';

interface DashProps {}

const Stack = createNativeStackNavigator<DashStackParamList>();

const DashStack: React.FC<DashProps> = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={BottomTabStack} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Questions" component={QuestionScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatedPassScreen} />
    </Stack.Navigator>
  );
};

export default DashStack;
