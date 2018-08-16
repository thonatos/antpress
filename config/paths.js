'use strict';

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const getEntries = relativeDir => {
  const pages = fse.readdirSync(relativeDir);
  return pages.map(page => {
    const entry = path.join(relativeDir, page, 'entry.js');
    const template = path.join(relativeDir, page, 'template.html');
    const hasTemplate = fse.pathExistsSync(template);

    return {
      page,
      entry: resolveApp(entry),
      template: hasTemplate ? resolveApp(template) : null,
    };
  });
};

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const targetBuild =
  (process.env.ANTPRESS_WORKSPACE &&
    path.join(process.env.ANTPRESS_WORKSPACE, 'build')) ||
  null;

const targetPublic =
  (process.env.ANTPRESS_WORKSPACE &&
    path.join(process.env.ANTPRESS_WORKSPACE, 'public')) ||
  null;

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  // appBuild: resolveApp('build'),
  appBuild: targetBuild || resolveApp('build'),
  appPublic: targetPublic || resolveApp('theme/public'),
  appHtml: resolveApp('theme/public/index.html'),
  // appIndexJs: resolveApp('theme/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('theme'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  appEntries: getEntries('theme/page'),
};
