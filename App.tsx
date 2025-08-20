import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ReqsProvider from './src/components/wrapper/ReqsProvider';
import RootNavigation from './src/navigation';
import {persistor, store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox, StatusBar} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor={'#F4F3E4'} barStyle={'dark-content'} />
      <ToastProvider placement="top" duration={4000} style={{top: 30}}>
        <ReqsProvider>
          <PersistGate persistor={persistor}>
            <Provider store={store}>
              <NavigationContainer>
                <RootNavigation />
              </NavigationContainer>
            </Provider>
          </PersistGate>
        </ReqsProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

export default App;
