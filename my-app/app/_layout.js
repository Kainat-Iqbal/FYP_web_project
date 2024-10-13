// app/_layout.js
import { Stack } from 'expo-router';
import { UserProvider } from './UserContext'; // Import the UserProvider


const Layout = () => {
  return (
    <UserProvider>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Login screen */}
      <Stack.Screen name="StudentHome" options={{ title: 'Teacher Panel' }} /> {/* Teacher Panel */}
      <Stack.Screen name="Proforma" options={{ title: 'Proforma' }}/>
      <Stack.Screen name="SideNavBar" options={{title:'SideNavBar'}}/>
    </Stack>
    </UserProvider>
  );
};

export default Layout;
