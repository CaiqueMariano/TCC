import React, { useState, useEffect, useRef } from "react";
import {View,Text,TextInput,TouchableOpacity,FlatList,Image,Platform,StyleSheet,Animated,Keyboard,TouchableWithoutFeedback,SafeAreaView,} from "react-native";
import colors from "./colors";
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useAccessibility } from "./AccessibilityContext";

export default function Conversas({ navigation }) {
  const { scale } = useAccessibility();
  const [gravando, setGravando] = useState(null);
  const [gravacao, setGravacao] = useState(null);
  const [somPrevia, setSomPrevia] = useState(null);
  const [ouvindoPrevia, setOuvindoPrevia] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([
    { id: "1", texto: "Oi Sr. Véio! Tudo bem hoje?", remetente: "cuidador" },
    { id: "2", texto: "Oi, nao. Obrigado!", remetente: "idoso" },
  ]);

  //IMAGEEEM
  const escolherImagem = async () => {

  // Pede permissão
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Permissão para acessar a galeria negada!");
    return;
  }

  // Abre a galeria
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [8, 8],
    quality: 1,
  });

  // Se o veio não cancelou
  if (!result.canceled) {
    const uri = result.assets[0].uri;
    const novaMsg = {
      id: Date.now().toString(),
      tipo: "imagem",
      imagemUri: uri,
      remetente: "idoso",
    };
    setConversa((prev) => [...prev, novaMsg]);
  }
};

    //AUDIOO
  useEffect(() => {
    const pedirPermissao = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") alert("Permissão de microfone negada!");
    };
    pedirPermissao();
  }, []);

  const enviarMensagem = () => {
    if (mensagem.trim() === "") return;
    const novaMsg = {
      id: Date.now().toString(),
      texto: mensagem,
      tipo: "texto",
      remetente: "idoso",
    };
    setConversa((prev) => [...prev, novaMsg]);
    setMensagem("");
  };

  const iniciarGravacao = async () => {
    try {
      console.log("Iniciando gravação");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setGravando(recording);
    } catch (error) {
      console.log("Erro ao iniciar gravação:", error);
    }
  };

  const pararGravacao = async () => {
    try {
      console.log("Parando gravação...");
      await gravando.stopAndUnloadAsync();
      const uri = gravando.getURI();
      setGravando(null);
      setGravacao(uri);

      const novaMsg = {
        id: Date.now().toString(),
        tipo: "audio",
        audioUri: uri,
        remetente: "idoso",
      };
      setConversa((prev) => [...prev, novaMsg]);
    } catch (error) {
      console.log("Erro ao parar gravação:", error);
    }
  };

  const tocarAudio = async (uri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.log("Erro ao tocar áudio:", error);
    }
  };

  const alternarGravacao = () => {
    if (gravando) pararGravacao();
    else iniciarGravacao();
  };

  //ESCUTAR ANTES DE MANDAR
  const tocarPrevia = async () => {
    if (!gravacao) return;

    if (somPrevia) {
      await somPrevia.stopAsync();
      await somPrevia.unloadAsync();
      setSomPrevia(null);
      setOuvindoPrevia(false);
      return;
    }

  //ENVIAR OU CANCELAR GRAVACAO
  const { sound } = await Audio.Sound.createAsync({ uri: gravacao });
    setSomPrevia(sound);
    setOuvindoPrevia(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setOuvindoPrevia(false);
        setSomPrevia(null);
      }
    });

    await sound.playAsync();
  };

const enviarGravacao = () => {
  if (!gravacao) return;
  const novaMsg = {
    id: Date.now().toString(),
    tipo: "audio",
    audioUri: gravacao,
    remetente: "idoso",
  };
  setConversa((prev) => [...prev, novaMsg]);
  setGravacao(null);
};

const cancelarGravacao = () => {
  setGravacao(null);
};

//se o TECLADOO abre ou fecha e animacao dele

