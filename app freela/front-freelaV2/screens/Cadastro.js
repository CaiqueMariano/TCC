import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Alert, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../temas/ThemeContext';
import Background from '../components/Background';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../screens/link';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get("window");

export default function Cadastro() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState('idoso');
    const [items, setItems] = useState([
      { label: 'Masculino', value: 'masculino' },
      { label: 'Feminino', value: 'feminino' },
      { label: 'Outro', value: 'outro' },
    ]);
  // Estados para controle das etapas e dados
  const [etapa, setEtapa] = useState(1);
  const [nomeProfissional, setNomeProfissional] = useState('');
  const [emailProfissional, setEmailProfissional] = useState('');
  const [telefoneProfissional, setTelefoneProfissional] = useState('');
  const [senhaProfissional, setSenhaProfissional] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [biografia, setBiografia] = useState('');
  const [dataNasc,setDataNascUsuario] = useState("");
  const [valorMinimo, setValorMinimo] = useState('');
  
  const [imagem, setImagem] = useState(null);
  const [cpf, setCpf] = useState('');


  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  //cpf
  const validarCPF = (cpf) => {
  const apenasNumeros = cpf.replace(/\D/g, '');

  if (apenasNumeros.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(apenasNumeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(apenasNumeros.charAt(i)) * (10 - i);
  }

  let digito1 = 11 - (soma % 11);
  if (digito1 >= 10) digito1 = 0;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(apenasNumeros.charAt(i)) * (11 - i);
  }

  let digito2 = 11 - (soma % 11);
  if (digito2 >= 10) digito2 = 0;

  return digito1 === parseInt(apenasNumeros.charAt(9)) &&
         digito2 === parseInt(apenasNumeros.charAt(10));
};

  const formatarData = (texto) => {
  // Remove tudo que não é número
  let numeros = texto.replace(/\D/g, '');

  // Limita a 8 dígitos
  if (numeros.length > 8) numeros = numeros.slice(0, 8);

  // Formata DD/MM/AAAA
  if (numeros.length >= 5) {
    numeros = numeros.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
  } else if (numeros.length >= 3) {
    numeros = numeros.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  }

  setDataNascUsuario(numeros);
};

  const validarData = (data) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return false;

    const [dia, mes, ano] = data.split('/').map(Number);

    if (ano < 1900 || ano > new Date().getFullYear()) return false;
    if (mes < 1 || mes > 12) return false;
    if (dia < 1 || dia > 31) return false;

    const dataObj = new Date(ano, mes - 1, dia);

    return (
      dataObj.getFullYear() === ano &&
      dataObj.getMonth() + 1 === mes &&
      dataObj.getDate() === dia
    );
  };



