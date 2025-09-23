import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import colors from './colors';

const { width, height } = Dimensions.get("window");

export default function BemVindo ({ navigation }) {
  return (
    <View style={styles.Container}>
      <View style={styles.Form1}></View>
      <View style={styles.Form2}></View>
      <Image 
        source={require('../../assets/images/Zeloo.png')}
        style={styles.Logo}
      />
      <View style={styles.Container2}>
        <Text style={styles.title}>Bem-vindo ao Zeloo!</Text>
        <Text style={styles.subtitle}>Escolha uma opção para continuar:</Text>
        <View style={styles.botoes}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.buttonText}>Cadastro</Text>
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