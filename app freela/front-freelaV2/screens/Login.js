import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';

export default function Login() {
  const navigation = useNavigation();
  const [emailProfissional, setEmailProfissional] = useState('');
  const [senhaProfissional, setSenhaProfissional] = useState('');

  //EMAIL
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

  return (
    <Background>
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#444"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailProfissional}
            onChangeText={setEmailProfissional}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#444"
            secureTextEntry
            value={senhaProfissional}
            onChangeText={setSenhaProfissional}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => navigation.navigate('Cadastro')}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cadastro</Text>
            </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => {
                  if (!validarEmail(emailProfissional)) {
                    Alert.alert("E-mail inválido", "Digite um e-mail válido.");
                    return;
                  }

                  if (!senhaProfissional.trim()) {
                    Alert.alert("Senha inválida", "Digite sua senha.");
                    return;
                  }

                  navigation.navigate('Home');
                }}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor:  '#b08cff',
    padding: 20,
    paddingVertical: 28,
    minHeight: 320,
    borderRadius: 12,
    ...(Platform.select({
      web: { boxShadow: '0px 4px 12px rgba(0,0,0,0.2)' },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      },
    })),
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffffff',
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
    borderColor: '#ffffffff',
    marginRight: 8,
  },
  buttonPrimary: {
    backgroundColor: '#ffffffff',
    marginLeft: 8,
  },
  buttonText: {
    color:  '#b08cff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#fff',
  },
});


