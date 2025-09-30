import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";

import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');


import servico from "./src/screens/servico";
import disponivel from "./src/screens/disponivel";
import Login from "./src/screens/Login";
import { UserProvider } from "./userContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  return (
   <UserProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />   
        <Stack.Screen name="Servicos Disponiveis" component={disponivel} />
        <Stack.Screen name="servico" component={servico} />   
      </Stack.Navigator>
    </NavigationContainer>
  </UserProvider>
  );
}
