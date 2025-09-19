import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the home group
  return <Redirect href="/(home)" />;
}
