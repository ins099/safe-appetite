import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {TextNormal, TextSmall} from '../../components/CustomText';
import StepFormWrapper from '../../components/wrapper/StepFormWrapper';
import {AuthStackParamList} from '../../navigation/interface';
import {LOGIN_FIELDS} from '../../utils/formFields';
import {COLORS} from '../../utils/theme';
import {useLogin} from './useLogin';

interface LoginScreenProps {
  navigation: NavigationProp<AuthStackParamList>;
}

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const {navigation} = props;

  const {control, handleUserLogin, isLoading} = useLogin();

  const onPressSignup = () => navigation.navigate('Signup');
  const onPressForgot = () => navigation.navigate('ForgotPassword');

  return (
    <StepFormWrapper
      control={control}
      formFields={LOGIN_FIELDS}
      formContainerStyle={{paddingTop: scale(20)}}
      title={'Welcome back!'}
      scrollEnabled={false}
      description={
        'Log in now to continue your journey towards smarter choices and healthier living.'
      }>
      <>
        <TextSmall color={COLORS.primary} bold right onPress={onPressForgot}>
          Forgot Password
        </TextSmall>
        <View style={{alignItems: 'center'}}>
          <CustomButton
            title="Login"
            width={'95%'}
            onPress={handleUserLogin}
            containerStyle={{marginVertical: scale(15)}}
            loading={isLoading}
          />
          <TextNormal>
            Don't have an account?{' '}
            <TextNormal color={COLORS.primary} bold onPress={onPressSignup}>
              Sign Up
            </TextNormal>
          </TextNormal>
        </View>
      </>
    </StepFormWrapper>
  );
};

const styles = StyleSheet.create({});
