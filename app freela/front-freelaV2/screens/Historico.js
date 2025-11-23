import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { UserContext } from './userContext';
import { API_URL } from './link';

export default function HistoricoContratos({navigation}) {
  const { user } = useContext(UserContext);
  const [finalizados, setFinalizados] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/vizualizarContratosFree/${user.idProfissional}/finalizado`)
      .then(response => {
        setFinalizados(response.data.data || []);
      })
      .catch(error => console.log("Erro ao buscar contratos finalizados:", error));
  }, [user.idProfissional]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Contratos Finalizados</Text>

      {finalizados.length === 0 && (
        <Text style={styles.semContratos}>Nenhum contrato finalizado ainda.</Text>
      )}

      {finalizados.map((item, index) => {
        const anoNasc = new Date(item.dataNasc).getFullYear();
        const anoAtual = new Date().getFullYear();
        const idade = anoAtual - anoNasc;

        return (
          <View key={index} style={styles.cartao}>
            <View style={styles.cabecalho}>
              <Image
                source={{ uri: `${API_URL}/storage/${item.fotoUsuario}` }}
                style={styles.foto}
              />
              <View>
                <Text style={styles.nome}>{item.nomeUsuario}</Text>
                <Text style={styles.subInfo}>Idade: {idade}</Text>
              </View>
            </View>

            <View style={styles.informacoes}>
              <Text>
                <Text style={styles.rotulo}>Preço: </Text>
                <Text style={styles.preco}>R${item.precoPersonalizado}</Text>
              </Text>
              <Text>
                <Text style={styles.rotulo}>Dia: </Text>
                {item.dataServico}
              </Text>
              <Text>
                <Text style={styles.rotulo}>Horário: </Text>
                {item.horaInicioServico}
              </Text>

              <View style={styles.botoes}> 
              {!item.jaAvaliou && (
  <TouchableOpacity
    style={styles.botaoM}
    onPress={() => navigation.navigate("Avaliar", { contrato: item })}
  >
    <Text style={styles.mais}>Avaliar</Text>
  </TouchableOpacity>
)}
                    </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#fff',
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


  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  semContratos: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 24,
  },
  cartao: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
  },
  subInfo: {
    fontSize: 14,
    color: '#555',
  },
  informacoes: {
    marginTop: 4,
  },
  rotulo: {
    fontWeight: '600',
  },
  preco: {
    color: '#b08cff',
    fontWeight: '700',
  },
});
