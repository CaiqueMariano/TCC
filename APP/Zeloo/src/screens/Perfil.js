import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert, Button,Dimensions,Platform, ImageBackground, Image, Modal, ScrollView} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import axios from 'axios';
import colors from './colors';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';

const { width, height } = Dimensions.get("window");

export default function Login({route}) {
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
    emailUsuario: "",
    
    ruaUsuario: "",
    numLogradouroUsuario: "",
    estadoUsuario: "",
    bairroUsuario: "",
    cepUsuario: "",
    cidadeUsuario: ""


  });


  /*ALTERÇÃO */
  LocaleConfig.locales['pt-br'] = {
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ],
    dayNames: [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
  };
  
  LocaleConfig.defaultLocale = 'pt-br';
  
  




  const[nomeUsuario, setNomeUsuario] = useState('');
  const[telefoneUsuario, setTelefoneUsuario] = useState('');
  const[emailUsuario, setEmailUsuario] = useState('');
  const[senhaUsuario, setSenhaUsuario] = useState('');
  const[tipoUsuario, setTipoUsuario] = useState('');
  const[dataNasc, setDataNasc] = useState('');
  const[ruaUsuario, setRuaUsuario] = useState('');
  const[numLogradouroUsuario, setNumLogradouroUsuario] = useState('');
  const[estadoUsuario, setEstadoUsuario] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const[bairroUsuario, setBairroUsuario] = useState('');
  const[cepUsuario, setCepUsuario] = useState('');
  const [abrirEs, setAbrirEs] = useState(false);
  const [valorEs, setValorEs] = useState(null);
  const [estados, setEstados] = useState([
    { label: 'AC', value: 'ac' },
    { label: 'AL', value: 'al' },
    { label: 'AP', value: 'ap' },
    { label: 'AM', value: 'am' },
    { label: 'BA', value: 'ba' },
    { label: 'CE', value: 'ce' },
    { label: 'DF', value: 'df' },
    { label: 'ES', value: 'es' },
    { label: 'GO', value: 'go' },
    { label: 'MA', value: 'ma' },
    { label: 'MT', value: 'mt' },
    { label: 'MS', value: 'ms' },
    { label: 'MG', value: 'mg' },
    { label: 'PA', value: 'pa' },
    { label: 'PB', value: 'pb' },
    { label: 'PR', value: 'pr' },
    { label: 'PE', value: 'pe' },
    { label: 'PI', value: 'pi' },
    { label: 'RJ', value: 'rj' },
    { label: 'RN', value: 'rn' },
    { label: 'RS', value: 'rs' },
    { label: 'RO', value: 'ro' },
    { label: 'RR', value: 'rr' },
    { label: 'SC', value: 'sc' },
    { label: 'SP', value: 'sp' },
    { label: 'SE', value: 'se' },
    { label: 'TO', value: 'to' }
  ]);
  const[cidadeUsuario, setCidadeUsuario] = useState('');

  const [items, setItems] = useState([
    { label: 'Idoso', value: 'idoso' },
    { label: 'Familiar', value: 'familiar' },

    


  ]);


  const editarPerfilInfo = async () =>{
    try{
      const response = await axios.put(`${API_URL}/api/updatePerfil/${user.idUsuario}`, {
        nomeUsuario, telefoneUsuario, emailUsuario, dataNasc:dataSelecionada,
        ruaUsuario, numLogradouroUsuario, estadoUsuario:valorEs, bairroUsuario, cepUsuario, cidadeUsuario
        
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

  /*FIM DA ALTERAÇÃO*/ 


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
    <View style={styles.Container}>

<View style={styles.Top}>
  <Image 
    source={require('../../assets/images/Zeloo.png')}
    style={styles.Logo}
  />
</View>

<View style={styles.Form2}></View>

<TouchableOpacity onPress={() => setEditFoto(true)}>
  <Image 
    source={require('../../assets/images/perfil.png')}
    style={styles.perfil}
  />
</TouchableOpacity>

<Text style={styles.Nome}>{usuario.nomeUsuario}</Text>

<ScrollView
  style={styles.ScrollContainer}
  contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}
  showsVerticalScrollIndicator={true}
>
  <Text style={styles.input}>Tipo do Usuario: {usuario.tipoUsuario}</Text> 
  <Text style={styles.input}>Telefone: {usuario.telefoneUsuario}</Text> 
  <Text style={styles.input}>Email: {usuario.emailUsuario}</Text> 
  <Text style={styles.input}>CEP: {usuario.cepUsuario}</Text> 
  <Text style={styles.input}>Logradouro: {usuario.ruaUsuario}</Text> 
  <Text style={styles.input}>N°: {usuario.numLogradouroUsuario} </Text> 
  <Text style={styles.input}>Bairro: {usuario.bairroUsuario}</Text> 
  <Text style={styles.input}>Cidade:{usuario.cidadeUsuario}</Text> 
  <Text style={styles.input}>Estado: {usuario.estadoUsuario}</Text>

   {/*EDIÇAO*/}
   <TouchableOpacity
          onPress={() => setMostrarEdicao(true)}
          style={styles.edicaoBotao}
        >
         <Text style={styles.textoBotao}>Editar Dados</Text>
        </TouchableOpacity>

</ScrollView>

      

        <Modal
          visible={mostrarEdicao}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarEdicao(false)}
        >

<View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
       
      <Text>Nome Inteiro:</Text>
      <TextInput
      style={styles.input}
      placeholder="Nome Inteiro"
      value={nomeUsuario}
      onChangeText={setNomeUsuario}
    />

<Text>Telefone:</Text>
    <TextInput
      style={styles.input}
      placeholder="Telefone"
      value={telefoneUsuario}
      onChangeText={setTelefoneUsuario}
    />

<Text>E-mail:</Text>
  <TextInput
      style={styles.input}
      placeholder="E-mail"
      value={emailUsuario}
      onChangeText={setEmailUsuario}
    />


    
<Text>Data de Nascimento:</Text>
<TouchableOpacity
          style={[styles.input, { justifyContent: 'center' }]}
          onPress={() => setMostrarCalendario(true)}
        >
          <Text style={{ color: dataSelecionada ? colors.preto: '#', fontSize: 16 }}>
            {dataSelecionada ? dataSelecionada : 'Data de Nascimento'}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={mostrarCalendario}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarCalendario(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, padding: 10 }}>
              <Calendar
                onDayPress={(day) => {
                  setDataSelecionada(day.dateString);
                  setMostrarCalendario(false);
                }}
                markedDates={{
                  [dataSelecionada]: { selected: true, selectedColor: colors.verde },
                }}
                theme={{
                  todayTextColor: colors.verde,
                  arrowColor: colors.verde,
                  monthTextColor: colors.preto,
                  textDayFontWeight: '500',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '500',
                }}
                style={styles.calendar}
              />
            </View>
          </View>
        </Modal>

<Text>CEP:</Text>
    <TextInput
      style={styles.input}
      placeholder="Cep"
      value={cepUsuario}
      onChangeText={setCepUsuario}
    />

<Text>Rua:</Text>
<TextInput
      style={styles.input}
      placeholder="Rua"
      value={ruaUsuario}
      onChangeText={setRuaUsuario}
    />

  
<Text>N° Logradouro:</Text>
    <TextInput
      style={styles.input}
      placeholder="Numero"
      value={numLogradouroUsuario}
      onChangeText={setNumLogradouroUsuario}
    />

<Text>Bairro:</Text>
    <TextInput
      style={styles.input}
      placeholder="Bairro"
      value={bairroUsuario}
      onChangeText={setBairroUsuario}
    />


  <Text>Cidade:</Text>
  <TextInput
      style={styles.input}
      placeholder="Cidade"
      value={cidadeUsuario}
      onChangeText={setCidadeUsuario}
    />



    <Text>Estado:</Text>
    <DropDownPicker
        open={abrirEs}
        items={estados}
        value={valorEs}
        setOpen={setAbrirEs}
        setValue={setValorEs}
        setItems={setEstados}

        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholder="Em que Estado você mora?" 
         placeholderStyle={styles.placeholder} 
      />

    

    

    <View style={styles.botoes}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={()=>setMostrarEdicao(false)}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText} onPress={editarPerfilInfo}>Salvar</Text>
      </TouchableOpacity>
    </View>


      </View>
    </ScrollView>
  </View>

  </Modal>
              {/*FIM DA EDIÇÃO!!!!!*/}

        
        
    </View>
  

  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.branco,
  },
  som: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain' 
  },
  ScrollContainer: {
    width: '100%',
    marginTop: height * 0.17,
  },
  perfil: {
    alignSelf: 'center',
    width: width * 0.45,
    height: width * 0.45,
    top: -height * 0.15,
    position: 'absolute'
  },
  Logo: {
    width: Platform.OS === 'web' ? width * 0.2 : width * 0.4, 
    height: Platform.OS === 'web' ? width * 0.2 : width * 0.3, 
    left: Platform.OS === 'web' ? 10 : 70,
    top:  Platform.OS === 'web' ? 6 : 20,      
    position: 'absolute',
  },
  edicaoBotao:{
    
    alignText:'center',
    alignItems:'center',
    alignContent:'center',
  },

  textoBotao:{
    fontStyle:'italic',
    fontSize:18,
    color: 'gray',
  },
  Top: {
    height: width * 0.56,
    backgroundColor: colors.azul,
  },
  Form2: {
    top: 70,
    width: 330,
    borderRadius: 9999,
    aspectRatio: 1,
    backgroundColor: colors.branco,
    position: 'absolute',
    alignSelf: 'center',
  },
  Nome: {
    top: height * 0.34,
    alignSelf: 'center',
    position: 'absolute',
    fontSize: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#000',
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
