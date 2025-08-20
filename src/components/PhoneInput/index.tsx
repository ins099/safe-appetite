import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativePhoneInput from 'react-native-phone-input';
import {scale, vs} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {TextSmall, TextSmaller} from '../CustomText';

type PhoneNumberType = {
  number: string | undefined;
  countryCode: string | undefined;
};

type PhoneInputProps = {
  value: PhoneNumberType | null;
  onChange: (number: PhoneNumberType) => void;
  error?: string;
  editable?: boolean;
  label?: string;
};

const PhoneInput: React.FC<PhoneInputProps> = props => {
  const {value, onChange, error, label, editable} = props;
  const phoneRef = useRef<ReactNativePhoneInput>(null);

  const onChangePhoneNumber = () => {
    const iso = phoneRef.current?.getISOCode();
    const countryCode = `+${phoneRef.current?.getCountryCode()}`;
    let number = phoneRef.current?.getValue();
    number = number?.replace(`${countryCode}`, '');
    if (iso && number) {
      onChange({number, countryCode});
    }
  };

  return (
    <View>
      {label && <TextSmall textStyle={styles.label}>{label}</TextSmall>}
      <View style={[styles.container]}>
        <ReactNativePhoneInput
          ref={phoneRef}
          autoFormat={true}
          initialCountry="pk"
          initialValue={value?.number || ''}
          style={styles.phoneContainer}
          textStyle={styles.textInputStyle}
          textProps={{placeholder: 'Enter Phone Number', maxLength: 15}}
          onPressFlag={() => null}
          onChangePhoneNumber={onChangePhoneNumber}
        />
      </View>
      {error && (
        <TextSmaller bold color={'red'}>
          {'* '}
          {error}
        </TextSmaller>
      )}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    height: vs(42),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
  },
  phoneContainer: {height: '100%', width: '100%', marginBottom: 3},
  textInputStyle: {
    fontSize: scale(14),
    borderLeftWidth: 1,
    paddingLeft: 10,
    height: vs(25),
  },
  label: {},
});
