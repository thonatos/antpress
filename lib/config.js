const dir = require('node-dir');
const fse = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const debug = require('debug')('antpress');

function parse(filepath) {
  const input = fse.readFileSync(filepath, 'utf8');
  return yaml.load((input && input.toString()) || '', {
    json: true,
  });
}

async function load(pathname) {
  const stat = fse.statSync(pathname);
  debug('[stat]', stat.isDirectory());

  if (!stat.isDirectory()) {
    return parse(pathname);
  }

  const tree = await dir.promiseFiles(pathname, 'all');

  const config = {};

  for (const source of tree.files) {
    debug('[source]', source);

    const [name] = source.split('.');
    const targetName = name.replace(pathname, '');
    debug('[targetName]', targetName);

    const data = parse(source);
    debug('[data]', data);

    config[targetName] = data;
  }

  return config;
}

exports.load = async workspace => {
  const antpress = path.join(workspace, '.antpress');

  if (!fse.existsSync(antpress)) {
    console.warn('No .antpress file!');
    return;
  }

  const conf = fse.readJSONSync(antpress);
  const { data: res } = conf;

  const data = {};

  for (const r in res) {
    const output = await load(path.join(workspace, res[r]));
    data[r] = output;
  }

  return {
    data,
    conf,
  };
};