const keyboardHeight = useRef(new Animated.Value(0)).current; //guarda o valor da altura pra  mover o input cima e naixo

    // antes do teclado abrir ou fechar

  useEffect(() => {
    const mostraTeclado = Keyboard.addListener("keyboardWillShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height, // muda o valor pra altura do teclado (do input - o campo de msh)
        duration: 250, // tempo da animação 
        useNativeDriver: false, //pq isso aqui nao ia deixa animar o layout
      }).start();
    });

    const escondeTeclado = Keyboard.addListener("keyboardWillHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    //depois de abrir ou fechar - pq senao fivaca uma vaco entre o campo e o chao do cell

    const mostraTeclado2 = Keyboard.addListener("keyboardDidShow", (e) => {
      Animated.timing(keyboardHeight, {
        toValue: e.endCoordinates.height, 
        duration: 250,  
        useNativeDriver: false,
      }).start();
    });

    const escondeTeclado2 = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      mostraTeclado.remove();
      escondeTeclado.remove();
      mostraTeclado2.remove();
      escondeTeclado2.remove();
    };
  }, []);

    return (
      <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>

                <View style={styles.nav}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28 * scale} color="#202020" />
                  </TouchableOpacity>
                  <View style={styles.navInfo}>
                    <Image
                      source={require("../../assets/images/perfil.png")}
                      style={styles.perfilFree}
                    />
                    <Text style={styles.freeNome}>Maria Silva</Text>
                  </View>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24 * scale}
                    color="#202020"
                  />
                </View>
                
                <FlatList
                  data={conversa}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.msgContainer,
                        item.remetente === "idoso" ? styles.msgIdoso : styles.msgCuidador,
                      ]}
                    >
                      {item.tipo === "audio" ? (
                        <TouchableOpacity onPress={() => tocarAudio(item.audioUri)}>
                          <Ionicons name="play-circle" size={32 * scale} color="#fff" />
                        </TouchableOpacity>
                      ) : item.tipo === "imagem" ? (
                        <Image
                          source={{ uri: item.imagemUri }}
                          style={{ width: 180, height: 180, borderRadius: 12 }}
                        />
                      ) : (
                        <Text style={styles.msgTexto}>{item.texto}</Text>
                      )}
                    </View>
                  )}
                  contentContainerStyle={{ padding: 12 }}
                  showsVerticalScrollIndicator={false}
                />

                {gravacao && (
                  <View style={styles.previaContainer}>
                    <TouchableOpacity onPress={cancelarGravacao}>
                      <Ionicons name="trash-outline" size={32 * scale} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={tocarPrevia}>
                      <Ionicons
                        name={ouvindoPrevia ? "pause-circle" : "play-circle"}
                        size={54 * scale}
                        color={colors.azul}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={enviarGravacao}>
                      <Ionicons name="send" size={32 * scale} color={colors.azul} />
                    </TouchableOpacity>
                  </View>
                )}

                <Animated.View style={[styles.inputContainer, { marginBottom: keyboardHeight }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor="#202020"
                    value={mensagem}
                    onChangeText={setMensagem}
                    multiline
                  />

                  <TouchableOpacity style={styles.iconButton}  onPress={escolherImagem}>
                    <Ionicons name="image-outline" size={26 * scale} color="#202020" />
                  </TouchableOpacity>

                  {mensagem.trim() === "" ? (
                    <TouchableOpacity
                      style={styles.enviarButton}
                      onPress={gravando ? pararGravacao : iniciarGravacao}
                    >
                      <Ionicons
                        name={gravando ? "stop-circle-outline" : "mic"}
                        size={24 * scale}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.enviarButton} onPress={enviarMensagem}>
                      <Ionicons name="send" size={24 * scale} color="#fff" />
                    </TouchableOpacity>
                  )}
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  previaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.branco,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.branco,
    padding: 15,
    paddingTop: 40,
    elevation: 3,
  },
  navInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  perfilFree: {
    width: 52,
    height: 52,
    borderRadius: 21,
  },
  freeNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.preto,
  },
  msgContainer: {
    maxWidth: "80%",
    borderRadius: 18,
    padding: 10,
    marginVertical: 5,
  },
  msgIdoso: {
    backgroundColor: colors.azul,
    alignSelf: "flex-end",
  },
  msgCuidador: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  msgTexto: {
    fontSize: 18,
    color: colors.preto,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: colors.branco,
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  input: {
    flex: 1,
    fontSize: 18,
    maxHeight: 120,
    paddingHorizontal: 10,
    color: colors.preto,
    marginBottom: 40,
  },
  iconButton: {
    paddingHorizontal: 6,
    marginBottom: 50,
  },
  enviarButton: {
    backgroundColor: colors.azul,
    padding: 10,
    borderRadius: 30,
    marginLeft: 4,
    marginBottom: 45,
  },
});
