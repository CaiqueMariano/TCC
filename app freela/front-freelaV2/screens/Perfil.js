import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from './userContext';
import { API_URL } from './link';
import { Alert, Modal } from 'react-native';
import {View,Text,StyleSheet,Image,TouchableOpacity,Animated,Dimensions,ScrollView, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';




const ABAS = [
  { chave: 'renda', titulo: 'Renda / Extrato' },
  { chave: 'info', titulo: 'Informações' },
  
];


export default function PerfilCuidador({ navigation }) {
  const  {user} = useContext(UserContext);
  const[nomeUsuario, setNomeUsuario] = useState('');
  const[mostrarEdicao, setMostrarEdicao] = useState(false);
  const [telefoneUsuario, setTelefoneUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [abaAtiva, definirAbaAtiva] = useState(0);
  const indicador = useRef(new Animated.Value(0)).current;
  const [media, setMedia] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
const [itemSelecionado, setItemSelecionado] = useState(null);
const [avaliacao, setAvaliacao] = useState([]);
const anoNasc = new Date(user.dataNascProfissional).getFullYear();
  const hoje = new Date();
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
    await axios.get(`${API_URL}/api/mediaAvaliarCuidador/${user.idProfissional}`)
    .then(response=>{
      setMedia(response.data.data);
    })
  }

  const avaliacoes = async()=>{
    await axios.get(`${API_URL}/api/verAvaliacaoCuidador/${user.idProfissional}`)
    .then(response=>{
      setAvaliacao(response.data.data);
    })
  }
  

const abrirModalExtrato = (item) => {
  setItemSelecionado(item);
  setModalVisivel(true);
};


  const { width } = Dimensions.get('window');
  const larguraAba = width / ABAS.length;

  useEffect(() => {
    Animated.spring(indicador, {
      toValue: abaAtiva * larguraAba,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }, [abaAtiva]);



  const editarPerfilInfo = async () =>{
    try{
      const response = await axios.put(`${API_URL}/api/updateCuidador/${user.idProfissional}`, {
        nomeUsuario, telefoneUsuario, emailUsuario
        
      });

      if(response.data.success){
        Alert.alert("Dados alterados!",
          "Faça login novamente para ver as mudanças"
        )
        setMostrarEdicao(false);
      }else{
        console.log(response.data.message);
      }


    }catch(error){
      console.log(error.response.data);
    }
  };
return (
  <View style={styles.container}>

<Modal
          visible={mostrarEdicao}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setMostrarEdicao(false)}
        >

<View style={styles.modal}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={styles.modalView}>
       
      <Text style={styles.textInput}>Nome Inteiro:</Text>
      <TextInput
      style={styles.input}
      placeholder="Nome Inteiro"
      value={nomeUsuario}
      onChangeText={setNomeUsuario}
    />

<Text style={styles.textInput}>Telefone:</Text>
    <TextInput
      style={styles.input}
      placeholder="Telefone"
      value={telefoneUsuario}
      onChangeText={setTelefoneUsuario}
    />

<Text style={styles.textInput}>E-mail:</Text>
  <TextInput
      style={styles.input}
      placeholder="E-mail"
      value={emailUsuario}
      onChangeText={setEmailUsuario}
    />


    <View style={styles.botoes}>
      <TouchableOpacity style={styles.button} onPress={()=>setMostrarEdicao(false)}>
        <Text style={styles.buttonText} >Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.button2}
  onPress={() => {
    editarPerfilInfo();
    setMostrarEdicao(false);
  }}
>
  <Text style={styles.buttonText}>Salvar</Text>
</TouchableOpacity>

    </View>


      </View>
    </ScrollView>
  </View>

  </Modal>
    <View style={styles.blocoTopo}>
      <Image
        source={{uri: `${API_URL}/storage/${user.fotoProfissional}`}}
        style={styles.foto}
      />

      <View style={{ marginLeft: 16 }}>
        <Text style={styles.nome}>{user.nomeProfissional}</Text>
        <Text style={styles.idade}>{idade} anos</Text>

        <View style={styles.linhaEndereco}>
          <Ionicons name="star" size={18} color="#b08cff" />
          <Text style={styles.endereco}>{media}</Text>
        </View>
      </View>
    </View>

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

    <View style={styles.conteudo}>
 
      {abaAtiva === 0 && (
        <ScrollView style={styles.conteudoScroll} showsVerticalScrollIndicator={false}>

          <Text style={styles.tituloSecao}>Extrato</Text>

          <TouchableOpacity 
            style={styles.botaoVerExtrato}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.textoBotaoVerExtrato}>Ver extratos</Text>
          </TouchableOpacity>

         

      
          <Text style={styles.tituloFeedback}>Últimos Feedbacks</Text>
         

            {avaliacao
             .sort((a, b) =>
              new Date(b.created_at.replace(" ", "T")) -
              new Date(a.created_at.replace(" ", "T"))
            )
            .map((item, index) => {

                const data = new Date(item.dataDoEnvio);
                const m = data.getMonth() + 1;
                const a = data.getFullYear();
                const d = data.getDate();
              return(
                <View style={styles.cardComentario}>
                <View style={styles.Comentario}>
                  <TouchableOpacity onPress={()=> navigation.navigate("Perfil Idoso", {
                    itemSelecionado: item
                  })}>
                  <Image
                    source={{uri: `${API_URL}/storage/${item.fotoUsuario}`}}
                    style={styles.fotoComentario}
                  />
                  </TouchableOpacity>
                  <View style={styles.estrela}>
                 <Text style={styles.estrelaT}>{item.notaAvaliacao}</Text>
                  <Ionicons  name="star" size={21} color="#b08cff" />
                  
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nomeComentario}>{item.nomeUsuario}</Text>
                    <Text style={styles.dataComentario}>{d}/{m}/{a}</Text>
                  </View>
                </View>
    
                <Text style={styles.textoComentario}>
                {item.comentAvaliacao}
                </Text>
              </View>
              );
            })}
         <View style={styles.ViewCard}></View>

        </ScrollView>
      )}


      {abaAtiva === 1 && (
        <ScrollView style={styles.conteudoScroll} showsVerticalScrollIndicator={false}>

          <Text style={styles.tituloSecao2}>Informações Pessoais</Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Telefone:</Text> {user.telefoneProfissional}
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Email:</Text> {user.emailProfissional}
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Genêro:</Text> {user.generoProfissional}
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Data de Nascimento:</Text> {user.dataNascProfissional}
            </Text>

  

          <TouchableOpacity 
            style={styles.botaoEditar}
            onPress={() => {setTelefoneUsuario(user.telefoneProfissional);setEmailUsuario(user.emailProfissional);setNomeUsuario(user.nomeProfissional);setMostrarEdicao(true)}}
          >
            <Text style={styles.textoBotaoEditar}>Editar Perfil</Text>
          </TouchableOpacity>

        </ScrollView>
      )}

    </View>

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  modal:{
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center'
  },
  modalView:{
    paddingTop:20,
    fontSize:20,
    paddingLeft:21,
    marginTop:200,
    backgroundColor: '#fff', 
    width:360,
    borderRadius: 10, 

  },

  textInput:{
    fontWeight:'500',
    fontSize:20 ,
  },

  input: {
    width:315,
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#202020",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: 'center',
    backgroundColor: "#fff"
  },


  

  ViewCard:{
    marginBottom:80,
  },

  estrela:{
    flexDirection:'row',
   
    position: 'absolute',
    right: 0,
    top: 0
  },

  estrelaT:{
    fontWeight:'600',
    color: "#b08cff",
    marginRight:5,
    fontSize:18
    
  },


separador: {
  height: 1,
  backgroundColor: '#E5E7EB',
  marginVertical: 20,
},

  navBar: {
    backgroundColor: '#b08cff',
    paddingTop: 40,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tituloNav: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  rotulo: {
    fontWeight: '600',
  },

  blocoTopo: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  foto: {
    width: 95,
    height: 95,
    borderRadius: 50,
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
  },
  idade: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },

  linhaEndereco: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  endereco: {
    marginLeft: 4,
    fontSize: 15,
    color: '#444',
  },

  barraAbas: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  botaoAba: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoAba: {
    color: '#6B7280',
    fontSize: 14,
  },
  textoAbaAtiva: {
    color: '#000',
    fontWeight: '600',
  },
botaoVerExtrato: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#b08cff',
  paddingVertical: 14,
  borderRadius: 12,
  marginTop: 10,
  gap: 8,
},

