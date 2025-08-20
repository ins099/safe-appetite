import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {setFCMToken} from '../../redux/reducers/userSlice';
import {useAppDispatch} from '../../redux/store';

type NotifArgsType = {
  title: string;
  body: string;
  channelID?: string;
  channelName?: string;
};

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  async function requestUserPermission() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      // await messaging().registerDeviceForRemoteMessages();
      await getFCMToken();
    }
  }

  const getFCMToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      if (authStatus) {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        console.log({fcmToken});
        dispatch(setFCMToken(fcmToken));
        return fcmToken;
      }
      return '';
    } catch (error) {
      console.log('ERROR GETTING TOKEN', error);
      return '';
    }
  };

  async function onDisplayNotification(args: NotifArgsType) {
    const {
      title,
      body,
      channelName = 'Default Channel',
      channelID = 'sound',
    } = args;

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: channelID,
      name: channelName,
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        circularLargeIcon: true,

        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // // pressAction is needed if you want the notification to open the app when pressed
        // pressAction: {
        //   id: 'default',
        // },
      },
    });
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  //   Foreground notification handler

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'FORE GTROU',
        JSON.stringify(remoteMessage.notification, null, 1),
      );
      onDisplayNotification({
        body: remoteMessage.notification?.body as string,
        title: remoteMessage.notification?.title as string,
        channelName: 'default',
      });
    });

    return unsubscribe;
  }, []);

  //   Background notification handler

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return {
    requestUserPermission,
    onDisplayNotification,
  };
};
