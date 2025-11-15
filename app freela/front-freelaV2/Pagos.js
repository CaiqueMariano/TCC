import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';

export default function pendentes() {
  const navigation = useNavigation();
  

  const pedidos = [
    {
      id: 1,
      nome: 'João dos Santos',
      cidade: '📌Jardim Europa - SP',
      nota: 3.7,
      avaliaçoes: 43,
      pedido: 'senhor de idade, precisa de ajuda com (compras no mercado)',
      imagem: 'https://i.pravatar.cc/150?img=65',
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
       <SafeAreaView
              style={[styles.safeArea, ]}
            >
      {/* Top bar removida para manter consistência com as outras telas */}

      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>

       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-outline" size={28} />
      </TouchableOpacity>
        <Text style={styles.title}> Serviços </Text>
         <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
           <Ionicons name="settings-outline" size={28} />
         </TouchableOpacity>

      </View>
       <View style={styles.headerTabs}>

      <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
          <Text style={styles.tabText}>Doméstico</Text>
        </TouchableOpacity>


  <TouchableOpacity onPress={() => navigation.navigate('Pendentes')}>
    <Text style={styles.tabText}>Medico</Text>
  </TouchableOpacity>

    
            <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Mercado</Text>
            <View style={styles.activeIndicator} />
        </View>


      </View>

        {pedidos.map((item) => (
          <View key={item.id} style={styles.card}>
          
                      <View style={styles.cardContent}>
                        <Image source={{ uri: item.imagem }} style={styles.profileImage} />
                        <View style={styles.infoSection}>
                          <Text style={styles.personName}>{item.nome}</Text>
                          <Text style={styles.locationText}>{item.cidade}</Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {renderStars(item.nota)}
                            <Text style={styles.requestText}>( {item.avaliaçoes} avaliaçôes )</Text>
                          </View>
                        </View>
                        <View style={styles.valueContainer}>
                          <Text style={styles.valueText}>{item.valor}</Text>
                        </View>
                      </View>
                     <Text style={styles.pedido}>Pedido:</Text> <Text style={styles.requestText}>{item.pedido}</Text>
          
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
  pedido: {
  fontSize: 20,
  color: '#333',
  fontWeight: '500',
},
  
  activeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#0a84ff', // linha verde embaixo do ativo
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
    backgroundColor: '#0a84ff',
    paddingHorizontal: 20,
    paddingVertical: 6, // antes era 10
    borderRadius: 8,
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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
  alignItems: 'flex-start',   // mantém o topo alinhado
  justifyContent: 'space-between',
  marginTop: 8,
},
valueReceivedText: {
  fontSize: 18,
  color: '#333',
  fontWeight: '500',
},

requestText: {
  fontSize: 15,
  color: '#333',
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
    color: '#0a84ff',
    fontWeight: '700',
  },
});
