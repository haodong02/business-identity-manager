import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="home" />
        <Stack.Screen name="business-detail" />
        <Stack.Screen name="add-business" />
        <Stack.Screen name="edit-business" />
        <Stack.Screen name="demo-assisted-fill" />
        <Stack.Screen name="settings" />
      </Stack>
    </SafeAreaProvider>
  );
}