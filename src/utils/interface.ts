export type PhoneNumber = {
  countryCode: string;
  number: string;
};

export interface CreateUserForm {
  name: string;
  email: string;
  password: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface UpdatePassForm {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserForm {
  email: string;
  name: string;
}

export interface ForgetPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  otp: string;
  password: string;
}

export interface User {}

export interface Icon {
  name: string;
  type:
    | 'ionicons'
    | 'material-icons'
    | 'font-awesome'
    | 'font-awesome-5'
    | 'font-awesome-5-pro'
    | 'font-awesome-6'
    | 'simple-line-icon'
    | 'zocial'
    | 'octicon'
    | 'material-community'
    | 'evilicon'
    | 'entypo'
    | 'feather'
    | 'antdesign'
    | 'fontisto'
    | 'foundation';
  disabled?: boolean;
  size?: number;
  onPress?: () => void;
}


export interface FavouriteProductResponse {
  message: string
  status: boolean
  data: FavouriteData
}

export interface FavouriteData {
  favourites: FavouriteProduct[]
  nextCursor: string
}

export interface FavouriteProduct {
  _id: string
  product: Product
  createdAt: string
}

export interface Product {
  _id: string
  name: string
  imageUrl: string
}
