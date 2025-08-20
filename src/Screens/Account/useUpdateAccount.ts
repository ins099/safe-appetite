import {useForm} from 'react-hook-form';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useLogoutUserMutation,
} from '../../redux/apis/auth';
import {LoginResponse} from '../../redux/apis/interface';
import {UpdateUserForm} from '../../utils/interface';
import {utility} from '../../utils/utility';
import {useAppDispatch, useAppSelector} from '../../redux/store';

export const useUpdateAccount = () => {
  const {control, handleSubmit} = useForm<UpdateUserForm>();

  const dispatch = useAppDispatch();

  const [updateUser, {isLoading}] = useUpdateUserMutation();

  const [deleteUser, {isLoading: deleteLoading}] = useDeleteUserMutation();

  const [logoutUser] = useLogoutUserMutation();

  const fcmToken = useAppSelector(store => store.userSlice.fcmToken);

  const onUpdateUser = async (formData: UpdateUserForm) => {
    try {
      delete formData.email;
      const response = await updateUser(formData);
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      const data = response.data as LoginResponse;
      // utility.showToast?.show(data.message, {type: 'success'});
      console.log(JSON.stringify(data, null, 1));
    } catch (error: any) {
      console.log('onUpdateUser ERRORR ===', error?.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser({});
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      const data = response.data as LoginResponse;
      dispatch({type: 'LOGOUT'});
      // utility.showToast?.show('User deleted successfully.', {type: 'success'});
    } catch (error: any) {
      console.log('onUpdateUser ERRORR ===', error?.message);
    }
  };

  const handleLogoutUser = async () => {
    try {
      const response = await logoutUser({fcmToken});
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      const data = response.data as LoginResponse;
      dispatch({type: 'LOGOUT'});
      // utility.showToast?.show('User deleted successfully.', {type: 'success'});
    } catch (error: any) {
      console.log('onUpdateUser ERRORR ===', error?.message);
    }
  };

  const handleUpdateUser = handleSubmit(onUpdateUser);

  return {
    control,
    handleUpdateUser,
    isLoading,
    handleDeleteUser,
    deleteLoading,
    handleLogoutUser,
  };
};