const formatarCpf = (texto) => {
  let cpf = texto.replace(/\D/g, '');

  if (cpf.length > 11) cpf = cpf.slice(0, 11);

  if (cpf.length > 9) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (cpf.length > 6) {
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (cpf.length > 3) {
    cpf = cpf.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }

  setCpf(cpf);
};

//EMAIL
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


  // Formatações simples
const formatarTelefone = (texto) => {
  let numeros = texto.replace(/\D/g, '');
  if (numeros.length > 11) numeros = numeros.slice(0, 11);

  if (numeros.length > 6) {
    numeros = numeros.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
  } else if (numeros.length > 2) {
    numeros = numeros.replace(/(\d{2})(\d{1,4})/, '($1) $2');
  }

  setTelefoneProfissional(numeros);
};

const validarTelefone = (telefone) => {
  const apenasNumeros = telefone.replace(/\D/g, '');

  // fixo: 10 dígitos
  if (apenasNumeros.length === 10) return true;

  // celular: 11 dígitos e começando com 9
  if (apenasNumeros.length === 11 && apenasNumeros[2] === '9') return true;

  return false;
};


  const formatarValor = (texto) => {
    let numeros = texto.replace(/[^\d]/g, '');
    if (!numeros) {
      setValorMinimo('');
      return;
    }
    const inteiro = numeros.slice(0, Math.max(0, numeros.length - 2));
    const centavos = numeros.slice(-2).padStart(2, '0');
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setValorMinimo(`R$ ${inteiroFormatado || '0'},${centavos}`);
  };

  // Função para solicitar permissões
  const solicitarPermissoes = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status !== 'granted' || galeria.status !== 'granted') {
      Alert.alert('Negado', 'Permissão negada.');
      return false;
    }
    return true;
  };

  // Função para tirar foto
  const tirarFoto = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagem(resultado.assets[0].uri);
    }
  };

  // Função para escolher da galeria
  const escolherDaGaleria = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagem(resultado.assets[0].uri);
    }
  };

  // Componente de progresso
  const Progresso = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressStep,
            { backgroundColor: etapa > index ? '#b08cff' : '#ffffffff' },
          ]}
        />
      ))}
    </View>
  );

  // Função de envio de dados
  const enviarDados = async () => {
    try {
      if (
        !nomeProfissional.trim() ||
        !emailProfissional.trim() ||
        !senhaProfissional.trim()
      ) {
        Alert.alert("Atenção", "Preencha nome, e-mail e senha.");
        return;
      }

      const partes = dataNasc.split('/');
      const telefoneLimpo = telefoneProfissional.replace(/\D/g, '');
    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;

      const formData = new FormData();
      formData.append("nomeProfissional", nomeProfissional);
      formData.append("emailProfissional", emailProfissional);
      formData.append("telefoneProfissional", telefoneLimpo);
      formData.append("dataNascProfissional", dataFormatada);
      formData.append("generoProfissional", value);
      formData.append("senhaProfissional", senhaProfissional);
      formData.append("documentosProfissional", cpf);
      formData.append("biografiaProfissional", biografia);
      formData.append("valorMin", valorMinimo.replace(/\D/g, "")); 

      if (imagem) {
      
        const filename = imagem.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
  
        formData.append('fotoProfissional', {
          uri: imagem,
          name: filename,
          type
        });
      }


      const response = await axios.post(`${API_URL}/api/profissional`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao realizar o cadastro.");
      }
    } catch (error) {
      if (error.response) {
        console.log("Erro do servidor:", error.response.data);
      } else if (error.request) {
        console.log("Sem resposta do servidor:", error.request);
      } else {
        console.log("Erro na requisição:", error.message);
      }
    }
  };
  const validarEtapa2 = () => {

  if (!value) {
    Alert.alert("Campo obrigatório", "Selecione seu gênero.");
    return false;
  }

  if (!dataNasc) {
    Alert.alert("Campo obrigatório", "Selecione sua data de nascimento.");
    return false;
  }

  if (typeof dataNasc === "string" && !validarData(dataNasc)) {
    Alert.alert("Data inválida", "Escolha uma data de nascimento válida.");
    return false;
  }

  if (dataNasc instanceof Date) {
    const hoje = new Date();
    const idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
    const dia = hoje.getDate() - dataNasc.getDate();

    const idadeFinal = mes < 0 || (mes === 0 && dia < 0) ? idade - 1 : idade;

    if (idadeFinal < 18) {
      Alert.alert("Idade inválida", "Você deve ter pelo menos 18 anos.");
      return false;
    }
  }

  return true;
};

const avancarEtapa = () => {


  if (etapa === 1) {

    if (!nomeProfissional.trim()) {
      Alert.alert("Campo obrigatório", "Digite seu nome completo.");
      return;
    }

    if (!cpf.trim()) {
      Alert.alert("Campo obrigatório", "Digite seu CPF.");
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert("CPF inválido", "Digite um CPF válido.");
      return;
    }

    if (!emailProfissional.trim()) {
      Alert.alert("Campo obrigatório", "Digite seu e-mail.");
      return;
    }

    if (!validarEmail(emailProfissional)) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido.");
      return;
    }

    if (!telefoneProfissional.trim()) {
      Alert.alert("Campo obrigatório", "Digite seu telefone.");
      return;
    }

    if (!validarTelefone(telefoneProfissional)) {
      Alert.alert("Telefone inválido", "Digite um telefone válido.");
      return;
    }

    if (!senhaProfissional.trim()) {
      Alert.alert("Campo obrigatório", "Digite sua senha.");
      return;
    }
  }

 if (etapa === 2) {
  if (!validarEtapa2()) return;
}

