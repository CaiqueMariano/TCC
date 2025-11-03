import React, { useState, useEffect, useContext  } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';
import axios from 'axios';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function telaPagamento({route, navigation}) {
  const { servico } = route.params;
  const pagar = async () =>{
    try{
      const response = await axios.post(`${API_URL}/api/pagar`,{
        idContrato:servico.idContrato
      });

      if(response.data.success){
        alert('Pagamento Feito!')
        navigation.navigate("Ativos");
      }

    }catch(error){
      console.log(error);
    }
  }
  


  return (
    <View style={styles.container}>

      {/* 🔹 Total */}
      <Text style={styles.totalText}>Total: R${servico.precoPersonalizado}</Text>
      <View style={styles.line} />

      {/* 🔹 Cuidador */}
      <Text style={styles.cuidadorText}>Cuidador:{servico.nomeProfissional}</Text>

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

      {/* 🔹 Botão perfil */}
      <TouchableOpacity style={styles.perfilButton}>
        <Text style={styles.perfilButtonText}>Olhar Perfil do Cuidador</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      {/* 🔹 Métodos de pagamento */}
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

      {/* 🔹 Total final */}
      <Text style={styles.totalFinal}>Total: R${servico.precoPersonalizado}</Text>

      {/* 🔹 Botão pagar */}
      <TouchableOpacity style={styles.pagamentoButton} onPress={pagar}>
        <Text style={styles.pagamentoButtonText}>Efetuar Pagamento</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 30,
  },

  totalText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '500',
  },

  line: {
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
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#eee',
  },

  info: {
    marginLeft: 15,
  },

  avaliacao: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },

  local: {
    fontSize: 20,
    color: '#555',
  },

  perfilButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
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
    fontSize: 20,
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
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },

  pagamentoButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },

});
