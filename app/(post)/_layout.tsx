import { Stack } from 'expo-router';

export default function PostLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="[postId]" 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="create" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
