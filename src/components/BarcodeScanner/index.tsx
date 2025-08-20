import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale, vs} from 'react-native-size-matters';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import FlashlightSVG from '../../assets/images/flashlight.svg';
import {COLORS} from '../../utils/theme';
import CameraDeviceError from '../CameraDeviceError';
import {BarcodeScanProps} from '../interface';
import PermissionPage from '../PermissionPage';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const BarcodeScanner: React.FC<BarcodeScanProps> = props => {
  const {onScan, scanBarcode} = props;

  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  const [isFlash, setFlash] = useState<boolean>(false);

  // const SCAN_REGION_LEFT = screenWidth * 0.1;
  // const SCAN_REGION_TOP = screenHeight * 0.3;
  // const SCAN_REGION_WIDTH = screenWidth * 0.8;
  // const SCAN_REGION_HEIGHT = screenHeight * 0.2;

  const codeScanner = useCodeScanner({
    // regionOfInterest: {
    //   height: SCAN_REGION_HEIGHT,
    //   width: SCAN_REGION_WIDTH,
    //   x: SCAN_REGION_LEFT,
    //   y: SCAN_REGION_TOP,
    // },
    codeTypes: [
      'code-128',
      'code-39',
      'code-93',
      'codabar',
      'ean-13',
      'ean-8',
      'itf',
      'upc-e',
      'upc-a',
      'qr',
      'pdf-417',
      'aztec',
      'data-matrix',
    ],
    onCodeScanned: codes => {
      console.log({codes})
      scanBarcode && onScan(codes[0].value);
      // Filter barcodes to see if they are within the scan region
      // const filteredCodes = codes.filter(code => {
      //   const {x, y, width, height} = code.frame;
      //   const barcodeCenterX = x + width / 2;
      //   const barcodeCenterY = y + height / 2;

      //   return (
      //     barcodeCenterX >= SCAN_REGION_LEFT &&
      //     barcodeCenterX <= SCAN_REGION_LEFT + SCAN_REGION_WIDTH &&
      //     barcodeCenterY >= SCAN_REGION_TOP &&
      //     barcodeCenterY <= SCAN_REGION_TOP + SCAN_REGION_HEIGHT
      //   );
      // });

      // // If there's a barcode within the region, process it
      // if (filteredCodes.length > 0) {
      //   const detectedCode = filteredCodes[0];
      //   scanBarcode && onScan(detectedCode.value);
      // }
    },
  });

  const onPressFlash = () => {
    setFlash(p => !p);
  };

  if (!hasPermission) {
    return <PermissionPage />;
  }
  if (device == null) {
    return <CameraDeviceError />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.control} onPress={onPressFlash}>
          <FlashlightSVG color={isFlash ? 'yellow' : 'white'} />
        </TouchableOpacity>
        <View />
        {/* <TouchableOpacity style={styles.control}>
          <VolHighSVG color={'white'} />
        </TouchableOpacity> */}
      </View>
      <Camera
        device={device}
        isActive={true}
        style={{height: '100%', width: '100%'}}
        codeScanner={codeScanner}
        torch={isFlash ? 'on' : 'off'}
      />
      {/* Barcode Scan Region */}
      <View style={styles.scanRegion}>
        <View style={styles.scanBorder} />
      </View>
    </View>
  );
};

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    top: vs(15),
    width: '100%',
    zIndex: 1000,
  },
  control: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cameraStyle: {
    width: '100%',
    height: '100%',
  },
  scanRegion: {
    position: 'absolute',
    left: '10%',
    top: '30%',
    width: '80%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBorder: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 10,
  },
});
