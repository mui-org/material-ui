import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { useTheme as usePrivateTheme } from '@mui/private-theming';
import { ThemeContext } from '@mui/styled-engine';
import { ThemeProvider } from '@mui/system';
import { useRtl } from '@mui/system/RtlProvider';
import { useDefaultProps } from '../DefaultPropsProvider';

const useEngineTheme = () => React.useContext(ThemeContext);

describe('ThemeProvider', () => {
  const { render } = createRenderer();

  it('should provide the theme to the mui theme context', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );

    expect(privateTheme).to.include({ foo: 'foo' });
    expect(engineTheme).to.include({ foo: 'foo' });
  });

  it('should provide the theme to the styled engine theme context', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(engineTheme).to.include({ foo: 'foo' });
    expect(privateTheme).to.include({ foo: 'foo' });
  });

  it('merge theme by default', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider theme={{ bar: 'bar' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      bar: 'bar',
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      bar: 'bar',
    });
  });

  it('use provided theme from a callback', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider theme={(upperTheme) => ({ bar: upperTheme })}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      bar: { foo: 'foo' },
    });
    expect(engineTheme).to.deep.equal({
      bar: { foo: 'foo' },
    });
  });

  it('theme scope: theme should not change', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider themeId="mui" theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({ mui: { foo: 'foo' } });
    expect(engineTheme).to.deep.equal({ mui: { foo: 'foo' } });
  });

  it('theme scope: nested below general theme', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider themeId="mui" theme={{ bar: 'bar' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      mui: { bar: 'bar' },
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      mui: { bar: 'bar' },
    });
  });

  it('theme scope: respect callback and merge theme', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider themeId="mui" theme={{ bar: 'bar' }}>
          <ThemeProvider themeId="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
    });
  });

  it('theme scope: order should not matter', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider themeId="mui" theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <ThemeProvider themeId="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
    });
  });

  it('theme scope: multiple themeIds', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- privateTheme is required outside the component
      privateTheme = usePrivateTheme();
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- engineTheme is required outside the component
      engineTheme = useEngineTheme();

      return null;
    }

    let privateTheme2;
    let engineTheme2;

    function Test2() {
      privateTheme2 = usePrivateTheme();
      engineTheme2 = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider themeId="mui" theme={{ bar: 'bar' }}>
        <ThemeProvider themeId="joy" theme={{ foo: 'foo' }}>
          <Test />
          <ThemeProvider themeId="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <ThemeProvider themeId="joy" theme={(upperTheme) => ({ baz: upperTheme })}>
              <Test2 />
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      mui: { bar: 'bar' },
      joy: { foo: 'foo' },
    });
    expect(privateTheme2).to.deep.equal({
      mui: { baz: { bar: 'bar' } },
      joy: { baz: { foo: 'foo' } },
    });

    expect(engineTheme).to.deep.equal({
      mui: { bar: 'bar' },
      joy: { foo: 'foo' },
    });
    expect(engineTheme2).to.deep.equal({
      mui: { baz: { bar: 'bar' } },
      joy: { baz: { foo: 'foo' } },
    });
  });

  it('theme scope: multiple themeIds with callback', () => {
    expect(() =>
      render(
        <ThemeProvider themeId="mui" theme={{ bar: 'bar' }}>
          <ThemeProvider themeId="joy" theme={(upperTheme) => ({ foo: upperTheme })} />
        </ThemeProvider>,
      ),
    ).toErrorDev([
      'MUI: You are providing a theme function prop to the ThemeProvider component:',
      '<ThemeProvider theme={outerTheme => outerTheme} />',
    ]);
  });

  it('theme scope: should pass scoped theme to DefaultPropsProvider', () => {
    function Test(props) {
      const defaultProps = useDefaultProps({ props, name: 'MuiTest' });
      return defaultProps.text;
    }
    const { container } = render(
      <ThemeProvider themeId="mui" theme={{ components: { MuiTest: { text: 'foo' } } }}>
        <Test />
      </ThemeProvider>,
    );
    expect(container.firstChild).to.have.text('foo');
  });

  it('sets the correct value for the RtlProvider based on the theme.direction', () => {
    let rtlValue = null;
    function Test() {
      rtlValue = useRtl();
      return null;
    }
    render(
      <ThemeProvider theme={{ direction: 'rtl' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(rtlValue).to.equal(true);

    render(
      <ThemeProvider theme={{ direction: 'ltr' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(rtlValue).to.equal(false);
  });
});
