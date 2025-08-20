import {useForm} from 'react-hook-form';
import {
  useForgotPasswordMutation,
  useVerifyOTPMutation,
} from '../../redux/apis/auth';
import {
  ForgotPassResponse,
  VerifyOTPResponse,
} from '../../redux/apis/interface';
import {ForgetPasswordForm} from '../../utils/interface';
import {utility} from '../../utils/utility';
import {useAppDispatch} from '../../redux/store';
import {setUser} from '../../redux/reducers/userSlice';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FORGOT_STEPS} from '../../utils/constants';

export const useForgotPassword = () => {
  const {control, handleSubmit} = useForm<ForgetPasswordForm>();
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState<number>(0);
  const navigation: any = useNavigation();

  const [requestForgotPass, {isLoading}] = useForgotPasswordMutation();
  const [verifyOTP, {isLoading: loadingVerify}] = useVerifyOTPMutation();

  const incrementStep = () =>
    setActiveStep(p => {
      if (p >= 0 && p < FORGOT_STEPS.length - 1) {
        return p + 1;
      }
      return p;
    });

  const decrementStep = () => {
    setActiveStep(p => {
      if (p >= 1) {
        return p - 1;
      }
      navigation.goBack();
      return p;
    });
  };

  const handleVerifyOTP = () =>
    handleSubmit(async (form: any) => {
      const response = await verifyOTP({otp: form?.otp});
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.message[0]
            : (error?.data?.message || error?.data?.error) ??
                'Something went wrong',
        );
        return false;
      }
      const data = response.data as VerifyOTPResponse;
      // utility.showToast?.show(data.message, {type: 'success'});
      dispatch(setUser({resetToken: data.data.token}));
      incrementStep();
    })();

  const onForgotPassword = async (formData: ForgetPasswordForm) => {
    try {
      console.log('====', formData);
      delete formData?.otp;
      const response = await requestForgotPass(formData);
      // console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.message[0]
            : (error?.data?.message || error?.data?.error) ??
                'Something went wrong',
        );
        return null;
      }
      const data = response.data as ForgotPassResponse;
      // utility.showToast?.show(data.message, {type: 'success'});
      console.log(JSON.stringify(data, null, 1));
      incrementStep();
      return true;
      //   dispatch(setToken(data.data.token));
      //   dispatch(setUser(data.data.user));
    } catch (error: any) {
      console.log('onForgotPassword ERRORR ===', error?.message);
    }
  };

  return {
    control,
    handleSubmit,
    onForgotPassword,
    isLoading: isLoading || loadingVerify,
    handleVerifyOTP,
    activeStep,
    incrementStep,
    decrementStep,
  };
};
