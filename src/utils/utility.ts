import {ToastType} from 'react-native-toast-notifications';
import {DispatchProp} from 'react-redux';

type Utility = {
  showToast?: ToastType;
  dispatch?: DispatchProp;
  selector?: any;
};

export const utility: Utility = {};
