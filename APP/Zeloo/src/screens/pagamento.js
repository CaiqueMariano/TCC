import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Modal } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const paymentMethods = [
    { id: 'pix', label: 'Pix', icon: <Ionicons name="qr-code-outline" size={24} color="#00b686" /> },
    { id: 'credit', label: 'Cartão de Crédito', icon: <FontAwesome5 name="credit-card" size={20} color="#3b7ddd" /> },
    { id: 'debit', label: 'Cartão de Débito', icon: <FontAwesome5 name="credit-card" size={20} color="#f0ad00" /> },
  ];

  const handleSelectMethod = (id) => {
    setSelectedMethod(id);
    console.log(`Selecionado: ${id}`);
  };

  const handlePagamento = () => {
    if (!selectedMethod) {
      setModalVisible(true);
      return;
    }
    console.log('Pagamento efetuado com método:', selectedMethod);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total  R$00,00</Text>
      <View style={styles.line} />

      <Text style={styles.cuidadorText}>Cuidador: Ana Maria Braga</Text>

      <View style={styles.cuidadorSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png' }}
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

      <TouchableOpacity style={styles.perfilButton}>
        <Text style={styles.perfilButtonText}>Olhar Perfil do Cuidador</Text>
      </TouchableOpacity>

      <View style={styles.line} />

      <Text style={styles.metodoTitle}>Métodos de pagamento</Text>

      {paymentMethods.map(({ id, label, icon }) => (
        <Pressable
          key={id}
          style={styles.metodoItem}
          onPress={() => handleSelectMethod(id)}
        >
          {icon}
          <Text style={styles.metodoText}>{label}</Text>
          <Ionicons
            name={selectedMethod === id ? 'radio-button-on' : 'radio-button-off'}
            size={24}
            color={selectedMethod === id ? '#00b686' : '#777'}
            style={{ marginLeft: 'auto' }}
          />
        </Pressable>
      ))}

      <View style={styles.line} />
      <Text style={styles.totalFinal}>Total  R$00,00</Text>

      <TouchableOpacity style={styles.pagamentoButton} onPress={handlePagamento}>
        <Text style={styles.pagamentoButtonText}>Efetuar Pagamento</Text>
      </TouchableOpacity>

      {/* Modal de aviso */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Por favor, selecione um método de pagamento antes de continuar.</Text>
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 30,
    margin: 10,
  },
  totalText: { marginTop: 20, fontSize: 20, fontWeight: '500' },
  line: { height: 1, backgroundColor: '#000', marginVertical: 15 },
  cuidadorText: { fontSize: 20, fontWeight: '500', marginBottom: 10 },
  cuidadorSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#eee' },
  info: { marginLeft: 15 },
  avaliacao: { fontSize: 20, fontWeight: '500', color: '#333', marginBottom: 10 },
  local: { fontSize: 20, color: '#555' },
  perfilButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  perfilButtonText: { color: '#000', fontWeight: '600', fontSize: 18 },
  metodoTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10 },
  metodoItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 6, paddingVertical: 5 },
  metodoText: { fontSize: 20, marginLeft: 10, color: '#333' },
  totalFinal: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  pagamentoButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 10,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  pagamentoButtonText: { color: '#000', textAlign: 'center', fontSize: 20, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  modalButton: { backgroundColor: '#00b686', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 25 },
  modalButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
