import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icon} from '../utils/interface';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Question: undefined;
  VerifyOTP: undefined;
};

export type TabStackParamList = {
  Scan: undefined;
  Profile: undefined;
  History: undefined;
  Favourite: undefined;
  Account: undefined;
};

export type DashStackParamList = {
  Tab: undefined;
  Account: undefined;
  Questions: {type: number};
  UpdatePassword?: undefined;
};

export type DashStackProps<Screen extends keyof DashStackParamList> =
  NativeStackScreenProps<DashStackParamList, Screen>;

export type AuthStackProps<Screen extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, Screen>;

export type TabStackProps<Screen extends keyof TabStackParamList> =
  NativeStackScreenProps<TabStackParamList, Screen>;

export interface TabList {
  id: number;
  label: 'Scan' | 'History' | 'Favourite' | 'Profile';
  icon: Icon | any;
  component: React.FC<any>;
}
