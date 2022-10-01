/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');
const {resolve } = require("path");
const localPaths = [resolve(__dirname, "../api-client")]
console.log(localPaths);
module.exports = (async () => {
  const {
    watchFolders,
    resolver: { sourceExts, assetExts, nodeModulePaths},
  } = await getDefaultConfig();
  return {
    transformer: {
      experimentalImportSupport: false,
      inlineRequires: true,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      nodeModulePaths: [
        ...(nodeModulePaths || []),
        ...localPaths
      ]
    },
    watchFolders: [...(watchFolders || []), ...localPaths]
  };
})();