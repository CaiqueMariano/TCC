import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../temas/ThemeContext";
import { FontAwesome5 } from "@expo/vector-icons"; // você pode instalar expo/vector-icons

export default function SobreNosScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const cardStyle = {
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  };

  const paragraphStyle = {
    color: theme.text,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  };

  const iconStyle = { marginRight: 10, color: theme.primary, fontSize: 20 };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* Botão voltar */}
      <Pressable onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.primary, fontSize: 16 }}>← Voltar</Text>
      </Pressable>

      {/* Título */}
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          color: theme.primary,
          marginBottom: 25,
        }}
      >
        Sobre a Zeloo
      </Text>

      {/* Card: Missão */}
      <View style={cardStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <FontAwesome5 name="bullseye" style={iconStyle} />
          <Text style={{ fontSize: 20, fontWeight: "700", color: theme.primary }}>Missão</Text>
        </View>
        <Text style={paragraphStyle}>
          A <Text style={{ fontWeight: "700" }}>Zeloo</Text> é um aplicativo criado pela empresa fictícia <Text style={{ fontWeight: "700" }}>Split</Text>, com o objetivo de conectar <Text style={{ fontWeight: "700" }}>idosos e familiares</Text> a <Text style={{ fontWeight: "700" }}>freelancers</Text> dispostos a ajudar em tarefas do dia a dia.
        </Text>
      </View>

      {/* Card: Propósito */}
      <View style={cardStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <FontAwesome5 name="hands-helping" style={iconStyle} />
          <Text style={{ fontSize: 20, fontWeight: "700", color: theme.primary }}>Propósito</Text>
        </View>
        <Text style={paragraphStyle}>
          Nosso propósito é oferecer <Text style={{ fontWeight: "700" }}>rapidez, segurança e valorização</Text> para os freelancers, enquanto proporcionamos mais tranquilidade para as famílias e melhor qualidade de vida para os idosos.
        </Text>
      </View>

      {/* Card: Freelancer */}
      <View style={cardStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <FontAwesome5 name="user-tie" style={iconStyle} />
          <Text style={{ fontSize: 20, fontWeight: "700", color: theme.primary }}>Para Freelancers</Text>
        </View>
        <Text style={paragraphStyle}>
          A versão freelancer do app foi pensada para quem deseja <Text style={{ fontWeight: "700" }}>ajudar e ser reconhecido pelo seu trabalho</Text>, permitindo gerenciar serviços, histórico e avaliações com facilidade.
        </Text>
      </View>

      {/* Card: Citação */}
      <View style={{ ...cardStyle, alignItems: "center" }}>
        <Text style={{ fontStyle: "italic", color: "#666", fontSize: 16, textAlign: "center" }}>
          “Cuidar de quem sempre cuidou de nós.”
        </Text>
      </View>
    </ScrollView>
  );
}
