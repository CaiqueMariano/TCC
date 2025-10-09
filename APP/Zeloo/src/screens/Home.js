import React, { useEffect, useContext, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Image,  ScrollView, SafeAreaView, Animated } from "react-native";
import colors from './colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from "./userContext";
import axios from "axios";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

export default function Home ({ navigation, route }) {

  //FAMILIAR CONSTS
  // 🔹 Componente Bolinha Animada
const RatingDots = () => {
  const scales = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];

  useEffect(() => {
    const animations = scales.map((scale, index) =>
      Animated.sequence([
        Animated.delay(index * 200),
        Animated.timing(scale, { toValue: 1.6, duration: 300, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
      ])
    );

    Animated.loop(Animated.sequence(animations)).start();
  }, []);

  return (
    <View style={styles.ratingContainer}>
      {scales.map((scale, i) => (
        <Animated.View key={i} style={[styles.ratingDot, { transform: [{ scale }] }]} />
      ))}
    </View>
  );
};

// Avatar da cuidadora
const CaregiverAvatar = () => (
  <View style={styles.avatar}>
    <Text style={styles.avatarSimulatedIcon}>👵</Text>
  </View>
);

// Botões de ação
const ActionButton = ({ iconName, onPress, text, iconStyle = {} }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <FontAwesome name={iconName} size={35} color="#000" style={iconStyle} />
    <Text style={styles.actionButtonText}>{text}</Text>
  </TouchableOpacity>
);

//
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
<View style={styles.container} >
  <View>
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
       <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Servico')}>
         <Image source={require('../../assets/images/cuidadores.png')} style={styles.icon} />
         <Text style={styles.cardText}>Solicitar Serviço</Text>
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
</View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    display:'hidden' ,
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
 
},


//familiar
content: { flex: 1, paddingHorizontal: 35, paddingTop: 100 },

serviceCard: {
  backgroundColor: '#b7bff4',
  borderRadius: 25,
  padding: 15,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
serviceTitle: { fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: '#000', marginBottom: 5 },
caregiverInfo: { flexDirection: 'row', alignItems: 'center' },
avatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#ffffff',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
  borderWidth: 1,
  borderColor: '#F56414',
},
avatarSimulatedIcon: { fontSize: 40 },
caregiverName: { fontSize: 20, color: '#000', marginBottom: 10 },
ratingContainer: { flexDirection: 'row' },
ratingDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#000',
  marginRight: 5,
  opacity: 0.7,
},

buttonGrid: {
  height: 260,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 20,
},
actionButton: {
  width: '48%',
  backgroundColor: '#b7bff4',
  borderRadius: 20,
  paddingVertical: 30,
  marginBottom: 15,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
},
actionButtonText: {
  marginTop: 10,
  fontSize: 14,
  fontWeight: '600',
  color: '#000',
  textAlign: 'center',
},

volumeIconContainer: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: '#F56414',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
},
});