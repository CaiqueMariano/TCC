import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import React,{useContext} from 'react';
import { UserContext } from "./userContext";
export default function Home() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const { user } = useContext(UserContext);
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [2, 4, 6, 8, 10, 12],
        strokeWidth: 2,
        color: () => '#0a84ff',
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: () => '#0a84ff',
    labelColor: () => '#333',
    strokeWidth: 2,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#0a84ff',
    },
  };

  return (
    <ImageBackground
      source={require('../assets/screenshot.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Home</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* CARD 1 - Proposta recomendada */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Proposta recomendada</Text>

          <View style={styles.cardContent}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.profileImage}
            />
            <View style={styles.infoSection}>
              <Text style={styles.personName}>Maria Oliveira</Text>
              <Text style={styles.locationText}>São Paulo - SP</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star-half" size={14} color="#FFD700" />
                <Ionicons name="star-outline" size={14} color="#FFD700" />
              </View>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>R$ 180,00</Text>
            </View>
          </View>

          <View style={styles.requestContainer}>
            <Text style={styles.requestText}>
              Pedido: Mercado e supervisão
            </Text>
          </View>
        </View>

        {/* CARD 2 - Últimas avaliações */}
       <View style={styles.card}>
  <Text style={styles.cardTitle}>Últimas avaliações</Text>
  <View style={styles.feedbackRow}>
    {[
      { name: 'Carlos Souza', rating: 5 },
      { name: 'Ana Lima', rating: 4 },
      { name: 'Pedro Martins', rating: 3 },
    ].map((item, index) => (
      <View key={index} style={styles.feedbackItem}>
        <Text style={styles.feedbackName}>{item.name}:</Text>
        <View style={styles.starsContainer}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < item.rating ? 'star' : 'star-outline'}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
    ))}
  </View>
</View>

        {/* CARD 3 - Seu perfil */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meu perfil</Text>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
              style={styles.profileImageLarge}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.personName}>João Cuidador</Text>
              <Text style={styles.locationText}>Bairro Vila Nova - Curitiba/PR</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star" size={14} color="#FFD700" />
                <Ionicons name="star-outline" size={14} color="#FFD700" />
              </View>
              <Text style={styles.profileDetail}>Média de avaliação: 4.0</Text>
              <Text style={styles.profileDetail}>Tempo no app: 1 ano e 3 meses</Text>
            </View>
          </View>
        </View>

        {/* CARD 4 - Dashboard */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dashboard</Text>
          <View style={styles.dashboardRow}>
            <View style={styles.kpiBox}>
              <Text style={styles.kpiValue}>12</Text>
              <Text style={styles.kpiLabel}>Pedidos mês</Text>
            </View>
            <View style={styles.kpiBox}>
              <Text style={styles.kpiValue}>R$ 2.450</Text>
              <Text style={styles.kpiLabel}>Ganhos</Text>
            </View>
            <View style={styles.kpiBox}>
              <Text style={styles.kpiValue}>4.2</Text>
              <Text style={styles.kpiLabel}>Média</Text>
            </View>
          </View>

          {/* Gráfico de linha */}
          <View style={{ marginTop: 16 }}>
            <LineChart
              data={chartData}
              width={screenWidth - 48} // considerando padding
              height={180}
              chartConfig={chartConfig}
              bezier
              style={{ borderRadius: 12 }}
            />
          </View>
        </View>

        <StatusBar style="light" />
      </ScrollView>

      {/* BARRA INFERIOR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#0a84ff" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.navItem}
  onPress={() => navigation.navigate("Pedidos")}>
  <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
  <Text style={styles.navLabel}>Pedidos</Text>
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
    paddingBottom: 100,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  dashboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kpiBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0a84ff',
  },
  kpiLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
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
  ratingRow: {
    flexDirection: 'row',
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a84ff',
  },
  requestContainer: {
    marginTop: 4,
  },
  requestText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  feedbackRow: {
    flexDirection: 'column',
  },
  feedbackItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageLarge: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileDetail: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  feedbackName: {
  fontSize: 14,
  fontWeight: '500',
  marginRight: 6,
  color: '#333',
},
starsContainer: {
  flexDirection: 'row',
},

});
