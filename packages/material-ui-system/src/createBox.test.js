import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { createBox, ThemeProvider } from '@material-ui/system';

describe('createBox', () => {
  const render = createClientRender();

  it('should work', () => {
    const Box = createBox();

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('MuiBox-root');
  });

  it('should use defaultTheme if provided', () => {
    const Box = createBox({ defaultTheme: { palette: { primary: { main: 'rgb(255, 0, 0)' } } } });

    const { container } = render(<Box color="primary.main">Content</Box>);
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should use theme from Context if provided', () => {
    const Box = createBox({ defaultTheme: { palette: { primary: { main: 'rgb(255, 0, 0)' } } } });

    const { container } = render(
      <ThemeProvider theme={{ palette: { primary: { main: 'rgb(0, 255, 0)' } } }}>
        <Box color="primary.main">Content</Box>
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(0, 255, 0)' });
  });
});
