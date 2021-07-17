import { expect } from 'chai';
import breakpoints, { handleBreakpoints } from './breakpoints';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('breakpoints', () => {
  it('should work', () => {
    const palette = breakpoints(textColor);

    expect(palette.filterProps.length).to.equal(6);
    expect(
      palette({
        theme: {},
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
});

describe('handleBreakpoints', () => {
  it('should reorder breakpoint following size', () => {
    const styleFromPropValue = (value) => ({ padding: value });

    expect(
      handleBreakpoints(
        {
          theme: {},
        },
        {
          md: 12,
          xs: 8,
          sm: 10,
        },
        styleFromPropValue,
      ),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        padding: 8,
      },
      '@media (min-width:600px)': {
        padding: 10,
      },
      '@media (min-width:960px)': {
        padding: 12,
      },
    });
  });
});
