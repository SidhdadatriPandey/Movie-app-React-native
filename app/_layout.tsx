import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { MovieContext } from './context1';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <MovieContext> */}
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(screens)" />
        <Stack.Screen name='index' />
        {/* <Stack.Screen name='homeScreen' />
        <Stack.Screen name='movieScreen' />
        <Stack.Screen name='theaterScreen' />
        <Stack.Screen name='tcketScreen' /> */}
      </Stack>
      {/* </MovieContext> */}


    </ThemeProvider>
  );
}

{/* <MovieContext>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(screens)" />
          <Stack.Screen name='index' />
        </Stack>
      </MovieContext> */}

