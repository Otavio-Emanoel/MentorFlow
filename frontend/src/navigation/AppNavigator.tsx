import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen, AuthScreen } from '../screens';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen as any} />
      <Stack.Screen name="Auth" component={AuthScreen as any} />
      <Stack.Screen name="Login" component={LoginScreen as any} />
      <Stack.Screen name="Register" component={RegisterScreen as any} />
    </Stack.Navigator>
  </NavigationContainer>
);
