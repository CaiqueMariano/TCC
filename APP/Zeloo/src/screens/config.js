import React, { useState } from 'react';
import colors from "./colors";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from './link';

export default function Config() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Cabeçalho */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={38} color="#000" />
        <Text style={styles.headerText}>Configurações</Text>
      </View>

      {/* 🔹 Editar Perfil e Filtros de Cor */}
      <View style={styles.optionTop}>
        <TouchableOpacity style={styles.optionBox}>
          <Image
            source={{uri: `${API_URL}/storage/${user.fotoUsuario}`}}
            style={styles.imagePerfil}
          />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox}>
          <Image
            source={require('/assets/cores.png')}
            style={styles.imageCores}
          />
          <Text style={styles.optionText}>Filtros de Cor</Text>
        </TouchableOpacity>
      </View>

      {/* 🌙 Modo Escuro */}
      <View style={styles.optionModo}>
        <View style={styles.darkModeContainer}>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
            trackColor={{ false: '#ccc', true: '#333' }}
            thumbColor={darkMode ? '#fff' : '#000'}
            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} // Aumenta o tamanho
          />
          
        </View>
        <View style={styles.darkModeText}>
          <Image
            source={require('/assets/noturno.png')}
            style={styles.imageNoturno}
          />
          <Text style={styles.textModo}>Modo Escuro</Text>
        </View>
      </View>

      {/* 🔊 Botão de áudio flutuante */}
      <TouchableOpacity style={styles.audioButton}>
        <Image
          source={require('/assets/audio.png')}
          style={styles.imageAudio}
        />
      </TouchableOpacity>

      {/* 🔎 Ampliar */}
      <View style={styles.optionAmpliar}>
        <View style={styles.textContainer}>
          <Text style={styles.subText}>Dificuldade de enxergar?</Text>
          <Text style={styles.subText}>Ligue a versão ampliada</Text>
        </View>

        <TouchableOpacity style={styles.ampliarButton}>
          <Image
            source={require('/assets/ampliar.png')}
            style={styles.imageAmpliar}
          />
          <Text style={styles.ampliarText}>Ampliar</Text>
        </TouchableOpacity>
      </View>

      {/* 🔊 Botão de áudio flutuante */}
      <TouchableOpacity style={styles.audioButton}>
        <Image
          source={require('/assets/audio.png')}
          style={styles.imageAudio}
        />
      </TouchableOpacity>

      {/* 🚪 Logout */}
      <View style={styles.optionLogout}>
        <View>
          <Text style={styles.subText}>Deseja desconectar sua</Text>
          <Text style={styles.subText}>conta do aplicativo?</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Image
            source={require('./assets/sair.png')}
            style={styles.imageLogout}
          />
          <Text style={styles.logoutText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 0
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.azul,
    width: '100%',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,

  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 65,
  },

  // 🔹 Parte superior
  optionTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '85%',
    marginVertical: 30,
  },

  optionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.azul,
    borderRadius: 20,
    width: 140,
    height: 95,
    marginTop: 20,
    marginRight: 25, 
  },

  optionText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    paddingBottom: 70,
  },

  // 🌙 Modo Escuro
  optionModo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.azul,
    borderRadius: 20,
    width: '85%',
    height: 90,
    marginTop: 10,
    marginBottom: 30,
  },

  darkModeText:{
    marginRight: 30,
    marginBottom: 35,
  },

  darkModeContainer: {
    flexDirection: 'row',
    marginLeft: 30,
  },

  textModo: {
    marginTop: 5,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },

  // 🔊 Botão de áudio flutuante
  audioButton: {
    position: 'absolute',
    right: -15,
    bottom: 345,
    elevation: 1,
  },

  // 🔎 Ampliar
  optionAmpliar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.azul,
    borderRadius: 20,
    height: 90,
    width: '85%',
    marginBottom: 30,
    marginTop: 10,
  },

  ampliarButton: {
    flexDirection: 'colunm',
    alignItems: 'center',
    marginRight: 25,
  },

  ampliarText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 35,
    marginLeft: 7
  },

  textContainer: {
    flex: 1,
  },

  subText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 25,
  },

  // 🚪 Logout
  optionLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.azul,
    borderRadius: 20,
    height: 90,
    width: '85%',
  },

  logoutButton: {
    flexDirection: 'colunm',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },

  logoutText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    marginRight: 3
  },

  // 🔹 IMAGENS INDIVIDUALIZADAS
  imagePerfil: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageCores: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageNoturno: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  imageAudio: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
  },
  imageAmpliar: {
    width: 100,
    height: 88,
    resizeMode: 'contain',
  },
  imageLogout: {
    width: 100,
    height: 75,
    resizeMode: 'contain',
  },
});