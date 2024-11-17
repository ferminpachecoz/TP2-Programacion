import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator()
import HomeMenu from "./components/HomeMenu"
import Login from './screens/Login';
import Register from './screens/Register';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name='HomeMenu' component={ HomeMenu } />
        <Stack.Screen options={{headerShown: false}} name="Login" component={ Login} />
        <Stack.Screen options={{headerShown: false}} name='Register' component={ Register } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