if (etapa === 3) {
  if (!imagem) {
    Alert.alert("Campo obrigatório", "Adicione uma foto para continuar.");
    return;
  }
}

  if (etapa < 3) {
    setEtapa(etapa + 1);
  } else {
    Alert.alert('Sucesso', 'Cadastro concluído!');
    navigation.goBack();
  }
}

  return (
    <Background>
      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Progresso />
          <Text style={styles.loginTitle}>Cadastro</Text>
          
          {etapa === 1 && (
            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#444"
                value={nomeProfissional}
                onChangeText={setNomeProfissional}
              />
              <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#444"
                keyboardType="numeric"
                value={cpf}
                onChangeText={formatarCpf}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#444"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailProfissional}
                onChangeText={setEmailProfissional}
              />
                <TextInput
                  style={styles.input}
                  placeholder="Telefone"
                  keyboardType="numeric"
                  value={telefoneProfissional}
                  onChangeText={formatarTelefone}
                />
              <View style={styles.senhaContainer}>
                <TextInput
                  style={styles.senhaInput}
                  placeholder="Senha"
                  placeholderTextColor="#444"
                  secureTextEntry={!mostrarSenha}
                  value={senhaProfissional}
                  onChangeText={setSenhaProfissional}
                />
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <Ionicons 
                    name={mostrarSenha ? "eye-outline" : "eye-off-outline"} 
                    size={25} 
                    color="#444" 
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {etapa === 2 && (
            <View style={styles.scrollArea} contentContainerStyle={styles.scrollContent} >
              <View style={styles.dropdowncontainerV} >
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                placeholder="Gênero"
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropDownContainer}
              />
            </View>
           
          <TouchableOpacity
            style={styles.input}
            onPress={() => setMostrarCalendario(true)}
          >
            <Text style={{ color: dataNasc ? '#202020' : '#444', marginTop: 10, fontSize: 16}}>
              {dataNasc ? dataNasc.toLocaleDateString() : "data de nascimento"}
            </Text>
          </TouchableOpacity>


          {mostrarCalendario && (
            <DateTimePicker
              value={dataNasc || new Date()} 
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => {
                setMostrarCalendario(false);
                if (event.type === 'set' && selectedDate) {
                  setDataNascUsuario(selectedDate);
                }
              }}
            />
          )}
              
            </View>
          )}

          {etapa === 3 && (
            <>
              <Text style={styles.photoTitle}>Adicione uma foto sua</Text>
              <Image
                source={imagem ? { uri: imagem } : require('../assets/icon.png')}
                style={styles.photoPreview}
              />
              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoButton} onPress={escolherDaGaleria}>
                  <Text style={styles.photoButtonText}>Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photoButton} onPress={tirarFoto}>
                  <Text style={styles.photoButtonText}>Tirar Foto</Text>
                </TouchableOpacity>
              </View>
            </>
          )}


          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonSecondary]} 
              onPress={() => etapa === 1 ? navigation.goBack() : setEtapa(etapa - 1)}
            >
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                {etapa === 1 ? 'Cancelar' : 'Voltar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => {
                if (etapa < 3) {
                  
                } else {
                  enviarDados();
                }
              }}
            >
              <Text style={styles.buttonText}>
                {etapa < 3 ? 'Seguinte' : 'Finalizar'}
              </Text>
            </TouchableOpacity>
          </View>
        <StatusBar style="light" />
      </View>
    </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
    
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  loginBox: {
    width: '70%',
    backgroundColor: '#b08cff',
    padding: 20,
    paddingVertical: 28,
    minHeight: 320,
    borderRadius: 12,
    ...(Platform.select({
      web: { boxShadow: '0px 4px 12px rgba(0,0,0,0.2)' },
      default: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      },
    })),
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    color: '#111',
    marginBottom: 16,
  },
  textarea: {
    height: 100,
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffffff',
    marginRight: 8,
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#ffffffff',
    marginLeft: 8,
    flex: 1,
  },
  buttonText: {
    color: '#b08cff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  progressStep: {
    width: 30,
    height: 8,
    borderRadius: 5,
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  senhaInput: {
    flex: 1,
    fontSize: 14,
    color: '#111',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 16,
  },
  dropDownContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: width * 0.6,
    zIndex: 2,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  dropdownHeaderText: {
    color: '#111',
  },
  dropdownList: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 6,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownItemText: {
    color: '#111',
  },
  scrollArea: {
    maxHeight: 360,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 8,
  },
  dropdowncontainerV:{
     marginBottom:10,
  }, 
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  photoButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#b08cff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});


