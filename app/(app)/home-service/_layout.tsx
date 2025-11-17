import { SalonColors } from '@/constants/theme';
import { Stack } from 'expo-router';

export default function HomeServiceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: SalonColors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="categories" />
      <Stack.Screen name="address" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
}
