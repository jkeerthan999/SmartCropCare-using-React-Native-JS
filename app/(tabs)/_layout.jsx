import { Stack } from 'expo-router';
import { enableScreens } from 'react-native-screens';
import { useEffect } from 'react';
import { Platform } from 'react-native';

// ✅ Enable screens for better performance
enableScreens();

const Layout = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // ✅ Required for Reanimated to work properly on Android
      require('react-native-reanimated').default;
    }
  }, []);

  return (
    <Stack 
      screenOptions={{
        headerShown: false, // ✅ Hide headers for all screens
        animation: 'slide_from_right', // ✅ Apply slide animation on screen transitions
      }}
    >
      {/* ✅ Define all app screens */}
      <Stack.Screen name="home" />
      <Stack.Screen name="weather" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="ourstore" />
      <Stack.Screen name="yourorder" />
      <Stack.Screen name="nearbystore" />
      <Stack.Screen name="news" />
      <Stack.Screen name="diseasedetection" />
      <Stack.Screen name="help" />
      <Stack.Screen name="settings" />
    </Stack>
  );
};

export default Layout;