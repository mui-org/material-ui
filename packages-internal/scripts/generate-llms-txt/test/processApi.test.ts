import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { processApiJson, processApiFile } from '../src/processApi';

describe('processApi', () => {
  describe('processApiJson', () => {
    it('should generate basic component API markdown', () => {
      const apiJson = {
        name: 'Button',
        imports: [
          "import Button from '@mui/material/Button';",
          "import { Button } from '@mui/material';",
        ],
        props: {
          color: {
            type: { name: 'string' },
            default: "'primary'",
            required: false,
          },
          disabled: {
            type: { name: 'bool' },
            default: 'false',
            required: false,
          },
        },
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('# Button API');
      expect(result).to.include('## Import');
      expect(result).to.include("import Button from '@mui/material/Button';");
      expect(result).to.include('## Props');
      expect(result).to.include("| color | `string` | `'primary'` | No |");
      expect(result).to.include('| disabled | `bool` | `false` | No |');
    });

    it('should handle deprecated component', () => {
      const apiJson = {
        name: 'DeprecatedComponent',
        imports: ["import DeprecatedComponent from '@mui/material/DeprecatedComponent';"],
        props: {},
        deprecated: true,
        deprecationInfo: 'Use <code>NewComponent</code> instead.',
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('> ⚠️ **Warning**: Use `NewComponent` instead.');
    });

    it('should handle deprecated props', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {
          oldProp: {
            type: { name: 'string' },
            deprecated: true,
            deprecationInfo: 'Use <code>newProp</code> instead.',
          },
        },
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('| oldProp (deprecated) |');
      expect(result).to.include('⚠️ Use `newProp` instead.');
    });

    it('should handle complex prop types', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {
          onChange: {
            type: { name: 'func' },
            signature: {
              type: 'function(event: React.SyntheticEvent, value: number) => void',
              describedArgs: ['event', 'value'],
            },
          },
          slots: {
            type: {
              name: 'shape',
              description: '{ root?: elementType, icon?: elementType }',
            },
          },
          sx: {
            type: {
              name: 'union',
              description:
                'Array&lt;func<br>&#124;&nbsp;object&gt;<br>&#124;&nbsp;func<br>&#124;&nbsp;object',
            },
            additionalInfo: { sx: true },
          },
        },
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('`function(event: React.SyntheticEvent, value: number) => void`');
      expect(result).to.include('`{ root?: elementType, icon?: elementType }`');
      expect(result).to.include('`Array<func \\| object> \\| func \\| object`');
      expect(result).to.include('The system prop that allows defining system overrides');
    });

    it('should handle demos section', () => {
      const apiJson = {
        name: 'Accordion',
        imports: ["import Accordion from '@mui/material/Accordion';"],
        props: {},
        demos: '<ul><li><a href="/material-ui/react-accordion/">Accordion</a></li></ul>',
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('## Demos');
      expect(result).to.include('- [Accordion](/material-ui/react-accordion/)');
    });

    it('should add origin to relative URLs in demos when origin option is provided', () => {
      const apiJson = {
        name: 'Accordion',
        imports: ["import Accordion from '@mui/material/Accordion';"],
        props: {},
        demos: '<ul><li><a href="/material-ui/react-accordion/">Accordion</a></li></ul>',
      };

      const result = processApiJson(apiJson, { origin: 'https://mui.com' });

      expect(result).to.include('## Demos');
      expect(result).to.include('- [Accordion](https://mui.com/material-ui/react-accordion/)');
    });

    it('should not modify absolute URLs when origin option is provided', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        demos: '<ul><li><a href="https://example.com/demo">External Demo</a></li></ul>',
      };

      const result = processApiJson(apiJson, { origin: 'https://mui.com' });

      expect(result).to.include('- [External Demo](https://example.com/demo)');
      expect(result).to.not.include('https://mui.com/https://example.com');
    });

    it('should handle slots section', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        slots: [
          {
            name: 'root',
            description: 'The component that renders the root.',
            default: 'Paper',
            class: 'MuiComponent-root',
          },
          {
            name: 'icon',
            description: 'The icon element.',
            default: 'svg',
            class: null,
          },
        ],
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('## Slots');
      expect(result).to.include(
        '| root | `Paper` | `.MuiComponent-root` | The component that renders the root. |',
      );
      expect(result).to.include('| icon | `svg` | - | The icon element. |');
    });

    it('should handle classes section', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        classes: [
          {
            key: 'disabled',
            className: 'Mui-disabled',
            description: 'State class applied to the root element if `disabled={true}`.',
            isGlobal: true,
          },
          {
            key: 'root',
            className: 'MuiComponent-root',
            description: 'Styles applied to the root element.',
            isGlobal: false,
          },
        ],
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('## CSS');
      expect(result).to.include('### Rule name');
      expect(result).to.include(
        '| `.Mui-disabled` | - | State class applied to the root element if `disabled={true}`. |',
      );
      expect(result).to.include('| - | root | Styles applied to the root element. |');
    });

    it('should handle inheritance', () => {
      const apiJson = {
        name: 'Accordion',
        imports: ["import Accordion from '@mui/material/Accordion';"],
        props: {},
        inheritance: {
          component: 'Paper',
          pathname: '/material-ui/api/paper/',
        },
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('## Inheritance');
      expect(result).to.include('[Paper](/material-ui/api/paper/)');
      expect(result).to.include(
        'the props of the [Paper](/material-ui/api/paper/) component are also available on Accordion',
      );
    });

    it('should add origin to inheritance URLs when origin option is provided', () => {
      const apiJson = {
        name: 'Accordion',
        imports: ["import Accordion from '@mui/material/Accordion';"],
        props: {},
        inheritance: {
          component: 'Paper',
          pathname: '/material-ui/api/paper/',
        },
      };

      const result = processApiJson(apiJson, { origin: 'https://mui.com' });

      expect(result).to.include('## Inheritance');
      expect(result).to.include('[Paper](https://mui.com/material-ui/api/paper/)');
      expect(result).to.include(
        'the props of the [Paper](https://mui.com/material-ui/api/paper/) component are also available on Accordion',
      );
    });

    it('should handle spread props', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        spread: true,
        inheritance: {
          component: 'Paper',
          pathname: '/material-ui/api/paper/',
        },
      };

      const result = processApiJson(apiJson);

      expect(result).to.include(
        'Any other props supplied will be provided to the root element ([Paper](/material-ui/api/paper/))',
      );
    });

    it('should add origin to spread props inheritance URL when origin option is provided', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        spread: true,
        inheritance: {
          component: 'Paper',
          pathname: '/material-ui/api/paper/',
        },
      };

      const result = processApiJson(apiJson, { origin: 'https://mui.com' });

      expect(result).to.include(
        'Any other props supplied will be provided to the root element ([Paper](https://mui.com/material-ui/api/paper/))',
      );
    });

    it('should handle ref forwarding', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        forwardsRefTo: 'HTMLDivElement',
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('The `ref` is forwarded to the root element (HTMLDivElement)');
    });

    it('should handle components that cannot hold refs', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        forwardsRefTo: null,
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('This component cannot hold a ref');
    });

    it('should handle theme default props', () => {
      const apiJson = {
        name: 'Button',
        imports: ["import Button from '@mui/material/Button';"],
        props: {},
        themeDefaultProps: true,
        muiName: 'MuiButton',
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('## Theme default props');
      expect(result).to.include('You can use `MuiButton` to change the default props');
    });

    it('should handle source code section', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {},
        filename: '/packages/mui-material/src/Component/Component.js',
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('## Source code');
      expect(result).to.include(
        'https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Component/Component.js',
      );
    });

    it('should handle required props', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {
          children: {
            type: { name: 'node' },
            required: true,
          },
          optional: {
            type: { name: 'string' },
            required: false,
          },
        },
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('| children | `node` | - | Yes |');
      expect(result).to.include('| optional | `string` | - | No |');
    });
  });

  describe('processApiFile', () => {
    let tempDir: string;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    });

    afterEach(() => {
      fs.rmSync(tempDir, { recursive: true, force: true });
    });

    it('should process API JSON file', () => {
      const apiJson = {
        name: 'TestComponent',
        imports: ["import TestComponent from '@mui/material/TestComponent';"],
        props: {
          test: {
            type: { name: 'bool' },
            default: 'true',
          },
        },
      };

      const filePath = path.join(tempDir, 'test-component.json');
      fs.writeFileSync(filePath, JSON.stringify(apiJson, null, 2));

      const result = processApiFile(filePath);

      expect(result).to.include('# TestComponent API');
      expect(result).to.include('| test | `bool` | `true` | No |');
    });

    it('should process API JSON file with origin option', () => {
      const apiJson = {
        name: 'TestComponent',
        imports: ["import TestComponent from '@mui/material/TestComponent';"],
        props: {},
        demos: '<ul><li><a href="/material-ui/react-test/">Test Demo</a></li></ul>',
        inheritance: {
          component: 'BaseComponent',
          pathname: '/material-ui/api/base/',
        },
      };

      const filePath = path.join(tempDir, 'test-component-with-links.json');
      fs.writeFileSync(filePath, JSON.stringify(apiJson, null, 2));

      const result = processApiFile(filePath, { origin: 'https://example.com' });

      expect(result).to.include('# TestComponent API');
      expect(result).to.include('[Test Demo](https://example.com/material-ui/react-test/)');
      expect(result).to.include('[BaseComponent](https://example.com/material-ui/api/base/)');
    });
  });

  describe('HTML to Markdown conversion', () => {
    it('should convert HTML entities and tags correctly', () => {
      const apiJson = {
        name: 'Component',
        imports: ["import Component from '@mui/material/Component';"],
        props: {
          complexProp: {
            type: {
              name: 'union',
              description: 'Array&lt;func<br>&#124;&nbsp;object&gt;<br>&#124;&nbsp;func',
            },
          },
        },
        demos: '<p>Test paragraph</p><ul><li>Item 1</li><li>Item 2</li></ul>',
      };

      const result = processApiJson(apiJson);

      expect(result).to.include('`Array<func \\| object> \\| func`');
      expect(result).to.include('Test paragraph');
      expect(result).to.include('- Item 1');
      expect(result).to.include('- Item 2');
    });
  });
});
