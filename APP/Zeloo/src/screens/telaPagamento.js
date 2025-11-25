import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Modal} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { EscalarText, EscalarTouchable, EscalarImage, useAccessibility } from './AccessibilityContext';
import { UserContext } from "./userContext";
import { API_URL } from '../screens/link';
import axios from 'axios';
import colors from "./colors";

export default function telaPagamento({ route, navigation }) {
  const { increaseScale, decreaseScale, resetScale, scale } = useAccessibility();
  const { servico } = route.params;
  const dataAtual = new Date();
  const hoje = new Date();
      const horas = String(hoje.getHours()).padStart(2, '0');
      const minutos = String(hoje.getMinutes()).padStart(2, '0');
      const segundos = String(hoje.getSeconds()).padStart(2, '0');
      const [modalAvaliacao, setModalAvaliacao] = useState(false);


      const horario = `${horas}:${minutos}:${segundos}`;

      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // 0–11 → soma 1
      const dia = String(hoje.getDate()).padStart(2, '0');

      const dataFormatada = `${ano}-${mes}-${dia}`;

  const extrato = async () =>{
    console.log("aparece???!")
    await axios.post(`${API_URL}/api/extrato`,{
      idProfissional: servico.idProfissional,
      idContrato: servico.idContrato,
      valor: servico.precoPersonalizado,
      dataExtrato: dataFormatada,
      horarioExtrato: horario,
    }).then(response =>{
      console.log("EXTRATADO!")
    }).catch(error =>{
      console.log("erro");
      console.log(error.response.error);
    })
  }
    /*
  const extrato = */
  const pagar = async () => {
    try {


      const hoje = new Date();
      const horas = String(hoje.getHours()).padStart(2, '0');
      const minutos = String(hoje.getMinutes()).padStart(2, '0');
      const segundos = String(hoje.getSeconds()).padStart(2, '0');



      const horario = `${horas}:${minutos}:${segundos}`;

      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // 0–11 → soma 1
      const dia = String(hoje.getDate()).padStart(2, '0');

      const dataFormatada = `${ano}-${mes}-${dia}`;


      const response = await axios.post(`${API_URL}/api/pagar`, {
        idContrato: servico.idContrato
      });



      if (response.data.success) {
        extrato();
        setModalAvaliacao(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

<Modal
      animationType="fade"
      transparent={true}
      visible={modalAvaliacao}
      onRequestClose={()=>setModalAvaliacao(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Contrato pago!</Text>


          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.azul }]}
            onPress={()=>navigation.navigate("Avaliar",{servico})}
          >
            <Text style={styles.buttonText}>Avaliar Cuidador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.azul }]}
            onPress={()=>navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
      {/* 🔹 Barra superior */}
      <View style={styles.nav}>
        <EscalarTouchable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28 * scale} color={colors.preto} />
        </EscalarTouchable>

        <EscalarText style={styles.navTitulo}>Tela de Pagamento</EscalarText>

        <EscalarTouchable onPress={() => navigation.navigate('configuracoes')}>
          <Ionicons name="settings-outline" size={28 * scale} color={colors.preto} />
        </EscalarTouchable>
      </View>

      {/* 🔹 Botão auditivo */}
      <EscalarTouchable style={styles.soundButton} onPress={() => alert('Auxiliar auditivo')}>
        <EscalarImage source={require('../../assets/images/audio.png')} style={styles.soundIcon} />
      </EscalarTouchable>

      {/* 🔹 Conteúdo principal */}
      <View style={styles.content}>
        <EscalarText style={styles.totalText}>Total: R${servico.precoPersonalizado}</EscalarText>
        <View style={styles.line} />

        <EscalarText style={styles.cuidadorText}>Cuidador: {servico.nomeProfissional}</EscalarText>

        <View style={styles.cuidadorSection}>
          <Image
            source={{ uri: `${API_URL}/storage/${servico.fotoProfissional}` }}
            style={styles.avatar}
          />

          <View style={styles.info}>
            <Text style={styles.avaliacao}>
              <Ionicons name="star" size={20} color="#daa520" /> 4,8 (120 avaliações)
            </Text>
            <Text style={styles.local}>
              <Ionicons name="location-sharp" size={18} color="#d0342c" /> São Paulo, SP
            </Text>
          </View>
        </View>

        {/* 🔹 Botão perfil */}
        <TouchableOpacity
          style={styles.perfilButton}
          onPress={() => navigation.navigate('Perfil Profissional', { servico })}
        >
          <Text style={styles.perfilButtonText}>Olhar Perfil do Cuidador</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        {/* 🔹 Métodos de pagamento */}
        <Text style={styles.metodoTitle}>Métodos de pagamento</Text>

        <View style={styles.metodoItem}>
          <MaterialIcons name="pix" size={24} color="#00b686" />
          <Text style={styles.metodoText}>Pix</Text>
        </View>

        <View style={styles.metodoItem}>
          <FontAwesome5 name="credit-card" size={20} color="#3b7ddd" />
          <Text style={styles.metodoText}>Cartão de Crédito</Text>
        </View>

        <View style={styles.metodoItem}>
          <FontAwesome5 name="credit-card" size={20} color="#f0ad00" />
          <Text style={styles.metodoText}>Cartão de Débito</Text>
        </View>

        <View style={styles.line} />

        {/* 🔹 Total final */}
        <Text style={styles.totalFinal}>Total: R${servico.precoPersonalizado}</Text>

        {/* 🔹 Botão pagar */}
        <TouchableOpacity style={styles.pagamentoButton} onPress={()=> pagar()}>
          <Text style={styles.pagamentoButtonText}>Efetuar Pagamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.branco,
  },

  buttonText:{
    fontWeight:'600',
  },

  nav: {
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 60 : 35,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.azul,
  },

  navTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.preto,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: 15,
  },

  totalText: {
    fontSize: 20,
    fontWeight: '500',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginVertical: 15,
  },

  cuidadorText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },

  cuidadorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
  },

  info: {
    marginLeft: 15,
  },

  avaliacao: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },

  local: {
    fontSize: 18,
    color: '#555',
  },

  perfilButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    width: '90%',
    alignSelf: 'center',
  },

  perfilButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
  },

  metodoTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  metodoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },

  metodoText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },

  totalFinal: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },

  pagamentoButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 10,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
  },

  pagamentoButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
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

  //MODAL AVALIAÇÃO
  // === MODAL ===
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.55)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalContainer: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 14,
  padding: 20,
  alignItems: 'center',
},


