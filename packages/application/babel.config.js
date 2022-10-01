const presets = ['@babel/preset-react', 'module:metro-react-native-babel-preset']
const plugins = []

plugins.push(
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.js', '.json'],
      alias: {
        '@': './src',
      },
    },
  ],
  'react-native-reanimated/plugin',
  '@babel/plugin-syntax-jsx',
  ["@babel/plugin-transform-react-jsx", { "pragma":"h" }]
)

module.exports = {
  presets,
  plugins,
}
