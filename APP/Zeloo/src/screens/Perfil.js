import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert, Button,Dimensions,Platform, ImageBackground, Image, Modal, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import axios from 'axios';
import colors from './colors';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';

const { width, height } = Dimensions.get("window");

export default function Perfil({navigation}) {
  const { user } = useContext(UserContext);
  const [abrir, setAbrir] = useState(false);
  const [valor, setValor] = useState(null);
  const [editFoto, setEditFoto] = useState(false);
  const[mostrarEdicao, setMostrarEdicao] = useState(false);
  const[mostrarExcluir, setMostrarExcluir] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const[emailUsuario, setEmailUsuario] = useState('');
  const[senhaUsuario, setSenhaUsuario] = useState('');

  const[nomeUsuario, setNomeUsuario] = useState('');
  const[telefoneUsuario, setTelefoneUsuario] = useState('');
  const[tipoUsuario, setTipoUsuario] = useState('');
  const[dataNasc, setDataNasc] = useState('');

  const [dataSelecionada, setDataSelecionada] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const [abrirEs, setAbrirEs] = useState(false);
  const [valorEs, setValorEs] = useState(null);
  useEffect(() => {
    if (mostrarEdicao) {
      setNomeUsuario(user.nomeUsuario || '');
      setTelefoneUsuario(user.telefoneUsuario || '');
      setEmailUsuario(user.emailUsuario || '');
    }
  }, [mostrarEdicao, user]);
  const editarPerfilInfo = async () =>{
    try{
      const response = await axios.put(`${API_URL}/api/updatePerfil/${user.idUsuario}`, {
        nomeUsuario, telefoneUsuario, emailUsuario
        
      });

      if(response.data.success){
        setUser(response.data.data);
        setMostrarEdicao(false);
      }else{
        console.log(response.data.message);
      }


    }catch(error){
      console.log(error);
    }
  };





  return (
    <View style={styles.Container}>

<Modal
          visible={mostrarEdicao}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarEdicao(false)}
        >

<View style={styles.modal}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.modalView}>
       
      <Text style={styles.textInput}>Nome Inteiro:</Text>
      <TextInput
      style={styles.input}
      placeholder="Nome Inteiro"
      value={user.nomeUsuario}
      onChangeText={setNomeUsuario}
    />

<Text style={styles.textInput}>Telefone:</Text>
    <TextInput
      style={styles.input}
      placeholder="Telefone"
      value={user.telefoneUsuario}
      onChangeText={setTelefoneUsuario}
    />

<Text style={styles.textInput}>E-mail:</Text>
  <TextInput
      style={styles.input}
      placeholder="E-mail"
      value={user.emailUsuario}
      onChangeText={setEmailUsuario}
    />


    <View style={styles.botoes}>
      <TouchableOpacity style={styles.button} onPress={()=>setMostrarEdicao(false)}>
        <Text style={styles.buttonText} >Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.button2}
  onPress={() => {
    editarPerfilInfo();
    setMostrarEdicao(false);
  }}
>
  <Text style={styles.buttonText}>Salvar</Text>
</TouchableOpacity>

    </View>


      </View>
    </ScrollView>
  </View>

  </Modal>
              {/*FIM DA EDIÇÃO!!!!!*/}


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
          source={{uri: `${API_URL}/storage/${user.fotoUsuario}`}}
          style={styles.perfil}
        />
      </TouchableOpacity>

      <Text style={styles.Nome}>{user.nomeUsuario}</Text>
      

      <View style={styles.Container2}>

      <Text style={styles.infor}>Informações da Conta</Text>
      <View style={styles.linha}></View>

      <ScrollView
        style={styles.ScrollContainer}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}
        showsVerticalScrollIndicator={true}
      >
         
        <Text style={styles.titulo}>Telefone: <Text style={styles.info}> {user.telefoneUsuario}</Text></Text> 
        <Text style={styles.titulo}>Data de Nascimento: <Text style={styles.info}> {user.dataNasc}</Text></Text> 
        <Text style={styles.titulo}>E-mail: <Text style={styles.info}> {user.emailUsuario ? user.emailUsuario : "Email não cadastrado"}</Text></Text>
      
          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={()=> setMostrarEdicao(true)}>
              <Text style={styles.buttonText}>Editar perfil</Text>
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
  textInput:{
    fontWeight:'400',
    fontSize:20 ,
  },
  modal:{
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center'
  },
  modalView:{
    paddingTop:20,
    fontSize:20,
    paddingLeft:21,
    marginTop:200,
    backgroundColor: '#fff', 
    width:360,
    borderRadius: 10, 

  },
  infor:{
    marginBottom:10,
    top:150,
    textAlign:'center',
    
    fontSize:20,
  },
  linha:{

    top:150,
    height:1,
    backgroundColor:'gray',
  },
  titulo:{
    marginTop:20,
    fontWeight:'600',
    color:colors.azul,
    fontSize:18,
  },
  info:{
    color:colors.preto,
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
    borderRadius:100,
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
    marginBottom:60,
    top: 170,
    alignSelf: 'center',
    position: 'absolute',
    fontSize: 30,
    paddingVertical: 8,
  
   
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
