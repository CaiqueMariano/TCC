import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import colors from './colors';

export default function configuracoes({route, navigation}){
    return(
        <View style={styles.container}>

            <TouchableOpacity style={styles.botao}
            
            onPress={() => navigation.navigate('Conta')}
            
            >
               <Ionicons style={styles.icon} name="person-circle-outline" size = {40} color="black"/>
                <Text style={styles.texto}>Conta</Text>
  <Ionicons style={styles.icon} name="chevron-forward" size = {30} color="black"/>
            </TouchableOpacity>

                     <TouchableOpacity style={styles.botao2}
            
            onPress={() => navigation.navigate('BemVindo')}
            
            >
               <Ionicons 
               style={styles.icon} 
               name="log-out" 
               size = {40}     
               color="red"/>

                <Text style={styles.texto2}>Logout</Text>

              <Ionicons 
              style={styles.icon} 
              name="chevron-forward" 
              size = {30} 
              color="red"/>

            </TouchableOpacity>

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
  