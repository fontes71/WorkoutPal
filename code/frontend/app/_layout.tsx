import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}