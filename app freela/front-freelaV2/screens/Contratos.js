import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from './link';
import { UserContext } from './userContext';
import {View,Text,ScrollView,Platform,TouchableOpacity,Animated,Dimensions,StyleSheet, Image,} from 'react-native';
import CustomModal from './Modal';
import ModalFinalizacao from './ModalFinalizacao';
const ABAS = [
  { chave: 'ativos', titulo: 'Ativos' },
  { chave: 'pendentes', titulo: 'Pendentes' },
  { chave: 'cancelado', titulo: 'Cancelados' },
];

export default function Contratos({navigation}) {
  const {user} = useContext(UserContext);
  const [abaAtiva, definirAbaAtiva] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [precoModal, setPrecoModal] = useState(0);
  const [ativos, setAtivos] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [cancelados, setCancelados] = useState([]);
  
  const indicador = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const larguraAba = width / ABAS.length;

  useEffect(() => {
    if (abaAtiva === 0) setStatus("ativo");
    if (abaAtiva === 1) setStatus("Aguardando Pagamento");
    if (abaAtiva === 2) setStatus("Cancelado");
  }, [abaAtiva]);
  
  useEffect(() => {
    Animated.spring(indicador, {
      toValue: abaAtiva * larguraAba,
      useNativeDriver: true,
      speed: 20,
      bounciness: 8,
    }).start();
  }, [abaAtiva, larguraAba, indicador]);

  useEffect(()=>{
    if (!status) return;
    console.log("BUSCANDO:", status);
    axios
      .get(`${API_URL}/api/vizualizarContratosFree/${user.idProfissional}/${status}`)
      .then(response => {
        if (status === "ativo") setAtivos(response.data.data);
      if (status === "Aguardando Pagamento") setPendentes(response.data.data);
      if (status === "Cancelado") setCancelados(response.data.data);
      })
      .catch(error => console.log("ERRO:", error));
  },[status])

  const finalizar = async (item) => {
    try {
      const hoje = new Date();
      const horas = String(hoje.getHours()).padStart(2, '0');
      const minutos = String(hoje.getMinutes()).padStart(2, '0');
      const segundos = String(hoje.getSeconds()).padStart(2, '0');



      const horario = `${horas}:${minutos}:${segundos}`;

      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // 0–11 → soma 1
      const dia = String(hoje.getDate()).padStart(2, '0');

      const dataFormatada = `${ano}-${mes}-${dia}`;
      const response = await axios.post(`${API_URL}/api/finalizar`, {
        idContrato: item.idContrato
      });
/*
      const extrato = await axios.post(`${API_URL}/api/extrato`,{
        idProfissional: user.idProfissional,
        idContrato:item.idContrato,
        valor: item.precoPersonalizado,
        dataExtrato: dataFormatada,
        horarioExtrato: horario,
      });*/

      if (response.data.success) {
        setPrecoModal(item.precoPersonalizado);
        setModalVisible(true);
        
      }

      
    } catch (error) {
      console.log(error);
    }

    
  };
  


  return (
    <View style={styles.container}>
       <ModalFinalizacao
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
     

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
            pointerEvents="none"
          />

          <View style={{ flexDirection: 'row' }}>
            {ABAS.map((aba, indice) => (
              <TouchableOpacity
                key={aba.chave}
                accessibilityRole="tab"
                accessibilityState={{ selected: abaAtiva === indice }}
                accessibilityLabel={`Aba ${aba.titulo}`}
                activeOpacity={0.7}
                onPress={() => definirAbaAtiva(indice)}
                style={styles.botaoAba}
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
          <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>Ativos</Text>
            <Text style={styles.subtitulo}>Contrato ativo mais recente</Text>

            {ativos.map((item, index) => {
               const anoNasc = new Date(item.dataNasc).getFullYear();
               const anoAtual = new Date().getFullYear();
               const idade = anoAtual - anoNasc;
             
               return (
                <View key={index} style={styles.cartaoIdoso}>

                <View style={styles.cabecalhoIdoso}>
                  <Image
                    source={{uri: `${API_URL}/storage/${item.fotoUsuario}`}}
                    style={styles.fotoIdoso}
                  />
                  <View>
                    <Text style={styles.nomeIdoso}>{item.nomeUsuario}</Text>
                    <Text style={styles.subInfoIdoso}>Idade: {idade}</Text>
                  </View>
                </View>
  
                <View style={styles.caixaInformacoes}>
                  <Text style={styles.textoInfo}>
                    <Text style={styles.rotuloInfo}>Preço: </Text>
                    <Text style={styles.rotuloP}>R${item.precoPersonalizado}</Text>
                  </Text>
  
                  <Text style={styles.textoInfo}>
                    <Text style={styles.rotuloInfo}>Dia: {item.dataServico}</Text>
                  </Text>
  
                  <Text style={styles.textoInfo}>
                    <Text style={styles.rotuloInfo}>Horário: </Text>
                    {item.horaInicioServico}
                  </Text>
  
                  <TouchableOpacity style={styles.botaoM}> 
                    <Text style={styles.mais}>Ver Mais</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botaoM} onPress={()=>finalizar(item)}> 
                    <Text style={styles.mais}>Terminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
               );
              })}


          </ScrollView>
        )}

        {abaAtiva === 1 && (
          <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>Pendentes</Text>
            <Text style={styles.subtitulo}>Contratos esperando o pagamento</Text>

            {pendentes.map((item, index) => {
               const anoNasc = new Date(item.dataNasc).getFullYear();
               const anoAtual = new Date().getFullYear();
               const idade = anoAtual - anoNasc;
             
               return (
                <View key={index} style={styles.cartaoIdoso}>

                <View style={styles.cabecalhoIdoso}>
                  <Image
                    source={{uri: `${API_URL}/storage/${item.fotoUsuario}`}}
                    style={styles.fotoIdoso}
                  />
                  <View>
                    <Text style={styles.nomeIdoso}>{item.nomeUsuario}</Text>
                    <Text style={styles.subInfoIdoso}>Idade: {idade}</Text>
                  </View>
                </View>
  
                <View style={styles.caixaInformacoes}>
                  <Text style={styles.textoInfo}>
                    <Text style={styles.rotuloInfo}>Preço: </Text>
                    <Text style={styles.rotuloP}>R${item.precoPersonalizado}</Text>
                  </Text>
  
                  <Text style={styles.textoInfo}>
                    <Text style={styles.rotuloInfo}>Dia: {item.dataServico}</Text>
                  </Text>
  
                  <Text style={styles.textoInfo}>
                    <Text style={styles.rotuloInfo}>Horário: </Text>
                    {item.horaInicioServico}
                  </Text>
  
                  <View style={styles.botoes}> 
                   <TouchableOpacity style={styles.botaoM}> 
                    <Text style={styles.mais}>Ver Mais</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botaoM} onPress={() => navigation.navigate("Conversas", {
   idUsuario: item.idUsuario, 
   idProfissional: user.idProfissional,
   idConversa: item.idConversa ?? null,
  })}> 
                    <Text style={styles.mais}>Conversar</Text>
                  </TouchableOpacity>
                  
                </View>
                </View>
              </View>
               );
              })}
          </ScrollView>
       
        )}

        {abaAtiva === 2 && (
          <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>Cancelados</Text>
            <Text style={styles.subtitulo}>Contratos cancelados</Text>

            {cancelados.map((item, index) => {
               const anoNasc = new Date(item.dataNasc).getFullYear();
               const anoAtual = new Date().getFullYear();
               const idade = anoAtual - anoNasc;
             
               return (
            <View key={index} style={styles.cartaoIdoso}>

              <View style={styles.cabecalhoIdoso}>
                <Image
                  source={{uri: `${API_URL}/storage/${item.fotoUsuario}`}}
                  style={styles.fotoIdoso}
                />
                <View>
                  <Text style={styles.nomeIdoso}>{item.nomeUsuario}</Text>
                  <Text style={styles.subInfoIdoso}>Idade: {idade}</Text>
                </View>
              </View>

              <View style={styles.caixaInformacoes}>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Preço: </Text>
                  <Text style={styles.rotuloP}>R${item.precoPersonalizado}</Text>
                </Text>

                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Dia: {item.dataServico}</Text>
                </Text>

                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Horário:</Text>
                  {item.horaInicioServico}
                </Text>

              </View>
            </View>
               );
              })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  botaoM: {
    marginRight:10,  
    borderColor: '#b08cff',
    borderWidth: 2,
    width: 90,
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 10,
  },
  mais: { 
    color: '#b08cff',
    alignSelf: 'center', 
    fontWeight: '600' 
  },

  botaoC: {
    left: 260, 
    alignSelf: 'flex-start',
    borderColor: '#b08cff',
    borderWidth: 2,
    width: 90,
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 10,
  },
  cancel: { 
    color: '#b08cff', 
    alignSelf: 'center', 
    fontWeight: '600' 
  },

  navBar: {
    paddingTop: 40,
    backgroundColor: '#b08cff',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    opacity: 0.4,
    marginVertical: 6,
    marginBottom: 20,
  },
  
  tituloNav: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  barraAbas: {
    paddingTop:50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  botaoAba: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoAba: {
    fontSize: 14,
    color: '#6B7280',
  },
  textoAbaAtiva: {
    fontWeight: '600',
    color: 'black',
  },
  conteudo: {
    flex: 1,
  },
  conteudoScroll: {
    padding: 20,
  },
  containerAba: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  
  cartaoIdoso: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cabecalhoIdoso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fotoIdoso: {
    width: 85,
    height: 85,
    borderRadius: 40,
    marginRight: 12,
  },
  nomeIdoso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subInfoIdoso: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  caixaInformacoes: {
    marginTop: 8,
  },
  textoInfo: {
    fontSize: 15,
    color: '#333',
    marginVertical: 2,
  },
  rotuloInfo: {
    fontWeight: 'bold',
    color: '#000',
  },
  rotuloP: {
    color: '#3ab940ff',
  },
  rotuloPP: {
    color: '#b93a3aff',
  },

  botoes:{
    flexDirection:'row',
  }
});