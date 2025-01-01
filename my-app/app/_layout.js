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
      <Stack.Screen name="Insights" options={{title:'Insights'}}/>
      <Stack.Screen name="Demo" options={{ title: 'Demo' }}/>

      <Stack.Screen name="ParentSignup" options={{title:'ParentSignup'}} />
      <Stack.Screen name="ChatbotScreen" options={{ title:'ChatbotScreen'}} />
      <Stack.Screen name="Recommendation" options={{ title:'Recommendation'}} />

    </Stack>
    </UserProvider>
  );
};

export default Layout;
