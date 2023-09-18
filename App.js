import 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Providers from './navigation';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingScreen from './screens/LoadingScreen';
import moment from 'moment';
import "moment/locale/fr-ca"

moment.locale('fr');
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }), 
}); 
 const App = () => {  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  let [fontsloaded] = Font.useFonts({
    'Teko-Bold': require('./assets/fonts/Teko-Bold.ttf'),
        'Teko-Light': require('./assets/fonts/Teko-Light.ttf'),
        'Teko-Medium': require('./assets/fonts/Teko-Medium.ttf'),
        'Teko-Regular': require('./assets/fonts/Teko-Regular.ttf'),
        'Teko-SemiBold': require('./assets/fonts/Teko-SemiBold.ttf'),
        'Kufam-SemiBoldItalic': require('./assets/fonts/Kufam-SemiBoldItalic.ttf'),
        'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
        'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
        'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
        'Oswald-ExtraLight': require('./assets/fonts/Oswald-ExtraLight.ttf'),
        'Oswald-Light': require('./assets/fonts/Oswald-Light.ttf'),
        'Oswald-Medium': require('./assets/fonts/Oswald-Medium.ttf'),
        'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
        'Oswald-SemiBold': require('./assets/fonts/Oswald-SemiBold.ttf'),
  })
 
  // let [fontsloaded] = Font.useFonts({
  //   'Teko-Bold': require('./assets/fonts/Teko-Bold.ttf'),
  //       'Teko-Light': require('./assets/fonts/Teko-Light.ttf'),
  //       'Teko-Medium': require('./assets/fonts/Teko-Medium.ttf'),
  //       'Teko-Regular': require('./assets/fonts/Teko-Regular.ttf'),
  //       'Teko-SemiBold': require('./assets/fonts/Teko-SemiBold.ttf'),
  //       'Kufam-SemiBoldItalic': require('./assets/fonts/Kufam-SemiBoldItalic.ttf'),
  //       'Lato-BoldItalic': require('./assets/fonts/Lato-BoldItalic.ttf'),
  //       'Lato-Italic': require('./assets/fonts/Lato-Italic.ttf'),
  //       'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  //       'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  //       'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  //       'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  //       'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
  //       'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
  //       'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  //       'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  //       'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
  //       'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
  //       'Oswald-ExtraLight': require('./assets/fonts/Oswald-ExtraLight.ttf'),
  //       'Oswald-Light': require('./assets/fonts/Oswald-Light.ttf'),
  //       'Oswald-Medium': require('./assets/fonts/Oswald-Medium.ttf'),
  //       'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
  //       'Oswald-SemiBold': require('./assets/fonts/Oswald-SemiBold.ttf'),
  //       ...Ionicons.font
  // })
  // Keep the splash screen visible while we fetch resources
//SplashScreen.preventAutoHideAsync();
 
const onLayoutRootView = useCallback(async() => {
  if(fontsloaded) {
    await SplashScreen.hideAsync()
  }
})

useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
 //   console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);
 
  if(!fontsloaded) {
     return null;
  } 
   
  return (
    <ToastProvider style={{ zIndex: 20 }}>
      <Providers />
      <StatusBar style="auto" />
    </ToastProvider> 
  );
}
export default App;



async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log("Échec de l'obtention du jeton de poussée pour la notification de poussée !");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    console.log(token);
  } else {
    console.log("Obligation d'utiliser un appareil physique pour les notifications push");
  }

  return token;
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
