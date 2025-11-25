import React, { useState, useEffect, useRef, useContext } from "react";
import {View,Text,TextInput,TouchableOpacity,FlatList,Image,Platform,StyleSheet,Modal,Animated,Keyboard,TouchableWithoutFeedback,SafeAreaView, ScrollView} from "react-native";
import axios from "axios";
import { API_URL } from "./link";
import { UserContext } from "./userContext";
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import { useAccessibility } from "./AccessibilityContext";
import * as Notifications from 'expo-notifications';
export default function Conversas({ navigation, route }) {
  const{converSelecionada} = route.params;
  const conversaInfo = Array.isArray(converSelecionada) 
  ? converSelecionada[0] 
  : converSelecionada;
  const {user} = useContext(UserContext);
  const { scale } = useAccessibility();
  const [gravando, setGravando] = useState(null);  
const [gravacaoURI, setGravacaoURI] = useState(null); 
  const [somPrevia, setSomPrevia] = useState(null);
  const [audioTocandoId, setAudioTocandoId] = useState(null);
  const [mostrarEdicao, setMostrarEdicao] = useState(false);
  const [somAtual, setSomAtual] = useState(null);
  const [modalAlterarServico, setModalAlterarServico] = useState(false);
  const [valorProposta, setValorProposta] = useState({});
  const [itemSelecionado, setItemSelecionado] = useState([]);
  const [nomeServico, setNomeServico] = useState("");
  const [dataServico, setDataServico] = useState("");
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [descServico, setDescServico] = useState("");
  const [horaInicioServico, setHoraInicioServico] = useState("");
  const [horaTerminoServico, setHoraTerminoServico] = useState("");
  const [servicoSelecionado, setServicoSelecionado] = useState([]);
  const [modalVer, setModalVer] = useState(false);
  const [ouvindoPrevia, setOuvindoPrevia] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([]);
  const [servicos, setServicos] = useState([]);
  const progressoAudio = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    servicos.forEach((s) => {
      if (s.statusServico === "aceito") {
        enviarNotificacao();
      }
    });
  }, [servicos]);
  async function enviarNotificacao() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Proposta Aceita!",
        body: "Clique para ver os detalhes",
        data: {
          tela: "Contratos",  
        }
      },
      trigger: null
    });
  }
  const precoParaBackend = (valor) => {
    if (!valor) return 0;
  
    // Remove tudo que não é número
    let numeros = valor.replace(/\D/g, "");
  
    // Converte para decimal
    let convertido = (Number(numeros) / 100).toFixed(2);
  
    return convertido; // "12.50"
  };
