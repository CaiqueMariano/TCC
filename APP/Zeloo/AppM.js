import React, { useState, useEffect, useRef, useContext} from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { API_URL } from './src/screens/link';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


import { UserContext } from './src/screens/userContext';



import Login from "./src/screens/Login";
import BemVindo from "./src/screens/BemVindo";
import Cadastro from "./src/screens/Cadastro";
import ServicoFav from './src/screens/ServicoFav';
import Home from "./src/screens/Home";
import Ativos from "./src/screens/Ativos";
import Apagar from "./src/screens/Apagar";
//import Config from './src/screens/config';
import Pendente from "./src/screens/Pendente";
import avaliacoescuidador from './src/screens/avaliacoescuidador';
import favoritos from "./src/screens/favoritos";
import Perfil from "./src/screens/Perfil";
import telaPagamento from './src/screens/telaPagamento';
import Conta from "./src/screens/Conta";
import configuracoes from "./src/screens/configuracoes";
import Contratar from "./src/screens/Contratar";
import HomeFamiliar from './src/screens/homeFamiliar';
import Adicionar from './src/screens/Adicionar';
import perfilProfissional from './src/screens/perfilProfissional';
import Contrato from './src/screens/Contrato';
import ListaConversas from './src/screens/ListaConversas';
import Servico from './src/screens/Servico';
import PerguntasC from './src/screens/PerguntasC';
import pagamento from './src/screens/pagamento';
import Conversas from './src/screens/Conversas';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

export default function AppM() {
  const navigationRef = useRef();

  useEffect(() => {

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notificação clicada:", response);

     
        if (navigationRef.current) {
          navigationRef.current.navigate("PerguntasC");
        }

       
        const notifId = response.notification.request.identifier;
        Notifications.dismissNotificationAsync(notifId);
      }
    );

    return () => subscription.remove();
  }, []);

  return (
   
    <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen name="BemVindo" component={BemVindo} />
            <Stack.Screen name="Avaliar" component={avaliacoescuidador} />
            <Stack.Screen name="Adicionar" component={Adicionar} />
            <Stack.Screen name="telaPagamento" component={telaPagamento} />
            <Stack.Screen name="Conta" component={Conta} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Servico" component={Servico} />
            <Stack.Screen name="ServicoFav" component={ServicoFav} />
            <Stack.Screen name="homeFamiliar" component={HomeFamiliar} />
            <Stack.Screen name="Apagar" component={Apagar} />
            <Stack.Screen name="Perfil Profissional" component={perfilProfissional} options={{ headerShown: true }}/>
            <Stack.Screen name="Pendente" component={Pendente} />
            <Stack.Screen name="Ativos" component={Ativos} />
            <Stack.Screen name="Contrato" component={Contrato} />
            <Stack.Screen name="favoritos" component={favoritos} />
            <Stack.Screen name="Mensagens" component={ListaConversas} options={{ unmountOnBlur: true }} />
            <Stack.Screen name="configuracoes" component={configuracoes} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="PerguntasC" component={PerguntasC} />
            <Stack.Screen name="pagamento" component={pagamento} />
            <Stack.Screen name="Conversas" component={Conversas} />

          </Stack.Navigator>
        </NavigationContainer>
  );
}


export const completarCadastro = async () => {

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Complete seu cadastro!",
        body: "Preencha informações relevantes para sua conta!",
        sound: true
      },trigger: { seconds: 10 }
    });
  
  };
