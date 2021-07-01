import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Stack from '@material-ui/core/Stack';
import { createTheme } from '@material-ui/core/styles';
import defaultTheme from '@material-ui/core/styles/defaultTheme';
import { style } from './Stack';

describe('<Stack />', () => {
  const render = createClientRender();

  describeConformanceV5(<Stack />, () => ({
    render,
    inheritComponent: 'div',
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
    skip: ['componentProp', 'componentsProp', 'rootClass', 'themeVariants', 'themeStyleOverrides'],
  }));

  const theme = createTheme();

  it('should handle breakpoints with a missing key', () => {
    expect(
      style({
        styleProps: {
          direction: { xs: 'column', sm: 'row' },
          spacing: { xs: 1, sm: 2, md: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '8px',
        },
        flexDirection: 'column',
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginLeft: '16px',
        },
        flexDirection: 'row',
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginLeft: '32px',
        },
      },
      display: 'flex',
    });
  });

  it('should handle direction with multiple keys and spacing with one', () => {
    expect(
      style({
        styleProps: {
          direction: { sm: 'column', md: 'row' },
          spacing: 2,
        },
        theme,
      }),
    ).to.deep.equal({
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '16px',
        },
        flexDirection: 'column',
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginLeft: '16px',
        },
        flexDirection: 'row',
      },
      display: 'flex',
    });
  });

  it('should handle spacing with multiple keys and direction with one', () => {
    expect(
      style({
        styleProps: {
          direction: 'column',
          spacing: { sm: 2, md: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '16px',
        },
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '32px',
        },
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('should handle spacing with multiple keys and null values', () => {
    expect(
      style({
        styleProps: {
          direction: 'column',
          spacing: { sm: 2, md: 0, lg: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '16px',
        },
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '0px',
        },
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.lg}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '32px',
        },
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('should handle flat params', () => {
    expect(
      style({
        styleProps: {
          direction: 'row',
          spacing: 3,
        },
        theme,
      }),
    ).to.deep.equal({
      '& > :not(style) + :not(style)': {
        margin: 0,
        marginLeft: '24px',
      },
      display: 'flex',
      flexDirection: 'row',
    });
  });

  it('should respect the theme breakpoints order', () => {
    expect(
      style({
        styleProps: {
          direction: { xs: 'column' },
          spacing: { lg: 2, xs: 1 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '8px',
        },
        flexDirection: 'column',
      },
      [`@media (min-width:${defaultTheme.breakpoints.values.lg}px)`]: {
        '& > :not(style) + :not(style)': {
          margin: 0,
          marginTop: '16px',
        },
      },
      display: 'flex',
    });
  });
});
