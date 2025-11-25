import React, { useContext, useRef, useEffect} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '../temas/ThemeContext';
import { UserProvider, UserContext } from "../screens/userContext";
import { AccessibilityProvider } from "../screens/AccessibilityContext";
import axios from "axios";
import { API_URL } from "../screens/link";
import Pedidos from '../screens/Pedidos';
import avaliacoescuidador from "../screens/avaliacoescuidador";
import BemVindo from '../screens/BemVindo';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';

import Pagos from '../screens/Pagos';
import pendentes from '../screens/pendentes';
import Perfil from '../screens/Perfil';
import Historico from "../screens/Historico";
import Login from '../screens/Login';
import SobreNos from '../screens/SobreNos';
import ListaConversas from "../screens/ListaConversas";
import Configuracoes from '../screens/Configuracoes';
import Contratos from "../screens/Contratos";
import Dashboard from "../screens/Dashboard";
import PerfilIdoso from "../screens/PerfilIdoso";
import Conversas from "../screens/Conversas";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Feather";
import Icons from "react-native-vector-icons/AntDesign";
import * as Notifications from 'expo-notifications';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function AppTabs() {

  const { user } = useContext(UserContext);
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#fff',
        height: 100,
        borderTopWidth: 0,
        elevation: 10,
      },
      tabBarActiveTintColor: "#b08cff",
      tabBarInactiveTintColor: "#888",
    }}>
      
      <Tab.Screen
  name="Home"
  component={Home}
  options={{
    headerShown: true, 
    title: "Home", 
    tabBarLabel: "Início",
    tabBarIcon: ({ color }) => (
      <Icon name="home" size={24} color={color} />
    ),
  }}
/>
      <Tab.Screen name="Pedidos" component={Pedidos} options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color }) => (
            <Icons name="ordered-list" size={24} color={color} />
          )
        }} />

<Tab.Screen name="Mensagens" component={ListaConversas} options={{
          tabBarLabel: "Conversas",
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <Icons name="message" size={24} color={color} />
          )
        }} />
      <Tab.Screen name="Contratos" component={Contratos} options={{
          tabBarLabel: "Contratos",
          tabBarIcon: ({ color }) => (
            <Icons name="solution" size={24} color={color} />
          )
        }} />
    <Tab.Screen
  name="Perfil"
  component={Perfil}
  options={({ navigation }) => ({
    headerShown: true,
    title: "Perfil",
    tabBarLabel: "Perfil",
    tabBarIcon: ({ color }) => (
      <Icon name="user" size={24} color={color} />
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Configuracoes')}
        style={{ marginRight: 16 }}
      >
        <Icon name="settings" size={24} color="#202020" />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#202020',
  })}
/>
      
    </Tab.Navigator>
  );
}

export default function App() {


  const { user } = useContext(UserContext);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
  
      if (data?.tela) {
        navigationRef.current?.navigate(data.tela, data?.params || {});
      }
    });
  
    return () => subscription.remove();
  }, []);



  useEffect(() => {
    solicitarPermissao();
  }, []);
  async function solicitarPermissao() {
    const { status } = await Notifications.getPermissionsAsync();
  
    if (status !== 'granted') {
      const { status: novoStatus } = await Notifications.requestPermissionsAsync();
      return novoStatus === 'granted';
    }
  
    return true;
  }
  return (
    
    <AccessibilityProvider userId={user?.idProfissional || 0}>
<UserProvider>
    <ThemeProvider> 
    <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="BemVindo">
      <Stack.Screen name="BemVindo" component={BemVindo} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen 
        name="Tabs" 
        component={AppTabs} 
        options={{ headerShown: false }} 
      />
        <Stack.Screen name="Avaliar" component={avaliacoescuidador} />
        <Stack.Screen name="SobreNos" component={SobreNos} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Configuracoes" component={Configuracoes} />
        <Stack.Screen name="Conversas" component={Conversas} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil Idoso" component={PerfilIdoso} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
    </UserProvider>
    </AccessibilityProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  loginBox: {
    width: '70%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    paddingVertical: 28,
    minHeight: 320,
    borderRadius: 12,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    color: '#111',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0a84ff',
    marginRight: 8,
  },
  buttonPrimary: {
    backgroundColor: '#0a84ff',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#0a84ff',
  },
});


