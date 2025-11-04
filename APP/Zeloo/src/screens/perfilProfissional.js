import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { API_URL } from '../screens/link';
import { useState, useEffect } from 'react';

export default function perfilProfissional({route, navigation}) {
  const { servico } = route.params;

  const anoNasc = new Date(servico.dataNascProfissional).getFullYear();
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const [idade, setIdade] = useState("");
  const CalcularIdade =  () =>{
    const calculo = ano - anoNasc;
    setIdade(calculo);
  };

  useEffect(() => {
    CalcularIdade();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{ uri: `${API_URL}/storage/${servico.fotoProfissional}` }}
          style={styles.foto}
        />
        <Text style={styles.avaliacoes}>
          <Ionicons name="star" size={22} color="#daa520" /> 4,8 (120 avaliações)
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.local}>
          <Ionicons name="location-sharp" size={20} color="#d0342c" /> São Paulo, SP
        </Text>

        <Text style={styles.info}>Idade: {idade}</Text>
        <Text style={styles.info}>Cuidador há: 5 anos</Text>
        <Text style={styles.info}>Gênero: {servico.generoProfissional}</Text>

        <View style={styles.line} />

        <Text style={styles.sectionTitle}>Experiências e Formações:</Text>

        <View style={styles.experienciasItem}>
          <Ionicons
            name="medkit"
            size={28}
            color="#750010"
            style={styles.experienciasIcon}
          />
          <Text style={styles.experienciasText}>
            Já cuidou de: Alzheimer, pós-cirúrgicos...
          </Text>
        </View>

        <View style={styles.experienciasItem}>
          <FontAwesome5
            name="user-nurse"
            size={28}
            color="#315E63"
            style={styles.experienciasIcon}
          />
          <Text style={styles.experienciasText}>
            Formação: Curso de cuidador...
          </Text>
        </View>

        <View style={styles.nivel}>
          <Text style={styles.nivelCuidador}>
            Nível de capacidade:
          </Text>
          <TouchableOpacity onPress={() => alert('Clique para saber mais!')} style={styles.nivelButton}>
            <Text style={styles.nivelTitle}>Nível</Text>
            <Text style={styles.nivelSubtitle}>Clique para saber mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.disponibilidadeSection}>
          <Text style={styles.sectionTitle}>Disponibilidade:</Text>

          <View style={styles.disponibilidadeItem}>
            <Ionicons name="checkmark-circle-outline" size={22} color="green" style={styles.icon} />
            <Text style={styles.disponibilidadeText}>Diurno (7h–19h)</Text>
          </View>

          <View style={styles.disponibilidadeItem}>
            <Ionicons name="checkmark-circle-outline" size={22} color="green" style={styles.icon} />
            <Text style={styles.disponibilidadeText}>Fins de semana</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.precoSection}>
          <Text style={styles.sectionTitle}>Faixa de preço:</Text>
          <View style={styles.precoItem}>
            <FontAwesome5 name="money-bill-wave" size={22} color="#4caf50" style={styles.icon} />
            <Text style={styles.precoText}>R${servico.valorMin} / hora</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#b3ecec' }]}>
          <Ionicons name="document-attach-outline" size={22} color="#000" style={styles.buttonIcon} />
          <Text style={[styles.buttonText, { color: '#000' }]}>Contratar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.customButton, { backgroundColor: '#d9534f' }]}>
          <Ionicons name="alert-circle-outline" size={22} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Denunciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  foto: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  avaliacoes: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  local: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  line: {
    marginVertical: 20,
    width: '90%',
    height: 1,
    backgroundColor: '#000',
  },
  experienciasItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 40,
  },
  experienciasIcon: {
    marginRight: 16,
  },
  experienciasText: {
    fontSize: 20,
    textAlign: 'left',
    flexShrink: 1,
    color: '#333',
  },
  nivel: {
    alignItems: 'center',
    marginVertical: 24,
  },
  nivelCuidador: {
    fontWeight: 'bold',
    fontSize: 21,
    paddingBottom: 20,
  },
  nivelButton: {
    backgroundColor: '#72DA86',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  nivelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  nivelSubtitle: {
    fontSize: 18,
    color: '#212121',
  },
  disponibilidadeSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  disponibilidadeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  disponibilidadeText: {
    fontSize: 20,
  },
  precoSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  precoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 20,
  },
  precoText: {
    fontSize: 20,
    marginLeft: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    gap: 10,
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 50,
    marginHorizontal: 5,
    minWidth: 160,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonIcon: {
    marginRight: 10,
  },
});