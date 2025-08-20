/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import {scale, vs} from 'react-native-size-matters';
import {useProduct} from '../../Screens/Scan/useProduct';
import {BUTTONROWLIST} from '../../utils/constants';
import {COLORS} from '../../utils/theme';
import CustomButton from '../CustomButton';
import CustomIcon from '../CustomIcon';
import {TextBig, TextSmall} from '../CustomText';
import Ingredient from '../Ingridient';
import {ButtonRowProps, ScannedProductProps} from '../interface';
import ListEmptyComponent from '../ListEmpty';
import Product from '../ProductList/Product';
import Sheet from '../Sheet';

const ButtonRow: React.FC<ButtonRowProps> = props => {
  const {list, onPressItem, selected} = props;
  return (
    <View style={styles.buttonRow}>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{gap: scale(5)}}
        renderItem={({item}) => (
          <CustomButton
            key={item.id}
            title={item.title}
            onPress={() => onPressItem(item.id)}
            secondary={item.id !== selected?.id}
            containerStyle={{
              paddingHorizontal: scale(9),
              minWidth: 0,
              height: vs(35),
              shadowOpacity: 0,
            }}
          />
        )}
      />
    </View>
  );
};

const ScannedProduct: React.FC<ScannedProductProps> = props => {
  const {qrCode, isScanned, productId} = props;
  const {handleFavourite, handleScanProduct, handleGetProductByID} =
    useProduct();

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showSheet, setShowSheet] = useState<boolean>(false);

  const [ingredients, setIngredients] = useState<any[]>(
    product?.ingredients || [],
  );

  const [type, setType] = useState<any>('all');

  const onSelectType = (type: string) => {
    setType(type);
    if (type === 'all') {
      return setIngredients(product.ingredients);
    }
    const filter = product.ingredients.filter(ing =>
      ing.matchedTypes.includes(type),
    );
    setIngredients(filter);
  };

  const getScanData = async () => {
    try {
      setIsLoading(true);
      const res = await handleScanProduct(qrCode as string);
      if (res) {
        setProduct(res);
        setIngredients(res?.ingredients);
        setShowSheet(true);
      }
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const res = await handleGetProductByID(productId as string);
      if (res) {
        setProduct(res);
        setIngredients(res?.ingredients);
        setShowSheet(true);
      }
    } catch (error) {
      console.log('ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSheet = () => setShowSheet(false);

  useEffect(() => {
    if (qrCode && !isScanned) {
      console.log('SCANNING EFFECT');
      getScanData();
    }
    if (productId && isScanned) {
      console.log('GETTING EFFECT');
      getProduct();
    }
  }, [qrCode, productId, isScanned]);

  const onFavourite = async item => {
    setProduct(p => ({...p, fav: !product?.fav}));
    const res = await handleFavourite(item);
    console.log('RES', res);
  };

  return (
    <>
      {showSheet && (
        <Sheet>
          <View style={styles.container}>
            <View style={{alignItems: 'flex-end'}}>
              <CustomIcon name="cross" type="entypo" onPress={closeSheet} />
            </View>
            <Product
              onPressProduct={undefined}
              name={''}
              imageUrl={''}
              _id={''}
              fav={product?.fav}
              fromIsScanned={true}
              {...product}
              onPressFavourite={() => onFavourite(product)}
            />
            <View style={styles.ingHeadRow}>
              <TextBig bold goku>
                Ingredients
              </TextBig>
              <TextSmall color={COLORS.grey}>
                {product?.noOfIngredients} ingredients
              </TextSmall>
            </View>
            <ButtonRow
              list={BUTTONROWLIST}
              selected={{id: type}}
              onPressItem={selectedId => onSelectType(selectedId)}
            />
            <FlatList
              data={ingredients}
              style={{height: vs(285)}}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <ListEmptyComponent text="None Found" />
              )}
              renderItem={({item, index}) => (
                <Ingredient key={index} {...item} selectedType={type} />
              )}
            />
          </View>
        </Sheet>
      )}

      <ReactNativeModal isVisible={isLoading}>
        <ActivityIndicator size={'large'} color={'white'} />
      </ReactNativeModal>
    </>
  );
};

export default ScannedProduct;

const styles = StyleSheet.create({
  container: {},
  ingHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vs(15),
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
    marginVertical: vs(15),
  },
});