modalFoto: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginBottom: 12,
},

modalInfo: { marginBottom: 12 },


actionButton: {
  width: '100%',
  paddingVertical: 12,
  borderRadius: 10,
  marginTop: 10,
  alignItems: 'center',
},

openButton: {
  padding: 12,
  backgroundColor: '#ddd',
  borderRadius: 10,
  marginBottom: 20,
  alignItems: 'center',
},
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  backgroundColor: 'white',
  padding: 25,
  borderRadius: 12,
  width: '80%',
  alignItems: 'center',
},
modalText: {
  fontSize: 22,
  fontWeight: '600',
  marginBottom: 10,
},
modalReceivedText: {
  fontSize: 22,
  fontWeight: 'bold',
  fontWeight: '600',
},

modalFoto: {
  width: 80,            
  height: 80,           
  borderRadius: 60,      
  marginBottom: 15,
  resizeMode: 'cover',
},
profileImage: {
  width: 54,
  height: 54,
  borderRadius: 10,
  marginRight: 10,
},
modalReceivedText:{
  fontSize: 18,
  fontWeight: '600',
  marginLeft: 12,         
  color: '#83DBC2',
},
modalInfo:{
  flexDirection: 'row',      
  alignItems: 'center',    
  marginBottom: 20,       
  justifyContent: 'flex-start',
},
});
