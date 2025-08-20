import React, {useEffect, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CustomIcon from '../CustomIcon';
import {TextSmaller} from '../CustomText';

interface InputProps extends TextInputProps {
  textInputContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  label?: string;
  error?: string | undefined;
  icon?: any;
}

const Input: React.FC<InputProps> = ({
  textInputContainerStyle,
  textInputStyle,
  containerStyle,
  error,
  secureTextEntry,
  onChange,
  value,
  icon,
  ...restProps
}: InputProps): JSX.Element => {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState<boolean | undefined>(
    !!secureTextEntry,
  );
  const setInputValue = text => {
    if (textRef.current) {
      textRef.current.setNativeProps({text});
    }
  };
  useEffect(() => {
    setInputValue(value);
  }, []);

  return (
    // <View style={[containerStyle]}>
    //   {label && <TextSmall textStyle={styles.label}>{label}</TextSmall>}
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.textInputContainer, textInputContainerStyle]}>
          <CustomIcon {...icon} />
          <TextInput
            ref={textRef}
            style={[styles.textInput, textInputStyle]}
            onChangeText={onChange}
            placeholderTextColor={COLORS.black}
            secureTextEntry={isVisible}
            // textContentType="none"
            placeholder={restProps?.placeholder}
            // autoCapitalize="none"
            // keyboardType={restProps?.keyboardType ||'default' }
          />
          {!!secureTextEntry && (
            <CustomIcon
              name={!isVisible ? 'eye-slash' : 'eye'}
              type="font-awesome-6"
              onPress={() => setIsVisible(p => !p)}
              size={scale(18)}
            />
          )}
        </View>
      </View>
      <TextSmaller bold color={'red'}>
        {error && `* ${error}`}
      </TextSmaller>
    </>
    // </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    height: scale(47),
    maxHeight: 80,
  },
  label: {
    marginBottom: scale(5),
  },
  textInputContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  textInput: {
    fontSize: scale(16),
    paddingHorizontal: 10,
    flex: 1,
    color: COLORS.black,
  },
});
