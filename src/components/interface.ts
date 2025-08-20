import {ViewStyle} from 'react-native';
import {ScanProduct} from '../redux/apis/interface';

export interface PaginationProps {
  containerStyle?: ViewStyle;
  pagStyle?: ViewStyle;
  pages?: number;
  currentPage?: number;
}

export interface IngridientProps {
  name: string;
  calorie: string;
  ratingType: RatingTypes;
}

export type RatingTypes =
  | 'MY_ALLERGENS'
  | 'MY_INTOLERENCES'
  | 'DIETERY_PREFERENCES'
  | 'DISLIKES'
  | 'Good'
  | 'Warning'
  | 'all';

export type RatingProps = {
  type: RatingTypes;
};

export interface ProductProps {
  id: string;
  title: string;
  desc: string;
  image: string | any;
  fav: boolean;
  rating: RatingTypes;
  isRated: boolean;
  fromIsScanned?: boolean;
  onPress?: () => void;
}

export interface ScannedProductProps {
  qrCode?: string;
  productId?: string;
  isFetchProduct?: boolean;
  fromIsScanned?: boolean;
  isScanned?: boolean; // this shows if there's been a recent scan
}

export interface Button {
  title: string;
  id: string;
}

export interface ButtonRowProps {
  selected: {id: string} | null;
  list: Button[];
  onPressItem: (id: string) => void;
}

export interface BarcodeScanProps {
  onScan: (event: any) => void;
  scanBarcode: boolean;
}

export interface OptionListProps {
  containerStyles?: ViewStyle;
  isSearch?: boolean;
  isEdit?: boolean;
  isMultiple?: boolean;
  limit?: number;
  options: OptionProps[] | undefined;
  value: OptionProps[];
  refreshing?: boolean;
  onChange: (arg: OptionProps[]) => void;
  onRefresh: () => void;
  onReachEnd?: () => void;
  onSearch?: (text: string) => void;
}

export interface OptionProps {
  title: string;
  _id: string;
  description?: string;
  isChecked?: boolean;
  isLinked?: boolean;
  onPress?: (arg?: any) => void;
}
