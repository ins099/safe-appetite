import React, {useState} from 'react';
import {
  ActivityIndicator,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface CustomImageProps {
  source: {uri: string} | number;
  imgStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  height?: number;
  width?: number;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
}

const CustomImage: React.FC<CustomImageProps> = props => {
  const {containerStyle, onPress, imgStyle, height, width, source, resizeMode} =
    props;
  const disabled = typeof onPress !== 'function';
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onLoadStart = () => setIsLoading(true);
  const onLoadEnd = () => setIsLoading(false);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        height ? {height} : null,
        width ? {width} : null,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <FastImage
        source={source}
        style={[styles.img, imgStyle as any]}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        resizeMode={resizeMode || 'stretch'}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          // color={COLORS.primary}
          style={styles.loader}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {height: 100, width: 100},
  img: {height: '100%', width: '100%'},
  loader: {position: 'absolute', top: 0, right: 0, left: 0, bottom: 0},
});
