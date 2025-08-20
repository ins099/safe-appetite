import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {TextNormal} from '../../components/CustomText';
import StepFormWrapper from '../../components/wrapper/StepFormWrapper';
import {AuthStackParamList} from '../../navigation/interface';
import {SIGNUP_FIELDS} from '../../utils/formFields';
import {COLORS} from '../../utils/theme';
import {useRegister} from './useRegister';

interface SignupScreenProps {
  navigation: NavigationProp<AuthStackParamList>;
}

export const SignupScreen: React.FC<SignupScreenProps> = props => {
  const {navigation} = props;

  const {handleUserRegister, control, isLoading} = useRegister();

  const onPressLogin = () => navigation.navigate('Login');

  return (
    <StepFormWrapper
      control={control}
      formFields={SIGNUP_FIELDS}
      formContainerStyle={{paddingTop: scale(20)}}
      scrollEnabled={false}
      title={"Let's get started"}
      description={
        'Sign up now and take the first step towards informed choices for a healthier lifestyle!'
      }>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          title="Sign up"
          width={'95%'}
          containerStyle={{marginVertical: scale(15)}}
          onPress={handleUserRegister}
          loading={isLoading}
        />
        <TextNormal>
          Already have an account?{' '}
          <TextNormal color={COLORS.primary} bold onPress={onPressLogin}>
            Log In
          </TextNormal>
        </TextNormal>
      </View>
    </StepFormWrapper>
  );
};

const styles = StyleSheet.create({});
