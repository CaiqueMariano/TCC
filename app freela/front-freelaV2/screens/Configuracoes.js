import React, { useState } from "react";
import { View, Text, Switch, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../temas/ThemeContext";
import Background from "../components/Background";

export default function SettingsScreens() {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const [darkMode, setDarkMode] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);

  const handleThemeChange = (type) => {
    if (type === "dark") {
      setDarkMode(true);
      setColorBlindMode(false);
      toggleTheme("dark");
    } else if (type === "colorBlind") {
      setColorBlindMode(true);
      setDarkMode(false);
      toggleTheme("colorBlind");
    } else {
      setDarkMode(false);
      setColorBlindMode(false);
      toggleTheme("light");
    }
  };

  return (
     <Background>
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
    >
      {/* Cabeçalho */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{ color: theme.primary, fontSize: 16 }}>← Voltar</Text>
      </Pressable>

      <Text style={{ fontSize: 28, fontWeight: "700", color: theme.primary, marginTop: 10, marginBottom: 25 }}>
        Configurações
      </Text>

      {/* Seção de Conta */}
      <View style={{ backgroundColor: theme.card, borderRadius: 12, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: theme.border }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.primary, marginBottom: 10 }}>Conta</Text>

        <Pressable style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: theme.border }}>
          <Text style={{ fontSize: 16, color: theme.text }}>Editar perfil</Text>
        </Pressable>

        <Pressable style={{ paddingVertical: 12 }}>
          <Text style={{ fontSize: 16, color: theme.text }}>Alterar senha</Text>
        </Pressable>
      </View>

      {/* Seção de Preferências */}
      <View style={{ backgroundColor: theme.card, borderRadius: 12, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: theme.border }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.primary, marginBottom: 10 }}>Preferências</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderColor: theme.border, paddingVertical: 12 }}>
          <Text style={{ fontSize: 16, color: theme.text }}>Modo Escuro</Text>
          <Switch value={darkMode} onValueChange={() => handleThemeChange(darkMode ? "light" : "dark")} thumbColor={darkMode ? theme.primary : "#ccc"} trackColor={{ false: "#eee", true: theme.primary }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderColor: theme.border, paddingVertical: 12 }}>
          <Text style={{ fontSize: 16, color: theme.text }}>Modo para Daltônicos</Text>
          <Switch value={colorBlindMode} onValueChange={() => handleThemeChange(colorBlindMode ? "light" : "colorBlind")} thumbColor={colorBlindMode ? theme.primary : "#ccc"} trackColor={{ false: "#eee", true: theme.primary }} />
        </View>

        <Pressable style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: theme.border }}>
          <Text style={{ fontSize: 16, color: theme.text }}>Notificações</Text>
        </Pressable>
      </View>

      {/* Seção de Ajuda */}
      <View style={{ backgroundColor: theme.card, borderRadius: 12, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: theme.border }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: theme.primary, marginBottom: 10 }}>Ajuda</Text>

        <Pressable style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: theme.border }}>
          <Text style={{ fontSize: 16, color: theme.text }}>Central de suporte</Text>
        </Pressable>

        <Pressable style={{ paddingVertical: 12 }} onPress={() => navigation.navigate("SobreNos")}>
          <Text style={{ fontSize: 16, color: theme.text }}>Sobre o aplicativo</Text>
        </Pressable>
      </View>

      {/* Botão de Sair */}
      <Pressable style={{ paddingVertical: 12, borderColor: "#ff4d4d", borderWidth: 1, borderRadius: 12, marginTop: 20, alignItems: "center" }} onPress={() => alert("Você saiu da conta.")}>
        <Text style={{ fontSize: 16, color: "#ff4d4d" }}>Sair da conta</Text>
      </Pressable>
    </ScrollView>
    </Background>
  );
}
