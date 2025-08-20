import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';
import CustomButton from './CustomButton';
import {TextNormal} from './CustomText';

const PermissionPage = () => {
  const {requestPermission, hasPermission} = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 12,
      }}>
      <TextNormal>No Permission Granted</TextNormal>
      <CustomButton title="Request Permission" onPress={requestPermission} />
    </View>
  );
};

export default PermissionPage;

const styles = StyleSheet.create({});
