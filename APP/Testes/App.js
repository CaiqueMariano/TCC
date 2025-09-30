import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";

import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');


import servico from "./src/screens/servico";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// No futuro sera configuracoes e notificacoes

export default function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="servico0" component={servico} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
