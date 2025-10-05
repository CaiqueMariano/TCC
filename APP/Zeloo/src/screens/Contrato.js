import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,Dimensions, FlatList, TextInput,Platform, StyleSheet, Image, ScrollView } from 'react-native';
import colors from './colors';
import axios from 'axios';

const { width, height } = Dimensions.get("window");

export default function Contrato({ navigation }) {


    const [profissional, setProfissional] = useState({
        idProfissional: "",
        nomeProfissional: ""
    });
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/selectProfissional`)
        .then(response => setProfissional(response.data.data))
        .catch(error => console.log("ERRO", error));
      },[])


      

  const renderItem = ({ item }) => (
    <View style={styles.cuida}>
            <Text style={styles.cardText}>{item.nomeProfissional}</Text>
            <TouchableOpacity style={styles.button} onPress={() =>aceitando(item.idProfissional)}>
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
    </View>
  );

      
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/volte.png')} style={styles.som} />
        </TouchableOpacity>
        <Text style={styles.title}> Cuidadores </Text>
        <TouchableOpacity onPress={() => alert('auxiliar auditivo')}>
          <Image source={require('../../assets/images/volume.png')} style={styles.som} />
        </TouchableOpacity>

      </View>

      <ScrollView contentContainerStyle={{
        flexGrow: 1,         
        paddingBottom: Platform.OS === 'web' ? width * 0.1 : width * 0.2  ,   
        paddingHorizontal: 10,
        alignItems: 'center',
      }} style={styles.content}>
        
        
        <TextInput
            style={styles.pesquisa}
            placeholder="🔍 Pesquisar cuidadores..."
        />

        <TouchableOpacity style={styles.fButton}>
            <Text style={styles.buttonText}>Filtrar</Text>
        </TouchableOpacity>

        <View style={styles.cardRow}>
           
            
        <FlatList
        data={profissional}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />

            <Image source={require('../../assets/images/coracao.png')} style={styles.favo} />
        </View>

       

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
title: {
  fontSize: 25,
  fontWeight: 'bold',
  color: colors.preto,
},
pesquisa: {
  width: '90%',
  height: 45,
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 10,
  paddingHorizontal: 15,
  marginBottom: 15,
  marginTop: 15,
  fontSize: 16,
  backgroundColor: colors.cinza,
},

fButton: {
  width: '40%',
  height: 45,               
  backgroundColor: colors.azul,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: '#000',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.azul,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'web' ? 20 : 35,     
  },
  som: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain' 
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: colors.preto,
    borderRadius: 12,
    gap: 10,
    marginTop: 10,
  },
  cuidador: { 
    width:  Platform.OS === 'web' ? 100 : 100,  
    height:  Platform.OS === 'web' ? 100 : 100, 
    marginBottom: 10,
  },
    favo: { 
    width: 30, 
    height: 30, 
    resizeMode: 'contain', 
    marginTop: 40,
    marginRight: 10,
  },
  cardText: { 
    fontSize: 16, 
    marginLeft: 10, 
    flexShrink: 1,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.azul,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  buttonText: { 
    fontWeight: 'bold',
  },
});
