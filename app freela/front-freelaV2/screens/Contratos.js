import React, { useState, useRef, useEffect } from 'react';
import {View,Text,ScrollView,Platform,TouchableOpacity,Animated,Dimensions,StyleSheet, Image,} from 'react-native';

const ABAS = [
  { chave: 'ativos', titulo: 'Ativos' },
  { chave: 'pendentes', titulo: 'Pendentes' },
  { chave: 'cancelados', titulo: 'Cancelados' },
];

export default function Contratos() {
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
  }, [abaAtiva, larguraAba, indicador]);

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.tituloNav}>Contratos</Text>
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

            <View style={styles.cartaoIdoso}>
              <View style={styles.cabecalhoIdoso}>
                <Image
                  source={require('../assets/perfilicon.png')}
                  style={styles.fotoIdoso}
                />
                <View>
                  <Text style={styles.nomeIdoso}>Sr. garanhao</Text>
                  <Text style={styles.subInfoIdoso}>Idade: 78 anos</Text>
                </View>
              </View>

              <View style={styles.caixaInformacoes}>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Preço: </Text>
                  <Text style={styles.rotuloP}>R$ 100,00</Text>
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Dia: </Text>Segunda-feira
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Horário: </Text>14h às 18h
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Acompanhamento: </Text>
                  medico
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Endereço: </Text>caseiro gostosao
                </Text>
                <TouchableOpacity style={styles.botaoM}> 
                  <Text style={styles.mais}>Ver Mais</Text>
                </TouchableOpacity>
              </View>
            </View>

             <View style={styles.separator}></View>

            <View style={styles.cartaoIdoso}>
              <View style={styles.cabecalhoIdoso}>
                <Image
                  source={require('../assets/perfilicon.png')}
                  style={styles.fotoIdoso}
                />
                <View>
                  <Text style={styles.nomeIdoso}>Sra. Garanhona </Text>
                  <Text style={styles.subInfoIdoso}>Idade: 99 anos</Text>
                </View>
              </View>

              <View style={styles.caixaInformacoes}>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Preço: </Text>
                  <Text style={styles.rotuloP}>R$ 100,00</Text>
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Dia: </Text>Segunda-feira
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Horário: </Text>14h às 18h
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Acompanhamento: </Text>
                  medico
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Endereço: </Text>caseiro gostosao
                </Text>
                <TouchableOpacity style={styles.botaoM}> 
                  <Text style={styles.mais}>Ver Mais</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        )}

        {abaAtiva === 1 && (
          <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>Pendentes</Text>
            <Text style={styles.subtitulo}>Contratos esperando o pagamento</Text>

            <View style={styles.cartaoIdoso}>
              <View style={styles.cabecalhoIdoso}>
                <Image
                  source={require('../assets/perfilicon.png')}
                  style={styles.fotoIdoso}
                />
                <View>
                  <Text style={styles.nomeIdoso}>Cheio das dividas</Text>
                  <Text style={styles.subInfoIdoso}>Idade: 78 anos</Text>
                </View>
              </View>

              <View style={styles.caixaInformacoes}>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Preço: </Text>
                  <Text style={styles.rotuloPP}>R$ 100,00</Text>
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Dia: </Text>Segunda-feira
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Horário: </Text>14h às 18h
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Acompanhamento: </Text>
                  medico
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Endereço: </Text>caseiro gostosao
                </Text>
              </View>
              <TouchableOpacity style={styles.botaoC}> 
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
       
        )}

        {abaAtiva === 2 && (
          <ScrollView
            contentContainerStyle={styles.conteudoScroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.titulo}>Cancelados</Text>
            <Text style={styles.subtitulo}>Contratos cancelados</Text>

            <View style={styles.cartaoIdoso}>
              <View style={styles.cabecalhoIdoso}>
                <Image
                  source={require('../assets/perfilicon.png')}
                  style={styles.fotoIdoso}
                />
                <View>
                  <Text style={styles.nomeIdoso}>Indeciso</Text>
                  <Text style={styles.subInfoIdoso}>Idade: 78 anos</Text>
                </View>
              </View>

              <View style={styles.caixaInformacoes}>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Dia: </Text>Segunda-feira
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Horário: </Text>14h às 18h
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Acompanhamento: </Text>
                  medico
                </Text>
                <Text style={styles.textoInfo}>
                  <Text style={styles.rotuloInfo}>Endereço: </Text>caseiro gostosao
                </Text>
              </View>
            </View>
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
    left: 260,  
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
});
