import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import useTheme from './useTheme';
import ThemeProvider from '../ThemeProvider';

describe('useTheme', () => {
  const { render } = createRenderer();

  it('should use the theme', () => {
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
});
