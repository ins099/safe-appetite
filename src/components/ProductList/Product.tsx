import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ms, scale, vs} from 'react-native-size-matters';
import {IProduct} from '../../redux/apis/interface';
import {timeAgo} from '../../utils/helpers';
import {COLORS} from '../../utils/theme';
import CustomIcon from '../CustomIcon';
import CustomImage from '../CustomImage';
import {TextBig, TextSmall, TextSmaller} from '../CustomText';
import Rating from '../Rating';

const Product: React.FC<IProduct> = props => {
  const {
    _id,
    fav,
    fromIsScanned = false,
    onPressFavourite,
    onPressProduct,
    imageUrl,
    isHistory,
    showBorder,
    name,
    isGood,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBorder && {
          borderBottomColor: COLORS.lightgrey,
          borderBottomWidth: 1,
        },
      ]}
      key={_id}
      disabled={typeof onPressProduct !== 'function'}
      onPress={onPressProduct}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={{uri: imageUrl}}
          height={vs(100)}
          width={scale(90)}
          resizeMode="contain"
        />
      </View>
      <View style={styles.centerContainer}>
        <TextBig style={{fontSize: scale(14)}} numberOfLines={2}>
          {name}
        </TextBig>
        {/* <TextSmall numberOfLines={1} color={COLORS.grey}>
          {''}
        </TextSmall> */}
        <View style={styles.row}>
          <Rating type={isGood ? 'Good' : 'Warning'} />
          {!fromIsScanned && isHistory && (
            <View style={styles.rated}>
              <CustomIcon
                name={'clock'}
                type="material-community"
                disabled
                solid={false}
                color={COLORS.grey}
                size={ms(16)}
                containerStyle={{marginRight: 4}}
              />
              <TextSmaller color={COLORS.grey} bold>
                {timeAgo(props?.createdAt)}
              </TextSmaller>
            </View>
          )}
        </View>
      </View>
      <View
        style={[
          styles.iconContainer,
          fromIsScanned && {justifyContent: 'flex-start'},
        ]}>
        <CustomIcon
          name={fav ? 'heart' : 'heart-outline'}
          type="material-community"
          size={ms(25)}
          color={COLORS.primary}
          onPress={onPressFavourite}
        />
        {!fromIsScanned && (
          <CustomIcon
            name="chevron-right"
            type="material-community"
            size={ms(25)}
            disabled
            color={COLORS.primary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    padding: ms(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: vs(110),
  },
  imageContainer: {
    // flex: 2,
  },
  centerContainer: {
    flex: 4,
    height: '100%',
    paddingHorizontal: scale(15),
    paddingVertical: vs(10),
    justifyContent: 'center',
    rowGap: vs(8),
  },
  iconContainer: {
    flex: 1,
    height: '100%',
    paddingVertical: vs(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
    rowGap: vs(8),
  },
  rated: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    // gap: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
