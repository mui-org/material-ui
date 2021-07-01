import { expect } from 'chai';
import { getContents, getDescription, getHeaders, prepareMarkdown } from './parseMarkdown';

describe('parseMarkdown', () => {
  describe('getDescription', () => {
    it('trims the description', () => {
      expect(
        getDescription(`
        <p class="description">
          Some description
        </p>
      `),
      ).to.equal('Some description');
    });
  });

  describe('getHeaders', () => {
    it('should return a correct result', () => {
      expect(
        getHeaders(`
---
title: React Alert component
components: Alert, AlertTitle
githubLabel: 'component: Alert'
packageName: '@material-ui/lab'
waiAria: https://www.w3.org/TR/wai-aria-practices/#alert
authors: ['foo', 'bar']
---
`),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        githubLabel: 'component: Alert',
        packageName: '@material-ui/lab',
        title: 'React Alert component',
        waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert',
        authors: ['foo', 'bar'],
      });
    });
  });

  describe('getContents', () => {
    describe('Split markdown into an array, separating demos', () => {
      it('returns a single entry without a demo', () => {
        expect(getContents('# SomeGuide\nwhich has no demo')).to.deep.equal([
          '# SomeGuide\nwhich has no demo',
        ]);
      });

      it('uses a `{{"demo"` marker to split', () => {
        expect(
          getContents('# SomeGuide\n{{"demo": "GuideDemo.js" }}\n## NextHeading'),
        ).to.deep.equal(['# SomeGuide\n', '"demo": "GuideDemo.js" ', '\n## NextHeading']);
      });

      it('ignores possible code', () => {
        expect(getContents('# SomeGuide\n```jsx\n<Button props={{\nfoo: 1\n}}')).to.deep.equal([
          '# SomeGuide\n```jsx\n<Button props={{\nfoo: 1\n}}',
        ]);
      });
    });
  });

  describe('prepareMarkdown', () => {
    it('returns the table of contents with html and emojis stripped', () => {
      const markdown = `
# Support
## Community help (free)
### GitHub <img src="/static/images/logos/github.svg" width="24" height="24" alt="GitHub logo" loading="lazy" />
### Unofficial 👍
### Warning ⚠️
`;
      // mock require.context
      function requireRaw() {
        return markdown;
      }
      requireRaw.keys = () => ['index.md'];

      const {
        docs: {
          en: { toc },
        },
      } = prepareMarkdown({
        pageFilename: 'test',
        requireRaw,
      });

      expect(toc).to.have.deep.ordered.members([
        {
          children: [
            { hash: 'github', level: 3, text: 'GitHub' },
            { hash: 'unofficial', level: 3, text: 'Unofficial' },
            { hash: 'warning', level: 3, text: 'Warning' },
          ],
          hash: 'community-help-free',
          level: 2,
          text: 'Community help (free)',
        },
      ]);
    });

    it('enables word-break for function signatures', () => {
      const markdown = `
# Theming
## API
### responsiveFontSizes(theme, options) => theme
### createTheme(options, ...args) => theme
`;
      // mock require.context
      function requireRaw() {
        return markdown;
      }
      requireRaw.keys = () => ['index.md'];

      const {
        docs: {
          en: { toc },
        },
      } = prepareMarkdown({
        pageFilename: 'test',
        requireRaw,
      });

      expect(toc).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'responsivefontsizes-theme-options-theme',
              level: 3,
              text: 'responsiveFontSizes(&#8203;theme, options) =&gt; theme',
            },
            {
              hash: 'createtheme-options-args-theme',
              level: 3,
              text: 'createTheme(&#8203;options, ...args) =&gt; theme',
            },
          ],
          hash: 'api',
          level: 2,
          text: 'API',
        },
      ]);
    });

    it('use english hash for different locales', () => {
      const markdownEn = `
# Localization
## Locales
### Example
### Use same hash
`;

      const markdownPt = `
# Localização
## Idiomas
### Exemplo
### Usar o mesmo hash
`;

      const markdownZh = `
# 所在位置
## 语言环境
### 例
### 使用相同的哈希
`;
      // mock require.context
      function requireRaw(filename) {
        switch (filename) {
          case 'localization-pt.md':
            return markdownPt;
          case 'localization-zh.md':
            return markdownZh;
          default:
            return markdownEn;
        }
      }
      requireRaw.keys = () => ['localization-pt.md', 'localization.md', 'localization-zh.md'];

      const {
        docs: {
          en: { toc: tocEn },
          pt: { toc: tocPt },
          zh: { toc: tocZh },
        },
      } = prepareMarkdown({
        pageFilename: 'same-hash-test',
        requireRaw,
      });

      expect(tocZh).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: '例',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: '使用相同的哈希',
            },
          ],
          hash: 'locales',
          level: 2,
          text: '语言环境',
        },
      ]);

      expect(tocPt).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Exemplo',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Usar o mesmo hash',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Idiomas',
        },
      ]);

      expect(tocEn).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Example',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Use same hash',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Locales',
        },
      ]);
    });

    it('use translated hash for translations are not synced', () => {
      const markdownEn = `
# Localization
## Locales
### Example
### Use same hash
`;

      const markdownPt = `
# Localização
## Idiomas
### Exemplo
### Usar o mesmo hash
### Usar traduzido
`;

      // mock require.context
      function requireRaw(filename) {
        return filename === 'localization-pt.md' ? markdownPt : markdownEn;
      }
      requireRaw.keys = () => ['localization-pt.md', 'localization.md'];

      const {
        docs: {
          en: { toc: tocEn },
          pt: { toc: tocPt },
        },
      } = prepareMarkdown({
        pageFilename: 'same-hash-test',
        requireRaw,
      });

      expect(tocPt).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Exemplo',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Usar o mesmo hash',
            },
            {
              hash: 'usar-traduzido',
              level: 3,
              text: 'Usar traduzido',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Idiomas',
        },
      ]);

      expect(tocEn).to.have.deep.ordered.members([
        {
          children: [
            {
              hash: 'example',
              level: 3,
              text: 'Example',
            },
            {
              hash: 'use-same-hash',
              level: 3,
              text: 'Use same hash',
            },
          ],
          hash: 'locales',
          level: 2,
          text: 'Locales',
        },
      ]);
    });
  });
});
