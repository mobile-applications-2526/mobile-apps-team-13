const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add aliases for web builds
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native-country-picker-modal': require.resolve('./e2e/mocks/EmptyModule.js'),
    'react-async-hook': require.resolve('./e2e/mocks/EmptyModule.js'),
  };

  return config;
};