import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, Platform, StyleSheet, TextInput, Pressable, FlatList, Modal, Dimensions } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from "./colors";
import { UserContext } from "./userContext";
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Checkbox } from 'react-native-paper';

const { width, height } = Dimensions.get("window");

export default function Cadastro({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [etapa, setEtapa] = useState(1);

  const [data, setData] = useState("");
  const [horarioIn, setHorarioIn] = useState("");
  const [horarioT, setHorarioT] = useState("");
  const [abrir, setAbrir] = useState(false);

  // Checkboxes aqui 
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [abrirOutro, setAbrirOutro] = useState(false);
  const [textoOutro, setTextoOutro] = useState("");

  // Endereços aqui 
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tipoEndereco, setTipoEndereco] = useState(null);
  const [enderecoUsuario, setEnderecoUsuario] = useState("");
  const [ruaUsuario, setRuaUsuario] = useState("");
  const [enderecoOrigem, setEnderecoOrigem] = useState("");
  const [enderecoDestino, setEnderecoDestino] = useState("");
  const [enderecosCadastrados, setEnderecosCadastrados] = useState([
    { id: 1, nome: "Casa", endereco: "Rua das Flores, 123" },
    { id: 2, nome: "Hospital", endereco: "Hospital Central, 45" },
  ]);

  // Campos do novo endereço
const [numLogradouroUsuario, setNumLogradouroUsuario] = useState("");
const [bairroUsuario, setBairroUsuario] = useState("");
const [cidadeUsuario, setCidadeUsuario] = useState("");
const [estadoUsuario, setEstadoUsuario] = useState("");
const [complementoEndereco, setComplementoEndereco] = useState("");
const [cepUsuario, setCepUsuario] = useState("");
const [nomeNovoEndereco, setNomeNovoEndereco] = useState("");


  //Dropdownzin aqui
  const [genero, setGenero] = useState(null);
  const [openGenero, setOpenGenero] = useState(false);
  const [itemsGenero, setItemsGenero] = useState([
    { label: 'Homem', value: 'homem' },
    { label: 'Mulher', value: 'mulher' },
    { label: 'Tanto faz', value: 'tanto_faz' },
  ]);

   const [modalFinal, setModalFinal] = useState(false);

  const totalEtapas = 5;

  const formatarData = (date) => {
    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (date) => {
    const hora = date.getHours().toString().padStart(2, "0");
    const minuto = date.getMinutes().toString().padStart(2, "0");
    return `${hora}:${minuto}`;
  };

  const abrirDatePicker = () => {
    if (Platform.OS === "web") {
      const dataSelecionada = prompt("Digite a data (aaaa-mm-dd):");
      if (dataSelecionada) {
        const [ano, mes, dia] = dataSelecionada.split("-");
        setData(`${dia}/${mes}/${ano}`);
      }
    } else {
      DateTimePickerAndroid.open({
        value: new Date(),
        mode: "date",
        onChange: (event, selectedDate) => {
          if (selectedDate) setData(formatarData(selectedDate));
        },
      });
    }
  };

  const abrirTimePicker = (setHorario) => {
    if (Platform.OS === "web") {
      const hora = prompt("Digite o horário (hh:mm):");
      if (hora) setHorario(hora);
    } else {
      DateTimePickerAndroid.open({
        value: new Date(),
        mode: "time",
        is24Hour: true,
        onChange: (event, selectedDate) => {
          if (selectedDate) setHorario(formatarHora(selectedDate));
        },
      });
    }
  };

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

  const nomeServicosSelecionados = [];
  if (checked1) nomeServicosSelecionados.push('Acompanhamento Médico');
  if (checked2) nomeServicosSelecionados.push('Acompanhamento Domiciliar');
  if (checked3) nomeServicosSelecionados.push('Locomoção');
  if (checked4) nomeServicosSelecionados.push('Outro');
  if (abrirOutro && textoOutro.trim() !== '') nomeServicosSelecionados.push(textoOutro.trim());

  return (
    <View style={styles.container}>
      
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
        </TouchableOpacity>
        <Text style={styles.navTitulo}>Solicitação</Text>
        <TouchableOpacity onPress={() => navigation.navigate('configuracoes')}>
          <Ionicons name="settings-outline" size={28} color={colors.preto} />
        </TouchableOpacity>
      </View>

            <TouchableOpacity style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
              <Image source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
            </TouchableOpacity>
          

      {etapa === 1 && (
        <View style={styles.form}>
          <Progresso />
          <Text style={styles.title}>Sobre o Serviço, Responda:</Text>
          <Image source={require('../../assets/images/cronograma.png')} style={styles.image} />

          <TouchableOpacity style={styles.input} onPress={abrirDatePicker}>
            <Text style={styles.inputText}>{data || "Escolha a Data"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input} onPress={() => abrirTimePicker(setHorarioIn)}>
            <Text style={styles.inputText}>{horarioIn || "Horário de Início"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.input} onPress={() => abrirTimePicker(setHorarioT)}>
            <Text style={styles.inputText}>{horarioT || "Horário de Término"}</Text>
          </TouchableOpacity>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(2)}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {etapa === 2 && (
        <View style={styles.form}>
          <Progresso />
          <Text style={styles.title}>Dentre essas opções, para que precisa de um cuidador?</Text>
          <Image source={require('../../assets/images/cuidador.png')} style={styles.image} />

          <View style={styles.checkboxContainer}>
            {[ 
              { label: "Acompanhamento Médico", checked: checked1, setChecked: setChecked1 },
              { label: "Acompanhamento Domiciliar", checked: checked2, setChecked: setChecked2 },
              { label: "Locomoção", checked: checked3, setChecked: setChecked3 },
              { label: "Outro", checked: checked4, setChecked: setChecked4 },
            ].map((item, i) => (
              <View key={i} style={styles.checkboxes}>
                <Checkbox
                  status={item.checked ? 'checked' : 'unchecked'}
                  onPress={() => item.setChecked(!item.checked)}
                  color={colors.azul}
                />
                <Text style={styles.checkOpicoes}>{item.label}</Text>
              </View>
            ))}
          </View>


          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(1)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(3)}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {etapa === 3 && (
        <View style={styles.form}>
          <Progresso />
            <Text style={styles.title}>Nos de uma breve descrição do que precisa</Text> 
            <Image source={require('../../assets/images/idoso.png')} style={styles.image} />

            <TextInput
              style={styles.inputDescricao}
              placeholder="Descreva suas necessidades..."
              value={textoOutro}
              onChangeText={setTextoOutro}
              multiline={true}          
              numberOfLines={4}          
              textAlignVertical="top"
            />

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(2)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(4)}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}

      {etapa === 4 && (
        <View style={styles.form}>
          <Progresso />
          <Text style={styles.title}>Qual o Endereço do Serviço?</Text>
          <Image source={require('../../assets/images/mapa.png')} style={styles.image} />

          {checked3 ? (
            <>
              <Pressable onPress={() => { setTipoEndereco("origem"); setModalVisivel(true); }}>
                <View pointerEvents="none">
                  <TextInput 
                    style={styles.input} 
                    placeholder="Endereço de Origem" 
                    value={enderecoOrigem} 
                    editable={false} 
                />
                </View>
              </Pressable>
              <Pressable onPress={() => { setTipoEndereco("destino"); setModalVisivel(true); }}>
                <View pointerEvents="none">
                  <TextInput 
                    style={styles.input} 
                    placeholder="Endereço de Destino"
                    value={enderecoDestino} 
                    editable={false} 
                />
                </View>
              </Pressable>
            </>
          ) : (
            <Pressable onPress={() => { setTipoEndereco("usuario"); setModalVisivel(true); }}>
              <View pointerEvents="none">
                <TextInput 
                  style={styles.input} 
                  placeholder="Selecione um endereço" 
                  value={enderecoUsuario} 
                  editable={false} 
                />
              </View>
            </Pressable>
          )}

<Modal visible={modalVisivel} transparent animationType="slide" onRequestClose={() => setModalVisivel(false)}>
  <View style={styles.modalFundo}>
    <View style={styles.modalContainer}>
      {!abrir ? (
        <>
          <Text style={styles.modalTitulo}>Escolha um endereço</Text>

          <FlatList
            data={enderecosCadastrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.enderecoItem}
                onPress={() => {
                  if (tipoEndereco === "usuario") setEnderecoUsuario(item.endereco);
                  if (tipoEndereco === "origem") setEnderecoOrigem(item.endereco);
                  if (tipoEndereco === "destino") setEnderecoDestino(item.endereco);
                  setModalVisivel(false);
                }}
              >
                <Text style={styles.enderecoNome}>{item.nome}</Text>
                <Text style={styles.enderecoTexto}>{item.endereco}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.outros} onPress={() => setAbrir(true)}>
            <Text style={styles.outrosText}>Adicionar novo Endereço</Text>
            <Ionicons name="add-circle" size={32} color="#a4e9e5" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fecharModal} onPress={() => setModalVisivel(false)}>
            <Text style={styles.fecharText}>Fechar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.modalTitulo}>Cadastrar novo endereço</Text>
          

          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Nome do endereço (ex: Casa, Trabalho)"
            value={nomeNovoEndereco}
            onChangeText={setNomeNovoEndereco}
          />

          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="CEP"
            keyboardType="numeric"
            value={cepUsuario}
            onChangeText={setCepUsuario}
          />

          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Rua / Avenida"
            value={ruaUsuario}
            onChangeText={setRuaUsuario}
          />
          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Número"
            keyboardType="numeric"
            value={numLogradouroUsuario}
            onChangeText={setNumLogradouroUsuario}
          />
          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Bairro"
            value={bairroUsuario}
            onChangeText={setBairroUsuario}
          />
          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Complemento (Apto, Casa, Bloco...)"
            value={complementoEndereco}
            onChangeText={setComplementoEndereco}
          />
          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Cidade"
            value={cidadeUsuario}
            onChangeText={setCidadeUsuario}
          />
          <TextInput
            style={styles.inputNovoEndereco}
            placeholder="Estado"
            value={estadoUsuario}
            onChangeText={setEstadoUsuario}
          />

          <View style={styles.botoesAdd}>
            <TouchableOpacity
              style={styles.bFoto}
              onPress={() => {
                if (
                  nomeNovoEndereco.trim() &&
                  ruaUsuario.trim() &&
                  numLogradouroUsuario.trim() &&
                  bairroUsuario.trim() &&
                  complementoEndereco.trim() &&
                  cidadeUsuario.trim() &&
                  estadoUsuario.trim() &&
                  cepUsuario.trim()
                ) {
                  const novo = {
                    id: enderecosCadastrados.length + 1,
                    nome: nomeNovoEndereco,
                    endereco: `${ruaUsuario}, ${numLogradouroUsuario}`,
                  };
                  setEnderecosCadastrados((prev) => [...prev, novo]); //atualizando a lista
                  setNomeNovoEndereco("");
                  setRuaUsuario("");
                  setNumLogradouroUsuario("");
                  setBairroUsuario("");
                  setCidadeUsuario("");
                  setComplementoEndereco("");
                  setCepUsuario("");
                  setEstadoUsuario("");
                  setAbrir(false);
                } else {
                  alert("Preencha todos os campos antes de salvar!");
                }

              }}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bFoto, { backgroundColor: colors.cinza }]}
              onPress={() => setAbrir(false)}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  </View>
</Modal>


          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(3)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(5)}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {etapa === 5 && (
        <View style={styles.form}>
          <Progresso />
            <Text style={styles.title}>Tem Preferencia de Gênero?</Text> 
            <Image source={require('../../assets/images/sexologia.png')} style={styles.image} />

              <DropDownPicker
                open={openGenero}
                value={genero}
                items={itemsGenero}
                setOpen={setOpenGenero}
                setValue={setGenero}
                setItems={setItemsGenero}
                placeholder="Selecione uma opção"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropDownContainer}
              />

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.bFoto} onPress={() => setEtapa(4)}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bFoto} onPress={() =>  setModalFinal(true)}>
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={modalFinal} transparent animationType="slide" onRequestClose={() => setModalFinal(false)}>
            <View style={styles.modalFundo}>
              <View style={styles.modalContainer}>

                <Text style={styles.modalTitulo}>Solicitação Feita com Sucesso!</Text>
                <Text style={styles.modalSubTitulo}>Você receberá uma notificação quando um cuidador aceitar sua solicitação!</Text>

                <View style={styles.botoes}>
                  <TouchableOpacity style={styles.bFoto} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Entendi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>


        </View>
        )}
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.branco, 
    alignItems: "center" 
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

  nav: { 
    width: "100%", 
    paddingTop: Platform.OS === "web" ? 20 : 45, 
    paddingBottom: 10, 
    paddingHorizontal: Platform.OS === "web" ? 40 : 20, 
    height: Platform.OS === "web" ? height * 0.12 : height * 0.1, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    backgroundColor: colors.azul 
  },

  navTitulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: colors.preto 
  },

  form: { 
    width: "100%", 
    alignItems: "center", 
    marginTop: 60 
  },

  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: colors.preto ,
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },

  image: { 
    width: 120, 
    height: 120, 
    marginBottom: 40
   },
  input: { 
    width: width * 0.8, 
    height: 50, 
    borderWidth: 2, 
    borderColor: colors.preto, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 20, 
    justifyContent: "center", 
    backgroundColor: colors.branco
   },

   inputDescricao: { 
    width: width * 0.8, 
    height: 90, 
    borderWidth: 2, 
    borderColor: colors.preto, 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 20, 
    justifyContent: "center", 
    backgroundColor: colors.branco
   },

  inputText: { 
    fontSize: 16 
  },

  botoes: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: width * 0.8, 
    marginBottom: 15 
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
    marginTop: 10 
  },

  buttonText: { 
    color: colors.preto, 
    fontSize: 18,
     fontWeight: "600" 
  },
  modalSubTitulo: { 
    fontSize: 18,     
    color: colors.preto,
    textAlign: "center",
    marginBottom: 20,
  },

  progressContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginBottom: 50, 
    gap: 10 
  },

  progressStep: { 
    width: 40, 
    height: 8, 
    borderRadius: 5 
  },

  checkboxContainer: { 
    flexDirection: "column", 
    alignItems: 'center', 
    marginBottom: 10 
  },

  checkboxes: { 
    flexDirection: 'row', 
    alignItems: 'center',
     marginBottom: 12 
  },

  checkOpicoes: { 
    fontSize: 20, 
    color: colors.preto, 
    width: 250 
  },
  outros: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 30, 
    marginBottom: 10, 
    marginTop: 10,
  },
  outrosText: { 
    fontSize: 20, 
    color: colors.preto 
  },
  modalFundo: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" 
  
  },
  modalContainer: { 
    width: "85%", 
    backgroundColor: colors.branco, 
    borderRadius: 15,
    padding: 20, 
    alignItems: "center"
  },

  modalTitulo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: colors.preto, 
    marginBottom: 15 ,
    textAlign: "center",
  },

  enderecoItem: {
    width: "100%", 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderColor: colors.cinza
  },

  enderecoNome: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: colors.preto
  },

  enderecoTexto: { 
    fontSize: 16, 
    color: colors.preto, 
    opacity: 0.7 
  },

  inputNovoEndereco: {
  width: "100%",
  height: 50,
  borderWidth: 2,
  borderColor: colors.preto,
  borderRadius: 10,
  paddingHorizontal: 15,
  marginBottom: 10,
  backgroundColor: colors.branco,
},
botoesAdd: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  marginTop: 10,
},

  fecharModal: { 
    marginTop: 15, 
    backgroundColor: colors.azul,
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 10 
  },
  fecharText: { 
    color: colors.preto, 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  dropdown: {
    backgroundColor: colors.branco,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    zIndex: 1000, 
    alignSelf: 'center',
  },
  dropDownContainer: {
    backgroundColor: colors.branco,
    borderWidth: 2,
    borderColor: colors.preto,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },

});
