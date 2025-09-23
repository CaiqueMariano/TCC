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

    <View style={styles.header}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <TouchableOpacity onPress={() => alert('auxiliar auditivo')}>
        <Image source={require('../../assets/images/volume.png')} style={styles.som} />
      </TouchableOpacity>
    </View>

    <View style={styles.profile}>
      <Image source={require('../../assets/images/perfil.png')} style={styles.profileImage} />
      <Text style={styles.greeting}>Olá {usuario.nomeUsuario}</Text>
    </View>

    <ScrollView contentContainerStyle={{
      flexGrow: 1,         
      paddingBottom: Platform.OS === 'web' ? width * 0.1 : width * 0.2  ,   
      paddingHorizontal: 10,
      alignItems: 'center',
    }} style={styles.content}>
      
      <View style={styles.card1}>
        <View style={styles.cardRow}>
          <Image source={require('../../assets/images/caregiver.png')} style={styles.icon} />
          <Text style={styles.cardText}>Contrate um Cuidador</Text>
        </View>
        <TouchableOpacity 
          style={styles.button1} 
          onPress={() => navigation.navigate('Contratar')}
        >
          <Text style={styles.buttonText}>Contrate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Image source={require('../../assets/images/heartcare.png')} style={styles.icon} />
          <Text style={styles.cardText}>Cuidadores que você favoritou</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Image source={require('../../assets/images/heartcare.png')} style={styles.icon} />
          <Text style={styles.cardText}>Linkar com Familiar</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Linkagem </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Image source={require('../../assets/images/perfilcard.png')} style={styles.icon} />
          <Text style={styles.cardText}>Suas informações</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
container: { 
  flex: 1, 
  backgroundColor: '#fff' 
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: colors.azul,
  paddingHorizontal: 10,
  paddingVertical: 5,        
},
logo: { 
  width: 120, 
  height: 120, 
  resizeMode: 'contain' 
},
som: { 
  width: 40, 
  height: 40, 
  resizeMode: 'contain' 
},
profile: { 
  alignItems: 'center', 
  marginVertical: 30
},
greeting: { 
  fontSize: 18,
  marginTop: 10 
},
profileImage: { 
  width: 120, 
  height: 120, 
  resizeMode: 'contain', 
  marginBottom: 10
},
content: {
  paddingBottom: 20,
},
card1: {
  width: 330,
  borderWidth: 3,
  borderColor: colors.preto,
  borderRadius: 12,
  padding: 20,
  marginBottom: 15,
  alignSelf: 'center',
  backgroundColor: colors.branco,
},
  card: {
  width: 300,
  borderWidth: 3,
  borderColor: '#000',
  borderRadius: 12,
  padding: 10,
  marginBottom: 15,
  alignSelf: 'center',
  backgroundColor: '#f9f9f9',
},
cardRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
icon: { 
  width: 70, 
  height: 70, 
  resizeMode: 'contain', 
},
cardText: { 
  fontSize: 16, 
  marginLeft: 10, 
  flexShrink: 1,
},
button1: {
  backgroundColor: colors.azul,
  paddingVertical: 10,
  marginTop: 10,
  borderRadius: 10,
  borderWidth: 3,
  borderColor: colors.preto,
  alignItems: 'center',
},
button: {
  backgroundColor: colors.azul,
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 10,
  borderWidth: 3,
  borderColor: '#000',
  alignItems: 'center',
},
buttonText: { 
  fontWeight: 'bold',
},
});