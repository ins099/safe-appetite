import {combineReducers} from '@reduxjs/toolkit';
import generalSlice from './generalSlice';
import userSlice from './userSlice';
import {authApis} from '../apis/auth';
import {questionaireAPIS} from '../apis/questionaires';
import {productAPIS} from '../apis/product';

export const allReducers = combineReducers({
  generalSlice,
  userSlice,
  [authApis.reducerPath]: authApis.reducer,
  [questionaireAPIS.reducerPath]: questionaireAPIS.reducer,
  [productAPIS.reducerPath]: productAPIS.reducer,
});
