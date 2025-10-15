import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert, Button,Dimensions,Platform, ImageBackground, Image, Modal, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import axios from 'axios';
import colors from './colors';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "./userContext";


const { width, height } = Dimensions.get("window");

export default function Login({navigation}) {
  const { setUser } = useContext(UserContext);
  const [abrir, setAbrir] = useState(false);
  const [valor, setValor] = useState(null);
  const [editFoto, setEditFoto] = useState(false);
  const { user } = useContext(UserContext);
  const[mostrarEdicao, setMostrarEdicao] = useState(false);
  const[mostrarExcluir, setMostrarExcluir] = useState(false);
  const [usuario, setUsuario] = useState({
    nomeUsuario: "",
    tipoUsuario: "",
    telefoneUsuario: "",
    dataNasc: "",


  });
  

  const[nomeUsuario, setNomeUsuario] = useState('');
  const[telefoneUsuario, setTelefoneUsuario] = useState('');
  const[tipoUsuario, setTipoUsuario] = useState('');
  const[dataNasc, setDataNasc] = useState('');

  const [dataSelecionada, setDataSelecionada] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const [abrirEs, setAbrirEs] = useState(false);
  const [valorEs, setValorEs] = useState(null);


  useEffect (() =>{
    if(user){
    axios.get(`http://localhost:8000/api/buscarDados/${user.idUsuario}`)
    .then(response =>{
      const dados = response.data.data;
      
      setUsuario(dados);
      setNomeUsuario(dados.nomeUsuario);
      setTelefoneUsuario(dados.telefoneUsuario);
      setValorEs(dados.estadoUsuario);
      setDataSelecionada(dados.dataSelecionada);
  


    })

    .catch(error =>console.log("ERRO", error));
  }

  }, [user]);

  return (
    <View style={styles.Container}>

                  <TouchableOpacity style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
                    <Image source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
                  </TouchableOpacity>
     
      
            <View style={styles.nav}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
              </TouchableOpacity>
                <Text style={styles.navTitulo}>Perfil</Text>
              <TouchableOpacity onPress={() => navigation.navigate('configuracoes')}>
                <Ionicons name="settings-outline" size={28} color={colors.preto} />
              </TouchableOpacity>
            </View>

       <View style={styles.Container3}>

      <TouchableOpacity onPress={() => setEditFoto(true)}>
        <Image 
          source={require('../../assets/images/perfil.png')}
          style={styles.perfil}
        />
      </TouchableOpacity>

      <Text style={styles.Nome}>Zericleuda dos Santos{usuario.nomeUsuario}</Text>

      <View style={styles.Container2}>

      

      <ScrollView
        style={styles.ScrollContainer}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.input}>Telefone: {usuario.telefoneUsuario}</Text> 
        <Text style={styles.input}>Data de Nascimento: {usuario.dataNasc}</Text> 
        <Text style={styles.input}>Sexo: {usuario.sexoUsuario}</Text>
        <Text style={styles.input}>Saúde e Mobilidade: {usuario.SmUsuario}</Text>
        <Text style={styles.input}>Estado Cognitivo: {usuario.EcUsuario}</Text>
        <Text style={styles.input}>Rotinas e Preferencias: {usuario.RpUsuario}</Text>
      
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Checar Endereços</Text>
          </TouchableOpacity>
        </View>
      
      
      </ScrollView>
            </View>
          </View>
    </View>
  

  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  Container2: {
    marginTop: 75,
    
  },
  Container3: {
    marginTop: 50,
    
  },
    nav: { 
      width: "100%", 
      paddingTop: Platform.OS === "web" ? 20 : 45, 
      paddingBottom: 10, 
      paddingHorizontal: Platform.OS === "web" ? 40 : 20, 
      height: Platform.OS === "web" ? height * 0.12 : height * 0.1, 
      flexDirection: "row", 
      justifyContent: "space-between", 
      alignItems: "center", 
      backgroundColor: colors.azul 
    },

    navTitulo: { 
      fontSize: 20, 
      fontWeight: "bold", 
      color: colors.preto 
    },
  botoes: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: width * 0.8, 
    marginBottom: 15 
  },
  soundButton: {
    position: 'absolute',
    top: 430, 
    right: 15, 
    width: 45,
    height: 45,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 1002,
  },
  soundIcon: {
    width: 65,
    height: 65,
  },
  bFoto: { 
    width: width * 0.8,
    height: 50,
    backgroundColor: colors.azul, 
    borderColor: colors.preto, 
    borderWidth: 2, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10, 
    marginHorizontal: 5, 
    marginTop: 10 
  },

  buttonText: { 
    color: colors.preto, 
    fontSize: 18,
     fontWeight: "600" 
  },
  ScrollContainer: {
    width: '100%',
    marginTop: height * 0.17,
  },
  perfil: {
    alignSelf: 'center',
    width: width * 0.45,
    height: width * 0.45,
    bottom: -175,
    position: 'absolute'
  },

  Top: {
    height: width * 0.56,
    backgroundColor: colors.azul,
  },

  Nome: {
    top: 170,
    alignSelf: 'center',
    position: 'absolute',
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
    zIndex: 1000, 
  },
  input: {
    width: width * 0.8,
    minHeight: 50,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: 'center',
    backgroundColor: colors.branco
  },
  botoes: {
    flexDirection: 'row', // do ladin do outro
    justifyContent: 'space-between', 
    gap: 10,
  },
  button: {
    width: width * 0.3,
    height: 50,
    borderColor: '#202020',
    borderWidth: 2,
    backgroundColor: colors.azul,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  button2: {
    width: width * 0.3,
    height: 50,
    backgroundColor: colors.azul,
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.preto,
    fontSize: 18,
    fontWeight: '600',
  },
  dropdown: {
  backgroundColor: '#fafafa',
  width: width * 0.8,
  height: 50,
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 10,
  marginBottom: 20,
  fontSize: 16,
  
},
dropDownContainer: {
  backgroundColor: '#fafafa',
  width: width * 0.8,
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 10,

  marginBottom: 20,
  fontSize: 16,

},




botoes: {
  flexDirection: 'row', // do ladin do outro
  justifyContent: 'space-between', 
  gap: 10,
  marginBottom: '10%',
},
button: {
  width: width * 0.3,
  height: 50,
  borderColor: '#202020',
  borderWidth: 2,
  backgroundColor: colors.azul,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
},
button2: {
  width: width * 0.3,
  height: 50,
  backgroundColor: colors.azul,
  borderColor: colors.preto,
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
},
buttonText: {
  color: colors.preto,
  fontSize: 18,
  fontWeight: '600',
},
dropdown: {
backgroundColor: '#fafafa',
width: width * 0.8,
height: 50,
borderWidth: 2,
borderColor: colors.preto,
borderRadius: 10,
paddingHorizontal: 15,
marginBottom: 20,
fontSize: 16,
alignSelf: 'center',  
},
dropDownContainer: {
backgroundColor: '#fafafa',
width: width * 0.8,
borderWidth: 2,
borderColor: colors.preto,
borderRadius: 10,
paddingHorizontal: 15,
marginBottom: 20,
fontSize: 16,
alignSelf: 'center', 
},
});
