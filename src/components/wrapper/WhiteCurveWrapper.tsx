import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';

interface WhiteWrapperProps {
  containerStyle?: ViewStyle;
  children: React.ReactNode;
}

const WhiteCurveWrapper: React.FC<WhiteWrapperProps> = props => {
  const {containerStyle, children} = props;

  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

export default WhiteCurveWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(28),
    backgroundColor: COLORS.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
});
