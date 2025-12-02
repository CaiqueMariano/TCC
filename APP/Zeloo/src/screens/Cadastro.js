import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Modal , Image } from "react-native";
import colors from "./colors";
import { TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { EscalarText, EscalarTouchable, EscalarImage, useAccessibility } from './AccessibilityContext';
import { UserContext } from "./userContext";
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
import { completarCadastro } from "../../AppM";
import { API_URL } from '../screens/link';
import * as Notifications from 'expo-notifications';



export default function Cadastro({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [etapa, setEtapa] = useState(1);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [telefoneUsuario, setTelefoneUsuario] = useState("");
  const [senhaUsuario, setSenhaUsuario] = useState("");
  const [senhaRepetida, setSenhaRepetida] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [dataNasc, setDataNascUsuario] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);



    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Mulher', value: 'mulher' },
      { label: 'Homem', value: 'homem' },
      { label: 'Outro', value: 'outro' },
    ]);

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



  const [imagem, setImagem] = useState(null);

  const solicitarPermissoes = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status !== 'granted' || galeria.status !== 'granted') {
      Alert.alert('Negado', 'Permissão negada.');
      return false;
    }
    return true;
  };

  const tirarFoto = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [8, 8],
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagem(resultado.assets[0].uri);
    }
  };

  const escolherDaGaleria = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [8, 8],
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setImagem(resultado.assets[0].uri);
    }
  };

    const [modalFotoVisible, setModalFotoVisible] = useState(false)

  const totalEtapas = 5;

  const Progresso = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalEtapas }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressStep,
            { backgroundColor: etapa > index ? colors.azul : colors.cinza },
          ]}
        />
      ))}
    </View>
  );


  const enviarDados = async () => {
    try{

      setCarregando(true);
      let dataString;
      if (dataNasc instanceof Date) {
        dataString = dataNasc.toLocaleDateString("pt-BR");
      } else {
        dataString = dataNasc;
      }
  
      const partes = dataString.split("/");
      const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
  
     
      const telefoneLimpo = telefoneUsuario.replace(/\D/g, '');

    const formData = new FormData();
    formData.append('nomeUsuario', nomeUsuario);
    formData.append('telefoneUsuario', telefoneLimpo);
    formData.append('senhaUsuario', senhaUsuario);
   // formData.append('tipoUsuario', value);
    formData.append('dataNasc', dataFormatada);

    
    if (imagem) {
      
      const filename = imagem.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('fotoUsuario', {
        uri: imagem,
        name: filename,
        type
      });
    }
       const response = await axios.post(`${API_URL}/api/usuario`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

      if(response.data.success){
        setUser(response.data.data);
        navigation.navigate("Login")
        completarCadastro();
      }else{
        setCarregando(false)
        console.log("Erro", response.data.message);
        
      
      }
    }
      catch(error){
        if (error.response?.data?.error?.includes("1062")) {
          Alert.alert("Erro", "Este telefone já está cadastrado!");
        } else if (error.request) {
          console.error("Sem resposta do servidor:", error.request);
        } else {
          console.error("Erro na requisição:", error.message);
        }
      }
    };

  const validarEtapa1 = () => {
    const apenasNumeros = (telefoneUsuario || "").replace(/\D/g, "");

    const telefoneValido =
      apenasNumeros.length === 11 &&
      apenasNumeros.startsWith("9", 2);

    const senhaIgual = senhaUsuario === senhaRepetida;

    return (
      nomeUsuario.trim().length > 0 &&
      senhaUsuario.trim().length > 0 &&
      senhaIgual &&
      telefoneValido
    );
  };
  


    const validarEtapa2 = () => {
      return dataNasc instanceof Date && value !== null;
    };



    const formatarTelefone = (valor, anterior) => {
    // Remove tudo que não for número
    let telefone = valor.replace(/\D/g, "");

      if (telefone.length < anterior.replace(/\D/g, "").length) {

        

  return valor;
  }

  telefone = telefone.slice(0, 11);

  // aplica o formato celular 
  if (telefone.length > 2 && telefone.length <= 7) {
    telefone = telefone.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (telefone.length > 7) {
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  } else if (telefone.length > 0) {
    telefone = telefone.replace(/^(\d{0,2})/, "($1");
  }

  return telefone;


};
  const { increaseScale, decreaseScale, resetScale, scale } = useAccessibility();

  return (
    <View style={styles.container}>
      <View style={styles.Form1}></View>
      <View style={styles.Form2}></View>
    
       <TouchableOpacity style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
         <Image source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/Zeloo.png')}
        style={styles.logo}
      />

{etapa === 1 && (
  <View style={styles.form}>
    <Progresso />
    <Text style={styles.title}>Faça seu Cadastro</Text>
    <TextInput
      style={styles.input}
      placeholder="Nome completo"
      onChangeText={setNomeUsuario}
    />

      <TextInput
        style={styles.input}
        placeholder="Telefone celular"
        keyboardType="numeric"
        value={telefoneUsuario}
        onChangeText={(text) =>
          setTelefoneUsuario(formatarTelefone(text, telefoneUsuario))
        }
        maxLength={15}
      />

    <View style={styles.senhaContainer}>
      <TextInput
        style={styles.senhaInput}
        placeholder="Senha"
        onChangeText={setSenhaUsuario}
        secureTextEntry={!mostrarSenha}
      />
      <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Text style={styles.senhaToggle}>{mostrarSenha ? <Ionicons size={25} name="eye-outline"></Ionicons>
 : <Ionicons name="eye-off-outline" size={25}/> }</Text>
      </TouchableOpacity>
    </View>

    
    <View style={styles.senhaContainer}>
      <TextInput
        style={styles.senhaInput}
        placeholder="Repita sua Senha"
        onChangeText={setSenhaRepetida}
        secureTextEntry={!mostrarSenha}
      />
      <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
        <Text style={styles.senhaToggle}>{mostrarSenha ? <Ionicons size={25} name="eye-outline"></Ionicons>
 : <Ionicons name="eye-off-outline" size={25}/> }</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.botoes}>
      <TouchableOpacity style={styles.bFoto} onPress={() => navigation.navigate('BemVindo')}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bFoto, { opacity: validarEtapa1() ? 1 : 0.5 }]}
          onPress={() => {
            if (validarEtapa1()) {
              setEtapa(2);
            } else {
              if (senhaUsuario !== senhaRepetida) {
                alert("As senhas não são iguais!");
              } else {
                alert("Preencha todos os campos antes de continuar!");
              }
            }
          }}
        >
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
    </View>
  </View>
)}


      {etapa === 2 && (
        <View style={styles.form}>
            <Progresso />
          <Text style={styles.title}>Faça seu Cadastro</Text>
          
          <TouchableOpacity
            style={styles.input}
            onPress={() => setMostrarCalendario(true)}
          >
            <Text style={{ color: dataNasc ? colors.preto : colors.cinza, marginTop: 10, fontSize: 16}}>
              {dataNasc ? dataNasc.toLocaleDateString() : "Qual sua data de nascimento?"}
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




            <View style={styles.dropdowncontainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropDownContainer}


                placeholder="Qual o seu Gênero?"
                placeholderStyle={{
                  color: colors.preto,    
                  fontSize: 16,            
                }}
              />
            </View>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(1)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity                
            style={[styles.bFoto, { opacity: validarEtapa2() ? 1 : 0.5 }]}
                onPress={() => {
                  if (validarEtapa2()) {
                    setEtapa(3);
                  } else {
                    alert("Selecione uma opção antes de finalizar!");
                  }
                }}
              >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
       </View>
      )}

    {etapa === 3 && (
      <View style={styles.form}>
        <Progresso />
        <Text style={styles.title}>Clique na foto para adicionar uma foto sua</Text>

        <TouchableOpacity onPress={() => setModalFotoVisible(true)}>
          <Image
            source={imagem ? { uri: imagem } : require('../../assets/images/perfil.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalFotoVisible}
          onRequestClose={() => setModalFotoVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Escolha uma opção</Text>

              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => {
                  setModalFotoVisible(false);
                  escolherDaGaleria();
                }}
              >
                <Text style={styles.modalButtonText}>Galeria</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => {
                  setModalFotoVisible(false);
                  tirarFoto();
                }}
              >
                <Text style={styles.modalButtonText}>Tirar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalButton, { backgroundColor: colors.cinza }]} 
                onPress={() => setModalFotoVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.botoes}>
          <TouchableOpacity style={styles.bFoto} 
          
          
          onPress={() => setEtapa(2)}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bFoto, {opacity: carregando ? 0.5 : imagem ? 1 : 0.5,},]}
                onPress={enviarDados}
                disabled={carregando || !imagem}
              >
            
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
    {/*{etapa === 4 && (
      <View style={styles.form}>
    
    
      
        
            <EscalarText style={styles.title}>Sua conta foi criada com sucesso!</EscalarText>
            
                  <EscalarImage
                    source={require('../../assets/images/perguntas1.jpg')}
                    style={styles.image}
                />
            
            <EscalarText style={styles.text1}>Agora precisamos de algumas informações para garantir que o cuidador atenda às suas necessidades.</EscalarText>
    
    
    
        <View style={styles.botoes}>
            <EscalarTouchable
              style={styles.bFoto}
                onPress={() => {setEtapa(5);}}
              >
                <EscalarText style={styles.buttonText}>Próximo</EscalarText>
            </EscalarTouchable>
        </View>
      </View>
    )}
    
    
          {etapa === 5 && (
            <View style={styles.form}>
    
            <EscalarText style={styles.title}>É de extrema importancia que seja honesto!</EscalarText>
            
                  <EscalarImage
                    source={require('../../assets/images/Honestidade.png')}
                    style={styles.image1}
                />
    
                <View style={styles.botoes}>
                    <EscalarTouchable
                    style={styles.bFoto}
                        onPress={() => navigation.navigate('PerguntasC')}
                    >
                        <EscalarText style={styles.buttonText}>Próximo</EscalarText>
                    </EscalarTouchable>
                </View>
            </View>
          )}*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  soundButton: {
    position: 'absolute',
    top: 430, 
    right: 15, 
    width: 45,
    height: 45,
    borderRadius: 30,

  justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    zIndex: 1002,
  },
  soundIcon: {
    width: 65,
    height: 65,
  },
    senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    height: 50,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.branco,
  },
  senhaInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  senhaToggle: {
    fontSize: 18,
    marginLeft: 10,
  },

  Form1: {
    width: width * 0.9,
    aspectRatio: 2,
    backgroundColor: colors.azul,
    borderRadius: 9999,
    transform: [{ scaleX: 1.3 }],
    position: 'absolute',
    top: -20,
    left: -60,
  },
  Form2: {
    width: height * 0.18,
    height: height * 0.4,
    backgroundColor: colors.azul,
    position: 'absolute',
    bottom: 0,
    right: -50,
    borderTopLeftRadius: height * 0.09,
    borderTopRightRadius: height * 0.09,
  },
  text1: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.preto,
  },
  image1:{
    width: 200,
    height: 150,
    marginBottom: 15,
  },
  logo: {
    left: -190,
    top: -104,      
    position: 'absolute',
    zIndex: 10,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 15,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  bFoto: {
    flex: 1,
    height: 50,
    backgroundColor: colors.azul,
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 10,
    position: 'relative', // importante
    zIndex: 20,           // maior que logo
  },
  progressStep: {
    width: 30,
    height: 8,
    borderRadius: 5,
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginTop: 200, 
  },
  input: {
    width: width * 0.8,
    height: 50,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: colors.branco,
  },
  button: {
    width: width * 0.5,
    height: 50,
    backgroundColor: colors.azul,
    borderColor: colors.preto,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.preto,
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.preto,
    textAlign: 'center',
  },
  dropdowncontainer: {
  width: width * 0.8,
  alignItems: 'center',  
  marginBottom: 20,
},
  dropdown: {
    backgroundColor: colors.branco,
    width: width * 0.8,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    marginBottom: 20,
  },
  dropDownContainer: {
    backgroundColor: colors.branco,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    width: width * 0.8,
    zIndex: 2,
  },
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
},
modalContainer: {
  width: "80%",
  backgroundColor: colors.branco,
  borderRadius: 15,
  padding: 20,
  alignItems: "center",
  elevation: 10,
},
modalTitle: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 15,
  color: colors.preto,
},
modalButton: {
  width: "100%",
  backgroundColor: colors.azul,
  paddingVertical: 12,
  borderRadius: 8,
  marginTop: 10,
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.preto,
},
modalButtonText: {
  fontSize: 16,
  color: colors.preto,
  fontWeight: "600",
},

});
