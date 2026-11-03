import { describe, it, expect } from 'vitest';
import prepareCssVars from './prepareCssVars';

describe('prepareCssVars', () => {
  it('`getSelector` should always get a fresh copy of the css', () => {
    const result = prepareCssVars(
      {
        colorSchemes: {
          light: {
            color: 'red',
          },
          dark: {
            color: 'blue',
          },
        },
      },
      {
        getSelector: (colorScheme, css) => {
          const color = css['--color'];
          delete css['--color'];
          return {
            [`.${colorScheme}`]: {
              background: color,
            },
          };
        },
      },
    );
    expect(result.generateStyleSheets()).to.deep.equal([
      { '.light': { background: 'red' } },
      { '.dark': { background: 'blue' } },
    ]);

    // run again should have the same result
    expect(result.generateStyleSheets()).to.deep.equal([
      { '.light': { background: 'red' } },
      { '.dark': { background: 'blue' } },
    ]);
  });

  it('delete css fields should not affect the next call', () => {
    const result = prepareCssVars({
      colorSchemes: {
        dark: {
          color: 'red',
        },
      },
    });

    const css1 = result.generateStyleSheets();

    delete css1[0][':root'];

    expect(css1[0]).to.deep.equal({});

    const css2 = result.generateStyleSheets();

    expect(css2[0]).to.deep.equal({ ':root': { '--color': 'red' } });
  });

  it('produce theme vars with defaults', () => {
    const result = prepareCssVars({
      defaultColorScheme: 'dark',
      colorSchemes: {
        dark: {
          color: 'red',
        },
        light: {
          color: 'green',
        },
      },
      fontSize: {
        base: '1rem',
      },
    });
    expect(result.vars).to.deep.equal({
      color: 'var(--color, red)',
      fontSize: {
        base: 'var(--fontSize-base, 1rem)',
      },
    });
  });

  it('`generateThemeVars` should have the right structure', () => {
    const result = prepareCssVars({
      defaultColorScheme: 'dark',
      colorSchemes: {
        dark: {
          color: 'red',
        },
        light: {
          color: 'green',
        },
      },
      fontSize: {
        base: '1rem',
      },
    });
    expect(result.generateThemeVars()).to.deep.equal({
      color: 'var(--color)',
      fontSize: {
        base: 'var(--fontSize-base)',
      },
    });
  });

  it('`generateThemeVars` should have the provided prefix', () => {
    const result = prepareCssVars(
      {
        defaultColorScheme: 'dark',
        colorSchemes: {
          dark: {
            color: 'red',
          },
          light: {
            color: 'green',
          },
        },
        fontSize: {
          base: '1rem',
        },
      },
      { prefix: 'mui' },
    );
    expect(result.generateThemeVars()).to.deep.equal({
      color: 'var(--mui-color)',
      fontSize: {
        base: 'var(--mui-fontSize-base)',
      },
    });
  });

  it('`generateStyleSheets` should have the right sequence', () => {
    const result = prepareCssVars(
      {
        defaultColorScheme: 'dark',
        colorSchemes: {
          dark: {
            color: 'red',
          },
          light: {
            color: 'green',
          },
        },
        fontSize: {
          base: '1rem',
        },
      },
      { colorSchemeSelector: 'data-color-scheme' },
    );

    const stylesheets = result.generateStyleSheets();
    expect(stylesheets).to.deep.equal([
      { ':root': { '--fontSize-base': '1rem' } },
      { ':root, [data-color-scheme="dark"]': { '--color': 'red' } },
      { '[data-color-scheme="light"]': { '--color': 'green' } },
    ]);
  });

  it('`generateStyleSheets` respect the `getSelector` input', () => {
    const result = prepareCssVars(
      {
        defaultColorScheme: 'dark',
        colorSchemes: {
          dark: {
            color: 'red',
            background: '#000',
          },
          light: {
            color: 'green',
            background: '#fff',
          },
        },
        fontSize: {
          base: '1rem',
        },
      },
      {
        prefix: 'mui',
        getSelector: (colorScheme, css) => {
          if (colorScheme === 'dark') {
            const exclusion: Record<string, any> = {};
            Object.keys(css).forEach((key) => {
              if (key.endsWith('background')) {
                exclusion[key] = css[key];
                delete css[key];
              }
            });
            return {
              '.dark': exclusion,
              '.root, .dark': css,
            };
          }
          if (colorScheme) {
            return `.${colorScheme}`;
          }
          return '.root';
        },
      },
    );

    const stylesheets = result.generateStyleSheets();
    expect(stylesheets).to.deep.equal([
      { '.root': { '--mui-fontSize-base': '1rem' } },
      { '.dark': { '--mui-background': '#000' }, '.root, .dark': { '--mui-color': 'red' } },
      { '.light': { '--mui-color': 'green', '--mui-background': '#fff' } },
    ]);
  });
});
