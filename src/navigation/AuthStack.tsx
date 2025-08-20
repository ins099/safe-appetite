import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ForgotScreen, LoginScreen, QuestionScreen, SignupScreen} from '../Screens';
import {AuthStackParamList} from './interface';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
