import * as React from 'react';
import { expect } from 'chai';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { createClientRender, createMount, describeConformance } from 'test/utils';
import Box from './Box';

describe('<Box />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformance(<Box />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = (
    <div data-testid="child" className="unique">
      Hello World
    </div>
  );

  it('warns if system props are used directly on the Box component', () => {
    expect(() => {
      render(
        <Box
          color="primary.main"
          fontFamily="Comic Sans"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        />,
      );
    }).toWarnDev('Material-UI: You are using deprecated props on the Box component.\n');
  });

  it('renders children and box content', () => {
    const { container, getByTestId } = render(
      <Box component="span" m={1}>
        {testChildren}
      </Box>,
    );
    expect(container.firstChild).contain(getByTestId('child'));
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    render(
      <Box
        color="primary.main"
        fontFamily="Comic Sans"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('color')).to.equal(null);
    expect(element.getAttribute('font-family')).to.equal(null);
    expect(element.getAttribute('font-size')).to.equal(null);
  });

  it('respect properties order when generating the CSS', function test() {
    const isMozilla = window.navigator.userAgent.indexOf("Firefox") > -1
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM || isMozilla) {
      // Test fails on Mozilla with just:

	    // "border": "",
	    // "border-color": "",
      
      this.skip();
    }

    const theme = createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: 'rgb(0, 0, 255)',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
      },
    });

    const testCaseBorderColorWins = render(
      <ThemeProvider theme={theme}>
        <Box border={1} borderColor="primary.main" />
      </ThemeProvider>,
    );

    expect(testCaseBorderColorWins.container.firstChild).toHaveComputedStyle({
      border: '1px solid rgb(0, 0, 255)',
      'border-color': 'rgb(0, 0, 255)',
    });

    const testCaseBorderWins = render(
      <ThemeProvider theme={theme}>
        <Box borderColor="primary.main" border={1} />
      </ThemeProvider>,
    );

    expect(testCaseBorderWins.container.firstChild).toHaveComputedStyle({
      border: '1px solid rgb(0, 0, 0)',
      'border-color': 'rgb(0, 0, 0)',
    });
  });

  it('respect properties order when generating the CSS from the sx prop', function test() {
    const isMozilla = window.navigator.userAgent.indexOf("Firefox") > -1
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM || isMozilla) {
      // Test fails on Mozilla with just:

	    // "border": "",
	    // "border-color": "",
      
      this.skip();
    }

    const theme = createMuiTheme({
      palette: {
        primary: {
          // light: will be calculated from palette.primary.main,
          main: 'rgb(0, 0, 255)',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
      },
    });

    const testCaseBorderColorWins = render(
      <ThemeProvider theme={theme}>
        <Box sx={{ border: 1, borderColor: 'primary.main' }} />
      </ThemeProvider>,
    );

    expect(testCaseBorderColorWins.container.firstChild).toHaveComputedStyle({
      border: '1px solid rgb(0, 0, 255)',
      'border-color': 'rgb(0, 0, 255)',
    });

    const testCaseBorderWins = render(
      <ThemeProvider theme={theme}>
        <Box sx={{ borderColor: 'primary.main', border: 1 }} />
      </ThemeProvider>,
    );

    expect(testCaseBorderWins.container.firstChild).toHaveComputedStyle({
      border: '1px solid rgb(0, 0, 0)',
      'border-color': 'rgb(0, 0, 0)',
    });
  });
});
