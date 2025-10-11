import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import colors from "./colors";
import { TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { Checkbox } from 'react-native-paper';
import { UserContext } from "./userContext";
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "react-native";
const { width, height } = Dimensions.get("window");

export default function Cadastro({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [etapa, setEtapa] = useState(1);
  const [horarioIn, setHorarioIn] = useState('');
  const [horarioT, setHorarioT] = useState('');
  const [data,setData] = useState("");
  const [enderecoUsuario,setEnderecoUsuario] = useState("");
  const [textoE, setTextoE] = useState('');
  const [abrirE, setAbrirE] = useState(false);
  const [texto, setTexto] = useState("Nenhum detalhe foi especificado");

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [abrir, setAbrir] = useState(false);
  const nomeServicosSelecionados = [];

  if (checked1) nomeServicosSelecionados.push('Alimentação');
  if (checked2) nomeServicosSelecionados.push('Higiene Pessoal');
  if (checked3) nomeServicosSelecionados.push('Medicação');
  if (checked4) nomeServicosSelecionados.push('Locomoção');
  if (abrir && texto.trim() !== '') nomeServicosSelecionados.push(texto.trim());
  const [checkedE, setCheckedE] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('idoso');
    const [items, setItems] = useState([
      { label: 'Idoso', value: 'idoso' },
      { label: 'Familiar', value: 'familiar' },
    ]);

  const formatarData = (texto) => {
  // Remove tudo que não é número
  let numeros = texto.replace(/\D/g, '');

  // Limita a 8 dígitos
  if (numeros.length > 8) numeros = numeros.slice(0, 8);

  // Formata DD/MM/AAAA
  if (numeros.length >= 5) {
    numeros = numeros.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
  } else if (numeros.length >= 3) {
    numeros = numeros.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  }

  setDataNascUsuario(numeros);


};

  const totalEtapas = 3;

  const Progresso = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalEtapas }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressStep,
            { backgroundColor: etapa > index ? colors.azul : colors.cinza },
          ]}
        />
      ))}
    </View>
  );

 //esse goBack faz volta pra tela anterior
  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}> 
          <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
        </TouchableOpacity> 
    

        <Text style={styles.navTitulo}>Agendamento</Text>

        <TouchableOpacity onPress={() =>navigation.navigate('configuracoes')}>
          <Ionicons name="settings-outline" size={28} color={colors.preto} />
        </TouchableOpacity>
      </View> 

    

{etapa === 1 && (
  <View style={styles.form}>
    <Progresso />

              <Text style={styles.title}>Sobre o Serviço, Responda:</Text>
    <Image
      source={require('../../assets/images/cronograma.png')}
      style={styles.image}
    />

    <TextInput
      style={styles.input}
      placeholder="Qual vai ser a Data?"
      onChangeText={setData}
    />

    <TextInput
      style={styles.input}
      placeholder="Qual o Horário de Inicio?"
      onChangeText={setHorarioIn}
    />

    <TextInput
      style={styles.input}
      placeholder="Qual o Horário de Término?"
      onChangeText={setHorarioT}
    />


    <View style={styles.botoes}>
      <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(2)}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  </View>
)}


      {etapa === 2 && (
        <View style={styles.form}>
          <Progresso />
          <Text style={styles.title}>Qual o Endereço do Serviço?</Text>
            <Image
              source={require('../../assets/images/mapa.png')}
              style={styles.image}
            />

          <TextInput 
          style={styles.input} 
          placeholder="Casa (endereço ja cadastrado)" 
          value={enderecoUsuario}
          onChangeText={enderecoUsuario}
          />

          <TouchableOpacity 
            style={styles.outros}
            onPress={() => setAbrir(!abrir)}
          >
            <Text style={styles.outrosText}>Adicionar Endereço </Text>
            <Ionicons name="add-circle" size={32} color= "#a4e9e5" />
          </TouchableOpacity>




          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(1)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(3)}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {etapa === 3 && (
        <View style={styles.form}>
            <Progresso />
          <Text style={styles.title}>Para que precisa de um cuidador?</Text>

    <Image
      source={require('../../assets/images/cuidador.png')}
      style={styles.image}
    />

          <View style={styles.checkboxContainer}>
             
             <View style={styles.checkboxes}>
                <Checkbox
                  status={checked1 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked1(!checked1)}
                  color={colors.azul}
                />
                <Text style={styles.checkOpicoes}>Acompanhamento Médico</Text>
              </View>
             
              <View style={styles.checkboxes}>
                <Checkbox
                  status={checked2 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked2(!checked2)}
                  color={colors.azul}
                />
                <Text style={styles.checkOpicoes}>Acompanhamento Domiciliar</Text>
              </View>

              <View style={styles.checkboxes}>
                <Checkbox
                  status={checked3 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked3(!checked3)}
                  color={colors.azul}
                />
                <Text style={styles.checkOpicoes}>Acompanhamento Médico</Text>
              </View>
            </View>

          <TouchableOpacity 
            style={styles.outros}
            onPress={() => setAbrir(!abrir)}
          >
            <Text style={styles.outrosText}>Outros Cuidados </Text>
            <Ionicons name="add-circle" size={32} color= "#a4e9e5" />
          </TouchableOpacity>


          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={()=>navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
    alignItems: "center",
   
  },
  nav: {
    width: "100%",
    paddingTop: Platform.OS === "web" ? 20 : 45,
    paddingBottom: Platform.OS === "web" ? 10 : 10,
    paddingHorizontal: Platform.OS === "web" ? 40 : 20,
    height: Platform.OS === "web" ? height * 0.12 : height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.azul,
  },
  navTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.preto,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },
  bFoto: {
    flex: 1,
    height: 50,
    backgroundColor: colors.azul,
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
     marginTop: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
    gap: 10,
    position: 'relative', // importante
    zIndex: 20,           // maior que logo
  },
  progressStep: {
    width: 40,
    height: 8,
    borderRadius: 5,
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: 60, 
  },
  outros: { 
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 30,
  },
  outrosText: {
    fontSize: 20,
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
  button: {
    width: width * 0.5,
    height: 50,
    backgroundColor: colors.azul,
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.preto,
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.preto,
  },
  dropdowncontainer: {
  width: width * 0.8,
  alignItems: 'center',  
  marginBottom: 20,
},
  dropdown: {
    backgroundColor: colors.branco,
    width: width * 0.8,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    marginBottom: 20,
  },
  dropDownContainer: {
    backgroundColor: colors.branco,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    width: width * 0.8,
    zIndex: 2,
  },
    checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  checkboxes: {
    flexDirection: 'row',   
    alignItems: 'center',   
    marginBottom: 12,     
  },

  checkboxContainerE: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  checkOpicoes: {
    fontSize: 20,
    color: colors.preto,
    width: 210,
  },

  outrosText: {
    fontSize: 20,
    color: colors.preto,
  },


});
