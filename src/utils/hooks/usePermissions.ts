// import {
//   Permission,
//   check,
//   checkMultiple,
//   requestMultiple,
// } from 'react-native-permissions';

// export const usePermissions = () => {
//   const checkPermission = async (permisson: Permission) => {
//     try {
//       const checkResult = await check(permisson);
//       console.log(JSON.stringify(checkResult, null, 1));
//     } catch (error: any) {
//       console.log('EROROR IN CHECKING PERMSISON', error?.message);
//     }
//   };
//   const checkMultiplePermission = async (permissons: Permission[]) => {
//     try {
//       const checkResult = await checkMultiple(permissons);
//       console.log(JSON.stringify(checkResult, null, 1));
//       if (Object.values(checkResult).includes('denied')) {
//         const requestResult = await requestMultiple(permissons);
//         console.log(JSON.stringify(requestResult, null, 1));
//       }
//     } catch (error: any) {
//       console.log('EROROR IN CHECKING PERMSISON', error?.message);
//     }
//   };

//   return {checkPermission, checkMultiplePermission};
// };
