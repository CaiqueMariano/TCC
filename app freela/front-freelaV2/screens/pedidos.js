import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';

export default function PedidosDisponiveis() {
  const navigation = useNavigation();

  const pedidos = [
    {
      id: 1,
      nome: 'Maria Oliveira',
      cidade: 'São Paulo - SP',
      nota: 4.5,
      valor: 'R$ 180,00',
      pedido: 'Mercado e supervisão',
      imagem: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: 2,
      nome: 'Carlos Andrade',
      cidade: 'Belo Horizonte - MG',
      nota: 5,
      valor: 'R$ 200,00',
      pedido: 'Acompanhamento médico',
      imagem: 'https://i.pravatar.cc/150?img=7',
    },
    {
      id: 3,
      nome: 'Ana Souza',
      cidade: 'Curitiba - PR',
      nota: 3.5,
      valor: 'R$ 150,00',
      pedido: 'Ajuda com medicação',
      imagem: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 4,
      nome: 'Pedro Lima',
      cidade: 'Rio de Janeiro - RJ',
      nota: 4,
      valor: 'R$ 220,00',
      pedido: 'Companhia e conversa',
      imagem: 'https://i.pravatar.cc/150?img=9',
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={i} name="star" size={14} color="#FFD700" />
        ))}
        {hasHalfStar && <Ionicons name="star-half" size={14} color="#FFD700" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Ionicons key={i} name="star-outline" size={14} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <Background>
      {/* Top bar removida para manter consistência com as outras telas */}

      <ScrollView contentContainerStyle={styles.container}>
        {pedidos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>Novo pedido</Text>

            <View style={styles.cardContent}>
              <Image source={{ uri: item.imagem }} style={styles.profileImage} />
              <View style={styles.infoSection}>
                <Text style={styles.personName}>{item.nome}</Text>
                <Text style={styles.locationText}>{item.cidade}</Text>
                {renderStars(item.nota)}
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{item.valor}</Text>
              </View>
            </View>

            <View style={styles.requestContainer}>
              <Text style={styles.requestText}>Pedido: {item.pedido}</Text>
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
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
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
    fontSize: 15,
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
    marginTop: 4,
  },
  requestText: {
    fontSize: 14,
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
});
