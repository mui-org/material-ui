import { describe, it, expect } from 'vitest';
import cssVarsParser, { assignNestedKeys, walkObjectDeep } from './cssVarsParser';

describe('cssVarsParser', () => {
  describe('assignNestedKeys', () => {
    it('does not account for null, undefined, non-object', () => {
      let result;
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal(undefined);

      result = null;
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal(null);

      result = '';
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal('');
    });

    it('build object with keys and value', () => {
      const result = {};
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal({
        a: {
          b: {
            c: 'd',
          },
        },
      });
    });

    it('does not override existing fields', () => {
      const result = {
        a: {
          b: {
            existed: true,
          },
        },
      };
      assignNestedKeys(result, ['a', 'b', 'c'], 'd');
      expect(result).to.deep.equal({
        a: {
          b: {
            existed: true,
            c: 'd',
          },
        },
      });
    });

    it('create array given by `arrayKeys`', () => {
      const result = {};
      assignNestedKeys(result, ['keys', '0'], 'xs', ['keys']);
      assignNestedKeys(result, ['keys', '2'], 'md', ['keys']);
      assignNestedKeys(result, ['keys', '1'], 'sm', ['keys']);
      expect(result).to.deep.equal({
        keys: ['xs', 'sm', 'md'],
      });
    });

    ['__proto__', 'constructor', 'prototype'].forEach((key) => {
      it(`does not pollute Object.prototype via \`${key}\``, () => {
        try {
          const result = {};
          assignNestedKeys(result, ['a', key, 'polluted'], 'yes');
          expect((result as Record<string, unknown>).polluted).to.equal(undefined);
          expect(({} as Record<string, unknown>).polluted).to.equal(undefined);
          expect(Object.prototype.hasOwnProperty.call(Object.prototype, 'polluted')).to.equal(
            false,
          );
        } finally {
          delete (Object.prototype as Record<string, unknown>).polluted;
        }
      });
    });
  });

  describe('walkObjectDeep', () => {
    it('run callback at each key', () => {
      const result: Record<string, boolean> = {};
      walkObjectDeep<boolean>(
        {
          lv1: {
            lv2: {
              lv3: {
                yes: true,
                no: false,
              },
            },
          },
        },
        (keys, value) => {
          result[keys.join('-')] = value;
        },
      );
      expect(result).to.deep.equal({
        'lv1-lv2-lv3-yes': true,
        'lv1-lv2-lv3-no': false,
      });
    });

    it('does not throw if the value is null', () => {
      const result: Record<string, boolean> = {};
      walkObjectDeep<boolean>(
        {
          lv1: null,
        },
        (keys, value) => {
          result[keys.join('-')] = value;
        },
      );
      expect(result).to.deep.equal({});
    });

    it('skip the paths if `shouldSkipPaths` return true', () => {
      const result: Record<string, string> = {};
      walkObjectDeep<string>(
        {
          lv1: {
            lv2: 'test',
          },
          vars: {
            lv2: 'skip',
          },
        },
        (keys, value) => {
          result[keys.join('-')] = value;
        },
        (keys) => keys[0] === 'vars',
      );
      expect(result).to.deep.equal({
        'lv1-lv2': 'test',
      });
    });
  });

  describe('css', () => {
    it('create css variables', () => {
      const { css } = cssVarsParser({
        palette: {
          primary: {
            100: '#ffffff',
            500: '#ff5252',
          },
        },
      });
      expect(css).to.deep.equal({
        '--palette-primary-100': '#ffffff',
        '--palette-primary-500': '#ff5252',
      });
    });

    it('add prefix to variables', () => {
      const { css } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        { prefix: 'mui' },
      );
      expect(css).to.deep.equal({
        '--mui-palette-primary-100': '#ffffff',
        '--mui-palette-primary-500': '#ff5252',
      });
    });

    it('use prefix if provided', () => {
      const theme = {
        bg: 'var(--palette-neutral-50)',
        text: {
          heading: 'var(--palette-primary-500, var(--palette-neutral-500))',
        },
      };
      const { css } = cssVarsParser(theme, {
        prefix: 'foo-bar',
      });
      expect(css).to.deep.equal({
        '--foo-bar-bg': 'var(--palette-neutral-50)',
        '--foo-bar-text-heading': 'var(--palette-primary-500, var(--palette-neutral-500))',
      });
    });

    it('attach px to number value', () => {
      const { css } = cssVarsParser({
        fontSize: {
          xs: 10,
          sm: 12,
          md: 16,
        },
      });
      expect(css).to.deep.equal({
        '--fontSize-xs': '10px',
        '--fontSize-sm': '12px',
        '--fontSize-md': '16px',
      });
    });

    it('does not attach px to color channel values', () => {
      const { css } = cssVarsParser({
        primary: {
          mainChannel: '144 202 249',
          darkChannel: '66 165 245',
          lightChannel: '0 100% 50%',
        },
      });
      expect(css).to.deep.equal({
        '--primary-mainChannel': '144 202 249',
        '--primary-darkChannel': '66 165 245',
        '--primary-lightChannel': '0 100% 50%',
      });
    });

    it('does not attach px to opacity values', () => {
      const { css } = cssVarsParser({
        primary: {
          hoverOpacity: 0.02,
          disabledOpacity: 0.5,
          opacity: 1,
        },
      });
      expect(css).to.deep.equal({
        '--primary-hoverOpacity': 0.02,
        '--primary-disabledOpacity': 0.5,
        '--primary-opacity': 1,
      });
    });

    it('does not add px to unitless properties', () => {
      const { css } = cssVarsParser({
        lineHeight: {
          xs: 1,
          sm: 1.2,
          md: 1.43,
        },
        fontWeight: {
          semiBold: 600,
          bold: 700,
        },
        opacity: {
          active: 0.5,
          hover: 0.2,
        },
        zIndex: {
          tooltip: 1200,
        },
      });
      expect(css).to.deep.equal({
        '--lineHeight-xs': 1,
        '--lineHeight-sm': 1.2,
        '--lineHeight-md': 1.43,
        '--fontWeight-semiBold': 600,
        '--fontWeight-bold': 700,
        '--opacity-active': 0.5,
        '--opacity-hover': 0.2,
        '--zIndex-tooltip': 1200,
      });
    });

    it('css is not created if shouldSkipGeneratingVar return true', () => {
      const { css } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        {
          shouldSkipGeneratingVar: (keys) => keys.slice(-1)[0] === '500',
        },
      );
      expect(css).to.deep.equal({
        '--palette-primary-100': '#ffffff',
      });
    });

    it('css can be produced from array', () => {
      const { css } = cssVarsParser({
        shadows: ['sm', 'md', 'lg'],
      });
      expect(css).to.deep.equal({
        '--shadows-0': 'sm',
        '--shadows-1': 'md',
        '--shadows-2': 'lg',
      });
    });
  });

  describe('vars', () => {
    it('create same structure and attach variables', () => {
      const { vars } = cssVarsParser({
        palette: {
          primary: {
            100: '#ffffff',
            500: '#ff5252',
          },
        },
        lineHeight: {
          xs: 1,
          sm: 1.2,
          md: 1.43,
        },
      });
      expect(vars).to.deep.equal({
        palette: {
          primary: {
            100: 'var(--palette-primary-100)',
            500: 'var(--palette-primary-500)',
          },
        },
        lineHeight: {
          xs: 'var(--lineHeight-xs)',
          sm: 'var(--lineHeight-sm)',
          md: 'var(--lineHeight-md)',
        },
      });
    });

    it('apply prefix to variables', () => {
      const { vars } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        { prefix: 'mui' },
      );
      expect(vars).to.deep.equal({
        palette: {
          primary: {
            100: 'var(--mui-palette-primary-100)',
            500: 'var(--mui-palette-primary-500)',
          },
        },
      });
    });

    it('var is not created if shouldSkipGeneratingVar return true', () => {
      const { vars } = cssVarsParser(
        {
          palette: {
            primary: {
              100: '#ffffff',
              500: '#ff5252',
            },
          },
        },
        {
          shouldSkipGeneratingVar: (keys) => keys.slice(-1)[0] === '500',
        },
      );
      expect(vars).to.deep.equal({
        palette: {
          primary: {
            100: 'var(--palette-primary-100)',
          },
        },
      });
    });

    it('vars can be produced from array', () => {
      const { vars } = cssVarsParser({
        shadows: ['sm', 'md', 'lg'],
      });
      expect(vars).to.deep.equal({
        shadows: ['var(--shadows-0)', 'var(--shadows-1)', 'var(--shadows-2)'],
      });
    });

    it('varsWithDefaults are suffixed with px from array', () => {
      const { varsWithDefaults } = cssVarsParser({
        spacing: [0, 1, 2, 6, 16],
      });
      expect(varsWithDefaults).to.deep.equal({
        spacing: [
          'var(--spacing-0, 0px)',
          'var(--spacing-1, 1px)',
          'var(--spacing-2, 2px)',
          'var(--spacing-3, 6px)',
          'var(--spacing-4, 16px)',
        ],
      });
    });

    it('should add a fallback value', () => {
      const { varsWithDefaults } = cssVarsParser({
        palette: {
          primary: {
            main: '#000',
            alias: 'var(--palette-primary-main)',
            alias2: 'var(--palette-primary-alias)',
          },
        },
      });
      expect(varsWithDefaults).to.deep.equal({
        palette: {
          primary: {
            main: 'var(--palette-primary-main, #000)',
            alias: 'var(--palette-primary-alias, var(--palette-primary-main))',
            alias2: 'var(--palette-primary-alias2, var(--palette-primary-alias))',
          },
        },
      });
    });
  });

  it('does not pollute Object.prototype from a `__proto__` token path', () => {
    try {
      // `JSON.parse` produces a real own-enumerable `__proto__` key, which is the attack vector.
      const theme = JSON.parse('{"palette":{"__proto__":{"polluted":"yes"}}}');
      const { vars } = cssVarsParser(theme, { prefix: 'mui' });
      // The malicious leaf must not pollute Object.prototype nor leak into the generated vars.
      expect(({} as Record<string, unknown>).polluted).to.equal(undefined);
      expect(Object.prototype.hasOwnProperty.call(Object.prototype, 'polluted')).to.equal(false);
      expect((vars as { palette?: Record<string, unknown> }).palette?.polluted).to.equal(undefined);
    } finally {
      delete (Object.prototype as Record<string, unknown>).polluted;
    }
  });

  it('does nothing if deep value is not string or number', () => {
    const { css, vars } = cssVarsParser({
      fooBar: () => '',
      foo: undefined,
      bar: null,
    });
    expect(css).to.deep.equal({});
    expect(vars).to.deep.equal({});
  });
});