const formatarPreco = (valor) => {
 
  let numeros = valor.replace(/\D/g, "");


  if (numeros.length === 0) return "";

 
  let valorFormatado = (Number(numeros) / 100).toFixed(2);

  return valorFormatado.replace(".", ",");
};
  const formatarHora = (date) => {
    const hora = date.getHours().toString().padStart(2, "0");
    const minuto = date.getMinutes().toString().padStart(2, "0");
    return `${hora}:${minuto}`;
  };

  const abrirTimePicker = (setHorario) => {
    if (Platform.OS === "web") {
      const hora = prompt("Digite o horário (hh:mm):");
      if (hora) setHorario(hora);
    } else {
      DateTimePickerAndroid.open({
        value: new Date(),
        mode: "time",
        is24Hour: true,
        onChange: (event, selectedDate) => {
          if (selectedDate) setHorario(formatarHora(selectedDate));
        },
      });
    }
  };
  const verServico = async()=>{
    axios.get(`${API_URL}/api/verServico/${converSelecionada.idConversa}`)
    .then(response =>{
      setServicos(response.data.data)
      
    })
  }

  useEffect(() => {

    verServico();


  }, []);
  

  const pegarMensagens = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/getMensagens/${converSelecionada.idConversa}`);
      setConversa(response.data.mensagens);
    } catch (error) {
    }
  };

  useEffect(() => {
    
    const interval = setInterval(() => {

      verServico();
      //console.log(itemSelecionado);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    
    pegarMensagens();

    const interval = setInterval(() => {
      pegarMensagens();
      //console.log(itemSelecionado);
    }, 10000); 
    return () => clearInterval(interval);
   
  }, []);
  //IMAGEEEM



  const cancelarGravacao = () => {
    setGravacaoURI(null);
  };
  const escolherDaGaleria = async () => {

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (resultado.canceled) return;
  
    const uri = resultado.assets[0].uri; 
  
    const formData = new FormData();
    formData.append("idConversa", converSelecionada.idConversa);
    formData.append("remententeConversa", "profissional");
    formData.append("tipoMensagens", "imagem");
  
    const filename = uri.split('/').pop();
    const extension = filename.split('.').pop();
    const type = `image/${extension}`;
  
    formData.append("arquivoMensagens", {
      uri,
      name: filename,
      type,
    });
  
    await axios.post(`${API_URL}/api/mandarMensagem`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    pegarMensagens();
  };

    //AUDIOO
  useEffect(() => {
    const pedirPermissao = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") alert("Permissão de microfone negada!");
    };
    pedirPermissao();
  }, []);

  const enviarMensagem = async () => {
    if (mensagem.trim() === "") return;
 
    
    await axios.post(`${API_URL}/api/mandarMensagem`, {
          idConversa: converSelecionada.idConversa,
          remententeConversa: "cuidador",
          tipoMensagens: "texto",
          conteudoMensagens: mensagem
        });
    

    
   
    
    setMensagem("");
    pegarMensagens();

  };


  const enviarProposta= async (item) => {
 
    
    await axios.post(`${API_URL}/api/enviarproposta`, {
          idProfissional:user.idProfissional,
          idServico:item.idServico,
          precoPersonalizado: precoParaBackend(valorProposta[item.idMensagens]),
          idConversa: converSelecionada.idConversa,
          remententeConversa: "cuidador",
        }).catch(error =>{
          //console.log("Erro:", error.response?.data?.details);
        })
    pegarMensagens();
    setMostrarEdicao(false);

  };

  const enviarServico = async (item) => {
 
    
    await axios.post(`${API_URL}/api/mandarMensagem`, {
          idConversa: converSelecionada.idConversa,
          remententeConversa: "cuidador",
          tipoMensagens: "agendamento",
          idServico: item.idServico
        });
    pegarMensagens();
    setMostrarEdicao(false);

  };

  const iniciarGravacao = async () => {
    try {
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
      if (!gravando) return;
  
      await gravando.stopAndUnloadAsync();
      const uri = gravando.getURI();  
      setGravacaoURI(uri);
      setGravando(null);
  
      console.log("Áudio gravado em:", uri);
  
    } catch (error) {
      console.log("Erro ao parar gravação:", error);
    }
  };
  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
  }, []);

  const tocarAudio = async (uri, id) => {
    try {
      console.log("Tocando:", uri);
  
      
      if (somAtual) {
        await somAtual.stopAsync();
        await somAtual.unloadAsync();
        setSomAtual(null);
      }
  
      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: true }
      );
  
      setSomAtual(sound);
      setAudioTocandoId(id);
  
      
      sound.setOnPlaybackStatusUpdate((status) => {

        if (status.isLoaded && status.durationMillis) {
      
          const progresso = status.positionMillis / status.durationMillis;
      
          progressoAudio.setValue(progresso); 
        }
      
        if (status.didJustFinish) {
          setAudioTocandoId(null);
          setSomAtual(null);
          progressoAudio.setValue(0); 
        }
      });
  
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

  const enviarGravacao = async () => {
    if (!gravacaoURI) return;
  
    const formData = new FormData();
    formData.append("idConversa", converSelecionada.idConversa);
    formData.append("remententeConversa", "cuidador");
    formData.append("tipoMensagens", "audio");
  
    formData.append("arquivoMensagens", {
      uri: gravacaoURI,
      name: "audio.m4a",
      type: "audio/m4a",
    });
  
    await axios.post(`${API_URL}/api/mandarMensagem`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  
    setGravacaoURI(null);
    pegarMensagens();
  };
  const formatarData = (data) => {
    const d = new Date(data);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  const  alterarServico = async() =>{
    axios.put(`${API_URL}/api/updateServico/${servicoSelecionado.idServico}`,{
      nomeServico:nomeServico,
      dataServico:formatarData(dataServico),
      descServico:descServico,
      horaInicioServico:horaInicioServico,
      horaTerminoServico:horaTerminoServico
    }).then(response=>{
      setModalAlterarServico(false);
    }).catch((error) => {
      console.log("Erro:", error.response.data);
     
    });
  }
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
      <View style={styles.container}>


<Modal
          visible={modalAlterarServico}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalAlterarServico(false)}
        >

<View style={styles.modal}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.modalViewF}>

<TouchableOpacity onPress={()=>setModalAlterarServico(false)}>
        <Ionicons name="close-outline" size={30} color={"gray"} style={{position: "absolute",right:10, top:-14}}/>
        </TouchableOpacity>
       
        <Text style={styles.titulo}>Alterar servico:</Text>
       <Text style={styles.tituloF}>Nome:</Text> 
      <TextInput style={styles.inputA}
       placeholder="Digite o novo nome"
       value={nomeServico}
       onChangeText={setNomeServico}
       
      />

    
      <Text style={styles.tituloF}>Descrição:</Text>
    <TextInput style={styles.inputA}
       placeholder="Digite a nova descrição"
       value={descServico}
       multiline={true}
       numberOfLines={5}
       onChangeText={setDescServico}
       
      />
      
    <Text style={styles.tituloF}>Data:</Text>
    <TouchableOpacity
            style={styles.inputA}
            onPress={() => setMostrarCalendario(true)}
          >
            <Text style={{ marginTop: 10, fontSize: 16, marginLeft: 10, marginBottom: 10}}>
              {dataServico ? dataServico.toLocaleDateString() : "Coloque a nova data"}
            </Text>
          </TouchableOpacity>
  <Text style={styles.tituloF}>Hora de Início:</Text>
  <TouchableOpacity style={styles.inputA} onPress={() => abrirTimePicker(setHoraInicioServico)}>
            <Text style={{ marginTop: 10, fontSize: 16, marginLeft: 10, marginBottom: 10}}>{horaInicioServico || "Horário de Início"}</Text>
          </TouchableOpacity>
      <Text style={styles.tituloF}>Hora de Término:</Text>
     
<TouchableOpacity style={styles.inputA} onPress={() => abrirTimePicker(setHoraTerminoServico)}>
            <Text style={{ marginTop: 10, fontSize: 16, marginLeft: 10, marginBottom: 10}}>{horaTerminoServico || "Horário de Término"}</Text>
          </TouchableOpacity>

<View style={styles.botao}>
  <TouchableOpacity
            style={styles.actionButton}
            onPress={()=> alterarServico()}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          </View>


</View>
    </ScrollView>
  </View>

  </Modal>

  {mostrarCalendario && (
            <DateTimePicker
              value={dataServico || new Date()} 
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setMostrarCalendario(false);
                if (event.type === 'set' && selectedDate) {
                  setDataServico(selectedDate);
                }
              }}
            />
          )}


  <Modal
          visible={modalVer}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setmModalVer(false)}
        >

<View style={styles.modal}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.modalView}>

      <TouchableOpacity onPress={()=>setModalVer(false)}>
        <Ionicons name="close-outline" size={30} color={"gray"} style={{position: "absolute",right:10, top:0}}/>
        </TouchableOpacity>

      <Text style={styles.titulo}>Infromações do Pedido:</Text>
      <View style={styles.label}>
            <Text style={styles.labelTextS}>Tippo de Servico: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.nomeServico}</Text>
          </View>

      <View style={styles.label}>
            <Text style={styles.labelTextS}>Descrição: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.descServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelTextS}>Data: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.descServico}</Text>
          </View>
      <View style={styles.label}>
            <Text style={styles.labelTextS}>Horário de Início: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.horaInicioServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelTextS}>Horário de Início: </Text>
            <Text style={styles.infoTextS}>{!itemSelecionado.horaTerminoServico ?("Não informado"): (<Text>{itemSelecionado.horaTerminoServico}</Text>)}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelTextS}>Endereco: </Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Rua: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.ruaUsuario},{itemSelecionado.numLogradouroUsuario}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>CEP: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.cepUsuario}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Cidade: </Text>
            <Text style={styles.infoTextS}>{itemSelecionado.cidadeUsuario}</Text>
          </View>



       
     


</View>
    </ScrollView>
  </View>

  </Modal>

        {/**MODAL SERVICOD */}

        
<Modal
          visible={mostrarEdicao}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarEdicao(false)}
        >

<View style={styles.modal}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.modalView}>

<TouchableOpacity onPress={()=>setMostrarEdicao(false)}>
        <Ionicons name="close-outline" size={30} color={"gray"} style={{position: "absolute",right:10, top:-14}}/>
        </TouchableOpacity>
       
      <Text style={styles.titulo}>Selecione o servico correspondente e envie sua proposta!:</Text>
     
      
      {servicos
            .map((item, index) => {

              const dataServico = new Date(item.dataServico);
              const a = dataServico.getFullYear();
              const m = dataServico.getMonth() + 1;
              const d = dataServico.getDate();
            return (
              <View>
            <TouchableOpacity onPress={()=> enviarServico(item)}>
                <View style={styles.cardG} key={index}>
         
                        <Text style={styles.nomeServico}>{item.nomeServico}</Text>
                        <Text style={styles.data}>{d}/{m}/{a}</Text>
                        
                           
                    
        
                </View>
                </TouchableOpacity>
<TouchableOpacity onPress={()=>{setItemSelecionado(item);setModalVer(true)}}>
        <Text style={styles.detalhes}>Ver Mais</Text>
        </TouchableOpacity>
        </View>
                 );
                })}


    <View style={styles.botoes}></View>


      </View>
    </ScrollView>
  </View>

  </Modal>
           
              <View style={{ flex: 1 }}>

      
                <View style={styles.nav}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28 * scale} color="#202020" />
                  </TouchableOpacity>
                  <View style={styles.navInfo}>
                    <TouchableOpacity onPress={()=> navigation.navigate("Perfil Idoso",{
                      itemSelecionado:converSelecionada
                    })}>
                    <Image
                      source={{uri: `${API_URL}/storage/${converSelecionada.fotoUsuario}`}}
                      style={styles.perfilFree}
                    />
                    </TouchableOpacity>
                    <Text style={styles.freeNome}>{converSelecionada.nomeUsuario}</Text>
                  </View>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24 * scale}
                    color="#202020"
                  />
                  
                </View>

                
                
                <View style={{ flex: 1 }}>
  <FlatList
    data={conversa}
    keyExtractor={(item, index) => `${item.idMensagens}_${index}`}
    
    renderItem={({ item }) => (
      <View
  style={[
    styles.msgContainer,
    item.remententeConversa === "idoso"
      ? styles.msgIdoso
      : styles.msgCuidador,

    item.tipoMensagens === "agendamento" && styles.cardAgendamentoContainer,
    item.tipoMensagens === "proposta" && styles.cardAgendamentoContainer,
    item.tipoMensagens === "servico" && styles.cardAgendamentoContainerS,

    audioTocandoId === item.idMensagens && styles.audioTocando
  ]}
>
{item.tipoMensagens === "audio" ? (
  <View>
    <TouchableOpacity 
      onPress={() => tocarAudio(`${API_URL}/storage/${item.arquivoMensagens}`, item.idMensagens)}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Ionicons name="play-circle" size={32 * scale} color="#fff" />
    </TouchableOpacity>

    {audioTocandoId === item.idMensagens && (
      <Animated.View
        style={{
          height: 4,
          backgroundColor: "#584680",
          
          width: progressoAudio.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "80%"],}),
          borderRadius: 10,
          position:'absolute',
          top:15,
          left: 30
        
        }}
      />
    )}
  </View>
        ) : item.tipoMensagens === "imagem" ? (
          <Image
            source={{ uri: `${API_URL}/storage/${item.arquivoMensagens}` }}
            style={{ width: 180, height: 180, borderRadius: 12 }}
          />
        ): item.tipoMensagens === "agendamento" ? (

          <View  style={styles.cardAgendamento}>

          <Text style={styles.textoContrato}>Informações do agendamento</Text>
          <TouchableOpacity onPress={()=>{ setServicoSelecionado(item);setNomeServico(item.nomeServico);setDescServico(item.descServico);setDataServico(new Date(item.dataServico));setHoraInicioServico(item.horaInicioServico);setHoraTerminoServico(item.horaTerminoServico);setModalAlterarServico(true)}}>
          <Text style={styles.textoContrato2}>Alterar <Ionicons name = "pencil-sharp" size={15}/> </Text>
          </TouchableOpacity>
          <View style={styles.label}>
            <Text style={styles.labelText}>Tipo:</Text>
            <Text style={styles.infoText}>{item.nomeServico}</Text>
          </View>
          
          <View style={styles.label}>
            <Text style={styles.labelText}>Descrição:</Text>
          
          </View>
          <View style={styles.label}>
            <Text style={styles.infoText}>{item.descServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Data: </Text>
            <Text style={styles.infoText}>{item.dataServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Horário Início: </Text>
            <Text style={styles.infoText}>{item.horaInicioServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Horário Término: </Text>
            {(!item.horaTerminoServico || item.horaTerminoServico === "") ? (<Text style={styles.infoText}>Não Especificado</Text>): (<Text style={styles.infoText}>{item.horaTerminoServico}</Text>)}
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Rua: </Text>
            <Text style={styles.infoText}>{item.ruaUsuario}, {item.numLogradouroUsuario}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelText}>Cidade: </Text>
            <Text style={styles.infoText}>{item.cidadeUsuario}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>CEP: </Text>
            <Text style={styles.infoText}>{item.cepUsuario}</Text>
          </View>


          <View style={styles.labelValor}>
            <Text style={styles.labelTextValor}>Valor: R$</Text>
            <TextInput
                    style={styles.inputValor}
                    placeholder="Digite o valor"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    cursorColor="#fff"
                    value={valorProposta[item.idMensagens] || ""}
                    onChangeText={(text) =>
                      setValorProposta((prev) => ({
                        ...prev,
                        [item.idMensagens]: formatarPreco(text),
                      }))
                    }
                    
                  />
          </View>
          <TouchableOpacity style={styles.botaoContrato} onPress={()=> enviarProposta(item)}><Text style={styles.textoBotao}>Enviar proposta</Text></TouchableOpacity>
          </View>
        ) : item.tipoMensagens === "proposta" ? (

          <View  style={styles.cardAgendamento}>

          <Text style={styles.textoContrato}>Informações da Proposta</Text>
          <TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.label}>
            <Text style={styles.labelText}>Tipo:</Text>
            <Text style={styles.infoText}>{item.nomeServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Descrição: </Text>   
          </View>
          <Text style={styles.infoText}>{item.descServico}</Text>
          

          <View style={styles.label}>
            <Text style={styles.labelText}>Data: </Text>
            <Text style={styles.infoText}>{item.dataServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Horário Início: </Text>
            <Text style={styles.infoText}>{item.horaInicioServico}</Text>
          </View>

          <View style={styles.label}>
          <Text style={styles.labelText}>Horário Término: </Text>
          {(!item.horaTerminoServico || item.horaTerminoServico === "") ? (<Text style={styles.infoText}>Não Especificado</Text>): (<Text style={styles.infoText}>{item.horaTerminoServico}</Text>)}
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>Rua: </Text>
            <Text style={styles.infoText}>{item.ruaUsuario}, {item.numLogradouroUsuario}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelText}>Cidade: </Text>
            <Text style={styles.infoText}>{item.cidadeUsuario}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelText}>CEP: </Text>
            <Text style={styles.infoText}>{item.cepUsuario}</Text>
          </View>


          <View style={styles.labelValor}>
            <Text style={styles.labelTextValor}>Valor: R$</Text>
            <Text style={styles.labelTextValor}>{item.precoPersonalizado}</Text>
          </View>
          <TouchableOpacity style={styles.botaoContrato}><Text style={styles.textoBotao}>{item.statusServico === "nAceito" ? ("Aguardando Confirmação"):("Proposta Aceita")}</Text></TouchableOpacity>
          </View>
        ) : item.tipoMensagens === "servico" ? (

          <View  style={styles.cardAgendamento}>

          <Text style={styles.textoContratoS}>Informações do Servico</Text>
          <TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Tipo:</Text>
            <Text style={styles.infoTextS}>{item.nomeServico}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Descrição: </Text>   
          </View>
          <Text style={styles.infoTextS}>{item.descServico}</Text>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Data: </Text>
            <Text style={styles.infoTextS}>{item.dataServico}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelTextS}>Horário Início: </Text>
            <Text style={styles.infoTextS}>{item.horaInicioServico}</Text>
          </View>
          <View style={styles.label}>
          <Text style={styles.labelTextS}>Horário Término: </Text>
          {(!item.horaTerminoServico || item.horaTerminoServico === "") ? (<Text style={styles.infoTextS}>Não Especificado</Text>): (<Text style={styles.infoTextS}>{item.horaTerminoServico}</Text>)}
          </View>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Rua: </Text>
            <Text style={styles.infoTextS}>{item.ruaUsuario}, {item.numLogradouroUsuario}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelTextS}>Cidade: </Text>
            <Text style={styles.infoTextS}>{item.cidadeUsuario}</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.labelTextS}>CEP: </Text>
            <Text style={styles.infoTextS}>{item.cepUsuario}</Text>
          </View>


         
         
          </View>
        ) : (
          <Text style={styles.msgTexto}>{item.conteudoMensagens}</Text>
        )}
      </View>
    )}
    contentContainerStyle={{ padding: 12 }}
    showsVerticalScrollIndicator={false}
  />
</View>

                {gravacaoURI && (
                  <View style={styles.previaContainer}>
                    <TouchableOpacity onPress={cancelarGravacao}>
                      <Ionicons name="trash-outline" size={32 * scale} color="red" />
                    </TouchableOpacity>

              

                    <TouchableOpacity onPress={enviarGravacao}>
                      <Ionicons name="send" size={32 * scale} color={"#b08cff"} />
                    </TouchableOpacity>
                  </View>
                )}
 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[styles.inputContainer, { marginBottom: keyboardHeight }]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor="#202020"
                    value={mensagem}
                    onChangeText={setMensagem}
                    multiline
                  />

                  <TouchableOpacity style={styles.iconButton}  onPress={escolherDaGaleria}>
                    <Ionicons name="image-outline" size={26 * scale} color="#202020" />
                  </TouchableOpacity>


                  
                <TouchableOpacity style={styles.iconButton2} onPress={()=>setMostrarEdicao(true)}>
                    <Ionicons name="newspaper-outline" size={30} color={"#fff"}/>
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
                </TouchableWithoutFeedback>
              </View>


            
          </View>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  cardAgendamento:{
   
    borderRadius:30,

  },

  textoContratoS:{
    marginBottom:10,
    fontWeight:'500'
  },

  labelTextS:{
    fontWeight:'500'
  },

  labelValor:{
    marginTop:20,
    marginBottom:10,
    flexDirection:"row",
  },

  infoTextS:{
    marginBottom:5,
  },

  labelTextValor:{
    marginTop:10,
    color:"#fff",
    fontSize:20,
    marginBottom:10,
  },

  inputValor:{
    color:"#fff",
    fontSize:20,
  },

  labelText:{
    color:"#fff",
    fontWeight:'600',
  },

  infoText:{
    color:"#fff",
    textDecorationLine:"underline",
  },

  cardAgendamentoContainer: {
    width:250,
    backgroundColor: "#b08cff",
    padding: 12,
    borderRadius: 12,
    
  },

  label:{
    marginBottom:10,
    flexDirection:"row"
  },
  botaoContrato:{
    backgroundColor:"#fff",
    borderRadius: 16,
    width:150,
    paddingBottom:8,
    paddingTop:8,
    borderWidth: 2,
   marginBottom:20,
    borderColor: '#fff' ,
  },

  actionButton: {
    marginBottom:20,
    marginRight:10,
    height: 40,
    width: 150,
    borderColor: '#202020', 
    backgroundColor: "#b08cff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },

  textoBotao: {
    color: '#b08cff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },


  textoContrato:{
   
    color: "#fff",
    fontSize:15,
    fontWeight:"600",
  },

  textoContrato2:{
    color: "#fff",
    fontSize:15,
    marginBottom:10,
    fontWeight:"400",
  },
  cardG:{
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#DBDBDB',   
    width:'90%',
    flexDirection: 'column',
  
},

nomeServico:{
  fontSize:18,

},

data:{
  color:"gray",
},

detalhes:{
  fontSize:17,
  color:"gray",
  textDecorationLine:"underline",
  textDecorationColor:"gray",
  position:"absolute",
  bottom:5,
  right:35
},
  modal:{
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
  },
  modalView:{
    paddingTop:20,
    fontSize:20,
    paddingLeft:21,
    marginTop:200,
    backgroundColor: '#fff', 
    width:340,
    borderRadius: 10, 
  },

  titulo:{
    marginTop:17,
    fontSize:18,
    fontWeight:"600",
    color:"#b08cff"
  },

  tituloP:{

    fontSize:18,
    fontWeight:"600",
    color:"#b08cff"
  },


  
  botoes:{
    flexDirection:'row',
    marginBottom:20,
    marginTop:20,
  },

  botaoAcao: {
    borderRadius: 16,
    width:120,
    paddingBottom:8,
    paddingTop:8,
    borderWidth: 2,
    marginLeft:18,
    borderColor: '#b08cff' ,
  },

  previaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },

  audioTocando: {
    width: 200,
    
   
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
    color: "#202020",
  },
  msgContainer: {
    maxWidth: "80%",
    borderRadius: 18,
    padding: 10,
    marginVertical: 5,
  },
  msgIdoso: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },
  msgCuidador: {



    backgroundColor: "#b08cff",
    alignSelf: "flex-end",
  },
  msgTexto: {
    fontSize: 18,
    color: "#202020",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#DDD",
  },
  input: {
    flex: 1,
    fontSize: 18,
    maxHeight: 120,
    paddingHorizontal: 10,
    color: "#202020",
    marginBottom: 40,
  },
  iconButton: {
    paddingHorizontal: 6,
    marginBottom: 50,
  },

  iconButton2: {
    backgroundColor: "#b08cff",
    padding: 7,
    borderRadius: 30,
    marginLeft: 4,
    marginBottom: 45,
    
  },
  enviarButton: {
    backgroundColor: "#b08cff",
    padding: 10,
    borderRadius: 30,
    marginLeft: 4,
    marginBottom: 45,
  },


  informacoes:{
    fontSize:16,
    marginBottom:10,
  },

  textoT:{
    fontWeight:'600',
  },

  tituloF:{
    fontWeight:'600'
  },
  inputA:{
    borderWidth:1,
    borderRadius:10,
    marginBottom:20,
  },

  modalViewF:{
    paddingTop:20,
    fontSize:20,
    paddingLeft:15,
    paddingRight:15,
    marginTop:80,
    backgroundColor: '#fff', 
    width:340,
    borderRadius: 10, 
  },

  buttonText:{
    color:"#fff"
  },

  botao:{
    alignItems:'center'
  }

});
