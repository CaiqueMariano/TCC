import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Image } from "react-native";
import colors from "./colors";
import { TextInput } from "react-native";
import axios from "axios";
import { UserContext } from "./userContext";
import { EscalarText, EscalarTouchable, EscalarImage, useAccessibility } from './AccessibilityContext';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';

const { width, height } = Dimensions.get("window");

export default function Cadastro({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [etapa, setEtapa] = useState(1);
  const totalEtapas = 3;

  // Checkboxes
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const { increaseScale, decreaseScale, resetScale, scale } = useAccessibility();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <EscalarTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
        </EscalarTouchable>
        <Text style={styles.navTitulo}>Solicitação</Text>
        <EscalarTouchable onPress={() => navigation.navigate('configuracoes')}>
          <Ionicons name="settings-outline" size={28} color={colors.preto} />
        </EscalarTouchable>
      </View>

      <EscalarTouchable style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
        <EscalarImage source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
      </EscalarTouchable>

      {etapa === 1 && (
        <View style={styles.form}>
          <EscalarText style={styles.title}>Qual o seu nível de Autonomia?</EscalarText>

                <View style={styles.checkboxContainer}>
                {[
                    { label: "Eu ando sozinho", checked: checked1, setChecked: setChecked1 },
                    { label: "Uso cadeira de rodas", checked: checked2, setChecked: setChecked2 },
                    { label: "Uso andador/bengala", checked: checked3, setChecked: setChecked3 },
                    { label: "Estou acamado", checked: checked4, setChecked: setChecked4 },
                ].map((item, i) => (
                    <EscalarTouchable
                    key={i}
                    style={[
                        styles.checkboxBox,
                        item.checked && styles.checkboxBoxSelecionado, // muda a cor ao selecionar
                    ]}
                    onPress={() => item.setChecked(!item.checked)}
                    activeOpacity={0.8}
                    >
                    <View style={styles.checkboxes}>
                        <Checkbox
                        status={item.checked ? "checked" : "unchecked"}
                        color={colors.azul}
                        onPress={() => item.setChecked(!item.checked)}
                        />
                        <Text style={styles.checkOpicoes}>{item.label}</Text>
                    </View>
                    </EscalarTouchable>
                ))}
                </View>


          <View style={styles.botoes}>
            <EscalarTouchable
              style={styles.bFoto}
              onPress={() => { setEtapa(3); }}
            >
              <EscalarText style={styles.buttonText}>Próximo</EscalarText>
            </EscalarTouchable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.branco, 
    alignItems: "center" 
  },
  nav: { 
    width: "100%", 
    paddingTop: Platform.OS === "web" ? 20 : 45, 
    paddingBottom: 10, 
    paddingHorizontal: Platform.OS === "web" ? 40 : 20, 
    height: Platform.OS === "web" ? height * 0.12 : height * 0.1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    backgroundColor: colors.azul 
  },
  navTitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: colors.preto 
  },
  form: { 
    width: "100%", 
    alignItems: "center", 
    marginTop: 60 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.preto,
    textAlign: 'center',
  },
  checkboxContainer: { 
    flexDirection: "column", 
    alignItems: 'center', 
    marginBottom: 10,
    width: "90%",
  },
  checkboxBox: {
    width: "100%",
    borderWidth: 2,
    borderColor: colors.azul,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: colors.branco,
  },
  checkboxes: { 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  checkOpicoes: { 
    fontSize: 20, 
    color: colors.preto, 
    width: 250 
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 50,
  },
  bFoto: {
    flex: 1,
    height: 50,
    backgroundColor: colors.azul,
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.preto,
    fontSize: 18,
    fontWeight: "600",
  },
  soundButton: {
    position: 'absolute',
    top: 430, 
    right: 15, 
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 1002,
  },
  soundIcon: {
    width: 65,
    height: 65,
  },
});
