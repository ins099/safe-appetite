import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';

interface ISafeAreaWrapper {
  edges?: 'top' | 'bottom' | 'left' | 'right' | string[];
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  isPaddingX?: boolean;
  isPaddingY?: boolean;
}

const SafeAreaWrapper: React.FC<ISafeAreaWrapper> = props => {
  const {edges, children, containerStyle, isPaddingX, isPaddingY} = props;
  return (
    <SafeAreaView edges={edges} style={styles.container}>
      <View
        style={[
          styles.container,
          containerStyle,
          isPaddingX && {paddingHorizontal: scale(20)},
          isPaddingY && {paddingTop: scale(20)},
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
});
