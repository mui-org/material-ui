import { describe, it, expect } from 'vitest';
import breakpoints, {
  computeBreakpointsBase,
  resolveBreakpointValues,
  removeUnusedBreakpoints,
} from './breakpoints';
import style from '../style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('breakpoints', () => {
  const muiThemeBreakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 };
  const customThemeBreakpoints = {
    extraSmall: 0,
    small: 300,
    medium: 600,
    large: 900,
    extraLarge: 1200,
  };

  it('should work', () => {
    const palette = breakpoints(textColor);

    expect(palette.filterProps.length).to.equal(6);
    expect(
      palette({
        color: 'red',
        sm: {
          color: 'blue',
        },
      }),
    ).to.deep.equal({
      color: 'red',
      '@media (min-width:600px)': {
        color: 'blue',
      },
    });
  });

  describe('function: computeBreakpointsBase', () => {
    describe('mui default breakpoints', () => {
      it('compute base for breakpoint values of array type', () => {
        const columns = [1, 2, 3];
        const base = computeBreakpointsBase(columns, muiThemeBreakpoints);
        expect(base).to.deep.equal({ xs: true, sm: true, md: true });
      });

      it('compute base for breakpoint values of object type', () => {
        const columns = { xs: 1, sm: 2, md: 3 };
        const base = computeBreakpointsBase(columns, muiThemeBreakpoints);
        expect(base).to.deep.equal({ xs: true, sm: true, md: true });
      });

      it('return empty object for fixed value', () => {
        const columns = 3;
        const base = computeBreakpointsBase(columns, muiThemeBreakpoints);
        expect(base).to.deep.equal({});
      });
    });

    describe('custom breakpoints', () => {
      it('compute base for breakpoint values of array type', () => {
        const columns = [1, 2, 3];
        const base = computeBreakpointsBase(columns, customThemeBreakpoints);
        expect(base).to.deep.equal({ extraSmall: true, small: true, medium: true });
      });

      it('compute base for breakpoint values of object type', () => {
        const columns = { extraSmall: 1, small: 2, medium: 3 };
        const base = computeBreakpointsBase(columns, customThemeBreakpoints);
        expect(base).to.deep.equal({ extraSmall: true, small: true, medium: true });
      });

      it('return empty object for fixed value', () => {
        const columns = 3;
        const base = computeBreakpointsBase(columns, customThemeBreakpoints);
        expect(base).to.deep.equal({});
      });
    });
  });

  describe('function: resolveBreakpointValues', () => {
    describe('mui default breakpoints', () => {
      it('resolve breakpoint values for prop of array type', () => {
        const columns = [1, 2, 3];
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: muiThemeBreakpoints,
        });
        expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3 });
      });

      it('resolve breakpoint values for prop of object type', () => {
        const columns = { xs: 1, sm: 2, md: 3 };
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: muiThemeBreakpoints,
        });
        expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3 });
      });

      it('resolve breakpoint values for unordered prop of object type', () => {
        const columns = { sm: 2, md: 3, xs: 1 };
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: muiThemeBreakpoints,
        });
        expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3 });
      });

      it('return prop as it is for prop of fixed value', () => {
        const columns = 3;
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: muiThemeBreakpoints,
        });
        expect(values).to.equal(3);
      });

      it('given custom base, resolve breakpoint values for prop of array type', () => {
        const columns = [1, 2, 3];
        const customBase = { xs: true, sm: true, md: true, lg: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3, lg: 3 });
      });

      it('given custom base, resolve breakpoint values for prop of object type', () => {
        const columns = { xs: 1, sm: 2, md: 3 };
        const customBase = { xs: true, sm: true, md: true, lg: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3, lg: 3 });
      });

      it('given custom base, resolve breakpoint values for unordered prop of object type', () => {
        const columns = { sm: 2, md: 3, xs: 1 };
        const customBase = { xs: true, sm: true, md: true, lg: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3, lg: 3 });
      });

      it('given custom base, resolve breakpoint values for prop of object type with missing breakpoints', () => {
        const columns = { xs: 1, md: 2 };
        const customBase = { xs: true, sm: true, md: true, lg: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ xs: 1, sm: 1, md: 2, lg: 2 });
      });

      it('given custom base, resolve breakpoint values for unordered prop of object type with missing breakpoints', () => {
        const columns = { md: 2, xs: 1 };
        const customBase = { xs: true, sm: true, md: true, lg: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ xs: 1, sm: 1, md: 2, lg: 2 });
      });
    });

    describe('custom breakpoints', () => {
      it('resolve breakpoint values for prop of array type', () => {
        const columns = [1, 2, 3];
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: customThemeBreakpoints,
        });
        expect(values).to.deep.equal({ extraSmall: 1, small: 2, medium: 3 });
      });

      it('resolve breakpoint values for prop of object type', () => {
        const columns = { extraSmall: 1, small: 2, medium: 3 };
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: customThemeBreakpoints,
        });
        expect(values).to.deep.equal({ extraSmall: 1, small: 2, medium: 3 });
      });

      it('resolve breakpoint values for unordered prop of object type', () => {
        const columns = { small: 2, medium: 3, extraSmall: 1 };
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: customThemeBreakpoints,
        });
        expect(values).to.deep.equal({ extraSmall: 1, small: 2, medium: 3 });
      });

      it('return prop as it is for prop of fixed value', () => {
        const columns = 3;
        const values = resolveBreakpointValues({
          values: columns,
          breakpoints: customThemeBreakpoints,
        });
        expect(values).to.equal(3);
      });

      it('return prop as it is for prop of fixed string value', () => {
        const directionValue = 'columns';
        const values = resolveBreakpointValues({
          values: directionValue,
        });
        expect(values).to.equal('columns');
      });

      it('given custom base, resolve breakpoint values for prop of string type', () => {
        const directionValue = 'columns';
        const values = resolveBreakpointValues({
          values: directionValue,
          base: { small: true },
        });
        expect(values).to.deep.equal({ small: directionValue });
      });

      it('given custom base, resolve breakpoint values for prop of number type', () => {
        const spacingValue = 3;
        const values = resolveBreakpointValues({
          values: spacingValue,
          base: { small: true },
        });
        expect(values).to.deep.equal({ small: spacingValue });
      });

      it('given custom base, resolve breakpoint values for prop of array type', () => {
        const columns = [1, 2, 3];
        const customBase = { extraSmall: true, small: true, medium: true, large: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ extraSmall: 1, small: 2, medium: 3, large: 3 });
      });

      it('given custom base, resolve breakpoint values for prop of object type', () => {
        const columns = { extraSmall: 1, small: 2, medium: 3 };
        const customBase = { extraSmall: true, small: true, medium: true, large: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ extraSmall: 1, small: 2, medium: 3, large: 3 });
      });

      it('given custom base, resolve breakpoint values for unordered prop of object type', () => {
        const columns = { small: 2, medium: 3, extraSmall: 1 };
        const customBase = { extraSmall: true, small: true, medium: true, large: true };
        const values = resolveBreakpointValues({ values: columns, base: customBase });
        expect(values).to.deep.equal({ extraSmall: 1, small: 2, medium: 3, large: 3 });
      });
    });
  });

  describe('function: removeUnusedBreakpoints', () => {
    it('allow value to be null', () => {
      const result = removeUnusedBreakpoints(
        {
          internal_mediaKeys: [
            '@media (min-width:0px)',
            '@media (min-width:600px)',
            '@media (min-width:960px)',
          ],
        },
        {
          '@media (min-width:0px)': {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '0.875rem',
            letterSpacing: '0.01071em',
            fontWeight: 400,
            lineHeight: 1.43,
          },
          '@media (min-width:600px)': null,
          '@media (min-width:960px)': {},
        },
      );
      expect(result).to.deep.equal({
        '@media (min-width:0px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '0.875rem',
          letterSpacing: '0.01071em',
          fontWeight: 400,
          lineHeight: 1.43,
        },
      });
    });
  });
});
