import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Image, 
  ScrollView, 
  Platform, 
  StyleSheet 
} from 'react-native';
import colors from './colors';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { 
  EscalarText, 
  EscalarCard, 
  useAccessibility 
} from './AccessibilityContext';
import Home from './Home';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';

const { width } = Dimensions.get("window");

export default function Ativos({ navigation }) {
  const { user } = useContext(UserContext);
  const { scale } = useAccessibility();

  const [servicos, setServico] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/vizualizarContratos/${user.idUsuario}/ativo`)
      .then(response => setServico(response.data.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate(Home)}>
          <Ionicons name="arrow-back-outline" size={28 * scale} color={colors.preto} />
        </TouchableOpacity>

        <Text style={styles.title}>Ativos</Text>

        <TouchableOpacity onPress={() => navigation.navigate('configuracoes')}>
          <Ionicons name="settings-outline" size={28 * scale} color={colors.preto} />
        </TouchableOpacity>
      </View>

      {/* ABAS */}
      <View style={styles.headerTabs}>
        <TouchableOpacity onPress={() => navigation.navigate('Apagar')}>
          <EscalarText style={styles.tabText}>A Pagar</EscalarText>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Pendente')}>
          <EscalarText style={styles.tabText}>Pendentes</EscalarText>
        </TouchableOpacity>

        <View style={styles.activeTab}>
          <EscalarText style={styles.activeTabText}>Ativos</EscalarText>
          <View style={styles.activeIndicator} />
        </View>
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Platform.OS === 'web' ? width * 0.1 : width * 0.2,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}
        style={styles.content}
      >
        {servicos.length === 0 ? (
          <EscalarText style={{ marginTop: 20 }}>
            Nenhum contrato ativo encontrado.
          </EscalarText>
        ) : (
          servicos.map((servico, index) => (
            <React.Fragment key={index}>
              <EscalarCard style={styles.cardcontratro} maxScale={1.2}>
                <View style={styles.contractInfo}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Perfil Profissional", { servico })}
                  >
                    <Image
                      source={{ uri: `${API_URL}/storage/${servico.fotoProfissional}` }}
                      style={styles.foto}
                    />
                  </TouchableOpacity>

                  <View>
                    <EscalarText style={styles.contractName}>{servico.nomeProfissional}</EscalarText>
                    <EscalarText style={styles.contractStatus}>
                      Status: <Text style={styles.contractPaid}>Ativo</Text>
                    </EscalarText>
                  </View>
                </View>

                <View style={styles.separator}></View>

                <EscalarText style={styles.detalhestitulo}>
                  Detalhes do contrato
                </EscalarText>

                <View style={{ width: '100%', paddingLeft: 20 }}>
                  <EscalarText style={styles.detalhes}>
                    Dia: {servico.dataServico}
                  </EscalarText>
                  <EscalarText style={styles.detalhes}>
                    Horário: {servico.horaInicioServico}
                  </EscalarText>
                  <EscalarText style={styles.detalhes}>
                    Tipo: {servico.nomeServico}
                  </EscalarText>
                  <EscalarText style={styles.detalhes}>
                    Endereço: {servico.ruaEndereco ?? 'Não informado'}
                  </EscalarText>
                </View>

                {/* BOTÃO DE SOM SOBREPOSTO */}
                <TouchableOpacity
                  style={styles.soundButton}
                  onPress={() => alert('Auxiliar auditivo')}
                >
                  <Image
                    source={require('../../assets/images/audio.png')}
                    style={styles.soundIcon}
                  />
                </TouchableOpacity>
              </EscalarCard>
            </React.Fragment>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.azul,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'web' ? 20 : 35,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.preto,
  },

  headerTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#a4e9e5',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.preto,
    textAlign: 'center',
  },

  activeTab: {
    alignItems: 'center',
  },

  activeTabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.preto,
  },

  activeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: 'green',
    borderRadius: 2,
    marginTop: 4,
  },

  content: {
    paddingTop: 20,
  },

  cardcontratro: {
    width: 340,
    backgroundColor: '#a4e9e5',
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginVertical: 12,
    elevation: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  contractInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  foto: {
    width: 80,
    height: 80,
    borderRadius: 55,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 20,
  },

  contractName: {
    fontSize: 20,
    color: '#000',
  },

  contractStatus: {
    fontSize: 18,
    color: '#000',
  },

  contractPaid: {
    color: 'green',
    fontWeight: 'bold',
  },

  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#333',
    opacity: 0.4,
    marginVertical: 6,
  },

  detalhestitulo: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },

  detalhes: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
  },

  soundButton: {
    position: 'absolute',
    right: -50,
    top: '65%',
    transform: [{ translateY: -15 }],
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  soundIcon: {
    width: 73,
    height: 73,
    resizeMode: 'contain',
  },
});
