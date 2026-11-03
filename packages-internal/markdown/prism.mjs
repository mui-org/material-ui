import prism from 'prismjs';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-tsx.js';

function highlight(code, language) {
  let prismLanguage;
  switch (language) {
    case 'ts':
      prismLanguage = prism.languages.tsx;
      break;

    case 'js':
      prismLanguage = prism.languages.jsx;
      break;

    case 'sh':
      throw new Error(
        [
          `docs-infra: Unsupported language: "sh" in:`,
          '',
          '```sh',
          code,
          '```',
          '',
          'Use "bash" instead.',
          '',
        ].join('\n'),
      );

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

export default highlight;
