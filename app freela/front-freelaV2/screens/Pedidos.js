import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from './link';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather";
import * as Location from 'expo-location';


const ABAS = [
  { chave: 'Acompanhamento Médico', titulo: 'Médico' },
  { chave: 'Acompanhamento Domiciliar', titulo: 'Domiciliar' },
  { chave: 'Locomoção', titulo: 'Locomoção' },
  { chave: 'Outro', titulo: 'Outros' },
];

export default function Pedidos() {
  const [localizacao, setLocalizacao] = useState(null);
  const [erro, setErro] = useState(null);
  const navigation = useNavigation();
  const [abaAtiva, setAbaAtiva] = useState(0);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [servicos, setServicos] = useState([]);
  const indicador = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const larguraAba = width / ABAS.length;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErro('Permissão negada para acessar localização');
        return;
      }

      let posicao = await Location.getCurrentPositionAsync({});
      setLocalizacao(posicao);
    })();
  }, []);

  async function pegarCoordenadasPorCEP(item) {
    const enderecoCompleto = `${item.ruaUsuario} ${item.numLogradouroUsuario}, ${item.bairroUsuario}, ${item.cidadeUsuario} - ${item.estadoUsuario}`;
  
    console.log("Endereço usado para geocode:", enderecoCompleto);
  
    const resultados = await Location.geocodeAsync(enderecoCompleto);
  
    if (resultados.length > 0) {
      return {
        lat: resultados[0].latitude,
        lon: resultados[0].longitude
      };
    }
  
    console.log("Nenhuma coordenada encontrada pelo geocodeAsync");
    return null;
  }


  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em KM
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // km
  }

  // animação do indicador
  useEffect(() => {
    Animated.spring(indicador, {
      toValue: abaAtiva * larguraAba,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }, [abaAtiva]);

  const pedidos = [
    {
      id: 1,
      nome: 'Sebastião Melo',
      cidade: 'Vila olimpia - SP',
      nota: 3.5,
      avaliacoes: 47,
      pedido: 'senhor de idade, precisa de (acompanhamento doméstico)',
      imagem: 'https://i.pravatar.cc/150?img=70',
    },
    {
      id: 2,
      nome: 'José Ricardo',
      cidade: 'Guarulhos - SP',
      nota: 3,
      avaliacoes: 23,
      pedido: 'senhor de idade, precisa de (acompanhamento doméstico)',
      imagem: 'https://i.pravatar.cc/150?img=63',
    },
  ];


  useEffect(()=>{
    axios
      .get(`${API_URL}/api/buscarServicos`)
      .then(response =>{
        setServicos(response.data.data);
      })
      .catch(error => console.log("ERRO: ", error));
  },[])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <View style={{ flexDirection: 'row' }}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={i} name="star" size={14} color="#b08cff" />
        ))}
        {hasHalfStar && <Ionicons name="star-half" size={14} color="#b08cff" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Ionicons key={i} name="star-outline" size={14} color="#b08cff" />
        ))}
      </View>
    );
  };

  // filtra pedidos por aba (exemplo simples)
  const pedidosFiltrados = (tipo) => {
    return servicos.filter(s => s.tipoServico === tipo);
  };


  function CardPedido({ item, localizacao, pegarCoordenadasPorCEP, calcularDistancia, abrirModal }) {
    const [distancia, setDistancia] = useState(null);
  
    useEffect(() => {
      if (!localizacao) return;
    
      async function calc() {
        console.log("Chamando pegarCoordenadasPorCEP com:", item);
        const coords = await pegarCoordenadasPorCEP(item);
        
        if (coords) {
          const km = calcularDistancia(
            localizacao.coords.latitude,
            localizacao.coords.longitude,
            coords.lat,
            coords.lon
          );
    
          console.log("Distância calculada:", km);
          setDistancia(km.toFixed(1));
        } else {
          console.log("Coordenadas não encontradas para:");
        }
      }
    
      calc();
    }, [localizacao, item]);
  
    return (
      <View style={styles.card}>
      
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image 
        source={{ uri: `${API_URL}/storage/${item.fotoUsuario}` }} 
        style={styles.profileImage} 
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.km}>{distancia ?? "..."}KM</Text>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.nomeUsuario}</Text>
        <Text style={{ fontSize: 13, color: '#555' }}>
          <Icon name="map-pin" size={12} color={'#b08cff'} /> {item.cidadeUsuario}
        </Text>
      </View>
    </View>

    <Text style={styles.pedido}>Detalhes:</Text>
    <Text style={styles.pedidoText}>{item.descServico}</Text>

    <TouchableOpacity style={{ marginTop: 10, 
      paddingVertical: 8, 
      backgroundColor: '#b08cff', 
      borderRadius: 8, 
      alignItems: 'center' }} 
      onPress={() => { setItemSelecionado(item); setModalVisivel(true); }} > 
      <Text style={{ color: '#fff', fontWeight: '600' }}>Ver Mais</Text> 
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Modal */}
      <Modal
  visible={modalVisivel}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisivel(false)}
