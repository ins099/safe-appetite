import React from 'react';
import {StyleSheet, View} from 'react-native';
import {scale, vs} from 'react-native-size-matters';
import {Ingredient as IngredientType} from '../../redux/apis/interface';
import {TextNormal} from '../CustomText';
import Rating from '../Rating';

const Ingredient: React.FC<IngredientType> = props => {
  const {matchedTypes, providedIngredient, selectedType = 'unknown'} = props;

  const type = selectedType === 'all' ? matchedTypes[0] : selectedType;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextNormal numberOfLines={1} bold textStyle={{width: scale(200)}}>
          {providedIngredient}
        </TextNormal>
        {/* <TextSmall color={COLORS.grey}>{''}</TextSmall> */}
      </View>
      <Rating type={type} />
    </View>
  );
};

export default Ingredient;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: vs(18),
    borderBottomWidth: 1,
    borderColor: '#F7F7F9',
  },
  textContainer: {
    height: '100%',
    rowGap: vs(5),
  },
});
