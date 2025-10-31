import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Background({ children }) {
  return (
    <View style={styles.container}>
      {/* Base branca */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#fff' }]} />

      {/* Gradiente principal */}
      <LinearGradient
        colors={['#fffde7', '#fff9c4', '#fff']}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Efeito spray (somente no web) */}
      {Platform.OS === 'web' && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,255,100,0.45) 0%, transparent 60%),
              radial-gradient(circle at 80% 30%, rgba(255,255,150,0.4) 0%, transparent 70%),
              radial-gradient(circle at 30% 80%, rgba(255,255,180,0.45) 0%, transparent 70%),
              radial-gradient(circle at 90% 90%, rgba(255,245,150,0.35) 0%, transparent 70%)
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
