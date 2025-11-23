import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

export default function ModalFinalizacao({
  visible,
  onClose,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Serviço Finalizado!</Text>

          <Image 
            source={require('../assets/correct.png')} 
            style={styles.profileImage} 
          />

          <Text style={styles.modalText}>
            Aguarde o Pagamento
          </Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#9575CD' }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}


const styles = {
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
};