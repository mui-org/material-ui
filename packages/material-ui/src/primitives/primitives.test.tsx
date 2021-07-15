import * as React from 'react';
import { expect } from 'chai';
import { mui } from '@material-ui/core/primitives';
import { createTheme, hexToRgb, ThemeProvider } from '@material-ui/core/styles';
import { createClientRender } from 'test/utils';

describe('StyledPrimitive', () => {
  const theme = createTheme();
  const render = createClientRender();

  it('accepts sx prop', () => {
    const { container } = render(<mui.a sx={{ color: 'primary.main', pt: 2 }}>Foo</mui.a>);
    expect(container.firstChild).toHaveComputedStyle({
      color: hexToRgb(theme.palette.primary.main),
      paddingTop: theme.spacing(2),
    });
  });

  it('extend prop', () => {
    const { container } = render(
      <mui.a color="primary.main" pt={2}>
        Foo
      </mui.a>,
    );
    expect(container.firstChild).toHaveComputedStyle({
      color: hexToRgb(theme.palette.primary.main),
      paddingTop: theme.spacing(2),
    });
  });

  it('only html prop can spread to DOM', () => {
    const { container } = render(
      <mui.a alignItems="center" pt={2} href="/home" data-tag="a">
        Foo
      </mui.a>,
    );
    expect(container.firstChild).to.have.attribute('href', '/home');
    expect(container.firstChild).to.have.attribute('data-tag', 'a');
    expect(container.firstChild).not.to.have.attribute('alignItems', 'center');
  });

  it('use value from custom theme', () => {
    const { container } = render(
      <ThemeProvider theme={createTheme({ palette: { primary: { main: '#ff5252' } } })}>
        <mui.a color="primary.main" pt={2}>
          Foo
        </mui.a>
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({
      color: hexToRgb('#ff5252'),
    });
  });
});
