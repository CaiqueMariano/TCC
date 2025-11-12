import React, { createContext, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// ✅ Mock do UserContext
const UserContext = createContext({ user: { name: "João Cuidador" } });

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* CARD 1 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Proposta recomendada</Text>
          <View style={styles.cardContent}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.profileImage}
            />
            <View style={styles.infoSection}>
              <Text style={styles.personName}>Maria Oliveira</Text>
              <Text style={styles.locationText}>São Paulo - SP</Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons
                    key={i}
                    name={i <= 4 ? "star" : "star-outline"}
                    size={14}
                    color="#FFD700"
                  />
                ))}
              </View>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>R$ 180,00</Text>
            </View>
          </View>
          <View style={styles.requestContainer}>
            <Text style={styles.requestText}>Pedido: Mercado e supervisão</Text>
          </View>
        </View>

        {/* CARD 2 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Últimas avaliações</Text>
          <View style={styles.feedbackRow}>
            {[
              { name: "Carlos Souza", rating: 5 },
              { name: "Ana Lima", rating: 4 },
              { name: "Pedro Martins", rating: 3 },
            ].map((item, index) => (
              <View key={index} style={styles.feedbackItem}>
                <Text style={styles.feedbackName}>{item.name}:</Text>
                <View style={styles.starsContainer}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < item.rating ? "star" : "star-outline"}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CARD 3 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meu perfil</Text>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=8" }}
              style={styles.profileImageLarge}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.personName}>{user.name}</Text>
              <Text style={styles.locationText}>
                Bairro Vila Nova - Curitiba/PR
              </Text>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Ionicons
                    key={i}
                    name={i <= 4 ? "star" : "star-outline"}
                    size={14}
                    color="#FFD700"
                  />
                ))}
              </View>
              <Text style={styles.profileDetail}>Média de avaliação: 4.0</Text>
              <Text style={styles.profileDetail}>
                Tempo no app: 1 ano e 3 meses
              </Text>
            </View>
          </View>
        </View>

        {/* 🔹 BOTÃO IR PARA DASHBOARD */}
        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() => Alert.alert("Dashboard", "Indo para Dashboard...")}
        >
          <Ionicons name="stats-chart" size={20} color="#fff" />
          <Text style={styles.dashboardButtonText}>Ir para Dashboard</Text>
        </TouchableOpacity>

        <StatusBar style="dark" />
      </ScrollView>

      {/* 🔹 BARRA INFERIOR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#007AFF" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#999" />
          <Text style={styles.navLabel}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={22} color="#999" />
          <Text style={styles.navLabel}>Contratos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#999" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { padding: 15, paddingBottom: 150, paddingTop: 50 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#333" },
  cardContent: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profileImage: { width: 54, height: 54, borderRadius: 10, marginRight: 10 },
  infoSection: { flex: 1 },
  personName: { fontSize: 15, fontWeight: "600", color: "#333" },
  locationText: { fontSize: 13, color: "#666", marginVertical: 2 },
  ratingRow: { flexDirection: "row" },
  valueContainer: { alignItems: "flex-end" },
  valueText: { fontSize: 16, fontWeight: "700", color: "#2ecc71" },
  requestContainer: { marginTop: 4 },
  requestText: { fontSize: 14, color: "#555", fontWeight: "500" },
  feedbackRow: { flexDirection: "column" },
  feedbackItem: { flexDirection: "row", marginBottom: 6 },
  feedbackName: { fontSize: 14, fontWeight: "500", marginRight: 6, color: "#333" },
  starsContainer: { flexDirection: "row" },
  profileSection: { flexDirection: "row", alignItems: "center" },
  profileImageLarge: { width: 64, height: 64, borderRadius: 12, marginRight: 12 },
  profileInfo: { flex: 1 },
  profileDetail: { fontSize: 13, color: "#666", marginTop: 2 },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  navLabel: {
    marginTop: 3,
    fontSize: 12,
    color: "#999",
    paddingBottom: 10,
  },
  navLabelActive: { color: "#007AFF", fontWeight: "700" },
  dashboardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 30,
  },
  dashboardButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
