require('babel-register')({
  ignore: [/(node_modules)/],
  presets: ['env', 'react-app'],
  plugins: [
    'dynamic-import-node',
    [
      'css-modules-transform',
      {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        extensions: ['.css', '.less'],
      },
    ],
    [
      'transform-assets',
      {
        extensions: ['svg'],
        name: '/static/media/[name].[hash:8].[ext]',
      },
    ],
    'transform-decorators-legacy',
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'theme',
      },
    ],
    [
      'import',
      {
        libraryName: 'antd',
      },
    ],
  ],
});
