import React from 'react';
import AuthStack from './AuthStack';

import {useFocusEffect} from '@react-navigation/native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import DashStack from './DashStack';
import {useAppSelector} from '../redux/store';
import {useNotifications} from '../utils/hooks/useNotifications';

const RootNavigation: React.FC = () => {
  const onFocusEffect = React.useCallback(() => {
    // This should be run when screen gains focus - enable the module where it's needed
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setShouldMimicIOSBehavior(false);
    return () => {
      // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  useNotifications();

  const accessToken = useAppSelector(user => user.userSlice.accessToken);
  const isRegister = useAppSelector(user => user.userSlice?.isRegister);

  return accessToken && !isRegister ? <DashStack /> : <AuthStack />;
};

export default RootNavigation;
