import { describe, it, expect } from 'vitest';
import { darken, lighten } from '@mui/system/colorManipulator';
import { deepOrange, blue, purple, indigo } from '../colors';
import createPalette, { dark, light } from './createPalette';

describe('createPalette()', () => {
  it('should create a palette with a rich color object', () => {
    const palette = createPalette({
      primary: deepOrange,
    });

    expect(palette.primary).to.deep.include({
      light: deepOrange[300],
      main: deepOrange[500],
      dark: deepOrange[700],
      contrastText: dark.text.primary,
    });
  });

  it('should create a palette with custom colors', () => {
    const palette = createPalette({
      primary: {
        light: deepOrange[300],
        main: deepOrange[500],
        dark: deepOrange[700],
        contrastText: '#ffffff',
      },
    });

    expect(palette.primary.main).to.equal(deepOrange[500]);
  });

  it('should calculate light and dark colors if not provided', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
    });

    expect(palette.primary).to.deep.include({
      main: deepOrange[500],
      light: lighten(deepOrange[500], 0.2),
      dark: darken(deepOrange[500], 0.3),
    });
  });

  it('should calculate light and dark colors using a simple tonalOffset number value', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
      tonalOffset: 0.1,
    });

    expect(palette.primary).to.deep.include({
      main: deepOrange[500],
      light: lighten(deepOrange[500], 0.1),
      dark: darken(deepOrange[500], 0.15),
    });
  });

  it('should calculate light and dark colors using a custom tonalOffset object value', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
      tonalOffset: {
        light: 0.8,
        dark: 0.5,
      },
    });

    expect(palette.primary).to.deep.include({
      main: deepOrange[500],
      light: lighten(deepOrange[500], 0.8),
      dark: darken(deepOrange[500], 0.5),
    });
  });

  it('should calculate contrastText using the provided contrastThreshold', () => {
    const palette = createPalette({ contrastThreshold: 7 });
    expect(
      palette.primary.contrastText,
      'should use dark.text.primary as the default primary contrastText color',
    ).to.equal(light.text.primary);
    expect(
      palette.secondary.contrastText,
      'should use dark.text.primary as the default secondary contrastText color',
    ).to.equal(light.text.primary);
  });

  it('should create a dark palette', () => {
    const palette = createPalette({ mode: 'dark' });
    expect(palette.primary.main, 'should use blue as the default primary color').to.equal(
      blue[200],
    );
    expect(palette.secondary.main, 'should use purple as the default secondary color').to.equal(
      purple[200],
    );
    expect(palette.text, 'should use dark theme text').to.deep.equal(dark.text);
  });

  it('should create independent object', () => {
    const palette1 = createPalette({});
    const palette2 = createPalette({});

    expect(palette1.background.default).to.equal('#fff');
    expect(palette2.background.default).to.equal('#fff');

    palette1.background.default = '#000';

    expect(palette1.background.default).to.equal('#000');
    expect(palette2.background.default).to.equal('#fff');
  });

  describe('augmentColor', () => {
    const palette = createPalette({});

    it('should accept a color', () => {
      const color1 = palette.augmentColor({ color: indigo, name: 'primary' });
      expect(color1).to.deep.include({
        dark: '#303f9f',
        light: '#7986cb',
        main: '#3f51b5',
        contrastText: '#fff',
      });
      const color2 = palette.augmentColor({
        color: indigo,
        mainShade: 400,
        lightShade: 200,
        darkShade: 600,
      });
      expect(color2).to.deep.include({
        light: '#9fa8da',
        main: '#5c6bc0',
        dark: '#3949ab',
        contrastText: '#fff',
      });
    });

    it('should accept a partial palette color', () => {
      const color = palette.augmentColor({
        color: {
          main: indigo[500],
        },
      });
      expect(color).to.deep.include({
        light: 'rgb(101, 115, 195)',
        main: '#3f51b5',
        dark: 'rgb(44, 56, 126)',
        contrastText: '#fff',
      });
    });
  });

  it('should create a palette with unique object references', () => {
    const redPalette = createPalette({ background: { paper: 'red' } });
    const bluePalette = createPalette({ background: { paper: 'blue' } });
    expect(redPalette).not.to.equal(bluePalette);
    expect(redPalette.background).not.to.equal(bluePalette.background);
  });

  describe('warnings', () => {
    it('throws an exception when an invalid mode is specified', () => {
      expect(() => {
        createPalette({ mode: 'foo' });
      }).toErrorDev('MUI: The palette mode `foo` is not supported');
    });

    it('throws an exception when a wrong color is provided', () => {
      expect(() => createPalette({ primary: '#fff' })).toThrowMinified(
        [
          'MUI: The color (primary) provided to augmentColor(color) is invalid.',
          'The color object needs to have a `main` property or a `500` property.',
        ].join('\n'),
      );
      expect(() => createPalette({ primary: { main: { foo: 'bar' } } })).toThrowMinified(
        [
          'MUI: The color (primary) provided to augmentColor(color) is invalid.',
          '`color.main` should be a string, but `{"foo":"bar"}` was provided instead.',
        ].join('\n'),
      );
      expect(() => createPalette({ primary: { main: undefined } })).toThrowMinified(
        [
          'MUI: The color (primary) provided to augmentColor(color) is invalid.',
          '`color.main` should be a string, but `undefined` was provided instead.',
        ].join('\n'),
      );
    });

    it('logs an error when the contrast ratio does not reach AA', () => {
      let getContrastText;
      expect(() => {
        ({ getContrastText } = createPalette({
          contrastThreshold: 0,
        }));
      }).not.toErrorDev();

      expect(() => {
        getContrastText('#fefefe');
      }).toErrorDev('falls below the WCAG recommended absolute minimum contrast ratio of 3:1');
    });
  });

  describe('color space', () => {
    it('should not throw an error when using color space', () => {
      expect(() => {
        createPalette({
          colorSpace: 'oklch',
          primary: {
            main: 'oklch(0.5 0.5 0)',
          },
        });
      }).not.toErrorDev();
    });

    it('should use color-mix when using color space', () => {
      const palette = createPalette({
        colorSpace: 'oklch',
        primary: {
          main: 'oklch(0.5 0.5 0)',
        },
      });
      expect(palette.primary.main).to.equal('oklch(0.5 0.5 0)');
      expect(palette.primary.light).to.equal('color-mix(in oklch, oklch(0.5 0.5 0), #fff 20%)');
      expect(palette.primary.dark).to.equal('color-mix(in oklch, oklch(0.5 0.5 0), #000 30%)');
    });

    it('should use oklch relative color for contrast text', () => {
      const palette = createPalette({
        colorSpace: 'oklch',
        primary: {
          main: 'color(display-p3 0.5 0.5 0)',
        },
      });
      expect(palette.primary.contrastText).to.equal(
        'oklch(from color(display-p3 0.5 0.5 0) var(--__l) 0 h / var(--__a))',
      );
      expect(palette.getContrastText('color(display-p3 0.8 0.8 0)')).to.equal(
        'oklch(from color(display-p3 0.8 0.8 0) var(--__l) 0 h / var(--__a))',
      );
    });

    it('should use color-mix with tonal when using color space', () => {
      const palette = createPalette({
        colorSpace: 'oklch',
        tonalOffset: 0.5,
        primary: {
          main: 'oklch(0.5 0.5 0)',
        },
      });
      expect(palette.primary.main).to.equal('oklch(0.5 0.5 0)');
      expect(palette.primary.light).to.equal('color-mix(in oklch, oklch(0.5 0.5 0), #fff 50%)');
      expect(palette.primary.dark).to.equal('color-mix(in oklch, oklch(0.5 0.5 0), #000 75%)');
    });

    it('should use color-mix when using color space variable', () => {
      const palette = createPalette({
        colorSpace: 'var(--mui-colorSpace)',
        primary: {
          main: 'oklch(0.5 0.5 0)',
        },
      });
      expect(palette.primary.main).to.equal('oklch(0.5 0.5 0)');
      expect(palette.primary.light).to.equal(
        'color-mix(in var(--mui-colorSpace), oklch(0.5 0.5 0), #fff 20%)',
      );
      expect(palette.primary.dark).to.equal(
        'color-mix(in var(--mui-colorSpace), oklch(0.5 0.5 0), #000 30%)',
      );
    });
  });
});
