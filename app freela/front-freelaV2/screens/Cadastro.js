import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Alert, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../temas/ThemeContext';
import Background from '../components/Background';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");

export default function Cadastro() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  // Estados para controle das etapas e dados
  const [etapa, setEtapa] = useState(1);
  const [nomeProfissional, setNomeProfissional] = useState('');
  const [emailProfissional, setEmailProfissional] = useState('');
  const [telefoneProfissional, setTelefoneProfissional] = useState('');
  const [senhaProfissional, setSenhaProfissional] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [biografia, setBiografia] = useState('');
  const [valorMinimo, setValorMinimo] = useState('');
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [mostrarDropdownArea, setMostrarDropdownArea] = useState(false);
  const [servicosOferecidos, setServicosOferecidos] = useState('');
  const [imagem, setImagem] = useState(null);

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
      {Array.from({ length: 3 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressStep,
            { backgroundColor: etapa > index ? '#b08cff' : '#ccc' },
          ]}
        />
      ))}
    </View>
  );
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
                placeholder="Nome profissional"
                placeholderTextColor="#444"
                value={nomeProfissional}
                onChangeText={setNomeProfissional}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail profissional"
                placeholderTextColor="#444"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailProfissional}
                onChangeText={setEmailProfissional}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone profissional"
                placeholderTextColor="#444"
                keyboardType="phone-pad"
                value={telefoneProfissional}
                onChangeText={formatarTelefone}
              />
              <View style={styles.senhaContainer}>
                <TextInput
                  style={styles.senhaInput}
                  placeholder="Senha profissional"
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
            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Biografia"
                placeholderTextColor="#444"
                value={biografia}
                onChangeText={setBiografia}
                multiline
                textAlignVertical="top"
              />
              <TextInput
                style={styles.input}
                placeholder="Valor mínimo (ex: R$ 50,00)"
                placeholderTextColor="#444"
                keyboardType="numeric"
                value={valorMinimo}
                onChangeText={formatarValor}
              />
              <View style={styles.dropdownContainer}>
                <TouchableOpacity style={styles.dropdownHeader} onPress={() => setMostrarDropdownArea(!mostrarDropdownArea)}>
                  <Text style={styles.dropdownHeaderText}>{areaAtuacao || 'Área de atuação'}</Text>
                  <Ionicons name={mostrarDropdownArea ? 'chevron-up' : 'chevron-down'} size={20} color="#444" />
                </TouchableOpacity>
                {mostrarDropdownArea && (
                  <View style={styles.dropdownList}>
                    {[
                      'Cuidador de idosos',
                      'Serviço de compras',
                      'Transporte',
                      'Acompanhante médico',
                      'Enfermagem',
                    ].map((opcao) => (
                      <TouchableOpacity
                        key={opcao}
                        style={styles.dropdownItem}
                        onPress={() => { setAreaAtuacao(opcao); setMostrarDropdownArea(false); }}
                      >
                        <Text style={styles.dropdownItemText}>{opcao}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Serviços oferecidos (descreva)"
                placeholderTextColor="#444"
                value={servicosOferecidos}
                onChangeText={setServicosOferecidos}
                multiline
                textAlignVertical="top"
              />
            </ScrollView>
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
                  setEtapa(etapa + 1);
                } else {
                  // Finalizar cadastro - aqui você pode integrar com sua API
                  Alert.alert('Sucesso', 'Cadastro concluído!');
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.buttonText}>
                {etapa < 3 ? 'Seguinte' : 'Finalizar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar style="light" />
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
    backgroundColor: '#8b6bc7',
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
    color: '#111',
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollArea: {
    maxHeight: 360,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 8,
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
    borderColor: '#b08cff',
    marginRight: 8,
    flex: 1,
  },
  buttonPrimary: {
    backgroundColor: '#b08cff',
    marginLeft: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
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
    fontSize: 16,
    color: '#111',
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 16,
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
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
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


