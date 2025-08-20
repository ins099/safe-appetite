import {useForm} from 'react-hook-form';
import {useUserUpdatePasswrodMutation} from '../../redux/apis/auth';
import {LoginResponse} from '../../redux/apis/interface';
import {UpdatePassForm} from '../../utils/interface';
import {utility} from '../../utils/utility';

export const useUpdatePassword = () => {
  const {control, handleSubmit, resetField} = useForm<UpdatePassForm>();

  const [onUpdatePassword, {isLoading}] = useUserUpdatePasswrodMutation();

  const onUpdatePass = async (formData: UpdatePassForm) => {
    try {
      console.log('====', formData);
      const response = await onUpdatePassword(formData);
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      resetField('currentPassword');
      resetField('newPassword');
      const data = response.data as LoginResponse;
      // utility.showToast?.show(data.message, {type: 'success'});
      console.log(JSON.stringify(data, null, 1));
    } catch (error: any) {
      console.log('onUpdatePass ERRORR ===', error?.message);
    }
  };

  const handleUpdatePass = handleSubmit(onUpdatePass);

  return {
    control,
    handleUpdatePass,
    isLoading,
  };
};
