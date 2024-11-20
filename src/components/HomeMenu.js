import React from 'react'
import { Text, View } from 'react-native-web'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MiPerfil from "../screens/MiPerfil"
import CrearPosteo from "../screens/CrearPosteo"
import Home from "../screens/Home"
import FontAwesome from "@expo/vector-icons/FontAwesome"
const Tab = createBottomTabNavigator()

export default function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen name='Home' component={Home} options={{tabBarIcon: ()=> <FontAwesome name="home" size={24} color="black" />}} />
      <Tab.Screen name='MiPerfil' component={MiPerfil} options={{tabBarIcon: ()=> <FontAwesome name="user" size={24} color="black" />}} />
      <Tab.Screen name='CrearPosteo' component={CrearPosteo} options={{tabBarIcon: ()=> <FontAwesome name="pencil" size={24} color="black" />}} />
    </Tab.Navigator>
  )
}