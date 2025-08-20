/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Keyboard, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {TextSmall, TextSmaller} from '../CustomText';

import OtpInputs from 'react-native-otp-inputs';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';

interface OTPInputProps {
  value: string;
  onChange: (arg: string) => void;
  onFilled?: (arg?: string) => void;
  error?: string;
  label?: string;
  numberOfInputs?: number;
  containerStyles?: StyleProp<ViewStyle>;
}

const OTPInput: React.FC<OTPInputProps> = props => {
  const {
    label,
    containerStyles,
    value,
    onChange,
    numberOfInputs,
    onFilled,
    error,
  } = props;

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (
      typeof onFilled === 'function' &&
      value &&
      (value?.length === numberOfInputs || value?.length === 6) &&
      trigger
    ) {
      setTrigger(false);
      Keyboard.dismiss();
      onFilled(value);
    }
  }, [numberOfInputs, value, trigger]);

  useEffect(() => {
    if (value?.length === numberOfInputs || (value?.length === 6 && !trigger)) {
      setTrigger(true);
    }
  }, [value]);

  return (
    <>
      <View style={[styles.container, containerStyles]}>
        {label && <TextSmall>{label}</TextSmall>}
        <OtpInputs
          defaultValue={value}
          handleChange={code => onChange(code)}
          numberOfInputs={numberOfInputs ?? 6}
          autofillFromClipboard={false}
          style={styles.otpStyles}
          inputStyles={styles.otpInput}
        />
      </View>
      {error && (
        <TextSmaller bold color={'red'}>
          {'* '}
          {error}
        </TextSmaller>
      )}
    </>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {width: '100%', height: scale(75)},
  otpStyles: {
    width: '100%',
    justifyContent: 'space-evenly',
    // alignItems: 'center',
    paddingTop: scale(10),
    flexDirection: 'row',
    flex: 1,
  },
  otpInput: {
    backgroundColor: COLORS.secondary,
    width: scale(50),
    height: scale(50),
    fontSize: scale(16),
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 10,
    borderColor: COLORS.borderGrey,
    color: COLORS.black,
  },
});
