import { describe, it, expect } from 'vitest';
import styleFunctionSx from './styleFunctionSx';
import cssContainerQueries from '../cssContainerQueries';
import createBreakpoints from '../createBreakpoints/createBreakpoints';
import createTheme from '../createTheme';

describe('styleFunctionSx', () => {
  const breakpointsValues = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const round = (value) => Math.round(value * 1e5) / 1e5;

  const theme = createTheme(
    cssContainerQueries({
      spacing: (val) => `${val * 10}px`,
      breakpoints: createBreakpoints({ values: breakpointsValues }),
      palette: {
        primary: {
          main: 'rgb(0, 0, 255)',
        },
        secondary: {
          main: 'rgb(0, 255, 0)',
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeightLight: 300,
        fontSize: 14,
        body1: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          letterSpacing: `${round(0.15 / 16)}em`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
        body2: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: `${14 / 16}rem`,
          letterSpacing: `${round(0.15 / 14)}em`,
          fontWeight: 400,
          lineHeight: 1.43,
        },
      },
    }),
  );

  describe('system', () => {
    it('resolves system', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          color: 'primary.main',
          bgcolor: 'secondary.main',
          outline: 1,
          outlineColor: 'secondary.main',
          m: 2,
          p: 1,
          fontFamily: 'default',
          fontWeight: 'light',
          fontSize: 'fontSize',
          maxWidth: 'sm',
          displayPrint: 'block',
          border: [1, 2, 3, 4, 5],
        },
      });

      expect(result).to.deep.equal({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
        outline: '1px solid',
        outlineColor: 'rgb(0, 255, 0)',
        margin: '20px',
        padding: '10px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: 14,
        maxWidth: 600,
        '@media print': {
          display: 'block',
        },
        '@media (min-width:0px)': { border: '1px solid' },
        '@media (min-width:600px)': { border: '2px solid' },
        '@media (min-width:960px)': { border: '3px solid' },
        '@media (min-width:1280px)': { border: '4px solid' },
        '@media (min-width:1920px)': { border: '5px solid' },
      });
    });

    it('resolves system typography', () => {
      const result = styleFunctionSx({
        theme,
        sx: { typography: ['body2', 'body1'] },
      });

      expect(result).to.deep.equal({
        '@media (min-width:0px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: `${14 / 16}rem`,
          letterSpacing: `${round(0.15 / 14)}em`,
          fontWeight: 400,
          lineHeight: 1.43,
        },
        '@media (min-width:600px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          letterSpacing: `${round(0.15 / 16)}em`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      });
    });

    it('does not mutate theme.typography when using responsive typography shorthand (object syntax)', () => {
      const body1Before = { ...theme.typography.body1 };

      const result = styleFunctionSx({
        theme,
        sx: { typography: { sm: 'body1' }, width: { sm: '80%' }, mt: { sm: 4 } },
      });

      // Theme must not be mutated
      expect(theme.typography.body1).to.deep.equal(body1Before);

      // Output must contain both typography and sibling sx properties
      expect(result).to.deep.equal({
        '@media (min-width:600px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          letterSpacing: `${round(0.15 / 16)}em`,
          fontWeight: 400,
          lineHeight: 1.5,
          width: '80%',
          marginTop: '40px',
        },
      });
    });

    it('does not mutate theme.typography when using responsive typography shorthand (array syntax)', () => {
      const body2Before = { ...theme.typography.body2 };
      const body1Before = { ...theme.typography.body1 };

      const result = styleFunctionSx({
        theme,
        sx: { typography: ['body2', 'body1'], width: ['50%', '80%'] },
      });

      // Theme must not be mutated
      expect(theme.typography.body2).to.deep.equal(body2Before);
      expect(theme.typography.body1).to.deep.equal(body1Before);

      // Output must contain both typography and sibling sx properties
      expect(result).to.deep.equal({
        '@media (min-width:0px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: `${14 / 16}rem`,
          letterSpacing: `${round(0.15 / 14)}em`,
          fontWeight: 400,
          lineHeight: 1.43,
          width: '50%',
        },
        '@media (min-width:600px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          letterSpacing: `${round(0.15 / 16)}em`,
          fontWeight: 400,
          lineHeight: 1.5,
          width: '80%',
        },
      });
    });

    it('preserves earlier responsive properties when typography shorthand targets the same breakpoint', () => {
      const result = styleFunctionSx({
        theme,
        sx: { color: { sm: 'red' }, typography: { sm: 'body1' } },
      });

      expect(result).to.deep.equal({
        '@media (min-width:600px)': {
          color: 'red',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          letterSpacing: `${round(0.15 / 16)}em`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      });
    });

    it('allow values to be `null` or `undefined`', () => {
      const result = styleFunctionSx({
        theme,
        sx: { typography: null, m: 0, p: null, transform: null },
      });
      expect(result).to.deep.equal({
        margin: '0px',
      });
    });
  });

  it('resolves non system CSS properties if specified', () => {
    const result = styleFunctionSx({
      theme,
      sx: {
        background: 'rgb(0, 0, 255)',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: {
            xs: 0.1,
            sm: 0.2,
            md: 0.3,
            lg: 0.4,
            xl: 0.5,
          },
          translate: ['transform(10px)', 'transform(20px)'],
          border: [1, 2, 3],
          borderColor: (t) => [t.palette.secondary.main, t.palette.primary.main],
        },
      },
    });

    expect(result).to.deep.equal({
      background: 'rgb(0, 0, 255)',
      '&:hover': {
        backgroundColor: 'rgb(0, 0, 255)',
        '@media (min-width:0px)': {
          opacity: 0.1,
          border: '1px solid',
          borderColor: 'rgb(0, 255, 0)',
          translate: 'transform(10px)',
        },
        '@media (min-width:600px)': {
          opacity: 0.2,
          border: '2px solid',
          borderColor: 'rgb(0, 0, 255)',
          translate: 'transform(20px)',
        },
        '@media (min-width:960px)': { opacity: 0.3, border: '3px solid' },
        '@media (min-width:1280px)': { opacity: 0.4 },
        '@media (min-width:1920px)': { opacity: 0.5 },
      },
    });
  });

  describe('breakpoints', () => {
    const breakpointsExpectedResult = {
      '@media (min-width:0px)': { border: '1px solid' },
      '@media (min-width:600px)': { border: '2px solid' },
      '@media (min-width:960px)': { border: '3px solid' },
      '@media (min-width:1280px)': { border: '4px solid' },
      '@media (min-width:1920px)': { border: '5px solid' },
    };

    it('resolves breakpoints array', () => {
      const result = styleFunctionSx({
        theme,
        sx: { border: [1, 2, 3, 4, 5] },
      });

      expect(result).to.deep.equal(breakpointsExpectedResult);
    });

    it('resolves breakpoints object', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          border: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          },
        },
      });

      expect(result).to.deep.equal(breakpointsExpectedResult);
    });

    it('merges multiple breakpoints object', () => {
      const result = styleFunctionSx({
        theme,
        sx: { m: [1, 2, 3], p: [5, 6, 7] },
      });

      expect(result).to.deep.equal({
        '@media (min-width:0px)': { padding: '50px', margin: '10px' },
        '@media (min-width:600px)': { padding: '60px', margin: '20px' },
        '@media (min-width:960px)': { padding: '70px', margin: '30px' },
      });
    });

    it('writes breakpoints in correct order', () => {
      const result = styleFunctionSx({
        theme,
        sx: { m: { md: 1, lg: 2 }, p: { xs: 0, sm: 1, md: 2 } },
      });

      // Test the order
      expect(Object.keys(result)).to.deep.equal([
        '@media (min-width:0px)',
        '@media (min-width:600px)',
        '@media (min-width:960px)',
        '@media (min-width:1280px)',
      ]);

      expect(result).to.deep.equal({
        '@media (min-width:0px)': { padding: '0px' },
        '@media (min-width:600px)': { padding: '10px' },
        '@media (min-width:960px)': { padding: '20px', margin: '10px' },
        '@media (min-width:1280px)': { margin: '20px' },
      });
    });
  });

  describe('container queries', () => {
    const queriesExpectedResult = {
      '@container (min-width:0px)': { border: '1px solid' },
      '@container (min-width:600px)': { border: '2px solid' },
      '@container (min-width:960px)': { border: '3px solid' },
      '@container (min-width:1280px)': { border: '4px solid' },
      '@container (min-width:1920px)': { border: '5px solid' },
    };

    it('resolves queries object', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          border: {
            '@xs': 1,
            '@sm': 2,
            '@md': 3,
            '@lg': 4,
            '@xl': 5,
          },
        },
      });

      expect(result).to.deep.equal(queriesExpectedResult);
    });

    it('merges multiple queries object', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          m: {
            '@xs': 1,
            '@sm': 2,
            '@md': 3,
          },
          p: {
            '@xs': 5,
            '@sm': 6,
            '@md': 7,
          },
        },
      });

      expect(result).to.deep.equal({
        '@container (min-width:0px)': { padding: '50px', margin: '10px' },
        '@container (min-width:600px)': { padding: '60px', margin: '20px' },
        '@container (min-width:960px)': { padding: '70px', margin: '30px' },
      });
    });

    it('writes queries in correct order', () => {
      const result = styleFunctionSx({
        theme,
        sx: { m: { '@md': 1, '@lg': 2 }, p: { '@xs': 0, '@sm': 1, '@md': 2 } },
      });

      // Test the order
      expect(Object.keys(result)).to.deep.equal([
        '@container (min-width:0px)',
        '@container (min-width:600px)',
        '@container (min-width:960px)',
        '@container (min-width:1280px)',
      ]);

      expect(result).to.deep.equal({
        '@container (min-width:0px)': { padding: '0px' },
        '@container (min-width:600px)': { padding: '10px' },
        '@container (min-width:960px)': { padding: '20px', margin: '10px' },
        '@container (min-width:1280px)': { margin: '20px' },
      });
    });

    it('resolves container query shorthands for non-system CSS properties', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          opacity: {
            '@xs': 0.1,
            '@sm': 0.2,
          },
        },
      });

      expect(result).to.deep.equal({
        '@container (min-width:0px)': { opacity: 0.1 },
        '@container (min-width:600px)': { opacity: 0.2 },
      });
    });
  });

  describe('theme callback', () => {
    it('works on CSS properties', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          background: (t) => t.palette.primary.main,
        },
      });

      // Test the order
      expect(result).to.deep.equal({ background: 'rgb(0, 0, 255)' });
    });

    it('works on pseudo selectors', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          '&:hover': (t) => ({ background: t.palette.primary.main }),
        },
      });

      // Test the order
      expect(result).to.deep.equal({ '&:hover': { background: 'rgb(0, 0, 255)' } });
    });

    it('works on nested selectors', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          '& .test-classname': (t) => ({ background: t.palette.primary.main }),
        },
      });

      // Test the order
      expect(result).to.deep.equal({ '& .test-classname': { background: 'rgb(0, 0, 255)' } });
    });
  });

  describe('`sx` of function type', () => {
    it('resolves system padding', () => {
      const result = styleFunctionSx({
        theme,
        sx: () => ({
          p: 1,
        }),
      });
      expect(result).to.deep.equal({
        padding: '10px',
      });
    });

    it('resolves theme object', () => {
      const result = styleFunctionSx({
        theme,
        sx: (userTheme) => userTheme.typography.body1,
      });
      expect(result).to.deep.equal({
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        letterSpacing: `${round(0.15 / 16)}em`,
        fontWeight: 400,
        lineHeight: 1.5,
      });
    });

    it('resolves a mix of theme object and system padding', () => {
      const result = styleFunctionSx({
        theme,
        sx: (userTheme) => ({ p: 1, ...userTheme.typography.body1 }),
      });
      expect(result).to.deep.equal({
        padding: '10px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        letterSpacing: `${round(0.15 / 16)}em`,
        fontWeight: 400,
        lineHeight: 1.5,
      });
    });
  });

  describe('`sx` of array type', () => {
    it('resolves system props', () => {
      const result = styleFunctionSx({
        theme,
        sx: [
          {
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            minWidth: 300,
          },
          {
            bgcolor: 'primary.main',
          },
        ],
      });
      expect(result).to.deep.equal([
        {
          backgroundColor: 'background.paper',
          borderRadius: 4,
          boxShadow: 1,
          minWidth: 300,
          padding: '20px',
        },
        {
          backgroundColor: 'rgb(0, 0, 255)',
        },
      ]);
    });

    it('works with function inside array', () => {
      const result = styleFunctionSx({
        theme,
        sx: [
          { bgcolor: 'primary.main' },
          (t) => ({
            borderRadius: t.spacing(1),
          }),
        ],
      });

      expect(result).to.deep.equal([
        { backgroundColor: 'rgb(0, 0, 255)' },
        { borderRadius: '10px' },
      ]);
    });

    it('works with media query syntax', () => {
      const result = styleFunctionSx({
        theme,
        sx: [{ border: [1, 2, 3, 4, 5] }, { m: [1, 2, 3], p: [5, 6, 7] }],
      });

      expect(result).to.deep.equal([
        {
          '@media (min-width:0px)': { border: '1px solid' },
          '@media (min-width:600px)': { border: '2px solid' },
          '@media (min-width:960px)': { border: '3px solid' },
          '@media (min-width:1280px)': { border: '4px solid' },
          '@media (min-width:1920px)': { border: '5px solid' },
        },
        {
          '@media (min-width:0px)': { padding: '50px', margin: '10px' },
          '@media (min-width:600px)': { padding: '60px', margin: '20px' },
          '@media (min-width:960px)': { padding: '70px', margin: '30px' },
        },
      ]);
    });

    it('does not crash if the result is undefined', () => {
      expect(() =>
        styleFunctionSx({
          theme,
          sx: [(t) => t.typography.unknown],
        }),
      ).not.to.throw();
    });
  });

  describe('Modular CSS layers', () => {
    it('should wrapped in @layer', () => {
      const result = styleFunctionSx({
        theme: {
          ...theme,
          modularCssLayers: true,
        },
        sx: {
          color: 'primary.main',
          bgcolor: 'secondary.main',
          outline: 1,
          outlineColor: 'secondary.main',
          m: 2,
          p: 1,
          fontFamily: 'default',
          fontWeight: 'light',
          fontSize: 'fontSize',
          maxWidth: 'sm',
        },
      });

      expect(result).to.deep.equal({
        '@layer sx': {
          color: 'rgb(0, 0, 255)',
          backgroundColor: 'rgb(0, 255, 0)',
          outline: '1px solid',
          outlineColor: 'rgb(0, 255, 0)',
          margin: '20px',
          padding: '10px',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 300,
          fontSize: 14,
          maxWidth: 600,
        },
      });
    });

    it('should work with array type', () => {
      const result = styleFunctionSx({
        theme: {
          ...theme,
          modularCssLayers: true,
        },
        sx: [
          {
            bgcolor: 'secondary.main',
          },
          {
            color: 'primary.main',
          },
        ],
      });

      expect(result).to.deep.equal([
        {
          '@layer sx': {
            backgroundColor: 'rgb(0, 255, 0)',
          },
        },
        {
          '@layer sx': {
            color: 'rgb(0, 0, 255)',
          },
        },
      ]);
    });

    it('should work with function type', () => {
      const result = styleFunctionSx({
        theme: {
          ...theme,
          modularCssLayers: true,
        },
        sx: (t) => ({
          color: t.palette.primary.main,
          bgcolor: t.palette.secondary.main,
        }),
      });

      expect(result).to.deep.equal({
        '@layer sx': {
          color: 'rgb(0, 0, 255)',
          backgroundColor: 'rgb(0, 255, 0)',
        },
      });
    });

    it('should work with nested sx', () => {
      const result = styleFunctionSx({
        theme: {
          ...theme,
          modularCssLayers: true,
        },
        sx: {
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'secondary.main',
          },
        },
      });

      expect(result).to.deep.equal({
        '@layer sx': {
          color: 'rgb(0, 0, 255)',
          '&:hover': {
            backgroundColor: 'rgb(0, 255, 0)',
          },
        },
      });
    });

    it('should work with nested sx and function', () => {
      const result = styleFunctionSx({
        theme: {
          ...theme,
          modularCssLayers: true,
        },
        sx: {
          color: 'primary.main',
          '&:hover': (t) => ({
            bgcolor: t.palette.secondary.main,
          }),
        },
      });

      expect(result).to.deep.equal({
        '@layer sx': {
          color: 'rgb(0, 0, 255)',
          '&:hover': {
            backgroundColor: 'rgb(0, 255, 0)',
          },
        },
      });
    });
  });
});
