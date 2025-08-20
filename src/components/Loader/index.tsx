import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoaderModal = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'white'} />
    </View>
  );
};

export default LoaderModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10000,
  },
});
