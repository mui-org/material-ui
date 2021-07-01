import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { useTheme } from '@material-ui/private-theming';
import { ThemeContext } from '@material-ui/styled-engine';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  const render = createClientRender();

  it('should provide the theme to the mui theme context', () => {
    let theme;

    function Test() {
      theme = useTheme();

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({ foo: 'foo' });
  });

  it('should provide the theme to the styled engine theme context', () => {
    let theme;

    function Test() {
      theme = React.useContext(ThemeContext);

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(theme).to.deep.equal({ foo: 'foo' });
  });
});
