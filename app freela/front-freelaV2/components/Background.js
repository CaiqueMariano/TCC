import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      {/* Base branca */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]} />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
});
