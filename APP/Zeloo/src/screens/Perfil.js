import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Animated, TextInput, Alert, Button,Dimensions,Platform, ImageBackground, Image, Modal, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import axios from 'axios';
import colors from './colors';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';


const ABAS = [
  { chave: 'info', titulo: 'Histórico' },
  { chave: 'questionario', titulo: 'Informações Pessoais' },
  
];


const { width, height } = Dimensions.get("window");

export default function Perfil({navigation}) {
  const { user } = useContext(UserContext);
  const [abrir, setAbrir] = useState(false);
  const [abaAtiva, definirAbaAtiva] = useState(0);
  const indicador = useRef(new Animated.Value(0)).current;
  const [valor, setValor] = useState(null);
  const dta = new Date(user.dataNasc);
  const a = dta.getFullYear();
  const m = dta.getMonth() + 1;
  const d = dta.getDate() +1;

  const [editFoto, setEditFoto] = useState(false);
  const[mostrarEdicao, setMostrarEdicao] = useState(false);
  const[mostrarExcluir, setMostrarExcluir] = useState(false);
  const [usuario, setUsuario] = useState([]);
  const[emailUsuario, setEmailUsuario] = useState('');
  const[senhaUsuario, setSenhaUsuario] = useState('');
  const [questionarioInfo, setQuestionarioinfo] = useState([])
  const[nomeUsuario, setNomeUsuario] = useState('');
  const[telefoneUsuario, setTelefoneUsuario] = useState('');
  const[tipoUsuario, setTipoUsuario] = useState('');
  const[dataNasc, setDataNasc] = useState('');
  const [questionarioExiste, setQuestionarioExiste] = useState(false)
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

  useEffect(() => {

    questionario();
    
    
  }, []);
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

  const larguraAba = width / ABAS.length;

  useEffect(() => {
    Animated.spring(indicador, {
      toValue: abaAtiva * larguraAba,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }, [abaAtiva]);


  const questionario = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/verPerguntas/${user.idUsuario}`);
  
      const existe = response.data.existe == true;
  
      setQuestionarioExiste(existe);
  
      if (existe) {
        setQuestionarioinfo(response.data.data);
        console.log(questionarioExiste);
      }
  
    } catch (error) {
      setQuestionarioExiste(false);
       console.log(questionarioExiste);
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

      

      <TouchableOpacity style={{marginTop:20}} onPress={() => setEditFoto(true)}>
        <Image 
          source={{uri: `${API_URL}/storage/${user.fotoUsuario}`}}
          style={styles.perfil}
        />
      </TouchableOpacity>

      <Text style={styles.Nome}>{user.nomeUsuario}</Text>
      </View>

<View style={styles.conteudoInfo}>
<View accessibilityRole="tablist" style={styles.barraAbas}>
      <View style={{ position: 'relative' }}>
        <Animated.View
          style={{
            position: 'absolute',
            height: 3,
            width: larguraAba - 32,
            left: 16,
            bottom: 0,
            transform: [{ translateX: indicador }],
            borderRadius: 2,
            backgroundColor: colors.azul,
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          {ABAS.map((aba, indice) => (
            <TouchableOpacity
              key={aba.chave}
              style={styles.botaoAba}
              onPress={() => definirAbaAtiva(indice)}
            >
              <Text
                style={[
                  styles.textoAba,
                  abaAtiva === indice && styles.textoAbaAtiva,
                ]}
              >
                {aba.titulo}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>

    <View style={{ flex: 1 }}>
 
      {abaAtiva === 0 && (
        <ScrollView style={styles.conteudoScroll} showsVerticalScrollIndicator={false}>

         
    

          <Text style={styles.tituloSecao}>Histórico de Serviços</Text>

          <TouchableOpacity 
            style={styles.botaoEditar}
            onPress={() => navigation.navigate("EditarPerfil")}
          >
            <Text style={styles.textoBotaoEditar}>Ver Histórico</Text>
          </TouchableOpacity>

      
          <Text style={styles.tituloFeedback}>Últimos Feedbacks</Text>

          <View style={styles.cardComentario}>
            <View style={styles.Comentario}>
             
              <View style={{ flex: 1 }}>
                <Text style={styles.nomeComentario}>Maria de Lourdes</Text>
                <Text style={styles.dataComentario}>02/11/2025</Text>
              </View>
            </View>

            <Text style={styles.textoComentario}>
              Ótima profissional, paciente e muito atenciosa. Recomendo fortemente.
            </Text>
          </View>

        </ScrollView>
      )}


      {abaAtiva === 1 && (
        <ScrollView style={styles.conteudoScroll} showsVerticalScrollIndicator={false}>

          <Text style={styles.tituloSecao}>Informações da Conta</Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Telefone:</Text> {user.telefoneUsuario}
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Email:</Text> {user.emailUsuario === "null" ? (""): ("Email não cadastrado")}
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Data de Nascimento:</Text> {d}/{m}/{a}
            </Text>


            <TouchableOpacity 
            style={styles.botaoEditar}
            onPress={() => navigation.navigate("EditarPerfil")}
          >
            <Text style={styles.textoBotaoEditar}>Editar Perfil</Text>
          </TouchableOpacity>
            <View style={styles.separador} />

            <Text style={styles.tituloSecao}>Questionário</Text>

            {questionarioExiste === false ? (
  <View>
    <Text style={styles.linhaInfo}>
      Questionário não preenchido, o preencha para cuidadores te ajudarem do melhor modo possível!
    </Text>

    <TouchableOpacity 
      style={styles.botaoEditarQ}
      onPress={() => navigation.navigate("PerguntasC")}
    >
      <Text style={styles.textoBotaoEditar}>Preencher Questionário</Text>
    </TouchableOpacity>
  </View>
) : (
  questionarioInfo && questionarioInfo.length > 0 ? (
    <View style={styles.container}>

      {/* DOENÇAS */}
      <Text style={styles.titulo}>Doenças</Text>
      {questionarioInfo
        .filter(item => item.doencaDiagnostico)
        .map((item, index) => (
          <View key={index} style={styles.cardInfo}>
            <Text style={styles.texto}>• {item.doencaDiagnostico}</Text>
          </View>
        ))
      }

      {/* ALERGIAS */}
      <Text style={styles.titulo}>Alergias</Text>
      {questionarioInfo
        .filter(item => item.alergiaDiagnostico)
        .map((item, index) => (
          <View key={index} style={styles.cardInfo}>
            <Text style={styles.texto}>• {item.alergiaDiagnostico}</Text>
          </View>
        ))
      }

    </View>
  ) : (
    <Text style={{ color: "#fff" }}>Carregando questionário...</Text>
  )
)}
{questionarioExiste === false ? (
  <View>
    <Text style={styles.linhaInfo}>
      Questionário não preenchido, o preencha para cuidadores te ajudarem do melhor modo possível!
    </Text>

    <TouchableOpacity 
      style={styles.botaoEditarQ}
      onPress={() => navigation.navigate("PerguntasC")}
    >
      <Text style={styles.textoBotaoEditar}>Preencher Questionário</Text>
    </TouchableOpacity>
  </View>
) : (
  questionarioInfo && questionarioInfo.length > 0 ? (
    <View style={styles.container}>

      {/* DOENÇAS */}
      <Text style={styles.titulo}>Doenças</Text>
      {questionarioInfo
        .filter(item => item.doencaDiagnostico)
        .map((item, index) => (
          <View key={index} style={styles.cardInfo}>
            <Text style={styles.texto}>• {item.doencaDiagnostico}</Text>
          </View>
        ))
      }

      {/* ALERGIAS */}
      <Text style={styles.titulo}>Alergias</Text>
      {questionarioInfo
        .filter(item => item.alergiaDiagnostico)
        .map((item, index) => (
          <View key={index} style={styles.cardInfo}>
            <Text style={styles.texto}>• {item.alergiaDiagnostico}</Text>
          </View>
        ))
      }

    </View>
  ) : (
    <Text style={{ color: "#fff" }}>Carregando questionário...</Text>
  )
)}
{questionarioExiste === false ? (
  <View>
    <Text style={styles.linhaInfo}>
      Questionário não preenchido, o preencha para cuidadores te ajudarem do melhor modo possível!
    </Text>

    <TouchableOpacity 
      style={styles.botaoEditarQ}
      onPress={() => navigation.navigate("PerguntasC")}
    >
      <Text style={styles.textoBotaoEditar}>Preencher Questionário</Text>
    </TouchableOpacity>
  </View>
) : (
  questionarioInfo && questionarioInfo.length > 0 ? (
    <View style={styles.container}>

      {/* DOENÇAS */}
      <Text style={styles.titulo}>Doenças</Text>
      {questionarioInfo
        .filter(item => item.doencaDiagnostico)
        .map((item, index) => (
          <View key={index} style={styles.cardInfo}>
            <Text style={styles.texto}>• {item.doencaDiagnostico}</Text>
          </View>
        ))
      }

      {/* ALERGIAS */}
      <Text style={styles.titulo}>Alergias</Text>
      {questionarioInfo
        .filter(item => item.alergiaDiagnostico)
        .map((item, index) => (
          <View key={index} style={styles.cardInfo}>
            <Text style={styles.texto}>• {item.alergiaDiagnostico}</Text>
          </View>
        ))
      }

    </View>
  ) : (
    <Text style={{ color: "#fff" }}>Carregando questionário...</Text>
  )
)}



          

          

        </ScrollView>
      )}

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
   
    
  },
  Container3: {
    flex: 0.45,
    
  },
  linhaInfo:{fontSize:20,
    marginBottom:20,
  },

  conteudoInfo:{
    flex:1,
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

  separador: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },
  
    navBar: {
      backgroundColor: '#b08cff',
      paddingTop: 40,
      paddingVertical: 16,
      alignItems: 'center',
    },
    tituloNav: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
  
    rotulo: {
      fontWeight: '600',
    },
  
    blocoTopo: {
      flexDirection: 'row',
      padding: 20,
      alignItems: 'center',
    },
    foto: {
      width: 95,
      height: 95,
      borderRadius: 50,
    },
    nome: {
      fontSize: 22,
      fontWeight: '700',
    },
    idade: {
      fontSize: 15,
      color: '#555',
      marginTop: 4,
    },
  
    linhaEndereco: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    endereco: {
      marginLeft: 4,
      fontSize: 15,
      color: '#444',
    },
  
    barraAbas: {
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    botaoAba: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
    },
    textoAba: {
      color: '#6B7280',
      fontSize: 14,
    },
    textoAbaAtiva: {
      color: '#000',
      fontWeight: '600',
    },

    
  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.azul,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
    gap: 8,
  },

  botaoEditarQ: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.azul,
    paddingVertical: 14,
    borderRadius: 12,
  marginBottom:90,
    gap: 8,
  },
  
  textoBotaoVerExtrato: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  textoBotaoEditar: {
    color: '#202020',
    fontSize: 16,
    fontWeight: '600',
  },
  
    conteudo: {
      marginTop:10,
    },
  
    conteudoScroll: {
      padding: 20,
    },
  
    tituloSecao: {
      fontSize: 22,
      fontWeight: '700',
      marginBottom:10,
      
    },
  
    tituloExtrato: {
      marginTop: 20,
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 16,
    },
  
    cartao: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 16,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
    },
  
  
  
  itemExtratoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  dataExtrato: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  
  tipoExtrato: {
    fontSize: 13,
    color: '#777',
  },
  
  ladoDireito: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  valorPositivo: {
    fontWeight: '700',
    color: '#3ab940',
    fontSize: 14,
  },
  
    valorPositivo: {
      fontWeight: '600',
      color: 'green',
    },
  
    tituloFeedback: {
      marginTop: 20,
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 16,
    },
  
    cardComentario: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      marginTop: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
    },
  
    Comentario: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  
    fotoComentario: {
      width: 45,
      height: 45,
      borderRadius: 22,
      marginRight: 12,
    },
  
    nomeComentario: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
  
    dataComentario: {
      fontSize: 12,
      color: '#777',
      marginTop: 2,
    },
  
    textoComentario: {
      fontSize: 15,
      lineHeight: 20,
      color: '#333',
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
    
    top: 170,
    alignSelf: 'center',
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
