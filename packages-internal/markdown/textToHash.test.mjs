import { describe, it, expect } from 'vitest';
import { parseInline as renderInlineMarkdown } from 'marked';
import textToHash from './textToHash.mjs';

describe('textToHash', () => {
  it('should hash as expected', () => {
    const table = [
      ['createTheme(options) => theme', 'createtheme-options-theme'],
      ['Typography - Font family', 'typography-font-family'],
      ["barre d'application", 'barre-dapplication'],
      [
        'createGenerateClassName([options]) => class name generator',
        'creategenerateclassname-options-class-name-generator',
      ],
      ['@mui/material/styles vs @mui/styles', 'mui-material-styles-vs-mui-styles'],
      ['Inputs &amp; Labels', 'inputs-labels'],
      ['Inputs &#x26; Labels', 'inputs-labels'],
      ['Inputs &#38; Labels', 'inputs-labels'],
      ['Blog 📝', 'blog'],
    ];
    table.forEach((entry, index) => {
      const [markdown, expected] = entry;
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const text = renderInlineMarkdown(markdown, { mangle: false, headerIds: false });
      const actual = textToHash(text);

      expect(actual).to.equal(expected, `snapshot #${index} matches`);
    });
  });

  it('should generate a unique hash', () => {
    const unique = {};
    expect(textToHash('Styling solution', unique)).to.equal('styling-solution');
    expect(textToHash('Styling solution', unique)).to.equal('styling-solution-2');
  });
});
