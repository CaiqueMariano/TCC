import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';
import minhaimagem from '../assets/correct.png';
export default function PedidosDisponiveis() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const pedidos = [
    {
      id: 1,
      nome: 'João dos Santos',
      cidade: '📌Jardim Europa - SP',
      nota: 3.7,
      avaliaçoes: 43,
      pedido: 'senhor de idade, precisa de ajuda dentro de casa (lavar louça, passar e guardar, cozinhar, etc...)',
      imagem: 'https://i.pravatar.cc/150?img=65',
    },
    {
      id: 2,
      nome: 'Severino da Silva',
      cidade: '📌Brooklin - SP',
      nota: 4.7,
      avaliaçoes: 36,
      pedido: 'senhor de idade, precisa de ajuda com o dia a dia (compras de mercado,farmacia,feira, etc...)',
      imagem: 'https://i.pravatar.cc/150?img=17',
    },
    {
      id: 3,
      nome: 'Sebastião Melo',
      cidade: '📌Vila olimpia - SP',
      nota: 3.5,
      avaliaçoes: 47,
      pedido: 'senhor de idade, precisa de ajuda com o dia a dia (compras de mercado,farmacia,feira, etc...)',
      imagem: 'https://i.pravatar.cc/150?img=70',
    },
    {
      id: 4,
      nome: 'José Ricardo',
      cidade: '📌Guarulhos - SP',
      nota: 3,
      avaliaçoes: 23,
      pedido: 'senhor de idade, precisa de ajuda com o dia a dia (compras de mercado,farmacia,feira, etc...)',
      imagem: 'https://i.pravatar.cc/150?img=63',
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={i} name="star" size={14} color="#b08cff" />
        ))}
        {hasHalfStar && <Ionicons name="star-half" size={14} color="#b08cff" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Ionicons key={i} name="star-outline" size={14} color="#b08cff" />
        ))}
      </View>
    );
  };

  return (

    
    <Background>
      {/* Top bar removida para manter consistência com as outras telas */}

      <ScrollView contentContainerStyle={styles.container1}>
        <Pressable 
    style={styles.openButton} 
    onPress={() => setModalVisible(true)}
  >Abrir Modal</Pressable>
      <Modal
        animationType="fade"    
        transparent={true}        
        visible={modalVisible}    
        onRequestClose={() => {   
          setModalVisible(false);
        }}
      >

<View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Recebimentos</Text>
        <Image source={minhaimagem} style={styles.modalFoto} />
        <View style={styles.modalInfo}>
    <Text style={styles.modalReceivedText}>Recebeu R$1120 reais</Text>
  </View>


       <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#7C4DFF', }]} 
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Dashboard'); 
              }}
            >
              <Text style={styles.buttonText}>Visualizar Ganhos</Text>
            </TouchableOpacity>

          
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#9575CD',}]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
        {pedidos.map((item) => (
          <View key={item.id} style={styles.card}>

            <View style={styles.cardContent}>
              <Image source={{ uri: item.imagem }} style={styles.profileImage} />
              <View style={styles.infoSection}>
                <Text style={styles.personName}>{item.nome}</Text>
                <Text style={styles.locationText}>{item.cidade}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {renderStars(item.nota)}
                  <Text style={styles.requestText}>( {item.avaliaçoes} avaliaçoes )</Text>
                </View>
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{item.valor}</Text>
              </View>
            </View>

            <View style={styles.requestContainer}>
            <Text style={styles.requestText} numberOfLines={4}>
              Pedido: {item.pedido}
            </Text>
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

      {/* Tab bar para navegação */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#0a84ff" />
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
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
    backgroundColor: '#0a84ff',
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
    backgroundColor: '#e2d9ff',
    borderRadius: 15, 
    padding: 30,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
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
    color: '#111',
  },
  locationText: {
    fontSize: 13,
    color: '#555',
    marginVertical: 2,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a84ff',
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

  requestText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
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
    color: '#0a84ff',
    fontWeight: '700',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
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
