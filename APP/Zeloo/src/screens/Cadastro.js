import React, { useState, useContext } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert, Button,Dimensions, ImageBackground, Image, ScrollView, Modal} from "react-native";
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from './colors';
import { UserContext } from "./userContext";


const { width, height } = Dimensions.get("window"); 

export default function Cadastro({navigation}) {
  const { setUser } = useContext(UserContext);

  const [abrir, setAbrir] = useState(false);
  const [valor, setValor] = useState(null);
  const [selected, setSelected] = useState('');
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
  const enviarDados = async () => {
    try{
      const response =  await axios.post(`http://localhost:8000/api/usuario`,{nomeUsuario,telefoneUsuario,emailUsuario, senhaUsuario,tipoUsuario:valor,dataNasc:dataSelecionada, numLogradouroUsuario, ruaUsuario, estadoUsuario:valorEs, bairroUsuario, cepUsuario, cidadeUsuario});

      if(response.data.success){
        setUser(response.data.data);
        navigation.navigate("Home");
      }else{
     
        console.log("Erro", response.data.message);
      
      }
    }
      catch(error){
        console.error(error);
      }
    };
  const [items, setItems] = useState([
    { label: 'Idoso', value: 'idoso' },
    { label: 'Familiar', value: 'familiar' },

    


  ]);


  

  return (
    <ScrollView style={styles.Container}>
    <View style={styles.Form1}></View>
    <View style={styles.Form2}></View>

    <Image 
      source={require('../../assets/images/Zeloo.png')}
      style={styles.Logo}>
    </Image>

  <View style={styles.Container2}>
    <Text style={styles.title}>Cadastro</Text>

    <TextInput
      style={styles.input}
      placeholder="Nome Inteiro"
      onChangeText={setNomeUsuario}
    />

    
<TextInput
      style={styles.input}
      placeholder="Rua"
      onChangeText={setRuaUsuario}
    />

  <TextInput
      style={styles.input}
      placeholder="E-mail"
      onChangeText={setEmailUsuario}
    />

  <TextInput
      style={styles.input}
      placeholder="Cidade"
      onChangeText={setCidadeUsuario}
    />


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


    <TextInput
      style={styles.input}
      placeholder="Telefone"
      onChangeText={setTelefoneUsuario}
    />

    <TextInput
      style={styles.input}
      placeholder="Senha"
      secureTextEntry 
      onChangeText={setSenhaUsuario}
    />


<DropDownPicker
        open={abrir}
        value={valor}
        items={items}
        setOpen={setAbrir}
        setValue={setValor}
        setItems={setItems}

        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholder="Quem é você?" 
         placeholderStyle={styles.placeholder} 
      />


  

    <TextInput
      style={styles.input}
      placeholder="Numero"
      onChangeText={setNumLogradouroUsuario}
    />


<DropDownPicker
        open={abrirEs}
        value={valorEs}
        items={estados}
        setOpen={setAbrirEs}
        setValue={setValorEs}
        setItems={setEstados}

        style={styles.dropdown}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholder="Em que Estado você mora?" 
         placeholderStyle={styles.placeholder} 
      />

    <TextInput
      style={styles.input}
      placeholder="Bairro"
      onChangeText={setBairroUsuario}
    />

    <TextInput
      style={styles.input}
      placeholder="Cep"
      onChangeText={setCepUsuario}
    />



    

    <View style={styles.botoes}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText} onPress={enviarDados}>Salvar</Text>
      </TouchableOpacity>
    </View>

  </View>

  </ScrollView>
    
);
}

const styles = StyleSheet.create({
Container: {
  flex: 1,
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: colors.branco
},

  Logo: {
  left: -190,
  top: -104,      
  position: 'absolute',

},
Form1: {
  width: width * 0.9,
  aspectRatio: 2,
  backgroundColor: colors.azul,
  borderRadius: 9999,
  transform: [{scaleX: 1.3}],
  position: 'absolute',
  top: -20,
  left: -60,
},
Form2: {
  width: height * 0.18,             
  height: height * 0.3,              
  backgroundColor: colors.azul,
  position: 'absolute',
  bottom: 0,
  right: -50,
  borderTopLeftRadius: height * 0.09,   // metade da largura para fazer o arco bunitin
  borderTopRightRadius: height * 0.09,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
},
  Container2: {
  flex: 1,
  paddingTop: "45%",
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
},
title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 40,
  color: colors.preto,
},
input: {
  width: width * 0.8,
  height: 50,
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 10,
  paddingHorizontal: 15,
  marginBottom: 20,
  fontSize: 16,
  backgroundColor: colors.branco,
},
placeholder: {
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