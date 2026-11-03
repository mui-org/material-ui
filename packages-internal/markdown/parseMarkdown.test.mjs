import { describe, it, expect } from 'vitest';
import {
  getContents,
  getDescription,
  getTitle,
  getHeaders,
  getCodeblock,
  renderMarkdown,
  createRender,
} from './parseMarkdown.mjs';

describe('parseMarkdown', () => {
  describe('getTitle', () => {
    it('remove backticks', () => {
      expect(
        getTitle(`
# \`@mui/styled-engine\`

<p class="description">Configuring your preferred styling library.</p>
      `),
      ).to.equal('@mui/styled-engine');
    });
  });

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

    it('remove backticks', () => {
      expect(
        getDescription(`
<p class="description">
  Some \`description\`
</p>
      `),
      ).to.equal('Some description');
    });

    it('should not be greedy', () => {
      expect(
        getDescription(`
<p class="description">
  Some description
</p>
## Foo
<p>bar</p>
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
hooks: useAlert
githubLabel: 'scope: alert'
packageName: '@mui/lab'
waiAria: https://www.w3.org/TR/wai-aria-practices/#alert
authors: ['foo', 'bar']
---
`),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        hooks: ['useAlert'],
        githubLabel: 'scope: alert',
        packageName: '@mui/lab',
        title: 'React Alert component',
        waiAria: 'https://www.w3.org/TR/wai-aria-practices/#alert',
        authors: ['foo', 'bar'],
      });
    });

    it('should work with authors broken in two lines', () => {
      expect(
        getHeaders(`
---
title: React Alert component
components: Alert, AlertTitle
authors:
  ['foo', 'bar']
---
`),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        hooks: [],
        title: 'React Alert component',
        authors: ['foo', 'bar'],
      });
    });

    it('should work with one author per line', () => {
      expect(
        getHeaders(`
---
title: React Alert component
components: Alert, AlertTitle
authors:
  [
    'foo',
    'bar',
  ]
---
    `),
      ).to.deep.equal({
        components: ['Alert', 'AlertTitle'],
        hooks: [],
        title: 'React Alert component',
        authors: ['foo', 'bar'],
      });
    });

    it('should work with quotes', () => {
      expect(
        getHeaders(`
---
title: "Our docs just got a major upgrade—here's what that means for you"
---
    `),
      ).to.deep.equal({
        title: "Our docs just got a major upgrade—here's what that means for you",
        components: [],
        hooks: [],
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

    describe('Split markdown into an array, separating codeblocks', () => {
      it('uses a `<codeblock>` tag to split', () => {
        expect(
          getContents(
            [
              '## Tabs',
              '',
              '<codeblock storageKey="package-manager">',
              '',
              '```bash npm',
              'npm install @mui/material @emotion/react @emotion/styled',
              '```',
              '',
              '```bash yarn',
              'yarn add @mui/material @emotion/react @emotion/styled',
              '```',
              '',
              '</codeblock>',
            ].join('\n'),
          ),
        ).to.deep.equal([
          '## Tabs\n\n',
          [
            '<codeblock storageKey="package-manager">',
            '',
            '```bash npm',
            'npm install @mui/material @emotion/react @emotion/styled',
            '```',
            '',
            '```bash yarn',
            'yarn add @mui/material @emotion/react @emotion/styled',
            '```',
            '',
            '</codeblock>',
          ].join('\n'),
        ]);
      });
    });
  });

  describe('getCodeblock', () => {
    it('should return undefined if no codeblock found', () => {
      const codeblock = getCodeblock('## Tabs');
      expect(codeblock).to.equal(undefined);
    });

    it('should return the codeblock', () => {
      const codeblock = getCodeblock(
        [
          '<codeblock storageKey="package-manager">',
          '',
          '```bash npm',
          'npm install @mui/material @emotion/react @emotion/styled',
          '# `@emotion/react` and `@emotion/styled` are peer dependencies',
          '```',
          '',
          '```sh yarn',
          'yarn add @mui/material @emotion/react @emotion/styled',
          '# `@emotion/react` and `@emotion/styled` are peer dependencies',
          '```',
          '',
          '</codeblock>',
        ].join('\n'),
      );
      expect(codeblock).to.deep.equal({
        type: 'codeblock',
        storageKey: 'package-manager',
        data: [
          {
            language: 'bash',
            tab: 'npm',
            code: [
              'npm install @mui/material @emotion/react @emotion/styled',
              '# `@emotion/react` and `@emotion/styled` are peer dependencies',
            ].join('\n'),
          },
          {
            language: 'sh',
            tab: 'yarn',
            code: [
              'yarn add @mui/material @emotion/react @emotion/styled',
              '# `@emotion/react` and `@emotion/styled` are peer dependencies',
            ].join('\n'),
          },
        ],
      });
    });
  });

  describe('renderMarkdown', () => {
    it('should render markdown lists correctly', () => {
      expect(
        renderMarkdown(
          [
            'The track presentation:',
            '- `normal` the track will render a bar representing the slider value.',
            '- `inverted` the track will render a bar representing the remaining slider value.',
            '- `false` the track will render without a bar.',
          ].join('\n'),
        ),
      ).to.equal(
        [
          '<p>The track presentation:</p>',
          '<ul>',
          '<li><code>normal</code> the track will render a bar representing the slider value.</li>',
          '<li><code>inverted</code> the track will render a bar representing the remaining slider value.</li>',
          '<li><code>false</code> the track will render without a bar.</li>',
          '</ul>',
          '',
        ].join('\n'),
      );
    });

    it('should render inline descriptions correctly', () => {
      expect(
        renderMarkdown(
          'Allows to control whether the dropdown is open. This is a controlled counterpart of `defaultOpen`.',
        ),
      ).to.equal(
        'Allows to control whether the dropdown is open. This is a controlled counterpart of <code>defaultOpen</code>.',
      );
    });
  });

  describe('createRender', () => {
    it('should collect headers correctly', () => {
      const context = { toc: [], headingHashes: {} };
      // eslint-disable-next-line testing-library/render-result-naming-convention
      const render = createRender(context);

      expect(
        render(
          [
            '# Accordion',
            '## Basic features 🧪',
            '## Using `slots` and `slotProps`',
            '### Specific example',
          ].join('\n'),
        ),
      ).to.equal(
        [
          `<h1>Accordion</h1>`,
          `<h2 id="basic-features"><a href="#basic-features" class="title-link-to-anchor">Basic features 🧪<span class="anchor-icon"><svg><use xlink:href="#anchor-link-icon" /></svg></span></a><button title="Post a comment" class="comment-link" data-feedback-hash="basic-features"><svg><use xlink:href="#comment-link-icon" /></svg></button></h2>`,
          `<h2 id="using-slots-and-slotprops"><a href="#using-slots-and-slotprops" class="title-link-to-anchor">Using <code>slots</code> and <code>slotProps</code><span class="anchor-icon"><svg><use xlink:href="#anchor-link-icon" /></svg></span></a><button title="Post a comment" class="comment-link" data-feedback-hash="using-slots-and-slotprops"><svg><use xlink:href="#comment-link-icon" /></svg></button></h2>`,
          `<h3 id="specific-example"><a href="#specific-example" class="title-link-to-anchor">Specific example<span class="anchor-icon"><svg><use xlink:href="#anchor-link-icon" /></svg></span></a><button title="Post a comment" class="comment-link" data-feedback-hash="specific-example"><svg><use xlink:href="#comment-link-icon" /></svg></button></h3>`,
        ].join(''),
      );

      expect(context.toc).to.deep.equal([
        {
          children: [],
          hash: 'basic-features',
          level: 2,
          text: 'Basic features 🧪',
        },
        {
          children: [
            {
              hash: 'specific-example',
              level: 3,
              text: 'Specific example',
            },
          ],
          hash: 'using-slots-and-slotprops',
          level: 2,
          text: 'Using slots and slotProps',
        },
      ]);
    });
  });
});
