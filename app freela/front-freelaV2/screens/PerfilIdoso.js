import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from './link';

const ABAS = [
  { chave: 'saude', titulo: 'Saúde/Feedbacks' },
  { chave: 'cognitivo', titulo: 'Cognitivo/Endereço' },
];

export default function PerfilIdoso({ navigation, route }) {
  const { itemSelecionado } = route.params;
  const [abaAtiva, definirAbaAtiva] = useState(0);
  const indicador = useRef(new Animated.Value(0)).current;

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
  

      {/* Bloco topo */}
      <View style={styles.blocoTopo}>
        <Image
          source={{uri: `${API_URL}/storage/${itemSelecionado.fotoUsuario}`}}
          style={styles.foto}
        />
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.nome}>{itemSelecionado.nomeUsuario}</Text>
          <Text style={styles.idade}>78 anos</Text>

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
            <Text style={styles.tituloSecao}>Saúde</Text>

            <View style={styles.cartao}>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Condições:</Text> Hipertensão, Diabetes
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Administração de Medicamentos:</Text> Diariamente
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Alergias:</Text> Nenhuma
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Autonomia:</Text> Cadeirante
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Higiene:</Text> Ajuda com banho
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Alimentação:</Text> Dieta especial
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Dieta:</Text> Vegetariano, sem açúcar, sem sal, sem pimenta, sem arroz
              </Text>
            </View>

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
            <Text style={styles.tituloSecao}>Cognitivo / Emocional</Text>

            <View style={styles.cartao}>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Estado:</Text> Lúcido
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Emocional:</Text> Agressivo
              </Text>
              <Text style={styles.linhaInfo}>
                <Text style={styles.rotulo}>Comportamentos:</Text> Resistência ao banho
              </Text>
            </View>

            <Text style={styles.tituloEndere}>Endereço</Text>
            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Rua: </Text>{itemSelecionado.ruaUsuario}
            </Text>
            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Cep: </Text>{itemSelecionado.cepUsuario}
            </Text>
            <Text style={styles.linhaInfo}>
              <Text style={styles.rotulo}>Cidade: </Text>{itemSelecionado.cidadeUsuario}
            </Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  navBar: {
    backgroundColor: '#b08cff',
    paddingTop: 40,
    paddingVertical: 16,
    alignItems: 'center',
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
});
