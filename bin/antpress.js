#!/usr/bin/env node

const path = require('path');
const workspace = process.cwd();

process.env.ANTPRESS_WORKSPACE = workspace;
process.chdir(path.resolve(__dirname, '..'));

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

process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production'

require('../lib/antpress');