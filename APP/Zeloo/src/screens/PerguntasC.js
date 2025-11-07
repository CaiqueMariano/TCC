import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions,Alert, Image } from "react-native";
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
  const totalEtapas = 5;

  // Checkboxes
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

    // Checkboxes2
  const [checked1E2, setChecked1E2] = useState(false);
  const [checked2E2, setChecked2E2] = useState(false);
  const [checked3E2, setChecked3E2] = useState(false);
  const [checked4E2, setChecked4E2] = useState(false);
  const [checked5E2, setChecked5E2] = useState(false);

      // Checkboxes3
  const [checked1E3, setChecked1E3] = useState(false);
  const [checked2E3, setChecked2E3] = useState(false);
  const [checked3E3, setChecked3E3] = useState(false);
  const [checked4E3, setChecked4E3] = useState(false);
  const [dietaTexto, setDietaTexto] = useState("");

  
      // etapa5
 const [diagnosTexto, setDiagnosTexto] = useState("");
 const [alergiaTexto, setAlergiaTexto] = useState("");
 const [diagnosticos, setDiagnosticos] = useState([]);
 const [alergias, setAlergias] = useState([]);

 // Checkboxes4
  const [checked1E5, setChecked1E5] = useState(false);
  const [checked2E5, setChecked2E5] = useState(false);
  const [checked3E5, setChecked3E5] = useState(false);

  const { increaseScale, decreaseScale, resetScale, scale } = useAccessibility();

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <EscalarTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
        </EscalarTouchable>
        <Text style={styles.navTitulo}>Condições de Saúde</Text>
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
                { 
                  label: "Eu ando sozinho", 
                  checked: checked1, 
                  setChecked: setChecked1,
                  image: require("../../assets/images/andar.png"),
                },
                { 
                  label: "Uso cadeira de rodas", 
                  checked: checked2, 
                  setChecked: setChecked2,
                  image: require("../../assets/images/cadeira.png"),
                },
                { 
                  label: "Uso andador/bengala", 
                  checked: checked3, 
                  setChecked: setChecked3,
                  image: require("../../assets/images/muleta.png"),
                },
                { 
                  label: "Estou acamado", 
                  checked: checked4, 
                  setChecked: setChecked4,
                  image: require("../../assets/images/acamado.png"),
                },
              ].map((item, i) => (
                <EscalarTouchable
                  key={i}
                  style={[
                    styles.checkboxBox,
                    item.checked && styles.checkboxBoxSelecionado,
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
                <View style={styles.imageContainer}>
                    <EscalarImage source={item.image} style={styles.optionImage} resizeMode="contain" />
                </View>

                    <EscalarText style={styles.checkOpicoes}>{item.label}</EscalarText>
               
                  </View>
                </EscalarTouchable>
              ))}
            </View>


            <View style={styles.botoes}>
              <EscalarTouchable
                style={[
                  styles.bFoto,
                  !(checked1 || checked2 || checked3 || checked4) && { opacity: 0.5 }, 
                ]}
                onPress={() => {
                  if (checked1 || checked2 || checked3 || checked4) {
                    setEtapa(2);
                  } else {
                    alert("Por favor, selecione uma opção antes de continuar.");
                  }
                }}
                activeOpacity={0.8}
              >
                <EscalarText style={styles.buttonText}>Próximo</EscalarText>
              </EscalarTouchable>
            </View>
        </View>
      )}

      {etapa === 2 && (
        <View style={styles.form}>
          <EscalarText style={styles.title}>E quanto a sua higiene?</EscalarText>

            <View style={styles.checkboxContainer}>
              {[
                { 
                  label: "Preciso de ajuda com banho e higiene", 
                  checked: checked1E2, 
                  setChecked: setChecked1E2,
                  image: require("../../assets/images/banho.png"),
                },
                { 
                  label: "Uso e preciso de fralda trocada", 
                  checked: checked2E2, 
                  setChecked: setChecked2E2,
                  image: require("../../assets/images/fralda.png"),
                },
                { 
                  label: "Uso sonda", 
                  checked: checked3E2, 
                  setChecked: setChecked3E2,
                  image: require("../../assets/images/sonda.png"),
                },
                {
                  label: "Preciso de ajuda no banheiro", 
                  checked: checked4E2, 
                  setChecked: setChecked4E2,
                  image: require("../../assets/images/Banheiro.png"),
                },
                {
                  label: "Nenhum dos anteriores", 
                  checked: checked5E2, 
                  setChecked: setChecked5E2,
                  image: require("../../assets/images/nenhum.png"),
                },
              ].map((item, i) => (
                <EscalarTouchable
                  key={i}
                  style={[
                    styles.checkboxBox,
                    item.checked && styles.checkboxBoxSelecionado,
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
                <View style={styles.imageContainer}>
                    <EscalarImage source={item.image} style={styles.optionImage} resizeMode="contain" />
                </View>

                    <EscalarText style={styles.checkOpicoes}>{item.label}</EscalarText>
               
                  </View>
                </EscalarTouchable>
              ))}
            </View>


            <View style={styles.botoes}>
              <EscalarTouchable
                style={[
                  styles.bFoto,
                  !(checked1E2 || checked2E2 || checked3E2 || checked4E2 || checked5E2) && { opacity: 0.5 }, // visualmente desativa
                ]}
                onPress={() => {
                  if (checked1E2 || checked2E2 || checked3E2 || checked4E2 || checked5E2) {
                    setEtapa(3);
                  } else {
                    alert("Por favor, selecione uma opção antes de continuar.");
                  }
                }}
                activeOpacity={0.8}
              >
                <EscalarText style={styles.buttonText}>Próximo</EscalarText>
              </EscalarTouchable>
            </View>
        </View>
      )}

      {etapa === 3 && (
        <View style={styles.form}>
          <EscalarText style={styles.title}>E a sua Alimentação?</EscalarText>

          <View style={styles.checkboxContainer}>
            {[
              { 
                label: "Eu como sozinho", 
                checked: checked1E3, 
                setChecked: setChecked1E3,
                image: require("../../assets/images/comer.png"),
              },
              { 
                label: "Preciso de uma dieta especial", 
                checked: checked2E3, 
                setChecked: setChecked2E3,
                image: require("../../assets/images/dieta.png"),
              },
              { 
                label: "Tenho dificuldade para engolir", 
                checked: checked3E3, 
                setChecked: setChecked3E3,
                image: require("../../assets/images/engolir.png"),
              },
              {
                label: "Preciso que me ajudem a comer", 
                checked: checked4E3, 
                setChecked: setChecked4E3,
                image: require("../../assets/images/colher.png"),
              },
            ].map((item, i) => (
              <View key={i} style={{ width: "100%" }}>
                <EscalarTouchable
                  style={[
                    styles.checkboxBox,
                    item.checked && styles.checkboxBoxSelecionado,
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
                    <View style={styles.imageContainer}>
                      <EscalarImage
                        source={item.image}
                        style={styles.optionImage}
                        resizeMode="contain"
                      />
                    </View>
                    <EscalarText style={styles.checkOpicoes}>{item.label}</EscalarText>
                  </View>
                </EscalarTouchable>

                {item.label === "Preciso de uma dieta especial" && item.checked && (
                  <View style={styles.dietaContainer}>
                    <EscalarText style={styles.dietaLabel}>
                      Especifique sua dieta especial:
                    </EscalarText>
                    <TextInput
                      style={styles.dietaInput}
                      placeholder="Exemplo: sem glúten, vegetariana, hipossódica..."
                      placeholderTextColor="#888"
                      multiline
                      value={dietaTexto}
                      onChangeText={setDietaTexto}
                    />
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.botoes}>
            <EscalarTouchable
              style={[
                styles.bFoto,
                !(
                  (checked1E3 || checked2E3 || checked3E3 || checked4E3) &&
                  (!checked2E3 || (checked2E3 && dietaTexto.trim() !== ""))
                ) && { opacity: 0.5 },
              ]}
              onPress={() => {
                if (!checked1E3 && !checked2E3 && !checked3E3 && !checked4E3) {
                  alert("Por favor, selecione uma opção antes de continuar.");
                } else if (checked2E3 && dietaTexto.trim() === "") {
                  alert("Por favor, especifique sua dieta especial antes de continuar.");
                } else {
                  setEtapa(4);
                }
              }}
              activeOpacity={0.8}
            >
              <EscalarText style={styles.buttonText}>Próximo</EscalarText>
            </EscalarTouchable>
          </View>
        </View>
      )}


{etapa === 4 && (
  <View style={styles.form}>
    <EscalarText style={styles.title}>Você possui algum diagnóstico importante?</EscalarText>

<View style={styles.inputContainer}>
  <EscalarText style={styles.inputLabel}>Adicione seu diagnóstico:</EscalarText>
  <View style={styles.inputRow}>
    <TextInput
      style={styles.textInput}
      placeholder="Exemplo: Diabetes, Hipertensão..."
      value={diagnosTexto}
      onChangeText={setDiagnosTexto}
      multiline={false}
    />
    <TouchableOpacity
      style={styles.addInsideButton}
      onPress={() => {
        if (diagnosTexto.trim() === "") {
          Alert.alert("Campo vazio", "Digite um diagnóstico antes de adicionar.");
          return;
        }
        setDiagnosticos((prev) => [...prev, diagnosTexto.trim()]);
        setDiagnosTexto("");
      }}
    >
      <Text style={styles.addInsideButtonText}>Adicionar</Text>
    </TouchableOpacity>
  </View>

  {diagnosticos.length > 0 && (
    <View style={styles.listContainer}>
      {diagnosticos.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <EscalarText style={styles.listText}>{item}</EscalarText>
          <TouchableOpacity
            onPress={() =>
              setDiagnosticos((prev) => prev.filter((_, i) => i !== index))
            }
          >
            <Ionicons name="close-circle" size={28} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )}
</View>

<View style={styles.inputContainer}>
  <EscalarText style={styles.inputLabel}>Adicione sua alergia:</EscalarText>
  <View style={styles.inputRow}>
    <TextInput
      style={styles.textInput}
      placeholder="Exemplo: Amendoim, lactose..."
      value={alergiaTexto}
      onChangeText={setAlergiaTexto}
      multiline={false}
    />
    <TouchableOpacity
      style={styles.addInsideButton}
      onPress={() => {
        if (alergiaTexto.trim() === "") {
          Alert.alert("Campo vazio", "Digite uma alergia antes de adicionar.");
          return;
        }
        setAlergias((prev) => [...prev, alergiaTexto.trim()]);
        setAlergiaTexto("");
      }}
    >
      <Text style={styles.addInsideButtonText}>Adicionar</Text>
    </TouchableOpacity>
  </View>

  {alergias.length > 0 && (
    <View style={styles.listContainer}>
      {alergias.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <EscalarText style={styles.listText}>{item}</EscalarText>
          <TouchableOpacity
            onPress={() =>
              setAlergias((prev) => prev.filter((_, i) => i !== index))
            }
          >
            <Ionicons name="close-circle" size={28} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )}
</View>


    <View style={styles.botoes}>
      <EscalarTouchable
        style={[
          styles.bFoto,
          alergias.length === 0 && diagnosticos.length === 0 && { opacity: 0.5 },
        ]}
        onPress={() => {
          if (alergias.length > 0 || diagnosticos.length > 0) {
            setEtapa(5);
          } else {
            Alert.alert("Atenção", "Adicione pelo menos uma informação antes de continuar.");
          }
        }}
        activeOpacity={0.8}
      >
        <EscalarText style={styles.buttonText}>Próximo</EscalarText>
      </EscalarTouchable>
    </View>
  </View>
)}

      {etapa === 5 && (
        <View style={styles.form}>
          <EscalarText style={styles.title}>Necessita de supervisão e/ou administração de medicamentos?</EscalarText>

            <View style={styles.checkboxContainer}>
              {[
                { 
                  label: "Medicamentos", 
                  checked: checked1E5, 
                  setChecked: setChecked1E5,
                  image: require("../../assets/images/remedio.png"),
                },
                { 
                  label: "Supervisão", 
                  checked: checked2E5, 
                  setChecked: setChecked2E5,
                  image: require("../../assets/images/supervisao.png"),
                },
                {
                  label: "Nenhum dos anteriores", 
                  checked: checked3E5, 
                  setChecked: setChecked3E5,
                  image: require("../../assets/images/nenhum.png"),
                },
              ].map((item, i) => (
                <EscalarTouchable
                  key={i}
                  style={[
                    styles.checkboxBox,
                    item.checked && styles.checkboxBoxSelecionado,
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
                <View style={styles.imageContainer}>
                    <EscalarImage source={item.image} style={styles.optionImage} resizeMode="contain" />
                </View>

                    <EscalarText style={styles.checkOpicoes}>{item.label}</EscalarText>
               
                  </View>
                </EscalarTouchable>
              ))}
            </View>


            <View style={styles.botoes}>
              <EscalarTouchable
                style={[
                  styles.bFoto,
                  !(checked1E5 || checked2E5 || checked3E5) && { opacity: 0.5 }, // visualmente desativa
                ]}
                onPress={() => {
                  if (checked1E5 || checked2E5 || checked3E5) {
                    setEtapa(6);
                  } else {
                    alert("Por favor, selecione uma opção antes de continuar.");
                  }
                }}
                activeOpacity={0.8}
                disabled={!(checked1E2 || checked2E2 || checked3E2 || checked4E2 || checked5E2)} // bloqueia o toque
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
  paddingTop: Platform.OS === "ios" ? 60 : 35, 
  paddingBottom: 15, 
  paddingHorizontal: 20, 
  flexDirection: "row", 
  justifyContent: "space-between", 
  alignItems: "center", 
  backgroundColor: colors.azul,
},
  navTitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: colors.preto 
  },
  form: { 
    width: "100%", 
    alignItems: "center", 
    marginTop: 40 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
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
  optionImage: {
    width: 90,
    height: 90,
    marginLeft: 10, 
},
imageContainer: {
  width: 50, 
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible', 
  marginRight: 10,
},
checkboxBoxSelecionado: {
  backgroundColor: "#E0F2FF", 
  borderColor: colors.azul,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},
dietaContainer: {
  width: "100%",
  marginTop: 8,
  marginBottom: 12,
  paddingHorizontal: 15,
},
dietaLabel: {
  fontSize: 18,
  color: colors.preto,
  marginBottom: 6,
},
dietaInput: {
  borderWidth: 1.5,
  borderColor: colors.azul,
  borderRadius: 10,
  padding: 10,
  minHeight: 60,
  textAlignVertical: "top",
  backgroundColor: "#FFF",
  fontSize: 16,
  color: colors.preto,
},
inputContainer: {
  width: "90%",
  marginBottom: 25,
},
inputLabel: {
  fontSize: 18,
  fontWeight: "600",
  marginBottom: 8,
  color: colors.preto,
},
inputRow: {
  flexDirection: "row",
  alignItems: "center",
},
textInput: {
  flex: 1,
  borderWidth: 1.5,
  borderColor: colors.azul,
  borderRadius: 10,
  paddingHorizontal: 10,
  height: 45,
  backgroundColor: "#FFF",
  fontSize: 16,
  color: colors.preto,
  textAlignVertical: 'center'
},
addInsideButton: {
  backgroundColor: colors.azul,
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  marginLeft: -10, // sobrepõe a borda do input
},
addInsideButtonText: {
  color: colors.preto,
  fontWeight: "600",
  fontSize: 18,
},
textInput: {
  flex: 1,
  borderWidth: 1.5,
  borderColor: colors.azul,
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
  paddingHorizontal: 10,
  height: 45,
  backgroundColor: "#FFF",
  fontSize: 16,
  color: colors.preto,
  textAlignVertical: 'center'
},

listContainer: {
  alignSelf: "center",
  marginTop: 10,
  width: "85%",
},
listItem: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.azul,
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  marginBottom: 6,
},
listText: {
  fontSize: 16,
  color: colors.preto,
},

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
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
