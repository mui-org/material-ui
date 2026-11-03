import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider } from 'styled-components';
import styled from '..';
import GlobalStyles from './GlobalStyles';

describe('GlobalStyles', () => {
  const { render } = createRenderer();

  it.skipIf(isJsdom())('should add global styles', function test() {
    const { container } = render(
      <div>
        <GlobalStyles styles={`span { color: rgb(0, 0, 255); }`} />
        <span>Blue text</span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it.skipIf(isJsdom())('should add global styles using JS syntax', function test() {
    const { container } = render(
      <div>
        <GlobalStyles styles={{ span: { color: 'rgb(0, 0, 255)' } }} />
        <span>Blue text</span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      color: 'rgb(0, 0, 255)',
    });
  });

  it.skipIf(isJsdom())('should add global styles using function', function test() {
    const { container } = render(
      <ThemeProvider theme={{ color: 'rgb(0, 0, 255)' }}>
        <GlobalStyles styles={(theme: any) => ({ span: { color: theme.color } })} />
        <span>Blue text</span>
      </ThemeProvider>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
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

    const { container } = render(
      <div>
        <GlobalStyles styles={`span { color: rgb(0, 0, 255); }`} />
        <Span>Red text</Span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  it.skipIf(isJsdom())('should give precedence to styled() using JS syntax', function test() {
    const Span = styled('span')({
      color: 'rgb(255, 0, 0)',
    });

    const { container } = render(
      <div>
        <GlobalStyles styles={{ span: { color: 'rgb(0, 0, 255)' } }} />
        <Span>Red text</Span>
      </div>,
    );

    expect(container.getElementsByTagName('span')[0]).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });
});
