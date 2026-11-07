import { describe, it, expect } from 'vitest';
import spacing, { margin, padding } from './spacing';

describe('system spacing', () => {
  describe('named scale values', () => {
    // Stands in for a userland spacing function — what an enhancer such as
    // `enhanceDensity` installs on the theme. It advertises its named values
    // through `keys`, the contract these props read; everything it does not
    // name must stay raw CSS.
    const createScaleSpacing = () => {
      const scaled = { small: '12px', '-small': '-12px', xLarge: '32px' };
      const fn = (...args) => args.map((arg) => scaled[arg] ?? `${arg * 8}px`).join(' ');
      fn.keys = new Set(Object.keys(scaled));
      return fn;
    };
    const keyedSpacing = createScaleSpacing();

    it('resolves the names a transformer registers, on every spacing prop', () => {
      const theme = { spacing: keyedSpacing };

      expect(spacing({ theme, p: 'small' })).to.deep.equal({ padding: '12px' });
      expect(spacing({ theme, mt: '-small' })).to.deep.equal({ marginTop: '-12px' });
      expect(spacing({ theme, px: 'xLarge' })).to.deep.equal({
        paddingLeft: '32px',
        paddingRight: '32px',
      });
    });

    it('leaves raw CSS, unregistered names and numbers alone', () => {
      const theme = { spacing: keyedSpacing };

      expect(spacing({ theme, m: 'auto' })).to.deep.equal({ margin: 'auto' });
      expect(spacing({ theme, p: '2rem' })).to.deep.equal({ padding: '2rem' });
      // a typo must not silently resolve to something else
      expect(spacing({ theme, p: 'smal' })).to.deep.equal({ padding: 'smal' });
      expect(spacing({ theme, p: 2 })).to.deep.equal({ padding: '16px' });
    });

    it('is inert for a transformer that registers nothing', () => {
      expect(spacing({ theme: { spacing: 8 }, p: 'small' })).to.deep.equal({ padding: 'small' });
      expect(spacing({ theme: { spacing: (x) => x * 8 }, p: 'small' })).to.deep.equal({
        padding: 'small',
      });
    });

    it('resolves names through theme.vars, where the transformer is a string', () => {
      // `getPath` prefers `theme.vars.spacing`, which cannot resolve names — the
      // scale-aware function has to win for names while numbers keep the var form.
      const theme = { vars: { spacing: 'var(--mui-spacing, 8px)' }, spacing: keyedSpacing };

      expect(spacing({ theme, p: 'small' })).to.deep.equal({ padding: '12px' });
      expect(spacing({ theme, p: 2 })).to.deep.equal({
        padding: 'calc(2 * var(--mui-spacing, 8px))',
      });
      expect(spacing({ theme, m: 'auto' })).to.deep.equal({ margin: 'auto' });
    });

    it('resolves names inside responsive values', () => {
      const theme = {
        spacing: keyedSpacing,
        breakpoints: {
          keys: ['xs', 'md'],
          values: { xs: 0, md: 900 },
          up: (k) => `@media (min-width:${k === 'xs' ? 0 : 900}px)`,
        },
      };

      expect(spacing({ theme, p: { xs: 'small', md: 'xLarge' } })).to.deep.equal({
        '@media (min-width:0px)': { padding: '12px' },
        '@media (min-width:900px)': { padding: '32px' },
      });
    });
  });

  describe('spacing', () => {
    describe('themeTransformer', () => {
      it('should have a default unit value', () => {
        const output = spacing({
          p: 1,
        });
        expect(output).to.deep.equal({ padding: 8 });
      });

      it('should be able to customize the unit value', () => {
        const output1 = spacing({
          theme: {
            spacing: 2,
          },
          p: 2,
        });
        expect(output1).to.deep.equal({ padding: 4 });

        const output2 = spacing({
          theme: {
            spacing: [0, 3, 5, 8, 13, 21], // Fibonacci
          },
          p: 1,
        });
        expect(output2).to.deep.equal({ padding: 3 });

        const output3 = spacing({
          theme: {
            spacing: (x) => x ** 2,
          },
          p: 2,
        });
        expect(output3).to.deep.equal({ padding: 4 });
      });

      it('should be able to use string value', () => {
        const output1 = spacing({
          theme: {
            spacing: '4px',
          },
          p: 2,
        });
        expect(output1).to.deep.equal({ padding: 'calc(2 * 4px)' });
      });

      it('should be able to use string value with negative amount', () => {
        const output1 = spacing({
          theme: {
            spacing: '4px',
          },
          p: -2,
        });
        expect(output1).to.deep.equal({ padding: 'calc(-2 * 4px)' });
      });

      it('should use the provided value directly if theme.spacing is a string', () => {
        const output1 = spacing({
          theme: {
            spacing: '4px',
          },
          p: '1rem',
        });
        expect(output1).to.deep.equal({ padding: '1rem' });
      });
    });

    describe('warnings', () => {
      it('should warn if the value overflow', () => {
        let output;
        expect(() => {
          output = spacing({
            theme: {
              spacing: [0, 3, 5],
            },
            p: 3,
          });
        }).toErrorDev(
          'MUI: The value provided (3) overflows.\n' +
            'The supported values are: [0,3,5].\n' +
            '3 > 2, you need to add the missing values.',
        );
        expect(output).to.deep.equal({ padding: undefined });
      });

      it('should warn if the theme transformer is invalid', () => {
        let output;
        expect(() => {
          output = spacing({
            theme: {
              spacing: {},
            },
            p: 3,
          });
        }).toErrorDev(
          'MUI: The `theme.spacing` value ([object Object]) is invalid.\n' +
            'It should be a number, an array or a function.',
        );
        expect(output).to.deep.equal({ padding: undefined });
      });

      it('should warn if non integer value is used with theme.spacing defined as array', () => {
        let output;
        expect(() => {
          output = spacing({
            theme: {
              spacing: [1, 2, 3, 4, 5, 6],
            },
            p: 0.5,
          });
        }).toErrorDev(
          'MUI: The `theme.spacing` array type cannot be combined with non integer values.',
        );
        expect(output).to.deep.equal({ padding: undefined });
      });
    });

    it('should accept non integer value', () => {
      const output = spacing({
        theme: {
          spacing: 8,
        },
        p: 0.5,
      });
      expect(output).to.deep.equal({ padding: 4 });
    });

    it('should support negative values', () => {
      const output = spacing({
        p: -1,
      });
      expect(output).to.deep.equal({ padding: -8 });
    });

    it('should support composes values', () => {
      const output = spacing({
        px: 1,
      });
      expect(output).to.deep.equal({
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('should support string', () => {
      const output = spacing({
        theme: {
          spacing: ['1em', '2em'],
        },
        p: -1,
      });
      expect(output).to.deep.equal({ padding: '-2em' });
    });

    it('should support CSS variables single value', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: 'var(--mui-spacing)',
          },
        },
        p: 1,
      });
      expect(output).to.deep.equal({ padding: 'var(--mui-spacing)' });
    });

    it('should support CSS variables single value as decimal', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: 'var(--mui-spacing)',
          },
        },
        p: 0.2,
      });
      expect(output).to.deep.equal({ padding: 'calc(0.2 * var(--mui-spacing))' });
    });

    it('should support CSS variables single value more than 1', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: 'var(--mui-spacing)',
          },
        },
        p: 3,
      });
      expect(output).to.deep.equal({ padding: 'calc(3 * var(--mui-spacing))' });
    });

    it('should support CSS variables single value as zero', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: 'var(--mui-spacing)',
          },
        },
        p: 0,
      });
      expect(output).to.deep.equal({ padding: 0 });
    });

    it('should support CSS variables array', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: [
              'var(--mui-spacing-0)',
              'var(--mui-spacing-1)',
              'var(--mui-spacing-2)',
              'var(--mui-spacing-3)',
              'var(--mui-spacing-4)',
            ],
          },
        },
        p: 2,
      });
      expect(output).to.deep.equal({ padding: 'var(--mui-spacing-2)' });
    });

    it('should support CSS variables array with negative value', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: ['var(--mui-spacing-0)', 'var(--mui-spacing-1)', 'var(--mui-spacing-2)'],
          },
        },
        p: -2,
      });
      expect(output).to.deep.equal({ padding: 'calc(-1 * var(--mui-spacing-2))' });
    });

    it('should support CSS variables array with zero value', () => {
      const output = spacing({
        theme: {
          vars: {
            spacing: ['var(--mui-spacing-0)', 'var(--mui-spacing-1)', 'var(--mui-spacing-2)'],
          },
        },
        p: 0,
      });
      expect(output).to.deep.equal({ padding: 'var(--mui-spacing-0)' });
    });

    it('should support breakpoints', () => {
      const output1 = spacing({
        p: [1, 2],
      });
      expect(output1).to.deep.equal({
        '@media (min-width:0px)': {
          padding: 8,
        },
        '@media (min-width:600px)': {
          padding: 16,
        },
      });

      const output2 = spacing({
        p: {
          xs: 1,
          sm: 2,
        },
      });
      expect(output2).to.deep.equal({
        '@media (min-width:0px)': {
          padding: 8,
        },
        '@media (min-width:600px)': {
          padding: 16,
        },
      });
    });

    it('should support container queries', () => {
      const output1 = spacing({
        p: {
          '@sm': 1,
          '@900/sidebar': 2,
          '@80rem/sidebar': 3,
        },
      });
      expect(output1).to.deep.equal({
        '@container (min-width:600px)': {
          padding: 8,
        },
        '@container sidebar (min-width:900px)': {
          padding: 16,
        },
        '@container sidebar (min-width:80rem)': {
          padding: 24,
        },
      });
    });

    it('should support full version', () => {
      const output1 = spacing({
        paddingTop: 1,
      });
      expect(output1).to.deep.equal({
        paddingTop: 8,
      });
      const output2 = spacing({
        paddingY: 1,
      });
      expect(output2).to.deep.equal({
        paddingBottom: 8,
        paddingTop: 8,
      });
      const output3 = spacing({
        paddingInline: 1,
      });
      expect(output3).to.deep.equal({
        paddingInline: 8,
      });
    });

    it('should support string values', () => {
      const output = spacing({
        pt: '10px',
      });
      expect(output).to.deep.equal({
        paddingTop: '10px',
      });
    });
  });

  describe('margin', () => {
    describe('themeTransformer', () => {
      it('should have a default unit value', () => {
        const output = margin({
          m: 1,
        });
        expect(output).to.deep.equal({ margin: 8 });
      });

      it('should be able to customize the unit value', () => {
        const output1 = margin({
          theme: {
            spacing: 2,
          },
          m: 2,
        });
        expect(output1).to.deep.equal({ margin: 4 });

        const output2 = margin({
          theme: {
            spacing: [0, 3, 5, 8, 13, 21], // Fibonacci
          },
          margin: 1,
        });
        expect(output2).to.deep.equal({ margin: 3 });

        const output3 = margin({
          theme: {
            spacing: (x) => x ** 2,
          },
          m: 2,
        });
        expect(output3).to.deep.equal({ margin: 4 });
      });
    });

    describe('warnings', () => {
      it('should warn if the value overflow', () => {
        let output;
        expect(() => {
          output = margin({
            theme: {
              spacing: [0, 3, 5],
            },
            m: 3,
          });
        }).toErrorDev(
          'MUI: The value provided (3) overflows.\n' +
            'The supported values are: [0,3,5].\n' +
            '3 > 2, you need to add the missing values.',
        );
        expect(output).to.deep.equal({ margin: undefined });
      });

      it('should warn if the theme transformer is invalid', () => {
        let output;
        expect(() => {
          output = margin({
            theme: {
              spacing: {},
            },
            m: 3,
          });
        }).toErrorDev(
          'MUI: The `theme.spacing` value ([object Object]) is invalid.\n' +
            'It should be a number, an array or a function.',
        );
        expect(output).to.deep.equal({ margin: undefined });
      });

      it('should warn if non integer value is used with theme.spacing defined as array', () => {
        let output;
        expect(() => {
          output = margin({
            theme: {
              spacing: [1, 2, 3, 4, 5, 6],
            },
            m: 0.5,
          });
        }).toErrorDev(
          'MUI: The `theme.spacing` array type cannot be combined with non integer values.',
        );
        expect(output).to.deep.equal({ margin: undefined });
      });
    });

    it('should accept non integer value', () => {
      const output = margin({
        theme: {
          spacing: 8,
        },
        m: 0.5,
      });
      expect(output).to.deep.equal({ margin: 4 });
    });

    it('should support negative values', () => {
      const output = margin({
        m: -1,
      });
      expect(output).to.deep.equal({ margin: -8 });
    });

    it('should support composes values', () => {
      const output = margin({
        mx: 1,
      });
      expect(output).to.deep.equal({
        marginLeft: 8,
        marginRight: 8,
      });
    });

    it('should support string', () => {
      const output = margin({
        theme: {
          spacing: ['1em', '2em'],
        },
        m: -1,
      });
      expect(output).to.deep.equal({ margin: '-2em' });
    });

    it('should support breakpoints', () => {
      const output1 = margin({
        m: [1, 2],
      });
      expect(output1).to.deep.equal({
        '@media (min-width:0px)': {
          margin: 8,
        },
        '@media (min-width:600px)': {
          margin: 16,
        },
      });

      const output2 = margin({
        m: {
          xs: 1,
          sm: 2,
        },
      });
      expect(output2).to.deep.equal({
        '@media (min-width:0px)': {
          margin: 8,
        },
        '@media (min-width:600px)': {
          margin: 16,
        },
      });
    });

    it('should support full version', () => {
      const output1 = margin({
        marginTop: 1,
      });
      expect(output1).to.deep.equal({
        marginTop: 8,
      });
      const output2 = margin({
        marginY: 1,
      });
      expect(output2).to.deep.equal({
        marginBottom: 8,
        marginTop: 8,
      });
      const output3 = margin({
        marginInline: 1,
      });
      expect(output3).to.deep.equal({
        marginInline: 8,
      });
    });

    it('should support string values', () => {
      const output = margin({
        mt: '10px',
      });
      expect(output).to.deep.equal({
        marginTop: '10px',
      });
    });
  });

  describe('padding', () => {
    describe('themeTransformer', () => {
      it('should have a default unit value', () => {
        const output = padding({
          p: 1,
        });
        expect(output).to.deep.equal({ padding: 8 });
      });

      it('should be able to customize the unit value', () => {
        const output1 = padding({
          theme: {
            spacing: 2,
          },
          p: 2,
        });
        expect(output1).to.deep.equal({ padding: 4 });

        const output2 = padding({
          theme: {
            spacing: [0, 3, 5, 8, 13, 21], // Fibonacci
          },
          p: 1,
        });
        expect(output2).to.deep.equal({ padding: 3 });

        const output3 = padding({
          theme: {
            spacing: (x) => x ** 2,
          },
          p: 2,
        });
        expect(output3).to.deep.equal({ padding: 4 });
      });
    });

    describe('warnings', () => {
      it('should warn if the value overflow', () => {
        let output;
        expect(() => {
          output = padding({
            theme: {
              spacing: [0, 3, 5],
            },
            p: 3,
          });
        }).toErrorDev(
          'MUI: The value provided (3) overflows.\n' +
            'The supported values are: [0,3,5].\n' +
            '3 > 2, you need to add the missing values.',
        );
        expect(output).to.deep.equal({ padding: undefined });
      });

      it('should warn if the theme transformer is invalid', () => {
        let output;
        expect(() => {
          output = padding({
            theme: {
              spacing: {},
            },
            p: 3,
          });
        }).toErrorDev(
          'MUI: The `theme.spacing` value ([object Object]) is invalid.\n' +
            'It should be a number, an array or a function.',
        );
        expect(output).to.deep.equal({ padding: undefined });
      });

      it('should warn if non integer value is used with theme.spacing defined as array', () => {
        let output;
        expect(() => {
          output = padding({
            theme: {
              spacing: [1, 2, 3, 4, 5, 6],
            },
            p: 0.5,
          });
        }).toErrorDev(
          'MUI: The `theme.spacing` array type cannot be combined with non integer values.',
        );
        expect(output).to.deep.equal({ padding: undefined });
      });
    });

    it('should accept non integer value', () => {
      const output = padding({
        theme: {
          spacing: 8,
        },
        p: 0.5,
      });
      expect(output).to.deep.equal({ padding: 4 });
    });

    it('should support negative values', () => {
      const output = padding({
        p: -1,
      });
      expect(output).to.deep.equal({ padding: -8 });
    });

    it('should support composes values', () => {
      const output = padding({
        px: 1,
      });
      expect(output).to.deep.equal({
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('should support string', () => {
      const output = padding({
        theme: {
          spacing: ['1em', '2em'],
        },
        p: -1,
      });
      expect(output).to.deep.equal({ padding: '-2em' });
    });

    it('should support breakpoints', () => {
      const output1 = padding({
        p: [1, 2],
      });
      expect(output1).to.deep.equal({
        '@media (min-width:0px)': {
          padding: 8,
        },
        '@media (min-width:600px)': {
          padding: 16,
        },
      });

      const output2 = padding({
        p: {
          xs: 1,
          sm: 2,
        },
      });
      expect(output2).to.deep.equal({
        '@media (min-width:0px)': {
          padding: 8,
        },
        '@media (min-width:600px)': {
          padding: 16,
        },
      });
    });

    it('should support full version', () => {
      const output1 = padding({
        paddingTop: 1,
      });
      expect(output1).to.deep.equal({
        paddingTop: 8,
      });
      const output2 = padding({
        paddingY: 1,
      });
      expect(output2).to.deep.equal({
        paddingBottom: 8,
        paddingTop: 8,
      });
      const output3 = padding({
        paddingInline: 1,
      });
      expect(output3).to.deep.equal({
        paddingInline: 8,
      });
    });

    it('should support string values', () => {
      const output = padding({
        pt: '10px',
      });
      expect(output).to.deep.equal({
        paddingTop: '10px',
      });
    });
  });

  it('should allow to conditionally set a value', () => {
    const foo = true;
    const output = spacing({
      pt: foo ? undefined : 2,
    });
    expect(output).to.deep.equal({
      paddingTop: undefined,
    });
  });
});
