import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import DismissWrapper from './DismissWrapper';

interface PrimaryWrapperProps {
  containerStyle?: ViewStyle;
  isPaddingX?: boolean;
  isPaddingY?: boolean;
  children: React.ReactNode;
}

const PrimaryWrapper: React.FC<PrimaryWrapperProps> = props => {
  const {containerStyle, children, isPaddingX, isPaddingY} = props;

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        isPaddingX && {paddingHorizontal: scale(20)},
        isPaddingY && {paddingVertical: scale(20)},
      ]}>
      <DismissWrapper>{children}</DismissWrapper>
    </View>
  );
};

export default PrimaryWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
