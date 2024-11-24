import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator()
import HomeMenu from "./src/components/HomeMenu"
import Login from './src/screens/Login';
import Register from './src/screens/Register';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='HomeMenu' component={HomeMenu} options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name='Register' component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}