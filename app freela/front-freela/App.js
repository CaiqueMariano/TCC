
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Cadastro from './screens/Cadastro';
import Home from './screens/Home';
import { useState } from 'react';
import {UserProvider, userProvider} from './screens/userContext';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>   
      </NavigationContainer>
    </UserProvider>
  );
}
