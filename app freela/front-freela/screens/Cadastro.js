import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/fundoLIlas.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Cadastro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#444"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#444"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#444"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar senha"
            placeholderTextColor="#444"
            secureTextEntry
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => navigation.goBack()}>
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Cancelar</Text>

                </TouchableOpacity>
           


            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => navigation.navigate('CadastroEndereco')}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>

          </View>
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
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
    fontFamily: 'Arial',
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
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#111',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonSecondary: {
    
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 8,
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#CF9FE5',
    marginLeft: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#BC66E5',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});


