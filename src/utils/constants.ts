import {scale} from 'react-native-size-matters';
import {Button} from '../components/interface';
import {RatingTypes} from './../components/interface';
import {FORGOT_FIELDS, RESET_FIELDS, VERIFICATION_FIELDS} from './formFields';
import {COLORS} from './theme';

export const BASE_URL = 'https://api.safeappetite.com/api';
export const API_VERSION = 'v1';
export const API_URL = `${BASE_URL}/${API_VERSION}/`;

export const RATING: Record<RatingTypes, any> = {
  DIETERY_PREFERENCES: {
    color: COLORS.primaryLight,
    icon: {name: 'dot-single', type: 'entypo', color: COLORS.primaryLight},
    label: 'Good',
  },
  DISLIKES: {
    color: COLORS.brightRed,
    icon: {name: 'dot-single', type: 'entypo', color: COLORS.brightRed},
    label: 'Dislike',
  },
  MY_ALLERGENS: {
    color: COLORS.orange,
    icon: {name: 'dot-single', type: 'entypo', color: COLORS.orange},
    label: "I'm Allergic",
  },
  MY_INTOLERENCES: {
    color: COLORS.darkRed,
    icon: {name: 'dot-single', type: 'entypo', color: COLORS.darkRed},
    label: "I'm Intollerant",
  },
  Good: {
    color: COLORS.green,
    icon: {
      name: 'dot-single',
      type: 'entypo',
      color: COLORS.green,
      size: scale(19),
      containerStyle: {marginRight: scale(3)},
    },
    label: 'Good',
  },
  all: {
    color: COLORS.primary,
    icon: {
      name: '',
      type: '',
      color: COLORS.primary,
      size: scale(19),
      containerStyle: {marginRight: scale(3)},
    },
    label: '',
  },
  Warning: {
    color: COLORS.brightRed,
    icon: {name: 'dot-single', type: 'entypo', color: COLORS.brightRed},
    label: 'Warning',
  },
};

export const BUTTONROWLIST: Button[] = [
  {
    title: 'All',
    id: 'all',
  },
  {
    title: "I'm allergic",
    id: 'MY_ALLERGENS',
  },
  {
    title: "I'm intolerant",
    id: 'MY_INTOLERENCES',
  },
  {
    title: 'Dislike',
    id: 'DISLIKES',
  },
];

export const QUESTION_TYPES = {
  allergics: 'MY_ALLERGENS',
  intolerants: 'MY_INTOLERENCES',
  dietPreference: 'DIETERY_PREFERENCES',
  dislikes: 'DISLIKES',
};

export const FORGOT_STEPS = [
  {
    id: '1',
    title: 'Forgot Password?',
    description:
      "Enter your email below, and we'll send you a verification code to help you reset it.",
    fields: FORGOT_FIELDS,
    btnText: 'Continue',
  },
  {
    id: '2',
    title: 'Verification',
    description:
      'Enter the OTP sent to your email to verify your identity and continue the password reset process.',
    fields: VERIFICATION_FIELDS,
    btnText: 'Verify',
  },
  {
    id: '3',
    title: "You're almost there!",
    description:
      'Please enter your new password below to complete the reset process and secure your account.',
    fields: RESET_FIELDS,
    btnText: 'Reset Password',
  },
];
