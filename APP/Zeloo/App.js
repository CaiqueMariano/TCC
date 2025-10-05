import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";

import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');


import Login from "./src/screens/Login";
import BemVindo from "./src/screens/BemVindo";
import Cadastro from "./src/screens/Cadastro";
import Home from "./src/screens/Home";
import Perfil from "./src/screens/Perfil";
import colors from './src/screens/colors';
import Conta from "./src/screens/Conta";
import configuracoes from "./src/screens/configuracoes";
import Contratar from "./src/screens/Contratar";
import HomeFamiliar from './src/screens/homeFamiliar';
import Adicionar from './src/screens/Adicionar';
import { UserProvider } from "./src/screens/userContext";
import Contrato from './src/screens/Contrato';
import Servico from './src/screens/Servico'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// No futuro sera configuracoes e notificacoes
function TabRoutes() {
  return (
   <Tab.Navigator screenOptions={{ 
    headerShown: false, 
    tabBarShowLabel: true,
    tabBarActiveTintColor: colors.azul,
    tabBarInactiveTintColor: colors.preto,
    tabBarStyle: {
          height: '10%',
          position: Platform.OS === 'web' ? 'relative' : 'absolute',
        },
    }}>

      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon:  ({color}) => (
          <Ionicons name="home" size = {20} color={color}/>
          ),
        }}
      /> 

      <Tab.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{
      
          tabBarIcon:  ({color}) => (
          <Ionicons name="person-circle" size = {20} color={color}/>
          ),
          
        }}
      /> 

      
      
      <Tab.Screen 
        name="Configurações" 
        component={configuracoes} 
        options={{
          
          tabBarIcon:  ({color}) => (
          <Ionicons name="settings" size = {20} color={color}/>
          ),
        }}
      /> 

      

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name="BemVindo" component={BemVindo} />
        <Stack.Screen name="Adicionar" component={Adicionar} />
        <Stack.Screen name="Conta" component={Conta} />
        <Stack.Screen name="Home" component={TabRoutes} />
        <Stack.Screen name="Servico" component={Servico} />
        <Stack.Screen name="homeFamiliar" component={HomeFamiliar} />
        
        <Stack.Screen name="Contrato" component={Contrato} />
        <Stack.Screen name="configuracoes" component={configuracoes} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
       
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
