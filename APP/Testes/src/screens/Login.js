import React, { useState, useContext } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet,TouchableOpacity, TextInput, Platform,Alert, Button,Dimensions, ImageBackground, Image} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import colors from './colors';
import { UserContext } from "./../../userContext";


const { width, height } = Dimensions.get("window");

export default function Login({navigation}) {
  const { setUser } = useContext(UserContext);

  const [abrir, setAbrir] = useState(false);
  const [valor, setValor] = useState(null);
  const [telefoneUsuario, setTelefoneUsuario] = useState("");
  const [senhaUsuario,setSenhaUsuario] = useState("");
  const [items, setItems] = useState([
    { label: 'Idoso', value: 'ido' },
    { label: 'Familia', value: 'fam' },
  ]);

  const enviarLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/login`, {
        telefoneUsuario,
        senhaUsuario
      });
  
      if (response.data.success) {
        setUser(response.data.data);
        navigation.navigate("servico");
      } else {
        console.log("Erro", response.data.message);
      
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Form1}></View>
      <View style={styles.Form2}></View>

      <Image 
        source={require('../../assets/images/logo.png')}
        style={styles.Logo}>
      </Image>

    <View style={styles.Container2}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        onChangeText={setTelefoneUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setSenhaUsuario}
      />

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={enviarLogin}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          
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
  Logo: {
  width:Platform.OS === 'web' ? width * 0.4 : width * 0.4, 
  height: Platform.OS === 'web' ? width * 0.3 : width * 0.3, 
  left: Platform.OS === 'web' ? width * 0.17 : 70,
  top:  Platform.OS === 'web' ? 20 : 20,      
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
