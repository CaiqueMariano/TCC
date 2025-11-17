import React, { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-native';
import {View,Text,StyleSheet,Image,TouchableOpacity,Animated,Dimensions,ScrollView,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';




const ABAS = [
  { chave: 'renda', titulo: 'Renda / Extrato' },
  { chave: 'info', titulo: 'Informações' },
  
];


export default function PerfilCuidador({ navigation }) {
  const [abaAtiva, definirAbaAtiva] = useState(0);
  const indicador = useRef(new Animated.Value(0)).current;

  const [modalVisivel, setModalVisivel] = useState(false);
const [itemSelecionado, setItemSelecionado] = useState(null);

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

return (
  <View style={styles.container}>

    <View style={styles.navBar}>
      <Text style={styles.tituloNav}>Perfil do Cuidador</Text>
    </View>

    <View style={styles.blocoTopo}>
      <Image
        source={require('../assets/perfilicon.png')}
        style={styles.foto}
      />

      <View style={{ marginLeft: 16 }}>
        <Text style={styles.nome}>Mariazinha Oliveira</Text>
        <Text style={styles.idade}>35 anos</Text>

        <View style={styles.linhaEndereco}>
          <Ionicons name="star" size={18} color="#b08cff" />
          <Text style={styles.endereco}>4,8</Text>
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

          <Text style={styles.tituloSecao}>Renda Mensal</Text>

          <View style={styles.cartao}>
            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Total no mês:</Text> R$ 3.250,00
            </Text>
            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Serviços feitos:</Text> 12 serviços
            </Text>
            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Horas trabalhadas:</Text> 87h
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.botaoVerExtrato}
            onPress={() => navigation.navigate("Extratos")}
          >
            <Text style={styles.textoBotaoVerExtrato}>Ver extratos</Text>
          </TouchableOpacity>

      
          <Text style={styles.tituloFeedback}>Feedbacks</Text>

          <View style={styles.cardComentario}>
            <View style={styles.Comentario}>
              <Image
                source={require('../assets/perfilicon.png')}
                style={styles.fotoComentario}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.nomeComentario}>Garanhao fa paçoca</Text>
                <Text style={styles.dataComentario}>02/11/2025</Text>
              </View>
            </View>

            <Text style={styles.textoComentario}>
              Ótima profissional, paciente e muito atenciosa. Recomendo fortemente.
            </Text>
          </View>

        </ScrollView>
      )}


      {abaAtiva === 1 && (
        <ScrollView style={styles.conteudoScroll} showsVerticalScrollIndicator={false}>

          <Text style={styles.tituloSecao}>Informações do Cuidador</Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Tempo de Experiência:</Text> 5 anos
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Disponibilidade:</Text> Diurno e Noturno
            </Text>

            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Genêro:</Text> Mulher
            </Text>

            <View style={styles.separador} />

            <Text style={styles.tituloSecao}>Experiências</Text>

            <Text style={styles.linhaInfo}> Idosos com Alzheimer</Text>
            <Text style={styles.linhaInfo}> Idosos acamados</Text>
            <Text style={styles.linhaInfo}> Idosos com comportamento agressivo</Text>

            <View style={styles.separador} />

            <Text style={styles.tituloSecao}>Especializações</Text>

            <Text style={styles.linhaInfo}> Primeiros socorros</Text>
            <Text style={styles.linhaInfo}> Administração de medicamentos</Text>
            <Text style={styles.linhaInfo}> Cuidados pós-operatórios</Text>

          <TouchableOpacity 
            style={styles.botaoEditar}
            onPress={() => navigation.navigate("EditarPerfil")}
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

  conteudoScroll: {
    padding: 20,
  },

  tituloSecao: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
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
});
