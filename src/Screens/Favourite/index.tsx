import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {TextBigger} from '../../components/CustomText';
import LoaderModal from '../../components/Loader';
import ProductList from '../../components/ProductList';
import ScannedProduct from '../../components/ScannedProduct';
import SafeAreaWrapper from '../../components/wrapper/SafeAreaWrapper';
import {TabStackParamList} from '../../navigation/interface';
import {IProduct} from '../../redux/apis/interface';
import {useProduct} from '../Scan/useProduct';

interface FavouriteScreenProps {
  navigation: NavigationProp<TabStackParamList>;
  route: RouteProp<TabStackParamList>;
}

export const FavouriteScreen: React.FC<FavouriteScreenProps> = () => {
  const {myFavouriteProducts, favouriteLoading} = useProduct();

  const products: IProduct[] = myFavouriteProducts?.data?.favourites || [];

  const [productId, setProductId] = useState<string>('');
  const [tapped, setTapped] = useState<boolean>(false);

  const onPressProduct = async pro => {
    setTapped(true);
    setProductId(pro?._id);
    setTimeout(() => {
      setTapped(false);
    }, 100);
  };

  return (
    <>
      <SafeAreaWrapper isPaddingX isPaddingY edges={['top']}>
        <StatusBar backgroundColor={'#F4F3E4'} barStyle={'dark-content'} />

        <TextBigger bold goku>
          Favourite
        </TextBigger>
        <ProductList list={products} onPressProduct={onPressProduct} />

        <ScannedProduct productId={productId} isScanned={tapped} />
      </SafeAreaWrapper>

      {favouriteLoading && <LoaderModal />}
    </>
  );
};
