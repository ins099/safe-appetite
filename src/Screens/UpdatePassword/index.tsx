import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import StepFormWrapper from '../../components/wrapper/StepFormWrapper';
import {AuthStackParamList} from '../../navigation/interface';
import {useUpdatePassword} from './useUpdatePassword';

interface UpdatedPassScreenProps {
  navigation: NavigationProp<AuthStackParamList>;
}

export const UpdatedPassScreen: React.FC<UpdatedPassScreenProps> = props => {
  const {navigation} = props;

  const {control, handleUpdatePass, isLoading} = useUpdatePassword();

  const FIELDS = [
    {
      id: '3',
      type: 'text',
      // label: 'Password',
      name: 'currentPassword',
      icon: {name: 'lock', type: 'material-community', size: scale(20)},
      secureTextEntry: true,
      placeholder: 'Current Password',
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
      id: '3',
      type: 'text',
      // label: 'Password',
      name: 'newPassword',
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
  ];

  return (
    <StepFormWrapper
      control={control}
      formFields={FIELDS}
      scrollEnabled={false}
      isHeader
      formContainerStyle={{paddingTop: scale(20)}}
      title={'Update Password'}
      description={
        'Sign up now and take the first step towards informed choices for a healthier lifestyle!'
      }>
      <>
        <View style={{alignItems: 'center'}}>
          <CustomButton
            title="Save Details"
            width={'95%'}
            containerStyle={{marginVertical: scale(15)}}
            loading={isLoading}
            onPress={handleUpdatePass}
          />
        </View>
      </>
    </StepFormWrapper>
  );
};

const styles = StyleSheet.create({});
