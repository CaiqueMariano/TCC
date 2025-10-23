import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from "./userContext";
import axios from 'axios';
import { useState, useContext } from 'react';
import { API_URL } from '../screens/link';
const Stack = createNativeStackNavigator();


export default function LoginScreen({ navigation }) {
const { setUser } = useContext(UserContext);
    
const  [emailProfissional, setEmail] = useState('');
const  [senhaProfissional, setSenha] = useState('');
const [mensagem, setMensagem] = useState('');

const enviarLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/loginFree`, {
        emailProfissional,
        senhaProfissional,
      });
  
      if (response.data.success) {
        setUser(response.data.data);
        navigation.navigate("Home");
      } else {
        setMensagem('E-mail ou senha incorretos');
      }
  
    } catch (error) {
        setMensagem('E-mail ou senha incorretos');
    }
  };
  return (
    <ImageBackground
      source={require('../assets/screenshot.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Login</Text>

          <View style={styles.mensagem}>
            <Text style={styles.mensagemText}>{mensagem}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#444"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            onChangeText={setSenha}
            placeholderTextColor="#444"
            secureTextEntry
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={enviarLogin}>
              <Text style={styles.buttonText}>Logar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    mensagem:{
        marginBottom:10,
    },
    mensagemText:{
        color:'red',
    },  
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoWrapper: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 10,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 6,
    },
    loginBox: {
      width: '70%',
      backgroundColor: 'rgba(255,255,255,0.1)',
      padding: 20,
      paddingVertical: 28,
      minHeight: 320,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5,
    },
    loginTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#111',
      textAlign: 'center',
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 44,
      borderRadius: 8,
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 12,
      color: '#111',
      marginBottom: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    button: {
      flex: 1,
      height: 44,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#0a84ff',
      marginRight: 8,
    },
    buttonPrimary: {
      backgroundColor: '#0a84ff',
      marginLeft: 8,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    buttonTextSecondary: {
      color: '#0a84ff',
    },
  });
  