>
  <View style={styles.modalOverlay}>
  {itemSelecionado && (
    <View style={styles.modalConteudo}>

      <TouchableOpacity 
        style={styles.modalFechar}
        onPress={() => setModalVisivel(false)}
      >
        <Ionicons name="close" size={28} color="#333" />
      </TouchableOpacity>

      <>
      <Text style={styles.rotuloFortaoKm}>Distância:</Text>
      <Text style={styles.rotuloFortaoKmN}>15 KM</Text>
        <Image 
          source={{uri: `${API_URL}/storage/${itemSelecionado.fotoUsuario}` }}
          style={styles.modalImagem}
        />

        <Text style={styles.modalNome}>{itemSelecionado.nomeUsuario}</Text>

        <Text style={styles.modalInfo}>
          <Text style={styles.rotuloFortao}>Idade: </Text>78 anos
        </Text>
        <Text style={styles.modalInfo}>
          <Text style={styles.rotuloFortao}>Data do Serviço: {itemSelecionado.dataServico}</Text> 
        </Text>
        <Text style={styles.modalInfo}>
          <Text style={styles.rotuloFortao}>Horário: </Text>{itemSelecionado.horaInicioServico}
        </Text>
        <Text style={styles.modalInfo}>
          <Text style={styles.rotuloFortao}>Tipo:</Text>{itemSelecionado.tipoServico}
        </Text>
        <Text style={styles.modalInfo}>
          <Text style={styles.rotuloFortao}>Endereço: </Text> {itemSelecionado.ruaUsuario},{itemSelecionado.numLogradouroUsuario}
        </Text>
      
        <Text style={styles.modalInfo}>
          <Text style={styles.rotuloFortao}>CEP:</Text> {itemSelecionado.cepUsuario}
        </Text>
        
      
        <Text style={styles.modalInfo}>
        <Text style={styles.rotuloFortao}>
          Descrição: </Text> {itemSelecionado.descServico}
        </Text>
          <View style={styles.botoes}>
              <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate(PerfilIdoso)}> 
                <Text style={styles.textoBotao}>Perfil do Idoso</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoAcao} onPress={() => navigation.navigate(PerfilIdoso)}> 
                <Text style={styles.textoBotao}>Aceitar</Text>
              </TouchableOpacity>
              </View>
      </>
    </View>
  )};
  </View>
</Modal>

      {/* Abas */}
      <View style={styles.headerTabs}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
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
            {ABAS.map((aba, index) => (
              <TouchableOpacity
                key={aba.chave}
                onPress={() => setAbaAtiva(index)}
                style={styles.botaoAba}
              >
                <Text style={[styles.textoAba, abaAtiva === index && styles.textoAbaAtiva]}>
                  {aba.titulo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Conteúdo das abas */}
      <ScrollView contentContainerStyle={{ padding: 12 }}>
      {pedidosFiltrados(ABAS[abaAtiva].chave).map(item => {
  return (
    <CardPedido 
      key={item.idServico}
      item={item}
      localizacao={localizacao}
      pegarCoordenadasPorCEP={pegarCoordenadasPorCEP}
      calcularDistancia={calcularDistancia}
      abrirModal={() => {
        setItemSelecionado(item);
        setModalVisivel(true);
      }}
    />
  );
})}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
   safeArea: { 
    flex: 1
   },
   barraAbas: {
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  botaoAba: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  botoes:{
    flexDirection:'row',
  },
  textoAba: {
    fontSize: 14,
    color: '#6B7280',
  },
  textoAbaAtiva: {
    fontWeight: '600',
    color: 'black',
  },
  rotuloFortao: {
    fontWeight: '800',
    color: '#202020',
 },
   rotuloFortaoKm: {
    fontSize:20,
    position: 'absolute',
    left: 200,
    top:50,
    fontWeight: '800',
    color: '#b08cff',
 },
 rotuloFortaoKmN: {
  fontSize:20,
  position: 'absolute',
  left: 200,
  top:70,
  fontWeight: '800',
  color: '#b08cff',
},
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    opacity: 0.4,
    marginVertical: 6,
    marginBottom: 20,
  },
  background: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalConteudo: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    alignItems: 'flex-start',
   
  },
  
  modalFechar: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  
  modalImagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  km:{
    fontSize:20,
    color:'#b08cff',
    position:'absolute',
    bottom:40,
    left:210
  },
  
  modalNome: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  
  modalInfo: {
    fontSize: 16,
    color: '#202020',
    marginVertical: 3,
    textAlign: 'left',
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
    textoBotao: {
      color: '#b08cff',
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
  
  
 header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  
  },
 headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop:40,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
title: {
  fontSize: 25,
  fontWeight: 'bold',

},
  
  tabText: {
    fontSize: 16,
    fontWeight: '500',

    textAlign: 'center',
  },
  
  activeTab: {
    alignItems: 'center',
  },
  
  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  
  activeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#0a84ff', // linha verde embaixo do ativo
    borderRadius: 2,
    marginTop: 4,
    
  },
  topBar: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    padding: 12,
    paddingBottom: 96,
    flexGrow: 1,
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    backgroundColor: "#b08cff",
    paddingHorizontal: 20,
    paddingVertical: 6, 
    borderRadius: 8,
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily:'roboto',
  
  },
  card: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#DBDBDB', 
    borderRadius: 15, 
    padding: 30,
    marginBottom: 20,
  },
  
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
  },
  infoSection: {
    flex: 1,
  },
  personName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },
  locationText: {
    fontSize: 13,
    color: '#555',
    marginVertical: 2,
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a84ff',
  },
  bottomBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
  },
  requestContainer: {
flexDirection: 'row',
 alignItems: 'center',
justifyContent: 'space-between',
marginTop: 8,
},
pedido: {
  fontSize: 16,
  color: '#333',
  fontWeight: '500',
},

pedidoText: {
  fontSize: 15,
  color: '#333',              
  flex: 1,                   
  flexWrap: 'wrap',    
},
  bottomBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    zIndex: 20,
    elevation: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#fff',
  },
  navLabelActive: {
    color: '#0a84ff',
    fontWeight: '700',
  },

  actionButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
// === MODAL ===
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },


  modalFoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 12,
  },

  modalInfo: { marginBottom: 12 },


  actionButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
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
    alignItems: 'center',
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
    width: 120,            
    height: 120,           
    borderRadius: 60,      
    marginBottom: 15,
    resizeMode: 'cover',
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
  }
  
  
});
  