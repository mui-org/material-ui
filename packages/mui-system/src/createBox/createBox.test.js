import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import { createBox, ThemeProvider } from '@mui/system';

describe('createBox', () => {
  const { render } = createRenderer();

  it('should work', () => {
    const Box = createBox();

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('MuiBox-root');
  });

  it('should use defaultTheme if provided', () => {
    const Box = createBox({ defaultTheme: { palette: { primary: { main: 'rgb(255, 0, 0)' } } } });

    const { container } = render(<Box sx={{ color: 'primary.main' }}>Content</Box>);
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should use theme from Context if provided', () => {
    const Box = createBox({ defaultTheme: { palette: { primary: { main: 'rgb(255, 0, 0)' } } } });

    const { container } = render(
      <ThemeProvider theme={{ palette: { primary: { main: 'rgb(0, 255, 0)' } } }}>
        <Box sx={{ color: 'primary.main' }}>Content</Box>
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(0, 255, 0)' });
  });

  it('able to customize default className', () => {
    const Box = createBox({ defaultClassName: 'FooBarBox' });

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('FooBarBox');
  });

  it('use generateClassName if provided', () => {
    const Box = createBox({ generateClassName: () => 'CustomBox-root' });

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('CustomBox-root');
  });

  it('generateClassName should receive defaultClassName if provided', () => {
    const Box = createBox({
      defaultClassName: 'FooBarBox',
      generateClassName: (name) => name.replace('FooBar', ''),
    });

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('Box');
  });

  it('should accept sx prop', () => {
    const Box = createBox();
    const { container } = render(<Box sx={{ color: 'rgb(255, 0, 0)' }}>Content</Box>);
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should call styleFunctionSx once', () => {
    const Box = createBox();
    const spySx = spy();
    render(<Box sx={spySx}>Content</Box>);
    expect(spySx.callCount).to.equal(2); // React 18 renders twice in strict mode.
  });

  it('should still call styleFunctionSx once', () => {
    const Box = createBox();
    const spySx = spy();
    render(
      <Box component={Box} sx={spySx}>
        Content
      </Box>,
    );
    expect(spySx.callCount).to.equal(2); // React 18 renders twice in strict mode.
  });

  it('overridable via `component` prop', () => {
    const Box = createBox();

    const { container } = render(<Box component="span" />);
    expect(container.firstChild).to.have.tagName('span');
  });

  it('should not have `as` and `theme` attribute spread to DOM', () => {
    const Box = createBox();

    const { container } = render(<Box component="span" />);
    expect(container.firstChild).not.to.have.attribute('as');
    expect(container.firstChild).not.to.have.attribute('theme');
  });
});
