import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {TextBigger} from '../../components/CustomText';
import LoaderModal from '../../components/Loader';
import ProductList from '../../components/ProductList';
import ScannedProduct from '../../components/ScannedProduct';
import SafeAreaWrapper from '../../components/wrapper/SafeAreaWrapper';
import {TabStackParamList} from '../../navigation/interface';
import {HistoryProduct} from '../../redux/apis/interface';
import {useProduct} from '../Scan/useProduct';

interface HistoryScreenProps {
  navigation: NavigationProp<TabStackParamList>;
  route: RouteProp<TabStackParamList>;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = () => {
  const {myProducts, historyLoad, refetchHistory, historyFetch} = useProduct();

  const [productId, setProductId] = useState<string>('');
  const [tapped, setTapped] = useState<boolean>(false);

  const onPressProduct = async pro => {
    setTapped(true);
    setProductId(pro?._id);
    setTimeout(() => {
      setTapped(false);
    }, 100);
  };

  const products: HistoryProduct[] = myProducts?.data?.products || [];

  return (
    <>
      <SafeAreaWrapper isPaddingX isPaddingY edges={['top']}>
        <StatusBar backgroundColor={'#F4F3E4'} barStyle={'dark-content'} />

        <TextBigger bold goku>
          History
        </TextBigger>

        <ProductList
          list={products}
          onPressProduct={onPressProduct}
          isHistory
          refetch={refetchHistory}
          isFetching={historyFetch}
        />

        <ScannedProduct productId={productId} isScanned={tapped} />
      </SafeAreaWrapper>
      {historyLoad && <LoaderModal />}
    </>
  );
};
