import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function servico() {
  const [nomeServico, setNomeServico] = useState('');
  const [idIdosoFamilia, setIdIdosoFamilia] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [descServico, setDescServico] = useState('');
  const [dataServico, setDataServico] = useState('');
  const [horaInicioServico, setHoraInicioServico] = useState('');
  const [horaTerminoServico, setHoraTerminoServico] = useState('');
  const [idEnderecoUsuario, setIdEnderecoUsuario] = useState('');

  const handleSubmit = () => {
    // Aqui você pode pegar as variáveis e enviar para sua API
    const data = {
      nomeServico,
      idIdosoFamilia,
      tipoServico,
      descServico,
      dataServico,
      horaInicioServico,
      horaTerminoServico,
      idEnderecoUsuario,
    };
    console.log('Enviar dados:', data);
  };


  const enviarDados = async () => {
    try{
      const response =  await axios.post(`http://localhost:8000/api/storeServicos`,{nomeServico, idIdosoFamilia, tipoServico, descServico, dataServico, horaInicioServico, horaTerminoServico, idEnderecoUsuario});

      if(response.data.success){
        setUser(response.data.data);
        navigation.navigate("Home");
      }else{
     
        console.log("Erro", response.data.message);
      
      }
    }
      catch(error){
        console.error(error);
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Serviço</Text>
      <TextInput
        style={styles.input}
        value={nomeServico}
        onChangeText={setNomeServico}
        placeholder="Nome do serviço"
      />

      <Text style={styles.label}>ID Idoso/Família</Text>
      <TextInput
        style={styles.input}
        value={idIdosoFamilia}
        onChangeText={setIdIdosoFamilia}
        placeholder="ID do idoso ou família"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo do Serviço</Text>
      <TextInput
        style={styles.input}
        value={tipoServico}
        onChangeText={setTipoServico}
        placeholder="Tipo do serviço"
      />

      <Text style={styles.label}>Descrição do Serviço</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descServico}
        onChangeText={setDescServico}
        placeholder="Descrição"
        multiline
      />

      <Text style={styles.label}>Data do Serviço (AAAA-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={dataServico}
        onChangeText={setDataServico}
        placeholder="2023-08-31"
      />

      <Text style={styles.label}>Hora Início (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={horaInicioServico}
        onChangeText={setHoraInicioServico}
        placeholder="08:00"
      />

      <Text style={styles.label}>Hora Término (HH:MM)</Text>
      <TextInput
        style={styles.input}
        value={horaTerminoServico}
        onChangeText={setHoraTerminoServico}
        placeholder="17:00"
      />

      <Text style={styles.label}>ID Endereço do Usuário</Text>
      <TextInput
        style={styles.input}
        value={idEnderecoUsuario}
        onChangeText={setIdEnderecoUsuario}
        placeholder="ID do endereço"
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button title="Enviar" onPress={enviarDados} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
  },
});