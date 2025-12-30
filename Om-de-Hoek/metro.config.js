const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const webMocks = [
    'react-native-country-picker-modal',
    'react-async-hook'
  ];

  if (platform === 'web' && webMocks.includes(moduleName)) {
    return {
      filePath: path.resolve(__dirname, 'cypress/e2e/mocks/EmptyModule.js'),
      type: 'sourceFile',
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};




module.exports = withNativeWind(config, { input: './global.css' });

