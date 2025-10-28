import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
  Image, 
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import colors from './colors';
import Home from './Home';

const { width } = Dimensions.get('window');

export default function Favoritos({ navigation }) {
  const [cuidadores, setCuidadores] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  // 🔹 Evita erro de JSON nulo / API off
  useEffect(() => {
    axios
      // 🔸 se usar emulador Android, troque para http://10.0.2.2:8000
      .get('http://localhost:8000/api/selectProfissional')
      .then((response) => {
        if (response.data?.data) setCuidadores(response.data.data);
        else setCuidadores([]);
      })
      .catch((error) => {
        console.log('Erro ao buscar cuidadores:', error.message);
        // cria dados de teste caso o servidor falhe
        setCuidadores([
          { idProfissional: 1, nomeProfissional: 'Maria Silva' },
          { idProfissional: 2, nomeProfissional: 'João Pereira' },
          { idProfissional: 3, nomeProfissional: 'Carla Souza' },
          { idProfissional: 4, nomeProfissional: 'Pedro Lima' },
        ]);
      });
  }, []);

  const alternarFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
  };

  const renderItem = ({ item }) => (
    
          
    <View style={styles.cardRow}>
      <Ionicons
        name="person-circle-outline"
        size={55}
        color="#888"
        style={{ marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nomeProfissional || 'Nome sobrenome'}</Text>
        <Text style={styles.mensagem}>Mensagem...</Text>
      </View>

      <TouchableOpacity onPress={() => alternarFavorito(item.idProfissional)}>
        <Ionicons
          name={favoritos.includes(item.idProfissional) ? 'heart' : 'heart-outline'}
          size={28}
          color={favoritos.includes(item.idProfissional) ? 'red' : colors.preto}
        />
      </TouchableOpacity>
    </View>
  );

  // 🔹 Filtragem simples (não quebra se o nome for null)
  const filtrados = cuidadores.filter((item) =>
    item.nomeProfissional?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    
    <View style={styles.container}>
      {/* TOPO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate(Home)}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
        </TouchableOpacity>

        <Text style={styles.title}>Cuidadores</Text>

          <TouchableOpacity onPress={() => navigation.navigate('configuracoes')}>
           <Ionicons name="settings-outline" size={28} color={colors.preto} />
         </TouchableOpacity>
                  
      </View>

      {/* CAMPO DE PESQUISA */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#555" style={{ marginHorizontal: 8 }} />
          <TextInput
            style={styles.input}
            placeholder="Pesquise"
            placeholderTextColor="#666"
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idProfissional?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      
     <TouchableOpacity style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
              <Image source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
           </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.azul,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'web' ? 20 : 35,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.preto,
  },

  searchContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: 15,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9f5f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    height: 45,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  filterButton: {
    marginTop: 10,
    backgroundColor: '#a4e9e5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: '#000',
  },

  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.preto,
  },

  list: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: width * 0.9,
    height: 100,
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.preto,
  },

  mensagem: {
    fontSize: 14,
    color: '#666',
  },
  soundButton: {
    position: 'absolute',
    right: -8,           // fixa no canto direito
    top: '50%',          // centraliza verticalmente
    transform: [{ translateY: -15 }], // corrige leve deslocamento pra ficar central
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  
  soundIcon: {
    width: 73,
    height: 73,
    resizeMode: 'contain',
  },
});
