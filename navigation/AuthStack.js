import React, {useState, useEffect, useRef} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'

import FormAccidentScreen from '../screens/FormAccidentScreen';
import LoadingScreen from '../screens/LoadingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/Onboarding';
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [userType, setUserType] = useState();
  let routeName;
  const isMounted = useRef(true)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
       if(isMounted.current) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
       }
      } else {
        if(isMounted.current) {
          setIsFirstLaunch(false);
         }
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

    /* GoogleSignin.configure({
      webClientId: 'YOUR_APP_WEB_CLIENT_ID',
    }); */
    return (() => {
      isMounted.current = false
    })
  }, [isFirstLaunch]);

  if(isFirstLaunch === null) {
    return null;
  } else if ( isFirstLaunch === true ) {
    routeName="Onboarding"
  } else {
    routeName="Login"
  }

  return (
    <Stack.Navigator 
      initialRouteName={routeName}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        
        name="Loading"
        component={LoadingScreen}
      />
       <Stack.Screen
        name="Accident"
        component={FormAccidentScreen}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
      />
      <Stack.Screen
          name="Home"
          component={HomeScreen}
      />  
      
    </Stack.Navigator>
  );
};
export default AuthStack;


