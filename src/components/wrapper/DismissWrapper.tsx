import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface IDismissWrapper {
  children: React.ReactNode;
}

const DismissWrapper: React.FC<IDismissWrapper> = props => {
  const {children} = props;
  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={handleDismissKeyboard}>
      <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
