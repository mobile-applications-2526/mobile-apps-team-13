import "@/i18n";
import "react-native-reanimated";
import {configureReanimatedLogger, ReanimatedLogLevel,} from "react-native-reanimated";
import "../global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useFonts} from "expo-font";
import {Slot, useRootNavigationState, useRouter, useSegments,} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect} from "react";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {AuthProvider, useAuth} from "@/components/auth/context/AuthContext";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const LOGIN_PATH = "/(auth)/login";
const APP_PATH = "/(tabs)";

export { ErrorBoundary } from "expo-router";
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

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !rootNavigationState?.key) return;
    if (authStatus === "loading") return;

    const inAuthGroup = segments[0] === "(auth)";

    if (authStatus === "authenticated" && inAuthGroup) {
      router.replace(APP_PATH);
    } else if (authStatus === "unauthenticated" && !inAuthGroup) {
      router.replace(LOGIN_PATH);
    }
  }, [authStatus, segments, loaded, rootNavigationState?.key]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <Slot />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
