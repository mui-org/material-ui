const prism = require('prismjs');
require('prismjs/components/prism-css');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-json');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-tsx');

function highlight(code, language) {
  let prismLanguage;
  switch (language) {
    case 'ts':
      prismLanguage = prism.languages.tsx;
      break;

    case 'js':
    case 'sh':
      prismLanguage = prism.languages.jsx;
      break;

    case 'diff':
      prismLanguage = { ...prism.languages.diff };
      // original `/^[-<].*$/m` matches lines starting with `<` which matches
      // <SomeComponent />
      // we will only use `-` as the deleted marker
      prismLanguage.deleted = /^[-].*$/m;
      break;

    default:
      prismLanguage = prism.languages[language];
      break;
  }

  if (!prismLanguage) {
    if (language) {
      throw new Error(`unsupported language: "${language}", "${code}"`);
    } else {
      prismLanguage = prism.languages.jsx;
    }
  }

  return prism.highlight(code, prismLanguage);
}

module.exports = highlight;
