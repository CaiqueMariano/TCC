import React, { useState, useEffect, useContext   } from 'react';
import { View, Text, TouchableOpacity,Dimensions, FlatList, TextInput,Platform, StyleSheet, Image, ScrollView } from 'react-native';
import colors from './colors';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';
const { width, height } = Dimensions.get("window");

export default function Ativos({ navigation }) {
  const { user } = useContext(UserContext);

  const [servicos, setServico] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/vizualizarContratoAtivo/${user.idUsuario}`)
    .then(response => setServico(response.data.data))
    .catch(error => console.log(error));
  },[])

      
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate(Home)}>
            <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
          </TouchableOpacity>
          <Text style={styles.title}>Ativos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('configuracoes')}>
            <Ionicons name="settings-outline" size={28} color={colors.preto} />
          </TouchableOpacity>
        </View>
    
        <View style={styles.headerTabs}>
          <TouchableOpacity onPress={() => navigation.navigate('Apagar')}>
            <Text style={styles.tabText}>A Pagar</Text>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={() => navigation.navigate('Pendente')}>
            <Text style={styles.tabText}>Pendentes</Text>
          </TouchableOpacity>
    
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Ativos</Text>
            <View style={styles.activeIndicator} />
          </View>
        </View>
    
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Platform.OS === 'web' ? width * 0.1 : width * 0.2,
            paddingHorizontal: 10,
            alignItems: 'center',
          }}
          style={styles.content}
        >
          {servicos.length === 0 ? (
            <Text style={{ marginTop: 20 }}>Nenhum serviço pendente encontrado.</Text>
          ) : (
            servicos.map((servico, index) => (
              <React.Fragment key={index}>
                <Text style={styles.subtitle}>
                 Contratos Ativos
                </Text>
    
                <View style={styles.cardcontratro}>
  
    
                  <View style={styles.contractInfo}>
                    <Image
                      source={require('../../assets/images/perfilicon.png')}
                      style={styles.contractIcon}
                    />
                    <View>
                      <Text style={styles.contractName}>{servico.nomeProfissional}</Text>
                      <Text style={styles.contractStatus}>
                        Status: <Text style={styles.contractPaid}> </Text>
                      </Text>
                      <Text style={styles.contractPaid}>Pago</Text>
                    </View>
                  </View>
    
                  <View style={styles.separator}></View>
    
                  <Text style={styles.detalhestitulo}>Detalhes do contrato</Text>
    
                  <View style={{ width: '100%', paddingLeft: 20 }}>
                    <Text style={styles.detalhes}>Dia: {servico.dataServico}</Text>
                    <Text style={styles.detalhes}>Horário: {servico.horaInicioServico}</Text>
                    <Text style={styles.detalhes}>Tipo: {servico.nomeServico}</Text>
    

                  </View>
    
                  {/* BOTÃO DE SOM SOBREPOSTO */}
                  <TouchableOpacity
                    style={styles.soundButton}
                    onPress={() => alert('Auxiliar auditivo')}
                  >
                    <Image
                      source={require('../../assets/images/audio.png')}
                      style={styles.soundIcon}
                    />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            ))
          )}
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
subtitle: {
  fontSize: 20,
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
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'web' ? 20 : 35,     
  },
  cardcontratro: {
    width: 340,
    height: 260,
    backgroundColor: '#a4e9e5',
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginVertical: 12,   // ✅ dá espaçamento acima e abaixo
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  
  cardcontratro2: {
    width: 340,
    height: 180,
    backgroundColor: '#a4e9e5',
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginVertical: 12,   // ✅ espaçamento entre cards
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  
content: {
  paddingTop: 20,       // ✅ espaço do topo da página
},
  contractTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  
  contractInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 300,
    height: 70,
    marginBottom: 8,
  },
  
  contractIcon: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: 'contain',
  },
  
  contractName: {
    fontSize: 20,
    color: '#000',
  },
  
  contractStatus: {
    fontSize: 18,
    color: '#000',
  },
  detalhes: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
  },
  detalhestitulo: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',   // ✅ centraliza o texto
    marginVertical: 10,    // (opcional, dá espaço acima/abaixo)
  },
  
  contractPaid: {
    color: 'green',
    fontWeight: 'bold',
  },
  
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#333',
    opacity: 0.4,
    marginVertical: 6,
  },
  
  viewMoreButton: {
    width: '85%',
    backgroundColor: '#a4e9e5',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 8,
  },
  
  viewMoreText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  som: { 
    width: 40, 
    height: 40, 
    resizeMode: 'contain' 
  },
  soundButton: {
    position: 'absolute',
    right: -50,           // fixa no canto direito
    top: '65%',          // centraliza verticalmente
    transform: [{ translateY: -15 }], // corrige leve deslocamento pra ficar central
    width: 100,
    height: 100,
    borderRadius: 20,
    
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  
  soundIcon: {
    width: 73,
    height: 73,
    resizeMode: 'contain',
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

  // ✅ Coloque as divisórias fora de buttonText
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    width: '100%',
  },

  line: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',   // linha tracejada
    borderColor: '#000',
    marginHorizontal: 10,
  },

  sectionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#a4e9e5', // mesmo tom do topo
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.preto,
    textAlign: 'center',
  },
  
  activeTab: {
    alignItems: 'center',
  },
  
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.preto,
  },
  
  activeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'green', // linha verde embaixo do ativo
    borderRadius: 2,
    marginTop: 4,
  },
});
