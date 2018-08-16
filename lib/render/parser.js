const yaml = require('js-yaml');

exports.parse = post => {
  const regx = new RegExp(/(.|\n)*?---/); // regx
  const match = post.match(regx);

  if (!match) {
    return {
      info: null,
      markdown: post,
    };
  }

  const info = yaml.load(match[0].replace(/---/g, ''), {
    json: true,
  });
  const markdown = post.replace(regx, '$1'); // markdown
  return { info: info, markdown: markdown };
};
