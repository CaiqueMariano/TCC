import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CadastroEndereco() {
  const navigation = useNavigation();

  return (
   
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Cadastre seu Endereço</Text>

          <TextInput style={styles.input} placeholder="Rua" placeholderTextColor="#444" />
          <TextInput style={styles.input} placeholder="Número" placeholderTextColor="#444" keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Complemento" placeholderTextColor="#444" />
          <TextInput style={styles.input} placeholder="Bairro" placeholderTextColor="#444" />
          <TextInput style={styles.input} placeholder="Cidade" placeholderTextColor="#444" />
          <TextInput style={styles.input} placeholder="Estado" placeholderTextColor="#444" />

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  box: {
    width: '75%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 12,
    elevation: 6,
  },
  title: {
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#CF9FE5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
