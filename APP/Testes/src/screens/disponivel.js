import React, { useEffect, useState, UseContext } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import axios from 'axios';
import { UserContext } from "./../../userContext";


export default function disponivel() {
  const { user } = useContext(UserContext);
  console.log(user);
    const [servicos, setServicos] = useState({
        idServico: "",
        nomeServico: "",
        tipoServico: "",
        descServico: "",
        dataServico: "",
        horaInicioServico: "",
        horaTerminoServico: ""
        

    });
  
const aceitando ={
  
}
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Pressable onPress={}>
      <Text style={styles.titulo}>{item.nomeServico}</Text>
      <Text style={styles.categoria}>{item.tipoServico}</Text>
      <Text style={styles.descricao}>{item.descServico}</Text>
      </Pressable>
    </View>
  );

useEffect(()=>{
    axios.get(`http://localhost:8000/api/buscarServicos`)
    .then(response => setServicos(response.data.data))
    .catch(error => console.log("ERRO", error));
},[])


  return (
    <View style={styles.container}>
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  boasVindas: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoria: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: '#333',
  },
});
