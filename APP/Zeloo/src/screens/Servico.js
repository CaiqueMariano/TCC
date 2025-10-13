import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal,Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "./userContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
import { API_URL } from '../screens/link';
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ],
  monthNamesShort: [
    'Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez'
  ],
  dayNames: [
    'Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'
  ],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt';

import colors from './colors';

export default function Servico({navigation}) {
    const { user } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(true);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);
  const [modal6Visible, setModal6Visible] = useState(false);


  const [texto, setTexto] = useState("Nenhum detalhe foi especificado");


  const [textoE, setTextoE] = useState('');
  const [abrirE, setAbrirE] = useState(false);

  // Calendário
  const [selected, setSelected] = useState({});
  // Horario
  const [horaInicio, setHoraInicio] = useState(null);
  const [Mostrar, setMostrar] = useState(false);
  const [horaFim, setHoraFim] = useState(null);
  const [MostrarFim, setMostrarFim] = useState(false);
const [horaInicioServico, sethoraInicioServico] = ('9:00:00');
const [horaTerminoServico, sethoraTerminoServico] = ('10:00:00');
  const onChangeInicio = (event, selectedTime) => {
  const currentTime = selectedTime || horaInicio;
  if (Platform.OS === 'android') setMostrar(false);
  setHoraInicio(currentTime);
  };

  //Endereço
  const [clicado, setClicado] = useState(false);


  const onChangeFim = (event, selectedTime) => {
  const currentTime = selectedTime || horaFim;
  if (Platform.OS === 'android') setMostrarFim(false);
  setHoraFim(currentTime);
  };
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [abrir, setAbrir] = useState(false);
  const nomeServicosSelecionados = [];

  if (checked1) nomeServicosSelecionados.push('Alimentação');
  if (checked2) nomeServicosSelecionados.push('Higiene Pessoal');
  if (checked3) nomeServicosSelecionados.push('Medicação');
  if (checked4) nomeServicosSelecionados.push('Locomoção');
  if (abrir && texto.trim() !== '') nomeServicosSelecionados.push(texto.trim());
  const [checkedE, setCheckedE] = useState(false);


  const enviarDados = async () => {
    setModal5Visible(false);
    setModal6Visible(true);
    const nomeServico = nomeServicosSelecionados.join(', '); 
    const tipoServico = nomeServicosSelecionados.join(', '); 
    const dataServico = Object.keys(selected)[0] || null;
   
    const descServico = 'nome servico'; 
    const idEnderecoUsuario = 1;
  
    try {
      const response = await axios.post(
        `${API_URL}/api/storeServicos`,
        {
          nomeServico,
          idUsuario:user.idUsuario,
          tipoServico,
          descServico:texto,
          dataServico,
          horaInicioServico,
          horaTerminoServico,
          idEnderecoUsuario
        }
      );
  
      if (response.data.success) {
        console.log('Serviço enviado com sucesso!');
        navigation.navigate('Home');
      } else {
        console.log('Erro:', response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
     

          {/* Agendamento - modal */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Escolha os cuidados que você precisa:</Text>
            
            <View style={styles.checkboxContainer}>
             
             <View style={styles.checkboxes}>
                <Checkbox
                  status={checked1 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked1(!checked1)}
                  color={colors.preto}
                />
                <Text style={styles.checkOpicoes}>🍕Aliementação</Text>
              </View>
             
              <View style={styles.checkboxes}>
                <Checkbox
                  status={checked2 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked2(!checked2)}
                  color={colors.preto}
                />
                <Text style={styles.checkOpicoes}>🚽Higiene Pessoal</Text>
              </View>

              <View style={styles.checkboxes}>
                <Checkbox
                  status={checked3 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked3(!checked3)}
                  color={colors.preto}
                />
                <Text style={styles.checkOpicoes}>💊Medicação</Text>
              </View>

              <View style={styles.checkboxes}>
                <Checkbox
                  status={checked4 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked4(!checked4)}
                  color={colors.preto}
                />
                <Text style={styles.checkOpicoes}>🚗Locomoção</Text>
              </View>
            </View>

          <TouchableOpacity 
            style={styles.outros}
            onPress={() => setAbrir(!abrir)}
          >
            <Text style={styles.outrosText}>Outros Cuidados </Text>
            <Ionicons name="add-circle" size={32} color= "#6d9693" />
          </TouchableOpacity>

          
            <TextInput
              style={styles.input}
              placeholder="Descreva"
              onChangeText={setTexto}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              scrollEnabled={true}
            />
      
          <View style={styles.butoes}>
            <TouchableOpacity
              style={styles.buttonF}
              onPress={() => {
                setModalVisible(false)
                setModal2Visible(false);
                setModal3Visible(false);
                setModal4Visible(false);
                setModal5Visible(false);
                navigation.navigate('Home')
              }}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonP}
              onPress={() => {
                setModalVisible(false);
                setModal2Visible(true);
                
              }}
            >
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

       {/* Escolha a data do serviço - Modal 2*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => setModal2Visible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Escolha a data do serviço</Text>

            <Calendar
              onDayPress={day => {
                setSelected(prev => {
                  const newSelected = { ...prev };
                  if (newSelected[day.dateString]) {
                    delete newSelected[day.dateString]; // desmarca se já estiver marcado
                  } else {
                    newSelected[day.dateString] = { selected: true, marked: true, selectedColor: 'blue' };
                  }
                  return newSelected;
                });
              }}
              markedDates={selected}
            />

            <TextInput
              style={styles.inputC}
              editable={false}
              placeholder="Data Escolhida 📅"
              value={
                Object.keys(selected)[0]
                  ? new Date(Object.keys(selected)[0]).toLocaleDateString('pt-BR')
                  : ''
              }
            />

            <View style={styles.butoes}>
              <TouchableOpacity
                  style={styles.buttonV} 
                  onPress={() => {
                    setModal2Visible(false)
                    setModalVisible(true)
                  }}
                >
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.buttonP}
                  onPress={() => {
                     setModal2Visible(false)
                     setModal4Visible(false)
                     setModal5Visible(false)
                     setModal3Visible(true)
                  }}
                >
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      {/* horario - Modal 3 */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal3Visible}
            onRequestClose={() => setModal3Visible(false)}
          >
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Escolha o Horario</Text>

                  <Text style={styles.checkOpicoes}>Horario de Inicio</Text>
                  <TouchableOpacity onPress={() => setMostrar(true)}>
                    {Mostrar && (
                      <DateTimePicker
                        value={horaInicio || new Date()} // garante que sempre tenha uma data
                        mode="time"
                        is24Hour={true}  
                        display="spinner" 
                        onChange={onChangeInicio}
                      />
                    )}
                    <TextInput
                      style={styles.input}
                      editable={false}
                      placeholder="Inicio 🕐"
                      value={
                        horaInicio
                          ? horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : ''
                      }
                    />
                  </TouchableOpacity>

                  <Text style={styles.checkOpicoes}>Horario de Término</Text>
                  <TouchableOpacity onPress={() => setMostrarFim(true)}>
                    {MostrarFim && (
                      <DateTimePicker
                        value={horaFim || new Date()} // mesma lógica para fim
                        mode="time"
                        is24Hour={true}  
                        display="spinner" 
                        onChange={onChangeFim}
                      />
                    )}
                    <TextInput
                      style={styles.input}
                      editable={false}
                      placeholder="Término 🕐"
                      value={
                        horaFim
                          ? horaFim.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : ''
                      }
                    />
                  </TouchableOpacity>

                  <View style={styles.butoes}>
                    <TouchableOpacity
                      style={styles.buttonV}
                      onPress={() => {
                        setModal3Visible(false);
                        setModal2Visible(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonP}
                      onPress={() => {
                        setModal3Visible(false);
                        setModal4Visible(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </Modal>

          {/* Local do serviço - Modal 4*/}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal4Visible}
            onRequestClose={() => setModal4Visible(false)}
          >
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Escolha o Endereço do serviço</Text>

          
          <TouchableOpacity onPress={() => setClicado(!clicado)}>
              <View style={[styles.EndereçoContainer, clicado && styles.EnderVerde]}>
                <Text style={styles.Endereço}> 🏠 Endereço Padrão</Text>
              </View>
        </TouchableOpacity>
                 

                      <TouchableOpacity 
                        style={styles.outros}
                        onPress={() => setAbrirE(!abrirE)}
                      >
                        <Text style={styles.outrosText}>Outro Endereço </Text>
                        <Ionicons name="add-circle" size={32} color= "#6d9693" />
                      </TouchableOpacity>

                      {abrirE && (
                        <TextInput
                          style={styles.input}
                          placeholder="Digite ou fale o Endereço"
                          value={textoE}
                          onChangeText={setTextoE}
                          multiline={true}
                          numberOfLines={4}
                          textAlignVertical="top"
                          scrollEnabled={true}
                        />
                      )}

                  <View style={styles.butoes}>
                    <TouchableOpacity
                      style={styles.buttonV}
                      onPress={() => {
                        setModal4Visible(false);
                        setModal3Visible(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonP}
                      onPress={() => {
                        setModal4Visible(false);
                        setModal5Visible(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </Modal>

          {/* Confirmação - Modal 5*/}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal5Visible}
            onRequestClose={() => setModal5Visible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Confirmação</Text>

          <View style={styles.perfil}>
              {/*} <Image
                source={ require('./assets/images/perfil.png') }
                style={styles.foto}
              />*/}
              <Text style={styles.nome}>Alyssa de Alveredo</Text>
            </View>

            <Text style={styles.info}>Data:</Text>

              <Text style={styles.dataTexto}>
                {Object.keys(selected)[0]
                  ? new Date(Object.keys(selected)[0]).toLocaleDateString('pt-BR')
                  : 'Data 📅'}
              </Text>

              <Text style={styles.nome}>Horario:</Text>

              <Text style={styles.horarioTexto}>
                {horaInicio && horaFim
                  ? `${horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${horaFim.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                  : 'Horário 🕐'}
              </Text>

              

              <Text style={styles.nome}>Local:</Text>

              <Text style={styles.nome}>Cuidados:</Text>
                
             <View style={styles.butoes}>
                    <TouchableOpacity
                      style={styles.buttonV}
                      onPress={() => {
                        setModal5Visible(false);
                        setModal4Visible(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonP}
                      onPress={enviarDados}
                    >
                      <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
           
          </Modal>

      {/* PRONTO  - Modal 6*/}

        <Modal
            animationType="slide"
            transparent={true}
            visible={modal6Visible}
            onRequestClose={() => setModal6Visible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Seu serviço foi enviado com sucesso!</Text>

            <Text style={styles.TextF}>Por favor aguarde uma resposta do cuidador</Text>

             <View style={styles.butoes}>
                    <TouchableOpacity
                      style={styles.buttonCC}
                      onPress={() => {
                        setModal6Visible(false);
                        setModal5Visible(false);
                        setModal4Visible(false);
                        setModal3Visible(false);
                        setModal2Visible(false);
                        setModalVisible(false);
                        navigation.navigate('Home')
                      }}
                    >
                      <Text style={styles.buttonText}>Finalizar</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
           
          </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  TextF: {
    fontSize: 20,
    color: colors.preto,
    textAlign: 'center',
  },

  EndereçoContainer: {
  borderWidth: 1,
  borderColor: colors.cinza,
  padding: 10,
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
  width: 300,
  height: 60,
},
EnderVerde: {
  backgroundColor: colors.verde,
},

  Endereço: {
    fontSize: 20,
    color: colors.preto,
    width: 210,
  },
    
 /* foto */
  foto: {
    width: 120,
    height: 120,    
    marginRight: 1,     
  },

  /* Nome */
  nome: {
    fontSize: 20,
    color: colors.preto,
  },

  info: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.texto,
    marginBottom: 10,
  },

  /* Perfil */
  perfil: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20,
    justifyContent: 'center',
  },

  /* Butoes */

  button: {
    backgroundColor: colors.primaria,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',

  },

  // Confirmar

    buttonCC: {
    backgroundColor: colors.primaria,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: 130,
  },


   /* Fechar */

  buttonF: {
    backgroundColor: colors.vermelho,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: 130,
  },

   /* Próximo */

  buttonP: {
    backgroundColor: colors.primaria,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: 130,
    marginLeft: 10,
  },

    /* Cancelar */

  buttonC: {
    backgroundColor: colors.vermelho,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: 130,
    marginRight: 10,
  },

    /* Voltar */

  buttonV: {
    backgroundColor: colors.cinzaC,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: 130,
  },

    /* Voltar - grande */

  buttonVV: {
    backgroundColor: colors.cinzaC,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: 300,
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  butoes: {
    flexDirection: 'row',
    padding: 12,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
  },

   /* Sim e Não */

  butSN: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'center',
  },

   /* Modais */

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(58,88,86, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 10,
    width: '80%',
  },

  modalText: {
    fontSize: 25,
    marginBottom: 10,
    color: colors.preto,
    textAlign: 'center',
    padding: 10,
  },

   /* CheckBox */

  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  checkboxes: {
    flexDirection: 'row',   
    alignItems: 'center',   
    marginBottom: 12,     
  },

  checkboxContainerE: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },

  checkOpicoes: {
    fontSize: 20,
    color: colors.preto,
    width: 210,
  },

  outrosText: {
    fontSize: 20,
    color: colors.preto,
  },

  outros: { 
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 30,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 25,
    borderRadius: 8,
    marginBottom: 20,
    color: colors.cinza,
    fontSize: 18,
  },

  inputC: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 25,
    borderRadius: 8,
    marginTop: 20,
    color: colors.cinza,
    fontSize: 18,
  },
});
