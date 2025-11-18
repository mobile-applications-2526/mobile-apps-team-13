import '../global.css';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import {Slot, Stack, useRouter, useSegments} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {AuthProvider, useAuth} from "@/components/context/AuthContext";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    ComfortaaBold: require("../assets/fonts/Comfortaa-Bold.ttf"),
    ComfortaaLight: require("../assets/fonts/Comfortaa-Light.ttf"),
    ComfortaaMedium: require("../assets/fonts/Comfortaa-Medium.ttf"),
    ComfortaaRegular: require("../assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaSemiBold: require("../assets/fonts/Comfortaa-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  const { authStatus } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
      if (authStatus === 'loading') return;

      const inAuthGroup = segments[0] === '(auth)';
      const inAppGroup = segments[0] === '(tabs)';

      if (authStatus === 'authenticated' && !inAppGroup) {
         router.replace('/(tabs)');
      }
      else if (authStatus === 'unauthenticated' && !inAuthGroup) {
          router.replace('/(auth)/register');
      }
      }, [authStatus, segments, loaded])

    if (!loaded) {
        return null;
    }

  return <Slot />;
}

export default function RootLayout() {


  return (
      <AuthProvider>
          <InitialLayout />
      </AuthProvider>
  );
}
