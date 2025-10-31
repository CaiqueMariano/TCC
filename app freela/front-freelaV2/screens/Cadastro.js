import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Alert, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../temas/ThemeContext';
import Background from '../components/Background';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function Cadastro() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  // Estados para controle das etapas e dados
  const [etapa, setEtapa] = useState(1);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [imagem, setImagem] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Função para formatar data de nascimento
  const formatarData = (texto) => {
    let numeros = texto.replace(/\D/g, '');
    if (numeros.length > 8) numeros = numeros.slice(0, 8);
    
    if (numeros.length >= 5) {
      numeros = numeros.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (numeros.length >= 3) {
      numeros = numeros.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    
    setDataNascimento(numeros);
  };

  // Função para solicitar permissões
  const solicitarPermissoes = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status !== 'granted' || galeria.status !== 'granted') {
      Alert.alert('Negado', 'Permissão negada.');
      return false;
    }
    return true;
  };

  // Função para tirar foto
  const tirarFoto = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagem(resultado.assets[0].uri);
    }
  };

  // Função para escolher da galeria
  const escolherDaGaleria = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagem(resultado.assets[0].uri);
    }
  };

  // Componente de progresso
  const Progresso = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: 2 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressStep,
            { backgroundColor: etapa > index ? '#0a84ff' : '#ccc' },
          ]}
        />
      ))}
    </View>
  );
  return (
    <Background>
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Progresso />
          <Text style={styles.loginTitle}>Cadastro</Text>
          
          {etapa === 1 && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#444"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#444"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Data de nascimento (DD/MM/AAAA)"
                placeholderTextColor="#444"
                keyboardType="numeric"
                value={dataNascimento}
                onChangeText={formatarData}
              />
              <View style={styles.senhaContainer}>
                <TextInput
                  style={styles.senhaInput}
                  placeholder="Senha"
                  placeholderTextColor="#444"
                  secureTextEntry={!mostrarSenha}
                  value={senha}
                  onChangeText={setSenha}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Ionicons 
                    name={mostrarSenha ? "eye-outline" : "eye-off-outline"} 
                    size={25} 
                    color="#444" 
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#444"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </>
          )}

          {etapa === 2 && (
            <>
              <Text style={styles.photoTitle}>Adicione uma foto sua</Text>
              <Image
                source={imagem ? { uri: imagem } : require('../assets/icon.png')}
                style={styles.photoPreview}
              />
              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoButton} onPress={escolherDaGaleria}>
                  <Text style={styles.photoButtonText}>Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photoButton} onPress={tirarFoto}>
                  <Text style={styles.photoButtonText}>Tirar Foto</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary]} 
              onPress={() => etapa === 1 ? navigation.goBack() : setEtapa(1)}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                {etapa === 1 ? 'Cancelar' : 'Voltar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => etapa === 1 ? setEtapa(2) : () => {/* Finalizar cadastro */}}
            >
              <Text style={styles.buttonText}>
                {etapa === 1 ? 'Seguinte' : 'Finalizar'}
              </Text>
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
    backgroundColor: 'rgba(255,255,255,0.1)',
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0a84ff',
    marginRight: 8,
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#0a84ff',
    marginLeft: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#0a84ff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  progressStep: {
    width: 30,
    height: 8,
    borderRadius: 5,
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  senhaInput: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  photoButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#0a84ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});


