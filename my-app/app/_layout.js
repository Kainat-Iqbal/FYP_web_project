// app/_layout.js
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Login screen */}
      <Stack.Screen name="StudentHome" options={{ title: 'Teacher Panel' }} /> {/* Teacher Panel */}
    </Stack>
  );
};

export default Layout;
