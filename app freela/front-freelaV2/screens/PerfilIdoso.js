import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  
  TouchableOpacity,
  Animated,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from './link';
import axios from 'axios';
const ABAS = [
  { chave: 'saude', titulo: 'Feedbacks' },
  { chave: 'cognitivo', titulo: 'Saúde' },
];

export default function PerfilIdoso({ navigation, route }) {
  const { itemSelecionado } = route.params;
  const [abaAtiva, definirAbaAtiva] = useState(0);
  const dataNasc = new Date(itemSelecionado.dataNasc);
  const dataAtual = new Date();
  const anos =   dataAtual.getFullYear() - dataNasc.getFullYear() ;
  const indicador = useRef(new Animated.Value(0)).current;
  const [modalDenuncia, setModalDenuncia] = useState(false);
  //const [modalConfirmar, setModalConfirmar] = useState(false);
  const { width } = Dimensions.get('window');
  const larguraAba = width / ABAS.length;

  const [questionarioInfo, setQuestionarioinfo] = useState([])
  const [alimentacao, setAlimentacao] = useState([]);
  const [diagnostico, setDiagnostico] = useState([]);
  const [motivo, setMotivo] = useState("");
  const [desc, setDesc] = useState("");
  const [evidencia, setEvidencia] = useState("");
  const [autonomia, setAutonomia] = useState([]);
  const [cognicao, setCognicao] = useState([]);
  const [comportamento, setComportamento] = useState([]);
  const [emocional, setEmocional] = useState([]);
  const [higiene, setHigiene] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [questionarioExiste, setQuestionarioExiste] = useState(false)

  useEffect(() => {
    questionario();
  }, []);
  
  
  const questionario = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/verPerguntas/${itemSelecionado.idUsuario}`);
  
      const existe = response.data.existe;
  
      setQuestionarioExiste(existe);
  
      if (existe) {
        setQuestionarioinfo(response.data.data);
        setAlimentacao(response.data.alimentacao);
        setDiagnostico(response.data.diagnostico);
        setAutonomia(response.data.autonomia);
        setCognicao(response.data.cognicao);
        setComportamento(response.data.comportamento);
        setEmocional(response.data.emocional);
        setHigiene(response.data.higiene);
        setMedicamentos(response.data.medicamentos);
      }
  
    } catch (error) {
      setQuestionarioExiste(false);
    }
  };
  
 const denunciar = async()=>{
  await axios.post(`${API_URL}/api/denunciarIdoso`,{
    idUsuario:itemSelecionado.idUsuario,
    motivoDenuncia:motivo,
    descDenuncia: desc,
    evidenciaDenuncia:evidencia
  }).then(response=>{
    setMotivo("");
    setDesc(""),
    setEvidencia(""),
    setModalDenuncia(false)
  }).catch(error => {
    
  })
 }

  useEffect(() => {
    Animated.spring(indicador, {
      toValue: abaAtiva * larguraAba,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }, [abaAtiva]);

  return (
    <View style={styles.container}>

<Modal
      animationType="fade"
      transparent={true}
      visible={modalDenuncia}
      onRequestClose={() => setModalDenuncia(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
        <TouchableOpacity  style={styles.sair} 
        onPress={() => setModalDenuncia(false)}
        >
          <Ionicons name="close" size={30} color={"gray"}></Ionicons>
          </TouchableOpacity>
          <Text style={styles.modalText}>Denunciar Usuario</Text>
         
          <TextInput
        style={styles.input}
        placeholder="Digite em poucas palavras o motivo"
        value={motivo}
        onChangeText={setMotivo}
        maxLength={40}
      />

      
          <TextInput
        style={styles.inputD}
        multiline={true}
        numberOfLines={5}
        maxLength={250}
        value={desc}
        onChangeText={setDesc}
        placeholder="Descreva o que aconteceu"
        
      />

<TextInput
        style={styles.input}
        placeholder="Coloque as evidências"
        value={evidencia}
        onChangeText={setEvidencia}
      />

      
          <TouchableOpacity
            style={styles.actionButton}
            onPress={()=> denunciar()}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>


        </View>
      </View>
    </Modal>
  

      {/* Bloco topo */}
      <View style={styles.blocoTopo}>
        <Image
          source={{uri: `${API_URL}/storage/${itemSelecionado.fotoUsuario}`}}
          style={styles.foto}
        />
        <TouchableOpacity style={styles.denunciarB} onPress={() => setModalDenuncia(true)}>
        <Ionicons name="warning-outline" size={30} color={"red"}></Ionicons>
        </TouchableOpacity>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.nome}>{itemSelecionado.nomeUsuario}</Text>
          
          <Text style={styles.idade}>{anos} anos</Text>

          

          <View style={styles.linhaEndereco}>
            <Ionicons name="star" size={18} color="#b08cff" />
            <Text style={styles.endereco}>4,5</Text>
          </View>
        </View>
      </View>

      {/* Barra de abas */}
      <View accessibilityRole="tablist" style={styles.barraAbas}>
        <View style={{ position: 'relative' }}>
          <Animated.View
            style={{
              position: 'absolute',
              height: 3,
              width: larguraAba - 32,
              left: 16,
              bottom: 0,
              transform: [{ translateX: indicador }],
              borderRadius: 2,
              backgroundColor: '#b08cff',
            }}
          />

          <View style={{ flexDirection: 'row' }}>
            {ABAS.map((aba, indice) => (
              <TouchableOpacity
                key={aba.chave}
                accessibilityRole="tab"
                accessibilityLabel={`Aba ${aba.titulo}`}
                accessibilityState={{ selected: abaAtiva === indice }}
                style={styles.botaoAba}
                onPress={() => definirAbaAtiva(indice)}
              >
                <Text
                  style={[
                    styles.textoAba,
                    abaAtiva === indice && styles.textoAbaAtiva,
                  ]}
                >
                  {aba.titulo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Conteúdo das abas */}
      <View style={styles.conteudo}>
        {abaAtiva === 0 && (
          <ScrollView
            style={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            

            <Text style={styles.tituloEndere}>Feedbacks</Text>

            <View style={styles.cardComentario}>
              <View style={styles.Comentario}>
                <Image
                  source={require('../assets/perfilicon.png')}
                  style={styles.fotoComentario}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nomeComentario}>João da Silva</Text>
                  <Text style={styles.dataComentario}>12/11/2025</Text>
                </View>
              </View>

              <Text style={styles.textoComentario}>
                O idoso foi muito educado e fácil de cuidar. A experiência foi tranquila e repetiria novamente sem problemas.
              </Text>
            </View>
          </ScrollView>
        )}

        {abaAtiva === 1 && (
          <ScrollView
            style={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.tituloSecao}>Saúde</Text>

<View style={styles.cartao}>
  
{questionarioExiste === false? (        
 <View>
  <Text>O IDOSO OU SEU FAMILIAR NÃO PREENCHEU O QUESTIONÁRIO</Text>
  <Text></Text>
 </View>
): (<View> <Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Condições:</Text>  {diagnostico.map((item, index) =>(
    <Text>
    
    {(!item.doencaDiagnostico || item.doencaDiagnostico === "") ? (""): (<Text style={styles.textoA}>{item.doencaDiagnostico}/ </Text>)}
   
    </Text>
))}
</Text>
<Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Precisa que administre:</Text> {medicamentos.map(item => (
       
          
       <Text style={styles.atributo}>
         <Text style={styles.textoA}></Text>{item.tipoMedicamento}
       </Text>
))}
</Text>
<Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Alergias:</Text> {diagnostico.map((item, index) =>(
    <Text>
    {(!item.alergiaDiagnostico || item.alergiaDiagnostico=== "") ? (""): (<Text style={styles.atributo}>{item.alergiaDiagnostico}/ </Text>)}
    </Text>
))}
</Text>
<Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Autonomia:</Text> {autonomia.map((item) => (
<Text>


  <Text style={styles.textoA}>{item.nivelAutonomia}</Text>
</Text>
))}
</Text>
<Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Higiene:</Text> {higiene.map(item => (
       
          <Text>                 
         <Text style={styles.textoA}>{item.nivelHigiene}</Text>
         </Text>

))}
</Text>
<Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Alimentação:</Text>  {alimentacao.map((item, index) =>(
    <Text>
   
    <Text style={styles.textoA}>{item.tipoAlimentacao}</Text>
   
    </Text>
))}
</Text>
<Text style={styles.linhaInfo}>
<Text style={styles.rotulo}>Dieta:</Text> {alimentacao.map((item, index) =>(
    <Text>
   
    {(!item.descAlimentacao || item.descAlimentacao === "") ? (<Text style={styles.atributo}>Não possui</Text>): (<Text style={styles.atributo}>{item.descAlimentacao}</Text>)}
    </Text>
))}
</Text> 

<Text style={styles.linhaInfo}>
    <Text style={styles.rotulo}>Estado:</Text> {cognicao.map(item => (
 
    
 
      <Text style={styles.textoA}> {item.nivelCognicao}</Text>
   

))}
  </Text>
  <Text style={styles.linhaInfo}>
    <Text style={styles.rotulo}>Emocional:</Text>{emocional.map(item => (
           
              
          
             <Text style={styles.textoA}> {item.nivelEmocional}</Text>
           
 ))}
  </Text>
  <Text style={styles.linhaInfo}>
    <Text style={styles.rotulo}>Comportamentos:</Text>{comportamento.map(item => (<Text> {item.tipoComportamento}/</Text>))}
  </Text>
</View>)}


</View>

           
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  denunciarB:{
    position:'absolute',
    right:30,
    top:30
  },
  navBar: {
    backgroundColor: '#b08cff',
    paddingTop: 40,
    paddingVertical: 16,
    alignItems: 'center',
  },
  sair:{
    top:10,
    position:'absolute',
    right:15,
  },
  tituloNav: { color: '#fff', fontSize: 18, fontWeight: '600' },

  blocoTopo: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  foto: { width: 95, height: 95, borderRadius: 50 },
  nome: { fontSize: 22, fontWeight: '700' },
  idade: { fontSize: 16, color: '#555', marginTop: 4 },
  linhaEndereco: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  endereco: { marginLeft: 4, fontSize: 15, color: '#444' },

  barraAbas: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  botaoAba: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  textoAba: { color: '#6B7280', fontSize: 14 },
  textoAbaAtiva: { color: '#000', fontWeight: '600' },

  conteudo: { flex: 1 },
  conteudoScroll: { padding: 20 },

  tituloSecao: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  tituloEndere: { marginTop: 15, fontSize: 22, fontWeight: '700', marginBottom: 16 },

  cartao: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  linhaInfo: { fontSize: 16, marginBottom: 8 },
  rotulo: { fontWeight: 'bold' },

  cardComentario: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  Comentario: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  fotoComentario: { width: 45, height: 45, borderRadius: 22, marginRight: 12 },
  nomeComentario: { fontSize: 16, fontWeight: '600', color: '#000' },
  dataComentario: { fontSize: 12, color: '#777', marginTop: 2 },
  textoComentario: { fontSize: 15, lineHeight: 20, color: '#333' },


  //MODAL DENUNCIUA

  

  actionButton: {
    padding:10,
    marginRight:10,
    paddinLeft:0,
    height: 50,
    borderColor: '#202020',
   
    backgroundColor: "#b08cff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },

  openButton: {
    padding: 12,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    
  },
  modalText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalReceivedText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontWeight: '600',
  },

  modalFoto: {
    width: 80,            
    height: 80,           
    borderRadius: 60,      
    marginBottom: 15,
    resizeMode: 'cover',
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
  },
  modalReceivedText:{
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,         
    color: '#83DBC2',
  },
  modalInfo:{
    flexDirection: 'row',      
    alignItems: 'center',    
    marginBottom: 20,       
    justifyContent: 'flex-start',
  },

  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },

  input:{
    padding:10,
    borderWidth:1,
    borderRadius:10,
    marginBottom:20,
  },

  inputD:{
    padding:10,
    textAlignVertical: 'top',
    borderWidth:1,
    borderRadius:10,
    marginBottom:20,
  },
});