botaoEditar: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#b08cff',
  paddingVertical: 14,
  borderRadius: 12,
  marginTop: 45,
  gap: 8,
},

textoBotaoVerExtrato: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

textoBotaoEditar: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

  conteudo: {
    flex: 1,
  },

  
 botoes: { 
  flexDirection: "row", 
  justifyContent: "space-between", 
  width: 315, 
  marginBottom: 15 
},

button: {
  width: 100,
  height: 50,
  borderColor: '#b08cff',
  borderWidth: 2,
  
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
},
button2: {
  width: 100,
  height: 50,
  borderColor: "#b08cff",
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
  marginTop: 10,
},
buttonText: {
  color:"#b08cff",
  fontSize: 18,
  fontWeight: '600',
},

  conteudoScroll: {
    padding: 20,

  },

  tituloSecao: {
    fontSize: 22,
    fontWeight: '700',
    marginTop:5,
  },

  tituloSecao2: {
    fontSize: 22,
    fontWeight: '700',
    marginTop:5,
    marginBottom:20,
  },

  tituloExtrato: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  cartao: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
  },



itemExtratoLinha: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},

dataExtrato: {
  fontSize: 14,
  fontWeight: '600',
  color: '#333',
},

tipoExtrato: {
  fontSize: 13,
  color: '#777',
},

ladoDireito: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},

valorPositivo: {
  fontWeight: '700',
  color: '#3ab940',
  fontSize: 14,
},

  valorPositivo: {
    fontWeight: '600',
    color: 'green',
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

  linhaInfo:{
    fontSize:21,
    marginBottom:10,
  },
});
