/* eslint-disable react-native/no-inline-styles */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Alert, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import {TextSmall} from '../../components/CustomText';
import StepFormWrapper from '../../components/wrapper/StepFormWrapper';
import {AuthStackParamList} from '../../navigation/interface';
import {useGetUserQuery} from '../../redux/apis/auth';
import {GetUserResponse} from '../../redux/apis/interface';
import {COLORS} from '../../utils/theme';
import {useUpdateAccount} from './useUpdateAccount';

interface AccountScreenProps {
  navigation?: NavigationProp<AuthStackParamList>;
}

export const AccountScreen: React.FC<AccountScreenProps> = () => {
  const {
    control,
    handleUpdateUser,
    isLoading,
    handleDeleteUser,
  } = useUpdateAccount();

  const {data} = useGetUserQuery({});

  const user = data as GetUserResponse;

  const onPressDelete = () =>
    Alert.alert('Confirm Delete', 'Are you sure you want to delete? account', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: handleDeleteUser,
      },
    ]);

  const FIELDS = [
    {
      id: '3',
      type: 'text',
      name: 'name',
      defaultValue: user?.data?.name,
      icon: {name: 'lock', type: 'material-community', size: scale(20)},
      placeholder: 'Full Name',
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
      id: '2',
      type: 'text',
      // label: 'Email',
      defaultValue: user?.data?.email,
      value: user?.data?.email,
      name: 'email',
      placeholder: 'Email Address',
      containerStyle: {marginVertical: 3, width: '100%'},
      keyboardType: 'email-address',
      icon: {name: 'email', type: 'material-community', size: scale(20)},
      autoCapitalize: 'none',
      editable: false,
    },
  ];

  return (
    <StepFormWrapper
      control={control}
      formFields={FIELDS}
      scrollEnabled={false}
      isHeader
      formContainerStyle={{paddingTop: scale(20)}}
      title={'My Account'}
      description={
        'Sign up now and take the first step towards informed choices for a healthier lifestyle!'
      }>
      <View style={{alignItems: 'center'}}>
        <CustomButton
          title="Save Details"
          width={'95%'}
          containerStyle={{marginVertical: scale(15)}}
          loading={isLoading}
          onPress={handleUpdateUser}
        />
        <TextSmall>
          Want to delete an account?{' '}
          <TextSmall bold color={COLORS.darkRed} onPress={onPressDelete}>
            Delete my account
          </TextSmall>
        </TextSmall>
      </View>
    </StepFormWrapper>
  );
};
