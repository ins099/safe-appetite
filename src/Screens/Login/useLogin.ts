import messaging from '@react-native-firebase/messaging';
import {useForm} from 'react-hook-form';
import {useLazyGetUserQuery, useUserLoginMutation} from '../../redux/apis/auth';
import {LoginResponse} from '../../redux/apis/interface';
import {
  setFCMToken,
  setIsRegister,
  setToken,
  setUser,
} from '../../redux/reducers/userSlice';
import {useAppDispatch} from '../../redux/store';
import {LoginForm} from '../../utils/interface';
import {utility} from '../../utils/utility';

export const useLogin = () => {
  const {control, handleSubmit} = useForm<LoginForm>();
  const dispatch = useAppDispatch();

  const [onUserLogin, {isLoading}] = useUserLoginMutation();
  const [getUser] = useLazyGetUserQuery();

  const getFCMToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      if (authStatus) {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        console.log({fcmToken});
        dispatch(setFCMToken(fcmToken));
        return fcmToken;
      }
      return '';
    } catch (error) {
      console.log('ERROR GETTING TOKEN', error);
      return '';
    }
  };

  const onLogin = async (formData: LoginForm) => {
    try {
      const fcmToken = await getFCMToken();
      const body = {...formData, fcmToken};
      const response = await onUserLogin(body);
      // console.log('API RESPONSE===', JSON.stringify(response, null, 1));
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
      dispatch(setToken(data.data.token));
      dispatch(setIsRegister(false));
      dispatch(setUser(data.data.user));
      await getUser({});
    } catch (error: any) {
      console.log('onLogin ERRORR ===', error?.message);
    }
  };

  const handleUserLogin = handleSubmit(onLogin);

  return {
    control,
    handleUserLogin,
    isLoading,
  };
};
