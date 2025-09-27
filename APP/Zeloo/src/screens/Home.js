import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Image,  ScrollView} from "react-native";
import colors from './colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from "./userContext";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function Home ({ navigation, route }) {
  const { user } = useContext(UserContext);
  const [usuario, setUsuario] = useState({
    nomeUsuario: ""
   


  });
  useEffect (() =>{
    if(user){
    axios.get(`http://localhost:8000/api/buscarDados/${user.idUsuario}`)
    .then(response =>{
      const dados = response.data.data;
      
      setUsuario(dados);
      setNomeUsuario(dados.nomeUsuario);
      setEmailUsuario(dados.emailUsuario);
      setTelefoneUsuario(dados.telefoneUsuario);
      setRuaUsuario(dados.ruaUsuario);
      setNumLogradouroUsuario(dados.numLogradouroUsuario);
      setBairroUsuario(dados.bairroUsuario);
      setCidadeUsuario(dados.cidadeUsuario);
      setCepUsuario(dados.cepUsuario);
      setValorEs(dados.estadoUsuario);
      setDataSelecionada(dados.dataSelecionada);
  


    })

    .catch(error =>console.log("ERRO", error));
  }

  }, [user]);

  return (
<View style={styles.container}>
  <View style={styles.Form1}></View>
  <Image 
    source={require('../../assets/images/Zeloo.png')}
    style={styles.Logo}
  />

  <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
    }}
  >
    <View style={styles.grid}>
      {/* BOTÃO CUIDADORES */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Contratar.js')}>
        <Image source={require('../../assets/images/cuidadores.png')} style={styles.icon} />
        <Text style={styles.cardText}>Cuidadores</Text>
      </TouchableOpacity>

      {/* BOTÃO FAVORITOS */}
      <TouchableOpacity style={styles.card}>
        <Image source={require('../../assets/images/favoritos.png')} style={styles.icon} />
        <Text style={styles.cardText}>Favoritos</Text>
      </TouchableOpacity>

      {/* BOTÃO PERFIL */}
      <TouchableOpacity style={styles.card}>
        <Image source={require('../../assets/images/perfilicon.png')} style={styles.icon} />   
        <Text style={styles.cardText}>Seu Perfil</Text>
      </TouchableOpacity>

      {/* BOTÃO LINKAGEM */}
      <TouchableOpacity style={styles.card}>
        <Image source={require('../../assets/images/linkagem.png')} style={styles.icon} />
        <Text style={styles.cardText}>Linkagem</Text>
      </TouchableOpacity>

      {/* BOTÃO CONVERSAS */}
      <TouchableOpacity style={styles.card}>
        <Image source={require('../../assets/images/conversas.png')} style={styles.icon} /> 
        <Text style={styles.cardText}>Conversas</Text>
      </TouchableOpacity>

      {/* BOTÃO FALE CONOSCO */}
      <TouchableOpacity style={styles.card}>
        <Image source={require('../../assets/images/faleconosco.png')} style={styles.icon} />
        <Text style={styles.cardText}>Fale Conosco</Text>
      </TouchableOpacity>
    </View>


  {/* BOTÃO DE SOM FIXO */}
  <TouchableOpacity style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
    <Image source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
  </TouchableOpacity>
  </ScrollView>
</View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  Logo: {
    left: -190,
    top: -104,
    position: 'absolute',
  },
  Form1: {
    width: width * 0.9,
    aspectRatio: 2,
    backgroundColor: '#a4e9e5',
    borderRadius: 9999,
    transform: [{ scaleX: 1.3 }],
    position: 'absolute',
    top: -20,
    left: -60,
  },
logout: {
  backgroundColor: '#fff',
  paddingHorizontal: 15,
  paddingVertical: 8,
  borderRadius: 15,
  fontWeight: 'bold',
  borderWidth: 1,
  borderColor: '#ccc'
},
grid: {
  
  marginTop: '55%',
  alignItems: 'center',
  overflow: 'hidden',

  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 15,
},
card: {
 
  width: 160,
  height: 130,
  backgroundColor: '#a4e9e5',
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'flex-end',
  margin: 12,
  elevation: 5,
  paddingBottom: 15,
  position: 'relative',
  overflow: 'visible', // garante que o ícone pode “sair”
},
icon: { 
  width: 100, 
  height: 100, 
  resizeMode: 'contain',
  position: 'absolute',
  top: -23,   // faz o ícone "sair" para fora
},
cardText: {
  fontSize: 14,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 30, // empurra o texto para baixo do ícone
},
soundButton: {
  position: 'absolute',   // geralmente melhor para botões flutuantes
  bottom: 30,
  alignSelf: 'center',
  width: 56,
  height: 56,
  borderRadius: 28,      // metade do tamanho → círculo perfeito
  backgroundColor: '#fff',
  padding: 5,            // remove espaço interno
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 10,
 
},
soundIcon: {
  width: 80,
  height: 80,
 
}
});