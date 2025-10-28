import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { EscalarText, EscalarTouchable, EscalarImage, useAccessibility } from './AccessibilityContext';
import colors from "./colors";

export default function App({ navigation }) {
  const { increaseScale, decreaseScale, resetScale, scale } = useAccessibility();

  return (
    <View style={styles.container}>
      {/* 🔹 Barra superior */}
      <View style={styles.nav}>
        <EscalarTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
        </EscalarTouchable>

        <Text style={styles.navTitulo}>Condições de Saúde</Text>

        <EscalarTouchable onPress={() => navigation.navigate('configuracoes')}>
          <Ionicons name="settings-outline" size={28} color={colors.preto} />
        </EscalarTouchable>
      </View>

      {/* 🔹 Botão auditivo */}
      <EscalarTouchable style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
        <EscalarImage source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
      </EscalarTouchable>

      {/* 🔹 Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.totalText}>Total  R$00,00</Text>
        <View style={styles.line} />

        <Text style={styles.cuidadorText}>Cuidador: Ana Maria Braga</Text>

        <View style={styles.cuidadorSection}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png' }}
            style={styles.avatar}
          />

          <View style={styles.info}>
            <Text style={styles.avaliacao}>
              <Ionicons name="star" size={20} color="#daa520" /> 4,8 (120 avaliações)
            </Text>
            <Text style={styles.local}>
              <Ionicons name="location-sharp" size={18} color="#d0342c" /> São Paulo, SP
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.perfilButton}>
          <Text style={styles.perfilButtonText}>Olhar Perfil do Cuidador</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        <Text style={styles.metodoTitle}>Métodos de pagamento</Text>

        <View style={styles.metodoItem}>
          <MaterialIcons name="pix" size={24} color="#00b686" />
          <Text style={styles.metodoText}>Pix</Text>
        </View>

        <View style={styles.metodoItem}>
          <FontAwesome5 name="credit-card" size={20} color="#3b7ddd" />
          <Text style={styles.metodoText}>Cartão de Crédito</Text>
        </View>

        <View style={styles.metodoItem}>
          <FontAwesome5 name="credit-card" size={20} color="#f0ad00" />
          <Text style={styles.metodoText}>Cartão de Débito</Text>
        </View>

        <View style={styles.line} />

        <Text style={styles.totalFinal}>Total  R$00,00</Text>

        <TouchableOpacity style={styles.pagamentoButton}>
          <Text style={styles.pagamentoButtonText}>Efetuar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
  },

  /* 🔹 Barra de navegação */
nav: { 
  width: "100%", 
  paddingTop: Platform.OS === "ios" ? 60 : 35, 
  paddingBottom: 15, 
  paddingHorizontal: 20, 
  flexDirection: "row", 
  justifyContent: "space-between", 
  alignItems: "center", 
  backgroundColor: colors.azul,
},
  navTitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: colors.preto 
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 15,
  },

  totalText: {
    fontSize: 20,
    fontWeight: '500',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 15,
  },

  cuidadorText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },

  cuidadorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
  },

  info: {
    marginLeft: 15,
  },

  avaliacao: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },

  local: {
    fontSize: 18,
    color: '#555',
  },

  perfilButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    width: '90%',
    alignSelf: 'center',
  },

  perfilButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
  },

  metodoTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  metodoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  metodoText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },

  totalFinal: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  pagamentoButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
  },

  pagamentoButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    
  },

  soundButton: {
    position: 'absolute',
    top: 430, 
    right: 15, 
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 1002,
  },
  soundIcon: {
    width: 65,
    height: 65,
  },
});
