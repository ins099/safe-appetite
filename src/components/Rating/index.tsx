import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {RATING} from '../../utils/constants';
import CustomIcon from '../CustomIcon';
import {TextSmall} from '../CustomText';
import {RatingProps} from '../interface';

const Rating: React.FC<RatingProps> = props => {
  const {type} = props;

  return (
    <View style={{...styles.ratingBox, borderColor: RATING[type]?.color}}>
      <CustomIcon disabled {...RATING[type]?.icon} />
      <TextSmall color={RATING[type]?.color} textStyle={{left: -scale(5)}}>
        {RATING[type]?.label}
      </TextSmall>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
});
