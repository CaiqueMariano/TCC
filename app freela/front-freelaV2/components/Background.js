import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      {/* Base branca */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]} />

      {/* Gradiente principal (lilás pastel) */}
      <LinearGradient
        colors={['#f4eeff', '#e9ddff', '#ffffff']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Efeito spray (somente no web) */}
      {Platform.OS === 'web' && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(180, 140, 255, 0.25) 0%, transparent 60%),
              radial-gradient(circle at 80% 30%, rgba(200, 160, 255, 0.22) 0%, transparent 70%),
              radial-gradient(circle at 30% 80%, rgba(170, 130, 245, 0.22) 0%, transparent 70%),
              radial-gradient(circle at 90% 90%, rgba(210, 175, 255, 0.18) 0%, transparent 70%)
            `,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            zIndex: -1,
          }}
        />
      )}

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
