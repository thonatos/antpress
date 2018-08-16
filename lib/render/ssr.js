const path = require('path');
const fse = require('fs-extra');

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider, addLocaleData } from 'react-intl';
import appLocaleDataZH from 'react-intl/locale-data/zh';
import appLocaleDataEN from 'react-intl/locale-data/en';

import Home from '~/page/home/';
import Post from '~/page/post/';

const extractAssets = (assets, chunks) =>
  Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);

exports.render = data => {
  const { template, lang, meta, toc, content } = data;

  // prepare
  const antpress = JSON.parse(process.env.REACT_APP_ANTPRESS);
  const workspace = process.env.ANTPRESS_WORKSPACE;

  const output = antpress.conf.build || 'build';

  const filePath = path.join(workspace, output, `_template/${template}.html`);
  let htmlData = fse.readFileSync(filePath, 'utf8');

  const manifest = fse.readJSONSync(
    path.join(workspace, output, 'asset-manifest.json'),
  );

  // render
  const locales = {
    en: {
      locale: 'en-US',
      data: appLocaleDataEN,
      messages: antpress.data['messages.en'],
    },
    zh: {
      locale: 'zh-CN',
      data: appLocaleDataZH,
      messages: antpress.data['messages.zh'],
    },
  };

  const appLocale = locales[lang];
  addLocaleData(...appLocale.data);

  const props = {
    toc,
    meta,
    content,
  };

  const modules = [];
  const html = ReactDOMServer.renderToString(
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      {template === 'home' ? <Home {...props} /> : <Post {...props} />}
    </IntlProvider>,
  );

  const extraChunks = extractAssets(manifest, modules).map(
    c => `<script type="text/javascript" src="/${c}"></script>`,
  );

  return htmlData
    .replace('<title>Antpress</title>', `<title>${meta.info.title}</title>`)
    .replace('<meta name="description" content="Antpress">', `<meta name="description" content="${meta.info.description || antpress.conf.site.description}">`)    
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)    
    .replace(
      '__INIT_STATE__={}',
      `__INIT_STATE__=${JSON.stringify({
        lang,
        props,
      })}`,
    )
    .replace('</body>', extraChunks.join('') + '</body>');
};
