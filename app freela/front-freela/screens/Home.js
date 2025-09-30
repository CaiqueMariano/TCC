import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/screenshot.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Home</Text>
      </View>
      <View style={styles.container}>
        {/* Conteúdo vazio por enquanto */}
        <StatusBar style="light" />
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={22} color="#0a84ff" />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#fff" />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  topBar: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#fff',
  },
  navLabelActive: {
    color: '#0a84ff',
    fontWeight: '700',
  },
});


