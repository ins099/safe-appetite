import {scale} from 'react-native-size-matters';

export const SIGNUP_FIELDS = [
  {
    id: '1',
    type: 'text',
    // label: 'Full Name',
    name: 'name',
    placeholder: 'Full Name',
    containerStyle: {marginVertical: 3, width: '100%'},
    icon: {name: 'account', type: 'material-community', size: scale(20)},
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
      minLength: {value: 4, message: 'min username is 4 characaters.'},
      maxLength: {
        value: 20,
        message: 'max username is 20 characaters.',
      },
    },
  },
  {
    id: '2',
    type: 'text',
    // label: 'Email',
    name: 'email',
    placeholder: 'Email Address',
    containerStyle: {marginVertical: 3, width: '100%'},
    keyboardType: 'email-address',
    icon: {name: 'email', type: 'material-community', size: scale(20)},
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'invalid email address',
      },
    },
  },
  {
    id: '3',
    // label: 'Password',
    name: 'password',
    icon: {name: 'lock', type: 'material-community', size: scale(20)},
    secureTextEntry: true,
    placeholder: 'Password',
    containerStyle: {marginVertical: 3, width: '100%'},
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
    },
  },
];
export const LOGIN_FIELDS = [
  {
    id: '2',
    type: 'text',
    // label: 'Email',
    name: 'email',
    placeholder: 'Email Address',
    containerStyle: {marginVertical: 3, width: '100%'},
    keyboardType: 'email-address',
    icon: {name: 'email', type: 'material-community', size: scale(20)},
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'invalid email address',
      },
    },
  },
  {
    id: '3',
    type: 'text',
    // label: 'Password',
    name: 'password',
    icon: {name: 'lock', type: 'material-community', size: scale(20)},
    secureTextEntry: true,
    placeholder: 'Password',
    containerStyle: {marginVertical: 3, width: '100%'},
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
    },
  },
];
export const FORGOT_FIELDS = [
  {
    id: '2',
    type: 'text',
    // label: 'Email',
    name: 'email',
    placeholder: 'Email Address',
    containerStyle: {marginVertical: 3, width: '100%'},
    keyboardType: 'email-address',
    icon: {name: 'email', type: 'material-community', size: scale(20)},
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'invalid email address',
      },
    },
  },
];

export const VERIFICATION_FIELDS = [
  {
    id: '2',
    type: 'otp',
    name: 'otp',
    containerStyle: {marginVertical: 3, width: '100%'},
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
    },
    numberOfInputs: 4,
  },
];

export const RESET_FIELDS = [
  {
    id: '3',
    type: 'text',
    // label: 'Password',
    name: 'password',
    icon: {name: 'lock', type: 'material-community', size: scale(20)},
    secureTextEntry: true,
    placeholder: 'New Password',
    containerStyle: {marginVertical: 3, width: '100%'},
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
    },
  },

  {
    id: '4',
    type: 'text',
    // label: 'Password',
    name: 'confirmPassword',
    icon: {name: 'lock', type: 'material-community', size: scale(20)},
    secureTextEntry: true,
    placeholder: 'Confirm Password',
    containerStyle: {marginVertical: 3, width: '100%'},
    autoCapitalize: 'none',
    rules: {
      required: {
        value: true,
        message: 'this is a required field.',
      },
    },
  },
];

export const OPTIONS_1 = [
  {
    label: 'Option 1',
    id: '1',
  },
  {
    label: 'Option 2',
    id: '2',
    onPress: () => console.log('Pressed 2'),
  },
  {
    label: 'Option 3',
    id: '3',
    onPress: () => console.log('Pressed 3'),
  },
];

export const OPTIONS_2 = [
  {
    label: 'Option 4',
    id: '4',
    desc: 'Description 4',
  },
  {
    label: 'Option 5',
    id: '5',
    desc: 'Description 5',
  },
  {
    label: 'Option 6',
    id: '6',
    desc: 'Description 6',
  },
];

export const OPTIONS_3 = [
  {
    label: 'Option 7',
    id: '7',
    desc: 'Description 7',
  },
  {
    label: 'Option 8',
    id: '8',
    desc: 'Description 8',
  },
  {
    label: 'Option 9',
    id: '9',
    desc: 'Description 9',
  },
];

export const OPTIONS_4 = [
  {
    label: 'Option 10',
    id: '10',
    desc: 'Description 10',
  },
  {
    label: 'Option 11',
    id: '11',
    desc: 'Description 11',
  },
  {
    label: 'Option 12',
    id: '12',
    desc: 'Description 12',
  },
];

export const OPTION_FIELDS = [
  {
    id: '1',
    type: 'options',
    name: 'dietary',
    options: OPTIONS_1,
  },
];

export const OPTION_FIELDS_2 = [
  {
    id: '1',
    type: 'options',
    name: 'allergic',
    options: OPTIONS_2,
  },
];

export const OPTION_FIELDS_3 = [
  {
    id: '1',
    type: 'options',
    name: 'allergic',
    options: OPTIONS_3,
  },
];

export const OPTION_FIELDS_4 = [
  {
    id: '1',
    type: 'options',
    name: 'allergic',
    options: OPTIONS_4,
  },
];
