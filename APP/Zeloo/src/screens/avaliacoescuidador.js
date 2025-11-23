import React, { useEffect, useContext, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Image,  ScrollView, SafeAreaView, Animated, TextInput,  Modal } from "react-native";
import colors from './colors';
import { EscalarText, EscalarTouchable, EscalarImage, EscalarCard, EscalarSeparator, useAccessibility } from './AccessibilityContext';
import { UserContext } from "./userContext";
import axios from "axios";
import { API_URL } from "./link";
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Tela estilo mobile com rating por estrelas, área de texto, passo indicador e navegação inferior
export default function avaliacoescuidador({ navigation, route }) {
  const {servico} = route.params;
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const stars = [1, 2, 3, 4, 5];


  const avaliar = async () =>{
    console.log(servico)
    axios.post(`${API_URL}/api/avaliarCuidador`,{
      idProfissional:servico.idProfissional,
      idContrato:servico.idContrato,
      comentAvaliacao:note,
      notaAvaliacao:rating
    }).then(response =>{
      alert("avaliado");
    }).catch(error=>{
      console.log(error.response.data);
    })
  }

  return (
    <SafeAreaView style={styles.safe}>
       {/* TOPO */}
           <View style={styles.header}>
             <TouchableOpacity onPress={() => navigation.navigate('Home')}>
               <Ionicons name="arrow-back-outline" size={28} color={colors.preto} />
             </TouchableOpacity>
     
             <Text style={styles.titletab}>Avaliar</Text>
     
             <TouchableOpacity onPress={() => navigation.navigate('configuracoes')}>
               <Ionicons name="settings-outline" size={28} color={colors.preto} />
             </TouchableOpacity>
           </View>

      {/* Conteúdo principal */}
     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Avalie o Cuidador:</Text>
        <Text style={styles.subtitle}>Nota <Text style={{color: '#cc0000'}}>*</Text></Text>
        <View style={styles.starsRow}>
          {stars.map((s) => {
            const isActive = s <= rating;
            return (
              <TouchableOpacity
                key={s}
                style={[styles.starBox, isActive && styles.starBoxActive]}
                onPress={() => setRating(s)}
                activeOpacity={0.8}
              >
                <Ionicons name="star" size={28} style={[styles.starIcon, isActive && styles.starIconActive]} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.labelsRow}>
          <Text style={styles.labelLeft}>Péssima</Text>
          <Text style={styles.labelRight}>Excelente</Text>
        </View>

        <Text style={[styles.subtitle2, {marginTop: 22}]}>Conte nos melhor:</Text>
        <TextInput
        
          multiline
          value={note}
          onChangeText={setNote}
          placeholder=""
          style={[styles.textArea, { textAlignVertical: 'top' }]}
        />


      <TouchableOpacity style={styles.nextBtn} onPress={() => avaliar()}>
      <Text style={styles.nextText}>Avaliar</Text>
      <Ionicons name="arrow-forward" size={18} style={{marginLeft: 8}} />
      </TouchableOpacity>
          
         {/* Modal */}
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Avaliado</Text>

             

              <Text style={styles.modalReceivedText}>Avaliado com suscesso</Text>

              <TouchableOpacity
                style={[styles.actionButton,]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Dashboard');
                }}
              >
                <Image source={require('../../assets/images/correct.png')} style={styles.modalFoto} />
                <Text style={styles.buttonText}>Visualizar Ganhos</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: colors.azul,}]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>

      
        
     
    </SafeAreaView>
  );
}

const COLORS = {
  lightGreen: '#E8F8F0',
  primaryGreen: '#2F9E44',
  darkBlue: '#0B3D91',
  greyBox: '#E6E6E6',
  offWhite: '#FBFBFB',
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.offWhite },


  progressRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 6 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: '#CFCFCF', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  stepActive: { borderColor: COLORS.primaryGreen, backgroundColor: COLORS.lightGreen },
  stepText: { fontSize: 12 },
  progressLine: { flex: 1, height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 10 },

  container: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4,marginTop: 40, },
  subtitle: { fontSize: 28, color: '#333', marginBottom: 2 },
  subtitle: { fontSize: 14, color: '#333', marginBottom: 2 },

  starsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 2,     // antes era 6
},
  starBox: { backgroundColor: COLORS.greyBox, borderRadius: 10, padding: 12, marginTop: 20, alignItems: 'center', justifyContent: 'center', width: 56, height: 56 },
  starBoxActive: { backgroundColor:'#ddf1f0ff', borderColor: '#a4e9e5', borderWidth: 1 },
  starIcon: { color: '#9AA0A6' },
  starIconActive: { color: '#a4e9e5' },

  labelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 4 },
  labelLeft: { fontSize: 12, color: '#7a7a7a' },
  labelRight: { fontSize: 12, color: '#7a7a7a' },

  textArea: {
  marginTop: 20,      // antes era 8
  height: 180,        // levemente maior pra parecer mais "premium"
  borderWidth: 1,
  borderRadius: 10,

  fontSize: 18,   // aumente para 20, 22, o que quiser
  padding: 12,
  textAlignVertical: 'top',
  backgroundColor: '#fff',
  borderRadius: 10,
},

  nextBtn: {
  marginTop: 25,
  alignSelf: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.azul, 
  paddingVertical: 14,
  paddingHorizontal: 22,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOpacity: 0.04,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 2,
},


  bottomNavWrap: { paddingHorizontal: 12, paddingBottom: Platform.OS === 'ios' ? 26 : 16 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 6, marginTop: 18, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 6 },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navLabel: { fontSize: 12, marginTop: 4 },

  poweredRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  poweredText: { fontSize: 12, color: '#8b8b8b', marginRight: 8 },
  poweredLogo: { width: 18, height: 10, backgroundColor: '#000', borderRadius: 2 },
  
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.azul,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'web' ? 20 : 35,
  },
    titletab: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.preto,
    },
      overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: '#fff',
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

  modalFoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  modalReceivedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#83DBC2',
    marginBottom: 10,
  },

  actionButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});
