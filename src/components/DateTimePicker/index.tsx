/* eslint-disable react-native/no-inline-styles */
import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {formatDateTimeString} from '../../utils/helpers';
import {COLORS} from '../../utils/theme';
import {TextBig, TextNormal, TextSmall, TextSmaller} from '../CustomText';

interface DateTimeProps {
  value: Date;
  onChange: (arg: Date | undefined) => void;
  mode?: 'time' | 'date';
  containerStyle?: ViewStyle;
  error?: string;
  label?: string;
  datePickerProps?: DateTimeProps;
  placeholder?: string;
}

const DateTimePicker: React.FC<DateTimeProps> = props => {
  const {
    value,
    onChange,
    containerStyle,
    error,
    label,
    mode = 'date',
    ...rest
  } = props;
  const [visisble, setVisisble] = useState(false);

  const handlePress = () => {
    setVisisble(true);
  };

  const onDateChange = (event: any, date?: Date | undefined) => {
    onChange(date);
    Platform.OS === 'android' && setVisisble(false);
  };

  const renderDatePicker = () => (
    <RNDateTimePicker
      value={value ? value : new Date()}
      onChange={onDateChange}
      mode={mode}
      display="spinner"
      {...props?.datePickerProps}
    />
  );

  return (
    <View style = {containerStyle}>
      {label && <TextSmall textStyle={styles.label}>{label}</TextSmall>}
      <TouchableOpacity
        style={[styles.container]}
        onPress={handlePress}>
        <TextNormal color={value ? COLORS.black : COLORS.borderGrey}>
          {value ? formatDateTimeString(value) : rest?.placeholder}
        </TextNormal>
      </TouchableOpacity>

      {error && (
        <TextSmaller bold color={'red'} textStyle={{marginTop: 5}}>
          {'* '}
          {error}
        </TextSmaller>
      )}

      {Platform.OS === 'ios' ? (
        <ReactNativeModal isVisible={visisble}>
          <View style={styles.datePickerContainer}>
            <View style={styles.modalHeader}>
              <TextBig bold color={COLORS.primary}>
                Select Date
              </TextBig>
              <Entypo
                name="cross"
                color={COLORS.primary}
                size={scale(25)}
                onPress={() => setVisisble(false)}
              />
            </View>
            {renderDatePicker()}
          </View>
        </ReactNativeModal>
      ) : (
        visisble && renderDatePicker()
      )}
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderGrey,
    borderRadius: 8,
    height: scale(50),
    // height: scale(50),
    maxHeight: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  label: {
    marginBottom:5
  },
  textInputContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    height: '100%',
  },
  textInput: {
    fontSize: 16,
    paddingLeft: 15,
    flex: 1,
  },
  datePickerContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
