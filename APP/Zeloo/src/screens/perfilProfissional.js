import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, TextInput  } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { API_URL } from '../screens/link';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import colors from './colors';
import { UserContext } from './userContext';
import Icon from "react-native-vector-icons/Feather";
import Icons from "react-native-vector-icons/Entypo";
export default function perfilProfissional({route, navigation}) {
  const { servico } = route.params;
  const {user} = useContext(UserContext);
  const anoNasc = new Date(servico.dataNascProfissional).getFullYear();
  const hoje = new Date();
  const [modalDenuncia, setModalDenuncia] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [avaliacao, setAvaliacao] = useState([]);
  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState("");
  const [total, setTotal] = useState("");
  const [evidencia, setEvidencia] = useState("");
  const ano = hoje.getFullYear();
  const [idade, setIdade] = useState("");
  const CalcularIdade =  () =>{
    const calculo = ano - anoNasc;
    setIdade(calculo);
  };

  useEffect(() => {
    avaliacoes();
    mediaA();
    CalcularIdade();
  }, []);


  const mediaA = async () =>{
    await axios.get(`${API_URL}/api/mediaAvaliarCuidador/${servico.idProfissional}`)
    .then(response=>{
      setMedia(response.data.data);
      setTotal(response.data.total)
    })
  }

  const avaliacoes = async()=>{
    await axios.get(`${API_URL}/api/verAvaliacaoCuidador/${servico.idProfissional}`)
    .then(response=>{
      setAvaliacao(response.data.data);
    })
  }

  const denunciar = async()=>{
    await axios.post(`${API_URL}/api/denunciarFree`,{
      idProfissional:servico.idProfissional,
      motivoDenuncia:motivo,
      descDenuncia: desc,
      evidenciaDenuncia:evidencia
    }).then(response=>{
      setMotivo("");
      setDesc("");
      setEvidencia("");
      alert("Denúncia enviada!");
      setModalDenuncia(false);
    }).catch(error => {
      console.log("Erro:", error.response.data);
    })
   }

  const favoritar = async () =>{
    axios.post (`${API_URL}/api/favoritar`,{
      idUsuario:user.idUsuario,
      idProfissional:servico.idProfissional
    })
    .then(
      alert('Favoritado!')
      
    );
    navigation.navigate("favoritos")
    
  }
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

      <View style={styles.topSection}>
        <Image
          source={{ uri: `${API_URL}/storage/${servico.fotoProfissional}` }}
          style={styles.foto}
        />
        <Text style={styles.avaliacoes}>
          <Ionicons name="star" size={22} color="#daa520" /> {media} ({total} avaliações)
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/*<Text style={styles.local}>
          <Ionicons name="location-sharp" size={20} color="#d0342c" /> São Paulo, SP
        </Text>*/}

        <Text style={styles.info}>Idade: {idade}</Text>
      
        <Text style={styles.info}>Gênero: {servico.generoProfissional}</Text>

        <View style={styles.line} />

        <Text style={styles.sectionTitle}>Feedbacks</Text>

              {avaliacao.map((item, index)=>{

      const data = new Date(item.dataDoEnvio);
      const m = data.getMonth() + 1;
      const a = data.getFullYear();
      const d = data.getDate();
        return (
      <View style={styles.cardComentario}>
      <View style={styles.Comentario}>
      
        <View style={{ flex: 1 }}>
          <Text style={styles.nomeComentario}>{item.nomeProfissional}</Text>
          <View style={styles.estrela}>
          <Text style={styles.estrelaT}>{item.notaAvaliacao}</Text>
            <Ionicons  name="star" size={21} color={colors.azul} />
            
            </View>
          <Text style={styles.dataComentario}>{d}/{m}/{a}</Text>
        </View>
      </View>

      <Text style={styles.textoComentario}>
      {item.comentAvaliacao}
      </Text>
      </View>
      );
      })}

        
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#b3ecec' }]} onPress={()=>favoritar()}>
          <Icons name="heart" size={22} color="#000" style={styles.buttonIcon} />
          <Text style={[styles.buttonText, { color: '#000' }]}>Favoritar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#d9534f' }]} onPress={()=> setModalDenuncia(true)}>
          <Ionicons name="alert-circle-outline" size={22} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Denunciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  estrela:{
    flexDirection:'row',
   
    position: 'absolute',
    right: 0,
    top: 0
  },

  estrelaT:{
    fontWeight:'600',
    marginRight:5,
    fontSize:18
    
  },


  tituloFeedback: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  cardComentario: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
    width: '100%', 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },

  Comentario: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  fotoComentario: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 12,
  },

  nomeComentario: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  dataComentario: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  textoComentario: {
    fontSize: 15,
    lineHeight: 20,
    color: '#333',
  },






  topSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  avaliacoes: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  local: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  line: {
    marginVertical: 20,
    width: '90%',
    height: 1,
    backgroundColor: '#000',
  },
  experienciasItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 40,
  },
  experienciasIcon: {
    marginRight: 16,
  },
  experienciasText: {
    fontSize: 20,
    textAlign: 'left',
    flexShrink: 1,
    color: '#333',
  },
  nivel: {
    alignItems: 'center',
    marginVertical: 24,
  },
  nivelCuidador: {
    fontWeight: 'bold',
    fontSize: 21,
    paddingBottom: 20,
  },
  nivelButton: {
    backgroundColor: '#72DA86',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  nivelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  nivelSubtitle: {
    fontSize: 18,
    color: '#212121',
  },
  disponibilidadeSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  disponibilidadeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  disponibilidadeText: {
    fontSize: 20,
  },
  precoSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  precoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 20,
  },
  precoText: {
    fontSize: 20,
    marginLeft: 8,
  },
  buttonsContainer: {
    marginBottom:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    gap: 10,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 50,
    marginHorizontal: 5,
    minWidth: 160,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202020',
  },
  buttonIcon: {
    marginRight: 10,
},


  //MODAL DENUNCIUA

  

  actionButton: {
    padding:10,
    marginRight:10,
    paddinLeft:0,
    height: 50,
    borderColor: '#202020',
   
    backgroundColor: colors.azul,
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