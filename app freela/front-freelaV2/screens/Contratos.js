import React, { useContext, useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ImageBackground, TouchableOpacity, 
  FlatList, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { UserContext } from "./userContext";

export default function Contratos({ navigation }) {
  const { user } = useContext(UserContext);
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .post(`http://localhost:8000/api/vizualizarContrato/${user.idProfissional}`)
        .then(response => {
          setContratos(response.data.data);
        })
        .catch(error => console.log("ERRO", error));
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>Contrato #{item.idContrato}</Text>
      <Text style={styles.texto}>📅 Início: {item.dataInicioContrato}</Text>
      <Text style={styles.texto}>⏰ Fim: {item.dataFinalContrato}</Text>
      <Text 
        style={[
          styles.status,
          item.statusContrato === 'ativo'
            ? styles.statusAtivo
            : item.statusContrato === 'finalizado'
            ? styles.statusFinalizado
            : styles.statusPendente
        ]}
      >
        {item.statusContrato?.toUpperCase()}
      </Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/screenshot.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Contratos</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={contratos}
          keyExtractor={(item) => item.idContrato.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum contrato encontrado.</Text>
          }
        />

        <StatusBar style="light" />
      </View>

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate("Pedidos")}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={22} color="#0a84ff" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Contratos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  topBar: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topBarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lista: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    elevation: 3,
  },
  titulo: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  texto: { fontSize: 14, color: '#555' },
  status: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statusAtivo: { backgroundColor: '#0a84ff22', color: '#0a84ff' },
  statusFinalizado: { backgroundColor: '#00c85322', color: '#00c853' },
  statusPendente: { backgroundColor: '#ffab0022', color: '#ffab00' },
  vazio: { color: '#fff', marginTop: 20 },

  bottomBar: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navLabel: { marginTop: 2, fontSize: 12, color: '#fff' },
  navLabelActive: { color: '#0a84ff', fontWeight: '700' },
});
