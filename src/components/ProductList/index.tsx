import React, {useState} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {vs} from 'react-native-size-matters';
import {IProduct} from '../../redux/apis/interface';
import {useProduct} from '../../Screens/Scan/useProduct';
import {COLORS} from '../../utils/theme';
import ListEmptyComponent from '../ListEmpty';
import Product from './Product';

interface ProductListProps {
  list: IProduct[];
  isHistory?: boolean;
  onPressProduct?: (arg?: any) => void;
  refetch?: () => void;
  isFetching?: boolean;
}

const ProductList: React.FC<ProductListProps> = props => {
  const {list, onPressProduct, isHistory, refetch, isFetching} = props;

  const [refreshing, setRefresh] = useState(false);

  const {handleFavourite} = useProduct();

  const onRefresh = () => {
    setRefresh(true);
    refetch && refetch();
    setTimeout(() => setRefresh(false), 1000);
  };

  const handlePressProduct = item => {
    onPressProduct && onPressProduct(item);
  };

  const EmptyComponent: React.FC = () => {
    return (
      <ListEmptyComponent text={`No ${isHistory ? 'History' : 'Favourites'}`} />
    );
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={list}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item._id}
      // bounces={false}

      ListEmptyComponent={EmptyComponent}
      renderItem={({item}) => (
        <Product
          key={item._id}
          onPressFavourite={() => {
            handleFavourite(item);
          }}
          showBorder ={true}
          onPressProduct={() => handlePressProduct(item)}
          isHistory={props?.isHistory}
          {...item}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={isFetching || refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary, COLORS.grey]}
        />
      }
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    paddingTop: vs(15),
    rowGap: vs(3),
  },
});
