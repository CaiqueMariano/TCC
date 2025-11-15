import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';

export default function Pendentes() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const pedidos = [
    {
      id: 1, nome: 'João dos Santos',
      cidade: '📌Jardim Europa - SP',
      nota: 3.7, 
      avaliacoes: 43,
      pedido: 'senhor de idade, precisa de ajuda com (compras no mercado)',
      imagem: 'https://i.pravatar.cc/150?img=65',
    },
  ];

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(full)].map((_, i) => (
          <Ionicons key={i} name="star" size={14} color="#FFD700" />
        ))}
        {half && <Ionicons name="star-half" size={14} color="#FFD700" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Ionicons key={i} name="star-outline" size={14} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <Background>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="arrow-back-outline" size={28} />
            </TouchableOpacity>

            <Text style={styles.title}>Serviços</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
              <Ionicons name="settings-outline" size={28} />
            </TouchableOpacity>
          </View>

          {/* TABS */}
          <View style={styles.headerTabs}>
            <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
              <Text style={styles.tabText}>Doméstico</Text>
            </TouchableOpacity>

           <TouchableOpacity onPress={() => navigation.navigate('pendentes')}>
              <Text style={styles.tabText}>Médico</Text>
            </TouchableOpacity>

            <View style={styles.activeTab}>
              <Text style={styles.activeTabText}>Mercado</Text>
              <View style={styles.activeIndicator} />
            </View>
          </View>

          {/* BOTÃO TESTE MODAL */}
          <Pressable style={styles.openButton} onPress={() => setModalVisible(true)}>
            <Text>Abrir Modal</Text>
          </Pressable>

          {/* MODAL */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Recebimentos</Text>
                <Image source={require('../assets/correct.png')} style={styles.profileImage} />
                <View style={styles.modalInfo}></View>
                <Text style={styles.modalReceivedText}>Recebeu R$1120 reais</Text>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#7C4DFF' }]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Dashboard');
                  }}
                >
                  <Text style={styles.buttonText}>Visualizar Ganhos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#9575CD' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* LISTA */}
          {pedidos.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.imagem }} style={styles.profileImage} />
                <View style={styles.infoSection}>
                  <Text style={styles.personName}>{item.nome}</Text>
                  <Text style={styles.locationText}>{item.cidade}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {renderStars(item.nota)}
                    <Text style={styles.requestText}>({item.avaliacoes} avaliaçôes)</Text>
                  </View>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.valueText}>R$ --</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={styles.pedido}>Pedido:</Text>
                <Text style={styles.requestText}>{item.pedido}</Text>
              </View>
              <View style={styles.requestContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.buttonText}>Ver Mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* BOTTOM BAR */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home-outline" size={22} color="#fff" />
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#b08cff" />
            <Text style={[styles.navLabel, styles.navLabelActive]}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="time-outline" size={22} color="#fff" />
            <Text style={styles.navLabel}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Perfil')}>
            <Ionicons name="person-outline" size={22} color="#fff" />
            <Text style={styles.navLabel}>Perfil</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
   safeArea: { 
    flex: 1
   },

  background: {
    flex: 1,
  },
  
 header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  
  },
 headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
title: {
  fontSize: 25,
  fontWeight: 'bold',

},
  
  tabText: {
    fontSize: 16,
    fontWeight: '500',

    textAlign: 'center',
  },
  
  activeTab: {
    alignItems: 'center',
  },
  
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  
  activeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#b08cff', // linha lilás embaixo do ativo
    borderRadius: 2,
    marginTop: 4,
    
  },
  topBar: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    padding: 12,
    paddingBottom: 96,
    flexGrow: 1,
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: '#b08cff',
    paddingHorizontal: 20,
    paddingVertical: 6, 
    borderRadius: 8,
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily:'roboto',
  
  },
  card: {
    backgroundColor: '#8b6bc7',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
  },
  infoSection: {
    flex: 1,
  },
  personName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  locationText: {
    fontSize: 13,
    color: '#f0f0f0',
    marginVertical: 2,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  bottomBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
  },
  requestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
pedido: {
  fontSize: 20,
  color: '#fff',
  fontWeight: '500',
},

requestText: {
  fontSize: 15,
  color: '#fff',
  fontWeight: '500',
  marginLeft: 10,             // ✅ Corrigido: L maiúsculo
  textAlign: 'left',          // ✅ Alinha o texto à esquerda
  flex: 1,                    // ✅ Faz o texto ocupar o espaço disponível
  flexWrap: 'wrap',           // ✅ Permite quebrar linha se for longo
},
  bottomBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    zIndex: 20,
    elevation: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#fff',
  },
  navLabelActive: {
    color: '#b08cff',
    fontWeight: '700',
  },

  actionButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
// === MODAL ===
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },

  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalFoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 12,
  },

  modalInfo: { marginBottom: 12 },

  modalReceivedText: {
    fontSize: 16,
    fontWeight: '600',
  },

  actionButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  openButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
  },
  modalFoto: {
    width: 120,            
    height: 120,           
    borderRadius: 60,      
    marginBottom: 15,
    resizeMode: 'cover',
  },
  modalReceivedText:{
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,         
    color: '#83DBC2',
  },
  modalInfo:{
    flexDirection: 'row',      
    alignItems: 'center',    
    marginBottom: 20,       
    justifyContent: 'flex-start',
  }
  
  
});
  


