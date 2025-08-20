import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, StatusBar, StyleSheet, View} from 'react-native';
import BarcodeScanner from '../../components/BarcodeScanner';
import ScannedProduct from '../../components/ScannedProduct';
import SafeAreaWrapper from '../../components/wrapper/SafeAreaWrapper';
import {TabStackParamList} from '../../navigation/interface';
import {useGetUserQuery} from '../../redux/apis/auth';

interface ScanScreenProps {
  navigation: NavigationProp<TabStackParamList>;
  route: RouteProp<TabStackParamList>;
}

export const ScanScreen: React.FC<ScanScreenProps> = () => {
  const [scan, setScan] = useState<boolean>(true);
  const [qrCode, setQRCode] = useState<string>('');

  useGetUserQuery({});

  const onScan = async (code: string) => {
    console.log('SCAN SCAN');
    setScan(false);
    setQRCode(code);
    // reset Scan
    setTimeout(() => setScan(true), 2000);
  };

  return (
    <SafeAreaWrapper edges={['top']}>
      <StatusBar backgroundColor={'#F4F3E4'} barStyle={'dark-content'} />
      <View style={styles.cameraContainer}>
        <BarcodeScanner onScan={onScan} scanBarcode={scan} />
        {/* <Button title="Scan" onPress={() => onScan('8002270014901')} /> */}
      </View>
      <ScannedProduct qrCode={qrCode} isScanned={scan} />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});
