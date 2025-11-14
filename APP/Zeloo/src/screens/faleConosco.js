import React, { useState } from "react";
import colors from "./colors";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function FaleConosco() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleEnviar = () => {
    if (!nome || !telefone || !assunto || !mensagem) {
      Alert.alert("Atenção", "Preencha todos os campos antes de enviar!");
      return;
    }

    console.log({
      nome,
      telefone,
      assunto,
      mensagem,
    });

    Alert.alert("Mensagem enviada", "Entraremos em contato em breve!");
    setNome("");
    setTelefone("");
    setAssunto("");
    setMensagem("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔹 Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require("./assets/voltar.png")} style={styles.iconVoltar} />
        </TouchableOpacity>

        <Text style={styles.title}>Fale Conosco</Text>

        <TouchableOpacity>
          <Image source={require("./assets/config.png")} style={styles.iconConfig} />
        </TouchableOpacity>
      </View>

      {/* 🔹 Ícone principal */}
      <Image
        source={require("./assets/faleConosco.png")}
        style={styles.iconPrincipal}
      />

      {/* 🔹 Campos do formulário */}
      <TextInput
        style={styles.input}
        placeholder="Seu Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu Telefone"
        keyboardType="phone-pad"
        value={telefone}
        onChangeText={setTelefone}
      />

      <TextInput
        style={styles.input}
        placeholder="Qual o Assunto?"
        value={assunto}
        onChangeText={setAssunto}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Mensagem"
        value={mensagem}
        onChangeText={setMensagem}
        multiline
      />

      {/* 🔹 Botão Enviar */}
      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 0,
  },
  header: {
    width: "100%",
    backgroundColor: colors.azul,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  // 🔹 Ícone do botão "Voltar"
  iconVoltar: {
    width: 40,
    height: 35,
    tintColor: "#000",
  },

  // 🔹 Ícone da engrenagem (configurações)
  iconConfig: {
    width: 40,
    height: 45,
    tintColor: "#000",
  },

  // 🔹 Ícone principal (atendente)
  iconPrincipal: {
    width: 150,
    height: 150,
    marginVertical: 40,
    resizeMode: "contain",
  },

  input: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  textArea: {
    width: "85%",
    height: 120,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
    textAlignVertical: "top",
  },
    button: {
    backgroundColor: colors.azul,
    width: "60%",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 15,

    // 🔹 Borda adicionada:
    borderWidth: 1,
    borderColor: "#000", // cor da borda (pode trocar, ex: colors.azulEscuro)
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});