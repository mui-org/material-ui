import { describe, it, expect } from 'vitest';
import * as React from 'react';
import {
  createRenderer,
  RenderCounter,
  strictModeDoubleLoggingSuppressed,
} from '@mui/internal-test-utils';
import useTheme from '../useTheme';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  const { render } = createRenderer();

  it('should provide the theme', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const text = () => ref.current!.textContent;
    function Test() {
      const theme = useTheme<Record<string, string>>();

      return <span ref={ref}>{theme.foo}</span>;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(text()).to.equal('foo');
  });

  it('should merge the themes', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const text = () => ref.current!.textContent;
    function Test() {
      const theme = useTheme<Record<string, string>>();

      return (
        <span ref={ref}>
          {theme.foo}
          {theme.bar}
        </span>
      );
    }

    render(
      <ThemeProvider theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(text()).to.equal('foobar');
  });

  it('should memoize the merged output', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const getRenderCountRef = React.createRef<() => number>();
    const text = () => ref.current!.textContent;
    function Test() {
      const theme = useTheme<Record<string, string>>();
      return (
        <RenderCounter ref={getRenderCountRef}>
          <span ref={ref}>
            {theme.foo}
            {theme.bar}
          </span>
        </RenderCounter>
      );
    }

    const outerTheme = { bar: 'bar' };
    const innerTheme = { foo: 'foo' };

    function Container() {
      return (
        <ThemeProvider theme={outerTheme}>
          <ThemeProvider theme={innerTheme}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      );
    }

    const { setProps } = render(<Container />);
    expect(text()).to.equal('foobar');
    setProps({});
    expect(text()).to.equal('foobar');
    expect(getRenderCountRef.current!()).to.equal(2);
  });

  describe('warnings', () => {
    it('should warn about missing provider', () => {
      expect(() => {
        render(
          <ThemeProvider theme={(theme: any) => theme}>
            <div />
          </ThemeProvider>,
        );
      }).toErrorDev([
        'However, no outer theme is present.',
        !strictModeDoubleLoggingSuppressed && 'However, no outer theme is present.',
      ]);
    });

    it('should warn about wrong theme function', () => {
      expect(() => {
        render(
          <ThemeProvider theme={{ bar: 'bar' }}>
            <ThemeProvider theme={(() => {}) as any}>
              <div />
            </ThemeProvider>
            ,
          </ThemeProvider>,
        );
      }).toErrorDev([
        'MUI: You should return an object from your theme function',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: You should return an object from your theme function',
      ]);
    });
  });
});
