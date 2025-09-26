import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Modal } from "react-native";
import colors from './colors';
import { TextInput } from "react-native-web";

const { width, height } = Dimensions.get("window");


export default function Cadastro ({ navigation }) {
  const [etapa, setEtapa] = useState(1);

  const[nomeUsuario, setNomeUsuario] = useState('');
  const[telefoneUsuario, setTelefoneUsuario] = useState('');
  const[senhaUsuario, setSenhaUsuario] = useState('');

  return (
    <View style={styles.Container}>

       

      {etapa === 1 && (


        <View style={styles.etapas}> 
          <View style={styles.linha} />
    
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nome Inteiro"
            onChangeText={setNomeUsuario}
          />

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

        <TouchableOpacity style={styles.button2} onPress={() => setEtapa(2)}>
                    <Text style={styles.buttonText}>Proximo</Text>
        </TouchableOpacity>

        </View>
        </View>

      )}

      {etapa === 2 && (

      <View> 
        <View style={styles.linha} />
        <View style={styles.linha} />

        <TextInput
            style={styles.input}
            placeholder="Nome Inteiro"
            onChangeText={setNomeUsuario}
          />

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
           <TouchableOpacity style={styles.button2} onPress={() => setEtapa(3)}>
                    <Text style={styles.buttonText}>Proximo</Text>
        </TouchableOpacity>
      </View>

      )}

      {etapa === 3 && (

      <View> 
         <View style={styles.linha} />
         <View style={styles.linha} />
         <View style={styles.linha} />
         
         <TouchableOpacity style={styles.button2} >
                    <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      )}


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
  Container2: {
    flex: 1,
    marginTop: '55%',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  form:{
   
    alignItems: 'center',
    marginTop: '10%',
  },

  linha: {
    marginTop:'20%',
    marginLeft:'10%',
    borderBottomColor: 'black',
    borderRadius:10,
    borderBottomWidth: 5,
    width: '10%',
    marginVertical: 5,
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

});