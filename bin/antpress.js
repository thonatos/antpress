#!/usr/bin/env node

const path = require('path');
const workspace = process.cwd();

// env
process.env.ANTPRESS_WORKSPACE = workspace;
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

// chdir to load res
process.chdir(path.resolve(__dirname, '..'));

require('babel-register')({  
  // Development: ignore node_modules  
  // ignore: [/(node_modules)/],

  ignore: function(filename) {
    return filename.indexOf('antpress') === -1;
  },
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


require('../lib/antpress');
