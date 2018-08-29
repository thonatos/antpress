const fse = require('fs-extra');
const path = require('path');
const paths = require('./paths');

function getTheme(){
  try {
    const theme = fse.readJSONSync(path.join(paths.appSrc, 'theme.json'));
    return theme;
  } catch (error) {
    return {};
  }
}

module.exports = getTheme();
