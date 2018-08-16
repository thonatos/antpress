'use strict';

const path = require('path');
const program = require('commander');
const pkgInfo = require('../package.json');

const dev = require('../lib/dev');
const bulid = require('../lib/build');
const config = require('../lib/config');
const render = require('../lib/render');
const workspace = process.env.ANTPRESS_WORKSPACE;

program
  .version(pkgInfo.version)
  .description(pkgInfo.description)
  .parse(process.argv);

program
  .command('build')
  .description('build site')
  .action(async () => {
    const data = await config.load(workspace);
    
    process.env.REACT_APP_ANTPRESS = JSON.stringify(data);
        
    process.chdir(path.resolve(__dirname, '..'));
    
    await bulid.run();

  });

program
  .command('render')
  .description('render')
  .action(async () => {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';

    const data = await config.load(workspace);
    
    process.env.REACT_APP_ANTPRESS = JSON.stringify(data);

    process.chdir(path.resolve(__dirname, '..'));
    render.run();
  });

program
  .command('dev')
  .description('dev')
  .action(async () => {
    const data = await config.load(workspace);

    process.env.REACT_APP_ANTPRESS = JSON.stringify(data);

    process.chdir(path.resolve(__dirname, '..'));
    dev.run();
  });

program.parse(process.argv);

if (!program.args.length) program.help();
