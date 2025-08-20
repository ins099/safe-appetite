import messaging from '@react-native-firebase/messaging';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {CreateUserForm} from '../../../src/utils/interface';
import {AuthStackParamList} from '../../navigation/interface';
import {useUserRegisterMutation} from '../../redux/apis/auth';
import {RegisterResponse} from '../../redux/apis/interface';
import {
  setFCMToken,
  setIsRegister,
  setToken,
  setUser,
} from '../../redux/reducers/userSlice';
import {useAppDispatch} from '../../redux/store';
import {utility} from '../../utils/utility';

export const useRegister = () => {
  const {control, handleSubmit} = useForm<CreateUserForm>();
  const dispatch = useAppDispatch();

  const [onUserRegisteration, {isLoading}] = useUserRegisterMutation();

  const navigation: NavigationProp<AuthStackParamList> = useNavigation();

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
      return 'demo fcm';
    } catch (error) {
      console.log('ERROR GETTING TOKEN', error);
      return 'demo fcm';
    }
  };

  const onRegister = async (formData: CreateUserForm) => {
    try {
      const fcmToken = await getFCMToken();
      console.log('====', formData);
      const response = await onUserRegisteration({...formData, fcmToken});
      console.log('API RESPONSE===', JSON.stringify(response, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      const data = response.data as RegisterResponse;
      console.log('DATA', data);
      dispatch(setIsRegister(true));
      dispatch(setUser(data.data.user));
      dispatch(setToken(data.data.token));
      // utility.showToast?.show(data.message, {type: 'success'});
      navigation.navigate('Question');
    } catch (error: any) {
      console.log('onRegister ERRORR ===', error?.message);
    }
  };

  const handleUserRegister = handleSubmit(onRegister);

  return {
    control,
    handleUserRegister,
    isLoading,
  };
};
