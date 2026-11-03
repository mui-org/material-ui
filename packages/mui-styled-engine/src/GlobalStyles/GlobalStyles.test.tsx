import { describe, expect, it } from 'vitest';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider } from '@emotion/react';
import styled from '..';
import GlobalStyles from './GlobalStyles';

describe('GlobalStyles', () => {
  const { render } = createRenderer();

  it.skipIf(isJsdom())('should add global styles', function test() {
    render(
      <div>
        <GlobalStyles styles={`span { color: rgb(0, 0, 255); }`} />
        <span data-testid="text">Blue text</span>
      </div>,
    );

    expect(screen.getByTestId('text')).toHaveComputedStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it.skipIf(isJsdom())('should add global styles using JS syntax', function test() {
    render(
      <div>
        <GlobalStyles styles={{ span: { color: 'rgb(0, 0, 255)' } }} />
        <span data-testid="text">Blue text</span>
      </div>,
    );

    expect(screen.getByTestId('text')).toHaveComputedStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it.skipIf(isJsdom())('should add global styles using function', function test() {
    render(
      <ThemeProvider theme={{ color: 'rgb(0, 0, 255)' }}>
        <GlobalStyles styles={(theme: any) => ({ span: { color: theme.color } })} />
        <span data-testid="text">Blue text</span>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('text')).toHaveComputedStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it('should not throw if no theme is available', () => {
    expect(() =>
      render(
        <GlobalStyles
          defaultTheme={{ color: 'rgb(0, 0, 255)' }}
          styles={(theme: any) => ({ span: { color: theme.color } })}
        />,
      ),
    ).not.to.throw();
  });

  it.skipIf(isJsdom())('should give precedence to styled()', function test() {
    const Span = styled('span')`
      color: rgb(255, 0, 0);
    `;

    render(
      <div>
        <GlobalStyles styles={`span { color: rgb(0, 0, 255); }`} />
        <Span data-testid="text">Red text</Span>
      </div>,
    );

    expect(screen.getByTestId('text')).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  it.skipIf(isJsdom())('should give precedence to styled() using JS syntax', function test() {
    const Span = styled('span')({
      color: 'rgb(255, 0, 0)',
    });

    render(
      <div>
        <GlobalStyles styles={{ span: { color: 'rgb(0, 0, 255)' } }} />
        <Span data-testid="text">Red text</Span>
      </div>,
    );

    expect(screen.getByTestId('text')).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });
});
