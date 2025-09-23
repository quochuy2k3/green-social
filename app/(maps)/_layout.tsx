import { Stack } from 'expo-router';

export default function MapsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[type]" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
