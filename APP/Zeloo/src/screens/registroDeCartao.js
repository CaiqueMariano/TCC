import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.form}>
        {/* 🔹 Nome */}
        <Text style={styles.label}>Nome no cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Eduardo Negri"
          placeholderTextColor="#888"
        />

        {/* 🔹 Número */}
        <Text style={styles.label}>Número do cartão</Text>
        <TextInput
          style={styles.input}
          placeholder="**** **** **** ****"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        {/* 🔹 Validade e CVV */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Validade</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="***"
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>
        </View>

        {/* 🔹 Bandeira */}
        <Text style={styles.label}>Bandeira</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.brandButton}>
            <FontAwesome5 name="cc-visa" size={30} color="#1a1f71" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.brandButton}>
            <FontAwesome5 name="cc-mastercard" size={30} color="#eb001b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.brandButton}>
            <FontAwesome5 name="cc-amex" size={30} color="#0077A6" />
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        {/* 🔹 Endereço */}
        <Text style={styles.sectionTitle}>Endereço de Cobrança</Text>

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          placeholder="00000-000"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: SP"
          maxLength={2}
          autoCapitalize="characters"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: São Paulo"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Rua / Avenida</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Avenida Paulista"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1234"
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Complemento</Text>
        <TextInput
          style={styles.input}
          placeholder="Apartamento, bloco (opcional)"
          placeholderTextColor="#888"
        />

        <View style={styles.line} />

        {/* 🔹 Botão */}
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="card-outline" size={22} color="#000" />
          <Text style={styles.saveButtonText}>Salvar Cartão</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 60,
    paddingTop: 60,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },

  form: {
    width: '100%',
  },

  line: {
    height: 20,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginTop: 30,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'left',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  column: {
    flex: 1,
    marginRight: 60,
  },

  brandButton: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    width: 120,
  },

  saveButton: {
    backgroundColor: '#aef2ea',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },

  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});