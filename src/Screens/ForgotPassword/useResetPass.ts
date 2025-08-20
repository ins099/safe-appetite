import {useForm} from 'react-hook-form';
import {useResetPasswordMutation} from '../../redux/apis/auth';
import {ResetPassResponse} from '../../redux/apis/interface';
import {ResetPasswordForm} from '../../utils/interface';
import {utility} from '../../utils/utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../navigation/interface';

export const useResetPass = () => {
  const {control, handleSubmit} = useForm<ResetPasswordForm>();

  const navigation: NavigationProp<AuthStackParamList> = useNavigation();

  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  const onResetPassword = async (formData: ResetPasswordForm) => {
    try {
      console.log('====', formData);
      const response = await resetPassword(formData);
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
        return null;
      }
      const data = response.data as ResetPassResponse;
      // utility.showToast?.show(data.message, {type: 'success'});
      if (data.status) {
        navigation.goBack();
      }
    } catch (error: any) {
      console.log('onResetPassword ERRORR ===', error?.message);
    }
  };

  const handleResetPassword = handleSubmit(onResetPassword);

  return {
    control,
    handleResetPassword,
    isLoading,
  };
};
