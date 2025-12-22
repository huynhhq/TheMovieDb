module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@theme': './src/theme',
          '@states': './src/states',
          '@assets': './src/assets',
          '@models': './src/models',
          '@helpers': './src/helpers',
          '@components': './src/components',
          '@navigators': './src/navigators',
          '@containers': './src/containers',
        },
      },
    ],
  ],
};
