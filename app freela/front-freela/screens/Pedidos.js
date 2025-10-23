import React, { useContext, useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ImageBackground, TouchableOpacity, 
  FlatList, Pressable, Modal, TextInput, Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from "./userContext";
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../screens/link';
import axios from 'axios';

export default function Pedidos({ navigation }) {
  const { user } = useContext(UserContext);
  const irParaAHome = () => navigation.navigate("Home");

  const [idProfissional, setIdProfissional] = useState('');
  const [servicos, setServicos] = useState([]);
  const [precoPersonalizado, setPrecoPersonalizado] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`${API_URL}/api/buscarProfissional/${user.idProfissional}`)
        .then(response => {
          const dados = response.data.data;
          setIdProfissional(dados.idProfissional);
        })
        .catch(error => console.log("ERRO", error));
    }
  }, [user]);

  useEffect(() => {
    axios.get(`${API_URL}/api/buscarServicos`)
      .then(response => setServicos(response.data.data))
      .catch(error => console.log("ERRO", error));
  }, []);

  const abrirModal = (servico) => {
    setServicoSelecionado(servico);
    setPrecoPersonalizado('');
    setModalVisible(true);
  };

  const aceitando = async () => {
    if (!precoPersonalizado) {
      Alert.alert("Atenção", "Digite um preço antes de aceitar o serviço.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/aceita`, {
        idProfissional,
        idServico: servicoSelecionado.idServico,
        precoPersonalizado
      });

      if (response.data.success) {
        Alert.alert("Sucesso", response.data.message);
      } else {
        Alert.alert("Erro", response.data.message);
      }
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível aceitar o serviço.");
    }
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => abrirModal(item)}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{item.nomeServico}</Text>
        <Text style={styles.categoria}>{item.tipoServico}</Text>
        <Text style={styles.descricao}>{item.descServico}</Text>
      </View>
    </Pressable>
  );

  return (
    <ImageBackground
      source={require('../assets/screenshot.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Pedidos</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.idServico.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />

        {/* MODAL DE ACEITAR SERVIÇO */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalFundo}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitulo}>
                {servicoSelecionado?.nomeServico}
              </Text>
              <Text style={styles.modalDescricao}>
                {servicoSelecionado?.descServico}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Digite o preço personalizado"
                keyboardType="numeric"
                value={precoPersonalizado}
                onChangeText={setPrecoPersonalizado}
              />

              <View style={styles.modalBotoes}>
                <TouchableOpacity 
                  style={[styles.botao, styles.botaoVoltar]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textoBotao}>Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.botao, styles.botaoAceitar]} 
                  onPress={aceitando}
                >
                  <Text style={styles.textoBotao}>Aceitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <StatusBar style="light" />
      </View>

      {/* Barra inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={irParaAHome}>
          <Ionicons name="home-outline" size={22} color="#fff" />
          <Text style={[styles.navLabel]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#0a84ff" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Contratos')}>
          <Ionicons name="time-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Contratos</Text>
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
  lista: { paddingBottom: 20 },
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
  titulo: { fontSize: 18, fontWeight: 'bold' },
  categoria: { fontSize: 14, color: '#888', marginBottom: 4 },
  descricao: { fontSize: 14, color: '#333' },

  /* Modal */
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoVoltar: { backgroundColor: '#888' },
  botaoAceitar: { backgroundColor: '#0a84ff' },
  textoBotao: { color: '#fff', fontWeight: 'bold' },

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
