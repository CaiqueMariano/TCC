import React, {useState, useContext} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image, Pressable } from "react-native";
import colors from './colors';
import { UserContext } from "./userContext";
import axios from "axios";
const { width, height } = Dimensions.get("window");
import { API_URL } from '../screens/link';

export default function Adicionar ({ navigation }) {
    const { user } = useContext(UserContext);
    const [telefoneUsuario, setTelefoneUsuario] = useState('');
    const [usuario, setUsuario] = useState({
        idUsuario:"",
        nomeUsuario: ""
        
      });

      const[botao,setBotao] = useState(false);
    const buscarIdoso = async() =>{
      await axios.get(`${API_URL}/api/buscarIdoso/${telefoneUsuario}`)
        .then(response =>{
            const dados = response.data.data;
            setUsuario(dados);
            setBotao(true)
        });
    };


    const linkarIdoso = async()=>{
        await axios.post(`http://localhost:8000/api/criarFamilia`, {
            idUsuarioFamiliar:user.idUsuario,
            idUsuarioIdoso:usuario.idUsuario
        })


        if(response.data.success){
            console.log('adicionado');
        }
    };

  return (
    <View style={styles.Container}>

        <Text>Busque pelo telefone cadastrado:</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        onChangeText={setTelefoneUsuario}
      />


      {botao && (
<View style={styles.achou}>
    <Text>{usuario.nomeUsuario}</Text>
    <Pressable style={styles.button} onPress={linkarIdoso}>
      <Text>Linkar Usuário</Text>
    </Pressable>
    </View>
)}


      <Pressable onPress={buscarIdoso}>
        <Text>Buscar</Text>
      </Pressable>
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
    left: -190,
    top: -104,
    position: 'absolute',
  },
  Form1: {
    width: width * 0.9,
    aspectRatio: 2,
    backgroundColor: colors.azul,
    borderRadius: 9999,
    transform: [{ scaleX: 1.3 }],
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
    borderTopLeftRadius: height * 0.09,
    borderTopRightRadius: height * 0.09,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  Container2: {
    flex: 1,
    marginTop: '55%',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.preto,
  },
  subtitle: {
    fontSize: 18,
    color: colors.preto,
    marginBottom: 40,
  },
  botoes: {
    flexDirection: 'row',
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
});