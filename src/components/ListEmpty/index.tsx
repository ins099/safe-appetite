import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextBig} from '../CustomText';
import {COLORS} from '../../utils/theme';
import {scale} from 'react-native-size-matters';

const ListEmptyComponent: React.FC<{text: string}> = ({text}) => {
  return (
    <View style={styles.container}>
      <TextBig center goku bold color={COLORS.primary}>
        ~ {`${text ?? 'No Data'}`} ~
      </TextBig>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    height: scale(100),
    justifyContent: 'center',
  },
});
