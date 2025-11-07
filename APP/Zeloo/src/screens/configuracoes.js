import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';

import { EscalarText, EscalarTouchable, EscalarImage, EscalarCard, useAccessibility } from './AccessibilityContext';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import colors from './colors';

export default function Configuracoes({ route, navigation }) {
  const { increaseScale, decreaseScale, resetScale,scale } = useAccessibility(); // ✅ Aqui dentro

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Conta')}>
        <Ionicons style={styles.icon} name="person-circle-outline" size={40 * scale} color="black" />
        <EscalarText style={styles.texto}>Conta</EscalarText>
        <Ionicons style={styles.icon} name="chevron-forward" size={30 * scale} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao2} onPress={() => navigation.navigate('BemVindo')}>
        <Ionicons style={styles.icon} name="log-out" size={40 * scale} color="red" />
        <EscalarText style={styles.texto2}>Logout</EscalarText>
        <Ionicons style={styles.icon} name="chevron-forward" size={30 * scale} color="red" />
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Aumentar Tamanho" onPress={increaseScale} />
        <Button title="Reduzir Tamanho" onPress={decreaseScale} />
        <Button title="Resetar Tamanho" onPress={resetScale} />
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.branco,
      paddingTop:20,
    },
    icon:{
     
    },

    texto:{
        marginBottom:5,
        fontSize:25,
       
        
    },  

     texto2:{
        marginBottom:5,
        fontSize:25,
        color: 'red',
        
    },  

    botao2:{
      marginBottom:10,
      marginLeft:5,
      width:'96%',
      verticalAlign:'center',
      borderWidth:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderRadius:8,
      borderColor:'red',
      
    },
    botao:{
      marginBottom:10,
      marginLeft:5,
      width:'96%',
      verticalAlign:'center',
      borderWidth:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderRadius:8,
      borderColor:'black',
      
    },
  });
  