import React, { useEffect, useContext, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Image,  ScrollView, SafeAreaView, Animated } from "react-native";
import colors from './colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from "./userContext";
import axios from "axios";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { API_URL } from '../screens/link';
const { width, height } = Dimensions.get("window");

export default function Home ({ navigation}) {

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
    axios.get(`${API_URL}/api/buscarDados/${user.idUsuario}`)
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
    <Image 
     source={require('../../assets/images/Zeloo.png')}
     style={styles.Logo}
   />
 
 <ScrollView
  contentContainerStyle={styles.scrollContainer}
  showsVerticalScrollIndicator={false}
>
  <View style={styles.grid}>
    {/* BOTÃO CONTRATO ATIVO MAIS RECENTE*/}
    <View style={styles.cardcontratro}>
  <Text style={styles.contractTitle}>Contrato ativo mais recente</Text>

  <View style={styles.contractInfo}>
    <Image 
      source={require('../../assets/images/perfilicon.png')}
      style={styles.contractIcon}
    />
    <View>
      <Text style={styles.contractName}>Ana Maria Braga</Text>
      <Text style={styles.contractStatus}>Status: <Text style={styles.contractPaid}>Pago </Text></Text>
    </View>
  </View>

  <View style={styles.separator}></View>

  <TouchableOpacity 
    style={styles.viewMoreButton}
    onPress={() => navigation.navigate('Servico')}
  >
    <Text style={styles.viewMoreText}>Ver Outros Contratos</Text>
  </TouchableOpacity>
</View>

    {/* BOTÃO SOLICITAR SERVIÇO */}
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Servico')}>
      <Image source={require('../../assets/images/cuidadores.png')} style={styles.icon} />
      <Text style={styles.cardText}>Solicitar Serviço</Text>
    </TouchableOpacity>

    {/* BOTÃO FAVORITOS */}
    <View style={styles.favoritosContainer}>
      <TouchableOpacity style={styles.card}>
        <Image source={require('../../assets/images/favoritos.png')} style={styles.icon} />
        <Text style={styles.cardText}>Favoritos</Text>
      </TouchableOpacity>

      {/* BOTÃO DE SOM SOBREPOSTO */}
      <TouchableOpacity style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
        <Image source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
      </TouchableOpacity>
    </View>

    {/* BOTÃO PERFIL */}
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Perfil')}>
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
    left: -210,
    top: -110,
    position: 'absolute',
  },
  Form1: {
    width: 10000,
    height: 150,
    aspectRatio: 2,
    backgroundColor: '#a4e9e5',
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
  marginTop: '35%',
  alignItems: 'center',
  overflow: 'hidden',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 20,
},
card: {
  width: 150,
  height: 100,
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
cardcontratro: {
  width: 345,
  height: 170,
  backgroundColor: '#a4e9e5',
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  marginTop: 16,
  elevation: 5,
  paddingVertical: 15,
  paddingHorizontal: 10,
},
contractTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
  marginTop: 10,
},

contractInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 15,
  paddingVertical: 8,
  paddingHorizontal: 12,
  width: 300,
  height: 70,
  marginTop: 8,
},

contractIcon: {
  width: 80,
  height: 80,
  marginRight: 10,
  resizeMode: 'contain',
},

contractName: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#000',
},

contractStatus: {
  fontSize: 14,
  color: '#000',
},

contractPaid: {
  color: 'green',
  fontWeight: 'bold',
},

separator: {
  width: '90%',
  height: 1,
  backgroundColor: '#333',
  opacity: 0.4,
  marginVertical: 6,
},

viewMoreButton: {
  width: '85%',
  backgroundColor: '#a4e9e5',
  borderRadius: 12,
  alignItems: 'center',
  paddingVertical: 8,
  marginBottom: 10,
},

viewMoreText: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#000',
},
icon: { 
  width: 85, 
  height: 85, 
  resizeMode: 'contain',
  position: 'absolute',
  top: -23,   // faz o ícone "sair" para fora
},
cardText: {
  fontSize: 15,
  textAlign: 'center',
  marginTop: 30, // empurra o texto para baixo do ícone
},
cardTextcontrato: {
  fontSize: 20,
  textAlign: 'center',
  marginTop: 30, // empurra o texto para baixo do ícone
},
scrollContainer: {
  flexGrow: 1,
  alignItems: 'center',
  paddingVertical: 20,
  paddingBottom: 60, // evita corte no fim
  
},

favoritosContainer: {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
},

soundButton: {
  position: 'absolute',
  top: 30, // sobe o botão para sobrepor o card
  right: -10, // desloca para a direita
  width: 45,
  height: 45,
  borderRadius: 30,

  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
  zIndex: 10,
},

soundIcon: {
  width: 65,
  height: 65,
  
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
