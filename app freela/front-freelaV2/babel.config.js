module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel', // Adicione isso
      'react-native-reanimated/plugin', // sempre por último
    ],
  };
};