import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../temas/ThemeContext";
import Background from "../components/Background";

// Simulação de API
async function fetchProfileFromAPI(id) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id,
        name: "Diana Buarque",
        city: "Niterói",
        state: "RJ",
        rating: 4.7,
        reviewsCount: 36,
        yearsExperience: 7,
        description:
          "Profissional dedicada, responsável e com ampla experiência no cuidado a idosos.",
        balance: 5879.9,
        avatarUrl: null,
      });
    }, 600)
  );
}

export default function Perfil({ route }) {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const profileId = route?.params?.profileId || "diana123";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchProfileFromAPI(profileId)
      .then((data) => {
        if (mounted) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Erro ao carregar perfil");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, [profileId]);

  const handleWithdraw = () => {
    if (!profile) return;
    alert(`Saque de R$ ${profile.balance.toFixed(2)} solicitado!`);
  };

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={{ color: theme.error }}>{error}</Text>
      </View>
    );

  return (
    <Background>
      <SafeAreaView
        style={[styles.safeArea, ]}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={[styles.name, { color: theme.text }]}>
              {profile.name}
            </Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate("Configuracoes")}
            >
              <Ionicons
                name="settings-outline"
                size={26}
                color={theme.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Card principal */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {profile.avatarUrl ? (
                <Image
                  source={{ uri: profile.avatarUrl }}
                  style={styles.avatar}
                />
              ) : (
                <View
                  style={[
                    styles.avatarPlaceholder,
                    { backgroundColor: theme.avatarBg },
                  ]}
                >
                  <Text
                    style={[styles.avatarLetter, { color: theme.avatarText }]}
                  >
                    {profile.name.charAt(0)}
                  </Text>
                </View>
              )}
            </View>

            {/* Localização e dados */}
            <Text style={[styles.location, { color: theme.textSecondary }]}>
              📍 {profile.city} - {profile.state}
            </Text>
            <Text style={[styles.info, { color: theme.textSecondary }]}>
              ⭐ {profile.rating} ({profile.reviewsCount} avaliações)
            </Text>
            <Text style={[styles.info, { color: theme.textSecondary }]}>
              ⏳ {profile.yearsExperience} anos de experiência
            </Text>

            {/* Descrição */}
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>
              Descrição de Serviços
            </Text>
            <Text style={[styles.description, { color: theme.text }]}>
              {profile.description}
            </Text>

            {/* Saldo */}
            <View
              style={[
                styles.balanceContainer,
                { backgroundColor: theme.balanceBg },
              ]}
            >
              <Text
                style={[styles.balanceLabel, { color: theme.textSecondary }]}
              >
                Saldo Disponível
              </Text>
              <Text style={[styles.balanceValue, { color: theme.balanceText }]}>
                R$ {profile.balance.toFixed(2)}
              </Text>
              <TouchableOpacity
                style={[
                  styles.withdrawButton,
                  { backgroundColor: theme.withdrawButton },
                ]}
                onPress={handleWithdraw}
              >
                <Text
                  style={[styles.withdrawText, { color: theme.withdrawText }]}
                >
                  SACAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Barra de navegação inferior */}
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
            onPress={() => navigation.navigate("pedidos")}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color="#fff"
            />
            <Text style={styles.navLabel}>Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="time-outline" size={22} color="#fff" />
            <Text style={styles.navLabel}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("Perfil")}
          >
            <Ionicons name="person-outline" size={22} color="#0a84ff" />
            <Text style={[styles.navLabel, styles.navLabelActive]}>Perfil</Text>
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

  scrollContainer: {
    alignItems: "center",
    padding: 16,
    paddingBottom: 120,
    flexGrow: 1,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  settingsButton: { 
    padding: 6 
  },

  name: { 
    fontSize: 22, 
    fontWeight: "700", 
    textAlign: "center" 
  },

  card: {
    width: "95%",
    borderRadius: 24,
    alignItems: "center",
    padding: 20,
    boxShadow: "0px 2px 10px rgba(0,0,0,0.25)",
    elevation: 8,
  },

  avatarContainer: { 
    marginBottom: 10
   },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarLetter: { 
    fontSize: 46, 
    fontWeight: "bold"
   },

  location: { 
    fontSize: 15, 
    marginBottom: 4
   },

  info: { 
    fontSize: 14, 
    marginBottom: 3 
  },

  sectionTitle: { 
    fontSize: 17, 
    fontWeight: "700", 
    marginTop: 12
   },

  description: { 
    textAlign: "center", 
    marginTop: 6, 
    lineHeight: 20 
  },

  balanceContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 22,
    width: "100%",
    alignItems: "center",
  },

  balanceLabel: { 
    fontSize: 13, 
    color: "#333" 
  },

  balanceValue: { 
    fontSize: 24, 
    fontWeight: "700", 
    marginVertical: 8 
  },

  withdrawButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 6,
  },

  withdrawText: {
    fontWeight: "bold",
    fontSize: 15,
  },

  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.85)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 14,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navLabel: {
    marginTop: 2,
    fontSize: 12,
    color: "#fff",
  },

  navLabelActive: {
    color: "#0a84ff",
    fontWeight: "700",
  },

  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },

});
