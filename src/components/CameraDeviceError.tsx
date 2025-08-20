import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CameraDeviceError = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No Camera Device Found</Text>
    </View>
  );
};

export default CameraDeviceError;

const styles = StyleSheet.create({});
