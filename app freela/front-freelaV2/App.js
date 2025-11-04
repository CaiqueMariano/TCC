
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Cadastro from './screens/Cadastro';
import Home from './screens/Home';
import Pedidos from './screens/Pedidos';
import { useState } from 'react';
import {UserProvider, userProvider} from './screens/userContext';
import Contratos from './screens/Contratos';
import CadastroEndereco from './screens/🏠 CadastroEndereco';
const Stack = createNativeStackNavigator();

// adicionei coisa aqui 

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Contratos" component={Contratos} options={{ headerShown: false }} />
          <Stack.Screen name="Pedidos" component={Pedidos} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroEndereco" component={CadastroEndereco} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>   
      </NavigationContainer>
    </UserProvider>
  );
}
