import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { UserContext } from './userContext';
import { API_URL } from './link';

export default function HistoricoContratos() {
  const { user } = useContext(UserContext);
  const [finalizados, setFinalizados] = useState([]);

  useEffect(() => {
    // Buscar apenas contratos finalizados
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
