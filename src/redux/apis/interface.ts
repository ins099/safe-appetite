// RESPONSE TYPES

import {ProductProps, RatingTypes} from '../../components/interface';

export interface SendOTPResponse {
  success: boolean;
  message: string;
}

export interface VerifyOTPResponse {
  message: string;
  status: boolean;
  data: {token: string};
}

export interface LoginResponse {
  message: string;
  status: boolean;
  data: LoginData;
}

export interface LoginData {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  userRole: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface RegisterResponse {
  data: RegisterData;
  message: string;
  status: boolean;
}

export interface RegisterData {
  token: string;
  user: User;
}

export interface GetUserResponse {
  data: UserData;
}
export interface ForgotPassResponse {
  data: ForgotData;
  message: string;
  status: boolean;
}

export interface UserData {
  __v: number;
  _id: string;
  createdAt: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  name: string;
  otp: number;
  updatedAt: string;
  userRole: string;
}
export interface ForgotData {
  otp: string;
}

export interface ResetPassResponse {
  data: ResetPassData;
  message: string;
  status: boolean;
}

export interface ResetPassData {
  otp: string;
}

export interface ScanResponse {
  message: string;
  status: boolean;
  data: ScanData;
}

export interface ScanData {
  product: ScanProduct;
}

export interface IProduct extends ScanProduct {
  onPressFavourite?: () => void;
  onPressProduct: () => Promise<void>;
  fav?: boolean;
  isHistory?: boolean;
  isGood?: boolean;
  showBorder?: boolean;
  createdAt?: Date;
}

export interface ScanProduct {
  qrCode?: string;
  name: string;
  noOfIngredients?: number;
  ingredientText?: string;
  ingredients?: Ingredient[];
  imageUrl: string;
  user?: string;
  fromIsScanned?: boolean;
  _id: string;
}

export interface Ingredient {
  providedIngredient: string;
  matchedTypes: RatingTypes[];
  selectedType?: RatingTypes;
}

export interface HistoryResponse {
  message: string;
  status: boolean;
  data: HistoryData;
}

export interface HistoryData {
  products: HistoryProduct[];
  nextCursor: any;
}

export interface HistoryProduct extends ProductProps {
  _id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
}

export interface Root {
  message: string;
  status: boolean;
  data: Data;
}

export interface Data {
  product: IProduct;
}
