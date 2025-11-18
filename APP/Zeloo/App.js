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
import Ativos from "./src/screens/Ativos";
import Apagar from "./src/screens/Apagar";
import Pendente from "./src/screens/Pendente";
import favoritos from "./src/screens/favoritos";
import Perfil from "./src/screens/Perfil";
import colors from './src/screens/colors';
import telaPagamento from './src/screens/telaPagamento';
import Conta from "./src/screens/Conta";
import configuracoes from "./src/screens/configuracoes";
import Contratar from "./src/screens/Contratar";
import HomeFamiliar from './src/screens/homeFamiliar';
import Adicionar from './src/screens/Adicionar';
import { UserProvider } from "./src/screens/userContext";
import perfilProfissional from './src/screens/perfilProfissional';
import Contrato from './src/screens/Contrato';
import Servico from './src/screens/Servico'
import PerguntasC from './src/screens/PerguntasC'
import pagamento from './src/screens/pagamento'
import Conversas from './src/screens/Conversas'
import { AccessibilityProvider } from './src/screens/AccessibilityContext';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
<UserProvider>
  <AccessibilityProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name="BemVindo" component={BemVindo} />
        <Stack.Screen name="Adicionar" component={Adicionar} />
        <Stack.Screen name="telaPagamento" component={telaPagamento} />
        <Stack.Screen name="Conta" component={Conta} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Servico" component={Servico} />
        <Stack.Screen name="homeFamiliar" component={HomeFamiliar} />
        <Stack.Screen name="Apagar" component={Apagar} />
        <Stack.Screen name="Perfil Profissional" component={perfilProfissional} options={{ headerShown: true }}/>
        <Stack.Screen name="Pendente" component={Pendente} />
        <Stack.Screen name="Ativos" component={Ativos} />
        <Stack.Screen name="Contrato" component={Contrato} />
        <Stack.Screen name="favoritos" component={favoritos} />
        <Stack.Screen name="configuracoes" component={configuracoes} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="PerguntasC" component={PerguntasC} />
        <Stack.Screen name="pagamento" component={pagamento} />
        <Stack.Screen name="Conversas" component={Conversas} />
       
      </Stack.Navigator>
    </NavigationContainer>
    </AccessibilityProvider>
  </UserProvider>
  );
}
