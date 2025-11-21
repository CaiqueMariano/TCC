import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions,Alert, Image, ScrollView, DevSettings } from "react-native";
import colors from "./colors";
import { TextInput } from "react-native";
import axios from "axios";
import { API_URL } from "./link";
import { UserContext } from "./userContext";
import { EscalarText, EscalarTouchable, EscalarImage, useAccessibility } from './AccessibilityContext';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import Home from './Home';

const { width, height } = Dimensions.get("window");

export default function PerguntasC ({ navigation }) {
  const { user } = useContext(UserContext);
  const [etapa, setEtapa] = useState(1);
  const totalEtapas = 7;

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

  //etapa 6
 const [cog1, setCog1] = useState(false);
const [cog2, setCog2] = useState(false);
const [cog3, setCog3] = useState(false);
const [cog4, setCog4] = useState(false);
const [cog5, setCog5] = useState(false);

  //etapa 7
const [emo1, setEmo1] = useState(false);
const [emo2, setEmo2] = useState(false);
const [emo3, setEmo3] = useState(false);
const [emo4, setEmo4] = useState(false);
const [emo5, setEmo5] = useState(false);


  //etapa 8
  const [ComportamentoTexto, setComportamentoTexto] = useState("");
  const [Comportamento, setComportamento] = useState([]);
const [checked1E8, setChecked1E8] = useState(false);
const [checked2E8, setChecked2E8] = useState(false);
const [checked3E8, setChecked3E8] = useState(false);


const enviarRespostas = async () =>{
  const respostasHigiene = [];

if (checked1E2) respostasHigiene.push("Preciso de ajuda com banho e higiene");
if (checked2E2) respostasHigiene.push("Uso e preciso de fralda trocada");
if (checked3E2) respostasHigiene.push("Uso sonda");
if (checked4E2) respostasHigiene.push("Preciso de ajuda no banheiro");
if (checked5E2) respostasHigiene.push("Nenhum dos anteriores");

const rAutonomia = [];
if (checked1) rAutonomia.push("Eu ando sozinho");
if (checked2) rAutonomia.push("Uso cadeira de rodas");
if (checked3) rAutonomia.push("Uso andador/bengala");
if (checked4) rAutonomia.push("Estou acamado");

const rAlimentacao = [];
if (checked1E3) rAlimentacao.push("Eu como sozinho");
if (checked2E3) rAlimentacao.push("Preciso de uma dieta especial");
if (checked3E3) rAlimentacao.push("Tenho dificuldade de engolir");
if (checked4E3) rAlimentacao.push("Preciso que me ajudem a comer");

const rMedicamentos = [];
if (checked1E5) rMedicamentos.push("Medicamentos");
if (checked2E5) rMedicamentos.push("Supervisão");
if (checked3E5) rMedicamentos.push("Nenhum dos anteriores");


if (checked1E8) Comportamento.push("Tenho tendência a me perder");
if (checked2E8) Comportamento.push("Costumo resiustir a banho");
if (checked3E8) Comportamento.push("Nenhum dos anteriores");

const rCognitivo = [];
if (cog1) rCognitivo.push("Lúcido");
if (cog2) rCognitivo.push("Confuso");
if (cog3) rCognitivo.push("Demência leve");
if (cog4) rCognitivo.push("Demência moderada");
if (cog5) rCognitivo.push("Demência serevera");

const rEmocional = [];
if (emo1) rEmocional.push("Deprimido");
if (emo2) rEmocional.push("Ansioso");
if (emo3) rEmocional.push("Tranquilo");
if (emo4) rEmocional.push("Comunicativo");
if (emo5) rEmocional.push("Agressivo");

console.log(alergias);
console.log(diagnosticos);

axios.post(`${API_URL}/api/perguntas`,{
  idUsuario:user.idUsuario,
  autonomia: rAutonomia,
  higiene: respostasHigiene,
  medicamentos: rMedicamentos,
  cognicao: rCognitivo,
  alimentacao: rAlimentacao,
  dietaTexto,
  alergias: alergias,
  doencas: diagnosticos,
  comportamento: Comportamento, 
  emocional:rEmocional
}).catch(error => {
  if (error.response) {
    // Erro vindo do backend (status 400, 500, etc.)
    console.log("ERRO DO SERVIDOR:", error.response.data);
  } else if (error.request) {
    // Não chegou resposta (servidor offline, bloqueio de rede...)
    console.log("ERRO DE REDE:", error.request);
  } else {
    // Erro interno do axios ou do código
    console.log("ERRO AXIOS/CÓDIGO:", error.message);
  }
});


};

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
  {etapa === 6 && (
  <View style={styles.form}>
    <EscalarText style={styles.title}>Como se encontra seu estado cognitivo?</EscalarText>

    <View style={styles.checkboxContainer}>
      {[
        { label: "Lúcido", checked: cog1, setChecked: setCog1,},
        { label: "Confuso", checked: cog2, setChecked: setCog2,},
        { label: "Demência leve", checked: cog3, setChecked: setCog3,},
        { label: "Demência moderada", checked: cog4, setChecked: setCog4,},
        { label: "Demência severa", checked: cog5, setChecked: setCog5,},
      ].map((item, i) => (
        <EscalarTouchable
          key={i}
          style={[
            styles.checkboxBox,
            item.checked && styles.checkboxBoxSelecionado,
          ]}
          onPress={() => {
            setCog1(false); setCog2(false); setCog3(false); setCog4(false); setCog5(false);
            item.setChecked(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.checkboxes}>
            <Checkbox
              status={item.checked ? "checked" : "unchecked"}
              color={colors.azul}
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
        style={[styles.bFoto, !(cog1 || cog2 || cog3 || cog4 || cog5) && { opacity: 0.5 }]}
        onPress={() => {
          if (cog1 || cog2 || cog3 || cog4 || cog5) setEtapa(7);
          else alert("Por favor, selecione uma opção antes de continuar.");
        }}
      >
        <EscalarText style={styles.buttonText}>Próximo</EscalarText>
      </EscalarTouchable>
    </View>
  </View>
)}
{etapa === 7 && (
  <View style={styles.form}>
    <EscalarText style={styles.title}>Como se encontra seu estado emocional?</EscalarText>

    <View style={styles.checkboxContainer}>
      {[
        { label: "Deprimido", checked: emo1, setChecked: setEmo1, },
        { label: "Ansioso", checked: emo2, setChecked: setEmo2, },
        { label: "Tranquilo", checked: emo3, setChecked: setEmo3,},
        { label: "Comunicativo", checked: emo4, setChecked: setEmo4, },
        { label: "Agressivo", checked: emo5, setChecked: setEmo5,},
      ].map((item, i) => (
        <EscalarTouchable
          key={i}
          style={[
            styles.checkboxBox,
            item.checked && styles.checkboxBoxSelecionado,
          ]}
          onPress={() => {
            setEmo1(false); setEmo2(false); setEmo3(false); setEmo4(false); setEmo5(false);
            item.setChecked(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.checkboxes}>
            <Checkbox
              status={item.checked ? "checked" : "unchecked"}
              color={colors.azul}
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
        style={[styles.bFoto, !(emo1 || emo2 || emo3 || emo4 || emo5) && { opacity: 0.5 }]}
        onPress={() => {
          if (emo1 || emo2 || emo3 || emo4 || emo5) setEtapa(8);
          else alert("Por favor, selecione uma opção antes de continuar.");
        }}
      >
        <EscalarText style={styles.buttonText}>Próximo</EscalarText>
      </EscalarTouchable>
    </View>
  </View>
)}
{etapa === 8 && (
  <View style={styles.form}>
    <EscalarText style={styles.title}>
      Você possui alguns comportamentos importantes?
    </EscalarText>

    {/* Opções fixas com checkbox */}
    <View style={styles.checkboxContainer}>
      {[
        { 
          label: "Tenho tendência a me perder", 
          checked: checked1E8, 
          setChecked: setChecked1E8,
          image: require("../../assets/images/meperde.png"),
        },
        { 
          label: "Costumo a resistir ao banho", 
          checked: checked2E8, 
          setChecked: setChecked2E8,
          image: require("../../assets/images/banho2.png"),
        },
        {
          label: "Nenhum dos anteriores", 
          checked: checked3E8, 
          setChecked: setChecked3E8,
          image: require("../../assets/images/nenhum.png"),
        },
      ].map((item, i) => (
        <EscalarTouchable
          key={i}
          style={[
            styles.checkboxBox,
            item.checked && styles.checkboxBoxSelecionado,
          ]}
          onPress={() => {
            // Lógica de exclusividade do “Nenhum dos anteriores”
            if (item.label === "Nenhum dos anteriores") {
              setChecked1E8(false);
              setChecked2E8(false);
              setComportamento([]); // limpa comportamentos personalizados
            } else {
              setChecked3E8(false);
            }
            item.setChecked(!item.checked);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.checkboxes}>
            <Checkbox
              status={item.checked ? "checked" : "unchecked"}
              color={colors.azul}
              onPress={() => {
                if (item.label === "Nenhum dos anteriores") {
                  setChecked1E8(false);
                  setChecked2E8(false);
                  setComportamento([]);
                } else {
                  setChecked3E8(false);
                }
                item.setChecked(!item.checked);
              }}
            />
            <View style={styles.imageContainer}>
              <EscalarImage
                source={item.image}
                style={styles.optionImage}
                resizeMode="contain"
              />
            </View>
            <EscalarText style={styles.checkOpicoes}>
              {item.label}
            </EscalarText>
          </View>
        </EscalarTouchable>
      ))}
    </View>

    {/* Campo para adicionar novos comportamentos */}
    <View style={styles.inputContainer}>
      <EscalarText style={styles.inputLabel}>
        Adicione outro comportamento:
      </EscalarText>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Exemplo: fico agitado quando..."
          value={ComportamentoTexto}
          onChangeText={setComportamentoTexto}
          multiline={false}
        />
        <TouchableOpacity
          style={styles.addInsideButton}
          onPress={() => {
            if (ComportamentoTexto.trim() === "") {
              Alert.alert(
                "Campo vazio",
                "Digite um comportamento antes de adicionar."
              );
              return;
            }
            // Se o usuário adicionar um comportamento, desmarca “Nenhum dos anteriores”
            setChecked3E8(false);
            setComportamento((prev) => [...prev, ComportamentoTexto.trim()]);
            setComportamentoTexto("");
          }}
        >
          <Text style={styles.addInsideButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de comportamentos adicionados */}
      {Comportamento.length > 0 && (
        <View style={styles.listContainer}>
          {Comportamento.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <EscalarText style={styles.listText}>{item}</EscalarText>
              <TouchableOpacity
                onPress={() =>
                  setComportamento((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              >
                <Ionicons name="close-circle" size={28} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>

    {/* Botão Próximo */}
    <View style={styles.botoes}>
      <EscalarTouchable
        style={[
          styles.bFoto,
          !(checked1E8 || checked2E8 || checked3E8 || Comportamento.length > 0) && { opacity: 0.5 },
        ]}
        onPress={() => {
          if (checked1E8 || checked2E8 || checked3E8 || Comportamento.length > 0) {
            setEtapa(9);
          } else {
            Alert.alert(
              "Selecione ou adicione algo",
              "Por favor, marque ou adicione um comportamento antes de continuar."
            );
          }
        }}
        activeOpacity={0.8}
        disabled={!(checked1E8 || checked2E8 || checked3E8 || Comportamento.length > 0)}
      >
        <EscalarText style={styles.buttonText}>Próximo</EscalarText>
      </EscalarTouchable>
    </View>
  </View>
  
)}
{etapa === 9 && (
  <ScrollView contentContainerStyle={{alignItems:"center", justifyContent:"center", paddingBottom:40}}>
    <View style={styles.form}>
      <EscalarImage
        source={require("../../assets/images/final.png")}
        style={styles.finalImage}
      />

      <EscalarText style={styles.finalText}>
        As perguntas acabaram! {"\n"}Obrigado pela sua paciência.
      </EscalarText>

      <EscalarTouchable
        style={styles.finalButton}
        onPress={()=> enviarRespostas()}
      >
        <EscalarText style={styles.finalButtonText}>Finalizar</EscalarText>
      </EscalarTouchable>
    </View>
  </ScrollView>
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
cognitivoContainer: {
  backgroundColor: "#B9EAE4", // azul-claro como no protótipo
  padding: 15,
  borderRadius: 20,
  width: "85%",
  alignItems: "center",
},
cognitivoBox: {
  width: "100%",
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 25,
  backgroundColor: colors.branco,
  paddingVertical: 10,
  paddingHorizontal: 15,
  marginBottom: 15,
},
cognitivoBoxSelecionado: {
  backgroundColor: "#DDF7F3",
  borderColor: colors.azul,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},
cognitivoOpcoes: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
cognitivoTexto: {
  fontSize: 18,
  color: colors.preto,
  flex: 1,
  textAlign: "left",
},
emocionalContainer: {
  backgroundColor: "#B9EAE4", // mesmo tom azul do protótipo
  padding: 20,
  borderRadius: 20,
  width: "85%",
  alignItems: "center",
},
emocionalBox: {
  width: "100%",
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 25,
  backgroundColor: colors.branco,
  paddingVertical: 10,
  paddingHorizontal: 15,
  marginBottom: 15,
},
emocionalBoxSelecionado: {
  backgroundColor: "#DDF7F3",
  borderColor: colors.azul,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},
emocionalOpcoes: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
emocionalTexto: {
  fontSize: 18,
  color: colors.preto,
  flex: 1,
  textAlign: "left",
},

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
  finalImage: {
  width: 260,
  height: 200,
  alignSelf: "center",
  marginBottom: 20,
},

finalText: {
  textAlign: "center",
  fontSize: 25,
  color: colors.azulEscuro,
  marginVertical: 20,
},

finalButton: {
  backgroundColor: colors.azul,
  borderColor: colors.azulEscuro,
  borderWidth: 1,
  borderRadius: 15,
  paddingVertical: 10,
  paddingHorizontal: 100,
  alignSelf: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
},

finalButtonText: {
  color: colors.azulEscuro,
  fontSize: 18,
  textAlign: "center",
},

headerContainer: {
  backgroundColor: colors.verdeClaro,
  paddingVertical: 10,
  alignItems: "center",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
},

contentContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
},
});