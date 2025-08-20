import React from 'react';
import {useToast} from 'react-native-toast-notifications';
// import {useAppDispatch} from '../../../redux/store';
import {preReqs} from '../../utils/service/preReqs';

type ReqsProviderProps = {
  children: React.ReactNode;
};

const ReqsProvider: React.FC<ReqsProviderProps> = ({children}) => {
  // preReqs(useToast, useAppDispatch);
  preReqs(useToast);
  return children;
};

export default ReqsProvider;
