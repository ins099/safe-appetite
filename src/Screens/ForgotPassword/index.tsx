import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import StepFormWrapper from '../../components/wrapper/StepFormWrapper';
import {AuthStackParamList} from '../../navigation/interface';
import {useForgotPassword} from './useForgotPassword';
import {useResetPass} from './useResetPass';
import {FORGOT_STEPS} from '../../utils/constants';

interface ForgotScreenProps {
  navigation: NavigationProp<AuthStackParamList>;
}

export const ForgotScreen: React.FC<ForgotScreenProps> = _props => {
  const {
    control,
    onForgotPassword,
    handleSubmit,
    isLoading,
    activeStep,
    handleVerifyOTP,
    decrementStep,
  } = useForgotPassword();

  const {
    control: resetControl,
    handleResetPassword,
    isLoading: resetLoading,
  } = useResetPass();

  const onPressNext = async (data: any) => {
    if (activeStep === 0) {
      // SEND OTP CODE
      await onForgotPassword(data);
    } else if (activeStep === 1) {
      // VERIFY CODE
      await handleVerifyOTP(data?.otp);
    } else {
      // RESET CODE
      await handleResetPassword();
    }
  };

  return (
    <StepFormWrapper
      control={activeStep === 2 ? resetControl : control}
      formFields={FORGOT_STEPS[activeStep].fields}
      formContainerStyle={{paddingTop: scale(20)}}
      title={FORGOT_STEPS[activeStep].title}
      description={FORGOT_STEPS[activeStep].description}
      isHeader
      pages={FORGOT_STEPS.length}
      currentPage={activeStep}
      onPressBack={decrementStep}>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          title={FORGOT_STEPS[activeStep].btnText}
          width={'95%'}
          containerStyle={{marginVertical: scale(15)}}
          onPress={handleSubmit(onPressNext)}
          loading={isLoading || resetLoading}
        />
      </View>
    </StepFormWrapper>
  );
};

const styles = StyleSheet.create({});
