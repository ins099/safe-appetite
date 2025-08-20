// import {useEffect} from 'react';
// import {Platform} from 'react-native';
// import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
// import {usePermissions} from './usePermissions';

// const isAndroid = Platform.OS === 'android';

// export const useLocation = () => {
//   const {checkMultiplePermission} = usePermissions();
//   const permissionToRequest = isAndroid
//     ? [
//         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//         PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
//       ]
//     : [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];

//   const requestPermissions = async () => {
//     try {
//       const result: any = await checkMultiplePermission(permissionToRequest);
//     } catch (error: any) {
//       console.log('ERORROR REQUSESTUING LCOATION PERMSIISON', erorr?.message);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//   });

//   return {};
// };
