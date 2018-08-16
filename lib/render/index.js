exports.run = async () => {
  require('./register');

  const chalk = require('chalk');
  const fse = require('fs-extra');
  const path = require('path');
  const dir = require('node-dir');
  const toc = require('markdown-toc');
  const uslug = require('uslug');
  const debug = require('debug')('antpress');
  const parser = require('./parser');
  const ssr = require('./ssr');

  const antpress = JSON.parse(process.env.REACT_APP_ANTPRESS);
  const workspace = process.env.ANTPRESS_WORKSPACE;

  const { conf } = antpress;
  debug('[conf]', conf);

  const baseDir = path.join(workspace, conf.docs);
  const outputDir = path.join(workspace, conf.build);

  const tree = await dir.promiseFiles(baseDir, 'all');

  debug('[tree]', tree);

  for (const source of tree.files) {
    const [name] = source.split('.');
    const targetName = name.replace(baseDir, '');

    if (targetName === '/') {
      continue;
    }

    const target = path.join(outputDir, `${targetName}.html`);
    const input = fse.readFileSync(source).toString();
    const { info, markdown } = parser.parse(input);

    const template =
      ['/zh-cn/index', '/en/index'].indexOf(targetName) > -1 ? 'home' : 'post';

    const lang = targetName.indexOf('zh') > -1 ? 'zh' : 'en';
    const data = {
      meta: {
        info: info ||
          conf.site || {
            title: 'Antpress',
          },
      },
      content: encodeURIComponent(markdown),
      lang,
      pathname: `${targetName}.html`,
      template,
      toc: encodeURIComponent(toc(markdown, { slugify: uslug }).content || ''),
    };

    console.log(chalk.blue('[Target]'), chalk.yellow(target));

    const output = ssr.render(data);

    fse.outputFileSync(target, output);
  }
};
