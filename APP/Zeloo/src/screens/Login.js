import React, { useState, useContext } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Alert, Button,Dimensions, ImageBackground, Image} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import colors from './colors';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Ionicons } from '@expo/vector-icons';
import { useAccessibility } from "./AccessibilityContext";
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get("window");


export default function Login({navigation}) {
  const { setUser } = useContext(UserContext);
  const [mensagem, setMensagem] = useState('');

const { audioAtivo, setAudioAtivo } = useAccessibility();
const { narrar } = useAccessibility();

  const [abrir, setAbrir] = useState(false);
  const [valor, setValor] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [telefoneUsuario, setTelefoneUsuario] = useState("");
  const [senhaUsuario,setSenhaUsuario] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [ver, setVer] = useState("");
  const [items, setItems] = useState([
    { label: 'Idoso', value: 'ido' },
    { label: 'Familia', value: 'fam' },

    
  ]);

  const formatarTelefone = (valor, anterior) => {
  // Remove tudo que não for número
  let telefone = valor.replace(/\D/g, "");

    if (telefone.length < anterior.replace(/\D/g, "").length) {
    return valor;
  }

  telefone = telefone.slice(0, 11);

  // aplica o formato celular 
  if (telefone.length > 2 && telefone.length <= 7) {
    telefone = telefone.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (telefone.length > 7) {
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  } else if (telefone.length > 0) {
    telefone = telefone.replace(/^(\d{0,2})/, "($1");
  }

  return telefone;
};

  const enviarLogin = async () => {
    try {
      setCarregando(true);
      const telefoneLimpo = telefoneUsuario.replace(/\D/g, "");
      const response = await axios.post(`${API_URL}/api/login`, {
        telefoneUsuario:telefoneLimpo,
        senhaUsuario
      });
   
  
      if (response.data.success) {
        setCarregando(false);
        const usuario = response.data.data;
        setUser(usuario);
        navigation.navigate("Home");
        setMensagem("");

        
      } else {
        setCarregando(false);
        setMensagem('Telefone ou senha incorretos');
        console.log(error);
      }
  
    } catch (error) {
      setCarregando(false);
      setMensagem('Telefone ou senha incorretos');
      console.error(error);
    }
  };



  return (
    <View style={styles.Container}>
      <View style={styles.Form1}></View>
      <View style={styles.Form2}></View>

<TouchableOpacity
  style={styles.soundButton}
  onPress={() => {
    const novoEstado = !audioAtivo;
    setAudioAtivo(novoEstado);

    // Força a fala independente do estado
    Speech.speak(novoEstado ? "Narrador Ativado" : "Narrador Desativado", {
    });
  }}
>
  <Image
    source={require('../../assets/images/audio.png')}
    style={styles.soundIcon}
  />
</TouchableOpacity>

      <Image 
        source={require('../../assets/images/Zeloo.png')}
        style={styles.Logo}>
      </Image>

    <View style={styles.Container2}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.mensagem}>
            <Text style={styles.mensagemText}>{mensagem}</Text>
          </View>

      <TextInput
        style={styles.input}
        placeholder="Número de telefone"
        keyboardType="numeric"
        value={telefoneUsuario}
        onFocus={() => narrar("Digite seu número de telefone")}
        onChangeText={(text) =>
          setTelefoneUsuario(formatarTelefone(text, telefoneUsuario))
        }
        maxLength={15}
      />


    <View style={styles.senhaContainer}>
      <TextInput
        style={styles.senhaInput}
        placeholder="Senha"
        onChangeText={setSenhaUsuario}
        secureTextEntry={!mostrarSenha}
        onFocus={() => narrar("Digite sua senha")}
      />
      <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Text style={styles.senhaToggle}>{mostrarSenha ? <Ionicons size={25} name="eye-outline"></Ionicons>
 : <Ionicons name="eye-off-outline" size={25}/> }</Text>
      </TouchableOpacity>
    </View>

      <View style={styles.botoes}>
        <TouchableOpacity style={[styles.button, { opacity: carregando ? 0.5 : 1 }]} onPress={enviarLogin}
        disabled={carregando}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate('Cadastro')}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
      </View>
  );
}


const styles = StyleSheet.create({
  Container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.branco,
  },
  mensagem:{
    marginBottom:10,
},
mensagemText:{
  fontSize: 19,
    color:'red',
}, 

    Logo: {
    left: -190,
    top: -104,      
    position: 'absolute',

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
    height: height * 0.4,              
    backgroundColor: colors.azul,
    position: 'absolute',
    bottom: 0,
    right: -50,
    borderTopLeftRadius: height * 0.09,   // metade da largura para fazer o arco bunitin
    borderTopRightRadius: height * 0.09,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    height: 50,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.branco,
  },
  senhaInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  senhaToggle: {
    fontSize: 18,
    marginLeft: 10,
  },
  Container2: {
    flex: 1,
    marginTop: "58%",
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
