import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from './link';
import { UserContext } from './userContext';
export default function Home() {
  const { user } = useContext(UserContext);
  const [ultimoContrato, setUltimoContrato] = useState(null);
  const navigation = useNavigation();
  const [abaAtiva, setAbaAtiva] = useState(0);
 
  useEffect(() => {
    if (!user) return;

    const fetchUltimoContrato = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/vizualizarContratosFree/${user.idProfissional}/ativo`);
        if (response.data.data && response.data.data.length > 0) {
          // Pega o último contrato da lista
          setUltimoContrato(response.data.data[0]);
        }
      } catch (error) {
        console.log('Erro ao buscar último contrato:', error);
      }
    };

    fetchUltimoContrato();
  }, [user]);
  const abas = [
    { titulo: 'Home', icone: 'home-outline', rota: 'Home' },
    { titulo: 'Contratos', icone: 'document-text-outline', rota: 'Contratos' },
    { titulo: 'Perfil', icone: 'person-outline', rota: 'Perfil' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

  
      <ScrollView
  contentContainerStyle={styles.scrollContainer}
  showsVerticalScrollIndicator={false}
>

{ultimoContrato && (
          <View style={styles.cartao}>
            <Text style={styles.tituloSecao}>Contrato ativo mais recente</Text>
            
            <View style={styles.cabecalhoIdoso}>
              <Image
                source={{ uri: `${API_URL}/storage/${ultimoContrato.fotoUsuario}` }}
                style={styles.fotoIdoso}
              />
              <View>
                <Text style={styles.nomeIdoso}>{ultimoContrato.nomeUsuario}</Text>
                <Text style={styles.subInfoIdoso}>Preço: R${ultimoContrato.precoPersonalizado}</Text>
                <Text style={styles.subInfoIdoso}>Dia: {ultimoContrato.dataServico}</Text>
                <Text style={styles.subInfoIdoso}>Horário: {ultimoContrato.horaInicioServico}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.botaoOutline}
              onPress={() => navigation.navigate('Contratos')}
            >
              <Text style={styles.textoBotaoOutline}>Ver contratos</Text>
            </TouchableOpacity>
          </View>
        )}

  <TouchableOpacity
    style={styles.botaoDashboard}
    onPress={() => navigation.navigate('Pedidos')}
  >
    <Ionicons name="analytics-outline" size={32} color="#fff" style={{ marginBottom: 6 }} />
    <Text style={styles.textoBotaoDashboard}>Buscar Pedidos</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.botaoDashboard}
    onPress={() => navigation.navigate('Dashboard')}
  >
    <Ionicons name="analytics-outline" size={32} color="#fff" style={{ marginBottom: 6 }} />
    <Text style={styles.textoBotaoDashboard}>Ir para Dashboard</Text>
  </TouchableOpacity>

    <TouchableOpacity
    style={styles.botaoDashboard}
    onPress={() => navigation.navigate('Conversas')}
  >
    <Ionicons name="chatbubbles-outline" size={32} color="#fff" style={{ marginBottom: 6 }} />
    <Text style={styles.textoBotaoDashboard}>Ir para Conversas</Text>
  </TouchableOpacity>

</ScrollView>


      <StatusBar style="dark" />

    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#b08cff',
    paddingTop: 40,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tituloNav: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  botaoDashboard: {
  backgroundColor: '#b08cff',
  borderRadius: 12,
  paddingVertical: 16,
  alignItems: 'center',
  marginTop: 20,
},

textoBotaoDashboard: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '700',
},


  scrollContainer: {
    padding: 20,
  },

  cartao: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  cabecalhoIdoso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  fotoIdoso: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },

  nomeIdoso: {
    fontSize: 18,
    fontWeight: '700',
  },

  subInfoIdoso: {
    color: '#555',
  },

  botaoOutline: {
    borderColor: '#b08cff',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 12,
    alignItems: 'center',
  },

  textoBotaoOutline: {
    color: '#b08cff',
    fontWeight: '700',
  },

  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 20,
    marginTop: 20,
  },

  campoPesquisa: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  tituloSecao: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },

  cardServico: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },

  cardServicoConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fotoServico: {
    width: 54,
    height: 54,
    borderRadius: 8,
    marginRight: 14,
  },

  infoServico: {
    flex: 1,
  },

  nomeServico: {
    fontSize: 18,
    fontWeight: '600',
  },

  cidadeServico: {
    fontSize: 14,
    color: '#777',
  },

  tipoServico: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
});
