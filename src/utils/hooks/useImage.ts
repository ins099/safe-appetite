import {launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native-compressor';

type Asset = {
  base64?: string;
  uri: string;
  width?: number;
  height?: number;
  originalPath?: string;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
};

export const useImage = () => {
  const getGalleryPhoto = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        // includeBase64: true,
        selectionLimit: 1,
      });
      if (response.didCancel) {
        return;
      }
      return await compressImages(response.assets as Asset[]);
    } catch (error: any) {
      console.log('ERROR GETTING GALLERY IMAGE', error?.message);
    }
  };

  const compressImages = async (assets: Asset[]) => {
    try {
      const compressedImages = [];
      for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const response = await Image.compress(asset.uri, {
          compressionMethod: 'manual',
          returnableOutputType: 'uri',
          output: 'jpg',
          quality: 0.5,
        });
        compressedImages.push({...asset, uri: response});
      }
      return compressedImages;
    } catch (error: any) {
      console.log('ERROR ++++', error?.message);
    }
  };

  return {getGalleryPhoto};
};
