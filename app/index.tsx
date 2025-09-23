import { Redirect } from 'expo-router';

export default function Index() {
  // This will be handled by InitialLayout in _layout.tsx
  // Just redirect to home, the auth logic will handle the rest
  return <Redirect href="/(home)" />;
}
