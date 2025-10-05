import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// 🔹 Componente Bolinha Animada
const RatingDots = () => {
  const scales = [
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
    useRef(new Animated.Value(1)).current,
  ];

  useEffect(() => {
    const animations = scales.map((scale, index) =>
      Animated.sequence([
        Animated.delay(index * 200),
        Animated.timing(scale, { toValue: 1.6, duration: 300, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
      ])
    );

    Animated.loop(Animated.sequence(animations)).start();
  }, []);

  return (
    <View style={styles.ratingContainer}>
      {scales.map((scale, i) => (
        <Animated.View key={i} style={[styles.ratingDot, { transform: [{ scale }] }]} />
      ))}
    </View>
  );
};

// Avatar da cuidadora
const CaregiverAvatar = () => (
  <View style={styles.avatar}>
    <Text style={styles.avatarSimulatedIcon}>👵</Text>
  </View>
);

// Botões de ação
const ActionButton = ({ iconName, onPress, text, iconStyle = {} }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <FontAwesome name={iconName} size={35} color="#000" style={iconStyle} />
    <Text style={styles.actionButtonText}>{text}</Text>
  </TouchableOpacity>
);

export default function HomeFamiliar({navigation}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Conteúdo */}
        <View style={styles.content}>
          {/* Card Serviço */}
          <View style={styles.serviceCard}>
            <Text style={styles.serviceTitle}>Serviço em Andamento</Text>
            <View style={styles.caregiverInfo}>
              <CaregiverAvatar />
              <View>
                <Text style={styles.caregiverName}>Nome Sobrenome</Text>
                <RatingDots />
              </View>
            </View>
          </View>

          {/* Botões de ação */}
          <View style={styles.buttonGrid}>
            <ActionButton iconName="users" text="Cuidadores" />
            <ActionButton iconName="heart" text="Favoritos" iconStyle={{ color: 'black' }} />
            <ActionButton iconName="comment-dots" text="Conversas" />
            <ActionButton onPress={() => navigation.navigate('Adicionar')} iconName="link" text="Adicionar Idoso" />
          </View>

          {/* Ícone volume */}
          <View style={styles.volumeIconContainer}>
            <Ionicons name="volume-medium-outline" size={40} color="#000" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  container: { flex: 1, backgroundColor: '#ffffff' },

  content: { flex: 1, paddingHorizontal: 35, paddingTop: 100 },

  serviceCard: {
    backgroundColor: '#b7bff4',
    borderRadius: 25,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: { fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: '#000', marginBottom: 5 },
  caregiverInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#F56414',
  },
  avatarSimulatedIcon: { fontSize: 40 },
  caregiverName: { fontSize: 20, color: '#000', marginBottom: 10 },
  ratingContainer: { flexDirection: 'row' },
  ratingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginRight: 5,
    opacity: 0.7,
  },

  buttonGrid: {
    height: 260,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#b7bff4',
    borderRadius: 20,
    paddingVertical: 30,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },

  volumeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F56414',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});