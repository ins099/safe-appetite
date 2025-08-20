import {ScanResponse} from '../../redux/apis/interface';
import {
  useGetMyFavouriteProductsQuery,
  useGetMyProductsQuery,
  useLazyGetProductByIdQuery,
  useLazyScanProductQuery,
  useMarkAsFavouriteMutation,
  useRemoveAsFavouriteMutation,
} from '../../redux/apis/product';
import {utility} from '../../utils/utility';

export const useProduct = () => {
  const [scanProduct, {isLoading: scanLoad}] = useLazyScanProductQuery();
  const [getProductById] = useLazyGetProductByIdQuery();

  const [markFavourite, {isLoading: markLoad}] = useMarkAsFavouriteMutation();
  const [removeFavourite, {isLoading: removeLoad}] =
    useRemoveAsFavouriteMutation();

  // History Products
  const {
    data: myProducts,
    isLoading: historyLoad,
    isFetching: historyFetch,
    refetch: refetchHistory,
  } = useGetMyProductsQuery({});

  const {
    data: myFavouriteProducts,
    isLoading: favouriteLoading,
    isFetching: favFetch,
    refetch: refetchFavourites,
  } = useGetMyFavouriteProductsQuery({});

  const handleScanProduct = async (qrCode: string) => {
    try {
      const response = await scanProduct({qrCode});
      // console.log(JSON.stringify(response.data.data.product, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
        return null;
      }
      refetchHistory();
      const data = response.data as ScanResponse;
      // console.log(JSON.stringify(data, null, 1));
      return data.data.product;
    } catch (error) {
      console.log('ERROR SCANNING', error);
    }
  };

  const handleGetProductByID = async (_id: string) => {
    try {
      const response = await getProductById({_id});
      console.log(JSON.stringify(response.data.data, null, 1));
      const error = (response.error as any) || null;
      if (error) {
        utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
        return null;
      }
      const data = response.data as ScanResponse;
      // console.log(JSON.stringify(data, null, 1));
      return data.data.product;
    } catch (error) {
      console.log('ERROR SCANNING', error);
    }
  };

  const handleFavourite = async (product: any) => {
    try {
      let response;
      if (product?.fav) {
        response = await removeFavourite({productId: product?._id});
      } else {
        response = await markFavourite({productId: product?._id});
      }
      const error = (response.error as any) || null;
      if (error) {
        return utility.showToast?.show(
          error?.error || Array.isArray(error?.data?.message)
            ? error?.data?.error[0]
            : error?.data?.error || 'Something went wrong',
        );
      }
      // utility.showToast?.show(
      //   product?.fav ? 'Removed from favourite' : 'Added to favourites',
      //   {type: 'success'},
      // );
      const data = response.data;
      console.log('HANDLE FAV RESPONSE', data);
    } catch (error) {
      console.log('ERROR FAOVUIRe', error);
    }
  };

  return {
    handleScanProduct,
    scanLoad,
    myProducts,
    historyLoad,
    myFavouriteProducts,
    handleFavourite,
    markLoad,
    removeLoad,
    favouriteLoading,
    handleGetProductByID,
    refetchHistory,
    refetchFavourites,
    historyFetch,
    favFetch,
  };
};
